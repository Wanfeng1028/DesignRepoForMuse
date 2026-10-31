import { useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft } from "lucide-react";
import { WelcomePanel, type WelcomeSentence } from "./welcome-panel";
import { SuggestionRow } from "./home-panel";
import { Composer } from "./composer";
import { ModelPickerA } from "./model-picker";
import { SearchDrawer } from "./search-drawer";
import { ChatInfoSheet } from "./chat-info-sheet";
import { AgentTeamPanel } from "./agent-team-panel";
import { IOSStatusBar, HomeIndicator } from "./ios-status-bar";
import { BrandDots } from "./medley-mark";
import { Icon } from "./icons";
import { UserBubble, AiMeta } from "./chat-message";
import { PUSH_MS, SHEET_OUT_MS, STREAM_WORD_MS, THINK_MS } from "../lib/ios-motion";
import * as d from "../demo/data";

/**
 * Interactive phone demo (v1.8, gallery-only).
 *
 * A 390px phone frame that actually runs the iOS behaviours whose
 * resting states the static gallery already renders: welcome title
 * rotation, model-picker bottom sheet, search drawer, chat-info sheet,
 * push/pop navigation, segmented tab switching, composer send,
 * thinking indicator, streaming reply, stop control, press feedback,
 * momentum scrolling. Nothing here is claimed as original copy or
 * original timing:
 * - Rotation: ONLY "Let's discover" + sapphire is observed. The two
 *   further sentences below are DEMO placeholders that prove the
 *   mechanism (crossfade + per-sentence cursor colour); they are not
 *   original sentences, and the shipped WelcomePanel default stays
 *   static with the observed frame only.
 * - All durations/curves are iOS platform conventions, unmeasured
 *   from the static originals (see src/lib/ios-motion.ts).
 * - Chat-info has no measured trigger in the originals, so it opens
 *   from the demo control row below the frame, not from an invented
 *   in-phone affordance. The model pill opens the picker (the picker
 *   IS the model selector) and the menu button opens the drawer.
 * - There is no bottom tab bar in any original screen, so tab
 *   switching is the segmented Chat/Agents control (the set's tab
 *   mechanism, from the CN home screen). There is no UISwitch in any
 *   original screen, so no switch is demoed (see CHANGELOG v1.8).
 * - Edge bounce is OS-level on iOS and is not reproducible in
 *   headless Linux Chromium; it is not faked. The list scrolls with
 *   native momentum scrolling (-webkit-overflow-scrolling: touch).
 */
export const DEMO_ROTATION: WelcomeSentence[] = [
  { text: "Let's discover", cursorCore: "#B4D3EF", cursorEdge: "#2E7CE6" },
  { text: "Every idea, one app", cursorCore: "#C8E8D8", cursorEdge: "#2FA08C" },
  { text: "Ask anything, anywhere", cursorCore: "#F2D4DE", cursorEdge: "#C65D7B" },
];

const STREAM_TEXT =
  "Here is a quick plan: day one in Alfama for views and tram 28, day two around Time Out Market for food, and day three in Belem for museums. Want me to turn this into a 3-day plan with costs?";
const STREAM_WORDS = STREAM_TEXT.split(" ");

type Msg = { role: "user" | "ai"; text: string; meta?: string };
type Screen = "welcome" | "home" | "chat";
type Overlay = "picker" | "info" | "drawer" | null;

const INITIAL_MSGS: Msg[] = [
  { role: "user", text: d.lisbon.user },
  { role: "ai", text: d.lisbon.aiIntro, meta: "GLM-5 · Auto · thought for 3s" },
  // A third turn so the thread overflows the list height and the list
  // genuinely scrolls (otherwise scrollHeight == clientHeight and the
  // scroll behaviour is untestable in the demo thread).
  { role: "ai", text: d.lisbon.day2, meta: "Claude Sonnet 5.5 · thought for 4s" },
];

function Frame({ children, dark }: { children: ReactNode; dark: boolean }) {
  return (
    <div className="flex h-full flex-col" style={{ background: dark ? "#111518" : "#F5F6F8" }}>
      {children}
    </div>
  );
}

export function PhoneDemo() {
  const [view, setView] = useState<Screen>("welcome");
  const [prev, setPrev] = useState<Screen | null>(null);
  const [dir, setDir] = useState<"push" | "pop">("push");
  const [tab, setTab] = useState<"chat" | "agents">("chat");
  const [overlay, setOverlay] = useState<Overlay>(null);
  const [overlayShown, setOverlayShown] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>(INITIAL_MSGS);
  const [phase, setPhase] = useState<"idle" | "thinking" | "streaming">("idle");
  const [streamText, setStreamText] = useState("");
  const [homeInput, setHomeInput] = useState("");
  const [chatInput, setChatInput] = useState("");
  const listRef = useRef<HTMLDivElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => {
    timers.current.forEach((t) => clearTimeout(t));
    timers.current = [];
  };
  useEffect(() => clearTimers, []);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [msgs, streamText, phase, view]);

  const navigate = (to: Screen, direction: "push" | "pop") => {
    if (prev !== null || to === view) return;
    setPrev(view);
    setDir(direction);
    setView(to);
    const t = setTimeout(() => setPrev(null), PUSH_MS);
    timers.current.push(t);
  };

  const openOverlay = (o: Overlay) => {
    setOverlay(o);
    setOverlayShown(false);
    const t = setTimeout(() => setOverlayShown(true), 30);
    timers.current.push(t);
  };
  const closeOverlay = () => {
    setOverlayShown(false);
    const t = setTimeout(() => setOverlay(null), SHEET_OUT_MS);
    timers.current.push(t);
  };

  const startReply = () => {
    setPhase("thinking");
    const t1 = setTimeout(() => {
      setPhase("streaming");
      setStreamText("");
      let i = 0;
      const step = () => {
        i += 1;
        setStreamText(STREAM_WORDS.slice(0, i).join(" "));
        if (i < STREAM_WORDS.length) {
          const t = setTimeout(step, STREAM_WORD_MS);
          timers.current.push(t);
        } else {
          setMsgs((m) => [...m, { role: "ai", text: STREAM_TEXT, meta: "Auto · thought for 3s" }]);
          setStreamText("");
          setPhase("idle");
        }
      };
      const t2 = setTimeout(step, STREAM_WORD_MS);
      timers.current.push(t2);
    }, THINK_MS);
    timers.current.push(t1);
  };

  const sendFromChat = () => {
    const text = chatInput.trim();
    if (!text || phase !== "idle") return;
    setChatInput("");
    setMsgs((m) => [...m, { role: "user", text }]);
    startReply();
  };
  const sendFromHome = () => {
    const text = homeInput.trim();
    if (!text || phase !== "idle") return;
    setHomeInput("");
    navigate("chat", "push");
    setMsgs((m) => [...m, { role: "user", text }]);
    startReply();
  };
  const stopStreaming = () => {
    clearTimers();
    if (streamText) setMsgs((m) => [...m, { role: "ai", text: streamText, meta: "Stopped" }]);
    setStreamText("");
    setPhase("idle");
  };

  const reset = () => {
    clearTimers();
    setPrev(null);
    setView("welcome");
    setTab("chat");
    setOverlay(null);
    setMsgs(INITIAL_MSGS);
    setPhase("idle");
    setStreamText("");
    setHomeInput("");
    setChatInput("");
  };

  const welcomeScreen = (
    <Frame dark>
      <IOSStatusBar dark time="10:24" width={390} />
      <div className="flex flex-1 flex-col [&>div]:flex-1">
        <WelcomePanel
          tagline="Every top AI in one app."
          modelLine="Claude, GPT, Gemini, DeepSeek, Kimi and GLM"
          googleLabel="Continue with Google"
          tryLabel="Try without an account"
          footnote="By continuing, you confirm you're 18 or older and agree to the Terms and Privacy Policy."
          rotate={DEMO_ROTATION}
          titleTestId="demo-title"
          onGoogle={() => navigate("home", "push")}
          onTry={() => navigate("home", "push")}
        />
      </div>
      <HomeIndicator dark width={390} />
    </Frame>
  );

  const homeScreen = (
    <Frame dark={false}>
      <IOSStatusBar dark={false} time="10:24" width={390} />
      <div className="flex h-14 items-center justify-between px-4">
        <button type="button" data-testid="demo-menu" aria-label="Open drawer" onClick={() => openOverlay("drawer")} className="ios-press inline-flex w-[72px] cursor-pointer border-0 bg-transparent p-0" style={{ color: "#17181C" }}>
          {Icon.menu("#17181C")}
        </button>
        <span className="relative flex flex-1 items-center justify-center">
          <span className="relative inline-flex rounded-chip bg-[#EDEEF2] p-[3px]">
            <span
              data-testid="demo-segment-indicator"
              className="ios-segment-indicator absolute top-[3px] bottom-[3px] w-[calc(50%-3px)] rounded-[16px] bg-white shadow-sm"
              style={{ left: 3, transform: tab === "agents" ? "translateX(100%)" : "translateX(0)" }}
            />
            <button type="button" data-testid="demo-tab-chat" onClick={() => setTab("chat")} className={`relative z-10 w-[76px] cursor-pointer rounded-[16px] border-0 bg-transparent px-3.5 py-1.5 text-[14px] ${tab === "chat" ? "font-bold text-light-text" : "font-medium text-light-sub"}`}>
              Chat
            </button>
            <button type="button" data-testid="demo-tab-agents" onClick={() => setTab("agents")} className={`relative z-10 w-[76px] cursor-pointer rounded-[16px] border-0 bg-transparent px-3.5 py-1.5 text-[14px] ${tab === "agents" ? "font-bold text-light-text" : "font-medium text-light-sub"}`}>
              Agents
            </button>
          </span>
        </span>
        <span className="flex w-[72px] justify-end" style={{ color: "#17181C" }}>{Icon.clockDashed("#17181C")}</span>
      </div>
      <div className="ios-scroll min-h-0 flex-1 overflow-y-auto">
        {tab === "chat" ? (
          <div className="flex min-h-full flex-col px-5">
            {/* Greeting sits low, as on the mobile home screens
                (HomePanel uses the same flex-1 spacer). */}
            <div className="flex-1" />
            <div className="text-greeting font-semibold leading-[1.25]">Good evening, Alex</div>
            <div className="mt-[18px] border-t-[0.5px] border-light-divider">
              {d.homeEnSuggestions.map((s) => (
                <SuggestionRow key={s.text} {...s} />
              ))}
            </div>
          </div>
        ) : (
          <div className="px-4 pt-4">
            <AgentTeamPanel
              titleLines={["Compare the pricing of 12 note-taking", "apps"]}
              meta={["Team, 6 agents", "Auto-review"]}
              creditsLine="1,240 of 6,000 credits"
              stepLine="Step 3 of 6"
              progressPct="20%"
              lead={d.agentLead}
              agents={d.agentRows}
            />
          </div>
        )}
      </div>
      <div className="px-4 pb-1">
        <Composer
          dark={false}
          placeholder="Ask anything"
          mic="plain"
          tall
          value={homeInput}
          onValueChange={setHomeInput}
          onSend={sendFromHome}
          sending={false}
          inputTestId="demo-home-input"
          sendTestId="demo-home-send"
        />
      </div>
      <HomeIndicator dark={false} width={390} />
    </Frame>
  );

  const chatScreen = (
    <Frame dark>
      <IOSStatusBar dark time="10:24" width={390} />
      <div className="flex h-14 items-center justify-between px-4">
        <button type="button" data-testid="demo-back" aria-label="Back" onClick={() => navigate("home", "pop")} className="ios-press inline-flex w-[72px] cursor-pointer border-0 bg-transparent p-0" style={{ color: "#F5F5F7" }}>
          <ChevronLeft size={24} />
        </button>
        <button type="button" data-testid="demo-model-pill" onClick={() => openOverlay("picker")} className="ios-press inline-flex cursor-pointer items-center gap-1.5 border-0 bg-transparent p-0 text-[14px] font-semibold text-dark-text">
          <BrandDots />
          Auto
          {Icon.chevronDown("#9A9BA2")}
        </button>
        <span className="flex w-[72px] items-center justify-end gap-4" style={{ color: "#9A9BA2" }}>
          {Icon.clock("#9A9BA2")}
          {Icon.edit("#9A9BA2")}
        </span>
      </div>
      <div ref={listRef} data-testid="demo-message-list" className="ios-scroll min-h-0 flex-1 overflow-y-auto px-6 py-2">
        {msgs.map((m, i) =>
          m.role === "user" ? (
            <UserBubble key={i} dark>{m.text}</UserBubble>
          ) : (
            <div key={i}>
              <AiMeta dark model="Auto" sub={m.meta} />
              <p className="my-0 mb-2 text-body leading-[1.55] text-dark-text">{m.text}</p>
            </div>
          ),
        )}
        {phase === "thinking" && (
          <div data-testid="demo-thinking">
            <AiMeta dark model="Auto" sub="Thinking" />
            <div className="flex gap-1.5 py-2">
              {[0, 1, 2].map((k) => (
                <span key={k} className="ios-think-dot h-2 w-2 rounded-full bg-dark-sub" />
              ))}
            </div>
          </div>
        )}
        {phase === "streaming" && (
          <div>
            <AiMeta dark model="Auto" sub="Generating" />
            <p className="my-0 mb-2 text-body leading-[1.55] text-dark-text">{streamText}</p>
          </div>
        )}
      </div>
      <div className="px-4 pb-1">
        <Composer
          dark
          placeholder="Ask anything"
          mic="plain"
          value={chatInput}
          onValueChange={setChatInput}
          onSend={sendFromChat}
          sending={phase !== "idle"}
          onStop={stopStreaming}
          inputTestId="demo-chat-input"
          sendTestId="demo-chat-send"
          stopTestId="demo-chat-stop"
        />
      </div>
      <HomeIndicator dark width={390} />
    </Frame>
  );

  const screenOf = (s: Screen) => (s === "welcome" ? welcomeScreen : s === "home" ? homeScreen : chatScreen);
  const screenTestId = (s: Screen) => (s === "welcome" ? "demo-screen-welcome" : s === "home" ? "demo-screen-home" : "demo-screen-chat");

  return (
    <div>
      <div data-testid="demo-phone" className="relative h-[720px] w-full max-w-[390px] overflow-hidden rounded-card border border-light-divider">
        {prev !== null && (
          <div key={`prev-${prev}`} data-testid={screenTestId(prev)} className={`absolute inset-0 ${dir === "push" ? "ios-push-out" : "ios-pop-out"}`} style={{ zIndex: dir === "push" ? 0 : 10 }}>
            {screenOf(prev)}
          </div>
        )}
        <div key={`view-${view}`} data-testid={screenTestId(view)} className={`absolute inset-0 ${prev !== null ? (dir === "push" ? "ios-push-in" : "ios-pop-in") : ""}`} style={{ zIndex: prev !== null && dir === "pop" ? 0 : 10 }}>
          {screenOf(view)}
        </div>
        {overlay !== null && (
          <>
            <button
              type="button"
              data-testid="demo-scrim"
              aria-label="Dismiss"
              onClick={closeOverlay}
              className="ios-scrim absolute inset-0 z-30 cursor-pointer border-0 bg-black/45"
              data-state={overlayShown ? "shown" : "hidden"}
            />
            {overlay === "drawer" && (
              <div data-testid="demo-drawer" className="ios-drawer absolute top-0 bottom-0 left-0 z-40 w-[84%] overflow-y-auto bg-dark-bg p-4" data-state={overlayShown ? "shown" : "hidden"}>
                <SearchDrawer
                  searchPlaceholder="Search"
                  nav={d.drawerNav}
                  pinnedLabel="Pinned"
                  pinnedTitle="Thesis outline"
                  pinnedDots={["#E4754A", "#9B5DE5"]}
                  recentLabel="Recent"
                  recent={d.drawerRecent}
                  messagesLeft="About 240 messages left"
                  userName="Alex"
                  userBadge="Pro"
                />
              </div>
            )}
            {overlay === "picker" && (
              <div data-testid="demo-sheet-picker" className="ios-sheet absolute inset-x-0 bottom-0 z-40 max-h-[86%] overflow-y-auto rounded-t-sheet bg-dark-card px-5 pb-6" data-state={overlayShown ? "shown" : "hidden"}>
                <div className="flex justify-center pt-3">
                  <div className="h-1 w-9 rounded-full bg-[#D8D9DD]" />
                </div>
                <ModelPickerA sections={d.pickerASections} howCreditsText="Credits are based on each provider's official API price, and every answer shows what it used." />
              </div>
            )}
            {overlay === "info" && (
              <div data-testid="demo-sheet-info" className="ios-sheet absolute inset-x-0 bottom-0 z-40 max-h-[86%] overflow-y-auto" data-state={overlayShown ? "shown" : "hidden"}>
                <ChatInfoSheet {...d.chatInfo} onClose={closeOverlay} />
              </div>
            )}
          </>
        )}
      </div>
      <div className="mt-3 flex max-w-[390px] flex-wrap gap-2">
        {([
          ["Open picker", () => openOverlay("picker")],
          ["Open chat info", () => openOverlay("info")],
          ["Open drawer", () => openOverlay("drawer")],
          ["Reset demo", reset],
        ] as const).map(([label, fn]) => (
          <button key={label} type="button" onClick={fn} className="ios-press cursor-pointer rounded-chip border border-light-divider bg-white px-3.5 py-2 text-[13px] font-semibold text-light-text">
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

import { Phone } from '../components/Phone'
import { TopBar } from '../components/TopBar'
import { Icon } from '../components/icons'

export const meta = { id: 'language-light', title: 'App language (light)', source: 'cn_r0_c3' }

const rows = [
  { name: 'System default', sub: 'English (United States)', check: true },
  { name: 'English', sub: '', check: false },
  { name: '简体中文', sub: 'Chinese (Simplified)', check: false },
  { name: '繁體中文', sub: 'Chinese (Traditional)', check: false },
  { name: '日本語', sub: 'Japanese', check: false },
  { name: '한국어', sub: 'Korean', check: false },
  { name: 'Español', sub: 'Spanish (Latin America)', check: false },
  { name: 'Português (Brasil)', sub: 'Portuguese (Brazil)', check: false },
  { name: 'Français', sub: 'French', check: false },
  { name: 'Deutsch', sub: 'German', check: false },
]

export default function LanguageLight() {
  return (
    <Phone theme="light" className="bg-[#fdfdfd]">
      <div className="flex min-h-0 flex-1 flex-col">
        <TopBar dark={false} left={<span className="ml-[-8px] flex items-center gap-2">{Icon.back('#17181c')}<span className="whitespace-nowrap text-[16px] font-bold text-light-text">App language</span></span>} center={<span />} right={<span />} />
        <div className="px-5">
          {rows.map((row) => (
            <div key={row.name} className="flex items-start border-b border-light-divider py-2.5">
              <div className="min-w-0 flex-1 pr-3">
                <div className="text-item font-medium leading-[1.35] text-light-text">{row.name}</div>
                {row.sub ? (
                  <div className="mt-[3px] text-secondary leading-[1.35] text-light-sub">{row.sub}</div>
                ) : null}
              </div>
              {row.check ? <span className="mt-[1px] shrink-0">{Icon.check('#17181c')}</span> : null}
            </div>
          ))}
        </div>
        <div className="mt-3 border-t border-light-divider p-5 text-secondary leading-[1.4] text-light-sub">
          Answers follow the language you write in.
        </div>
      </div>
    </Phone>
  )
}

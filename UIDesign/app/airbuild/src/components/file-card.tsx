import { DocIcon } from './icons.tsx'

export type FileCardProps = {
  filename: string
  meta: string
  onOpen?: () => void
}

/** File attachment card: document icon + filename + "type · size" meta line. */
export function FileCard({ filename, meta, onOpen }: FileCardProps) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="w-full rounded-[20px] border border-black/[0.045] bg-white px-3 py-3 text-left shadow-[0_5px_16px_rgba(0,0,0,0.025)]"
    >
      <span className="flex items-center gap-2 text-[13px] font-semibold text-[#11110f]">
        <DocIcon className="h-[18px] w-[18px] shrink-0" />
        {filename}
      </span>
      <span className="mt-1 block pl-7 text-[13px] text-black/45">{meta}</span>
    </button>
  )
}

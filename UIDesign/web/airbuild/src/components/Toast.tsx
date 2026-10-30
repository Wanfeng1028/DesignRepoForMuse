export function Toast({ text }: { text: string }) {
  return (
    <div style={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)', zIndex: 20,
      background: 'rgba(18,18,18,0.88)', color: '#fff', border: '1px solid rgba(255,255,255,0.12)',
      borderRadius: 999, padding: '10px 14px', fontSize: 11, boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
      backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)', whiteSpace: 'nowrap' }}>
      {text}
    </div>
  )
}
export function Resizer({ onDrag }: { onDrag?: () => void }) {
  return (
    <div role="separator" aria-orientation="vertical" onMouseDown={onDrag}
      style={{ width: 8, cursor: 'col-resize', flex: 'none', background: 'transparent' }} />
  )
}

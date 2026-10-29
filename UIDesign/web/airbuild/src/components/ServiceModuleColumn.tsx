import { serviceModules } from '../data/demo.ts'
import { IconBookOpen, IconCard, IconChat, IconChart, IconRoute } from './icons.tsx'

const icons = [IconChat, IconCard, IconRoute, IconBookOpen, IconChart]

/** ORIGINAL layout per the user photo: a right-hand column, NOT a bottom bar. */
export function ServiceModuleColumn({ title = 'AirBuild Services' }: { title?: string }) {
  return (
    <div style={{ background: 'rgba(249,249,247,0.92)', borderLeft: '1px solid rgba(17,17,15,0.045)', padding: 12, height: '100%', overflow: 'hidden' }}>
      <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'rgba(17,17,15,0.46)', marginBottom: 10 }}>{title}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {serviceModules.map((m, i) => {
          const Icon = icons[i % icons.length]
          return (
            <div key={m.name} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 6px', borderRadius: 9, cursor: 'pointer' }}>
              <span style={{ width: 28, height: 28, borderRadius: 8, background: m.tint, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#11110f', flex: 'none' }}><Icon size={15} /></span>
              <span style={{ flex: 1, minWidth: 0 }}>
                <span style={{ display: 'block', fontSize: 11, fontWeight: 600 }}>{m.name}</span>
                <span style={{ display: 'block', fontSize: 8, color: 'rgba(17,17,15,0.46)' }}>{m.desc}</span>
              </span>
              <span style={{ width: 22, height: 22, borderRadius: '50%', border: '1px solid rgba(17,17,15,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: 'rgba(17,17,15,0.5)', flex: 'none' }}>›</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

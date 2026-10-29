import { serviceModules } from '../data/demo.ts'
import { IconBookOpen, IconCard, IconChat, IconChart, IconRoute } from './icons.tsx'

const icons = [IconChat, IconCard, IconRoute, IconBookOpen, IconChart]

/**
 * ADAPTED VARIANT (NOT the original). No official source shows a bottom module
 * bar; the user photo shows the modules in a RIGHT column. This bar is the
 * BotsTalk-style adaptation, kept strictly separate from ServiceModuleColumn.
 */
export function BottomModuleBar() {
  return (
    <div data-adapted="true" style={{ display: 'flex', gap: 6, padding: '8px 12px', background: 'rgba(255,255,255,0.94)', borderTop: '1px solid rgba(17,17,15,0.045)', overflowX: 'auto' }}>
      <span style={{ fontSize: 9, fontWeight: 700, color: '#b45309', alignSelf: 'center', whiteSpace: 'nowrap', marginRight: 4 }}>改编（非原版）· 底部模块条</span>
      {serviceModules.map((m, i) => {
        const Icon = icons[i % icons.length]
        return (
          <button key={m.name} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 10px', borderRadius: 999, border: '1px solid rgba(17,17,15,0.08)', background: '#fff', cursor: 'pointer', whiteSpace: 'nowrap', fontSize: 11, fontWeight: 600 }}>
            <span style={{ width: 18, height: 18, borderRadius: 6, background: m.tint, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon size={12} /></span>
            {m.name}
          </button>
        )
      })}
    </div>
  )
}

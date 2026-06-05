import { statMod, fmtMod } from '../utils/dice'
import './PrintSheet.css'

const STAT_LABELS = {
  str: 'FOR', dex: 'DEX', con: 'CON', int: 'INT', wis: 'SAG', cha: 'CHA',
}
const STAT_FULL = {
  str: 'Force', dex: 'Dextérité', con: 'Constitution',
  int: 'Intelligence', wis: 'Sagesse', cha: 'Charisme',
}

export default function PrintSheet({
  system, name, subtitle, badge, badgeColor,
  stats, derivedStats, sections, onBack
}) {
  return (
    <div className="sheet-page">
      <div className="sheet-toolbar no-print">
        <button className="back-btn" onClick={onBack}>← Retour à la création</button>
        <button className="btn-primary" onClick={() => window.print()}>🖨 Imprimer la fiche</button>
      </div>

      <div className="sheet-paper">
        <div className="sheet-header">
          <div className="sheet-header-left">
            <div className={`sheet-system-badge badge badge-${badgeColor}`}>{badge}</div>
            <h1 className="sheet-name">{name}</h1>
            <div className="sheet-subtitle">{subtitle}</div>
          </div>
          <div className="sheet-ornament">⚔</div>
        </div>

        <div className="sheet-separator" />

        <div className="sheet-stats-section">
          <div className="sheet-stats-grid">
            {Object.entries(stats).map(([key, val]) => {
              const mod = statMod(val)
              return (
                <div key={key} className="sheet-stat">
                  <div className="sheet-stat-name">{STAT_LABELS[key]}</div>
                  <div className="sheet-stat-value">{val}</div>
                  <div className={`sheet-stat-mod ${mod > 0 ? 'pos' : mod < 0 ? 'neg' : 'zero'}`}>
                    {fmtMod(mod)}
                  </div>
                  <div className="sheet-stat-full">{STAT_FULL[key]}</div>
                </div>
              )
            })}
          </div>

          <div className="sheet-derived-grid">
            {derivedStats.map(ds => (
              <div key={ds.label} className="sheet-derived">
                <div className="sheet-derived-label">{ds.label}</div>
                <div className="sheet-derived-value">{ds.value}</div>
                <div className="sheet-derived-sub">{ds.sub}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="sheet-separator" />

        <div className="sheet-sections">
          {sections.map(sec => (
            <div key={sec.title} className="sheet-section">
              <div className="sheet-section-title">{sec.title}</div>
              <ul className="sheet-section-list">
                {sec.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="sheet-notes">
          <div className="sheet-section-title">Notes</div>
          <div className="sheet-notes-lines">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="sheet-note-line" />
            ))}
          </div>
        </div>

        <div className="sheet-footer">
          <span>Créé avec le Créateur de Personnage RPG</span>
          <span>{system === 'bsh' ? 'Black Sword Hack © The Merry Mushmen' : 'Shadowdark © The Arcane Library'}</span>
        </div>
      </div>
    </div>
  )
}

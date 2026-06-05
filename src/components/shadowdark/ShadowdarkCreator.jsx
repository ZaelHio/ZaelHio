import { useState, useCallback } from 'react'
import { rollStats, statMod, fmtMod, rollDie, pick } from '../../utils/dice'
import {
  ANCESTRIES, CLASSES, ALIGNMENTS, BACKGROUNDS, LANGUAGES, GODS
} from '../../data/shadowdark'
import StatBlock from '../StatBlock'
import PrintSheet from '../PrintSheet'
import '../creator-shared.css'
import './ShadowdarkCreator.css'

function randomChar() {
  const stats = rollStats()
  const ancestry = pick(ANCESTRIES)
  const cls = pick(CLASSES)
  const alignment = pick(ALIGNMENTS)
  const background = BACKGROUNDS[rollDie(20) - 1]
  const god = cls.id === 'priest' ? pick(GODS) : null
  return { stats, ancestry, cls, alignment, background, god, name: '' }
}

function calcHP(stats, cls) {
  const conMod = statMod(stats.con)
  const roll = rollDie(cls.hpDie)
  return Math.max(1, roll + conMod)
}

export default function ShadowdarkCreator({ onBack }) {
  const [char, setChar] = useState(() => randomChar())
  const [hp, setHP] = useState(() => null)
  const [rolledHP, setRolledHP] = useState(false)
  const [showSheet, setShowSheet] = useState(false)
  const [name, setName] = useState('')

  const rollAll = useCallback(() => {
    const next = randomChar()
    setChar(next)
    setHP(null)
    setRolledHP(false)
    setShowSheet(false)
  }, [])

  const rollStat = useCallback((key) => {
    setChar(c => ({
      ...c,
      stats: { ...c.stats, [key]: rollDie(6) + rollDie(6) + rollDie(6) },
    }))
  }, [])

  const rollHP = () => {
    setHP(calcHP(char.stats, char.cls))
    setRolledHP(true)
  }

  const rerollBackground = () => {
    setChar(c => ({ ...c, background: BACKGROUNDS[rollDie(20) - 1] }))
  }

  const ancestry = char.ancestry
  const cls = char.cls

  const statBonus = {}
  if (ancestry.statBonus.int) statBonus.int = ancestry.statBonus.int
  if (ancestry.statBonus.con) statBonus.con = ancestry.statBonus.con
  if (ancestry.statBonus.dex) statBonus.dex = ancestry.statBonus.dex
  if (ancestry.statBonus.str) statBonus.str = ancestry.statBonus.str
  if (ancestry.statBonus.wis) statBonus.wis = ancestry.statBonus.wis
  if (ancestry.statBonus.cha) statBonus.cha = ancestry.statBonus.cha

  const finalStats = { ...char.stats }
  Object.entries(statBonus).forEach(([k, v]) => {
    finalStats[k] = (finalStats[k] || 0) + v
  })

  const ac = cls.id === 'fighter'
    ? 13 + statMod(finalStats.dex)
    : cls.id === 'thief' || cls.id === 'heretic'
      ? 11 + statMod(finalStats.dex)
      : cls.id === 'priest'
        ? 13 + statMod(finalStats.dex)
        : 10 + statMod(finalStats.dex)

  const intMod = statMod(finalStats.int)
  const extraLanguages = intMod > 0 ? intMod : 0
  const allLanguages = [...ancestry.languages]
  if (extraLanguages > 0) {
    for (let i = 0; i < extraLanguages; i++) {
      const available = LANGUAGES.filter(l => !allLanguages.includes(l))
      if (available.length) allLanguages.push(`+${available[Math.floor(Math.random() * available.length)]}`)
    }
  }

  if (showSheet) {
    return (
      <PrintSheet
        system="shadowdark"
        name={name || '— Sans Nom —'}
        subtitle={`${ancestry.name} · ${cls.name} · Niveau 1`}
        badge="Shadowdark"
        badgeColor="purple"
        stats={finalStats}
        derivedStats={[
          { label: 'Points de Vie', value: hp ?? '—', sub: `d${cls.hpDie} + mod CON` },
          { label: 'Classe d\'Armure', value: ac, sub: 'Base + mod DEX' },
          { label: 'Attaque', value: fmtMod(statMod(cls.id === 'wizard' ? finalStats.int : cls.id === 'priest' ? finalStats.wis : finalStats.str)), sub: 'Corps à corps' },
          { label: 'Dé de vie', value: `d${cls.hpDie}`, sub: 'Par niveau' },
        ]}
        sections={[
          {
            title: 'Ascendance & Talent',
            items: [`${ancestry.name} : ${ancestry.talent}`],
          },
          {
            title: 'Capacité de classe',
            items: [`${cls.name} : ${cls.talent}`],
          },
          cls.spellcasting ? {
            title: `Sorts (${cls.spellcasting === 'arcane' ? 'Arcaniques' : 'Divins'})`,
            items: cls.startingSpells,
          } : null,
          {
            title: 'Équipement de départ',
            items: cls.equipment,
          },
          {
            title: 'Langues',
            items: [allLanguages.join(', ')],
          },
          {
            title: 'Infos',
            items: [
              `Alignement : ${char.alignment.name}`,
              `Historique : ${char.background}`,
              char.god ? `Divinité : ${char.god}` : null,
            ].filter(Boolean),
          },
        ].filter(Boolean)}
        onBack={() => setShowSheet(false)}
      />
    )
  }

  return (
    <div className="creator-page">
      <div className="creator-topbar no-print">
        <button className="back-btn" onClick={onBack}>← Choisir le système</button>
        <div className="creator-topbar-right">
          <span className="badge badge-purple">Shadowdark</span>
          <button className="btn-primary" onClick={rollAll}>🎲 Personnage aléatoire</button>
        </div>
      </div>

      <div className="creator-content">
        <div className="creator-name-row">
          <input
            className="input-styled creator-name-input"
            type="text"
            placeholder="Nom du personnage..."
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <span className="creator-level-badge">Niveau 1</span>
        </div>

        <StatBlock
          stats={char.stats}
          statOverrides={statBonus}
          onRollStat={rollStat}
          onRollAll={() => {
            const s = rollStats()
            setChar(c => ({ ...c, stats: s }))
          }}
        />

        <div className="creator-grid">
          <div className="card">
            <div className="card-title">Ascendance</div>
            <select
              className="select-styled"
              value={ancestry.id}
              onChange={e => setChar(c => ({ ...c, ancestry: ANCESTRIES.find(a => a.id === e.target.value) }))}
            >
              {ANCESTRIES.map(a => (
                <option key={a.id} value={a.id}>{a.name}</option>
              ))}
            </select>
            {ancestry && (
              <div className="creator-info-box mt-12">
                <div className="creator-info-bonus">{ancestry.bonusLabel}</div>
                <div className="creator-info-talent">{ancestry.talent}</div>
                <div className="creator-info-langs">
                  Langues : {ancestry.languages.join(', ')}
                  {extraLanguages > 0 && ` + ${extraLanguages} au choix (INT ${fmtMod(intMod)})`}
                </div>
              </div>
            )}
          </div>

          <div className="card">
            <div className="card-title">Classe</div>
            <select
              className="select-styled"
              value={cls.id}
              onChange={e => setChar(c => ({ ...c, cls: CLASSES.find(cl => cl.id === e.target.value) }))}
            >
              {CLASSES.map(cl => (
                <option key={cl.id} value={cl.id}>{cl.name}</option>
              ))}
            </select>
            {cls && (
              <div className="creator-info-box mt-12">
                <div className="creator-info-bonus">
                  Dé de vie : d{cls.hpDie} · {cls.keyStat} principale
                  {cls.spellcasting && ` · Magie ${cls.spellcasting === 'arcane' ? 'Arcanique' : 'Divine'}`}
                </div>
                <div className="creator-info-talent">{cls.talent}</div>
                <div className="creator-info-langs">
                  Armure : {cls.armor.length ? cls.armor.join(', ') : 'Aucune'}
                </div>
              </div>
            )}
          </div>

          <div className="card">
            <div className="card-title">Alignement</div>
            <div className="alignment-options">
              {ALIGNMENTS.map(a => (
                <button
                  key={a.id}
                  className={`alignment-btn ${char.alignment.id === a.id ? 'active' : ''}`}
                  onClick={() => setChar(c => ({ ...c, alignment: a }))}
                >
                  <span className="alignment-btn-name">{a.name}</span>
                  <span className="alignment-btn-desc">{a.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {cls.id === 'priest' && (
            <div className="card">
              <div className="card-title">Divinité</div>
              <select
                className="select-styled"
                value={char.god || ''}
                onChange={e => setChar(c => ({ ...c, god: e.target.value }))}
              >
                {GODS.map(g => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>
          )}

          <div className="card">
            <div className="card-title">
              Historique
              <button className="btn-roll ml-8" onClick={rerollBackground}>🎲 d20</button>
            </div>
            <div className="creator-background-display">{char.background}</div>
          </div>

          <div className="card">
            <div className="card-title">Points de Vie</div>
            <div className="hp-row">
              {rolledHP ? (
                <>
                  <div className="hp-value">{hp}</div>
                  <div className="hp-sub">d{cls.hpDie} + mod CON ({fmtMod(statMod(finalStats.con))})</div>
                  <button className="btn-roll" onClick={rollHP}>🎲 Relancer</button>
                </>
              ) : (
                <button className="btn-secondary" onClick={rollHP}>
                  🎲 Lancer les PV (d{cls.hpDie} + mod CON)
                </button>
              )}
            </div>
          </div>
        </div>

        {cls.startingSpells.length > 0 && (
          <div className="card">
            <div className="card-title">
              Sorts de départ — {cls.spellcasting === 'arcane' ? 'Arcaniques' : 'Divins'}
            </div>
            <div className="spells-grid">
              {cls.startingSpells.map(s => (
                <div key={s} className="spell-chip">{s}</div>
              ))}
            </div>
          </div>
        )}

        <div className="card">
          <div className="card-title">Équipement de départ</div>
          <ul className="equipment-list">
            {cls.equipment.map(e => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </div>

        <div className="creator-derived-row">
          <div className="derived-stat">
            <div className="derived-label">CA</div>
            <div className="derived-value">{ac}</div>
            <div className="derived-sub">Armure + mod DEX</div>
          </div>
          <div className="derived-stat">
            <div className="derived-label">Initiative</div>
            <div className="derived-value">{fmtMod(statMod(finalStats.dex))}</div>
            <div className="derived-sub">mod DEX</div>
          </div>
          <div className="derived-stat">
            <div className="derived-label">Dé de vie</div>
            <div className="derived-value">d{cls.hpDie}</div>
            <div className="derived-sub">Par niveau</div>
          </div>
          <div className="derived-stat">
            <div className="derived-label">Langues</div>
            <div className="derived-value">{allLanguages.length}</div>
            <div className="derived-sub">{allLanguages.join(' · ')}</div>
          </div>
        </div>

        <div className="creator-actions no-print">
          <button className="btn-primary" onClick={() => setShowSheet(true)}>
            📜 Voir la fiche de personnage
          </button>
          <button className="btn-secondary" onClick={() => window.print()}>
            🖨 Imprimer
          </button>
        </div>
      </div>
    </div>
  )
}

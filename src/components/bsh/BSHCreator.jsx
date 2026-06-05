import { useState, useCallback } from 'react'
import { rollStats, statMod, fmtMod, rollDie, pick } from '../../utils/dice'
import { ARCHETYPES, ALIGNMENTS, OMENS, EPITHETS, BSH_STATS } from '../../data/bsh'
import StatBlock from '../StatBlock'
import PrintSheet from '../PrintSheet'
import '../creator-shared.css'
import './BSHCreator.css'

const BSH_STAT_KEYS = ['str', 'dex', 'con', 'int', 'wis', 'cha']

function randomChar() {
  const stats = rollStats()
  const archetype = pick(ARCHETYPES)
  const alignment = pick(ALIGNMENTS)
  const omen = pick(OMENS)
  const epithet = pick(EPITHETS)
  return { stats, archetype, alignment, omen, epithet, name: '' }
}

function calcHP(stats, archetype) {
  const conMod = statMod(stats.con)
  return Math.max(1, rollDie(archetype.hpDie) + conMod)
}

export default function BSHCreator({ onBack }) {
  const [char, setChar] = useState(() => randomChar())
  const [hp, setHP] = useState(null)
  const [rolledHP, setRolledHP] = useState(false)
  const [showSheet, setShowSheet] = useState(false)
  const [name, setName] = useState('')
  const [doomStage, setDoomStage] = useState(0)

  const rollAll = useCallback(() => {
    setChar(randomChar())
    setHP(null)
    setRolledHP(false)
    setShowSheet(false)
    setDoomStage(0)
  }, [])

  const rollStat = useCallback((key) => {
    setChar(c => ({
      ...c,
      stats: { ...c.stats, [key]: rollDie(6) + rollDie(6) + rollDie(6) },
    }))
  }, [])

  const rollHP = () => {
    setHP(calcHP(char.stats, char.archetype))
    setRolledHP(true)
  }

  const archetype = char.archetype

  if (showSheet) {
    return (
      <PrintSheet
        system="bsh"
        name={name ? `${name} ${char.epithet}` : `— ${char.epithet} —`}
        subtitle={`${archetype.name} · Niveau 1 · ${char.alignment.name}`}
        badge="Black Sword Hack"
        badgeColor="gold"
        stats={char.stats}
        derivedStats={[
          { label: 'Points de Vie', value: hp ?? '—', sub: `d${archetype.hpDie} + mod CON` },
          { label: 'Usage Die', value: archetype.usageDie, sub: archetype.usageLabel },
          { label: 'Doom Actif', value: doomStage > 0 ? `Stade ${doomStage}` : 'Aucun', sub: archetype.doom[doomStage]?.title || '—' },
          { label: 'Init.', value: fmtMod(statMod(char.stats.dex)), sub: 'mod DEX' },
        ]}
        sections={[
          {
            title: 'Capacités',
            items: archetype.abilities,
          },
          {
            title: `Doom — ${archetype.name}`,
            items: archetype.doom.map(d => `${d.title} : ${d.desc}`),
          },
          {
            title: 'Équipement de départ',
            items: archetype.equipment,
          },
          {
            title: 'Présage & Identité',
            items: [
              `Alignement : ${char.alignment.name} — ${char.alignment.desc}`,
              `Présage : ${char.omen}`,
              `Épithète : ${char.epithet}`,
            ],
          },
        ]}
        onBack={() => setShowSheet(false)}
      />
    )
  }

  return (
    <div className="creator-page bsh-creator">
      <div className="creator-topbar no-print">
        <button className="back-btn" onClick={onBack}>← Choisir le système</button>
        <div className="creator-topbar-right">
          <span className="badge badge-gold">Black Sword Hack</span>
          <button className="btn-primary" onClick={rollAll}>🎲 Personnage aléatoire</button>
        </div>
      </div>

      <div className="creator-content">
        <div className="creator-name-row">
          <input
            className="input-styled creator-name-input"
            type="text"
            placeholder="Prénom du personnage..."
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <div className="bsh-epithet-display">{char.epithet}</div>
        </div>

        <StatBlock
          stats={char.stats}
          onRollStat={rollStat}
          onRollAll={() => setChar(c => ({ ...c, stats: rollStats() }))}
        />

        <div className="creator-grid">
          <div className="card">
            <div className="card-title">Archétype</div>
            <select
              className="select-styled"
              value={archetype.id}
              onChange={e => {
                const a = ARCHETYPES.find(x => x.id === e.target.value)
                setChar(c => ({ ...c, archetype: a }))
                setHP(null)
                setRolledHP(false)
                setDoomStage(0)
              }}
            >
              {ARCHETYPES.map(a => (
                <option key={a.id} value={a.id}>{a.name}</option>
              ))}
            </select>
            <div className="creator-info-box mt-12">
              <div className="creator-info-bonus">
                d{archetype.hpDie} PV · {archetype.keyStat} principale · {archetype.usageDie}
              </div>
              <div className="creator-info-talent">{archetype.description}</div>
              <div className="creator-info-langs">
                Usage Die : {archetype.usageLabel}
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-title">Alignement</div>
            <div className="alignment-options">
              {ALIGNMENTS.map(a => (
                <button
                  key={a.id}
                  className={`alignment-btn ${char.alignment.id === a.id ? 'active-gold' : ''}`}
                  onClick={() => setChar(c => ({ ...c, alignment: a }))}
                >
                  <span className="alignment-btn-name">{a.name}</span>
                  <span className="alignment-btn-desc">{a.desc}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card-title">Points de Vie</div>
            <div className="hp-row">
              {rolledHP ? (
                <>
                  <div className="hp-value">{hp}</div>
                  <div className="hp-sub">d{archetype.hpDie} + mod CON ({fmtMod(statMod(char.stats.con))})</div>
                  <button className="btn-roll" onClick={rollHP}>🎲 Relancer</button>
                </>
              ) : (
                <button className="btn-secondary" onClick={rollHP}>
                  🎲 Lancer les PV (d{archetype.hpDie} + mod CON)
                </button>
              )}
            </div>
          </div>

          <div className="card">
            <div className="card-title">
              Présage
              <button
                className="btn-roll ml-8"
                onClick={() => setChar(c => ({ ...c, omen: pick(OMENS), epithet: pick(EPITHETS) }))}
              >
                🎲 Nouveau
              </button>
            </div>
            <div className="omen-display">{char.omen}</div>
            <div className="epithet-full">Épithète : <strong>{char.epithet}</strong></div>
          </div>
        </div>

        <div className="card doom-card">
          <div className="doom-header">
            <div>
              <div className="card-title">Doom — {archetype.name}</div>
              <p className="doom-intro">
                Le Doom est la marque du destin qui s'alourdit sur le personnage.
                Chaque archétype a 3 stades d'aggravation.
              </p>
            </div>
            <div className="doom-stage-control">
              <span className="doom-stage-label">Stade actif</span>
              <div className="doom-stage-btns">
                <button
                  className={`doom-stage-btn ${doomStage === 0 ? 'active' : ''}`}
                  onClick={() => setDoomStage(0)}
                >Aucun</button>
                {archetype.doom.map((d, i) => (
                  <button
                    key={i}
                    className={`doom-stage-btn ${doomStage === i + 1 ? 'active' : ''}`}
                    onClick={() => setDoomStage(i + 1)}
                  >{i + 1}</button>
                ))}
              </div>
            </div>
          </div>
          <div className="doom-list">
            {archetype.doom.map((d, i) => (
              <div
                key={i}
                className={`doom-item ${doomStage === i + 1 ? 'doom-active' : ''} ${doomStage > i + 1 ? 'doom-past' : ''}`}
              >
                <div className="doom-stage-num">{i + 1}</div>
                <div className="doom-item-content">
                  <div className="doom-item-title">{d.title}</div>
                  <div className="doom-item-desc">{d.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-title">Capacités</div>
          <ul className="abilities-list">
            {archetype.abilities.map(a => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </div>

        <div className="card">
          <div className="card-title">Équipement de départ</div>
          <ul className="equipment-list">
            {archetype.equipment.map(e => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </div>

        <div className="creator-derived-row">
          <div className="derived-stat">
            <div className="derived-label">Initiative</div>
            <div className="derived-value">{fmtMod(statMod(char.stats.dex))}</div>
            <div className="derived-sub">mod DEX</div>
          </div>
          <div className="derived-stat">
            <div className="derived-label">Attaque corps-à-corps</div>
            <div className="derived-value">{fmtMod(statMod(char.stats.str))}</div>
            <div className="derived-sub">mod FOR</div>
          </div>
          <div className="derived-stat">
            <div className="derived-label">Usage Die</div>
            <div className="derived-value">{archetype.usageDie}</div>
            <div className="derived-sub">{archetype.usageLabel}</div>
          </div>
          <div className="derived-stat">
            <div className="derived-label">Alignement</div>
            <div className="derived-value" style={{ fontSize: '16px' }}>{char.alignment.name}</div>
            <div className="derived-sub">{char.alignment.desc}</div>
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

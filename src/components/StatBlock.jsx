import { useState } from 'react'
import { statMod, fmtMod, roll3d6 } from '../utils/dice'
import './StatBlock.css'

const STAT_LABELS = {
  str: 'FOR', dex: 'DEX', con: 'CON', int: 'INT', wis: 'SAG', cha: 'CHA',
}
const STAT_FULL = {
  str: 'Force', dex: 'Dextérité', con: 'Constitution',
  int: 'Intelligence', wis: 'Sagesse', cha: 'Charisme',
}

export default function StatBlock({ stats, onRollStat, onRollAll, statOverrides = {} }) {
  const [rolling, setRolling] = useState({})

  const triggerRoll = (key) => {
    setRolling(r => ({ ...r, [key]: true }))
    setTimeout(() => setRolling(r => ({ ...r, [key]: false })), 400)
    onRollStat(key)
  }

  const triggerRollAll = () => {
    const keys = Object.keys(stats)
    keys.forEach(k => {
      setRolling(r => ({ ...r, [k]: true }))
      setTimeout(() => setRolling(r => ({ ...r, [k]: false })), 400)
    })
    onRollAll()
  }

  return (
    <div className="stat-block">
      <div className="stat-block-header">
        <h3>Caractéristiques</h3>
        <button className="btn-roll" onClick={triggerRollAll}>
          🎲 Tout relancer (3d6)
        </button>
      </div>
      <div className="stat-grid">
        {Object.entries(stats).map(([key, val]) => {
          const finalVal = (statOverrides[key] || 0) + val
          const mod = statMod(finalVal)
          const modClass = mod > 0 ? 'pos' : mod < 0 ? 'neg' : 'zero'
          return (
            <div key={key} className="stat-cell">
              <div className="stat-name">{STAT_LABELS[key]}</div>
              <div className={`stat-value ${rolling[key] ? 'rolling-anim' : ''}`}>
                {finalVal}
              </div>
              <div className={`stat-mod ${modClass}`}>{fmtMod(mod)}</div>
              <div className="stat-label">{STAT_FULL[key]}</div>
              <button className={`btn-roll ${rolling[key] ? 'rolling' : ''}`} onClick={() => triggerRoll(key)}>
                🎲
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

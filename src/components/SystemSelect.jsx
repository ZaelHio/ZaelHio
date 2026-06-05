import './SystemSelect.css'

export default function SystemSelect({ onSelect }) {
  return (
    <div className="sys-page">
      <header className="sys-header">
        <div className="sys-header-inner">
          <div className="sys-rune">⚔</div>
          <h1>Créateur de Personnage</h1>
          <p className="sys-subtitle">Choisissez votre système de jeu pour commencer</p>
        </div>
      </header>

      <main className="sys-cards">
        <button className="sys-card sys-card--bsh" onClick={() => onSelect('bsh')}>
          <div className="sys-card-glow" />
          <div className="sys-card-icon">🗡</div>
          <div className="sys-card-content">
            <div className="sys-card-tag">Sword & Sorcery OSR</div>
            <h2>Black Sword Hack</h2>
            <p>
              Incarnez des antihéros marqués par le destin dans un monde de Chaos et de Loi.
              Choisissez votre archétype, subissez votre Doom, et survivez.
            </p>
            <ul className="sys-card-features">
              <li>5 archétypes : Guerrier, Voleur, Sorcier, Conjurateur, Hérétique</li>
              <li>Mécanique de Doom par archétype</li>
              <li>Alignement Chaos / Loi / Équilibre</li>
              <li>Usage Dice pour les ressources</li>
            </ul>
          </div>
          <div className="sys-card-cta">Créer un personnage →</div>
        </button>

        <button className="sys-card sys-card--shadowdark" onClick={() => onSelect('shadowdark')}>
          <div className="sys-card-glow" />
          <div className="sys-card-icon">🕯</div>
          <div className="sys-card-content">
            <div className="sys-card-tag">Dungeon Crawl OSR</div>
            <h2>Shadowdark</h2>
            <p>
              Explorez des donjons sombres avec une bougie pour seule lumière.
              Choisissez ascendance et classe, lancez les dés, entrez dans les ténèbres.
            </p>
            <ul className="sys-card-features">
              <li>5 ascendances : Humain, Elfe, Nain, Halfelin, Gobelin</li>
              <li>4 classes : Guerrier, Prêtre, Voleur, Sorcier</li>
              <li>Historique aléatoire sur d20</li>
              <li>Équipement de départ par classe</li>
            </ul>
          </div>
          <div className="sys-card-cta">Créer un personnage →</div>
        </button>
      </main>

      <footer className="sys-footer">
        <p>Black Sword Hack © The Merry Mushmen · Shadowdark © Kelsey Dionne / The Arcane Library</p>
      </footer>
    </div>
  )
}

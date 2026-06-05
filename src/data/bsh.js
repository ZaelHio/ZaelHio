export const ARCHETYPES = [
  {
    id: 'warrior',
    name: 'Le Guerrier',
    hpDie: 10,
    keyStat: 'FOR',
    description: 'Forgé par la guerre, survivant à travers la force brute et la volonté.',
    usageDie: 'UD6',
    usageLabel: 'Ressources de combat',
    abilities: [
      'Combat Féroce : Relancez un dé de dégâts par combat, gardez le second résultat.',
      'Endurance : Avantage sur les jets de CON pour résister à la douleur et l\'épuisement.',
      'Expérimenté : Maîtrise de toutes les armes et armures.',
    ],
    doom: [
      { stage: 1, title: 'Première Marque', desc: 'Cicatrice distinctive — les ennemis vous reconnaissent, les prix montent d\'un cran.' },
      { stage: 2, title: 'Deuxième Marque', desc: 'Réputation de violence — refus d\'hébergement en ville, tensions permanentes.' },
      { stage: 3, title: 'Troisième Marque', desc: 'Prix sur votre tête — factions ennemies coordonnées pour votre élimination.' },
    ],
    equipment: [
      'Épée (1d8) ou Hache (1d8)',
      'Armure de cuir (CA 12)',
      'Dague (1d4)',
      '1d6 × 10 po',
      'Pierre à aiguiser',
    ],
  },
  {
    id: 'thief',
    name: 'Le Voleur',
    hpDie: 8,
    keyStat: 'DEX',
    description: 'Ombre et tromperie — l\'argent coule entre ses doigts mais il survit toujours.',
    usageDie: 'UD8',
    usageLabel: 'Contacts et ressources cachées',
    abilities: [
      'Attaque Traître : +2d6 dégâts contre une cible surprise ou ignorant votre présence.',
      'Maître de l\'Ombre : Avantage sur tous jets de discrétion, crochetage et escalade.',
      'Contacts : Réseau de receleurs, informateurs et complices (1d6 fiables).',
    ],
    doom: [
      { stage: 1, title: 'Première Marque', desc: 'Tatouage de guilde imposé — appartenance visible pour qui sait regarder.' },
      { stage: 2, title: 'Deuxième Marque', desc: 'Trahi par un ami proche — dette impayable, ennemi juré dans votre réseau.' },
      { stage: 3, title: 'Troisième Marque', desc: 'La guilde vous veut mort — assassins envoyés, aucun refuge sûr.' },
    ],
    equipment: [
      'Épée courte (1d6)',
      'Arc court + 12 flèches (1d6)',
      '2× Dagues (1d4)',
      'Outils de voleur',
      '2d6 × 10 po',
    ],
  },
  {
    id: 'sorcerer',
    name: 'Le Sorcier',
    hpDie: 6,
    keyStat: 'INT',
    description: 'La magie du chaos coule en lui — pouvoir immense, santé mentale incertaine.',
    usageDie: 'UD6',
    usageLabel: 'Puissance magique (se dégrade avec l\'usage)',
    abilities: [
      'Magie Chaotique : Lancer un sort en dépensant 1 cran d\'Usage Die. Résultats imprévisibles.',
      'Résistance au Chaos : Immunité aux effets chaotiques mineurs et mutations non voulues.',
      'Grimoire : 1d4+2 sorts au départ, accumulez-en davantage dans vos aventures.',
    ],
    doom: [
      { stage: 1, title: 'Première Corruption', desc: 'Mutation physique mineure (couleur des yeux, texture de peau) — visible mais non dangereuse.' },
      { stage: 2, title: 'Deuxième Corruption', desc: 'Visions chaotiques persistantes — désavantage sur les jets de SAG lors du repos.' },
      { stage: 3, title: 'Troisième Corruption', desc: 'Transformation vers le chaos — mutation majeure permanente, début de la dissolution du moi.' },
    ],
    equipment: [
      'Bâton (1d6)',
      'Dague (1d4)',
      'Grimoire (1d4+2 sorts)',
      'Composantes magiques',
      '1d6 × 10 po',
    ],
  },
  {
    id: 'conjurer',
    name: 'Le Conjurateur',
    hpDie: 6,
    keyStat: 'CHA',
    description: 'Négocie avec l\'indicible — chaque pouvoir a un prix, chaque entité a ses exigences.',
    usageDie: 'UD6',
    usageLabel: 'Faveur des entités liées',
    abilities: [
      'Invocation : Appeler une créature liée par pacte (1 par pacte actif, max CHA/3).',
      'Négociation Surnaturelle : Avantage sur jets pour traiter avec démons, esprits et entités.',
      'Pactes : Commencez avec 1d2 pactes actifs (créatures de faible puissance).',
    ],
    doom: [
      { stage: 1, title: 'Première Dette', desc: 'Une entité réclame un service spécifique — refuser entraîne des pénalités.' },
      { stage: 2, title: 'Deuxième Dette', desc: 'L\'entité récupère une partie de votre volonté — désavantage sur jets de résistance mentale.' },
      { stage: 3, title: 'Troisième Dette', desc: 'Votre âme est liée. À la mort, vous appartenez à l\'entité pour l\'éternité.' },
    ],
    equipment: [
      'Dague rituelle (1d6)',
      'Orbe de cristal',
      'Parchemins de pacte',
      'Encens rare',
      '1d6 × 10 po',
    ],
  },
  {
    id: 'heretic',
    name: 'L\'Hérétique',
    hpDie: 8,
    keyStat: 'SAG',
    description: 'Serviteur d\'une divinité proscrite — ses miracles sont réels, son dieu exigeant.',
    usageDie: 'UD8',
    usageLabel: 'Faveur divine (se rétablit par la prière)',
    abilities: [
      'Miracle : Accomplir un acte divin en dépensant 1 cran d\'Usage Die (guérison, protection, etc.).',
      'Bénédiction Maudite : Bénir ou maudire au nom de son dieu (bonus/malus -2 sur jets).',
      'Dévotion : Les fidèles du même culte vous aideront, au risque de leur vie.',
    ],
    doom: [
      { stage: 1, title: 'Première Marque Sacrée', desc: 'Symbole divin gravé sur la peau — reconnu par les fidèles et les inquisiteurs.' },
      { stage: 2, title: 'Deuxième Marque Sacrée', desc: 'Persécuté par l\'ordre établi — prix sur la tête auprès des clercs orthodoxes.' },
      { stage: 3, title: 'Troisième Marque Sacrée', desc: 'La divinité réclame un sacrifice ultime — rite à accomplir ou perdre tous ses pouvoirs.' },
    ],
    equipment: [
      'Masse (1d8)',
      'Armure de cuir (CA 12)',
      'Symbole hérétique',
      'Livre de prières interdit',
      '1d6 × 10 po',
    ],
  },
]

export const ALIGNMENTS = [
  { id: 'chaos', name: 'Chaos', desc: 'Liberté absolue, entropie, transformation permanente.' },
  { id: 'law', name: 'Loi', desc: 'Ordre immuable, hiérarchie, tradition et contrôle.' },
  { id: 'balance', name: 'Équilibre', desc: 'Entre Chaos et Loi — pragmatisme et neutralité active.' },
]

export const OMENS = [
  'Une éclipse de lune rouge au moment de votre naissance.',
  'Votre mère rêvait d\'un serpent noir la nuit de votre conception.',
  'Vous avez survécu à une mort certaine sans cicatrice.',
  'Un augure de guilde a prédit votre mort trois fois déjà.',
  'Vous portez le nom d\'un ancien ennemi de votre peuple.',
  'Les animaux vous évitent depuis vos dix ans.',
  'Un dieu vous a parlé une fois — vous avez refusé de servir.',
  'Votre ombre ne correspond pas toujours à vos mouvements.',
  'Chaque maison que vous habitez brûle dans l\'année.',
  'Un prophète mourant vous a désigné comme "la ruine du monde".',
]

export const EPITHETS = [
  'le Maudit', 'l\'Exilé', 'le Brisé', 'le Sans-Nom', 'le Déviant',
  'la Lame Brisée', 'le Proscrit', 'l\'Égaré', 'le Survivant', 'le Dernier',
  'la Ruine', 'le Transfuge', 'la Flamme Froide', 'le Vide', 'l\'Ombre',
]

export const BSH_STATS = ['FOR', 'DEX', 'CON', 'INT', 'SAG', 'CHA']

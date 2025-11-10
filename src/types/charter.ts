export interface ManagerialCharter {
  // Étape 1 - Identité managériale
  managerType: string;
  managerDescription: string;
  
  // Étape 2 - Valeurs clés
  selectedValues: string[];
  customValues: string[];
  
  // Étape 3 - Posture préférée
  preferredPosture: 'leader' | 'facilitateur' | 'expert' | 'coach' | '';
  
  // Étape 4 - Vision de l'équipe
  teamVision: string;
  
  // Étape 5 - Phrases souhaitées
  desiredPhrases: [string, string, string];
  
  // Étape 6 - Plan d'action
  actionPlan: {
    thirtyDays: string;
    sixtyDays: string;
    ninetyDays: string;
    selectedActions: {
      thirtyDays: string[];
      sixtyDays: string[];
      ninetyDays: string[];
    };
  };
  
  // Métadonnées
  createdAt: string;
  updatedAt: string;
}

export const PREDEFINED_VALUES = [
  'Respect',
  'Clarté',
  'Engagement',
  'Innovation',
  'Collaboration',
  'Excellence',
  'Intégrité',
  'Transparence',
  'Bienveillance',
  'Efficacité',
  'Créativité',
  'Responsabilité',
  'Écoute',
  'Adaptabilité',
  'Persévérance',
  'Équité',
  'Authenticité',
  'Courage',
  'Empathie',
  'Développement'
];

export const MANAGEMENT_STYLES = [
  {
    id: 'directif',
    title: 'Directif',
    description: 'Prend des décisions rapides et donne des directives claires',
    icon: '🎯'
  },
  {
    id: 'coach',
    title: 'Coach',
    description: 'Accompagne et développe les compétences de son équipe',
    icon: '🏆'
  },
  {
    id: 'mentor',
    title: 'Mentor',
    description: 'Guide et transmet son expérience pour faire grandir',
    icon: '🌟'
  },
  {
    id: 'structurant',
    title: 'Structurant',
    description: 'Organise et met en place des processus efficaces',
    icon: '📋'
  },
  {
    id: 'inspirant',
    title: 'Inspirant',
    description: 'Motive et donne du sens au travail de l\'équipe',
    icon: '💡'
  }
];

export const POSTURES = [
  {
    id: 'leader',
    title: 'Leader',
    description: 'Donne la vision et entraîne l\'équipe vers les objectifs',
    icon: '👑'
  },
  {
    id: 'facilitateur',
    title: 'Facilitateur',
    description: 'Facilite les échanges et la collaboration au sein de l\'équipe',
    icon: '🤝'
  },
  {
    id: 'expert',
    title: 'Expert',
    description: 'Apporte son expertise technique et conseille l\'équipe',
    icon: '🎓'
  },
  {
    id: 'coach',
    title: 'Coach',
    description: 'Accompagne individuellement chaque membre de l\'équipe',
    icon: '🎯'
  }
];

export const SUGGESTED_PHRASES = [
  "Merci pour votre soutien et votre confiance",
  "Vous nous aidez à grandir et à nous améliorer",
  "Nous apprécions votre écoute et votre disponibilité",
  "Vous créez un environnement où nous pouvons nous exprimer",
  "Votre feedback nous aide à progresser",
  "Nous nous sentons valorisés dans cette équipe",
  "Vous nous donnez les moyens de réussir",
  "Nous aimons travailler ensemble sur nos projets",
  "Vous nous faites confiance pour prendre des initiatives",
  "L'ambiance de travail est positive et motivante"
];

export const ACTION_SUGGESTIONS = {
  thirtyDays: [
    'Organiser des entretiens individuels avec chaque membre',
    'Définir les règles de fonctionnement de l\'équipe',
    'Mettre en place un rituel de feedback régulier',
    'Clarifier les rôles et responsabilités',
    'Établir les objectifs prioritaires'
  ],
  sixtyDays: [
    'Développer un plan de formation pour l\'équipe',
    'Instaurer des points d\'équipe hebdomadaires',
    'Créer des espaces de collaboration et d\'échange',
    'Mettre en place des indicateurs de performance',
    'Organiser un événement de cohésion d\'équipe'
  ],
  ninetyDays: [
    'Évaluer les progrès et ajuster la stratégie',
    'Reconnaître et célébrer les succès de l\'équipe',
    'Planifier les évolutions et développements futurs',
    'Recueillir les retours d\'expérience de l\'équipe',
    'Préparer les entretiens annuels d\'évaluation'
  ]
};
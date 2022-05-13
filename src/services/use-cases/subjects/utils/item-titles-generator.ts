export enum Titles {
  FUNCTION_LEVEL = 'Funktionsniveau',
  MUSCULOSKELETAL_SYSTEM = 'Bevægeapparatet',
  NUTRITION = 'Ernæring',
  SKIN_AND_MUCOUS_MEMBRANE = 'Hud og slimhinder',
  COMMUNICATION = 'Kommunikation',
  PSYCHOSOCIAL_RELATIONSHIPS = 'Psykosociale forhold',
  RESPIRATION_AND_CIRCULATION = 'Respiration og cirkulation',
  SEXUALITY = 'Seksualitet',
  PAIN_AND_SENSORY_IMPRESSIONS = 'Smerter og sanseindtryk',
  SLEEP_AND_REST = 'Søvn og hvile',
  KNOWLEDGE_AND_DEVELOPMENT = 'Viden og udvikling',
  EXCRETION_OF_WASTE_MATERIALS = 'Udskillelse af affaldsstoffer',
}

export enum SubTitles {
  /*FUNCTION_LEVEL*/
  PROBLEMS_WITH_PERSONAL_CARE = 'Problemer med personlig pleje',
  PROBLEMS_WITH_DAILY_ACTIVITIES = 'Problemer med daglige aktiviteter',

  /*MUSCULOSKELETAL_SYSTEM*/
  PROBLEMS_WITH_MOBILITY_AND_MOVEMENT = 'Problemer med mobilitet og bevægelse',

  /*NUTRITION*/
  PROBLEMS_WITH_FLUID_INTAKE = 'Problemer med væskeindtag',
  PROBLEMS_WITH_FOOD_INTAKE = 'Problemer med fødeindtag',
  PROBLEMS_WITH_UNHEALTHY_WEIGHT_CHANGE = 'Uhensigtsmæssig vægtændring',
  PROBLEMS_WITH_OVERWEIGHT = 'Problemer med overvægt',
  PROBLEMS_WITH_UNDERWEIGHT = 'Problemer med undervægt',

  /*SKIN_AND_MUCOUS_MEMBRANE*/
  PROBLEMS_WITH_SURGICAL_WOUND = 'Problemer med kirurgisk sår',
  PROBLEMS_WITH_DIABETIC_WOUND = 'Problemer med diabetisk sår',
  PROBLEMS_WITH_CANCER_WOUND = 'Problemer med cancersår',
  PROBLEMS_WITH_DECUBITUS_ULCERS = 'Problemer med tryksår',
  PROBLEMS_WITH_ARTERIAL_WOUND = 'Problemer med arterielt sår',
  PROBLEMS_WITH_VENOUS_ULCERS = 'Problemer med venøse sår',
  PROBLEMS_WITH_MIXED_WOUND = 'Problemer med blandingssår',
  PROBLEMS_WITH_TRAUMATIC_WOUND = 'Problemer med traumesår',
  PROBLEMS_WITH_OTHER_SKIN_OR_MUCOUS_MEMBRANE = 'Andre problemer med hud og slimhinder',

  /*COMMUNICATION*/
  PROBLEMS_WITH_COMMUNICATION = 'Problemer med kommunikation',

  /*PSYCHOSOCIAL_RELATIONSHIPS*/
  PROBLEMS_WITH_Socializing = 'Problemer med socialt samvær',
  PROBLEMS_WITH_EMOTIONS = 'Emotionelle problemer',
  PROBLEMS_WITH_ABUSE = 'Problemer med misbrug',
  PROBLEMS_WITH_MENTALITY = 'Mentale problemer',

  /*RESPIRATION_AND_CIRCULATION*/
  PROBLEMS_WITH_RESPIRATION = 'Problemer med respiration',
  PROBLEMS_WITH_CIRCULATION = 'Problemer med cirkulation',

  /*SEXUALITY*/
  PROBLEMS_WITH_SEXUALITY = 'Problemer med seksualitet',

  /*PAIN_AND_SENSORY_IMPRESSIONS*/
  PROBLEMS_WITH_ACUTE_PAIN = 'Problemer med akutte smerter',
  PROBLEMS_WITH_PERIODIC_PAIN = 'Problemer med periodevise smerter',
  PROBLEMS_WITH_CHRONIC_PAIN = 'Problemer med kroniske smerter',
  PROBLEMS_WITH_VISION = 'Problemer med synssans',
  PROBLEMS_WITH_SMELL = 'Problemer med lugtesans',
  PROBLEMS_WITH_HEARING = 'Problemer med hørelse',
  PROBLEMS_WITH_TASTE = 'Problemer med smagssans',
  PROBLEMS_WITH_FEELING = 'Problemer med følesans',

  /*SLEEP_AND_REST*/
  PROBLEMS_WITH_CIRCADIAN_RHYTHM = 'Døgnrytmeproblemer',
  PROBLEMS_WITH_SLEEPING = 'Søvnproblemer',

  /*KNOWLEDGE_AND_DEVELOPMENT*/
  PROBLEMS_WITH_MEMORY = 'Problemer med hukommelsen',
  PROBLEMS_WITH_INSIGHT_IN_TREATMENT_PURPOSE = 'Problemer med indsigt i behandlingsformål',
  PROBLEMS_WITH_INSIGHT_IN_DISEASE = 'Problemer med sygdomsindsigt',
  PROBLEMS_WITH_COGNITIVE_ABILITIES = 'Kognitive problemer',

  /*EXCRETION_OF_WASTE_MATERIALS*/
  PROBLEMS_WITH_URINATION = 'Problemer med vandladning',
  PROBLEMS_WITH_URINARY_INCONTINENCE = 'Problemer med urininkontinens',
  PROBLEMS_WITH_FECAL_INCONTINENCE = 'Problemer med afføringsinkontinens',
  PROBLEMS_WITH_STOMACH_AND_DIGESTIVE_SYSTEM = 'Problemer med mave og tarm',
  PROBLEMS_WITH_FLUID_FROM_DRAINAGE = 'Problemer med væske fra dræn',
}

export class TitlesGenerator {
  private titlesMap = new Map<string, Array<string>>();
  constructor() {
    /*FUNCTION_LEVEL*/
    this.titlesMap.set(Titles.FUNCTION_LEVEL, [
      SubTitles.PROBLEMS_WITH_PERSONAL_CARE,
      SubTitles.PROBLEMS_WITH_DAILY_ACTIVITIES,
    ]);
    /*MUSCULOSKELETAL_SYSTEM*/
    this.titlesMap.set(Titles.MUSCULOSKELETAL_SYSTEM, [
      SubTitles.PROBLEMS_WITH_MOBILITY_AND_MOVEMENT,
    ]);
    /*NUTRITION*/
    this.titlesMap.set(Titles.NUTRITION, [
      SubTitles.PROBLEMS_WITH_FLUID_INTAKE,
      SubTitles.PROBLEMS_WITH_FOOD_INTAKE,
      SubTitles.PROBLEMS_WITH_UNHEALTHY_WEIGHT_CHANGE,
      SubTitles.PROBLEMS_WITH_OVERWEIGHT,
      SubTitles.PROBLEMS_WITH_UNDERWEIGHT,
    ]);
    /*SKIN_AND_MUCOUS_MEMBRANE*/
    this.titlesMap.set(Titles.SKIN_AND_MUCOUS_MEMBRANE, [
      SubTitles.PROBLEMS_WITH_SURGICAL_WOUND,
      SubTitles.PROBLEMS_WITH_DIABETIC_WOUND,
      SubTitles.PROBLEMS_WITH_CANCER_WOUND,
      SubTitles.PROBLEMS_WITH_DECUBITUS_ULCERS,
      SubTitles.PROBLEMS_WITH_ARTERIAL_WOUND,
      SubTitles.PROBLEMS_WITH_VENOUS_ULCERS,
      SubTitles.PROBLEMS_WITH_MIXED_WOUND,
      SubTitles.PROBLEMS_WITH_TRAUMATIC_WOUND,
      SubTitles.PROBLEMS_WITH_OTHER_SKIN_OR_MUCOUS_MEMBRANE,
    ]);
    /*COMMUNICATION*/
    this.titlesMap.set(Titles.COMMUNICATION, [
      SubTitles.PROBLEMS_WITH_COMMUNICATION,
    ]);
    /*PSYCHOSOCIAL_RELATIONSHIPS*/
    this.titlesMap.set(Titles.PSYCHOSOCIAL_RELATIONSHIPS, [
      SubTitles.PROBLEMS_WITH_Socializing,
      SubTitles.PROBLEMS_WITH_EMOTIONS,
      SubTitles.PROBLEMS_WITH_ABUSE,
      SubTitles.PROBLEMS_WITH_MENTALITY,
    ]);
    /*RESPIRATION_AND_CIRCULATION*/
    this.titlesMap.set(Titles.RESPIRATION_AND_CIRCULATION, [
      SubTitles.PROBLEMS_WITH_RESPIRATION,
      SubTitles.PROBLEMS_WITH_CIRCULATION,
    ]);
    /*SEXUALITY*/
    this.titlesMap.set(Titles.SEXUALITY, [SubTitles.PROBLEMS_WITH_SEXUALITY]);
    /*PAIN_AND_SENSORY_IMPRESSIONS*/
    this.titlesMap.set(Titles.PAIN_AND_SENSORY_IMPRESSIONS, [
      SubTitles.PROBLEMS_WITH_ACUTE_PAIN,
      SubTitles.PROBLEMS_WITH_PERIODIC_PAIN,
      SubTitles.PROBLEMS_WITH_CHRONIC_PAIN,
      SubTitles.PROBLEMS_WITH_VISION,
      SubTitles.PROBLEMS_WITH_SMELL,
      SubTitles.PROBLEMS_WITH_HEARING,
      SubTitles.PROBLEMS_WITH_TASTE,
      SubTitles.PROBLEMS_WITH_FEELING,
    ]);
    /*SLEEP_AND_REST*/
    this.titlesMap.set(Titles.SLEEP_AND_REST, [
      SubTitles.PROBLEMS_WITH_CIRCADIAN_RHYTHM,
      SubTitles.PROBLEMS_WITH_SLEEPING,
    ]);
    /*KNOWLEDGE_AND_DEVELOPMENT*/
    this.titlesMap.set(Titles.KNOWLEDGE_AND_DEVELOPMENT, [
      SubTitles.PROBLEMS_WITH_MEMORY,
      SubTitles.PROBLEMS_WITH_INSIGHT_IN_TREATMENT_PURPOSE,
      SubTitles.PROBLEMS_WITH_INSIGHT_IN_DISEASE,
      SubTitles.PROBLEMS_WITH_COGNITIVE_ABILITIES,
    ]);
    /*EXCRETION_OF_WASTE_MATERIALS*/
    this.titlesMap.set(Titles.EXCRETION_OF_WASTE_MATERIALS, [
      SubTitles.PROBLEMS_WITH_URINATION,
      SubTitles.PROBLEMS_WITH_URINARY_INCONTINENCE,
      SubTitles.PROBLEMS_WITH_FECAL_INCONTINENCE,
      SubTitles.PROBLEMS_WITH_STOMACH_AND_DIGESTIVE_SYSTEM,
      SubTitles.PROBLEMS_WITH_FLUID_FROM_DRAINAGE,
    ]);
  }

  getTitles(): Map<string, Array<string>> {
    return this.titlesMap;
  }
}

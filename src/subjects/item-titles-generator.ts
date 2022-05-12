export enum Titles {
  FUNCTION_LEVEL = 'Funktionsniveau',
  MUSCULOSKELETAL_SYSTEM = 'Bevægeapparatet',
  NUTRITION = 'Ernæring',
  SKIN_AND_MUCOUS_MEMBRANE = 'Hud og slimhinder',
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
}

export class TitlesGenerator {
  private titlesMap = new Map<string, Array<string>>();
  constructor() {
    this.titlesMap.set(Titles.FUNCTION_LEVEL, [
      SubTitles.PROBLEMS_WITH_PERSONAL_CARE,
      SubTitles.PROBLEMS_WITH_DAILY_ACTIVITIES,
    ]);
    this.titlesMap.set(Titles.MUSCULOSKELETAL_SYSTEM, [
      SubTitles.PROBLEMS_WITH_MOBILITY_AND_MOVEMENT,
    ]);
    this.titlesMap.set(Titles.NUTRITION, [
      SubTitles.PROBLEMS_WITH_FLUID_INTAKE,
      SubTitles.PROBLEMS_WITH_FOOD_INTAKE,
      SubTitles.PROBLEMS_WITH_UNHEALTHY_WEIGHT_CHANGE,
      SubTitles.PROBLEMS_WITH_OVERWEIGHT,
      SubTitles.PROBLEMS_WITH_UNDERWEIGHT,
    ]);
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
  }

  getTitles(): Map<string, Array<string>> {
    return this.titlesMap;
  }
}

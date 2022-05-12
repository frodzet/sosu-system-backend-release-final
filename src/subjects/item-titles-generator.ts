export enum Titles {
  FUNCTION_LEVEL = 'Funktionsniveau',
  MUSCULOSKELETAL_SYSTEM = 'Bevægeapparatet',
  NUTRITION = 'Ernæring',
}

export enum SubTitles {
  PROBLEMS_WITH_PERSONAL_CARE = 'Problemer med personlig pleje',
  PROBLEMS_WITH_DAILY_ACTIVITIES = 'Problemer med daglige aktiviteter',
  PROBLEMS_WITH_MOBILITY_AND_MOVEMENT = 'Problemer med mobilitet og bevægelse',
  PROBLEMS_WITH_FLUID_INTAKE = 'Problemer med væskeindtag',
  PROBLEMS_WITH_FOOD_INTAKE = 'Problemer med fødeindtag',
  PROBLEMS_WITH_UNHEALTHY_WEIGHT_CHANGE = 'Uhensigtsmæssig vægtændring',
  PROBLEMS_WITH_OVERWEIGHT = 'Problemer med overvægt',
  PROBLEMS_WITH_UNDERWEIGHT = 'Problemer med undervægt',
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
  }

  getTitles(): Map<string, Array<string>> {
    return this.titlesMap;
  }
}

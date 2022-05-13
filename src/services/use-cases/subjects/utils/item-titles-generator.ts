import {
  HealthConditionSubTitles,
  HealthConditionTitles,
} from './enums/health-condition-titles.enums';
import {
  GeneralInfoDescriptions,
  GeneralInfoTitles,
} from './enums/general-information-titles.enums';

export class TitlesGenerator {
  constructor() {
    this.generateGeneralInfoTitles();
    this.generateHealthConditionTitles();
  }

  generateHealthConditionTitles(): Map<string, Array<string>> {
    const titlesMap = new Map<string, Array<string>>();

    /*FUNCTION_LEVEL*/
    titlesMap.set(HealthConditionTitles.FUNCTION_LEVEL, [
      HealthConditionSubTitles.PROBLEMS_WITH_PERSONAL_CARE,
      HealthConditionSubTitles.PROBLEMS_WITH_DAILY_ACTIVITIES,
    ]);
    /*MUSCULOSKELETAL_SYSTEM*/
    titlesMap.set(HealthConditionTitles.MUSCULOSKELETAL_SYSTEM, [
      HealthConditionSubTitles.PROBLEMS_WITH_MOBILITY_AND_MOVEMENT,
    ]);
    /*NUTRITION*/
    titlesMap.set(HealthConditionTitles.NUTRITION, [
      HealthConditionSubTitles.PROBLEMS_WITH_FLUID_INTAKE,
      HealthConditionSubTitles.PROBLEMS_WITH_FOOD_INTAKE,
      HealthConditionSubTitles.PROBLEMS_WITH_UNHEALTHY_WEIGHT_CHANGE,
      HealthConditionSubTitles.PROBLEMS_WITH_OVERWEIGHT,
      HealthConditionSubTitles.PROBLEMS_WITH_UNDERWEIGHT,
    ]);
    /*SKIN_AND_MUCOUS_MEMBRANE*/
    titlesMap.set(HealthConditionTitles.SKIN_AND_MUCOUS_MEMBRANE, [
      HealthConditionSubTitles.PROBLEMS_WITH_SURGICAL_WOUND,
      HealthConditionSubTitles.PROBLEMS_WITH_DIABETIC_WOUND,
      HealthConditionSubTitles.PROBLEMS_WITH_CANCER_WOUND,
      HealthConditionSubTitles.PROBLEMS_WITH_DECUBITUS_ULCERS,
      HealthConditionSubTitles.PROBLEMS_WITH_ARTERIAL_WOUND,
      HealthConditionSubTitles.PROBLEMS_WITH_VENOUS_ULCERS,
      HealthConditionSubTitles.PROBLEMS_WITH_MIXED_WOUND,
      HealthConditionSubTitles.PROBLEMS_WITH_TRAUMATIC_WOUND,
      HealthConditionSubTitles.PROBLEMS_WITH_OTHER_SKIN_OR_MUCOUS_MEMBRANE,
    ]);
    /*COMMUNICATION*/
    titlesMap.set(HealthConditionTitles.COMMUNICATION, [
      HealthConditionSubTitles.PROBLEMS_WITH_COMMUNICATION,
    ]);
    /*PSYCHOSOCIAL_RELATIONSHIPS*/
    titlesMap.set(HealthConditionTitles.PSYCHOSOCIAL_RELATIONSHIPS, [
      HealthConditionSubTitles.PROBLEMS_WITH_Socializing,
      HealthConditionSubTitles.PROBLEMS_WITH_EMOTIONS,
      HealthConditionSubTitles.PROBLEMS_WITH_ABUSE,
      HealthConditionSubTitles.PROBLEMS_WITH_MENTALITY,
    ]);
    /*RESPIRATION_AND_CIRCULATION*/
    titlesMap.set(HealthConditionTitles.RESPIRATION_AND_CIRCULATION, [
      HealthConditionSubTitles.PROBLEMS_WITH_RESPIRATION,
      HealthConditionSubTitles.PROBLEMS_WITH_CIRCULATION,
    ]);
    /*SEXUALITY*/
    titlesMap.set(HealthConditionTitles.SEXUALITY, [
      HealthConditionSubTitles.PROBLEMS_WITH_SEXUALITY,
    ]);
    /*PAIN_AND_SENSORY_IMPRESSIONS*/
    titlesMap.set(HealthConditionTitles.PAIN_AND_SENSORY_IMPRESSIONS, [
      HealthConditionSubTitles.PROBLEMS_WITH_ACUTE_PAIN,
      HealthConditionSubTitles.PROBLEMS_WITH_PERIODIC_PAIN,
      HealthConditionSubTitles.PROBLEMS_WITH_CHRONIC_PAIN,
      HealthConditionSubTitles.PROBLEMS_WITH_VISION,
      HealthConditionSubTitles.PROBLEMS_WITH_SMELL,
      HealthConditionSubTitles.PROBLEMS_WITH_HEARING,
      HealthConditionSubTitles.PROBLEMS_WITH_TASTE,
      HealthConditionSubTitles.PROBLEMS_WITH_FEELING,
    ]);
    /*SLEEP_AND_REST*/
    titlesMap.set(HealthConditionTitles.SLEEP_AND_REST, [
      HealthConditionSubTitles.PROBLEMS_WITH_CIRCADIAN_RHYTHM,
      HealthConditionSubTitles.PROBLEMS_WITH_SLEEPING,
    ]);
    /*KNOWLEDGE_AND_DEVELOPMENT*/
    titlesMap.set(HealthConditionTitles.KNOWLEDGE_AND_DEVELOPMENT, [
      HealthConditionSubTitles.PROBLEMS_WITH_MEMORY,
      HealthConditionSubTitles.PROBLEMS_WITH_INSIGHT_IN_TREATMENT_PURPOSE,
      HealthConditionSubTitles.PROBLEMS_WITH_INSIGHT_IN_DISEASE,
      HealthConditionSubTitles.PROBLEMS_WITH_COGNITIVE_ABILITIES,
    ]);
    /*EXCRETION_OF_WASTE_MATERIALS*/
    titlesMap.set(HealthConditionTitles.EXCRETION_OF_WASTE_MATERIALS, [
      HealthConditionSubTitles.PROBLEMS_WITH_URINATION,
      HealthConditionSubTitles.PROBLEMS_WITH_URINARY_INCONTINENCE,
      HealthConditionSubTitles.PROBLEMS_WITH_FECAL_INCONTINENCE,
      HealthConditionSubTitles.PROBLEMS_WITH_STOMACH_AND_DIGESTIVE_SYSTEM,
      HealthConditionSubTitles.PROBLEMS_WITH_FLUID_FROM_DRAINAGE,
    ]);

    return titlesMap;
  }

  generateGeneralInfoTitles(): Map<string, string> {
    const titlesMap = new Map<string, string>();

    titlesMap.set(
      GeneralInfoTitles.MASTERING,
      GeneralInfoDescriptions.MASTERING_DESCRIPTION,
    );
    titlesMap.set(
      GeneralInfoTitles.MOTIVATION,
      GeneralInfoDescriptions.MOTIVATION_DESCRIPTION,
    );
    titlesMap.set(
      GeneralInfoTitles.RESOURCES,
      GeneralInfoDescriptions.RESOURCES_DESCRIPTION,
    );
    titlesMap.set(
      GeneralInfoTitles.ROLLS,
      GeneralInfoDescriptions.ROLES_DESCRIPTION,
    );
    titlesMap.set(
      GeneralInfoTitles.HABITS,
      GeneralInfoDescriptions.HABITS_DESCRIPTION,
    );
    titlesMap.set(
      GeneralInfoTitles.EDUCATION_OR_JOB,
      GeneralInfoDescriptions.EDUCATION_OR_JOB_DESCRIPTION,
    );
    titlesMap.set(
      GeneralInfoTitles.LIFE_STORY,
      GeneralInfoDescriptions.LIFE_STORY_DESCRIPTION,
    );
    titlesMap.set(
      GeneralInfoTitles.SOCIAL_CIRCLE,
      GeneralInfoDescriptions.SOCIAL_CIRCLE_DESCRIPTION,
    );
    titlesMap.set(
      GeneralInfoTitles.HEALTH_INFORMATION,
      GeneralInfoDescriptions.HEALTH_INFORMATION_DESCRIPTION,
    );
    titlesMap.set(
      GeneralInfoTitles.ASSISTIVE_DEVICES,
      GeneralInfoDescriptions.ASSISTIVE_DEVICES_DESCRIPTION,
    );
    titlesMap.set(
      GeneralInfoTitles.HOME_INTERIOR_DESIGN,
      GeneralInfoDescriptions.HOME_INTERIOR_DESIGN_DESCRIPTION,
    );

    return titlesMap;
  }
}

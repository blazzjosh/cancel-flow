export interface SurveyAnswers {
    foundJobWithMigrateMate: string;
    rolesApplied: string;
    companiesEmailed: string;
    companiesInterviewed: string;
}

export type DownsellVariant = 'A' | 'B';
export type FlowStep = 'initial' | 'congrats' | 'yesWithMM' | 'downsell';
export type JobFoundAnswer = 'yes' | 'no' | null;

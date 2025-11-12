export type Language = 'en' | 'pl' | 'fr';

export interface ConsentFormData {
  projectTitle: string;
  researcherName: string;
  institution: string;
  contactEmail: string;
  purposeOfStudy: string;
  dataCollected: string;
  storageDuration: string;
  participantRights: string[];
  consentStatement: string;
  includeGDPR: boolean;
  language: Language;
}

export interface LanguageTemplate {
  title: string;
  researcherLabel: string;
  institutionLabel: string;
  contactLabel: string;
  purposeLabel: string;
  dataCollectedLabel: string;
  storageDurationLabel: string;
  rightsLabel: string;
  consentStatementLabel: string;
  signatureLabel: string;
  dateLabel: string;
  gdprStatement: string;
  defaultRights: string[];
  defaultConsentStatement: string;
}

import { LanguageTemplate, Language } from '@/types/consent';

export const templates: Record<Language, LanguageTemplate> = {
  en: {
    title: "Research Participant Consent Form",
    researcherLabel: "Researcher",
    institutionLabel: "Institution / Department",
    contactLabel: "Contact",
    purposeLabel: "Purpose of the Study",
    dataCollectedLabel: "Data Collected",
    storageDurationLabel: "Duration of Data Storage",
    rightsLabel: "Your Rights",
    consentStatementLabel: "Consent Statement",
    signatureLabel: "Signature",
    dateLabel: "Date",
    gdprStatement: "Your data will be processed in accordance with the EU General Data Protection Regulation (GDPR). You have the right to access, correct, or delete your data at any time by contacting the researcher.",
    defaultRights: [
      "You may withdraw at any time without penalty",
      "Your data will remain confidential and anonymous",
      "You have the right to access your data",
      "You can request deletion of your data"
    ],
    defaultConsentStatement: "I have read and understood the information provided above. I voluntarily agree to participate in this research study."
  },
  pl: {
    title: "Formularz Zgody Uczestnika Badania",
    researcherLabel: "Badacz",
    institutionLabel: "Instytucja / Wydział",
    contactLabel: "Kontakt",
    purposeLabel: "Cel badania",
    dataCollectedLabel: "Zbierane dane",
    storageDurationLabel: "Okres przechowywania danych",
    rightsLabel: "Prawa uczestnika",
    consentStatementLabel: "Oświadczenie o zgodzie",
    signatureLabel: "Podpis",
    dateLabel: "Data",
    gdprStatement: "Twoje dane będą przetwarzane zgodnie z ogólnym rozporządzeniem o ochronie danych UE (RODO). Masz prawo do dostępu, poprawiania lub usunięcia swoich danych w dowolnym momencie, kontaktując się z badaczem.",
    defaultRights: [
      "Możesz wycofać się z badania w dowolnym momencie bez konsekwencji",
      "Twoje dane pozostaną poufne i anonimowe",
      "Masz prawo dostępu do swoich danych",
      "Możesz zażądać usunięcia swoich danych"
    ],
    defaultConsentStatement: "Zapoznałem(-am) się z powyższymi informacjami i dobrowolnie wyrażam zgodę na udział w badaniu."
  },
  fr: {
    title: "Formulaire de Consentement du Participant à la Recherche",
    researcherLabel: "Chercheur",
    institutionLabel: "Institution / Département",
    contactLabel: "Contact",
    purposeLabel: "Objectif de l'étude",
    dataCollectedLabel: "Données collectées",
    storageDurationLabel: "Durée de conservation des données",
    rightsLabel: "Vos droits",
    consentStatementLabel: "Déclaration de consentement",
    signatureLabel: "Signature",
    dateLabel: "Date",
    gdprStatement: "Vos données seront traitées conformément au Règlement Général sur la Protection des Données (RGPD) de l'UE. Vous avez le droit d'accéder, de corriger ou de supprimer vos données à tout moment en contactant le chercheur.",
    defaultRights: [
      "Vous pouvez vous retirer à tout moment sans pénalité",
      "Vos données resteront confidentielles et anonymes",
      "Vous avez le droit d'accéder à vos données",
      "Vous pouvez demander la suppression de vos données"
    ],
    defaultConsentStatement: "J'ai lu et compris les informations fournies ci-dessus. J'accepte volontairement de participer à cette étude de recherche."
  }
};

export const languageOptions = [
  { value: 'en', label: 'English' },
  { value: 'pl', label: 'Polski' },
  { value: 'fr', label: 'Français' }
];

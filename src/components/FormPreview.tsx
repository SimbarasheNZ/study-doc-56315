import { ConsentFormData } from '@/types/consent';
import { templates } from '@/data/templates';
import { Card } from '@/components/ui/card';

interface FormPreviewProps {
  formData: ConsentFormData;
}

export const FormPreview = ({ formData }: FormPreviewProps) => {
  const template = templates[formData.language];

  return (
    <Card className="p-8 bg-white border shadow-sm">
      <div className="space-y-6 font-serif">
        {/* Title */}
        <div className="text-center border-b pb-4">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            {formData.projectTitle || '[Project Title]'}
          </h1>
          <h2 className="text-xl font-semibold text-muted-foreground">
            {template.title}
          </h2>
        </div>

        {/* Researcher Information */}
        <div className="space-y-2 text-sm">
          <p>
            <span className="font-semibold">{template.researcherLabel}:</span>{' '}
            {formData.researcherName || '[Researcher Name]'}
          </p>
          <p>
            <span className="font-semibold">{template.institutionLabel}:</span>{' '}
            {formData.institution || '[Institution / Department]'}
          </p>
          <p>
            <span className="font-semibold">{template.contactLabel}:</span>{' '}
            {formData.contactEmail || '[Contact Email]'}
          </p>
        </div>

        {/* Purpose */}
        <div>
          <h3 className="font-semibold text-base mb-2">{template.purposeLabel}:</h3>
          <p className="text-sm whitespace-pre-wrap">
            {formData.purposeOfStudy || '[Purpose of the study]'}
          </p>
        </div>

        {/* Data Collection */}
        <div className="space-y-2 text-sm">
          <p>
            <span className="font-semibold">{template.dataCollectedLabel}:</span>{' '}
            {formData.dataCollected || '[Data types]'}
          </p>
          <p>
            <span className="font-semibold">{template.storageDurationLabel}:</span>{' '}
            {formData.storageDuration || '[Duration]'}
          </p>
        </div>

        {/* Rights */}
        <div>
          <h3 className="font-semibold text-base mb-2">{template.rightsLabel}:</h3>
          <ul className="list-disc list-inside space-y-1 text-sm">
            {formData.participantRights.length > 0 ? (
              formData.participantRights.map((right, index) => (
                <li key={index}>{right}</li>
              ))
            ) : (
              <li>[Participant rights]</li>
            )}
          </ul>
        </div>

        {/* Consent Statement */}
        <div>
          <h3 className="font-semibold text-base mb-2">{template.consentStatementLabel}:</h3>
          <p className="text-sm whitespace-pre-wrap">
            {formData.consentStatement || template.defaultConsentStatement}
          </p>
        </div>

        {/* GDPR */}
        {formData.includeGDPR && (
          <div className="bg-accent/30 p-4 rounded-md">
            <h3 className="font-semibold text-base mb-2">GDPR Compliance:</h3>
            <p className="text-sm">{template.gdprStatement}</p>
          </div>
        )}

        {/* Signature */}
        <div className="pt-8 space-y-6">
          <div className="flex items-end gap-2">
            <span className="text-sm font-semibold min-w-fit">{template.signatureLabel}:</span>
            <div className="flex-1 border-b border-foreground/40"></div>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-sm font-semibold min-w-fit">{template.dateLabel}:</span>
            <div className="flex-1 border-b border-foreground/40"></div>
          </div>
        </div>
      </div>
    </Card>
  );
};

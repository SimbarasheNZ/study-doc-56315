import { jsPDF } from 'jspdf';
import { ConsentFormData } from '@/types/consent';
import { templates } from '@/data/templates';

export const exportToPdf = (formData: ConsentFormData) => {
  const doc = new jsPDF();
  const template = templates[formData.language];
  let yPosition = 20;
  const lineHeight = 7;
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const maxWidth = pageWidth - 2 * margin;

  // Helper function to add text with wrapping
  const addText = (text: string, fontSize: number = 11, isBold: boolean = false) => {
    doc.setFontSize(fontSize);
    if (isBold) {
      doc.setFont('helvetica', 'bold');
    } else {
      doc.setFont('helvetica', 'normal');
    }
    
    const lines = doc.splitTextToSize(text, maxWidth);
    lines.forEach((line: string) => {
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }
      doc.text(line, margin, yPosition);
      yPosition += lineHeight;
    });
  };

  // Title
  addText(formData.projectTitle, 16, true);
  yPosition += 3;
  addText(template.title, 14, true);
  yPosition += 5;

  // Researcher Info
  addText(`${template.researcherLabel}: ${formData.researcherName}`, 11, false);
  addText(`${template.institutionLabel}: ${formData.institution}`, 11, false);
  addText(`${template.contactLabel}: ${formData.contactEmail}`, 11, false);
  yPosition += 5;

  // Purpose
  addText(template.purposeLabel, 12, true);
  addText(formData.purposeOfStudy, 11, false);
  yPosition += 3;

  // Data Collected
  addText(`${template.dataCollectedLabel}: ${formData.dataCollected}`, 11, false);
  addText(`${template.storageDurationLabel}: ${formData.storageDuration}`, 11, false);
  yPosition += 5;

  // Rights
  addText(template.rightsLabel, 12, true);
  formData.participantRights.forEach(right => {
    addText(`• ${right}`, 11, false);
  });
  yPosition += 5;

  // Consent Statement
  addText(template.consentStatementLabel, 12, true);
  addText(formData.consentStatement, 11, false);
  yPosition += 5;

  // GDPR Statement
  if (formData.includeGDPR) {
    addText('GDPR Compliance', 12, true);
    addText(template.gdprStatement, 11, false);
    yPosition += 5;
  }

  // Signature Section
  yPosition += 10;
  doc.text(`${template.signatureLabel}: ______________________________`, margin, yPosition);
  yPosition += 10;
  doc.text(`${template.dateLabel}: ______________________________`, margin, yPosition);

  // Save the PDF
  const fileName = `${formData.projectTitle.replace(/\s+/g, '_')}_consent_form.pdf`;
  doc.save(fileName);
};

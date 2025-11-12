import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import { ConsentFormData } from '@/types/consent';
import { templates } from '@/data/templates';

export const exportToDocx = (formData: ConsentFormData) => {
  const template = templates[formData.language];

  // Create a simple document structure
  const content = `
${formData.projectTitle}

${template.title}

${template.researcherLabel}: ${formData.researcherName}
${template.institutionLabel}: ${formData.institution}
${template.contactLabel}: ${formData.contactEmail}

${template.purposeLabel}:
${formData.purposeOfStudy}

${template.dataCollectedLabel}: ${formData.dataCollected}
${template.storageDurationLabel}: ${formData.storageDuration}

${template.rightsLabel}:
${formData.participantRights.map(right => `• ${right}`).join('\n')}

${template.consentStatementLabel}:
${formData.consentStatement}

${formData.includeGDPR ? `\nGDPR Compliance:\n${template.gdprStatement}\n` : ''}

${template.signatureLabel}: ______________________________

${template.dateLabel}: ______________________________
  `.trim();

  // Create a minimal DOCX structure
  const docxContent = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>
    ${content.split('\n').map(line => {
      if (!line.trim()) {
        return '<w:p></w:p>';
      }
      const isBold = line === formData.projectTitle || line === template.title || 
                     line.endsWith(':') && !line.includes('_');
      return `
        <w:p>
          <w:r>
            ${isBold ? '<w:rPr><w:b/></w:rPr>' : ''}
            <w:t xml:space="preserve">${line.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</w:t>
          </w:r>
        </w:p>
      `;
    }).join('')}
  </w:body>
</w:document>`;

  // Create the DOCX package
  const zip = new PizZip();
  
  // Add required files
  zip.file('[Content_Types].xml', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
</Types>`);

  zip.file('_rels/.rels', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>`);

  zip.file('word/document.xml', docxContent);

  zip.file('word/_rels/document.xml.rels', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
</Relationships>`);

  // Generate and download
  const blob = zip.generate({
    type: 'blob',
    mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  });

  const fileName = `${formData.projectTitle.replace(/\s+/g, '_')}_consent_form.docx`;
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
};

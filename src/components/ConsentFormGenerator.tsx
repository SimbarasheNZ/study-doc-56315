import { useState } from 'react';
import { ConsentFormData, Language } from '@/types/consent';
import { templates, languageOptions } from '@/data/templates';
import { FormPreview } from './FormPreview';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { FileDown, FileText, Download } from 'lucide-react';
import { exportToPdf } from '@/utils/exportToPdf';
import { exportToDocx } from '@/utils/exportToDocx';
import { toast } from 'sonner';

export const ConsentFormGenerator = () => {
  const [formData, setFormData] = useState<ConsentFormData>({
    projectTitle: '',
    researcherName: '',
    institution: '',
    contactEmail: '',
    purposeOfStudy: '',
    dataCollected: '',
    storageDuration: '',
    participantRights: [],
    consentStatement: '',
    includeGDPR: false,
    language: 'en',
  });

  const currentTemplate = templates[formData.language];

  const handleLanguageChange = (newLanguage: Language) => {
    const newTemplate = templates[newLanguage];
    setFormData(prev => ({
      ...prev,
      language: newLanguage,
      participantRights: prev.participantRights.length === 0 ? newTemplate.defaultRights : prev.participantRights,
      consentStatement: prev.consentStatement === '' || prev.consentStatement === templates[prev.language].defaultConsentStatement 
        ? newTemplate.defaultConsentStatement 
        : prev.consentStatement,
    }));
  };

  const handleRightToggle = (right: string) => {
    setFormData(prev => ({
      ...prev,
      participantRights: prev.participantRights.includes(right)
        ? prev.participantRights.filter(r => r !== right)
        : [...prev.participantRights, right],
    }));
  };

  const handleExportPdf = () => {
    if (!formData.projectTitle.trim()) {
      toast.error('Please enter a project title before exporting');
      return;
    }
    exportToPdf(formData);
    toast.success('PDF downloaded successfully!');
  };

  const handleExportDocx = () => {
    if (!formData.projectTitle.trim()) {
      toast.error('Please enter a project title before exporting');
      return;
    }
    exportToDocx(formData);
    toast.success('Word document downloaded successfully!');
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-primary">ConsentBuilder</h1>
              <p className="text-muted-foreground mt-1">Generate research consent forms in minutes</p>
            </div>
            <Select value={formData.language} onValueChange={(value) => handleLanguageChange(value as Language)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languageOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            <Card className="p-6 bg-white shadow-sm">
              <h2 className="text-2xl font-semibold mb-6 text-foreground">Form Details</h2>
              
              <div className="space-y-5">
                {/* Project Title */}
                <div>
                  <Label htmlFor="projectTitle" className="text-base">Project Title *</Label>
                  <Input
                    id="projectTitle"
                    value={formData.projectTitle}
                    onChange={(e) => setFormData(prev => ({ ...prev, projectTitle: e.target.value }))}
                    placeholder="Enter your research project title"
                    className="mt-1.5"
                  />
                </div>

                {/* Researcher Name */}
                <div>
                  <Label htmlFor="researcherName" className="text-base">{currentTemplate.researcherLabel} *</Label>
                  <Input
                    id="researcherName"
                    value={formData.researcherName}
                    onChange={(e) => setFormData(prev => ({ ...prev, researcherName: e.target.value }))}
                    placeholder="Your name"
                    className="mt-1.5"
                  />
                </div>

                {/* Institution */}
                <div>
                  <Label htmlFor="institution" className="text-base">{currentTemplate.institutionLabel} *</Label>
                  <Input
                    id="institution"
                    value={formData.institution}
                    onChange={(e) => setFormData(prev => ({ ...prev, institution: e.target.value }))}
                    placeholder="University or organization"
                    className="mt-1.5"
                  />
                </div>

                {/* Contact Email */}
                <div>
                  <Label htmlFor="contactEmail" className="text-base">{currentTemplate.contactLabel} *</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData(prev => ({ ...prev, contactEmail: e.target.value }))}
                    placeholder="your.email@example.com"
                    className="mt-1.5"
                  />
                </div>

                {/* Purpose of Study */}
                <div>
                  <Label htmlFor="purposeOfStudy" className="text-base">{currentTemplate.purposeLabel} *</Label>
                  <Textarea
                    id="purposeOfStudy"
                    value={formData.purposeOfStudy}
                    onChange={(e) => setFormData(prev => ({ ...prev, purposeOfStudy: e.target.value }))}
                    placeholder="Describe the purpose and goals of your research"
                    className="mt-1.5 min-h-[100px]"
                  />
                </div>

                {/* Data Collected */}
                <div>
                  <Label htmlFor="dataCollected" className="text-base">{currentTemplate.dataCollectedLabel}</Label>
                  <Input
                    id="dataCollected"
                    value={formData.dataCollected}
                    onChange={(e) => setFormData(prev => ({ ...prev, dataCollected: e.target.value }))}
                    placeholder="e.g., interviews, surveys, audio recordings"
                    className="mt-1.5"
                  />
                </div>

                {/* Storage Duration */}
                <div>
                  <Label htmlFor="storageDuration" className="text-base">{currentTemplate.storageDurationLabel}</Label>
                  <Input
                    id="storageDuration"
                    value={formData.storageDuration}
                    onChange={(e) => setFormData(prev => ({ ...prev, storageDuration: e.target.value }))}
                    placeholder="e.g., 5 years, until study completion"
                    className="mt-1.5"
                  />
                </div>

                {/* Participant Rights */}
                <div>
                  <Label className="text-base mb-3 block">{currentTemplate.rightsLabel}</Label>
                  <div className="space-y-2.5 bg-muted/50 p-4 rounded-md">
                    {currentTemplate.defaultRights.map((right, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <Checkbox
                          id={`right-${index}`}
                          checked={formData.participantRights.includes(right)}
                          onCheckedChange={() => handleRightToggle(right)}
                        />
                        <label
                          htmlFor={`right-${index}`}
                          className="text-sm leading-relaxed cursor-pointer"
                        >
                          {right}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Consent Statement */}
                <div>
                  <Label htmlFor="consentStatement" className="text-base">{currentTemplate.consentStatementLabel}</Label>
                  <Textarea
                    id="consentStatement"
                    value={formData.consentStatement || currentTemplate.defaultConsentStatement}
                    onChange={(e) => setFormData(prev => ({ ...prev, consentStatement: e.target.value }))}
                    className="mt-1.5 min-h-[80px]"
                  />
                </div>

                {/* GDPR Checkbox */}
                <div className="flex items-start space-x-3 bg-accent/50 p-4 rounded-md">
                  <Checkbox
                    id="includeGDPR"
                    checked={formData.includeGDPR}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, includeGDPR: checked as boolean }))}
                  />
                  <label htmlFor="includeGDPR" className="text-sm leading-relaxed cursor-pointer">
                    Include GDPR compliance statement
                  </label>
                </div>
              </div>
            </Card>

            {/* Export Buttons */}
            <div className="flex gap-4">
              <Button onClick={handleExportPdf} className="flex-1" size="lg">
                <FileText className="mr-2 h-5 w-5" />
                Download PDF
              </Button>
              <Button onClick={handleExportDocx} variant="outline" className="flex-1" size="lg">
                <FileDown className="mr-2 h-5 w-5" />
                Download Word
              </Button>
            </div>
          </div>

          {/* Preview Section */}
          <div className="lg:sticky lg:top-8 h-fit">
            <div className="mb-4 flex items-center gap-2 text-muted-foreground">
              <Download className="h-4 w-4" />
              <span className="text-sm font-medium">Live Preview</span>
            </div>
            <FormPreview formData={formData} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>Open-source tool for researchers • All processing done locally in your browser</p>
          <p className="mt-1">No data is stored or transmitted</p>
        </div>
      </footer>
    </div>
  );
};

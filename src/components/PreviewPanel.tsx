import React, { useRef, useState } from 'react';
import { Download, Loader, Save, FileSpreadsheet, Mail, X } from 'lucide-react';
import { generatePDF } from '../utils/pdf';
import InternshipLetterTemplate from './templates/InternshipLetterTemplate';
import CertificateTemplate from './templates/CertificateTemplate';
import ExperienceCertificateTemplate from './templates/ExperienceLetter';
import ExcelBulkGenerator, { sendSingleDocumentByEmail } from './ExcelBulkGenerator';
import RelievingLetterTemplate from './templates/RelievingLetterTemplate';
import ExitFormalityFinal from './templates/ExitFormalityFinal';
import HikeLetterTemplate from './templates/HikeLetterTemplate';
import SalarySlipTemplate from './templates/SalarySlipTemplate';

interface PreviewPanelProps {
  templateType: string;
  formData: any;
  isGeneratingPDF: boolean;
  setIsGeneratingPDF: (value: boolean) => void;
  setFilePath: (path: string) => void;
  filePath?: string;
  onSave?: () => void;
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({
  templateType,
  formData,
  isGeneratingPDF,
  setIsGeneratingPDF,
  setFilePath,
  filePath,
  onSave
}) => {
  const previewRef = useRef(null);
  const hiddenPdfContentRef = useRef(null);
  const [showBulkGenerator, setShowBulkGenerator] = useState(false);
  const [showEmailPopup, setShowEmailPopup] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState('');
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailError, setEmailError] = useState('');

  const renderTemplate = () => {
    switch (templateType) {
      case 'internshipLetter':
        return <InternshipLetterTemplate formData={formData} />;
      case 'certificate':
        return <CertificateTemplate formData={formData} />;
      case 'experienceCertificate':
        return <ExperienceCertificateTemplate formData={formData} />;
      case 'relievingLetter':
        return <RelievingLetterTemplate formData={formData} />;
      case 'exitFormalityFinal':
        return <ExitFormalityFinal formData={formData} />;
      case 'hikeLetter':
        return <HikeLetterTemplate formData={formData} />;
      case 'salarySlip':
        return <SalarySlipTemplate formData={formData} />;

      default:
        return <InternshipLetterTemplate formData={formData} />;
    }
  };

  const getTemplateTitle = () => {
    switch (templateType) {
      case 'internshipLetter':
        return 'internship_letter';
      case 'certificate':
        return 'certificate';
      case 'experienceCertificate':
        return 'experience_certificate';
      case 'relievingLetter':
        return 'relieving_letter';
      case 'exitFormalityFinal':
        return 'exit_formality_final';
      case 'hikeLetter':
        return 'hike_letter';
      case 'salarySlip':
        return 'salary_Slip';
      default:
        return 'document';
    }
  };

  const handleGeneratePDF = async () => {
    if (!hiddenPdfContentRef.current) {
      console.error('Hidden PDF content not found');
      alert('Error: Content not found. Cannot generate PDF.');
      return;
    }

    setIsGeneratingPDF(true);

    try {
      console.log('Generating PDF with content:', hiddenPdfContentRef.current);
      const filename = await generatePDF(hiddenPdfContentRef.current, getTemplateTitle());
      setFilePath(filename);
      console.log(`PDF successfully generated: ${filename}`);
    } catch (error) {
      console.error('PDF generation failed:', error);
      alert('Failed to generate PDF. Please try again.\n\nError: ' + error.message);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleSendEmail = async () => {
    if (!recipientEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipientEmail)) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    setEmailError('');
    setIsSendingEmail(true);

    try {
      await sendSingleDocumentByEmail(templateType, formData, recipientEmail);
      alert(`Email sent successfully to ${recipientEmail}!`);
      setShowEmailPopup(false);
      setRecipientEmail('');
    } catch (error) {
      console.error('Error sending email:', error);
      alert(`Failed to send email to ${recipientEmail}: ${error.message}`);
    } finally {
      setIsSendingEmail(false);
    }
  };

  return (
    <div className="w-full md:w-1/2 flex flex-col">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex-grow relative overflow-hidden">
        <div className="flex justify-between mb-4 items-center">
          <h2 className="text-xl font-semibold text-gray-800">Preview</h2>
          <div className="flex space-x-2">
            {onSave && (
              <button
                onClick={onSave}
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
              >
                <Save className="mr-2 h-4 w-4" />
                Save
              </button>
            )}

            <button
              onClick={() => setShowBulkGenerator(true)}
              className="inline-flex items-center px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200"
            >
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              Excel Bulk Generator
            </button>

            <button
              onClick={handleGeneratePDF}
              disabled={isGeneratingPDF}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isGeneratingPDF ? (
                <>
                  <Loader className="animate-spin -ml-1 mr-2 h-4 w-4" />
                  Generating PDF...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </>
              )}
            </button>

            <button
              onClick={() => setShowEmailPopup(true)}
              disabled={isSendingEmail}
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-green-300 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isSendingEmail ? (
                <>
                  <Loader className="animate-spin -ml-1 mr-2 h-4 w-4" />
                  Sending Email...
                </>
              ) : (
                <>
                  <Mail className="mr-2 h-4 w-4" />
                  Send Email
                </>
              )}
            </button>
          </div>
        </div>

        {filePath && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-green-700">
                  <span className="font-medium">Success!</span> PDF generated:
                  <span className="font-mono ml-1 bg-green-100 px-1 rounded">{filePath}</span>
                </p>
              </div>
            </div>
          </div>
        )}

        <div
          ref={previewRef}
          className="preview-content overflow-y-auto overflow-x-hidden max-h-[calc(100vh-16rem)] bg-gray-100 p-4 space-y-4"
          style={{ minHeight: '400px' }}
        >
          <style>
            {`
              .page {
                width: 100%;
                min-height: 300px;
                max-width: 800px;
                background-color: #ffffff;
                padding: 20px;
                box-sizing: border-box;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                margin: 0 auto 20px;
                font-size: 12pt;
                line-height: 1.4;
                font-family: "Times New Roman", serif;
                color: #000000;
                overflow: visible;
              }
              @media print {
                .page {
                  break-before: page;
                  margin: 0;
                  box-shadow: none;
                  width: 210mm;
                  min-height: 297mm;
                  padding: 20mm;
                }
              }
            `}
          </style>
          {renderTemplate()}
        </div>

        <div
          ref={hiddenPdfContentRef}
          className="pdf-content"
          style={{
            textAlign: 'justify',
            position: 'absolute',
            left: '-10000px',
            top: '-10000px',
            width: '210mm',
            height: '297mm',
            backgroundColor: '#ffffff',
            padding: '20mm',
            boxSizing: 'border-box',
            fontSize: '6.8pt',
            lineHeight: '1.4',
            fontFamily: '"Times New Roman", Times, serif',
            color: '#000000',
            overflow: 'visible',
            visibility: 'visible',
            zIndex: '-1',
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
            textRendering: 'optimizeLegibility',
            wordWrap: 'break-word',
            overflowWrap: 'break-word',
          }}
        >
          {renderTemplate()}
        </div>
      </div>

      {showBulkGenerator && (
        <ExcelBulkGenerator
          templateType={templateType}
          onClose={() => setShowBulkGenerator(false)}
        />
      )}

      {showEmailPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Send Document via Email</h3>
              <button
                onClick={() => {
                  setShowEmailPopup(false);
                  setRecipientEmail('');
                  setEmailError('');
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="mb-4">
              <label htmlFor="recipientEmail" className="block text-sm font-medium text-gray-700 mb-1">
                Recipient Email
              </label>
              <input
                type="email"
                id="recipientEmail"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter email address"
              />
              {emailError && (
                <p className="mt-1 text-sm text-red-600">{emailError}</p>
              )}
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => {
                  setShowEmailPopup(false);
                  setRecipientEmail('');
                  setEmailError('');
                }}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSendEmail}
                disabled={isSendingEmail}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-green-300 disabled:cursor-not-allowed"
              >
                {isSendingEmail ? (
                  <>
                    <Loader className="animate-spin -ml-1 mr-2 h-4 w-4 inline" />
                    Sending...
                  </>
                ) : (
                  'Send'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PreviewPanel;
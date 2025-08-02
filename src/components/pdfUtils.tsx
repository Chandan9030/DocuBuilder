import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import DOMPurify from 'dompurify';
import ReactDOM from 'react-dom/client';
import { FormData } from '../utils/types';
import InternshipLetterTemplate from './templates/InternshipLetterTemplate';
import OfferLetterTemplate from './templates/OfferLetterTemplate';
import CertificateTemplate from './templates/CertificateTemplate';
import ExperienceLetter from './templates/ExperienceLetter';
import ExitFormalityFinal from './templates/ExitFormalityFinal';
import HikeLetterTemplate from './templates/HikeLetterTemplate';
import RelievingLetterTemplate from './templates/RelievingLetterTemplate';
import SalarySlipTemplate from './templates/SalarySlipTemplate';
import PaymentReceiptTemplate from './templates/PaymentReceiptTemplate';

const defaultTemplateComponents: Record<string, React.FC<{ formData: FormData; templateContent?: string }>> = {
  internshipLetter: InternshipLetterTemplate,
  offerLetter: OfferLetterTemplate,
  certificate: CertificateTemplate,
  experienceCertificate: ExperienceLetter,
  exitFormality: ExitFormalityFinal,
  hikeLetter: HikeLetterTemplate,
  relievingLetter: RelievingLetterTemplate,
  salarySlip: SalarySlipTemplate,
  paymentReceipt: PaymentReceiptTemplate,
};

const templateOptions = [
  { value: 'internshipLetter', label: 'Internship Letter' },
  { value: 'offerLetter', label: 'Offer Letter' },
  { value: 'certificate', label: 'Certificate' },
  { value: 'experienceCertificate', label: 'Experience Certificate' },
  { value: 'exitFormality', label: 'Exit Formality' },
  { value: 'hikeLetter', label: 'Hike Letter' },
  { value: 'relievingLetter', label: 'Relieving Letter' },
  { value: 'salarySlip', label: 'Salary Slip' },
  { value: 'paymentReceipt', label: 'Payment Receipt' },
];

export const generateAllDocuments = async (
  excelData: FormData[],
  selectedRows: Set<number>,
  selectedTemplate: string,
  setIsProcessing: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (!selectedTemplate || excelData.length === 0 || selectedRows.size === 0) {
    alert('Please select a template, upload Excel data, and choose at least one record.');
    return;
  }

  setIsProcessing(true);

  try {
    let successCount = 0;
    const failedIndices: number[] = [];

    for (const index of selectedRows) {
      if (index < 0 || index >= excelData.length) {
        console.error(`Invalid index: ${index}`);
        failedIndices.push(index + 1);
        continue;
      }

      try {
        const data = excelData[index];
        const TemplateComponent = defaultTemplateComponents[selectedTemplate] || OfferLetterTemplate;
        const editedContent = DOMPurify.sanitize(data.customTemplate || '');
        console.log(`Generating PDF for index ${index}, recipient: ${data.recipientName}, customTemplate:`, editedContent);

        const tempContainer = document.createElement('div');
        tempContainer.id = `pdf-container-${index}`;
        Object.assign(tempContainer.style, {
          textAlign: 'justify',
          position: 'absolute',
          left: '-10000px',
          top: '-10000px',
          width: '210mm',
          minHeight: '297mm',
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
        });
        document.body.appendChild(tempContainer);

        const root = ReactDOM.createRoot(tempContainer);
        root.render(<TemplateComponent formData={data} templateContent={editedContent} />);

        await new Promise(resolve => setTimeout(resolve, 2000));

        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4',
          compress: true,
        });

        const pageSections = tempContainer.querySelectorAll('.pdf-page');
        
        if (pageSections.length === 0) {
          const canvas = await html2canvas(tempContainer, {
            scale: 2,
            useCORS: true,
            logging: true,
            scrollX: 0,
            scrollY: 0,
            windowWidth: tempContainer.scrollWidth,
            windowHeight: tempContainer.scrollHeight,
          });

          const imgWidth = 210;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
          pdf.addImage(canvas.toDataURL('image/jpeg', 0.7), 'JPEG', 0, 0, imgWidth, imgHeight);
        } else {
          for (let i = 0; i < pageSections.length; i++) {
            const section = pageSections[i] as HTMLElement;
            const pageContainer = document.createElement('div');
            Object.assign(pageContainer.style, {
              width: '210mm',
              minHeight: '297mm',
              padding: '20mm',
              boxSizing: 'border-box',
              backgroundColor: '#ffffff',
            });
            pageContainer.appendChild(section.cloneNode(true));
            document.body.appendChild(pageContainer);

            const canvas = await html2canvas(pageContainer, {
              scale: 2,
              useCORS: true,
              logging: true,
            });

            const imgWidth = 210;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            if (i > 0) {
              pdf.addPage();
            }

            pdf.addImage(canvas.toDataURL('image/jpeg', 0.7), 'JPEG', 0, 0, imgWidth, imgHeight);
            document.body.removeChild(pageContainer);
          }
        }

        const templateLabel = templateOptions.find(opt => opt.value === selectedTemplate)?.label.replace(/\s+/g, '_') || 'Document';
        const safeName = (data.employeeName || data.recipientName)?.replace(/[^a-zA-Z0-9]/g, '_') || 'document';
        const filename = `${templateLabel}_${safeName}_${index + 1}.pdf`;

        pdf.save(filename);
        successCount++;

        root.unmount();
        document.body.removeChild(tempContainer);

        await new Promise(resolve => setTimeout(resolve, 300));
      } catch (error) {
        console.error(`Error processing record ${index}:`, error);
        failedIndices.push(index + 1);
      }
    }

    if (failedIndices.length > 0) {
      alert(`Generated ${successCount} documents successfully. Failed for records: ${failedIndices.join(', ')}`);
    } else {
      alert(`Successfully generated all ${successCount} documents!`);
    }
  } catch (error) {
    console.error('Fatal error in document generation:', error);
    alert('A critical error occurred. Please check console for details.');
  } finally {
    setIsProcessing(false);
  }
};
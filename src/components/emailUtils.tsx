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

const defaultTemplateComponents: Record<string, React.FC<{ formData: FormData; templateContent?: string }>> = {
  internshipLetter: InternshipLetterTemplate,
  offerLetter: OfferLetterTemplate,
  certificate: CertificateTemplate,
  experienceCertificate: ExperienceLetter,
  exitFormality: ExitFormalityFinal,
  hikeLetter: HikeLetterTemplate,
  relievingLetter: RelievingLetterTemplate,
  salarySlip: SalarySlipTemplate,
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
];

export async function sendSingleDocumentByEmail(
  templateType: string,
  formData: FormData,
  recipientEmail: string
) {
  if (!templateType || !formData || !recipientEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipientEmail)) {
    throw new Error('Invalid template type, form data, or recipient email.');
  }

  const TemplateComponent = defaultTemplateComponents[templateType] || OfferLetterTemplate;
  const editedContent = DOMPurify.sanitize(formData.customTemplate || '');
  console.log(`Generating PDF for email, recipient: ${formData.recipientName}, email: ${recipientEmail}, customTemplate:`, editedContent);

  // Generate PDF
  const tempContainer = document.createElement('div');
  tempContainer.id = `pdf-container-single`;
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
  root.render(<TemplateComponent formData={formData} templateContent={editedContent} />);

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
      scale: 1.5,
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
        scale: 1.5,
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

  const templateLabel = templateOptions.find(opt => opt.value === templateType)?.label.replace(/\s+/g, '_') || 'Document';
  const safeName = (formData.employeeName || formData.recipientName)?.replace(/[^a-zA-Z0-9]/g, '_') || 'document';
  const filename = `${templateLabel}_${safeName}.pdf`;

  // Convert PDF to base64
const pdfBase64 = pdf.output('datauristring').split(',')[1];
console.log(`Generated PDF for ${formData.recipientName}, base64 length: ${pdfBase64.length}, estimated size: ${(pdfBase64.length * 0.75 / 1024).toFixed(2)} KB`);

  // Clean up
  root.unmount();
  document.body.removeChild(tempContainer);

  try {
    const response = await fetch('http://localhost:3001/api/send-document', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        recipientEmail,
        recipientName: formData.recipientName || formData.employeeName || 'Recipient',
        subject: `${templateLabel} - ${formData.recipientName || formData.employeeName || 'Recipient'}`,
        pdfBase64,
        pdfFilename: filename,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to send email to ${recipientEmail}: ${errorData.message || response.statusText}`);
    }

    console.log(`Email sent successfully to ${recipientEmail}`);
    return { success: true };
  } catch (error) {
    console.error(`Error sending email to ${recipientEmail}:`, error);
    throw error;
  }
}

export async function sendDocumentsByEmail(
  excelData: FormData[],
  selectedRows: Set<number>,
  selectedTemplate: string,
  setIsSendingEmails: React.Dispatch<React.SetStateAction<boolean>>
) {
  if (!selectedTemplate || excelData.length === 0 || selectedRows.size === 0) {
    alert('Please select a template, upload Excel data, and choose at least one record.');
    return;
  }

  const selectedData = Array.from(selectedRows).map(index => excelData[index]);
  const employeesWithoutEmail = selectedData.filter(employee => !employee.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(employee.email));

  if (employeesWithoutEmail.length > 0) {
    const names = employeesWithoutEmail
      .map(s => s.recipientName || s.employeeName || 'Unknown')
      .join(', ');
    alert(`The following employees don't have valid email addresses: ${names}`);
    return;
  }

  setIsSendingEmails(true);

  try {
    const promises = Array.from(selectedRows).map(async (index) => {
      if (index < 0 || index >= excelData.length) {
        throw new Error(`Invalid index: ${index}`);
      }
      const data = excelData[index];
      const TemplateComponent = defaultTemplateComponents[selectedTemplate] || OfferLetterTemplate;
      const editedContent = DOMPurify.sanitize(data.customTemplate || '');
      console.log(`Generating PDF for email for index ${index}, recipient: ${data.recipientName}, email: ${data.email}, customTemplate:`, editedContent);

      // Generate PDF
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
          scale: 1.5,
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
            scale: 1.5,
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

      // Convert PDF to base64
    const pdfBase64 = pdf.output('datauristring').split(',')[1];

      // Clean up
      root.unmount();
      document.body.removeChild(tempContainer);

      try {
        const response = await fetch('http://localhost:3001/api/send-document', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            recipientEmail: data.email,
            recipientName: data.recipientName || data.employeeName || 'Recipient',
            subject: `${templateLabel} - ${data.recipientName || data.employeeName || 'Recipient'}`,
            pdfBase64,
            pdfFilename: filename,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Failed to send email to ${data.email}: ${errorData.message || response.statusText}`);
        }

        console.log(`Email sent successfully to ${data.email}`);
        return { success: true };
      } catch (error) {
        console.error(`Error sending email for index ${index}, email: ${data.email}:`, error);
        throw error;
      }
    });

    const results = await Promise.allSettled(promises);
    let successCount = 0;
    const failedEmails: string[] = [];

    results.forEach((result, idx) => {
      const index = Array.from(selectedRows)[idx];
      if (index < 0 || index >= excelData.length) {
        failedEmails.push(`Invalid index ${index + 1}`);
        return;
      }
      const data = excelData[index];
      if (!data) {
        failedEmails.push(`No data for index ${index + 1}`);
        return;
      }
      if (result.status === 'fulfilled') {
        successCount++;
      } else {
        const name = data.recipientName || data.employeeName || 'Unknown';
        const email = data.email || 'No Email';
        failedEmails.push(`${name} (${email})`);
      }
    });

    if (failedEmails.length > 0) {
      alert(`Sent ${successCount} emails successfully. Failed for: ${failedEmails.join(', ')}`);
    } else {
      alert(`Successfully sent all ${successCount} emails!`);
    }
  } catch (error) {
    console.error('Fatal error in email sending:', error);
    alert('A critical error occurred while sending emails: ' + (error as Error).message);
  } finally {
    setIsSendingEmails(false);
  }
}
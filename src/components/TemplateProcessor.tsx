import React, { useEffect, useRef } from 'react';
import ReactDOMServer from 'react-dom/server';
import InternshipLetterTemplate from './templates/InternshipLetterTemplate';
import OfferLetterTemplate from './templates/OfferLetterTemplate';
import CertificateTemplate from './templates/CertificateTemplate';
import RelievingLetterTemplate from './templates/RelievingLetterTemplate';
import ExperienceLetter from './templates/ExperienceLetter';
import ExitFormalityFinal from './templates/ExitFormalityFinal';
import SalarySlipTemplate from './templates/SalarySlipTemplate';

interface TemplateProcessorProps {
  templateType: string;
  formData: any;
  templateContent?: string;
  onRender: (html: string) => void;
}

const TemplateProcessor: React.FC<TemplateProcessorProps> = ({ templateType, formData, templateContent, onRender }) => {
  const templateRef = useRef<HTMLDivElement>(null);

  const defaultTemplateComponents: Record<string, React.FC<{ formData: any; templateContent?: string }>> = {
    internshipLetter: InternshipLetterTemplate,
    offerLetter: OfferLetterTemplate,
    certificate: CertificateTemplate,
    experienceCertificate: ExperienceLetter,
    exitFormality: ExitFormalityFinal,
    hikeLetter: HikeLetterTemplate,
    relievingLetter: RelievingLetterTemplate,
    salarySlip: SalarySlipTemplate,
  };

  const templateImages: Record<string, { headerImage: string; footerImage: string }> = {
    internshipLetter: {
      headerImage: 'https://res.cloudinary.com/dcpoiyzqi/image/upload/v1749546738/uploads/1749546736726-91b660c5372a77bf355b2ba1fa46d02a.png',
      footerImage: 'https://res.cloudinary.com/dcpoiyzqi/image/upload/v1750245037/uploads/1750245035638-c4524c713841e6b3884c1d9e0c713722.jpg',
    },
    offerLetter: {
      headerImage: 'https://res.cloudinary.com/dcpoiyzqi/image/upload/v1749209085/uploads/1749209084379-1563b3f81f4be9fbc787eb359ff0f470.jpg',
      footerImage: 'https://res.cloudinary.com/dcpoiyzqi/image/upload/v1750245037/uploads/1750245035638-c4524c713841e6b3884c1d9e0c713722.jpg',
    },
    certificate: {
      headerImage: 'https://res.cloudinary.com/dcpoiyzqi/image/upload/v1749189616/uploads/1749189615031-b9c34262be2b542ffe239c8c5c4db3a4.jpg',
      footerImage: '',
    },
    experienceCertificate: {
      headerImage: 'https://res.cloudinary.com/dcpoiyzqi/image/upload/v1749546738/uploads/1749546736726-91b660c5372a77bf355b2ba1fa46d02a.png',
      footerImage: '',
    },
    exitFormality: {
      headerImage: 'https://res.cloudinary.com/dcpoiyzqi/image/upload/v1749209085/uploads/1749209084379-1563b3f81f4be9fbc787eb359ff0f470.jpg',
      footerImage: 'https://res.cloudinary.com/dcpoiyzqi/image/upload/v1750245037/uploads/1750245035638-c4524c713841e6b3884c1d9e0c713722.jpg',
    },
    hikeLetter: {
      headerImage: 'https://res.cloudinary.com/dcpoiyzqi/image/upload/v1749546738/uploads/1749546736726-91b660c5372a77bf355b2ba1fa46d02a.png',
      footerImage: 'https://res.cloudinary.com/dcpoiyzqi/image/upload/v1750245037/uploads/1750245035638-c4524c713841e6b3884c1d9e0c713722.jpg',
    },
    relievingLetter: {
      headerImage: 'https://res.cloudinary.com/dcpoiyzqi/image/upload/v1749209085/uploads/1749209084379-1563b3f81f4be9fbc787eb359ff0f470.jpg',
      footerImage: 'https://res.cloudinary.com/dcpoiyzqi/image/upload/v1750245037/uploads/1750245035638-c4524c713841e6b3884c1d9e0c713722.jpg',
    },
    salarySlip: {
      headerImage: 'https://res.cloudinary.com/dcpoiyzqi/image/upload/v1749209085/uploads/1749209084379-1563b3f81f4be9fbc787eb359ff0f470.jpg',
      footerImage: '',
    },
  };

  useEffect(() => {
    if (!templateType || !formData) {
      onRender('');
      return;
    }

    const TemplateComponent = defaultTemplateComponents[templateType] || CertificateTemplate;
    const images = templateImages[templateType] || templateImages.certificate;

    const processTemplate = () => {
      try {
        const originalHtml = ReactDOMServer.renderToString(<TemplateComponent formData={formData} templateContent={templateContent} />);
        const parser = new DOMParser();
        const doc = parser.parseFromString(originalHtml, 'text/html');
        const body = doc.body;

        // Apply header and footer images consistently
        const headerImg = doc.createElement('img');
        headerImg.src = images.headerImage;
        headerImg.style.width = '100%';
        headerImg.style.marginBottom = '20mm';
        if (body.firstChild) {
          body.insertBefore(headerImg, body.firstChild);
        } else {
          body.appendChild(headerImg);
        }

        if (images.footerImage) {
          const footerImg = doc.createElement('img');
          footerImg.src = images.footerImage;
          footerImg.style.width = '100%';
          footerImg.style.marginTop = '20mm';
          body.appendChild(footerImg);
        }

        const htmlContent = '<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body>' + doc.body.innerHTML + '</body></html>';
        if (templateRef.current) {
          templateRef.current.innerHTML = htmlContent;
          onRender(htmlContent);
        } else {
          onRender(htmlContent);
        }
      } catch (error) {
        console.error('Template processing error:', error);
        onRender('');
      }
    };

    processTemplate();
  }, [templateType, formData, templateContent, onRender]);

  return <div ref={templateRef} style={{ display: 'none' }} />;
};

export default TemplateProcessor;
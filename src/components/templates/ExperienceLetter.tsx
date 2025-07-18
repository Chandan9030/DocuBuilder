import React from 'react';
import { formatDate } from '../../utils/formatters';

interface ExperienceLetterFormData {
  companyName?: string;
  companyAddress?: string;
  companyCin?: string;
  recipientTitle?: string;
  recipientName?: string;
  firstName?: string;
  startDate?: string;
  endDate?: string;
  position?: string;
  signatoryName?: string;
  signatoryTitle?: string;
  headerImage?: string;
  footerImage?: string;
  experienceParagraph?: string;
  experienceClosingStatement?: string;
}

interface ExperienceCertificateTemplateProps {
  formData: ExperienceLetterFormData;
  templateContent?: string;
}

const ExperienceCertificateTemplate: React.FC<ExperienceCertificateTemplateProps> = ({ formData, templateContent }) => {
  const {
    companyName = 'DAYA Consultancy Services (OPC) Pvt. Ltd.',
    companyAddress = 'B-19, Kousalya Bhawan, Saheed Nagar, Bhubaneswar, Odisha, India, 751007',
    companyCin = 'U74140OR2021OPC037819',
    recipientTitle = 'Mr./Ms.',
    recipientName = 'Team Member',
    firstName = recipientName.split(' ')[0] || 'Team Member',
    startDate = new Date().toISOString().split('T')[0],
    endDate = new Date().toISOString().split('T')[0],
    position = 'Employee',
    signatoryName = 'Dayashankar Das',
    signatoryTitle = 'CEO',
    headerImage = 'https://res.cloudinary.com/dcpoiyzqi/image/upload/v1749546738/uploads/1749546736726-91b660c5372a77bf355b2ba1fa46d02a.png',
    footerImage = '',
    experienceParagraph = 'They were conscientious and committed to their work during their tenure with us.',
    experienceClosingStatement = 'We wish them all the best as they embark on their professional journey.',
  } = formData;

  const formattedStartDate = startDate ? formatDate(startDate) : new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
  const formattedEndDate = endDate ? formatDate(endDate) : new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
  const currentDate = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
  
  const fullRecipientName = recipientTitle ? `${recipientTitle} ${recipientName}` : recipientName;

  // Component to render header with optional image (same as OfferLetterTemplate.tsx)
  const HeaderSection = () => (
    <div className="text-center mb-6">
      {headerImage ? (
        <img
          src={headerImage}
          alt="Company Logo"
          className="mx-auto h-34 mb-4 max-w-full object-contain"
          onError={(e) => {
            console.error('Header image failed to load:', headerImage);
            e.target.style.display = 'none';
          }}
        />
      ) : (
        <div className="mx-auto h-24 mb-4 flex items-center justify-center border-2 border-dashed border-gray-300 text-gray-500 text-sm">
          Company Logo
        </div>
      )}
    </div>
  );

  // Render templateContent if provided, otherwise render default template
  if (templateContent) {
    return <div dangerouslySetInnerHTML={{ __html: templateContent }} />;
  }

  return (
    <div className="font-sans leading-relaxed max-w-4xl mx-auto bg-white min-h-[900px] relative pb-24 border border-gray-300">
      {/* Header with Image */}
      <HeaderSection />

      {/* Date */}
      <div className="mb-8 px-8 text-left mt-4">
        <p className="text-base">{currentDate}</p>
      </div>

      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-xl font-bold uppercase tracking-wide">EXPERIENCE CERTIFICATE</h1>
        <p className="font-bold uppercase tracking-wide underline mt-2">TO WHOM SO EVER IT MAY CONCERN</p>
      </div>

      {/* Body */}
      <div className="mb-8 px-8 space-y-6 text-justify">
        <p className="text-base leading-relaxed">
          This is to certify that <strong>{fullRecipientName}</strong> was employed with <strong>{companyName}</strong> from <strong>{formattedStartDate}</strong> to <strong>{formattedEndDate}</strong>. At the time of separation, <strong>{firstName}</strong> was designated as a <strong>{position}</strong>.
        </p>
        
        <p className="text-base leading-relaxed">{experienceParagraph}</p>

        <p className="text-base leading-relaxed">{experienceClosingStatement}</p>

        <div className="mt-8">
          <p className="text-base">Regards,</p>
          <p className="text-base font-semibold">{companyName}</p>
        </div>
      </div>

      {/* Signature */}
      <div className="px-8 mb-8 mt-12">
        <div className="mb-2">
          <img src="./SignatureDaya.jpg" alt="Signature" className="mb-2" />
        </div>
        <p className="font-semibold text-base">{signatoryName} ({signatoryTitle})</p>
      </div>

      {/* Footer - Company Details */}
      <div className="absolute bottom-4 left-0 right-0 text-center text-sm">
        <p className="font-semibold">{companyName}, CIN No. {companyCin}</p>
        <p>B-19, Kousalya Bhawan, Saheed Nagar, Bhubaneswar, Odisha, India, 751007</p>
        <p>Balabhadra Lane, Puri, Odisha, India, 752001</p>
        <p>https://www.dayacs.com/</p>
      </div>
    </div>
  );
};

export default ExperienceCertificateTemplate;
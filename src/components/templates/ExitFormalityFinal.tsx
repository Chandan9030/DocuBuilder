import React, { useState, useEffect } from 'react';

const ExitFormalityFinal = ({ formData, templateContent }) => {
  const {
    companyName = 'DAYA Consultancy Services',
    companySubtitle = 'Daya Consultancy Services (OPC) Private Limited',
    employeeName = 'Agni Tanmaya Behera',
    employeeId = 'DCS069',
    departmentAndPositionName = 'IT - Full Stack Developer',
    dateOfExit = '29th/May/2024',
    signatoryName = 'Mr. Dayashankar Das',
    signatoryTitle = 'Chief Executive Officer',
    headerImage = 'https://res.cloudinary.com/dcpoiyzqi/image/upload/v1749546738/uploads/1749546736726-91b660c5372a77bf355b2ba1fa46d02a.png',
    footerImage = 'https://res.cloudinary.com/dcpoiyzqi/image/upload/v1750245037/uploads/1750245035638-c4524c713841e6b3884c1d9e0c713722.jpg'
  } = formData || {};

  const [headerImageLoaded, setHeaderImageLoaded] = useState(false);
  const [headerImageError, setHeaderImageError] = useState(false);
  const [footerImageLoaded, setFooterImageLoaded] = useState(false);
  const [footerImageError, setFooterImageError] = useState(false);

  useEffect(() => {
    console.log('ExitFormalityFinal formData:', {
      employeeName,
      employeeId,
      departmentAndPositionName,
      dateOfExit,
      companyName,
      companySubtitle,
      signatoryName,
      signatoryTitle,
      headerImage,
      footerImage
    });
  }, [formData]);

  const HeaderSection = () => (
    <div className="text-center mb-6">
      {headerImage ? (
        <img
          src={headerImage}
          alt="Company Logo"
          className="mx-auto h-30 mb-4 max-w-full object-contain"
          onError={(e) => {
            console.error('Header image failed to load:', headerImage);
            e.currentTarget.style.display = 'none';
          }}
          onLoad={() => {
            setHeaderImageLoaded(true);
            setHeaderImageError(false);
          }}
        />
      ) : (
        <div className="mx-auto h-24 mb-4 flex items-center justify-center border-2 border-dashed border-gray-300 text-gray-500 text-sm">
          Company Logo
        </div>
      )}
    </div>
  );

  const FooterSection = () => (
    <div className="text-center mb-6">
      {footerImage ? (
        <img
          src={footerImage}
          alt="Footer Image"
          className="mx-auto h-20 mb-4 max-w-full object-contain"
          onError={(e) => {
            console.error('Footer image failed to load:', footerImage);
            e.currentTarget.style.display = 'none';
          }}
          onLoad={() => {
            setFooterImageLoaded(true);
            setFooterImageError(false);
          }}
        />
      ) : (
        <div className="mx-auto h-20 mb-4 flex items-center justify-center border-2 border-dashed border-gray-300 text-gray-500 text-sm">
          Footer Image
        </div>
      )}
    </div>
  );

  if (templateContent) {
    return (
      <div className="bg-white min-h-[800px] w-full max-w-[800px] mx-auto font-sans relative border border-gray-400">        
        <div dangerouslySetInnerHTML={{ __html: templateContent }} />        
      </div>
    );
  }

  return (
    <div className="bg-white min-h-[800px] w-full max-w-[800px] mx-auto font-sans relative border border-gray-400">
      <HeaderSection />

      <div className="text-center mt-8 mb-6">
        <h1 className="text-xl font-bold text-black underline">Employee Exit Formality</h1>
      </div>

      <div className="px-8 space-y-1 text-sm">
        <div>
          <span className="font-bold">Employee Name: </span>
          <span>{employeeName}</span>
        </div>
        <div>
          <span className="font-bold">Employee ID: </span>
          <span>{employeeId}</span>
        </div>
        <div>
          <span className="font-bold">Department & Position Name: </span>
          <span>{departmentAndPositionName}</span>
        </div>
        <div>
          <span className="font-bold">Date of Exit: </span>
          <span>{dateOfExit}</span>
        </div>
      </div>

      <div className="px-8 mt-6 space-y-4 text-sm">
        <p>Please confirm the following details:</p>
        
        <p className="text-justify leading-relaxed">
          As per the company policy as SOLP, ATS & Other Project also has been successfully 
          completed, i advice you to delete /remove all the data & access form your personal 
          devices & never share the codes to any other Person or Organization. If any suspicious 
          found in future, strict action will be taken as per the company law.
        </p>

        <div className="mt-6">
          <p className="font-bold mb-4">Follow the items below that should be deleted/removed from our organization's data.</p>
          
          <div className="space-y-1">
            <div className="flex justify-between">
              <span>Personal Phone/Device Delete Data -</span>
              <span>-</span>
            </div>
            <div className="flex justify-between">
              <span>SOLP(Frontend & Backend)Code Delete-</span>
              <span>-</span>
            </div>
            <div>
              <span>ATS (Frontend & Backend) Code Delete -</span>
            </div>
            <div>
              <span>GIT HUB -</span>
            </div>
            <div>
              <span>Other Projects -</span>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <p className="text-justify leading-relaxed">
            I confirm that I have read and understood the company's code of conduct, and I agree to 
            follow all company law, policies and procedures.
          </p>
        </div>

        <div className="mt-16 space-y-6">
          <div>
            <div className="flex items-center mb-2">
              <span className="font-bold">Employee Signature: </span>
              <div className="border-b border-black flex-1 ml-2 mr-32"></div>
            </div>
            <div className="flex items-center">
              <span className="font-bold">Date: </span>
              <div className="border-b border-black w-40 ml-2"></div>
            </div>
          </div>

          <div className="flex justify-end mt-20">
            <div className="text-center">
              <div className="border-b-2 border-black w-40 mb-0"></div>
              <p className="text-sm">({signatoryName})</p>
              <p className="text-sm">{signatoryTitle}</p>
            </div>
          </div>
        </div>
      </div>

      <FooterSection />
    </div>
  );
};

export default ExitFormalityFinal;
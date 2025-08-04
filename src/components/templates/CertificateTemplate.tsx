// import React from 'react';

// interface ExperienceLetterFormData {
//   companyName?: string;
//   companySubtitle?: string;
//   recipientTitle?: string;
//   recipientName?: string;
//   certificateTitle?: string;
//   internshipDuration?: string;
//   startDate?: string;
//   endDate?: string;
//   completionDate?: string;
//   signatoryName?: string;
//   signatoryTitle?: string;
//   referenceNo?: string;
//   mentorName?: string;
//   headerImage?: string;
//   footerImage?: string;
//   certificateDescription?: string;
// }

// interface CertificateTemplateProps {
//   formData: ExperienceLetterFormData;
//   templateContent?: string;
// }

// const CertificateTemplate: React.FC<CertificateTemplateProps> = ({ formData, templateContent }) => {
//   const {
//     recipientTitle = 'Mr.',
//     recipientName = 'Amit Kumar',
//     certificateTitle = 'Web Development Intern',
//     internshipDuration = '3 months',
//     startDate = '2025-06-01',
//     endDate = '2025-09-01',
//     completionDate = new Date().toLocaleDateString(),
//     signatoryName = 'Dayashankar Das',
//     signatoryTitle = 'Director',
//     referenceNo = 'DCS/IT/22/1006',
//     mentorName = 'Mr. Rakesh Sharma',
//     headerImage = 'https://res.cloudinary.com/dcpoiyzqi/image/upload/v1749546738/uploads/1749546736726-91b660c5372a77bf355b2ba1fa46d02a.png',
//     footerImage = 'https://res.cloudinary.com/dcpoiyzqi/image/upload/v1750245037/uploads/1750245035638-c4524c713841e6b3884c1d9e0c713722.jpg',
//     certificateDescription = 'He has been found to be demonstrating exceptional dedication, enthusiasm, and professionalism in his duties and contributions to various projects and initiatives within the company. We wish all the best in his future endeavors.'
//   } = formData;

//   const formatDate = (dateString: string) => {
//     const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
//     return new Date(dateString).toLocaleDateString('en-US', options);
//   };

//   const fullRecipientName = recipientTitle ? `${recipientTitle} ${recipientName}` : recipientName;

//   const HeaderSection = () => (
//     <div className="text-center mb-6">
//       {headerImage ? (
//         <img
//           src={headerImage}
//           alt="Company Logo"
//           className="mx-auto h-30 mb-4 max-w-full object-contain"
//           onError={(e) => {
//             console.error('Header image failed to load:', headerImage);
//             e.currentTarget.style.display = 'none';
//           }}
//         />
//       ) : (
//         <div className="mx-auto h-24 mb-4 flex items-center justify-center border-2 border-dashed border-gray-300 text-gray-500 text-sm">
//           Company Logo
//         </div>
//       )}
//     </div>
//   );

//   const FooterSection = () => (
//     <div className="mt-8 pt-4 border-t border-gray-200 text-center bg-gray-100">
//       {footerImage ? (
//         <img
//           src={footerImage}
//           alt="Company Address"
//           className="mx-auto h-22 max-w-full object-contain"
//           onError={(e) => {
//             console.error('Footer image failed to load:', footerImage);
//             e.currentTarget.style.display = 'none';
//             e.currentTarget.parentElement.innerHTML = '<div className="mx-auto h-20 mb-4 flex items-center justify-center border-2 border-dashed border-gray-300 text-gray-500 text-sm">Failed to load footer image</div>';
//           }}
//         />
//       ) : (
//         <div className="mx-auto h-24 mb-4 flex items-center justify-center border-2 border-dashed border-gray-300 text-gray-500 text-sm">
//           Company Address (No Footer Image)
//         </div>
//       )}
//     </div>
//   );

//   if (templateContent) {
//     return (
//       <div>
//         <div dangerouslySetInnerHTML={{ __html: templateContent }} />
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white min-h-[900px] w-full max-w-[900px] mx-auto p-8 font-sans flex flex-col">
//       <HeaderSection />

//       <div className="flex justify-between mb-8">
//         <p className="text-sm text-gray-700">Ref. No. {referenceNo}</p>
//         <p className="text-sm text-gray-700">Date: {formatDate(completionDate)}</p>
//       </div>

//       <div className="text-center mb-8">
//         <h2 className="text-xl font-bold underline">INTERNSHIP CERTIFICATE</h2>
//       </div>

//       <div className="flex-grow text-justify leading-relaxed">
//         <p className="mb-4">
//           This is to certify that <span className="font-bold">{fullRecipientName}</span> has successfully completed an internship program of <span className="font-bold">{internshipDuration}</span> as a <span className="font-bold">{certificateTitle}</span> at <span className="font-bold">{}</span> from <span className="font-bold">{formatDate(startDate)}</span> to <span className="font-bold">{formatDate(endDate)}</span> under the guidance of <span className="font-bold">{mentorName}</span>.
//         </p>

//         <p className="mb-8">
//           {certificateDescription}
//         </p>
//       </div>

//       <div className="mt-8">
//         <div className="flex justify-end">
//           <div className="text-center">
//             <div className="w-24 h-24 border-2 border-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
//               <div className="text-center">
//                 <div className="text-xs text-blue-600 font-semibold">DAYA</div>
//                 <div className="text-xs text-blue-600">CONSULTANCY</div>
//                 <div className="text-xs text-blue-600">SERVICES</div>
//               </div>
//             </div>
//             <div className="border-t-2 border-black w-48 mb-1"></div>
//             <p className="font-semibold">({signatoryName})</p>
//             <p className="text-sm text-gray-700">{signatoryTitle}</p>
//           </div>
//         </div>
//       </div>
//       <FooterSection />
//     </div>
//   );
// };

// export default CertificateTemplate;




import React from 'react';

interface ExperienceLetterFormData {
  companyName?: string;
  companySubtitle?: string;
  recipientTitle?: string;
  recipientName?: string;
  certificateTitle?: string;
  internshipDuration?: string;
  startDate?: string;
  endDate?: string;
  completionDate?: string;
  signatoryName?: string;
  signatoryTitle?: string;
  referenceNo?: string;
  mentorName?: string;
  headerImage?: string;
  footerImage?: string;
  certificateDescription?: string;
}

interface CertificateTemplateProps {
  formData: ExperienceLetterFormData;
  templateContent?: string;
}

const CertificateTemplate: React.FC<CertificateTemplateProps> = ({ formData, templateContent }) => {
  const {
    recipientTitle = 'Mr.',
    recipientName = 'Amit Kumar',
    certificateTitle = 'Web Development Intern',
    internshipDuration = '3 months',
    startDate = '2025-06-01',
    endDate = '2025-09-01',
    completionDate = new Date().toLocaleDateString(),
    signatoryName = 'Dayashankar Das',
    signatoryTitle = 'Director',
    referenceNo = 'DCS/IT/22/1006',
    mentorName = 'Mr. Rakesh Sharma',
    headerImage = 'https://res.cloudinary.com/dcpoiyzqi/image/upload/v1749546738/uploads/1749546736726-91b660c5372a77bf355b2ba1fa46d02a.png',
    footerImage = 'https://res.cloudinary.com/dcpoiyzqi/image/upload/v1750245037/uploads/1750245035638-c4524c713841e6b3884c1d9e0c713722.jpg',
    certificateDescription = 'He has been found to be demonstrating exceptional dedication, enthusiasm, and professionalism in his duties and contributions to various projects and initiatives within the company. We wish all the best in his future endeavors.'
  } = formData;

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const fullRecipientName = recipientTitle ? `${recipientTitle} ${recipientName}` : recipientName;

  const HeaderSection = () => (
    <div className="text-center mb-6">
      {headerImage ? (
        <img
          src={headerImage}
          alt="Company Logo"
          className="mx-auto h-30 mb-4 w-[636px] object-contain"
          onError={(e) => {
            console.error('Header image failed to load:', headerImage);
            e.currentTarget.style.display = 'none';
          }}
        />
      ) : (
        <div className="mx-auto h-24 mb-4 w-[636px] flex items-center justify-center border-2 border-dashed border-gray-300 text-gray-500 text-sm">
          Company Logo
        </div>
      )}
    </div>
  );

  const FooterSection = () => (
    <div className="mt-8 pt-4 border-t border-gray-200 text-center bg-gray-100">
      {footerImage ? (
        <img
          src={footerImage}
          alt="Company Address"
          className="mx-auto h-24 w-[636px] object-contain"
          onError={(e) => {
            console.error('Footer image failed to load:', footerImage);
            e.currentTarget.style.display = 'none';
            e.currentTarget.parentElement.innerHTML = '<div className="mx-auto h-20 mb-4 w-[636px] flex items-center justify-center border-2 border-dashed border-gray-300 text-gray-500 text-sm">Failed to load footer image</div>';
          }}
        />
      ) : (
        <div className="mx-auto h-24 mb-4 w-[636px] flex items-center justify-center border-2 border-dashed border-gray-300 text-gray-500 text-sm">
          Company Address (No Footer Image)
        </div>
      )}
    </div>
  );

  if (templateContent) {
    return (
      <div>
        <div dangerouslySetInnerHTML={{ __html: templateContent }} />
      </div>
    );
  }

  return (
    <div className="bg-white min-h-[900px] w-full max-w-[700px] mx-auto p-8 font-[Times_New_Roman] flex flex-col">
      <HeaderSection />

      <div className="flex justify-between mb-8">
        <p className="text-sm text-gray-700">Ref. No. {referenceNo}</p>
        <p className="text-sm text-gray-700">Date: {formatDate(completionDate)}</p>
      </div>

      <div className="text-center mb-8">
        <h2 className="text-xl font-bold underline">INTERNSHIP CERTIFICATE</h2>
      </div>

      <div className="flex-grow text-justify leading-relaxed">
        <p className="mb-4">
          This is to certify that <span className="font-bold">{fullRecipientName}</span> has successfully completed an internship program of <span className="font-bold">{internshipDuration}</span> as a <span className="font-bold">{certificateTitle}</span> at <span className="font-bold">{}</span> from <span className="font-bold">{formatDate(startDate)}</span> to <span className="font-bold">{formatDate(endDate)}</span> under the guidance of <span className="font-bold">{mentorName}</span>.
        </p>

        <p className="mb-8">
          {certificateDescription}
        </p>
      </div>

      <div className="mt-8">
        <div className="flex justify-end">
          <div className="text-center">
            <div className="w-24 h-24 border-2 border-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="text-center">
                <div className="text-xs text-blue-600 font-semibold">DAYA</div>
                <div className="text-xs text-blue-600">CONSULTANCY</div>
                <div className="text-xs text-blue-600">SERVICES</div>
              </div>
            </div>
            <div className="border-t-2 border-black w-48 mb-1"></div>
            <p className="font-semibold">({signatoryName})</p>
            <p className="text-sm text-gray-700">{signatoryTitle}</p>
          </div>
        </div>
      </div>
      <FooterSection />
    </div>
  );
};

export default CertificateTemplate;
// import React, { useState } from 'react';

// type RelievingLetterFormData = {
//   companyName?: string;
//   recipientTitle?: string;
//   recipientName?: string;
//   relievingDate?: string;
//   referenceDate?: string;
//   signatoryName?: string;
//   signatoryTitle?: string;
//   address?: string;
//   headerImage?: string;
//   footerImage?: string;
// };

// interface RelievingLetterTemplateProps {
//   formData?: RelievingLetterFormData;
//   templateContent?: string;
// }

// const defaultFormData: Required<RelievingLetterFormData> = {
//   companyName: 'DAYA Consultancy Services',
//   recipientTitle: 'Mr.',
//   recipientName: 'Agni Tanmaya Behera',
//   relievingDate: 'May 29th, 2024',
//   referenceDate: 'June 10, 2024',
//   signatoryName: 'Dayashankar Das',
//   signatoryTitle: 'CEO',
//   address: 'Plot No-B19,\nAT/PO: Saheed Nagar,\nBhubaneswar,\nDist: Khordha, Odisha-752007',
//   headerImage: 'https://res.cloudinary.com/dcpoiyzqi/image/upload/v1749209085/uploads/1749209084379-1563b3f81f4be9fbc787eb359ff0f470.jpg',
//   footerImage: 'https://res.cloudinary.com/dcpoiyzqi/image/upload/v1750245037/uploads/1750245035638-c4524c713841e6b3884c1d9e0c713722.jpg'
// };

// const RelievingLetterTemplate: React.FC<RelievingLetterTemplateProps> = ({ formData = {}, templateContent }) => {
//   const {
//     companyName,
//     recipientTitle,
//     recipientName,
//     relievingDate,
//     referenceDate,
//     signatoryName,
//     signatoryTitle,
//     address,
//     headerImage,
//     footerImage
//   } = { ...defaultFormData, ...formData };

//   const [headerImageLoaded, setHeaderImageLoaded] = useState(false);
//   const [headerImageError, setHeaderImageError] = useState(false);
//   const [footerImageLoaded, setFooterImageLoaded] = useState(false);
//   const [footerImageError, setFooterImageError] = useState(false);

//   const fullRecipientName = `${recipientTitle} ${recipientName}`;
//   const firstName = recipientName?.split(' ')[0] || 'Recipient';

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
//           onLoad={() => {
//             setHeaderImageLoaded(true);
//             setHeaderImageError(false);
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
//     <div className="text-center mb-6">
//       {footerImage ? (
//         <img
//           src={footerImage}
//           alt="Footer Image"
//           className="mx-auto h-20 mb-4 max-w-full object-contain"
//           onError={(e) => {
//             console.error('Footer image failed to load:', footerImage);
//             e.currentTarget.style.display = 'none';
//           }}
//           onLoad={() => {
//             setFooterImageLoaded(true);
//             setFooterImageError(false);
//           }}
//         />
//       ) : (
//         <div className="mx-auto h-20 mb-4 flex items-center justify-center border-2 border-dashed border-gray-300 text-gray-500 text-sm">
//           Footer Image
//         </div>
//       )}
//     </div>
//   );

//   if (templateContent) {
//     return (
//       <div className="bg-white min-h-[900px] w-full max-w-[800px] mx-auto font-sans relative border-2 border-black">
//         <div dangerouslySetInnerHTML={{ __html: templateContent }} />
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white min-h-[900px] w-full max-w-[800px] mx-auto font-sans relative border-2 border-black">
//       <HeaderSection />

//       <div className="p-8">
//         <div className="flex justify-end mb-8">
//           <div className="text-right">
//             <p className="font-bold">{fullRecipientName}</p>
//             <p className="font-bold">{referenceDate}</p>
//           </div>
//         </div>

//         <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10 z-0">
//           <div className="w-96 h-96 border-8 border-gray-400 rounded-full flex items-center justify-center">
//             <div className="text-center">
//               <div className="text-6xl font-bold text-gray-400">D</div>
//             </div>
//           </div>
//         </div>

//         <div className="mb-6 relative z-10">
//           <p className="font-bold">{fullRecipientName}</p>
//           <div className="whitespace-pre-line text-sm mt-1">
//             {address}
//           </div>
//         </div>

//         <div className="mb-6 relative z-10">
//           <p className="font-bold">Subject: <u>Relieving Letter</u></p>
//         </div>

//         <div className="text-justify leading-relaxed mb-8 relative z-10">
//           <p className="mb-4">
//             Dear {firstName},
//           </p>
//           <p className="mb-4">
//             This is to inform you that your resignation has been accepted and you are being relieved from the services of <strong>Daya Consultancy Services Pvt. Ltd.</strong> at the close of working hours on <strong>{relievingDate}</strong>.
//           </p>
//           <p className="mb-4">
//             You are requested to deposit the company assets and any other intellectual property entrusted to you during your employment with us.
//           </p>
//           <p className="mb-8">
//             We wish you success in your future endeavors.
//           </p>
//           <p className="mb-8">
//             Best Wishes,
//           </p>
//           <p className="text-center font-bold mb-8">
//             Daya Consultancy Services Pvt. Ltd.
//           </p>
//         </div>

//         <div className="mb-8 relative z-10">
//           <div className="mb-4">
//             <div className="w-48 h-16 border-b-2 border-blue-600 mb-2 relative">
//               <div className="absolute bottom-0 left-0 text-blue-600 font-bold text-lg" style={{fontFamily: 'cursive'}}>
//                 Dayashankar Das
//               </div>
//             </div>
//           </div>
//           <p className="font-bold">{signatoryName} ({signatoryTitle})</p>
//         </div>
//       </div>

//       <FooterSection />
//     </div>
//   );
// };

// export default RelievingLetterTemplate;



import React, { useState } from 'react';

type RelievingLetterFormData = {
  companyName?: string;
  recipientTitle?: string;
  recipientName?: string;
  relievingDate?: string;
  referenceDate?: string;
  signatoryName?: string;
  signatoryTitle?: string;
  address?: string;
  headerImage?: string;
  footerImage?: string;
};

interface RelievingLetterTemplateProps {
  formData?: RelievingLetterFormData;
  templateContent?: string;
}

const defaultFormData: Required<RelievingLetterFormData> = {
  companyName: 'DAYA Consultancy Services',
  recipientTitle: 'Mr.',
  recipientName: 'Agni Tanmaya Behera',
  relievingDate: 'May 29th, 2024',
  referenceDate: '2025-08-15', // Updated to test the new format
  signatoryName: 'Dayashankar Das',
  signatoryTitle: 'CEO',
  address: 'Plot No-B19,\nAT/PO: Saheed Nagar,\nBhubaneswar,\nDist: Khordha, Odisha-752007',
  headerImage: 'https://res.cloudinary.com/dcpoiyzqi/image/upload/v1749209085/uploads/1749209084379-1563b3f81f4be9fbc787eb359ff0f470.jpg',
  footerImage: 'https://res.cloudinary.com/dcpoiyzqi/image/upload/v1750245037/uploads/1750245035638-c4524c713841e6b3884c1d9e0c713722.jpg'
};

const RelievingLetterTemplate: React.FC<RelievingLetterTemplateProps> = ({ formData = {}, templateContent }) => {
  const {
    companyName,
    recipientTitle,
    recipientName,
    relievingDate,
    referenceDate,
    signatoryName,
    signatoryTitle,
    address,
    headerImage,
    footerImage
  } = { ...defaultFormData, ...formData };

  const [headerImageLoaded, setHeaderImageLoaded] = useState(false);
  const [headerImageError, setHeaderImageError] = useState(false);
  const [footerImageLoaded, setFooterImageLoaded] = useState(false);
  const [footerImageError, setFooterImageError] = useState(false);

  const fullRecipientName = `${recipientTitle} ${recipientName}`;
  const firstName = recipientName?.split(' ')[0] || 'Recipient';

  // Format referenceDate to "August-15-2025"
  const formattedReferenceDate = referenceDate
    ? new Date(referenceDate).toLocaleDateString('en-US', {
        month: 'long',
        day: '2-digit',
        year: 'numeric'
      }).replace(',', '').replace(' ', '-')
    : '';

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
      <div className="bg-white min-h-[900px] w-full max-w-[800px] mx-auto font-sans relative border-2 border-black">
        <div dangerouslySetInnerHTML={{ __html: templateContent }} />
      </div>
    );
  }

  return (
    <div className="bg-white min-h-[900px] w-full max-w-[800px] mx-auto font-sans relative border-2 border-black">
      <HeaderSection />

      <div className="p-8">
        <div className="flex justify-end mb-8">
          <div className="text-right">
            <p className="font-bold">{fullRecipientName}</p>
            <p className="font-bold">{formattedReferenceDate}</p> {/* Use formatted date here */}
          </div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10 z-0">
          <div className="w-96 h-96 border-8 border-gray-400 rounded-full flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl font-bold text-gray-400">D</div>
            </div>
          </div>
        </div>

        <div className="mb-6 relative z-10">
          <p className="font-bold">{fullRecipientName}</p>
          <div className="whitespace-pre-line text-sm mt-1">
            {address}
          </div>
        </div>

        <div className="mb-6 relative z-10">
          <p className="font-bold">Subject: <u>Relieving Letter</u></p>
        </div>

        <div className="text-justify leading-relaxed mb-8 relative z-10">
          <p className="mb-4">
            Dear {firstName},
          </p>
          <p className="mb-4">
            This is to inform you that your resignation has been accepted and you are being relieved from the services of <strong>Daya Consultancy Services Pvt. Ltd.</strong> at the close of working hours on <strong>{relievingDate}</strong>.
          </p>
          <p className="mb-4">
            You are requested to deposit the company assets and any other intellectual property entrusted to you during your employment with us.
          </p>
          <p className="mb-8">
            We wish you success in your future endeavors.
          </p>
          <p className="mb-8">
            Best Wishes,
          </p>
          <p className="text-center font-bold mb-8">
            Daya Consultancy Services Pvt. Ltd.
          </p>
        </div>

        <div className="mb-8 relative z-10">
          <div className="mb-4">
            <div className="w-48 h-16 border-b-2 border-blue-600 mb-2 relative">
              <div className="absolute bottom-0 left-0 text-blue-600 font-bold text-lg" style={{fontFamily: 'cursive'}}>
                Dayashankar Das
              </div>
            </div>
          </div>
          <p className="font-bold">{signatoryName} ({signatoryTitle})</p>
        </div>
      </div>

      <FooterSection />
    </div>
  );
};

export default RelievingLetterTemplate;
// import React, { useState } from 'react';
// import { formatDate } from '../../utils/formatters';

// const InternshipLetterTemplate = ({ formData, templateContent }) => {
//   const {
//     recipientTitle = 'Mr.',
//     recipientName = 'Subham Kumar Malu',
//     recipientAddress = '05/04/2025',
//     internPosition = 'Intern',
//     internDepartment = 'Marketing',
//     startDate = '02/05/2025',
//     endDate = '02/07/2025',
//     supervisorName = 'Subham',
//     supervisorTitle = 'Supervisor',
//     additionalDetails = '',
//     signatoryName = 'Yours Sincerely',
//     signatoryTitle = 'Signatory',
//     headerImage = 'https://res.cloudinary.com/dcpoiyzqi/image/upload/v1749546738/uploads/1749546736726-91b660c5372a77bf355b2ba1fa46d02a.png',
//     footerImage = 'https://res.cloudinary.com/dcpoiyzqi/image/upload/v1750245037/uploads/1750245035638-c4524c713841e6b3884c1d9e0c713722.jpg',
//     internshipFirstStatement = 'We are pleased to extend to you this offer of internship at Daya Consultancy Services (OPC) Pvt. Ltd. As Marketing - INTERN for 60 days if you accept this offer, you will begin your internship with the Company on 02/05/2025. This is a scope for you to learn new age technology and update yourself with industry standards. You will receive no type of payment per month. As an intern you will receive "temporary employment" status. As a temporary employee, you will not receive any of the employee benefits that regular Company employees receive including but not limited to, health insurance, vacation or sick pay, or paid holidays.',
//     internshipSecondStatement = 'payment per month. As an intern you will receive "temporary employment" status. As a temporary employee, you will not receive any of the employee benefits that regular Company employees receive including but not limited to, health insurance, vacation or sick pay, or paid holidays. During your internship if you are unable to attend the office for any reason then your internship duration will be extended. Your internship is expected to end in 2nd July 2025. However, your internship with the Company is "at-will," which means that either you or the Company may terminate your internship at any time, with or without cause and with or without notice. If your performance is seen to be appreciable then you may receive incentive.',
//     internshipThirdStatement = 'During your internship, you may have access to trade secrets and confidential business information belonging to the Company. By accepting this internship offer, you acknowledge that you must keep all this information strictly confidential, and refrain from using it for your own purposes or from disclosing it to anyone outside the Company.',
//     internshipFourthStatement = 'In addition, you agree that, upon conclusion of your internship, you will immediately return to the Company all its property, equipment, and documents, including electronically stored information.',
//     internshipFifthStatement = 'By accepting this offer, you agree that throughout your internship, you will observe all policies and practices governing the conduct of our business and employees, including our policies prohibiting discrimination and harassment. This letter sets forth the complete offer we are extending to you, and supersedes and replaces any prior inconsistent statements or discussions. It may be changed only by a subsequent written agreement. If any kind of unprofessional activity is being seen then legal actions may be taken against you.',
//     internshipClosingStatement = 'I hope that your association with the Company will be successful and rewarding. Kindly confirm your acceptance by signing this offer letter. If not accepted within 3 days of receipt. Please hand over your acceptance letter at our office.',
//     issueDate,
//   } = formData;

//   const [imageLoaded, setImageLoaded] = useState(false);
//   const [imageError, setImageError] = useState(false);
//   const formattedStartDate = startDate ? formatDate(startDate) : '[Start Date]';
//   const formattedEndDate = endDate ? formatDate(endDate) : '[End Date]';
//   const displayIssueDate = issueDate ? formatDate(issueDate) : formatDate(new Date().toISOString().split('T')[0]);

//   const calculateDuration = (startDateStr, endDateStr) => {
//     if (!startDateStr || !endDateStr) return '60';
    
//     let startDateObj, endDateObj;
    
//     if (startDateStr.includes('/')) {
//       const [day, month, year] = startDateStr.split('/');
//       startDateObj = new Date(year, month - 1, day);
//     } else {
//       startDateObj = new Date(startDateStr);
//     }
    
//     if (endDateStr.includes('/')) {
//       const [day, month, year] = endDateStr.split('/');
//       endDateObj = new Date(year, month - 1, day);
//     } else {
//       endDateObj = new Date(endDateStr);
//     }
    
//     const diffTime = Math.abs(endDateObj - startDateObj);
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
//     return diffDays.toString();
//   };

//   const formatIndianDate = (dateStr) => {
//     if (!dateStr) return '[Date]';
    
//     if (dateStr.includes('/')) {
//       const [day, month, year] = dateStr.split('/');
//       const months = ['January', 'February', 'March', 'April', 'May', 'June', 
//                      'July', 'August', 'September', 'October', 'November', 'December'];
//       const monthName = months[parseInt(month) - 1];
//       return `${parseInt(day)}${getOrdinalSuffix(parseInt(day))} ${monthName} ${year}`;
//     }
    
//     return formatDate(dateStr);
//   };

//   const getOrdinalSuffix = (day) => {
//     if (day > 3 && day < 21) return 'th';
//     switch (day % 10) {
//       case 1: return 'st';
//       case 2: return 'nd';
//       case 3: return 'rd';
//       default: return 'th';
//     }
//   };

//   const getFirstName = (fullName) => {
//     if (!fullName) return '';
//     return fullName.split(' ')[0];
//   };

//   const getFullNameWithTitle = (title, name) => {
//     if (!name) return '';
//     return `${title} ${name}`;
//   };

//   const internshipDuration = calculateDuration(startDate, endDate);

//   const HeaderSection = () => (
//     <div className="text-center mb-6">
//       {headerImage ? (
//         <img
//           src={headerImage}
//           alt="Company Logo"
//           className="mx-auto h-34 mb-4 max-w-full object-contain"
//           onError={(e) => {
//             console.error('Header image failed to load:', headerImage);
//             e.currentTarget.style.display = 'none';
//           }}
//           onLoad={() => {
//             setImageLoaded(true);
//             setImageError(false);
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
//           className="mx-auto h-18 mb-4 max-w-full object-contain"
//           onError={(e) => {
//             console.error('Footer image failed to load:', footerImage);
//             e.currentTarget.style.display = 'none';
//           }}
//           onLoad={() => {
//             setImageLoaded(true);
//             setImageError(false);
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
//       <div className="font-serif leading-relaxed max-w-4xl mx-auto bg-white min-h-[1000px] relative pb-24">      
//         <div dangerouslySetInnerHTML={{ __html: templateContent }} />      
//       </div>
//     );
//   }

//   return (
//     <div className="font-serif leading-relaxed max-w-4xl mx-auto bg-white min-h-[1000px] relative pb-24">
//       <HeaderSection />

//       <div className="mb-8 px-8">
//         <p><strong>Issue Date:</strong> {displayIssueDate}</p>
//         <p><strong>Start Date:</strong> {formatIndianDate(startDate)}</p>
//       </div>

//       <div className="mb-8 px-8">
//         <p>{getFullNameWithTitle(recipientTitle, recipientName)}</p>
//         {/* <p>{recipientAddress}</p> */}
//       </div>

//       <div className="mb-8 px-8">
//         <p className="font-bold">Subject: Internship Offer - {internPosition}</p>
//       </div>

//       <div className="mb-8 px-8 space-y-4">
//         <p>Dear {getFirstName(recipientName)},</p>
        
//         <p>
//           We are pleased to extend to you this offer of internship at <strong>Daya Consultancy Services (OPC) Pvt. Ltd.</strong> As <strong>{internPosition}</strong> for <strong>{internshipDuration} days</strong> if you accept this offer, you will begin your internship with the Company on <strong>{formatIndianDate(startDate)}</strong>. This is a scope for you to learn new age technology and update yourself with industry standards. You will receive no type of payment per month. As an intern you will receive "temporary employment" status. As a temporary employee, you will not receive any of the employee benefits that regular Company employees receive including but not limited to, health insurance, vacation or sick pay, or paid holidays.
//         </p>
        
//         <p>
//           As an intern you will receive "temporary employment" status. As a temporary employee, you will not receive any of the employee benefits that regular Company employees receive including but not limited to, health insurance, vacation or sick pay, or paid holidays. During your internship if you are unable to attend the office for any reason then your internship duration will be extended. Your internship is expected to end on <strong>{formatIndianDate(endDate)}</strong>. However, your internship with the Company is "at-will," which means that either you or the Company may terminate your internship at any time, with or without cause and with or without notice. If your performance is seen to be appreciable then you may receive incentive.
//         </p>

//         {additionalDetails && (
//           <p>{additionalDetails}</p>
//         )}
        
//         <p>
//           {internshipThirdStatement}
//         </p>

//         <p>
//           {internshipFourthStatement}
//         </p>

//         <p>
//           {internshipFifthStatement}
//         </p>

//         <p>
//           {internshipClosingStatement}
//         </p>
        
//         <p>Sincerely,</p>
//       </div>

//       <div className="px-8">
//         <p className="font-semibold">{signatoryName}</p>
//         <p>{signatoryTitle}</p>
//       </div>

//       <br />
//       <FooterSection />
//     </div>
//   );
// };

// export default InternshipLetterTemplate;


import React, { useState } from 'react';
import { formatDate } from '../../utils/formatters';

const InternshipLetterTemplate = ({ formData, templateContent }) => {
  const {
    recipientTitle = 'Mr.',
    recipientName = 'Subham Kumar Malu',
    recipientAddress = '05/04/2025',
    internPosition = 'Intern',
    internDepartment = 'Marketing',
    startDate = '02/05/2025',
    endDate = '02/07/2025',
    supervisorName = 'Subham',
    supervisorTitle = 'Supervisor',
    additionalDetails = '',
    signatoryName = 'Yours Sincerely',
    signatoryTitle = 'Signatory',
    headerImage = 'https://res.cloudinary.com/dcpoiyzqi/image/upload/v1749546738/uploads/1749546736726-91b660c5372a77bf355b2ba1fa46d02a.png',
    footerImage = 'https://res.cloudinary.com/dcpoiyzqi/image/upload/v1750245037/uploads/1750245035638-c4524c713841e6b3884c1d9e0c713722.jpg',
    internshipFirstStatement = 'We are pleased to extend to you this offer of internship at Daya Consultancy Services (OPC) Pvt. Ltd. As Marketing - INTERN for 60 days if you accept this offer, you will begin your internship with the Company on 02/05/2025. This is a scope for you to learn new age technology and update yourself with industry standards. You will receive no type of payment per month. As an intern you will receive "temporary employment" status. As a temporary employee, you will not receive any of the employee benefits that regular Company employees receive including but not limited to, health insurance, vacation or sick pay, or paid holidays.',
    internshipSecondStatement = 'payment per month. As an intern you will receive "temporary employment" status. As a temporary employee, you will not receive any of the employee benefits that regular Company employees receive including but not limited to, health insurance, vacation or sick pay, or paid holidays. During your internship if you are unable to attend the office for any reason then your internship duration will be extended. Your internship is expected to end in 2nd July 2025. However, your internship with the Company is "at-will," which means that either you or the Company may terminate your internship at any time, with or without cause and with or without notice. If your performance is seen to be appreciable then you may receive incentive.',
    internshipThirdStatement = 'During your internship, you may have access to trade secrets and confidential business information belonging to the Company. By accepting this internship offer, you acknowledge that you must keep all this information strictly confidential, and refrain from using it for your own purposes or from disclosing it to anyone outside the Company.',
    internshipFourthStatement = 'In addition, you agree that, upon conclusion of your internship, you will immediately return to the Company all its property, equipment, and documents, including electronically stored information.',
    internshipFifthStatement = 'By accepting this offer, you agree that throughout your internship, you will observe all policies and practices governing the conduct of our business and employees, including our policies prohibiting discrimination and harassment. This letter sets forth the complete offer we are extending to you, and supersedes and replaces any prior inconsistent statements or discussions. It may be changed only by a subsequent written agreement. If any kind of unprofessional activity is being seen then legal actions may be taken against you.',
    internshipClosingStatement = 'I hope that your association with the Company will be successful and rewarding. Kindly confirm your acceptance by signing this offer letter. If not accepted within 3 days of receipt. Please hand over your acceptance letter at our office.',
    issueDate,
  } = formData;

  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const formattedStartDate = startDate ? formatDate(startDate) : '[Start Date]';
  const formattedEndDate = endDate ? formatDate(endDate) : '[End Date]';
  const displayIssueDate = issueDate ? formatDate(issueDate) : formatDate(new Date().toISOString().split('T')[0]);

  const calculateDuration = (startDateStr, endDateStr) => {
    if (!startDateStr || !endDateStr) return '60';
    
    let startDateObj, endDateObj;
    
    if (startDateStr.includes('/')) {
      const [day, month, year] = startDateStr.split('/');
      startDateObj = new Date(year, month - 1, day);
    } else {
      startDateObj = new Date(startDateStr);
    }
    
    if (endDateStr.includes('/')) {
      const [day, month, year] = endDateStr.split('/');
      endDateObj = new Date(year, month - 1, day);
    } else {
      endDateObj = new Date(endDateStr);
    }
    
    const diffTime = Math.abs(endDateObj - startDateObj);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays.toString();
  };

  const formatIndianDate = (dateStr) => {
    if (!dateStr) return '[Date]';
    
    if (dateStr.includes('/')) {
      const [day, month, year] = dateStr.split('/');
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                     'July', 'August', 'September', 'October', 'November', 'December'];
      const monthName = months[parseInt(month) - 1];
      return `${parseInt(day)}${getOrdinalSuffix(parseInt(day))} ${monthName} ${year}`;
    }
    
    return formatDate(dateStr);
  };

  const getOrdinalSuffix = (day) => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };

  const getFirstName = (fullName) => {
    if (!fullName) return '';
    return fullName.split(' ')[0];
  };

  const getFullNameWithTitle = (title, name) => {
    if (!name) return '';
    return `${title} ${name}`;
  };

  const internshipDuration = calculateDuration(startDate, endDate);

  const HeaderSection = () => (
    <div className="text-center mb-6">
      {headerImage ? (
        <img
          src={headerImage}
          alt="Company Logo"
          className="mx-auto h-32 mb-4 max-w-full object-contain"
          onError={(e) => {
            console.error('Header image failed to load:', headerImage);
            e.currentTarget.style.display = 'none';
          }}
          onLoad={() => {
            setImageLoaded(true);
            setImageError(false);
          }}
        />
      ) : (
        <div className="mx-auto h-26 mb-4 flex items-center justify-center border-2 border-dashed border-gray-300 text-gray-500 text-sm">
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
            setImageLoaded(true);
            setImageError(false);
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
      <div className="font-sans leading-relaxed max-w-4xl mx-auto bg-white min-h-[1000px] relative pb-24">      
        <div dangerouslySetInnerHTML={{ __html: templateContent }} />      
      </div>
    );
  }

  return (
    <div className="font-sans leading-relaxed max-w-4xl mx-auto bg-white min-h-[1000px] relative pb-24">
      <HeaderSection />

      <div className="mb-8 px-8">
        <p><strong>Issue Date:</strong> {displayIssueDate}</p>
        <p><strong>Start Date:</strong> {formatIndianDate(startDate)}</p>
      </div>

      <div className="mb-8 px-8">
        <p>{getFullNameWithTitle(recipientTitle, recipientName)}</p>
        {/* <p>{recipientAddress}</p> */}
      </div>

      <div className="mb-8 px-8">
        <p className="font-bold">Subject: Internship Offer - {internPosition}</p>
      </div>

      <div className="mb-8 px-8 space-y-4">
        <p>Dear {getFirstName(recipientName)},</p>
        
        <p>
          We are pleased to extend to you this offer of internship at <strong>Daya Consultancy Services (OPC) Pvt. Ltd.</strong> As <strong>{internPosition}</strong> for <strong>{internshipDuration} days</strong> if you accept this offer, you will begin your internship with the Company on <strong>{formatIndianDate(startDate)}</strong>. This is a scope for you to learn new age technology and update yourself with industry standards. You will receive no type of payment per month. As an intern you will receive "temporary employment" status. As a temporary employee, you will not receive any of the employee benefits that regular Company employees receive including but not limited to, health insurance, vacation or sick pay, or paid holidays.
        </p>
        
        <p>
          As an intern you will receive "temporary employment" status. As a temporary employee, you will not receive any of the employee benefits that regular Company employees receive including but not limited to, health insurance, vacation or sick pay, or paid holidays. During your internship if you are unable to attend the office for any reason then your internship duration will be extended. Your internship is expected to end on <strong>{formatIndianDate(endDate)}</strong>. However, your internship with the Company is "at-will," which means that either you or the Company may terminate your internship at any time, with or without cause and with or without notice. If your performance is seen to be appreciable then you may receive incentive.
        </p>

        {additionalDetails && (
          <p>{additionalDetails}</p>
        )}
        
        <p>
          {internshipThirdStatement}
        </p>

        <p>
          {internshipFourthStatement}
        </p>

        <p>
          {internshipFifthStatement}
        </p>

        <p>
          {internshipClosingStatement}
        </p>
        
        <p>Sincerely,</p>
      </div>

      <div className="px-8">
        <p className="font-semibold">{signatoryName}</p>
        <p>{signatoryTitle}</p>
      </div>

      <br />
      <FooterSection />
    </div>
  );
};

export default InternshipLetterTemplate;
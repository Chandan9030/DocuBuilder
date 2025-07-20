// import React, { useState } from 'react';

// type HikeLetterFormData = {
//   recipientTitle?: string;
//   recipientName?: string;
//   employeeId?: string;
//   salary?: string;
//   ctc?: string;
//   date?: string;
//   signatoryName?: string;
//   signatoryTitle?: string;
//   headerImage?: string;
//   footerImage?: string;
// };

// type HikeLetterTemplateProps = {
//   formData?: HikeLetterFormData;
//   templateContent?: string;
// };

// const HikeLetterTemplate: React.FC<HikeLetterTemplateProps> = ({ formData = {} as HikeLetterFormData, templateContent }) => {
//   const {
//     recipientTitle = 'Ms.',
//     recipientName = 'AGNI TANMAYA BEHERA',
//     employeeId = 'DCS 069',
//     salary = '27000',
//     ctc = '324000',
//     date = 'June 1, 2023',
//     signatoryName = 'Daya Shankar Das',
//     signatoryTitle = 'Director – DAYA CONSULTANCY SERVICES',
//     headerImage = 'https://res.cloudinary.com/dcpoiyzqi/image/upload/v1749546738/uploads/1749546736726-91b660c5372a77bf355b2ba1fa46d02a.png',
//     footerImage = 'https://res.cloudinary.com/dcpoiyzqi/image/upload/v1750245037/uploads/1750245035638-c4524c713841e6b3884c1d9e0c713722.jpg'
//   } = formData;

//   const [headerImageLoaded, setHeaderImageLoaded] = useState(false);
//   const [headerImageError, setHeaderImageError] = useState(false);
//   const [footerImageLoaded, setFooterImageLoaded] = useState(false);
//   const [footerImageError, setFooterImageError] = useState(false);

//   const fullRecipientName = recipientTitle ? `${recipientTitle} ${recipientName}` : recipientName;
//   const grossMonthly = parseFloat(salary) || (parseFloat(ctc) / 12) || 17000;
//   const grossAnnual = parseFloat(ctc) || (parseFloat(salary) * 12) || 204000;

//   const basicSalaryMonthly = (grossMonthly * 0.5).toFixed(0);
//   const hraMonthly = (parseFloat(basicSalaryMonthly) * 0.5).toFixed(0);
//   const conveyanceMonthly = (parseFloat(basicSalaryMonthly) * 0.2).toFixed(0);
//   const medicalMonthly = (parseFloat(basicSalaryMonthly) * 0.3).toFixed(0);
//   const specialMonthly = (grossMonthly - (parseFloat(basicSalaryMonthly) * (1 + 0.5 + 0.2 + 0.3))).toFixed(0);

//   const basicSalaryAnnual = (grossAnnual * 0.5).toFixed(0);
//   const hraAnnual = (parseFloat(basicSalaryAnnual) * 0.5).toFixed(0);
//   const conveyanceAnnual = (parseFloat(basicSalaryAnnual) * 0.2).toFixed(0);
//   const medicalAnnual = (parseFloat(basicSalaryAnnual) * 0.3).toFixed(0);
//   const specialAnnual = (grossAnnual - (parseFloat(basicSalaryAnnual) * (1 + 0.5 + 0.2 + 0.3))).toFixed(0);

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
//         <div className="mx-auto h-20 mb-4 flex items-center justify-center border-2 border-dashed border-gray-300 text-gray-500 text-sm">
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
//       <div className="bg-white w-full max-w-[900px] mx-auto font-sans">
//         <style dangerouslySetInnerHTML={{
//           __html: `
//             @media print {
//               .page-break-after {
//                 page-break-after: always;
//               }
//               .page-break-before {
//                 page-break-before: always;
//               }
//             }
//             @media screen {
//               .page-break-after {
//                 break-after: page;
//                 margin-bottom: 50px;
//                 border-bottom: 2px dashed #ccc;
//                 padding-bottom: 20px;
//               }
//               .page-break-before {
//                 break-before: page;
//                 margin-top: 50px;
//                 border-top: 2px dashed #ccc;
//                 padding-top: 20px;
//               }
//             }
//           `
//         }} />
        
//         <div className="bg-white min-h-[900px] w-full border border-gray-300 page-break-after">
//           <div dangerouslySetInnerHTML={{ __html: templateContent }} />
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white w-full max-w-[900px] mx-auto font-sans">
//       <style dangerouslySetInnerHTML={{
//         __html: `
//           @media print {
//             .page-break-after {
//               page-break-after: always;
//             }
//             .page-break-before {
//               page-break-before: always;
//             }
//           }
//           @media screen {
//             .page-break-after {
//               break-after: page;
//               margin-bottom: 50px;
//               border-bottom: 2px dashed #ccc;
//               padding-bottom: 20px;
//             }
//             .page-break-before {
//               break-before: page;
//               margin-top: 50px;
//               border-top: 2px dashed #ccc;
//               padding-top: 20px;
//             }
//           }
//         `
//       }} />
      
//       <div className="bg-white min-h-[900px] w-full border border-gray-300 page-break-after">
//         <HeaderSection />
        
//         <div className="p-6">
//           <div className="mb-6">
//             <h2 className="text-lg font-bold">DAYA CONSULTANCY SERVICES PRIVATE LIMITED</h2>
//             <p className="text-sm">B-19, Kousalya Bhavan, Saheed Nagar, Bhubaneswar</p>
//             <p className="text-sm">- 751007, Odisha, India.</p>
//             <p className="text-sm text-blue-600 underline">https://www.dayacs.com/</p>
//           </div>

//           <div className="text-right mb-6">
//             <p className="font-bold text-lg">{date}</p>
//           </div>

//           <div className="mb-6">
//             <p className="font-bold text-lg">NAME: {recipientName}</p>
//             <p className="font-bold text-lg">EMPLOYEE ID: {employeeId}</p>
//           </div>

//           <div className="mb-8 space-y-4">
//             <p>Dear {recipientName.split(' ')[0]},</p>
//             <p>We are pleased to inform you, that your compensation is being revised effective {date}.</p>
//             <p>A break-up of your revised compensation is detailed in the salary annexure.</p>
//             <p>We sincerely appreciate your contribution to the organization and look forward to the same in the future.</p>
//             <p>Please further note that you shall continue to be bound by all Daya Consultancy Policies.</p>
//             <p>Your compensation details are strictly personal and confidential and should not be disclosed to others.</p>
//             <p>Wishing you a happy and rewarding career with Daya Consultancy Services!</p>
//           </div>

//           <div className="mt-14 mb-6">
//             <p className="font-bold">With Best Wishes,</p>
//             <p className="mb-4">From Daya Consultancy Services Private Limited</p>
            
//             <div className="w-48 h-16 bg-gray-200 border border-gray-400 flex items-center justify-center mb-4">
//               <div className="text-center text-sm text-gray-600">
//                 <p className="text-xs">Daya Consultancy Services (OPC) Pvt. Ltd.</p>
//                 <div className="text-blue-600 font-bold italic">Signature</div>
//                 <p className="text-xs">Director</p>
//               </div>
//             </div>
            
//             <p className="font-bold">{signatoryName}</p>
//             <p className="text-sm">{signatoryTitle}</p>
//           </div>
//         </div>

//         <FooterSection />
//       </div>

//       <div className="bg-white min-h-[900px] w-full border border-gray-300 page-break-after">
//         <HeaderSection />
        
//         <div className="p-10">
//           <div className="text-right mb-12">
//             <p className="font-bold text-lg">{date}</p>
//           </div>

//           <div className="text-center mb-12">
//             <h1 className="text-2xl font-bold">ANNEXURE – I</h1>
//             <h2 className="text-xl font-bold underline mt-4">GUIDELINES</h2>
//           </div>

//           <div className="mb-12 space-y-4">
//             <div className="flex items-start">
//               <span className="mr-4">➤</span>
//               <p>Kindly submit your daily work progress report to Smruti and Pushpanjali.</p>
//             </div>
//             <div className="flex items-start">
//               <span className="mr-4">➤</span>
//               <p>Smruti will be responsible for assigning you the Technical Tasks.</p>
//             </div>
//             <div className="flex items-start">
//               <span className="mr-4">➤</span>
//               <p>In addition to the initial task, Smruti will provide you with additional assignments upon completion of the initial tasks.</p>
//             </div>
//             <div className="flex items-start">
//               <span className="mr-4">➤</span>
//               <p>In case of any future issues related to bug fixing and testing, you may be assigned tasks associated with resolving those matters.</p>
//             </div>
//             <div className="flex items-start">
//               <span className="mr-4">➤</span>
//               <p>If you have available time after your regular work hours, kindly prioritize the documentation of your ongoing tasks.</p>
//             </div>
//             <div className="flex items-start">
//               <span className="mr-4">➤</span>
//               <p>As part of your weekly responsibilities, please ensure that you prepare and share the project related documents with us.</p>
//             </div>
//             <div className="flex items-start">
//               <span className="mr-4">➤</span>
//               <p>Hike will not be provided until your next hike cycle.</p>
//             </div>
//             <div className="flex items-start">
//               <span className="mr-4">➤</span>
//               <p>Your performance will be assessed after a period of 6 months.</p>
//             </div>
//             <div className="flex items-start">
//               <span className="mr-4">➤</span>
//               <p>Your designated work hours will be 8 hours, with a scheduled 1-Hour lunch break and 30minutes Tea Break.</p>
//             </div>
//             <div className="flex items-start">
//               <span className="mr-4">➤</span>
//               <p><strong>Adhering to the 9 Hour 30 minutes workday is required. Failure to comply may result in deductions from your salary.</strong></p>
//             </div>
//             <div className="flex items-start">
//               <span className="mr-4">➤</span>
//               <p>Fulfilling the 30 days notice period is a mandatory requirement. Failure to do so will result in a fee equivalent to the remaining days of your notice period.</p>
//             </div>
//             <div className="flex items-start">
//               <span className="mr-4">➤</span>
//               <p><strong>The appropriate disciplinary action will be taken against the delinquent Employee who is found to violate the policies and environment of the company. The disciplinary action may include termination of employment & appropriate legal actions will also be taken.</strong></p>
//             </div>
//           </div>

//           <div className="mt-16 mb-8">
//             <p className="font-bold">{signatoryName}</p>
//             <p className="text-sm">{signatoryTitle}</p>
//           </div>
//         </div>

//         <FooterSection />
//       </div>

//       <div className="bg-white min-h-[900px] w-full border border-gray-300">
//         <HeaderSection />

//         <div className="p-8">
//           <div className="text-right mb-8">
//             <p className="font-bold text-lg">{date}</p>
//           </div>

//           <div className="text-center mb-8">
//             <h1 className="text-2xl font-bold">SALARY ANNEXURE</h1>
//           </div>

//           <div className="mb-10">
//             <table className="w-full border-collapse">
//               <thead>
//                 <tr className="bg-blue-600 text-white">
//                   <th className="border border-gray-400 p-2 text-left font-bold">Salary Break up</th>
//                   <th className="border border-gray-400 p-2 text-center font-bold">Monthly</th>
//                   <th className="border border-gray-400 p-2 text-center font-bold">Annual</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr className="bg-blue-600 text-white">
//                   <td className="border border-gray-400 p-2 font-bold">BENEFITS</td>
//                   <td className="border border-gray-400 p-2"></td>
//                   <td className="border border-gray-400 p-2"></td>
//                 </tr>
//                 <tr>
//                   <td className="border border-gray-400 p-2">Basic Salary</td>
//                   <td className="border border-gray-400 p-2 text-center">{basicSalaryMonthly}</td>
//                   <td className="border border-gray-400 p-2 text-center">{basicSalaryAnnual}</td>
//                 </tr>
//                 <tr>
//                   <td className="border border-gray-400 p-2">House Rent Allowance</td>
//                   <td className="border border-gray-400 p-2 text-center">{hraMonthly}</td>
//                   <td className="border border-gray-400 p-2 text-center">{hraAnnual}</td>
//                 </tr>
//                 <tr>
//                   <td className="border border-gray-400 p-2">Conveyance Allowance</td>
//                   <td className="border border-gray-400 p-2 text-center">{conveyanceMonthly}</td>
//                   <td className="border border-gray-400 p-2 text-center">{conveyanceAnnual}</td>
//                 </tr>
//                 <tr>
//                   <td className="border border-gray-400 p-2">Medical Allowance</td>
//                   <td className="border border-gray-400 p-2 text-center">{medicalMonthly}</td>
//                   <td className="border border-gray-400 p-2 text-center">{medicalAnnual}</td>
//                 </tr>
//                 <tr>
//                   <td className="border border-gray-400 p-2">Special Allowance</td>
//                   <td className="border border-gray-400 p-2 text-center">{specialMonthly}</td>
//                   <td className="border border-gray-400 p-2 text-center">{specialAnnual}</td>
//                 </tr>
//                 <tr className="bg-blue-600 text-white">
//                   <td className="border border-gray-400 p-2 font-bold">Total Gross Compensation</td>
//                   <td className="border border-gray-400 p-2 text-center font-bold">{grossMonthly}</td>
//                   <td className="border border-gray-400 p-2 text-center font-bold">{grossAnnual}</td>
//                 </tr>
//                 <tr>
//                   <td className="border border-gray-400 p-2"></td>
//                   <td className="border border-gray-400 p-2"></td>
//                   <td className="border border-gray-400 p-2"></td>
//                 </tr>
//                 <tr className="bg-blue-600 text-white">
//                   <td className="border border-gray-400 p-2 font-bold">Year End Bonus & Retirals</td>
//                   <td className="border border-gray-400 p-2"></td>
//                   <td className="border border-gray-400 p-2"></td>
//                 </tr>
//                 <tr>
//                   <td className="border border-gray-400 p-2">Company's Contribution to PF</td>
//                   <td className="border border-gray-400 p-2"></td>
//                   <td className="border border-gray-400 p-2"></td>
//                 </tr>
//                 <tr className="bg-blue-600 text-white">
//                   <td className="border border-gray-400 p-2 font-bold">Total Fixed Compensation</td>
//                   <td className="border border-gray-400 p-2"></td>
//                   <td className="border border-gray-400 p-2"></td>
//                 </tr>
//                 <tr className="bg-blue-600 text-white">
//                   <td className="border border-gray-400 p-2 font-bold">Variable Pay**</td>
//                   <td className="border border-gray-400 p-2"></td>
//                   <td className="border border-gray-400 p-2"></td>
//                 </tr>
//                 <tr>
//                   <td className="border border-gray-400 p-2">Performance Linked Incentive</td>
//                   <td className="border border-gray-400 p-2"></td>
//                   <td className="border border-gray-400 p-2"></td>
//                 </tr>
//                 <tr className="bg-blue-600 text-white">
//                   <td className="border border-gray-400 p-2 font-bold">TOTAL ANNUAL PACKAGE</td>
//                   <td className="border border-gray-400 p-2 text-center font-bold">{grossMonthly}</td>
//                   <td className="border border-gray-400 p-2 text-center font-bold">{grossAnnual}</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>

//           <div className="mt-10 mb-4">
//             <div className="text-left">
//               <p className="font-bold text-lg">{signatoryName}</p>
//               <p className="text-sm">{signatoryTitle}</p>
//             </div>
//           </div>
//         </div>

//         <FooterSection />
//       </div>
//     </div>
//   );
// };

// export default HikeLetterTemplate;




import React, { useState } from 'react';

type HikeLetterFormData = {
  recipientTitle?: string;
  recipientName?: string;
  employeeId?: string;
  salary?: string;
  ctc?: string;
  date?: string;
  signatoryName?: string;
  signatoryTitle?: string;
  headerImage?: string;
  footerImage?: string;
};

type HikeLetterTemplateProps = {
  formData?: HikeLetterFormData;
  templateContent?: string;
};

const HikeLetterTemplate: React.FC<HikeLetterTemplateProps> = ({ formData = {} as HikeLetterFormData, templateContent }) => {
  const {
    recipientTitle = 'Ms.',
    recipientName = 'AGNI TANMAYA BEHERA',
    employeeId = 'DCS 069',
    salary = '27000',
    ctc = '324000',
    date = 'June 1, 2023',
    signatoryName = 'Daya Shankar Das',
    signatoryTitle = 'Director – DAYA CONSULTANCY SERVICES',
    headerImage = 'https://res.cloudinary.com/dcpoiyzqi/image/upload/v1749546738/uploads/1749546736726-91b660c5372a77bf355b2ba1fa46d02a.png',
    footerImage = 'https://res.cloudinary.com/dcpoiyzqi/image/upload/v1750245037/uploads/1750245035638-c4524c713841e6b3884c1d9e0c713722.jpg'
  } = formData;

  const [headerImageLoaded, setHeaderImageLoaded] = useState(false);
  const [headerImageError, setHeaderImageError] = useState(false);
  const [footerImageLoaded, setFooterImageLoaded] = useState(false);
  const [footerImageError, setFooterImageError] = useState(false);

  const fullRecipientName = recipientTitle ? `${recipientTitle} ${recipientName}` : recipientName;
  const grossMonthly = parseFloat(salary) || (parseFloat(ctc) / 12) || 17000;
  const grossAnnual = parseFloat(ctc) || (parseFloat(salary) * 12) || 204000;

  const basicSalaryMonthly = (grossMonthly * 0.5).toFixed(0);
  const hraMonthly = (parseFloat(basicSalaryMonthly) * 0.5).toFixed(0);
  const conveyanceMonthly = (parseFloat(basicSalaryMonthly) * 0.2).toFixed(0);
  const medicalMonthly = (parseFloat(basicSalaryMonthly) * 0.3).toFixed(0);
  const specialMonthly = (grossMonthly - (parseFloat(basicSalaryMonthly) * (1 + 0.5 + 0.2 + 0.3))).toFixed(0);

  const basicSalaryAnnual = (grossAnnual * 0.5).toFixed(0);
  const hraAnnual = (parseFloat(basicSalaryAnnual) * 0.5).toFixed(0);
  const conveyanceAnnual = (parseFloat(basicSalaryAnnual) * 0.2).toFixed(0);
  const medicalAnnual = (parseFloat(basicSalaryAnnual) * 0.3).toFixed(0);
  const specialAnnual = (grossAnnual - (parseFloat(basicSalaryAnnual) * (1 + 0.5 + 0.2 + 0.3))).toFixed(0);

  const HeaderSection = () => (
    <div className="text-center mb-6">
      {headerImage ? (
        <img
          src={headerImage}
          alt="Company Logo"
          className="mx-auto h-26 mb-4 max-w-full object-contain"
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
        <div className="mx-auto h-20 mb-4 flex items-center justify-center border-2 border-dashed border-gray-300 text-gray-500 text-sm">
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
          className="mx-auto h-18 mb-4 max-w-full object-contain"
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
        <div className="mx-auto h-18 mb-4 flex items-center justify-center border-2 border-dashed border-gray-300 text-gray-500 text-sm">
          Footer Image
        </div>
      )}
    </div>
  );

  if (templateContent) {
    return (
      <div className="bg-white w-full max-w-[900px] mx-auto font-sans">
        <style dangerouslySetInnerHTML={{
          __html: `
            @media print {
              .page-break-after {
                page-break-after: always;
              }
              .page-break-before {
                page-break-before: always;
              }
            }
            @media screen {
              .page-break-after {
                break-after: page;
                margin-bottom: 50px;
                border-bottom: 2px dashed #ccc;
                padding-bottom: 20px;
              }
              .page-break-before {
                break-before: page;
                margin-top: 50px;
                border-top: 2px dashed #ccc;
                padding-top: 20px;
              }
            }
          `
        }} />
        
        <div className="pdf-page bg-white min-h-[900px] w-full border border-gray-300 page-break-after">
          <div dangerouslySetInnerHTML={{ __html: templateContent }} />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white w-full max-w-[900px] mx-auto font-sans">
      <style dangerouslySetInnerHTML={{
        __html: `
          @media print {
            .page-break-after {
              page-break-after: always;
            }
            .page-break-before {
              page-break-before: always;
            }
          }
          @media screen {
            .page-break-after {
              break-after: page;
              margin-bottom: 50px;
              border-bottom: 2px dashed #ccc;
              padding-bottom: 20px;
            }
            .page-break-before {
              break-before: page;
              margin-top: 50px;
              border-top: 2px dashed #ccc;
              padding-top: 20px;
            }
          }
        `
      }} />
      
      <div className="pdf-page bg-white min-h-[900px] w-full border border-gray-300 page-break-after">
        <HeaderSection />
        
        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-lg font-bold">DAYA CONSULTANCY SERVICES PRIVATE LIMITED</h2>
            <p className="text-sm">B-19, Kousalya Bhavan, Saheed Nagar, Bhubaneswar</p>
            <p className="text-sm">- 751007, Odisha, India.</p>
            <p className="text-sm text-blue-600 underline">https://www.dayacs.com/</p>
          </div>

          <div className="text-right mb-6">
            <p className="font-bold text-lg">{date}</p>
          </div>

          <div className="mb-6">
            <p className="font-bold text-lg">NAME: {recipientName}</p>
            <p className="font-bold text-lg">EMPLOYEE ID: {employeeId}</p>
          </div>

          <div className="mb-8 space-y-4">
            <p>Dear {recipientName.split(' ')[0]},</p>
            <p>We are pleased to inform you, that your compensation is being revised effective {date}.</p>
            <p>A break-up of your revised compensation is detailed in the salary annexure.</p>
            <p>We sincerely appreciate your contribution to the organization and look forward to the same in the future.</p>
            <p>Please further note that you shall continue to be bound by all Daya Consultancy Policies.</p>
            <p>Your compensation details are strictly personal and confidential and should not be disclosed to others.</p>
            <p>Wishing you a happy and rewarding career with Daya Consultancy Services!</p>
          </div>

          <div className="mt-14 mb-6">
            <p className="font-bold">With Best Wishes,</p>
            <p className="mb-4">From Daya Consultancy Services Private Limited</p>
            
            <div className="w-48 h-16 bg-gray-200 border border-gray-400 flex items-center justify-center mb-4">
              <div className="text-center text-sm text-gray-600">
                <p className="text-xs">Daya Consultancy Services (OPC) Pvt. Ltd.</p>
                <div className="text-blue-600 font-bold italic">Signature</div>
                <p className="text-xs">Director</p>
              </div>
            </div>
            
            <p className="font-bold">{signatoryName}</p>
            <p className="text-sm">{signatoryTitle}</p>
          </div>
        </div>

        <FooterSection />
      </div>

      <div className="pdf-page bg-white min-h-[900px] w-full border border-gray-300 page-break-after">
        <HeaderSection />
        
        <div className="p-4">
          <div className="text-right mb-12">
            <p className="font-bold text-lg">{date}</p>
          </div>

          <div className="text-center mb-12">
            <h1 className="text-2xl font-bold">ANNEXURE – I</h1>
            <h2 className="text-xl font-bold underline mt-4">GUIDELINES</h2>
          </div>

          <div className="mb-12 space-y-4">
            <div className="flex items-start">
              <span className="mr-4">➤</span>
              <p>Kindly submit your daily work progress report to Smruti and Pushpanjali.</p>
            </div>
            <div className="flex items-start">
              <span className="mr-4">➤</span>
              <p>Smruti will be responsible for assigning you the Technical Tasks.</p>
            </div>
            <div className="flex items-start">
              <span className="mr-4">➤</span>
              <p>In addition to the initial task, Smruti will provide you with additional assignments upon completion of the initial tasks.</p>
            </div>
            <div className="flex items-start">
              <span className="mr-4">➤</span>
              <p>In case of any future issues related to bug fixing and testing, you may be assigned tasks associated with resolving those matters.</p>
            </div>
            <div className="flex items-start">
              <span className="mr-4">➤</span>
              <p>If you have available time after your regular work hours, kindly prioritize the documentation of your ongoing tasks.</p>
            </div>
            <div className="flex items-start">
              <span className="mr-4">➤</span>
              <p>As part of your weekly responsibilities, please ensure that you prepare and share the project related documents with us.</p>
            </div>
            <div className="flex items-start">
              <span className="mr-4">➤</span>
              <p>Hike will not be provided until your next hike cycle.</p>
            </div>
            <div className="flex items-start">
              <span className="mr-4">➤</span>
              <p>Your performance will be assessed after a period of 6 months.</p>
            </div>
            <div className="flex items-start">
              <span className="mr-4">➤</span>
              <p>Your designated work hours will be 8 hours, with a scheduled 1-Hour lunch break and 30minutes Tea Break.</p>
            </div>
            <div className="flex items-start">
              <span className="mr-4">➤</span>
              <p><strong>Adhering to the 9 Hour 30 minutes workday is required. Failure to comply may result in deductions from your salary.</strong></p>
            </div>
            <div className="flex items-start">
              <span className="mr-4">➤</span>
              <p>Fulfilling the 30 days notice period is a mandatory requirement. Failure to do so will result in a fee equivalent to the remaining days of your notice period.</p>
            </div>
            <div className="flex items-start">
              <span className="mr-4">➤</span>
              <p><strong>The appropriate disciplinary action will be taken against the delinquent Employee who is found to violate the policies and environment of the company. The disciplinary action may include termination of employment & appropriate legal actions will also be taken.</strong></p>
            </div>
          </div>

          <div className="mt-16 mb-8">
            <p className="font-bold">{signatoryName}</p>
            <p className="text-sm">{signatoryTitle}</p>
          </div>
        </div>

        <FooterSection />
      </div>

      <div className="pdf-page bg-white min-h-[900px] w-full border border-gray-300">
        <HeaderSection />

        <div className="p-8">
          <div className="text-right mb-8">
            <p className="font-bold text-lg">{date}</p>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold">SALARY ANNEXURE</h1>
          </div>

          <div className="mb-10">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="border border-gray-400 p-2 text-left font-bold">Salary Break up</th>
                  <th className="border border-gray-400 p-2 text-center font-bold">Monthly</th>
                  <th className="border border-gray-400 p-2 text-center font-bold">Annual</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-blue-600 text-white">
                  <td className="border border-gray-400 p-2 font-bold">BENEFITS</td>
                  <td className="border border-gray-400 p-2"></td>
                  <td className="border border-gray-400 p-2"></td>
                </tr>
                <tr>
                  <td className="border border-gray-400 p-2">Basic Salary</td>
                  <td className="border border-gray-400 p-2 text-center">{basicSalaryMonthly}</td>
                  <td className="border border-gray-400 p-2 text-center">{basicSalaryAnnual}</td>
                </tr>
                <tr>
                  <td className="border border-gray-400 p-2">House Rent Allowance</td>
                  <td className="border border-gray-400 p-2 text-center">{hraMonthly}</td>
                  <td className="border border-gray-400 p-2 text-center">{hraAnnual}</td>
                </tr>
                <tr>
                  <td className="border border-gray-400 p-2">Conveyance Allowance</td>
                  <td className="border border-gray-400 p-2 text-center">{conveyanceMonthly}</td>
                  <td className="border border-gray-400 p-2 text-center">{conveyanceAnnual}</td>
                </tr>
                <tr>
                  <td className="border border-gray-400 p-2">Medical Allowance</td>
                  <td className="border border-gray-400 p-2 text-center">{medicalMonthly}</td>
                  <td className="border border-gray-400 p-2 text-center">{medicalAnnual}</td>
                </tr>
                <tr>
                  <td className="border border-gray-400 p-2">Special Allowance</td>
                  <td className="border border-gray-400 p-2 text-center">{specialMonthly}</td>
                  <td className="border border-gray-400 p-2 text-center">{specialAnnual}</td>
                </tr>
                <tr className="bg-blue-600 text-white">
                  <td className="border border-gray-400 p-2 font-bold">Total Gross Compensation</td>
                  <td className="border border-gray-400 p-2 text-center font-bold">{grossMonthly}</td>
                  <td className="border border-gray-400 p-2 text-center font-bold">{grossAnnual}</td>
                </tr>
                <tr>
                  <td className="border border-gray-400 p-2"></td>
                  <td className="border border-gray-400 p-2"></td>
                  <td className="border border-gray-400 p-2"></td>
                </tr>
                <tr className="bg-blue-600 text-white">
                  <td className="border border-gray-400 p-2 font-bold">Year End Bonus & Retirals</td>
                  <td className="border border-gray-400 p-2"></td>
                  <td className="border border-gray-400 p-2"></td>
                </tr>
                <tr>
                  <td className="border border-gray-400 p-2">Company's Contribution to PF</td>
                  <td className="border border-gray-400 p-2"></td>
                  <td className="border border-gray-400 p-2"></td>
                </tr>
                <tr className="bg-blue-600 text-white">
                  <td className="border border-gray-400 p-2 font-bold">Total Fixed Compensation</td>
                  <td className="border border-gray-400 p-2"></td>
                  <td className="border border-gray-400 p-2"></td>
                </tr>
                <tr className="bg-blue-600 text-white">
                  <td className="border border-gray-400 p-2 font-bold">Variable Pay**</td>
                  <td className="border border-gray-400 p-2"></td>
                  <td className="border border-gray-400 p-2"></td>
                </tr>
                <tr>
                  <td className="border border-gray-400 p-2">Performance Linked Incentive</td>
                  <td className="border border-gray-400 p-2"></td>
                  <td className="border border-gray-400 p-2"></td>
                </tr>
                <tr className="bg-blue-600 text-white">
                  <td className="border border-gray-400 p-2 font-bold">TOTAL ANNUAL PACKAGE</td>
                  <td className="border border-gray-400 p-2 text-center font-bold">{grossMonthly}</td>
                  <td className="border border-gray-400 p-2 text-center font-bold">{grossAnnual}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-10 mb-4">
            <div className="text-left">
              <p className="font-bold text-lg">{signatoryName}</p>
              <p className="text-sm">{signatoryTitle}</p>
            </div>
          </div>
        </div>

        <FooterSection />
      </div>
    </div>
  );
};

export default HikeLetterTemplate;
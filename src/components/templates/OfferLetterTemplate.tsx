// import React from 'react';
// import { formatDate, formatCurrency } from '../../utils/formatters';

// const OfferLetterTemplate = ({ formData, templateContent }) => {
//   const {
//     companyName = 'DAYA CONSULTANCY SERVICES (OPC) Pvt. Ltd.',
//     companyAddress = 'B-19, Saheed Nagar, Bhubaneswar-751007, Odisha',
//     recipientTitle = 'Mr.',
//     recipientName = 'Agni Tanmaya Behera',
//     recipientAddress = 'Your Address',
//     jobTitle = 'Full Stack Developer',
//     department = 'Development',
//     startDate = '02/05/2022',
//     salary = '17000',
//     ctc = '204000',
//     reportingAddress = 'B-19, Saheed Nagar, Bhubaneswar-751007, Odisha',
//     probationPeriod = 'three month',
//     signatoryName = 'Dayashankar Das (CEO)',
//     signatoryTitle = 'CEO',
//     headerImage = 'https://res.cloudinary.com/dcpoiyzqi/image/upload/v1749209085/uploads/1749209084379-1563b3f81f4be9fbc787eb359ff0f470.jpg',
//     greeting = 'Dear Agni,',
//     welcomeMessage = 'A very warm welcome to you!',
//     offerIntroduction = 'Thank you for exploring career opportunities with <strong>DAYA CONSULTANCY SERVICES (OPC) Pvt. Ltd.</strong>. You have successfully completed our selection process and we are pleased to make you an offer of employment.',
//     associationStatement = 'The company hopes to have a long and mutually beneficial association with you and hope you find the atmosphere challenging and invigorating to realize your potential.',
//     acceptanceInstructions = 'Kindly confirm your acceptance by signing this offer letter. If not accepted within <strong>3 days</strong> of receipt, this offer is liable to lapse at the discretion of <strong>DAYA CONSULTANCY SERVICES (OPC) Pvt. Ltd.</strong>. Please hand over your acceptance letter at our office.',
//     revocationClause = 'Company holds the right to revoke this offer anytime in case of negative background checks received for your past employment.'
//   } = formData;

//   const fullRecipientName = recipientTitle ? `${recipientTitle} ${recipientName}` : recipientName;
//   const grossMonthly = parseFloat(salary) || (parseFloat(ctc) / 12) || 17000;
//   const grossAnnual = parseFloat(ctc) || (parseFloat(salary) * 12) || 204000;

//   const basicSalaryMonthly = (grossMonthly * 0.5).toFixed(2);
//   const hraMonthly = (parseFloat(basicSalaryMonthly) * 0.5).toFixed(2);
//   const conveyanceMonthly = (parseFloat(basicSalaryMonthly) * 0.2).toFixed(2);
//   const medicalMonthly = (parseFloat(basicSalaryMonthly) * 0.3).toFixed(2);
//   const specialMonthly = (grossMonthly - (parseFloat(basicSalaryMonthly) * (1 + 0.5 + 0.2 + 0.3))).toFixed(2);

//   const basicSalaryAnnual = (grossAnnual * 0.5).toFixed(2);
//   const hraAnnual = (parseFloat(basicSalaryAnnual) * 0.5).toFixed(2);
//   const conveyanceAnnual = (parseFloat(basicSalaryAnnual) * 0.2).toFixed(2);
//   const medicalAnnual = (parseFloat(basicSalaryAnnual) * 0.3).toFixed(2);
//   const specialAnnual = (grossAnnual - (parseFloat(basicSalaryAnnual) * (1 + 0.5 + 0.2 + 0.3))).toFixed(2);

//   const formattedStartDate = startDate ? formatDate(startDate) : 'Your Start Date';
//   const formattedDate = startDate ? formatDate(startDate) : 'Your Date';
//   const firstName = recipientName ? recipientName.split(' ')[0] : '';
//   const formattedGreeting = firstName ? `Dear ${firstName},` : greeting;

//   // Render templateContent if provided, otherwise render default template
//   if (templateContent) {
//     return <div dangerouslySetInnerHTML={{ __html: templateContent }} />;
//   }

//   // Component to render header with optional image
//   const HeaderSection = () => (
//     <div className="text-center mb-6">
//       {headerImage ? (
//         <img
//           src={headerImage}
//           alt="Company Logo"
//           className="mx-auto h-24 mb-4 max-w-full object-contain"
//           onError={(e) => {
//             console.error('Header image failed to load:', headerImage);
//             e.target.style.display = 'none';
//           }}
//         />
//       ) : (
//         <div className="mx-auto h-24 mb-4 flex items-center justify-center border-2 border-dashed border-gray-300 text-gray-500 text-sm">
//           Company Logo
//         </div>
//       )}
//     </div>
//   );

//   return (
//     <div className="bg-white w-full max-w-[900px] mx-auto font-sans">
//       {/* CSS for page breaks - Same as HikeLetterTemplate */}
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

//       {/* PAGE 1: Main Offer Letter */}
//       <div className="pdf-page bg-white min-h-[900px] w-full border border-gray-300 page-break-after">
//         <HeaderSection />

//         <div className="p-6">
//           <div className="space-y-4 text-sm leading-relaxed">
//             <dl className="mb-6">
//               <dt className="font-bold">Date:</dt>
//               <dd>{formattedDate}</dd>
//               <dt className="font-bold mt-2">{fullRecipientName}</dt>
//               <dd>{recipientAddress}</dd>
//             </dl>

//             <div className="mb-6">
//               <p><strong>Sub: Offer Letter (Terms & Conditions of Employment)</strong></p>
//             </div>

//             <div className="space-y-4">
//               <p>{formattedGreeting}</p>
//               <p><strong>{welcomeMessage}</strong></p>
//               <p dangerouslySetInnerHTML={{ __html: offerIntroduction }} />
//               <p className="break-words">
//                 The offer is based on your profile, relevant work experience and performance in the selection process. You have been
//                 selected for the position of <strong>"{jobTitle}"</strong> and expected to join on <strong>{formattedStartDate}</strong>. Your Cost to Company
//                 (CTC) including all benefits will be <strong>{formatCurrency(ctc)}</strong> per annum. Your place
//                 of reporting will be <strong>{reportingAddress}</strong>. Coming <strong>{probationPeriod}</strong> considering
//                 probation period.
//               </p>
//               <p>{associationStatement}</p>
//               <p dangerouslySetInnerHTML={{ __html: acceptanceInstructions }} />
//               <p>{revocationClause}</p>
//             </div>

//             <div className="mt-8 mb-12">
//               <p>Sincerely,</p>
//               <div className="flex justify-between mt-8">
//                 <div className="w-1/2 pr-4">
//                   <p className="font-semibold mb-4">Received and Accepted</p>
//                   <p className="mb-2">Employee Name: ________________________</p>
//                   <p className="mb-2">Date: ________________________</p>
//                 </div>
//                 <div className="w-1/2 text-right">
//                   <div className="mb-4">
//                     <div className="w-32 h-16 ml-auto border-b border-gray-400 flex items-end justify-center pb-2">
//                       <span className="text-xs italic">Signature</span>
//                     </div>
//                   </div>
//                   <p className="font-semibold">{signatoryName}</p>
//                   <p>{signatoryTitle}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* PAGE 2: Employment Agreement */}
//       <div className="pdf-page bg-white min-h-[900px] w-full border border-gray-300 page-break-after">
//         <HeaderSection />

//         <div className="p-8">
//           <div className="space-y-4 text-sm leading-relaxed">
//             <h2 className="text-2xl font-bold mb-4 text-center">EMPLOYMENT AGREEMENT</h2>
//             <p className="break-words">Employment Agreement between <strong>{companyName}</strong> and <strong>{fullRecipientName}</strong>.</p>

//             <ol className="list-decimal pl-5 space-y-2">
//               <li className="break-words">
//                 <strong>Terms of Employment:</strong> The employment is permanent subject to the provisions for termination set forth below. This agreement will become effective upon commencing service as directed at a company's customer site or at the company's office as required.
//               </li>
//               <li className="break-words">
//                 <strong>Working Hours:</strong> The employee needs to work at least 9.00 hours in a day.
//               </li>
//               <li className="break-words">
//                 <strong>Submission of Documents:</strong> At the time of your joining, photocopies of the following documents should be submitted. Please carry the original copies for verification.
//                 <ul className="list-disc pl-5 mt-2">
//                   <li>Two passport size photographs</li>
//                   <li>Standard X and XII Mark sheets equivalent</li>
//                   <li>Degree certificate and mark sheets for all semesters</li>
//                   <li>Postgraduate degree certificate and mark sheets for all semesters (if you are a Post-graduate)</li>
//                   <li>Experience certificate from your previous employer(s) (only, if you have)</li>
//                   <li>Release letter from your current employer (only, if you have)</li>
//                   <li>Photocopy of Passport and Permanent Account Number</li>
//                 </ul>
//               </li>
//               <li className="break-words">
//                 <strong>Terms and Conditions:</strong> The above terms and conditions of employment are specific to your employment in India and there can be changes to the said terms and conditions in case of deputation on international assignments during the course of your employment.
//               </li>
//               <li className="break-words">
//                 <strong>Background Check:</strong> The Company may, at its discretion, conduct background checks prior to or after your scheduled date of of joining. You expressly consent to the company conducting such background checks.
//               </li>
//               <li className="break-words">
//                 <strong>Notice Period:</strong> The Company, at its discretion, may request further validation of the details provided by you. If the outcome of the background check is found to be unsatisfactory, we reserve the right, in our sole discretion, to withdraw this offer without notice or compensation or to take any appropriate action against you, including, but not limited to termination of your employment.
//               </li>
//             </ol>
//           </div>
//         </div>
//       </div>

//       {/* PAGE 3: Leave Options and Attendance Process */}
//       <div className="pdf-page bg-white min-h-[900px] w-full border border-gray-300 page-break-after">
//         <HeaderSection />

//         <div className="p-10">
//           <div className="space-y-4 text-sm leading-relaxed">
//             <ol className="list-decimal pl-5 space-y-2" start="6">
//               <li className="break-words">
//                 <strong>Notice Period Policy:</strong> Should there be a need for you to terminate your services with the company you are expected to give the company written notice of 1 month. If the company desires to terminate the contract a similar notice period would be applicable. The Company is also entitled to either waive the notice period in part or in full at its sole discretion or require payment of the full salary including project allowances, in lieu of the notice period that has not been served. In case of non-performance or gross misconduct, this clause shall not be valid and will result in immediate termination.
//               </li>
//               <li className="break-words">
//                 <strong>Leave Options:</strong>
//                 <ul className="list-disc pl-5 mt-2">
//                   <li><strong>Casual Leave:</strong> Annual quota of Casual Leave 5 working days per year. No leave quota is allocated in the joining month if the employee joins after 20th of the month. Employee is restricted to avail maximum 1 day CL in a month.</li>
//                   <li><strong>Leave Approval Emails:</strong> Employees must take leave approvals from their respective reporting managers & the same should be forwarded to the back-office team. All leaves should be applied in the portal on the following day.</li>
//                 </ul>
//               </li>
//               <li className="break-words">
//                 <strong>Attendance Process:</strong>
//                 <ul className="list-disc pl-5 mt-2">
//                   <li><strong>Average Daily Work Hours:</strong> Employees must commit on average 9.30 hours daily in office as effective hours. Please ensure you are logging time in and out correctly in Biometric devices to avoid any error in calculation. ELs will be deducted at the month end automatically based on the defaulted hours (1 EL = 8H30M deficit). Biometric data will be used to calculate the monthly average hours.</li>
//                 </ul>
//               </li>
//               <li className="break-words">
//                 <strong>NOTICE PERIOD POLICY Guidelines for Notice Pay:</strong>
//                 <ul className="list-disc pl-5 mt-2">
//                   <li>Notice period is thirty (30) days while on probation and (30) days for confirmed employees. Notice pay is calculated on last drawn gross salary minus the retrials. Three scenarios are possible:</li>
//                   <li><strong>Where Company compensates for notice period:</strong> Where the employee is willing to serve the notice period, but the Company, for whatever reason, wishes to relieve the employee earlier, the shortfall in notice period would have to be compensated by the Company.</li>
//                   <li><strong>Where there is no compensation for notice period:</strong> Where both employee and Company have arrived at a mutually suitable relieving date, no compensation of notice period would be applicable from either part.</li>
//                 </ul>
//               </li>
//             </ol>
//           </div>
//         </div>
//       </div>

//       {/* PAGE 4: Gross Salary Sheet */}
//       <div className="pdf-page bg-white min-h-[900px] w-full border border-gray-300">
//         <HeaderSection />

//         <div className="p-8">
//           <div className="space-y-4 text-sm leading-relaxed">
//             <h2 className="text-2xl font-bold mb-4 text-center text-black">ANNEXURE 1 GROSS SALARY SHEET</h2>

//             <div className="mb-10">
//               <table className="w-full border-collapse">
//                 <thead>
//                   <tr className="bg-blue-600 text-white">
//                     <th className="border border-gray-400 p-2 text-left font-bold">Salary Break up</th>
//                     <th className="border border-gray-400 p-2 text-center font-bold">Monthly</th>
//                     <th className="border border-gray-400 p-2 text-center font-bold">Annual</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr className="bg-blue-600 text-white">
//                     <td className="border border-gray-400 p-2 font-bold">BENEFITS</td>
//                     <td className="border border-gray-400 p-2"></td>
//                     <td className="border border-gray-400 p-2"></td>
//                   </tr>
//                   <tr>
//                     <td className="border border-gray-400 p-2">Basic Salary</td>
//                     <td className="border border-gray-400 p-2 text-center">{basicSalaryMonthly}</td>
//                     <td className="border border-gray-400 p-2 text-center">{basicSalaryAnnual}</td>
//                   </tr>
//                   <tr>
//                     <td className="border border-gray-400 p-2">House Rent Allowance</td>
//                     <td className="border border-gray-400 p-2 text-center">{hraMonthly}</td>
//                     <td className="border border-gray-400 p-2 text-center">{hraAnnual}</td>
//                   </tr>
//                   <tr>
//                     <td className="border border-gray-400 p-2">Conveyance Allowance</td>
//                     <td className="border border-gray-400 p-2 text-center">{conveyanceMonthly}</td>
//                     <td className="border border-gray-400 p-2 text-center">{conveyanceAnnual}</td>
//                   </tr>
//                   <tr>
//                     <td className="border border-gray-400 p-2">Medical Allowance</td>
//                     <td className="border border-gray-400 p-2 text-center">{medicalMonthly}</td>
//                     <td className="border border-gray-400 p-2 text-center">{medicalAnnual}</td>
//                   </tr>
//                   <tr>
//                     <td className="border border-gray-400 p-2">Special Allowance</td>
//                     <td className="border border-gray-400 p-2 text-center">{specialMonthly}</td>
//                     <td className="border border-gray-400 p-2 text-center">{specialAnnual}</td>
//                   </tr>
//                   <tr className="bg-blue-600 text-white">
//                     <td className="border border-gray-400 p-2 font-bold">Total Gross Compensation</td>
//                     <td className="border border-gray-400 p-2 text-center font-bold">{grossMonthly}</td>
//                     <td className="border border-gray-400 p-2 text-center font-bold">{grossAnnual}</td>
//                   </tr>
//                   <tr>
//                     <td className="border border-gray-400 p-2"></td>
//                     <td className="border border-gray-400 p-2"></td>
//                     <td className="border border-gray-400 p-2"></td>
//                   </tr>
//                   <tr className="bg-blue-600 text-white">
//                     <td className="border border-gray-400 p-2 font-bold">Year End Bonus & Retirals</td>
//                     <td className="border border-gray-400 p-2"></td>
//                     <td className="border border-gray-400 p-2"></td>
//                   </tr>
//                   <tr>
//                     <td className="border border-gray-400 p-2">Company's Contribution to PF</td>
//                     <td className="border border-gray-400 p-2"></td>
//                     <td className="border border-gray-400 p-2"></td>
//                   </tr>
//                   <tr className="bg-blue-600 text-white">
//                     <td className="border border-gray-400 p-2 font-bold">Total Fixed Compensation</td>
//                     <td className="border border-gray-400 p-2"></td>
//                     <td className="border border-gray-400 p-2"></td>
//                   </tr>
//                   <tr className="bg-blue-600 text-white">
//                     <td className="border border-gray-400 p-2 font-bold">Variable Pay**</td>
//                     <td className="border border-gray-400 p-2"></td>
//                     <td className="border border-gray-400 p-2"></td>
//                   </tr>
//                   <tr>
//                     <td className="border border-gray-400 p-2">Performance Linked Incentive</td>
//                     <td className="border border-gray-400 p-2"></td>
//                     <td className="border border-gray-400 p-2"></td>
//                   </tr>
//                   <tr className="bg-blue-600 text-white">
//                     <td className="border border-gray-400 p-2 font-bold">TOTAL ANNUAL PACKAGE</td>
//                     <td className="border border-gray-400 p-2 text-center font-bold">{grossMonthly}</td>
//                     <td className="border border-gray-400 p-2 text-center font-bold">{grossAnnual}</td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>

//             <div className="mt-8 text-left">
//               <div className="mb-4">
//                 <div className="w-32 h-16 mr-auto border-b border-gray-400 flex items-end justify-center pb-2">
//                   <span className="text-xs italic text-black">Signature of the candidate:</span>
//                 </div>
//               </div>
//               <p className="text-black">Date: ________________________</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OfferLetterTemplate;





import React from 'react';
import { formatDate, formatCurrency } from '../../utils/formatters';

const OfferLetterTemplate = ({ formData, templateContent }) => {
  const {
    companyName = 'DAYA CONSULTANCY SERVICES (OPC) Pvt. Ltd.',
    companyAddress = 'B-19, Saheed Nagar, Bhubaneswar-751007, Odisha',
    recipientTitle = 'Mr.',
    recipientName = 'Agni Tanmaya Behera',
    jobTitle = 'Full Stack Developer',
    department = 'Development',
    startDate = '02/05/2022',
    salary = '17000',
    ctc = '204000',
    reportingAddress = 'B-19, Saheed Nagar, Bhubaneswar-751007, Odisha',
    probationPeriod = 'three month',
    signatoryName = 'Dayashankar Das (CEO)',
    signatoryTitle = 'CEO',
    headerImage = 'https://res.cloudinary.com/dcpoiyzqi/image/upload/v1749209085/uploads/1749209084379-1563b3f81f4be9fbc787eb359ff0f470.jpg',
    greeting = 'Dear Agni,',
    welcomeMessage = 'A very warm welcome to you!',
    offerIntroduction = 'Thank you for exploring career opportunities with <strong>DAYA CONSULTANCY SERVICES (OPC) Pvt. Ltd.</strong>. You have successfully completed our selection process and we are pleased to make you an offer of employment.',
    associationStatement = 'The company hopes to have a long and mutually beneficial association with you and hope you find the atmosphere challenging and invigorating to realize your potential.',
    acceptanceInstructions = 'Kindly confirm your acceptance by signing this offer letter. If not accepted within <strong>3 days</strong> of receipt, this offer is liable to lapse at the discretion of <strong>DAYA CONSULTANCY SERVICES (OPC) Pvt. Ltd.</strong>. Please hand over your acceptance letter at our office.',
    revocationClause = 'Company holds the right to revoke this offer anytime in case of negative background checks received for your past employment.'
  } = formData;

  const fullRecipientName = recipientTitle ? `${recipientTitle} ${recipientName}` : recipientName;
  const grossMonthly = parseFloat(salary) || (parseFloat(ctc) / 12) || 17000;
  const grossAnnual = parseFloat(ctc) || (parseFloat(salary) * 12) || 204000;

  const basicSalaryMonthly = (grossMonthly * 0.5).toFixed(2);
  const hraMonthly = (parseFloat(basicSalaryMonthly) * 0.5).toFixed(2);
  const conveyanceMonthly = (parseFloat(basicSalaryMonthly) * 0.2).toFixed(2);
  const medicalMonthly = (parseFloat(basicSalaryMonthly) * 0.3).toFixed(2);
  const specialMonthly = (grossMonthly - (parseFloat(basicSalaryMonthly) * (1 + 0.5 + 0.2 + 0.3))).toFixed(2);

  const basicSalaryAnnual = (grossAnnual * 0.5).toFixed(2);
  const hraAnnual = (parseFloat(basicSalaryAnnual) * 0.5).toFixed(2);
  const conveyanceAnnual = (parseFloat(basicSalaryAnnual) * 0.2).toFixed(2);
  const medicalAnnual = (parseFloat(basicSalaryAnnual) * 0.3).toFixed(2);
  const specialAnnual = (grossAnnual - (parseFloat(basicSalaryAnnual) * (1 + 0.5 + 0.2 + 0.3))).toFixed(2);

  const formattedStartDate = startDate ? formatDate(startDate) : 'Your Start Date';
  const formattedDate = startDate ? formatDate(startDate) : 'Your Date';
  const firstName = recipientName ? recipientName.split(' ')[0] : '';
  const formattedGreeting = firstName ? `Dear ${firstName},` : greeting;

  // Render templateContent if provided, otherwise render default template
  if (templateContent) {
    return <div dangerouslySetInnerHTML={{ __html: templateContent }} />;
  }

  // Component to render header with optional image
  const HeaderSection = () => (
    <div className="text-center mb-6">
      {headerImage ? (
        <img
          src={headerImage}
          alt="Company Logo"
          className="mx-auto h-24 mb-4 max-w-full object-contain"
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

  return (
    <div className="bg-white w-full max-w-[900px] mx-auto font-sans">
      {/* CSS for page breaks - Same as HikeLetterTemplate */}
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

      {/* PAGE 1: Main Offer Letter */}
      <div className="pdf-page bg-white min-h-[900px] w-full border border-gray-300 page-break-after">
        <HeaderSection />

        <div className="p-6">
          <div className="space-y-4 text-sm leading-relaxed">
            <dl className="mb-6">
              <dt className="font-bold">Date:</dt>
              <dd>{formattedDate}</dd>
              <dt className="font-bold mt-2">{fullRecipientName}</dt>
            </dl>

            <div className="mb-6">
              <p><strong>Sub: Offer Letter (Terms & Conditions of Employment)</strong></p>
            </div>

            <div className="space-y-4">
              <p>{formattedGreeting}</p>
              <p><strong>{welcomeMessage}</strong></p>
              <p dangerouslySetInnerHTML={{ __html: offerIntroduction }} />
              <p className="break-words">
                The offer is based on your profile, relevant work experience and performance in the selection process. You have been
                selected for the position of <strong>"{jobTitle}"</strong> and expected to join on <strong>{formattedStartDate}</strong>. Your Cost to Company
                (CTC) including all benefits will be <strong>{formatCurrency(ctc)}</strong> per annum. Your place
                of reporting will be <strong>{reportingAddress}</strong>. Coming <strong>{probationPeriod}</strong> considering
                probation period.
              </p>
              <p>{associationStatement}</p>
              <p dangerouslySetInnerHTML={{ __html: acceptanceInstructions }} />
              <p>{revocationClause}</p>
            </div>

            <div className="mt-8 mb-12">
              <p>Sincerely,</p>
              <div className="flex justify-between mt-8">
                <div className="w-1/2 pr-4">
                  <p className="font-semibold mb-4">Received and Accepted</p>
                  <p className="mb-2">Employee Name: ________________________</p>
                  <p className="mb-2">Date: ________________________</p>
                </div>
                <div className="w-1/2 text-right">
                  <div className="mb-4">
                    <div className="w-32 h-16 ml-auto border-b border-gray-400 flex items-end justify-center pb-2">
                      <span className="text-xs italic">Signature</span>
                    </div>
                  </div>
                  <p className="font-semibold">{signatoryName}</p>
                  <p>{signatoryTitle}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PAGE 2: Employment Agreement */}
      <div className="pdf-page bg-white min-h-[900px] w-full border border-gray-300 page-break-after">
        <HeaderSection />

        <div className="p-8">
          <div className="space-y-4 text-sm leading-relaxed">
            <h2 className="text-2xl font-bold mb-4 text-center">EMPLOYMENT AGREEMENT</h2>
            <p className="break-words">Employment Agreement between <strong>{companyName}</strong> and <strong>{fullRecipientName}</strong>.</p>

            <ol className="list-decimal pl-5 space-y-2">
              <li className="break-words">
                <strong>Terms of Employment:</strong> The employment is permanent subject to the provisions for termination set forth below. This agreement will become effective upon commencing service as directed at a company's customer site or at the company's office as required.
              </li>
              <li className="break-words">
                <strong>Working Hours:</strong> The employee needs to work at least 9.00 hours in a day.
              </li>
              <li className="break-words">
                <strong>Submission of Documents:</strong> At the time of your joining, photocopies of the following documents should be submitted. Please carry the original copies for verification.
                <ul className="list-disc pl-5 mt-2">
                  <li>Two passport size photographs</li>
                  <li>Standard X and XII Mark sheets equivalent</li>
                  <li>Degree certificate and mark sheets for all semesters</li>
                  <li>Postgraduate degree certificate and mark sheets for all semesters (if you are a Post-graduate)</li>
                  <li>Experience certificate from your previous employer(s) (only, if you have)</li>
                  <li>Release letter from your current employer (only, if you have)</li>
                  <li>Photocopy of Passport and Permanent Account Number</li>
                </ul>
              </li>
              <li className="break-words">
                <strong>Terms and Conditions:</strong> The above terms and conditions of employment are specific to your employment in India and there can be changes to the said terms and conditions in case of deputation on international assignments during the course of your employment.
              </li>
              <li className="break-words">
                <strong>Background Check:</strong> The Company may, at its discretion, conduct background checks prior to or after your scheduled date of of joining. You expressly consent to the company conducting such background checks.
              </li>
              <li className="break-words">
                <strong>Notice Period:</strong> The Company, at its discretion, may request further validation of the details provided by you. If the outcome of the background check is found to be unsatisfactory, we reserve the right, in our sole discretion, to withdraw this offer without notice or compensation or to take any appropriate action against you, including, but not limited to termination of your employment.
              </li>
            </ol>
          </div>
        </div>
      </div>

      {/* PAGE 3: Leave Options and Attendance Process */}
      <div className="pdf-page bg-white min-h-[900px] w-full border border-gray-300 page-break-after">
        <HeaderSection />

        <div className="p-10">
          <div className="space-y-4 text-sm leading-relaxed">
            <ol className="list-decimal pl-5 space-y-2" start="6">
              <li className="break-words">
                <strong>Notice Period Policy:</strong> Should there be a need for you to terminate your services with the company you are expected to give the company written notice of 1 month. If the company desires to terminate the contract a similar notice period would be applicable. The Company is also entitled to either waive the notice period in part or in full at its sole discretion or require payment of the full salary including project allowances, in lieu of the notice period that has not been served. In case of non-performance or gross misconduct, this clause shall not be valid and will result in immediate termination.
              </li>
              <li className="break-words">
                <strong>Leave Options:</strong>
                <ul className="list-disc pl-5 mt-2">
                  <li><strong>Casual Leave:</strong> Annual quota of Casual Leave 5 working days per year. No leave quota is allocated in the joining month if the employee joins after 20th of the month. Employee is restricted to avail maximum 1 day CL in a month.</li>
                  <li><strong>Leave Approval Emails:</strong> Employees must take leave approvals from their respective reporting managers & the same should be forwarded to the back-office team. All leaves should be applied in the portal on the following day.</li>
                </ul>
              </li>
              <li className="break-words">
                <strong>Attendance Process:</strong>
                <ul className="list-disc pl-5 mt-2">
                  <li><strong>Average Daily Work Hours:</strong> Employees must commit on average 9.30 hours daily in office as effective hours. Please ensure you are logging time in and out correctly in Biometric devices to avoid any error in calculation. ELs will be deducted at the month end automatically based on the defaulted hours (1 EL = 8H30M deficit). Biometric data will be used to calculate the monthly average hours.</li>
                </ul>
              </li>
              <li className="break-words">
                <strong>NOTICE PERIOD POLICY Guidelines for Notice Pay:</strong>
                <ul className="list-disc pl-5 mt-2">
                  <li>Notice period is thirty (30) days while on probation and (30) days for confirmed employees. Notice pay is calculated on last drawn gross salary minus the retrials. Three scenarios are possible:</li>
                  <li><strong>Where Company compensates for notice period:</strong> Where the employee is willing to serve the notice period, but the Company, for whatever reason, wishes to relieve the employee earlier, the shortfall in notice period would have to be compensated by the Company.</li>
                  <li><strong>Where there is no compensation for notice period:</strong> Where both employee and Company have arrived at a mutually suitable relieving date, no compensation of notice period would be applicable from either part.</li>
                </ul>
              </li>
            </ol>
          </div>
        </div>
      </div>

      {/* PAGE 4: Gross Salary Sheet */}
      <div className="pdf-page bg-white min-h-[900px] w-full border border-gray-300">
        <HeaderSection />

        <div className="p-8">
          <div className="space-y-4 text-sm leading-relaxed">
            <h2 className="text-2xl font-bold mb-4 text-center text-black">ANNEXURE 1 GROSS SALARY SHEET</h2>

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

            <div className="mt-8 text-left">
              <div className="mb-4">
                <div className="w-32 h-16 mr-auto border-b border-gray-400 flex items-end justify-center pb-2">
                  <span className="text-xs italic text-black">Signature of the candidate:</span>
                </div>
              </div>
              <p className="text-black">Date: ________________________</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferLetterTemplate;
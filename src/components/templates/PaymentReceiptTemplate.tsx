// import React, { useState } from 'react';

// type PaymentReceiptFormData = {
//   companyName?: string;
//   paymentDate?: string;
//   receiptNo?: string;
//   studentName?: string;
//   registrationNo?: string;
//   courseName?: string;
//   contact?: string;
//   address?: string;
//   duration?: string;
//   courseFees?: string;
//   totalAmountPaid?: string;
//   paymentMethod?: string;
//   upiId?: string;
//   authorizedBy?: string;
//   headerImage?: string;
//   companyAddress?: string;
//   companyPhone?: string;
// };

// interface PaymentReceiptTemplateProps {
//   formData?: PaymentReceiptFormData;
//   templateContent?: string;
// }

// const defaultFormData: Required<PaymentReceiptFormData> = {
//   companyName: 'DAYA Consultancy Services',
//   paymentDate: new Date().toLocaleDateString('en-GB'),
//   receiptNo: 'DCR001',
//   studentName: 'Subhashree Sahoo',
//   registrationNo: '1000PY01',
//   courseName: 'Python',
//   contact: '+91 9804536282',
//   address: 'B-19, 1st Floor, Bhubaneswar, Odisha',
//   duration: '2 Months',
//   courseFees: '15000',
//   totalAmountPaid: '15000',
//   paymentMethod: 'UPI',
//   upiId: 'daya@paytm',
//   authorizedBy: 'HR Manager',
//   headerImage: 'https://res.cloudinary.com/dcpoiyzqi/image/upload/v1754118886/uploads/1754118885498-d0b85435557cdef3ce037474140e5cf0.jpg',
//   companyAddress: 'B-19, 1st Floor, Bhubaneswar, Odisha',
//   companyPhone: '+91 9556261355'
// };

// const PaymentReceiptTemplate: React.FC<PaymentReceiptTemplateProps> = ({ formData = {} as PaymentReceiptFormData, templateContent }) => {
//   const {
//     companyName = defaultFormData.companyName,
//     paymentDate = defaultFormData.paymentDate,
//     receiptNo = defaultFormData.receiptNo,
//     studentName = defaultFormData.studentName,
//     registrationNo = defaultFormData.registrationNo,
//     courseName = defaultFormData.courseName,
//     contact = defaultFormData.contact,
//     address = defaultFormData.address,
//     duration = defaultFormData.duration,
//     courseFees = defaultFormData.courseFees,
//     totalAmountPaid = defaultFormData.totalAmountPaid,
//     paymentMethod = defaultFormData.paymentMethod,
//     upiId = defaultFormData.upiId,
//     authorizedBy = defaultFormData.authorizedBy,
//     headerImage = defaultFormData.headerImage,
//     companyAddress = defaultFormData.companyAddress,
//     companyPhone = defaultFormData.companyPhone
//   } = formData;

//   const [headerImageLoaded, setHeaderImageLoaded] = useState(false);
//   const [headerImageError, setHeaderImageError] = useState(false);

//   const parsedCourseFees = parseFloat(courseFees || '0');
//   const parsedTotalAmountPaid = parseFloat(totalAmountPaid || '0');
  
//   // Calculate total amount paid based on course fees
//   const calculatedTotalAmountPaid = parsedCourseFees;

//   const numberToWords = (num: number): string => {
//     const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
//     const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
//     const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    
//     if (num === 0) return 'Zero';
    
//     let result = '';
    
//     // Handle lakhs
//     if (num >= 100000) {
//       const lakhs = Math.floor(num / 100000);
//       if (lakhs >= 20) {
//         result += tens[Math.floor(lakhs / 10)] + ' ' + ones[lakhs % 10] + ' Lakh ';
//       } else if (lakhs >= 10) {
//         result += teens[lakhs - 10] + ' Lakh ';
//       } else {
//         result += ones[lakhs] + ' Lakh ';
//       }
//       num %= 100000;
//     }
    
//     // Handle thousands
//     if (num >= 1000) {
//       const thousands = Math.floor(num / 1000);
//       if (thousands >= 20) {
//         result += tens[Math.floor(thousands / 10)] + ' ' + ones[thousands % 10] + ' Thousand ';
//       } else if (thousands >= 10) {
//         result += teens[thousands - 10] + ' Thousand ';
//       } else {
//         result += ones[thousands] + ' Thousand ';
//       }
//       num %= 1000;
//     }
    
//     // Handle hundreds
//     if (num >= 100) {
//       result += ones[Math.floor(num / 100)] + ' Hundred ';
//       num %= 100;
//     }
    
//     // Handle tens and ones
//     if (num >= 20) {
//       result += tens[Math.floor(num / 10)] + ' ' + ones[num % 10] + ' ';
//     } else if (num >= 10) {
//       result += teens[num - 10] + ' ';
//     } else if (num > 0) {
//       result += ones[num] + ' ';
//     }
    
//     return result.trim() + ' Only';
//   };

//   const HeaderSection = () => (
//     <div className="flex justify-between items-start mb-6">
//       <div className="flex-1">
//         <h1 className="text-4xl font-bold text-blue-600 mb-1">PAYMENT RECEIPT</h1>
//       </div>
//       <div className="ml-8 flex-shrink-0">
//         {headerImage ? (
//           <img
//             src={headerImage}
//             alt="Company Logo"
//             className="h-24 w-40 object-contain"
//             onError={(e) => {
//               console.error('Header image failed to load:', headerImage);
//               e.currentTarget.style.display = 'none';
//             }}
//             onLoad={() => {
//               setHeaderImageLoaded(true);
//               setHeaderImageError(false);
//             }}
//           />
//         ) : (
//           <div className="h-24 w-40 flex items-center justify-center border-2 border-dashed border-gray-300 text-gray-500 text-xs">
//             DAYA Logo
//           </div>
//         )}
//       </div>
//     </div>
//   );

//   if (templateContent) {
//     return (
//       <div className="bg-white min-h-[700px] w-full max-w-[800px] mx-auto font-sans relative border border-gray-300">
//         <div dangerouslySetInnerHTML={{ __html: templateContent }} />
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white min-h-[700px] w-full max-w-[800px] mx-auto font-sans relative border border-gray-300 p-8">
//       <HeaderSection />

//       <div className="mb-6">
//         <div className="w-full h-1 bg-blue-600 mb-4"></div>
        
//         <div className="grid grid-cols-2 gap-8 mb-6">
//           <div>
//             <div className="text-blue-600 font-bold text-lg mb-2">Payment Date: {paymentDate}</div>
//           </div>
//           <div className="text-right">
//             <div className="text-blue-600 font-bold text-lg mb-2">Receipt No: {receiptNo}</div>
//           </div>
//         </div>

//         <div className="w-full h-1 bg-blue-600 mb-6"></div>

//         <div className="grid grid-cols-2 gap-8 mb-6">
//           <div className="space-y-2">
//             <div className="flex">
//               <span className="text-blue-600 font-bold min-w-[120px]">Student's Name:</span>
//               <span className="text-blue-600 font-bold">{studentName}</span>
//             </div>
//             <div className="flex">
//               <span className="text-blue-600 font-bold min-w-[120px]">Course's Name:</span>
//               <span className="text-blue-600 font-bold">{courseName}</span>
//             </div>
//             <div className="flex">
//               <span className="text-blue-600 font-bold min-w-[120px]">Address:</span>
//               <span className="text-blue-600 font-bold">{address}</span>
//             </div>
//           </div>
//           <div className="space-y-2">
//             <div className="flex">
//               <span className="text-blue-600 font-bold min-w-[140px]">Registration No:</span>
//               <span className="text-blue-600 font-bold">{registrationNo}</span>
//             </div>
//             <div className="flex">
//               <span className="text-blue-600 font-bold min-w-[140px]">Contact:</span>
//               <span className="text-blue-600 font-bold">{contact}</span>
//             </div>
//             <div className="flex">
//               <span className="text-blue-600 font-bold min-w-[140px]">Duration:</span>
//               <span className="text-blue-600 font-bold">{duration}</span>
//             </div>
//           </div>
//         </div>

//         <div className="w-full h-1 bg-blue-600 mb-6"></div>

//         <table className="w-full border-collapse border-2 border-blue-600 mb-6">
//           <thead>
//             <tr className="bg-gray-50">
//               <th className="border-2 border-blue-600 p-3 text-center font-bold text-blue-600">S.L.NO.</th>
//               <th className="border-2 border-blue-600 p-3 text-center font-bold text-blue-600">DESCRIPTIONS</th>
//               <th className="border-2 border-blue-600 p-3 text-center font-bold text-blue-600">RECEIPT PAYMENT</th>
//               <th className="border-2 border-blue-600 p-3 text-center font-bold text-blue-600">DUE AMOUNT</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td className="border-2 border-blue-600 p-3 text-center">1</td>
//               <td className="border-2 border-blue-600 p-3">{courseName} Course Fee</td>
//               <td className="border-2 border-blue-600 p-3 text-center">₹{calculatedTotalAmountPaid}</td>
//               <td className="border-2 border-blue-600 p-3 text-center">₹0</td>
//             </tr>
//             <tr>
//               <td className="border-2 border-blue-600 p-3 text-center"></td>
//               <td className="border-2 border-blue-600 p-3"></td>
//               <td className="border-2 border-blue-600 p-3 text-center"></td>
//               <td className="border-2 border-blue-600 p-3 text-center"></td>
//             </tr>
//             <tr>
//               <td className="border-2 border-blue-600 p-3 text-center"></td>
//               <td className="border-2 border-blue-600 p-3"></td>
//               <td className="border-2 border-blue-600 p-3 text-center"></td>
//               <td className="border-2 border-blue-600 p-3 text-center"></td>
//             </tr>
//             <tr>
//               <td className="border-2 border-blue-600 p-3 text-center"></td>
//               <td className="border-2 border-blue-600 p-3"></td>
//               <td className="border-2 border-blue-600 p-3 text-center"></td>
//               <td className="border-2 border-blue-600 p-3 text-center"></td>
//             </tr>
//             <tr>
//               <td className="border-2 border-blue-600 p-3 text-center"></td>
//               <td className="border-2 border-blue-600 p-3"></td>
//               <td className="border-2 border-blue-600 p-3 text-center"></td>
//               <td className="border-2 border-blue-600 p-3 text-center"></td>
//             </tr>
//             <tr className="bg-gray-50">
//               <td className="border-2 border-blue-600 p-3 text-center"></td>
//               <td className="border-2 border-blue-600 p-3 font-bold text-blue-600">COURSE FEES:</td>
//               <td className="border-2 border-blue-600 p-3 text-center font-bold text-blue-600">₹{parsedCourseFees}</td>
//               <td className="border-2 border-blue-600 p-3 text-center font-bold text-blue-600">TOTAL AMOUNT PAID: ₹{calculatedTotalAmountPaid}</td>
//             </tr>
//           </tbody>
//         </table>

//         <div className="grid grid-cols-2 gap-8 mb-8">
//           <div>
//             <div className="mb-4">
//               <span className="text-blue-600 font-bold text-lg">Payment Method:</span>
//             </div>
//             <div>
//               <span className="font-bold">UPI ID NO - </span>
//               <span>{upiId}</span>
//             </div>
//           </div>
//           <div className="text-right">
//             <div className="mb-4">
//               <span className="text-blue-600 font-bold text-lg">Authorized By:</span>
//             </div>
//             <div className="border-b border-black w-64 ml-auto mb-2"></div>
//             <div className="text-sm italic">
//               Thank you for choosing Daya consultancy pvt.lmt.
//             </div>
//           </div>
//         </div>

//         <div className="text-center border-t-2 border-blue-600 pt-4">
//           <div className="text-blue-600 font-bold text-lg mb-2">
//             {companyAddress}
//           </div>
//           <div className="text-blue-600 font-bold text-lg">
//             {companyPhone}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PaymentReceiptTemplate;



import React, { useState } from 'react';

type PaymentReceiptFormData = {
  companyName?: string;
  paymentDate?: string;
  receiptNo?: string;
  studentName?: string;
  registrationNo?: string;
  courseName?: string;
  contact?: string;
  address?: string;
  duration?: string;
  courseFees?: string;
  totalAmountPaid?: string;
  paymentMethod?: string;
  upiId?: string;
  authorizedBy?: string;
  headerImage?: string;
  companyAddress?: string;
  companyPhone?: string;
};

interface PaymentReceiptTemplateProps {
  formData?: PaymentReceiptFormData;
  templateContent?: string;
}

// Function to add ordinal suffix to day
const getOrdinalSuffix = (day: number): string => {
  if (day >= 11 && day <= 13) {
    return 'th';
  }
  switch (day % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
};

// Function to format date to "Month Day[st/nd/rd/th], Year"
const formatDateToOrdinal = (dateString: string): string => {
  if (!dateString) return '';
  
  let date;
  
  // Handle different date formats
  if (dateString.includes('/')) {
    // Handle DD/MM/YYYY format (en-GB)
    const parts = dateString.split('/');
    if (parts.length === 3) {
      // Convert DD/MM/YYYY to MM/DD/YYYY for proper parsing
      date = new Date(`${parts[1]}/${parts[0]}/${parts[2]}`);
    }
  } else {
    date = new Date(dateString);
  }
  
  // If date parsing failed, try today's date
  if (!date || isNaN(date.getTime())) {
    date = new Date();
  }
  
  const month = date.toLocaleDateString('en-US', { month: 'long' });
  const day = date.getDate();
  const year = date.getFullYear();
  const ordinalSuffix = getOrdinalSuffix(day);
  
  return `${month} ${day}${ordinalSuffix}, ${year}`;
};

const defaultFormData: Required<PaymentReceiptFormData> = {
  companyName: 'DAYA Consultancy Services',
  paymentDate: new Date().toLocaleDateString('en-GB'),
  receiptNo: 'DCR001',
  studentName: 'Subhashree Sahoo',
  registrationNo: '1000PY01',
  courseName: 'Python',
  contact: '+91 9804536282',
  address: 'B-19, 1st Floor, Bhubaneswar, Odisha',
  duration: '2 Months',
  courseFees: '15000',
  totalAmountPaid: '15000',
  paymentMethod: 'UPI',
  upiId: 'daya@paytm',
  authorizedBy: 'HR Manager',
  headerImage: 'https://res.cloudinary.com/dcpoiyzqi/image/upload/v1754118886/uploads/1754118885498-d0b85435557cdef3ce037474140e5cf0.jpg',
  companyAddress: 'B-19, 1st Floor, Bhubaneswar, Odisha',
  companyPhone: '+91 9556261355'
};

const PaymentReceiptTemplate: React.FC<PaymentReceiptTemplateProps> = ({ formData = {} as PaymentReceiptFormData, templateContent }) => {
  const {
    companyName = defaultFormData.companyName,
    paymentDate = defaultFormData.paymentDate,
    receiptNo = defaultFormData.receiptNo,
    studentName = defaultFormData.studentName,
    registrationNo = defaultFormData.registrationNo,
    courseName = defaultFormData.courseName,
    contact = defaultFormData.contact,
    address = defaultFormData.address,
    duration = defaultFormData.duration,
    courseFees = defaultFormData.courseFees,
    totalAmountPaid = defaultFormData.totalAmountPaid,
    paymentMethod = defaultFormData.paymentMethod,
    upiId = defaultFormData.upiId,
    authorizedBy = defaultFormData.authorizedBy,
    headerImage = defaultFormData.headerImage,
    companyAddress = defaultFormData.companyAddress,
    companyPhone = defaultFormData.companyPhone
  } = formData;

  // Format the payment date
  const formattedPaymentDate = formatDateToOrdinal(paymentDate);

  const [headerImageLoaded, setHeaderImageLoaded] = useState(false);
  const [headerImageError, setHeaderImageError] = useState(false);

  const parsedCourseFees = parseFloat(courseFees || '0');
  const parsedTotalAmountPaid = parseFloat(totalAmountPaid || '0');
  
  // Calculate total amount paid based on course fees
  const calculatedTotalAmountPaid = parsedCourseFees;

  const numberToWords = (num: number): string => {
    const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    
    if (num === 0) return 'Zero';
    
    let result = '';
    
    // Handle lakhs
    if (num >= 100000) {
      const lakhs = Math.floor(num / 100000);
      if (lakhs >= 20) {
        result += tens[Math.floor(lakhs / 10)] + ' ' + ones[lakhs % 10] + ' Lakh ';
      } else if (lakhs >= 10) {
        result += teens[lakhs - 10] + ' Lakh ';
      } else {
        result += ones[lakhs] + ' Lakh ';
      }
      num %= 100000;
    }
    
    // Handle thousands
    if (num >= 1000) {
      const thousands = Math.floor(num / 1000);
      if (thousands >= 20) {
        result += tens[Math.floor(thousands / 10)] + ' ' + ones[thousands % 10] + ' Thousand ';
      } else if (thousands >= 10) {
        result += teens[thousands - 10] + ' Thousand ';
      } else {
        result += ones[thousands] + ' Thousand ';
      }
      num %= 1000;
    }
    
    // Handle hundreds
    if (num >= 100) {
      result += ones[Math.floor(num / 100)] + ' Hundred ';
      num %= 100;
    }
    
    // Handle tens and ones
    if (num >= 20) {
      result += tens[Math.floor(num / 10)] + ' ' + ones[num % 10] + ' ';
    } else if (num >= 10) {
      result += teens[num - 10] + ' ';
    } else if (num > 0) {
      result += ones[num] + ' ';
    }
    
    return result.trim() + ' Only';
  };

  const HeaderSection = () => (
    <div className="flex justify-between items-start mb-6">
      <div className="flex-1">
        <h1 className="text-4xl font-bold text-blue-600 mb-1">PAYMENT RECEIPT</h1>
      </div>
      <div className="ml-8 flex-shrink-0">
        {headerImage ? (
          <img
            src={headerImage}
            alt="Company Logo"
            className="h-24 w-40 object-contain"
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
          <div className="h-24 w-40 flex items-center justify-center border-2 border-dashed border-gray-300 text-gray-500 text-xs">
            DAYA Logo
          </div>
        )}
      </div>
    </div>
  );

  if (templateContent) {
    return (
      <div className="bg-white min-h-[700px] w-full max-w-[800px] mx-auto font-sans relative border border-gray-300">
        <div dangerouslySetInnerHTML={{ __html: templateContent }} />
      </div>
    );
  }

  return (
    <div className="bg-white min-h-[700px] w-full max-w-[800px] mx-auto font-sans relative border border-gray-300 p-8">
      <HeaderSection />

      <div className="mb-6">
        <div className="w-full h-1 bg-blue-600 mb-4"></div>
        
        <div className="grid grid-cols-2 gap-8 mb-6">
          <div>
            <div className="text-blue-600 font-bold text-lg mb-2">Payment Date: {formattedPaymentDate}</div>
          </div>
          <div className="text-right">
            <div className="text-blue-600 font-bold text-lg mb-2">Receipt No: {receiptNo}</div>
          </div>
        </div>

        <div className="w-full h-1 bg-blue-600 mb-6"></div>

        <div className="grid grid-cols-2 gap-8 mb-6">
          <div className="space-y-2">
            <div className="flex">
              <span className="text-blue-600 font-bold min-w-[120px]">Student's Name:</span>
              <span className="text-blue-600 font-bold">{studentName}</span>
            </div>
            <div className="flex">
              <span className="text-blue-600 font-bold min-w-[120px]">Course's Name:</span>
              <span className="text-blue-600 font-bold">{courseName}</span>
            </div>
            <div className="flex">
              <span className="text-blue-600 font-bold min-w-[120px]">Address:</span>
              <span className="text-blue-600 font-bold">{address}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex">
              <span className="text-blue-600 font-bold min-w-[140px]">Registration No:</span>
              <span className="text-blue-600 font-bold">{registrationNo}</span>
            </div>
            <div className="flex">
              <span className="text-blue-600 font-bold min-w-[140px]">Contact:</span>
              <span className="text-blue-600 font-bold">{contact}</span>
            </div>
            <div className="flex">
              <span className="text-blue-600 font-bold min-w-[140px]">Duration:</span>
              <span className="text-blue-600 font-bold">{duration}</span>
            </div>
          </div>
        </div>

        <div className="w-full h-1 bg-blue-600 mb-6"></div>

        <table className="w-full border-collapse border-2 border-blue-600 mb-6">
          <thead>
            <tr className="bg-gray-50">
              <th className="border-2 border-blue-600 p-3 text-center font-bold text-blue-600">S.L.NO.</th>
              <th className="border-2 border-blue-600 p-3 text-center font-bold text-blue-600">DESCRIPTIONS</th>
              <th className="border-2 border-blue-600 p-3 text-center font-bold text-blue-600">RECEIPT PAYMENT</th>
              <th className="border-2 border-blue-600 p-3 text-center font-bold text-blue-600">DUE AMOUNT</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-2 border-blue-600 p-3 text-center">1</td>
              <td className="border-2 border-blue-600 p-3">{courseName} Course Fee</td>
              <td className="border-2 border-blue-600 p-3 text-center">₹{calculatedTotalAmountPaid}</td>
              <td className="border-2 border-blue-600 p-3 text-center">₹0</td>
            </tr>
            <tr>
              <td className="border-2 border-blue-600 p-3 text-center"></td>
              <td className="border-2 border-blue-600 p-3"></td>
              <td className="border-2 border-blue-600 p-3 text-center"></td>
              <td className="border-2 border-blue-600 p-3 text-center"></td>
            </tr>
            <tr>
              <td className="border-2 border-blue-600 p-3 text-center"></td>
              <td className="border-2 border-blue-600 p-3"></td>
              <td className="border-2 border-blue-600 p-3 text-center"></td>
              <td className="border-2 border-blue-600 p-3 text-center"></td>
            </tr>
            <tr>
              <td className="border-2 border-blue-600 p-3 text-center"></td>
              <td className="border-2 border-blue-600 p-3"></td>
              <td className="border-2 border-blue-600 p-3 text-center"></td>
              <td className="border-2 border-blue-600 p-3 text-center"></td>
            </tr>
            <tr>
              <td className="border-2 border-blue-600 p-3 text-center"></td>
              <td className="border-2 border-blue-600 p-3"></td>
              <td className="border-2 border-blue-600 p-3 text-center"></td>
              <td className="border-2 border-blue-600 p-3 text-center"></td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border-2 border-blue-600 p-3 text-center"></td>
              <td className="border-2 border-blue-600 p-3 font-bold text-blue-600">COURSE FEES:</td>
              <td className="border-2 border-blue-600 p-3 text-center font-bold text-blue-600">₹{parsedCourseFees}</td>
              <td className="border-2 border-blue-600 p-3 text-center font-bold text-blue-600">TOTAL AMOUNT PAID: ₹{calculatedTotalAmountPaid}</td>
            </tr>
          </tbody>
        </table>

        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <div className="mb-4">
              <span className="text-blue-600 font-bold text-lg">Payment Method:</span>
            </div>
            <div>
              <span className="font-bold">UPI ID NO - </span>
              <span>{upiId}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="mb-4">
              <span className="text-blue-600 font-bold text-lg">Authorized By:</span>
            </div>
            <div className="border-b border-black w-64 ml-auto mb-2"></div>
            <div className="text-sm italic">
              Thank you for choosing Daya consultancy pvt.lmt.
            </div>
          </div>
        </div>

        <div className="text-center border-t-2 border-blue-600 pt-4">
          <div className="text-blue-600 font-bold text-lg mb-2">
            {companyAddress}
          </div>
          <div className="text-blue-600 font-bold text-lg">
            {companyPhone}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentReceiptTemplate;
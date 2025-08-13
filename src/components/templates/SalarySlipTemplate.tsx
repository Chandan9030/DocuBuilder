import React, { useState } from 'react';

type SalarySlipFormData = {
  companyName?: string;
  employeeName?: string;
  employeeId?: string;
  designation?: string;
  doj?: string;
  location?: string;
  paymentMode?: string;
  monthYear?: string;
  calendarDays?: string;
  paidDays?: string;
  lop?: string;
  accountNo?: string;
  ifscCode?: string;
  totalEarnings?: string;
  bonus?: string;
  employeePf?: string;
  employeeEsi?: string;
  professionalTax?: string;
  deductionAllowance?: string;
  netSalaryInWords?: string;
  headerImage?: string;
  startDate?: string;
};

interface SalarySlipTemplateProps {
  formData?: SalarySlipFormData;
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
  
  // Handle different date formats
  let date;
  if (dateString.includes(',')) {
    // Handle formats like "2nd May, 2022"
    const cleanedDate = dateString.replace(/st|nd|rd|th/g, '');
    date = new Date(cleanedDate);
  } else {
    date = new Date(dateString);
  }
  
  if (isNaN(date.getTime())) {
    return dateString; // Return original if parsing fails
  }
  
  const month = date.toLocaleDateString('en-US', { month: 'long' });
  const day = date.getDate();
  const year = date.getFullYear();
  const ordinalSuffix = getOrdinalSuffix(day);
  
  return `${month} ${day}${ordinalSuffix}, ${year}`;
};

const defaultFormData: Required<SalarySlipFormData> = {
  companyName: 'DAYA Consultancy Services',
  employeeName: 'Agni Tanmaya Behera',
  employeeId: 'DCS069',
  designation: 'Full Stack Developer',
  doj: '2nd May, 2022',
  location: 'Bhubaneswar',
  paymentMode: 'NEFT',
  monthYear: 'Dec-2023',
  calendarDays: '30',
  paidDays: '30',
  lop: '0',
  accountNo: '38550447799',
  ifscCode: 'SBIN0002135',
  totalEarnings: '27000',
  bonus: '0',
  employeePf: '0',
  employeeEsi: '0',
  professionalTax: '0',
  deductionAllowance: '0',
  netSalaryInWords: 'Twenty-Seven Thousand Only/-',
  headerImage: 'https://res.cloudinary.com/dcpoiyzqi/image/upload/v1749209085/uploads/1749209084379-1563b3f81f4be9fbc787eb359ff0f470.jpg',
  startDate: '2nd May, 2022'
};

const SalarySlipTemplate: React.FC<SalarySlipTemplateProps> = ({ formData = {} as SalarySlipFormData, templateContent }) => {
  const {
    companyName = defaultFormData.companyName,
    employeeName = defaultFormData.employeeName,
    employeeId = defaultFormData.employeeId,
    designation = defaultFormData.designation,
    location = defaultFormData.location,
    paymentMode = defaultFormData.paymentMode,
    monthYear = defaultFormData.monthYear,
    calendarDays = defaultFormData.calendarDays,
    paidDays = defaultFormData.paidDays,
    lop = defaultFormData.lop,
    accountNo = defaultFormData.accountNo,
    ifscCode = defaultFormData.ifscCode,
    totalEarnings = defaultFormData.totalEarnings,
    bonus = defaultFormData.bonus,
    employeePf = defaultFormData.employeePf,
    employeeEsi = defaultFormData.employeeEsi,
    professionalTax = defaultFormData.professionalTax,
    deductionAllowance = defaultFormData.deductionAllowance,
    headerImage = defaultFormData.headerImage
  } = formData;

  // Format dates using ordinal format
  const formattedDoj = formatDateToOrdinal(formData.startDate || formData.doj || defaultFormData.doj);

  const [headerImageLoaded, setHeaderImageLoaded] = useState(false);
  const [headerImageError, setHeaderImageError] = useState(false);

  const parsedTotalEarnings = parseFloat(totalEarnings || '0');
  const parsedBonus = parseFloat(bonus || '0');
  const parsedEmployeePf = parseFloat(employeePf || '0');
  const parsedEmployeeEsi = parseFloat(employeeEsi || '0');
  const parsedProfessionalTax = parseFloat(professionalTax || '0');
  const parsedDeductionAllowance = parseFloat(deductionAllowance || '0');

  const basic = Math.round(parsedTotalEarnings * 0.5);
  const hra = Math.round(basic * 0.5);
  const allowances = Math.round(basic * 0.5);
  const calculatedTotalEarnings = basic + hra + allowances + parsedBonus;

  const totalDeductions = parsedEmployeePf + parsedEmployeeEsi + parsedProfessionalTax + parsedDeductionAllowance;
  const netSalary = calculatedTotalEarnings - totalDeductions;

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
    
    return result.trim() + ' Only/-';
  };

  const netSalaryInWords = numberToWords(netSalary);

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
        <div className="mx-auto h-22 mb-4 flex items-center justify-center border-2 border-dashed border-gray-300 text-gray-500 text-sm">
          Company Logo
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

      <div className="p-4">
        <div className="text-center mb-6">
          <p className="text-sm text-gray-600">Website: www.dayacs.com</p>
          <p className="text-sm"><strong>Address:</strong> -B-19, Saheed Nagar, Bhubaneswar-751007</p>
          <p className="text-sm"><strong>Phone:</strong> 081448 02704 , E-Mail:-hr@dayacs.com</p>
          <h2 className="text-xl font-bold mt-4 underline">Pay Slip – {monthYear}</h2>
        </div>

        <div className="border-t-4 border-black pt-6">
          <div className="grid grid-cols-2 gap-8 mb-6">
            <div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div><strong>Employee Name</strong></div>
                <div>: {employeeName}</div>
                <div><strong>Employee ID</strong></div>
                <div>: {employeeId}</div>
                <div><strong>Designation</strong></div>
                <div>: {designation}</div>
                <div><strong>DOJ</strong></div>
                <div>: {formattedDoj}</div>
                <div><strong>Location</strong></div>
                <div>: {location}</div>
                <div><strong>Payment Mode</strong></div>
                <div>: {paymentMode}</div>
              </div>
            </div>
            <div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div><strong>Month & Year</strong></div>
                <div>: {monthYear}</div>
                <div><strong>Calendar Days</strong></div>
                <div>: {calendarDays}</div>
                <div><strong>Paid Days</strong></div>
                <div>: {paidDays}</div>
                <div><strong>LOP</strong></div>
                <div>: {lop}</div>
                <div><strong>Account No.</strong></div>
                <div>: {accountNo}</div>
                <div><strong>IFSC Code</strong></div>
                <div>: {ifscCode}</div>
              </div>
            </div>
          </div>

          <table className="w-full border-collapse border border-black text-sm">
            <thead>
              <tr>
                <th className="border border-black p-2 bg-gray-100">Earnings</th>
                <th className="border border-black p-2 bg-gray-100"></th>
                <th className="border border-black p-2 bg-gray-100">Deductions</th>
                <th className="border border-black p-2 bg-gray-100"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-black p-2">Basic</td>
                <td className="border border-black p-2 text-right">{basic}</td>
                <td className="border border-black p-2">Employee PF</td>
                <td className="border border-black p-2 text-right">{parsedEmployeePf}</td>
              </tr>
              <tr>
                <td className="border border-black p-2">HRA</td>
                <td className="border border-black p-2 text-right">{hra}</td>
                <td className="border border-black p-2">Employee ESI</td>
                <td className="border border-black p-2 text-right">{parsedEmployeeEsi}</td>
              </tr>
              <tr>
                <td className="border border-black p-2">Allowances</td>
                <td className="border border-black p-2 text-right">{allowances}</td>
                <td className="border border-black p-2">Professional Tax</td>
                <td className="border border-black p-2 text-right">{parsedProfessionalTax}</td>
              </tr>
              <tr>
                <td className="border border-black p-2">Bonus</td>
                <td className="border border-black p-2 text-right">{parsedBonus}</td>
                <td className="border border-black p-2">Allowance</td>
                <td className="border border-black p-2 text-right">{parsedDeductionAllowance}</td>
              </tr>
              <tr>
                <td className="border border-black p-2 font-bold">Total Earnings</td>
                <td className="border border-black p-2 text-right font-bold">{calculatedTotalEarnings}</td>
                <td className="border border-black p-2 font-bold">Total Deduction</td>
                <td className="border border-black p-2 text-right font-bold">{totalDeductions}</td>
              </tr>
              <tr>
                <td className="border border-black p-2 font-bold">Net Salary</td>
                <td className="border border-black p-2 text-right font-bold">{netSalary}</td>
                <td className="border border-black p-2"></td>
                <td className="border border-black p-2"></td>
              </tr>
              <tr>
                <td className="border border-black p-2" colSpan={2}>
                  <strong>In Words:</strong> {netSalaryInWords}
                </td>
                <td className="border border-black p-2"></td>
                <td className="border border-black p-2"></td>
              </tr>
            </tbody>
          </table>

          <div className="mt-8 text-center">
            <p className="mb-4">
              Dear Associate, we thank you for being a part of Daya Consultancy Family! 
              Mail Your queries to <span className="text-blue-600 underline">info@dayacs.com</span>
            </p>
            
            <div className="flex justify-end items-center mt-8">
              <div className="text-right">
                <p className="text-sm">Signature: ________________</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalarySlipTemplate;
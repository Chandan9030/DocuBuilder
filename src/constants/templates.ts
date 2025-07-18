
export const templateTypes = [
  { id: 'internshipLetter', name: 'Intern Letter' },
  { id: 'offerLetter', name: 'Offer Letter' },
  { id: 'certificate', name: 'Internship Certificate' },
  { id: 'experienceCertificate', name: 'Experience Certificate' },
  { id: 'relievingLetter', name: 'Relieving Letter' },
  { id: 'exitFormalityFinal', name: 'Exit Formality Final' },
  { id: 'hikeLetter', name: 'Hike Letter' },
  { id: 'salarySlip', name: 'Salary Slip' }
];

export const initialFormData = {
  // Common Company Information
  companyName: 'DAYA Consultancy Services',
  companySubtitle: 'Daya Consultancy Services (OPC) Private Limited',
  
  // Common Recipient Information
  recipientTitle: 'Mr.',
  recipientName: 'Agni Tanmaya Behera',
  recipientAddress: '456 Residential Street, Bhubaneswar, Odisha',
  
  // Common Signatory Information
  signatoryName: 'Mr. Dayashankar Das',
  signatoryTitle: 'Chief Executive Officer',
  
  // Certificate Template Fields
  certificateTitle: 'Full Stack Developer',
  certificateDescription: 'He has been found to be demonstrating exceptional dedication, enthusiasm, and professionalism in his duties and contributions to various projects and initiatives within the company. We wish all the best in his future endeavors.',
  internshipDuration: '3 months',
  startDate: '02/05/2025',
  endDate: '02/07/2025',
  completionDate: '2022-04-05',
  referenceNo: 'DCS/IT/22/1006',
  mentorName: 'Mr. Amit Jyoti Samal',

  // Offer Letter Template Fields
  jobTitle: 'Full Stack Developer',
  offerStartDate: '02/05/2022',
  salary: '17000',
  ctc: '204000',
  reportingAddress: 'B-19, Saheed Nagar, Bhubaneswar-751007, Odisha',
  probationPeriod: 'three month',
  greeting: 'Dear Agni,',
  welcomeMessage: 'A very warm welcome to you!',
  offerIntroduction: 'Thank you for exploring career opportunities with <strong>DAYA Consultancy Services (OPC) Pvt. Ltd.</strong>. You have successfully completed our selection process and we are pleased to make you an offer of employment.',
  associationStatement: 'The company hopes to have a long and mutually beneficial association with you and hope you find the atmosphere challenging and invigorating to realize your potential.',
  acceptanceInstructions: 'Kindly confirm your acceptance by signing this offer letter. If not accepted within <strong>3 days</strong> of receipt, this offer is liable to lapse at the discretion of <strong>DAYA Consultancy Services (OPC) Pvt. Ltd.</strong>. Please hand over your acceptance letter at our office.',
  revocationClause: 'Company holds the right to revoke this offer anytime in case of negative background checks received for your past employment.',

  // Internship Letter Template Fields
  issueDate: '2025-06-18',
  internPosition: 'Software Development Intern',
  internshipFirstStatement: 'We are pleased to extend to you this offer of internship at Daya Consultancy Services (OPC) Pvt. Ltd. As Marketing - INTERN for 60 days if you accept this offer, you will begin your internship with the Company on 02/05/2025. This is a scope for you to learn new age technology and update yourself with industry standards. You will receive no type of payment per month. As an intern you will receive "temporary employment" status. As a temporary employee, you will not receive any of the employee benefits that regular Company employees receive including but not limited to, health insurance, vacation or sick pay, or paid holidays.',
  internshipSecondStatement: 'payment per month. As an intern you will receive "temporary employment" status. As a temporary employee, you will not receive any of the employee benefits that regular Company employees receive including but not limited to, health insurance, vacation or sick pay, or paid holidays. During your internship if you are unable to attend the office for any reason then your internship duration will be extended. Your internship is expected to end in 2nd July 2025. However, your internship with the Company is "at-will," which means that either you or the Company may terminate your internship at any time, with or without cause and with or without notice. If your performance is seen to be appreciable then you may receive incentive.',
  internshipThirdStatement: 'During your internship, you may have access to trade secrets and confidential business information belonging to the Company. By accepting this internship offer, you acknowledge that you must keep all this information strictly confidential, and refrain from using it for your own purposes or from disclosing it to anyone outside the Company.',
  internshipFourthStatement: 'In addition, you agree that, upon conclusion of your internship, you will immediately return to the Company all its property, equipment, and documents, including electronically stored information.',
  internshipFifthStatement: 'By accepting this offer, you agree that throughout your internship, DÃ¨sign and Manufacturing Engineerin you will observe all policies and practices governing the conduct of our business and employees, including our policies prohibiting discrimination and harassment. This letter sets forth the complete offer we are extending to you, and supersedes and replaces any prior inconsistent statements or discussions. It may be changed only by a subsequent written agreement. If any kind of unprofessional activity is being seen then legal actions may be taken against you.',
  internshipClosingStatement: 'I hope that your association with the Company will be successful and rewarding. Kindly confirm your acceptance by signing this offer letter. If not accepted within 3 days of receipt. Please hand over your acceptance letter at our office.',

  // Relieving Letter Template Fields
  relievingDate: '29/05/2024',
  referenceDate: '10/06/2024',
  relievingReferenceNo: 'DCS/HR/24/1001',
  relievingAddress: 'Plot No-B19\nAT/PO: Saheed Nagar\nBhubaneswar\nDist: Khordha, Odisha-752007',
  relievingCompanyDetails: 'U74140OR2021OPC037819 | B-16, Koustuva Bhavan, Saheed Nagar, Bhubaneswar, Odisha, India-751001 | https://dayacs.com/',
  relievingPhone: '+91 8144402704',
  relievingEmail: 'info@dayacs.com',

  // Exit Formality Final Template Fields
  employeeId: 'DCS 069',
  departmentAndPositionName: 'IT - Full Stack Developer', // Updated to match Excel format
  dateOfExit: '2024-05-29',

  // Hike Letter Template Fields
  employeeId: 'DCS 069',

  // Salary Slip Template Fields
  employeeName: 'Agni Tanmaya Behera',
  monthYear: 'Dec-2023',
  calendarDays: '30',
  paidDays: '30',
  lop: '0',
  accountNo: '38550447799',
  ifscCode: 'SBIN0002135',
  basic: '13500',
  hra: '6750',
  allowances: '6750',
  bonus: '0',
  employeePF: '0',
  employeeESI: '0',
  professionalTax: '0',
  totalEarnings: '27000',
  totalDeduction: '0',
  netSalary: '27000',
  netSalaryInWords: 'Twenty-Seven Thousand Only/-',
  location: 'Bhubaneswar',
  paymentMode: 'NEFT',
  startDate: '2022-05-02'
};

// Common title options for all templates
const titleOptions = [
  { value: 'Mr.', label: 'Mr.' },
  { value: 'Ms.', label: 'Ms.' },
  { value: 'Mrs.', label: 'Mrs.' },
  { value: 'Dr.', label: 'Dr.' }
];

const certificateFields = [
  { id: 'recipientTitle', label: 'Title', type: 'select', width: 'small', options: titleOptions },
  { id: 'recipientName', label: 'Recipient Name', type: 'text', width: 'large', placeholder: 'Enter recipient name (without title)' },
  { id: 'certificateTitle', label: 'Certificate/Position Title', type: 'text', placeholder: 'Enter certificate or position title' },
  { id: 'internshipDuration', label: 'Internship Duration', type: 'text', placeholder: 'e.g., 3 months' },
  { id: 'startDateFormatted', label: 'Start Date (Formatted)', type: 'text', placeholder: 'e.g., 1st/Jan/2022' },
  { id: 'endDateFormatted', label: 'End Date (Formatted)', type: 'text', placeholder: 'e.g., 1st/Apr/2022' },
  { id: 'completionDate', label: 'Completion Date', type: 'date' },
  { id: 'mentorName', label: 'Mentor/Guide Name', type: 'text', placeholder: 'Enter mentor name' },
  { id: 'referenceNo', label: 'Reference Number', type: 'text', placeholder: 'Enter reference number' },
  { id: 'signatoryName', label: 'Signatory Name', type: 'text', placeholder: 'Enter name of person signing' },
  { id: 'signatoryTitle', label: 'Signatory Title', type: 'text', placeholder: 'Enter title of person signing' },
  { id: 'certificateDescription', label: 'Certificate Description', type: 'textarea', placeholder: 'Enter certificate description' }
];

const internshipLetterFields = [
  { id: 'recipientTitle', label: 'Title', type: 'select', width: 'small', options: titleOptions },
  { id: 'recipientName', label: 'Recipient Name', type: 'text', width: 'large', placeholder: 'Enter recipient name (without title)' },
  { id: 'issueDate', label: 'Issue Date', type: 'date', placeholder: 'Enter issue date' },
  { id: 'internPosition', label: 'Intern Position', type: 'text', placeholder: 'Enter intern position' },
  { id: 'startDate', label: 'Start Date', type: 'date' },
  { id: 'endDate', label: 'End Date', type: 'date' },
  { id: 'signatoryName', label: 'Signatory Name', type: 'text', placeholder: 'Enter name of person signing' },
  { id: 'signatoryTitle', label: 'Signatory Title', type: 'text', placeholder: 'Enter title of person signing' },
  { id: 'internshipFirstStatement', label: 'First Statement', type: 'textarea', placeholder: 'Enter first statement text' },
  { id: 'internshipSecondStatement', label: 'Second Statement', type: 'textarea', placeholder: 'Enter second statement text' },
  { id: 'internshipThirdStatement', label: 'Third Statement', type: 'textarea', placeholder: 'Enter third statement text' },
  { id: 'internshipFourthStatement', label: 'Fourth Statement', type: 'textarea', placeholder: 'Enter fourth statement text' },
  { id: 'internshipFifthStatement', label: 'Fifth Statement', type: 'textarea', placeholder: 'Enter fifth statement text' },
  { id: 'internshipClosingStatement', label: 'Closing Statement', type: 'textarea', placeholder: 'Enter closing statement' }
];

const offerLetterFields = [
  { id: 'recipientTitle', label: 'Title', type: 'select', width: 'small', options: titleOptions },
  { id: 'recipientName', label: 'Recipient Name', type: 'text', width: 'large', placeholder: 'Enter recipient name (without title)' },
  { id: 'jobTitle', label: 'Job Title', type: 'text', placeholder: 'Enter Job Title' },
  { id: 'startDate', label: 'Start Date', type: 'date' },
  { id: 'salary', label: 'Monthly Gross Compensation', type: 'text', placeholder: 'Enter monthly gross amount' },
  { id: 'ctc', label: 'Annual CTC', type: 'text', placeholder: 'Enter annual CTC' },
  { id: 'reportingAddress', label: 'Reporting Address', type: 'textarea', placeholder: 'Enter reporting address' },
  { id: 'probationPeriod', label: 'Probation Period', type: 'text', placeholder: 'Enter probation period' },
  { id: 'signatoryName', label: 'Signatory Name', type: 'text', placeholder: 'Enter name of person signing' },
  { id: 'signatoryTitle', label: 'Signatory Title', type: 'text', placeholder: 'Enter title of person signing' },
  { id: 'greeting', label: 'Greeting', type: 'text', placeholder: 'Enter greeting (e.g., Dear [Name],)' },
  { id: 'welcomeMessage', label: 'Welcome Message', type: 'text', placeholder: 'Enter welcome message' },
  { id: 'offerIntroduction', label: 'Offer Introduction', type: 'textarea', placeholder: 'Enter offer introduction' },
  { id: 'associationStatement', label: 'Association Statement', type: 'textarea', placeholder: 'Enter association statement' },
  { id: 'acceptanceInstructions', label: 'Acceptance Instructions', type: 'textarea', placeholder: 'Enter acceptance instructions' },
  { id: 'revocationClause', label: 'Revocation Clause', type: 'textarea', placeholder: 'Enter revocation clause' }
];

const experienceCertificateFields = [
  { id: 'recipientTitle', label: 'Title', type: 'select', width: 'small', options: titleOptions },
  { id: 'recipientName', label: 'Recipient Name', type: 'text', width: 'large', placeholder: 'Enter recipient name (without title)' },
  { id: 'position', label: 'Position', type: 'text', placeholder: 'Enter position' },
  { id: 'startDate', label: 'Start Date', type: 'date' },
  { id: 'endDate', label: 'End Date', type: 'date' },
  { id: 'signatoryName', label: 'Signatory Name', type: 'text', placeholder: 'Enter name of person signing' },
  { id: 'signatoryTitle', label: 'Signatory Title', type: 'text', placeholder: 'Enter title of person signing' },
  { id: 'experienceParagraph', label: 'Experience Paragraph', type: 'textarea', placeholder: 'Enter experience paragraph' },
  { id: 'experienceClosingStatement', label: 'Closing Statement', type: 'textarea', placeholder: 'Enter closing statement' }
];

const relievingLetterFields = [
  { id: 'recipientTitle', label: 'Title', type: 'select', width: 'small', options: titleOptions },
  { id: 'recipientName', label: 'Recipient Name', type: 'text', width: 'large', placeholder: 'Enter recipient name (without title)' },
  { id: 'relievingDate', label: 'Relieving Date', type: 'date', placeholder: 'Enter relieving date' },
  { id: 'referenceDate', label: 'Reference Date', type: 'date', placeholder: 'Enter reference date' },
  { id: 'relievingReferenceNo', label: 'Reference Number', type: 'text', placeholder: 'Enter reference number' },
  { id: 'relievingAddress', label: 'Recipient Address', type: 'textarea', placeholder: 'Enter recipient address' },
  { id: 'signatoryName', label: 'Signatory Name', type: 'text', placeholder: 'Enter name of person signing' },
  { id: 'signatoryTitle', label: 'Signatory Title', type: 'text', placeholder: 'Enter title of person signing' }
];

const exitFormalityFinalFields = [
  { id: 'recipientTitle', label: 'Title', type: 'select', width: 'small', options: titleOptions },
  { id: 'employeeName', label: 'Employee Name', type: 'text', width: 'large', placeholder: 'Enter employee name (without title)' },
  { id: 'employeeId', label: 'Employee ID', type: 'text', placeholder: 'Enter employee ID' },
  { id: 'departmentAndPositionName', label: 'Department & Position Name', type: 'text', placeholder: 'Enter department and position (e.g., IT - Full Stack Developer)' },
  { id: 'dateOfExit', label: 'Date of Exit', type: 'date', placeholder: 'Enter date of exit' },
  { id: 'relievingAddress', label: 'Recipient Address', type: 'textarea', placeholder: 'Enter recipient address' },
  { id: 'signatoryName', label: 'Signatory Name', type: 'text', placeholder: 'Enter name of person signing' },
  { id: 'signatoryTitle', label: 'Signatory Title', type: 'text', placeholder: 'Enter title of person signing' }
];

const hikeLetterFields = [
  { id: 'recipientTitle', label: 'Title', type: 'select', width: 'small', options: titleOptions },
  { id: 'recipientName', label: 'Recipient Name', type: 'text', width: 'large', placeholder: 'Enter recipient name (without title)' },
  { id: 'employeeId', label: 'Employee ID', type: 'text', placeholder: 'Enter employee ID' },
  { id: 'salary', label: 'Monthly Gross Compensation', type: 'text', placeholder: 'Enter monthly gross amount' },
  { id: 'ctc', label: 'Annual CTC', type: 'text', placeholder: 'Enter annual CTC' },
  { id: 'date', label: 'Date', type: 'date', placeholder: 'Enter date' },
  { id: 'signatoryName', label: 'Signatory Name', type: 'text', placeholder: 'Enter name of person signing' },
  { id: 'signatoryTitle', label: 'Signatory Title', type: 'text', placeholder: 'Enter title of person signing' }
];

const salarySlipFields = [
  { id: 'recipientTitle', label: 'Title', type: 'select', width: 'small', options: titleOptions },
  { id: 'employeeName', label: 'Employee Name', type: 'text', width: 'large', placeholder: 'Enter employee name (without title)' },
  { id: 'employeeId', label: 'Employee ID', type: 'text', placeholder: 'Enter employee ID' },
  { id: 'startDate', label: 'Date of Joining', type: 'date', placeholder: 'Enter date of joining' },
  { id: 'location', label: 'Location', type: 'text', placeholder: 'Enter location' },
  { id: 'paymentMode', label: 'Payment Mode', type: 'text', placeholder: 'Enter payment mode' },
  { id: 'monthYear', label: 'Month & Year', type: 'text', placeholder: 'e.g., Dec-2023' },
  { id: 'calendarDays', label: 'Calendar Days', type: 'text', placeholder: 'Enter calendar days' },
  { id: 'paidDays', label: 'Paid Days', type: 'text', placeholder: 'Enter paid days' },
  { id: 'lop', label: 'Loss of Pay (LOP)', type: 'text', placeholder: 'Enter loss of pay days' },
  { id: 'accountNo', label: 'Account Number', type: 'text', placeholder: 'Enter account number' },
  { id: 'ifscCode', label: 'IFSC Code', type: 'text', placeholder: 'Enter IFSC code' },
  { id: 'basic', label: 'Basic Salary', type: 'text', placeholder: 'Enter basic salary' },
  { id: 'hra', label: 'HRA', type: 'text', placeholder: 'Enter HRA amount' },
  { id: 'allowances', label: 'Allowances', type: 'text', placeholder: 'Enter allowances amount' },
  { id: 'bonus', label: 'Bonus', type: 'text', placeholder: 'Enter bonus amount' },
  { id: 'employeePF', label: 'Employee PF', type: 'text', placeholder: 'Enter PF deduction' },
  { id: 'employeeESI', label: 'Employee ESI', type: 'text', placeholder: 'Enter ESI deduction' },
  { id: 'professionalTax', label: 'Professional Tax', type: 'text', placeholder: 'Enter professional tax' },
  { id: 'totalEarnings', label: 'Total Earnings', type: 'text', placeholder: 'Enter total earnings' },
  { id: 'totalDeduction', label: 'Total Deduction', type: 'text', placeholder: 'Enter total deduction' },
  { id: 'netSalary', label: 'Net Salary', type: 'text', placeholder: 'Enter net salary' },
  { id: 'netSalaryInWords', label: 'Net Salary in Words', type: 'text', placeholder: 'Enter net salary in words' }
];

export const getFormFieldsForTemplate = (templateType: string) => {
  switch(templateType) {
    case 'internshipLetter':
      return internshipLetterFields;
    case 'offerLetter':
      return offerLetterFields;
    case 'certificate':
      return certificateFields;
    case 'experienceCertificate':
      return experienceCertificateFields;
    case 'relievingLetter':
      return relievingLetterFields;
    case 'exitFormalityFinal':
      return exitFormalityFinalFields;
    case 'hikeLetter':
      return hikeLetterFields;
    case 'salarySlip':
      return salarySlipFields;
    default:
      return internshipLetterFields;
  }
};

export const getDefaultValuesForTemplate = (templateType: string) => {
  switch(templateType) {
    case 'certificate':
      return {
        companyName: 'DAYA Consultancy Services',
        companySubtitle: 'Daya Consultancy Services (OPC) Private Limited',
        recipientTitle: 'Mr.',
        recipientName: 'Agni Tanmaya Behera',
        certificateTitle: 'Full Stack Developer',
        internshipDuration: '3 months',
        startDateFormatted: '1st/Jan/2022',
        endDateFormatted: '1st/Apr/2022',
        completionDate: '2022-04-05',
        mentorName: 'Mr. Amit Jyoti Samal',
        referenceNo: 'DCS/IT/22/1006',
        signatoryName: 'Mr. Dayashankar Das',
        signatoryTitle: 'Chief Executive Officer',
        certificateDescription: 'He has been found to be demonstrating exceptional dedication, enthusiasm, and professionalism in his duties and contributions to various projects and initiatives within the company. We wish all the best in his future endeavors.'
      };
    
    case 'internshipLetter':
      return {
        recipientTitle: 'Mr.',
        recipientName: 'Recipient Name',
        issueDate: '2025-06-18',
        internPosition: 'Software Development Intern',
        startDate: '02/05/2025',
        endDate: '02/07/2025',
        signatoryName: 'Mr. Dayashankar Das',
        signatoryTitle: 'Chief Executive Officer',
        internshipFirstStatement: 'We are pleased to offer you an internship position at [Company Name] as a [Intern Position]. This internship is designed to provide you with practical experience and exposure to real-world projects.',
        internshipSecondStatement: 'As an intern you will receive "temporary employment" status. As a temporary employee, you will not receive any of the employee benefits that regular Company employees receive including but not limited to, health insurance, vacation or sick pay, or paid holidays. During your internship if you are unable to attend the office for any reason then your internship duration will be extended. Your internship is expected to end on [End Date]. However, your internship with the Company is "at-will," which means that either you or the Company may terminate your internship at any time, with or without cause and with or without notice. If your performance is seen to be appreciable then you may receive incentive.',
        internshipThirdStatement: 'During your internship, you may have access to trade secrets and confidential business information belonging to the Company. By accepting this internship offer, you acknowledge that you must keep all this information strictly confidential, and refrain from using it for your own purposes or from disclosing it to anyone outside the Company.',
        internshipFourthStatement: 'In addition, you agree that, upon conclusion of your internship, you will immediately return to the Company all its property, equipment, and documents, including electronically stored information.',
        internshipFifthStatement: 'By accepting this offer, you agree that throughout your internship, you will observe all policies and practices governing the conduct of our business and employees, including our policies prohibiting discrimination and harassment. This letter sets forth the complete offer we are extending to you, and supersedes and replaces any prior inconsistent statements or discussions. It may be changed only by a subsequent written agreement. If any kind of unprofessional activity is being seen then legal actions may be taken against you.',
        internshipClosingStatement: 'I hope that your association with the Company will be successful and rewarding. Kindly confirm your acceptance by signing this offer letter. If not accepted within 3 days of receipt. Please hand over your acceptance letter at our office.'
      };
    
    case 'offerLetter':
      return {
        companyName: 'DAYA Consultancy Services (OPC) Pvt. Ltd.',
        recipientTitle: 'Mr.',
        recipientName: 'Agni Tanmaya Behera',
        jobTitle: 'Full Stack Developer',
        startDate: '2022-05-02',
        salary: '17000',
        ctc: '204000',
        TOTAL_ANNUAL_PACKAGE: '204000',
        reportingAddress: 'B-19, Saheed Nagar, Bhubaneswar-751007, Odisha',
        probationPeriod: 'three month',
        signatoryName: 'Dayashankar Das (CEO)',
        signatoryTitle: 'CEO',
        greeting: 'Dear Agni,',
        welcomeMessage: 'A very warm welcome to you!',
        offerIntroduction: 'Thank you for exploring career opportunities with <strong>DAYA Consultancy Services (OPC) Pvt. Ltd.</strong>. You have successfully completed our selection process and we are pleased to make you an offer of employment.',
        associationStatement: 'The company hopes to have a long and mutually beneficial association with you and hope you find the atmosphere challenging and invigorating to realize your potential.',
        acceptanceInstructions: 'Kindly confirm your acceptance by signing this offer letter. If not accepted within <strong>3 days</strong> of receipt, this offer is liable to lapse at the discretion of <strong>DAYA Consultancy Services (OPC) Pvt. Ltd.</strong>. Please hand over your acceptance letter at our office.',
        revocationClause: 'Company holds the right to revoke this offer anytime in case of negative background checks received for your past employment.'
      };
    
    case 'experienceCertificate':
      return {
        companyName: 'DAYA Consultancy Services Pvt. Ltd.',
        recipientTitle: 'Mr.',
        recipientName: 'Agni Tanmaya Behera',
        position: 'Full Stack Developer',
        startDate: '2022-05-02',
        endDate: '2024-05-29',
        signatoryName: 'Dayashankar Das',
        signatoryTitle: 'CEO',
        experienceParagraph: 'He was conscientious and committed to his work during his tenure with us.',
        experienceClosingStatement: 'We wish him all the best as he embarks on his professional journey.'
      };
    
    case 'relievingLetter':
      return {
        companyName: 'DAYA Consultancy Services',
        companySubtitle: 'Daya Consultancy Services Pvt. Ltd.',
        recipientTitle: 'Mr.',
        recipientName: 'Agni Tanmaya Behera',
        relievingDate: '2024-05-29',
        referenceDate: '2024-06-10',
        relievingReferenceNo: 'Agni Tanmaya Behera_HR_24_1001',
        relievingAddress: 'Plot No-B19\nAT/PO: Saheed Nagar\nBhubaneswar\nDist: Khordha, Odisha-752007',
        signatoryName: 'Dayashankar Das',
        signatoryTitle: 'Chief Executive Officer',
        relievingCompanyDetails: 'U74140OR2021OPC037819 | B-16, Koustuva Bhavan, Saheed Nagar, Bhubaneswar, Odisha, India-751001 | https://dayacs.com/',
        relievingPhone: '+91 8144402704',
        relievingEmail: 'info@dayacs.com'
      };
    
    case 'exitFormalityFinal':
      return {
        companyName: 'DAYA Consultancy Services',
        companySubtitle: 'Daya Consultancy Services Pvt. Ltd.',
        recipientTitle: 'Mr.',
        employeeName: 'Agni Tanmaya Behera',
        employeeId: 'DCS 069',
        departmentAndPositionName: 'IT - Full Stack Developer',
        department: 'IT', // Added for consistency with ExitFormalityFinal.tsx
        position: 'Full Stack Developer', // Added for consistency
        dateOfExit: '2024-05-29',
        relievingAddress: 'Plot No-B19\nAT/PO: Saheed Nagar\nBhubaneswar\nDist: Khordha, Odisha-752007',
        signatoryName: 'Mr. Dayashankar Das',
        signatoryTitle: 'Chief Executive Officer',
        relievingCompanyDetails: 'U74140OR2021OPC037819 | B-16, Koustuva Bhavan, Saheed Nagar, Bhubaneswar, Odisha, India-751001 | https://dayacs.com/',
        relievingPhone: '+91 8144402704',
        relievingEmail: 'info@dayacs.com',
        headerImage: 'https://res.cloudinary.com/dcpoiyzqi/image/upload/v1749209085/uploads/1749209084379-1563b3f81f4be9fbc787eb359ff0f470.jpg',
        footerImage: 'https://res.cloudinary.com/dcpoiyzqi/image/upload/v1750245037/uploads/1750245035638-c4524c713841e6b3884c1d9e0c713722.jpg'
      };
    
    case 'hikeLetter':
      return {
        companyName: 'DAYA Consultancy Services',
        companySubtitle: 'Daya Consultancy Services (OPC) Private Limited',
        recipientTitle: 'Ms.',
        recipientName: 'AGNI TANMAYA BEHERA',
        employeeId: 'DCS 069',
        salary: '27000',
        ctc: '324000',
        date: '2023-06-01',
        signatoryName: 'Daya Shankar Das',
        signatoryTitle: 'Director – DAYA CONSULTANCY SERVICES'
      };
    
    case 'salarySlip':
      return {
        companyName: 'DAYA Consultancy Services',
        companySubtitle: 'Daya Consultancy Services (OPC) Private Limited',
        recipientTitle: 'Mr.',
        employeeName: 'Agni Tanmaya Behera',
        employeeId: 'DCS069',
        startDate: '2022-05-02',
        location: 'Bhubaneswar',
        paymentMode: 'NEFT',
        monthYear: 'Dec-2023',
        calendarDays: '30',
        paidDays: '30',
        lop: '0',
        accountNo: '38550447799',
        ifscCode: 'SBIN0002135',
        basic: '13500',
        hra: '6750',
        allowances: '6750',
        bonus: '0',
        employeePF: '0',
        employeeESI: '0',
        professionalTax: '0',
        totalEarnings: '27000',
        totalDeduction: '0',
        netSalary: '27000',
        netSalaryInWords: 'Twenty-Seven Thousand Only/-'
      };
    
    default:
      return initialFormData;
  }
};

export const templateFieldMappings = {
  certificate: {
    required: ['recipientTitle', 'recipientName', 'certificateTitle', 'completionDate'],
    optional: ['mentorName', 'referenceNo', 'certificateDescription']
  },
  internshipLetter: {
    required: ['recipientTitle', 'recipientName', 'internPosition', 'startDate', 'endDate', 'issueDate'],
    optional: ['internshipFirstStatement', 'internshipSecondStatement', 'internshipThirdStatement', 'internshipFourthStatement', 'internshipFifthStatement', 'internshipClosingStatement']
  },
  offerLetter: {
    required: ['recipientTitle', 'recipientName', 'jobTitle', 'startDate', 'ctc'],
    optional: ['probationPeriod', 'reportingAddress', 'greeting', 'welcomeMessage', 'offerIntroduction', 'associationStatement', 'acceptanceInstructions', 'revocationClause']
  },
  experienceCertificate: {
    required: ['recipientTitle', 'recipientName', 'position', 'startDate', 'endDate'],
    optional: ['experienceParagraph', 'experienceClosingStatement']
  },
  relievingLetter: {
    required: ['recipientTitle', 'recipientName', 'relievingDate', 'referenceDate', 'relievingReferenceNo'],
    optional: ['relievingAddress']
  },
  exitFormalityFinal: {
    required: ['recipientTitle', 'employeeName', 'employeeId', 'departmentAndPositionName', 'dateOfExit'],
    optional: ['relievingAddress', 'department', 'position']
  },
  hikeLetter: {
    required: ['recipientTitle', 'recipientName', 'employeeId', 'salary', 'ctc', 'date'],
    optional: ['signatoryName', 'signatoryTitle']
  },
  salarySlip: {
    required: ['recipientTitle', 'employeeName', 'employeeId', 'startDate', 'location', 'paymentMode', 'monthYear', 'calendarDays', 'paidDays', 'lop', 'accountNo', 'ifscCode', 'basic', 'hra', 'allowances', 'bonus', 'employeePF', 'employeeESI', 'professionalTax', 'totalEarnings', 'totalDeduction', 'netSalary', 'netSalaryInWords'],
    optional: []
  }
};

export const getValidationRules = (templateType: string) => {
  const commonRules = {
    companyName: { required: true, minLength: 2 },
    recipientTitle: { required: true },
    employeeName: { required: true, minLength: 2 }
  };

  const templateSpecificRules = {
    certificate: {
      ...commonRules,
      recipientName: { required: true, minLength: 2 },
      certificateTitle: { required: true, minLength: 2 },
      completionDate: { required: true, type: 'date' },
      referenceNo: { pattern: /^[A-Z0-9\/]+$/ },
      certificateDescription: { minLength: 10 }
    },
    internshipLetter: {
      ...commonRules,
      recipientName: { required: true, minLength: 2 },
      internPosition: { required: true, minLength: 2 },
      startDate: { required: true, type: 'date' },
      endDate: { required: true, type: 'date' },
      issueDate: { required: true, type: 'date' },
      internshipFirstStatement: { minLength: 10 },
      internshipSecondStatement: { minLength: 10 },
      internshipThirdStatement: { minLength: 10 },
      internshipFourthStatement: { minLength: 10 },
      internshipFifthStatement: { minLength: 10 },
      internshipClosingStatement: { minLength: 10 }
    },
    offerLetter: {
      ...commonRules,
      recipientName: { required: true, minLength: 2 },
      jobTitle: { required: true, minLength: 2 },
      startDate: { required: true, type: 'date' },
      ctc: { required: true, minLength: 5 },
      greeting: { minLength: 5 },
      welcomeMessage: { minLength: 5 },
      offerIntroduction: { minLength: 10 },
      associationStatement: { minLength: 10 },
      acceptanceInstructions: { minLength: 10 },
      revocationClause: { minLength: 10 }
    },
    experienceCertificate: {
      ...commonRules,
      recipientName: { required: true, minLength: 2 },
      position: { required: true, minLength: 2 },
      startDate: { required: true, type: 'date' },
      endDate: { required: true, type: 'date' },
      experienceParagraph: { minLength: 10 },
      experienceClosingStatement: { minLength: 10 }
    },
    relievingLetter: {
      ...commonRules,
      recipientName: { required: true, minLength: 2 },
      relievingDate: { required: true, type: 'date' },
      referenceDate: { required: true, type: 'date' },
      relievingReferenceNo: { pattern: /^[A-Za-z0-9_]+$/ }
    },
    exitFormalityFinal: {
      ...commonRules,
      employeeName: { required: true, minLength: 2 },
      employeeId: { required: true, pattern: /^[A-Z0-9\s]+$/ },
      departmentAndPositionName: { required: true, minLength: 2 },
      dateOfExit: { required: true, type: 'date' }
    },
    hikeLetter: {
      ...commonRules,
      recipientName: { required: true, minLength: 2 },
      employeeId: { required: true, pattern: /^[A-Z0-9\s]+$/ },
      salary: { required: true, pattern: /^[0-9]+$/ },
      ctc: { required: true, pattern: /^[0-9]+$/ },
      date: { required: true, type: 'date' }
    },
    salarySlip: {
      ...commonRules,
      employeeId: { required: true, pattern: /^[A-Z0-9\s]+$/ },
      startDate: { required: true, type: 'date' },
      location: { required: true, minLength: 2 },
      paymentMode: { required: true, minLength: 2 },
      monthYear: { required: true, pattern: /^[A-Za-z]{3}-[0-9]{4}$/ },
      calendarDays: { required: true, pattern: /^[0-9]+$/ },
      paidDays: { required: true, pattern: /^[0-9]+$/ },
      lop: { required: true, pattern: /^[0-9]+$/ },
      accountNo: { required: true, pattern: /^[0-9]+$/ },
      ifscCode: { required: true, pattern: /^[A-Z0-9]+$/ },
      basic: { required: true, pattern: /^[0-9]+$/ },
      hra: { required: true, pattern: /^[0-9]+$/ },
      allowances: { required: true, pattern: /^[0-9]+$/ },
      bonus: { required: true, pattern: /^[0-9]+$/ },
      employeePF: { required: true, pattern: /^[0-9]+$/ },
      employeeESI: { required: true, pattern: /^[0-9]+$/ },
      professionalTax: { required: true, pattern: /^[0-9]+$/ },
      totalEarnings: { required: true, pattern: /^[0-9]+$/ },
      totalDeduction: { required: true, pattern: /^[0-9]+$/ },
      netSalary: { required: true, pattern: /^[0-9]+$/ },
      netSalaryInWords: { required: true, minLength: 5 }
    }
  };

  return templateSpecificRules[templateType] || commonRules;
};
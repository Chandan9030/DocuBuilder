export interface FormData {
  id: number;
  recipientTitle: string;
  recipientName: string;
  firstName: string;
  employeeName: string;
  studentName: string;
  email: string;
  recipientAddress: string;
  issueDate: string;
  internPosition: string;
  startDate: string;
  endDate: string;
  certificateTitle: string;
  position: string;
  department: string;
  salary: string;
  ctc: string;
  completionDate: string;
  employeeId: string;
  relievingDate: string;
  referenceDate: string;
  internshipDuration: string;
  mentorName: string;
  referenceNo: string;
  doj: string;
  location: string;
  paymentMode: string;
  monthYear: string;
  calendarDays: string;
  paidDays: string;
  lop: string;
  accountNo: string;
  ifscCode: string;
  bonus: string;
  employeePf: string;
  employeeEsi: string;
  professionalTax: string;
  totalEarnings: string;
  deductionAllowance: string;
  netSalary: string;
  netSalaryInWords: string;
  probationPeriod: string;
  signatoryName: string;
  signatoryTitle: string;
  companyName: string;
  companySubtitle: string;
  companyAddress: string;
  headerImage: string;
  footerImage: string;
  dateOfExit: string;
  date: string;
  customTemplate: string;
}

export interface ExcelBulkGeneratorProps {
  onClose: () => void;
  templateType: string;
}
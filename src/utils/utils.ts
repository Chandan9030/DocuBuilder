import { FormData } from './types';

export const formatDateToString = (dateStr: string): string => {
  if (!dateStr) return 'N/A';
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    const day = date.getDate();
    const month = date.toLocaleString('en-GB', { month: 'long' });
    const year = date.getFullYear();
    const dayWithOrdinal = day + (day % 10 === 1 && day !== 11 ? 'st' : day % 10 === 2 && day !== 12 ? 'nd' : day % 10 === 3 && day !== 13 ? 'rd' : 'th');
    return `${dayWithOrdinal} ${month} ${year}`;
  } catch {
    return dateStr;
  }
};

export const findFieldValue = (row: any, possibleNames: string[]): string => {
  for (const name of possibleNames) {
    const matchingKey = Object.keys(row).find(
      key => key.toLowerCase().replace(/[^a-z0-9]/g, '') === name.toLowerCase().replace(/[^a-z0-9]/g, '')
    );
    if (matchingKey && row[matchingKey] !== undefined && row[matchingKey] !== null && row[matchingKey] !== '') {
      // Remove commas from numerical fields to preserve full value
      const value = row[matchingKey].toString().trim();
      if (['Monthly Gross Compensation', 'Salary', 'Annual CTC', 'CTC', 'Bonus', 'Employee PF', 'Employee ESI', 'Professional Tax', 'Total Earnings', 'Total Deduction', 'Net Salary'].includes(name)) {
        return value.replace(/,/g, '');
      }
      return value;
    }
  }
  return '';
};

export const validateRowData = (row: any, index: number, selectedTemplate: string): string[] => {
  const errors: string[] = [];
  if (selectedTemplate === 'exitFormality') {
    if (!findFieldValue(row, ['Employee Name', 'recipientName'])) {
      errors.push(`Row ${index + 1}: Missing Employee Name`);
    }
    if (!findFieldValue(row, ['Employee ID', 'EmployeeId', 'employee_id'])) {
      errors.push(`Row ${index + 1}: Missing Employee ID`);
    }
    if (!findFieldValue(row, ['Department & Position Name'])) {
      errors.push(`Row ${index + 1}: Missing Department & Position Name`);
    }
    if (!findFieldValue(row, ['Date of Exit', 'Exit Date', 'Relieving Date'])) {
      errors.push(`Row ${index + 1}: Missing Date of Exit`);
    }
  } else if (selectedTemplate === 'hikeLetter') {
    if (!findFieldValue(row, ['recipientName', 'Employee Name', 'Name'])) {
      errors.push(`Row ${index + 1}: Missing recipientName`);
    }
    if (!findFieldValue(row, ['Employee ID', 'EmployeeId', 'employee_id'])) {
      errors.push(`Row ${index + 1}: Missing Employee ID`);
    }
    if (!findFieldValue(row, ['Monthly Gross Compensation', 'Salary', 'Annual CTC', 'CTC'])) {
      errors.push(`Row ${index + 1}: Missing Salary or CTC`);
    }
    if (!findFieldValue(row, ['Date'])) {
      errors.push(`Row ${index + 1}: Missing Date`);
    }
  } else if (selectedTemplate === 'offerLetter') {
    if (!findFieldValue(row, ['recipientName', 'Employee Name', 'Name', 'RecipientName'])) {
      errors.push(`Row ${index + 1}: Missing recipientName`);
    }
    if (!findFieldValue(row, ['Job Title', 'Position', 'Position Title', 'Designation'])) {
      errors.push(`Row ${index + 1}: Missing Job Title`);
    }
    if (!findFieldValue(row, ['Monthly Gross Compensation', 'Salary', 'Annual CTC', 'CTC'])) {
      errors.push(`Row ${index + 1}: Missing Salary or CTC`);
    }
  } else if (selectedTemplate === 'internshipLetter') {
    if (!findFieldValue(row, ['recipientName', 'Employee Name', 'Name'])) {
      errors.push(`Row ${index + 1}: Missing recipientName`);
    }
    if (!findFieldValue(row, ['internPosition', 'Position Title', 'Position'])) {
      errors.push(`Row ${index + 1}: Missing internPosition`);
    }
    if (!findFieldValue(row, ['startDate', 'Start Date'])) {
      errors.push(`Row ${index + 1}: Missing startDate`);
    }
    if (!findFieldValue(row, ['endDate', 'End Date'])) {
      errors.push(`Row ${index + 1}: Missing endDate`);
    }
  } else if (selectedTemplate === 'certificate') {
    if (!findFieldValue(row, ['recipientName', 'Employee Name', 'Name'])) {
      errors.push(`Row ${index + 1}: Missing recipientName`);
    }
    if (!findFieldValue(row, ['Position Title', 'Certificate Title'])) {
      errors.push(`Row ${index + 1}: Missing Position Title`);
    }
  } else if (selectedTemplate === 'salarySlip') {
    if (!findFieldValue(row, ['recipientName', 'Employee Name', 'Name'])) {
      errors.push(`Row ${index + 1}: Missing recipientName`);
    }
    if (!findFieldValue(row, ['Job Title', 'Position', 'Position Title', 'Designation'])) {
      errors.push(`Row ${index + 1}: Missing Position`);
    }
  }
  return errors;
};
// import React, { useState, useRef, useEffect } from 'react';
// import { FileText, Upload, FileSpreadsheet, Eye, Trash2, Users, Download, Loader, X, Mail, Edit, Save } from 'lucide-react';
// import * as XLSX from 'xlsx';
// import { FormData, ExcelBulkGeneratorProps } from '../utils/types';
// import { formatDateToString, findFieldValue, validateRowData } from '../utils/utils';
// import { generateAllDocuments } from './pdfUtils.tsx';
// import { sendDocumentsByEmail } from './emailUtils.tsx';
// import InternshipLetterTemplate from './templates/InternshipLetterTemplate';
// import OfferLetterTemplate from './templates/OfferLetterTemplate';
// import CertificateTemplate from './templates/CertificateTemplate';
// import ExperienceLetter from './templates/ExperienceLetter';
// import ExitFormalityFinal from './templates/ExitFormalityFinal';
// import HikeLetterTemplate from './templates/HikeLetterTemplate';
// import RelievingLetterTemplate from './templates/RelievingLetterTemplate';
// import SalarySlipTemplate from './templates/SalarySlipTemplate';
// import TemplateEditor from './TemplateEditor';
// import ReactDOMServer from 'react-dom/server';
// import DOMPurify from 'dompurify';

// const defaultTemplateComponents: Record<string, React.FC<{ formData: FormData; templateContent?: string }>> = {
//   internshipLetter: InternshipLetterTemplate,
//   offerLetter: OfferLetterTemplate,
//   certificate: CertificateTemplate,
//   experienceCertificate: ExperienceLetter,
//   exitFormality: ExitFormalityFinal,
//   hikeLetter: HikeLetterTemplate,
//   relievingLetter: RelievingLetterTemplate,
//   salarySlip: SalarySlipTemplate,
// };

// const templateImages: Record<string, { headerImage: string; footerImage: string }> = {
//   internshipLetter: {
//     headerImage: 'https://res.cloudinary.com/dcpoiyzqi/image/upload/v1749546738/uploads/1749546736726-91b660c5372a77bf355b2ba1fa46d02a.png',
//     footerImage: 'https://res.cloudinary.com/dcpoiyzqi/image/upload/v1750245037/uploads/1750245035638-c4524c713841e6b3884c1d9e0c713722.jpg',
//   },
//   offerLetter: {
//     headerImage: 'https://res.cloudinary.com/dcpoiyzqi/image/upload/v1749209085/uploads/1749209084379-1563b3f81f4be9fbc787eb359ff0f470.jpg',
//     footerImage: 'https://res.cloudinary.com/dcpoiyzqi/image/upload/v1750245037/uploads/1750245035638-c4524c713841e6b3884c1d9e0c713722.jpg',
//   },
//   certificate: {
//     headerImage: 'https://res.cloudinary.com/dcpoiyzqi/image/upload/v1749189616/uploads/1749189615031-b9c34262be2b542ffe239c8c5c4db3a4.jpg',
//     footerImage: 'https://res.cloudinary.com/dcpoiyzqi/image/upload/v1750245037/uploads/1750245035638-c4524c713841e6b3884c1d9e0c713722.jpg',
//   },
//   experienceCertificate: {
//     headerImage: 'https://res.cloudinary.com/dcpoiyzqi/image/upload/v1749546738/uploads/1749546736726-91b660c5372a77bf355b2ba1fa46d02a.png',
//     footerImage: '',
//   },
//   exitFormality: {
//     headerImage: 'https://res.cloudinary.com/dcpoiyzqi/image/upload/v1749209085/uploads/1749209084379-1563b3f81f4be9fbc787eb359ff0f470.jpg',
//     footerImage: 'https://res.cloudinary.com/dcpoiyzqi/image/upload/v1750245037/uploads/1750245035638-c4524c713841e6b3884c1d9e0c713722.jpg',
//   },
//   hikeLetter: {
//     headerImage: 'https://res.cloudinary.com/dcpoiyzqi/image/upload/v1749546738/uploads/1749546736726-91b660c5372a77bf355b2ba1fa46d02a.png',
//     footerImage: 'https://res.cloudinary.com/dcpoiyzqi/image/upload/v1750245037/uploads/1750245035638-c4524c713841e6b3884c1d9e0c713722.jpg',
//   },
//   relievingLetter: {
//     headerImage: 'https://res.cloudinary.com/dcpoiyzqi/image/upload/v1749209085/uploads/1749209084379-1563b3f81f4be9fbc787eb359ff0f470.jpg',
//     footerImage: 'https://res.cloudinary.com/dcpoiyzqi/image/upload/v1750245037/uploads/1750245035638-c4524c713841e6b3884c1d9e0c713722.jpg',
//   },
//   salarySlip: {
//     headerImage: 'https://res.cloudinary.com/dcpoiyzqi/image/upload/v1749209085/uploads/1749209084379-1563b3f81f4be9fbc787eb359ff0f470.jpg',
//     footerImage: '',
//   },
// };

// const templateOptions = [
//   { value: 'internshipLetter', label: 'Internship Letter' },
//   { value: 'offerLetter', label: 'Offer Letter' },
//   { value: 'certificate', label: 'Certificate' },
//   { value: 'experienceCertificate', label: 'Experience Certificate' },
//   { value: 'exitFormality', label: 'Exit Formality' },
//   { value: 'hikeLetter', label: 'Hike Letter' },
//   { value: 'relievingLetter', label: 'Relieving Letter' },
//   { value: 'salarySlip', label: 'Salary Slip' },
// ];

// const ExcelBulkGenerator: React.FC<ExcelBulkGeneratorProps> = ({ onClose, templateType }) => {
//   const [excelData, setExcelData] = useState<FormData[]>([]);
//   const [selectedTemplate, setSelectedTemplate] = useState(templateType || '');
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [isSendingEmails, setIsSendingEmails] = useState(false);
//   const [isSaving, setIsSaving] = useState(false);
//   const [previewIndex, setPreviewIndex] = useState<number | null>(null);
//   const [uploadedFileName, setUploadedFileName] = useState('');
//   const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
//   const [editIndex, setEditIndex] = useState<number | null>(null);
//   const [editorOpen, setEditorOpen] = useState(false);
//   const hiddenPdfContentRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (templateType && templateType !== selectedTemplate) {
//       console.log('Updating selectedTemplate to:', templateType);
//       setSelectedTemplate(templateType);
//     }
//   }, [templateType]);

//   const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (!file) return;

//     setUploadedFileName(file.name);
//     const reader = new FileReader();

//     reader.onload = (e) => {
//       try {
//         const data = new Uint8Array(e.target?.result as ArrayBuffer);
//         const workbook = XLSX.read(data, { type: 'array' });
//         const sheetName = workbook.SheetNames[0];
//         const worksheet = workbook.Sheets[sheetName];

//         const jsonData = XLSX.utils.sheet_to_json(worksheet, {
//           raw: false,
//           dateNF: 'yyyy-mm-dd',
//           defval: '',
//         });

//         const validationErrors: string[] = [];
//         const cleanedData = jsonData.map((row: any, index: number) => {
//           const errors = validateRowData(row, index, selectedTemplate);
//           if (errors.length > 0) {
//             validationErrors.push(...errors);
//           }

//           const recipientTitle = findFieldValue(row, ['Title', 'Salutation']);
//           const recipientName = findFieldValue(row, ['recipientName', 'Employee Name', 'Name', 'RecipientName', 'Full Name']);
//           const email = findFieldValue(row, ['Email', 'email', 'Employee Email']);
//           const recipientAddress = findFieldValue(row, ['recipientAddress', 'Address']);
//           const issueDate = findFieldValue(row, ['issueDate', 'Issue Date']);
//           const internPosition = findFieldValue(row, ['internPosition', 'Position Title', 'Position']);
//           const startDate = findFieldValue(row, ['startDate', 'Start Date', 'date of joining', 'Joining Date']);
//           const endDate = findFieldValue(row, ['endDate', 'End Date']);
//           const employeeId = findFieldValue(row, ['Employee ID', 'EmployeeId', 'employee_id']);
//           const salary = findFieldValue(row, ['Monthly Gross Compensation', 'Salary']);
//           const ctc = findFieldValue(row, ['Annual CTC', 'CTC']);
//           const relievingDate = findFieldValue(row, ['Relieving Date', 'Date of Exit', 'Exit Date']);
//           const referenceDate = findFieldValue(row, ['Reference Date']);
//           const internshipDuration = findFieldValue(row, ['internship duration', 'Internship Duration']);
//           const completionDate = findFieldValue(row, ['completion date', 'Completion Date', 'Date']);
//           const doj = findFieldValue(row, ['date of joining', 'DOJ']);
//           const location = findFieldValue(row, ['location', 'Location']);
//           const paymentMode = findFieldValue(row, ['Payment mode', 'Payment Mode']);
//           const monthYear = findFieldValue(row, ['month & year', 'Month Year']);
//           const calendarDays = findFieldValue(row, ['calendar days', 'Calendar Days']);
//           const paidDays = findFieldValue(row, ['paid days', 'Paid Days']);
//           const lop = findFieldValue(row, ['loss of pay (LOP)', 'LOP']);
//           const accountNo = findFieldValue(row, ['Account Number']);
//           const ifscCode = findFieldValue(row, ['IFSC Code']);
//           const bonus = findFieldValue(row, ['Bonus']);
//           const employeePf = findFieldValue(row, ['Employee PF']);
//           const employeeEsi = findFieldValue(row, ['Employee ESI']);
//           const professionalTax = findFieldValue(row, ['Professional Tax']);
//           const totalEarnings = findFieldValue(row, ['Total Earnings']);
//           const deductionAllowance = findFieldValue(row, ['Total Deduction']);
//           const netSalary = findFieldValue(row, ['Net Salary']);
//           const netSalaryInWords = findFieldValue(row, ['Net Salary in Words']);
//           const date = findFieldValue(row, ['Date']);
//           const customTemplate = findFieldValue(row, ['customTemplate', 'Custom Template', 'Template Content']);

//           let certificateTitle = '';
//           let mentorName = '';
//           let referenceNo = '';
//           let position = '';
//           let employeeName = '';
//           let dateOfExit = '';
//           let department = 'General';

//           if (selectedTemplate === 'certificate') {
//             certificateTitle = findFieldValue(row, ['Position Title', 'Certificate Title']);
//             mentorName = findFieldValue(row, ['Guide Name', 'Mentor Name']);
//             referenceNo = findFieldValue(row, ['Reference Number']);
//             position = certificateTitle || 'Intern';
//           } else if (selectedTemplate === 'experienceCertificate') {
//             position = findFieldValue(row, ['Position', 'Job Title']);
//           } else if (selectedTemplate === 'exitFormality') {
//             employeeName = findFieldValue(row, ['Employee Name', 'recipientName']);
//             dateOfExit = findFieldValue(row, ['Date of Exit', 'Exit Date', 'Relieving Date']);
//             position = findFieldValue(row, ['Department & Position Name']) || 'N/A';
//           } else if (selectedTemplate === 'salarySlip') {
//             employeeName = findFieldValue(row, ['Employee name', 'Employee Name', 'recipientName']);
//             position = findFieldValue(row, ['Job Title', 'Position', 'Position Title', 'Designation']) || 'Employee';
//           } else if (selectedTemplate === 'offerLetter') {
//             position = findFieldValue(row, ['Job Title', 'Position', 'Position Title', 'Designation']) || 'Employee';
//           } else if (selectedTemplate === 'internshipLetter') {
//             position = internPosition || 'Intern';
//           } else if (selectedTemplate === 'hikeLetter') {
//             position = findFieldValue(row, ['Job Title', 'Position', 'Position Title', 'Designation']) || 'Employee';
//           } else {
//             position = findFieldValue(row, ['Job Title', 'Position', 'Position Title', 'Designation']) || 'Intern';
//           }

//           const images = templateImages[selectedTemplate] || templateImages.offerLetter;

//           const firstName = recipientName.split(' ')[0] || `Employee ${index + 1}`;

//           const cleanedRow = {
//             id: index + 1,
//             recipientTitle: recipientTitle || 'Mr./Ms.',
//             recipientName: recipientName || `Employee ${index + 1}`,
//             firstName: firstName,
//             employeeName: employeeName || recipientName || `Employee ${index + 1}`,
//             email: email || '',
//             recipientAddress: recipientAddress || 'Not Provided',
//             issueDate: issueDate || new Date().toISOString().split('T')[0],
//             internPosition: internPosition || 'Intern',
//             startDate: startDate || new Date().toISOString().split('T')[0],
//             endDate: endDate || new Date().toISOString().split('T')[0],
//             certificateTitle: certificateTitle || (selectedTemplate === 'certificate' ? 'Intern' : ''),
//             position: position || 'N/A',
//             department: department || 'General',
//             salary: salary || '',
//             ctc: ctc || '',
//             completionDate: completionDate || new Date().toISOString().split('T')[0],
//             employeeId: employeeId || 'N/A',
//             relievingDate: relievingDate || 'N/A',
//             referenceDate: referenceDate || 'N/A',
//             internshipDuration: internshipDuration || '3 months',
//             mentorName: mentorName || 'N/A',
//             referenceNo: referenceNo || '',
//             doj: doj || 'N/A',
//             location: location || 'Bhubaneswar',
//             paymentMode: paymentMode || 'Bank Transfer',
//             monthYear: monthYear || '',
//             calendarDays: calendarDays || '30',
//             paidDays: paidDays || '30',
//             lop: lop || '0',
//             accountNo: accountNo || '',
//             ifscCode: ifscCode || '',
//             bonus: bonus || '0',
//             employeePf: employeePf || '0',
//             employeeEsi: employeeEsi || '0',
//             professionalTax: professionalTax || '0',
//             totalEarnings: totalEarnings || '',
//             deductionAllowance: deductionAllowance || '0',
//             netSalary: netSalary || '',
//             netSalaryInWords: netSalaryInWords || '',
//             probationPeriod: selectedTemplate === 'offerLetter' ? '3 months' : '',
//             signatoryName: 'Dayashankar Das',
//             signatoryTitle: selectedTemplate === 'relievingLetter' ? 'CEO' : 'Director',
//             companyName: 'DAYA Consultancy Services (OPC) Pvt. Ltd.',
//             companySubtitle: 'Daya Consultancy Services (OPC) Private Limited',
//             companyAddress: 'B-19, Kousalya Bhawan, Saheed Nagar, Bhubaneswar, Odisha, India - 751007',
//             headerImage: images.headerImage,
//             footerImage: images.footerImage,
//             dateOfExit: dateOfExit || formatDateToString(new Date().toISOString().split('T')[0]),
//             date: date || formatDateToString(new Date().toISOString().split('T')[0]),
//             customTemplate: customTemplate ? DOMPurify.sanitize(customTemplate) : '',
//           };

//           console.log(`Parsed row ${index + 1}:`, { recipientName: cleanedRow.recipientName, customTemplate: cleanedRow.customTemplate });
//           return cleanedRow;
//         });

//         if (validationErrors.length > 0) {
//           alert(`Data validation errors:\n${validationErrors.join('\n')}`);
//         } else {
//           setExcelData(cleanedData);
//           setSelectedRows(new Set());
//           alert(`Successfully loaded ${cleanedData.length} records!`);
//         }
//       } catch (error) {
//         alert('Error reading Excel file. Please check the format.');
//         console.error('Excel parsing error:', error);
//       }
//     };

//     reader.readAsArrayBuffer(file);
//   };

//   const saveAllDocuments = async () => {
//     if (!selectedTemplate || excelData.length === 0 || selectedRows.size === 0) {
//       alert('Please select a template, upload Excel data, and choose at least one record.');
//       return;
//     }

//     setIsSaving(true);

//     try {
//       let successCount = 0;
//       const failedIndices: number[] = [];

//       for (const index of selectedRows) {
//         if (index < 0 || index >= excelData.length) {
//           console.error(`Invalid index: ${index}`);
//           failedIndices.push(index + 1);
//           continue;
//         }

//         try {
//           const data = excelData[index];
//           const templateLabel = templateOptions.find(opt => opt.value === selectedTemplate)?.label || 'Document';
//           const safeName = (data.employeeName || data.recipientName)?.replace(/[^a-zA-Z0-9]/g, '_') || 'document';
//           const title = `${templateLabel}_${safeName}_${index + 1}`;

//           // Deep clone formData to ensure customTemplate is included
//           const formDataClone = JSON.parse(JSON.stringify(data));
//           console.log(`Saving document for index ${index}, recipient: ${data.recipientName}`);
//           console.log(`Title: ${title}, templateType: ${selectedTemplate}`);
//           console.log(`CustomTemplate: ${formDataClone.customTemplate || 'Empty'}`);

//           const response = await fetch('/api/documents', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//               title,
//               templateType: selectedTemplate,
//               formData: formDataClone,
//             }),
//           });

//           if (!response.ok) {
//             const errorData = await response.json();
//             throw new Error(`Failed to save document for ${data.recipientName}: ${errorData.message || response.statusText}`);
//           }

//           successCount++;
//           await new Promise(resolve => setTimeout(resolve, 300));
//         } catch (error) {
//           console.error(`Error saving record ${index}:`, error);
//           failedIndices.push(index + 1);
//         }
//       }

//       if (failedIndices.length > 0) {
//         alert(`Saved ${successCount} documents successfully. Failed for records: ${failedIndices.join(', ')}`);
//       } else {
//         alert(`Successfully saved all ${successCount} documents!`);
//       }
//     } catch (error) {
//       console.error('Fatal error in document saving:', error);
//       alert('A critical error occurred while saving. Please check console for details.');
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const clearBulkData = () => {
//     setExcelData([]);
//     setUploadedFileName('');
//     setPreviewIndex(null);
//     setSelectedRows(new Set());
//     setEditIndex(null);
//     setEditorOpen(false);
//   };

//   const toggleRowSelection = (index: number) => {
//     const newSelectedRows = new Set(selectedRows);
//     if (newSelectedRows.has(index)) {
//       newSelectedRows.delete(index);
//     } else {
//       newSelectedRows.add(index);
//     }
//     setSelectedRows(newSelectedRows);
//   };

//   const toggleSelectAll = () => {
//     if (selectedRows.size === excelData.length) {
//       setSelectedRows(new Set());
//     } else {
//       const allIndices = new Set(Array.from({ length: excelData.length }, (_, i) => i));
//       setSelectedRows(allIndices);
//     }
//   };

//   const handleEdit = (index: number) => {
//     if (index < 0 || index >= excelData.length || !selectedTemplate) {
//       console.error('Invalid edit index or template:', { index, selectedTemplate });
//       alert('Error: Invalid record or template selected.');
//       return;
//     }
//     const TemplateComponent = defaultTemplateComponents[selectedTemplate] || OfferLetterTemplate;
//     const data = excelData[index];
//     const originalHtml = ReactDOMServer.renderToString(<TemplateComponent formData={data} templateContent={data.customTemplate} />);
//     const parser = new DOMParser();
//     const doc = parser.parseFromString(originalHtml, 'text/html');
//     const mainContent = doc.querySelector('.content');
//     const initialContent = DOMPurify.sanitize(data.customTemplate || (mainContent ? mainContent.innerHTML : doc.body.innerHTML));
//     console.log(`Opening editor for index ${index}, recipient: ${data.recipientName}, initialContent:`, initialContent);
//     setEditIndex(index);
//     setEditorOpen(true);
//   };

//   const handleSaveTemplate = (content: string) => {
//     if (editIndex === null || editIndex < 0 || editIndex >= excelData.length) {
//       console.error('Invalid editIndex:', editIndex);
//       alert('Error: Invalid record selected for saving.');
//       return;
//     }
//     const sanitizedContent = DOMPurify.sanitize(content);
//     const newData = [...excelData];
//     newData[editIndex] = { ...newData[editIndex], customTemplate: sanitizedContent };
//     setExcelData(newData);
//     console.log(`Saved customTemplate for index ${editIndex}, recipient: ${newData[editIndex].recipientName}:`, sanitizedContent);
//     alert('Template saved successfully!');
//     setEditorOpen(false);
//     setEditIndex(null);
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg max-w-6xl max-h-[90vh] overflow-y-auto w-full">
//         <div className="p-6 border-b border-gray-200 flex justify-between items-center">
//           <h2 className="text-2xl font-bold text-gray-800 flex items-center">
//             <FileSpreadsheet className="mr-3 h-6 w-6 text-green-600" />
//             Excel Bulk Document Generator
//           </h2>
//           <button
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-700 text-2xl"
//           >
//             <X className="h-6 w-6" />
//           </button>
//         </div>

//         <div className="p-6">
//           <div className="mb-8">
//             <h3 className="text-lg font-semibold mb-4 flex items-center">
//               <Upload className="mr-2 h-5 w-5" />
//               Step 1: Upload Excel File
//             </h3>
//             <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
//               <input
//                 type="file"
//                 accept=".xlsx,.xls"
//                 onChange={handleFileUpload}
//                 className="hidden"
//                 id="excel-upload"
//               />
//               <label
//                 htmlFor="excel-upload"
//                 className="cursor-pointer flex flex-col items-center"
//               >
//                 <FileSpreadsheet className="h-12 w-12 text-gray-400 mb-2" />
//                 <span className="text-lg font-medium text-gray-600">
//                   Click to upload Excel file
//                 </span>
//                 <span className="text-sm text-gray-400 mt-1">
//                   Required columns vary by template (optional: customTemplate for custom content):
//                   <ul className="text-left mt-2">
//                     <li><strong>Internship Letter:</strong> Title, recipientName, email, recipientAddress, issueDate, internPosition, startDate, endDate, customTemplate</li>
//                     <li><strong>Offer Letter:</strong> Title, RecipientName, Date, Email, Job Title, Start Date, Monthly Gross Compensation, Annual CTC, customTemplate</li>
//                     <li><strong>Certificate:</strong> Title, recipientName, Email, Position Title, internship duration, start date, end date, completion date, Guide Name, Reference Number, customTemplate</li>
//                     <li><strong>Experience Certificate:</strong> Title, recipientName, Email, Position, start date, end date, customTemplate</li>
//                     <li><strong>Exit Formality:</strong> Title, Employee Name, Email, Employee ID, Department & Position Name, Date of Exit, customTemplate</li>
//                     <li><strong>Hike Letter:</strong> Title, recipientName, Email, Employee ID, Monthly Gross Compensation, Annual CTC, Date, Job Title, customTemplate</li>
//                     <li><strong>Relieving Letter:</strong> Title, recipientName, Email, Relieving Date, Reference Date, customTemplate</li>
//                     <li><strong>Salary Slip:</strong> Title, Employee name, email, date of joining, location, Payment mode, month & year, calendar days, paid days, loss of pay (LOP), Account Number, Bonus, Employee PF, Employee ESI, Professional Tax, Total Earnings, Total Deduction, Net Salary, Net Salary in Words, Employee ID, Job Title, customTemplate</li>
//                   </ul>
//                 </span>
//               </label>
//             </div>
//             {uploadedFileName && (
//               <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
//                 <p className="text-green-700">
//                   <strong>Uploaded:</strong> {uploadedFileName} ({excelData.length} records)
//                 </p>
//               </div>
//             )}
//           </div>

//           {excelData.length > 0 && (
//             <div className="mb-8">
//               <h3 className="text-lg font-semibold mb-4 flex items-center">
//                 <FileText className="mr-2 h-5 w-5" />
//                 Step 2: Select Template
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//                 {templateOptions.map((template) => (
//                   <button
//                     key={template.value}
//                     onClick={() => setSelectedTemplate(template.value)}
//                     className={`p-4 border-2 rounded-lg text-left transition-all ${
//                       selectedTemplate === template.value ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 hover:border-gray-300'
//                     }`}
//                   >
//                     <FileText className="h-8 w-8 mb-2" />
//                     <h4 className="font-semibold">{template.label}</h4>
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}

//           {excelData.length > 0 && selectedTemplate && (
//             <div className="mb-8">
//               <h3 className="text-lg font-semibold mb-4 flex items-center">
//                 <Users className="mr-2 h-5 w-5" />
//                 Step 3: Preview Data ({excelData.length} records)
//               </h3>
//               <div className="overflow-x-auto">
//                 <table className="min-w-full bg-white border border-gray-200 rounded-lg">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
//                         <input
//                           type="checkbox"
//                           checked={selectedRows.size === excelData.length && excelData.length > 0}
//                           onChange={toggleSelectAll}
//                           className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//                         />
//                       </th>
//                       <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">S.No</th>
//                       <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Name</th>
//                       <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Email</th>
//                       <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Position</th>
//                       {['exitFormality'].includes(selectedTemplate) && (
//                         <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Department</th>
//                       )}
//                       {['internshipLetter', 'experienceCertificate'].includes(selectedTemplate) && (
//                         <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Start Date</th>
//                       )}
//                       {['internshipLetter', 'experienceCertificate'].includes(selectedTemplate) && (
//                         <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">End Date</th>
//                       )}
//                       {['offerLetter', 'hikeLetter'].includes(selectedTemplate) && (
//                         <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Salary/CTC</th>
//                       )}
//                       {['exitFormality', 'hikeLetter', 'salarySlip'].includes(selectedTemplate) && (
//                         <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Employee ID</th>
//                       )}
//                       {['relievingLetter', 'exitFormality'].includes(selectedTemplate) && (
//                         <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Date of Exit</th>
//                       )}
//                       {['salarySlip'].includes(selectedTemplate) && (
//                         <>
//                           <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Month & Year</th>
//                           <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Total Earnings</th>
//                         </>
//                       )}
//                       {['certificate'].includes(selectedTemplate) && (
//                         <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Reference Number</th>
//                       )}
//                       {['hikeLetter'].includes(selectedTemplate) && (
//                         <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Date</th>
//                       )}
//                       <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {excelData.map((row, index) => (
//                       <tr key={row.id} className="border-t border-gray-200">
//                         <td className="px-4 py-2">
//                           <input
//                             type="checkbox"
//                             checked={selectedRows.has(index)}
//                             onChange={() => toggleRowSelection(index)}
//                             className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//                           />
//                         </td>
//                         <td className="px-4 py-2 text-sm">{row.id}</td>
//                         <td className="px-4 py-2 text-sm font-medium">
//                           {row.recipientTitle} {row.recipientName}
//                         </td>
//                         <td className="px-4 py-2 text-sm">
//                           {row.email ? (
//                             <span className="text-green-600">{row.email}</span>
//                           ) : (
//                             <span className="text-red-500">No Email</span>
//                           )}
//                         </td>
//                         <td className="px-4 py-2 text-sm">{row.position || row.certificateTitle || row.internPosition}</td>
//                         {['exitFormality'].includes(selectedTemplate) && (
//                           <td className="px-4 py-2 text-sm">{row.department}</td>
//                         )}
//                         {['internshipLetter', 'experienceCertificate'].includes(selectedTemplate) && (
//                           <td className="px-4 py-2 text-sm">{row.startDate}</td>
//                         )}
//                         {['internshipLetter', 'experienceCertificate'].includes(selectedTemplate) && (
//                           <td className="px-4 py-2 text-sm">{row.endDate}</td>
//                         )}
//                         {['offerLetter', 'hikeLetter'].includes(selectedTemplate) && (
//                           <td className="px-4 py-2 text-sm">{row.salary || row.ctc}</td>
//                         )}
//                         {['exitFormality', 'hikeLetter', 'salarySlip'].includes(selectedTemplate) && (
//                           <td className="px-4 py-2 text-sm">{row.employeeId}</td>
//                         )}
//                         {['relievingLetter', 'exitFormality'].includes(selectedTemplate) && (
//                           <td className="px-4 py-2 text-sm">{row.dateOfExit || row.relievingDate}</td>
//                         )}
//                         {['salarySlip'].includes(selectedTemplate) && (
//                           <>
//                             <td className="px-4 py-2 text-sm">{row.monthYear}</td>
//                             <td className="px-4 py-2 text-sm">{row.totalEarnings}</td>
//                           </>
//                         )}
//                         {['certificate'].includes(selectedTemplate) && (
//                           <td className="px-4 py-2 text-sm">{row.referenceNo}</td>
//                         )}
//                         {['hikeLetter'].includes(selectedTemplate) && (
//                           <td className="px-4 py-2 text-sm">{row.date}</td>
//                         )}
//                         <td className="px-4 py-2">
//                           <button
//                             onClick={() => setPreviewIndex(index)}
//                             className="text-blue-600 hover:text-blue-800 mr-2"
//                             title="View"
//                           >
//                             <Eye className="h-4 w-4" />
//                           </button>
//                           <button
//                             onClick={() => handleEdit(index)}
//                             className="text-green-600 hover:text-green-800"
//                             title="Edit"
//                           >
//                             <Edit className="h-4 w-4" />
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           )}

//           {excelData.length > 0 && selectedTemplate && (
//             <div className="flex justify-between items-center">
//               <button
//                 onClick={clearBulkData}
//                 className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
//               >
//                 <Trash2 className="mr-2 h-4 w-4" />
//                 Clear All
//               </button>
//               <div className="flex gap-3">
//                 <button
//                   onClick={() => sendDocumentsByEmail(excelData, selectedRows, selectedTemplate, setIsSendingEmails)}
//                   disabled={isSendingEmails || selectedRows.size === 0}
//                   className="flex items-center px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-green-300"
//                 >
//                   {isSendingEmails ? (
//                     <>
//                       <Loader className="animate-spin mr-2 h-4 w-4" />
//                       Sending Emails...
//                     </>
//                   ) : (
//                     <>
//                       <Mail className="mr-2 h-4 w-4" />
//                       Send Emails ({selectedRows.size})
//                     </>
//                   )}
//                 </button>
//                 <button
//                   onClick={saveAllDocuments}
//                   disabled={isSaving || selectedRows.size === 0}
//                   className="flex items-center px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:bg-purple-300"
//                 >
//                   {isSaving ? (
//                     <>
//                       <Loader className="animate-spin mr-2 h-4 w-4" />
//                       Saving Documents...
//                     </>
//                   ) : (
//                     <>
//                       <Save className="mr-2 h-4 w-4" />
//                       Save Selected ({selectedRows.size})
//                     </>
//                   )}
//                 </button>
//                 <button
//                   onClick={() => generateAllDocuments(excelData, selectedRows, selectedTemplate, setIsProcessing)}
//                   disabled={isProcessing || selectedRows.size === 0}
//                   className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300"
//                 >
//                   {isProcessing ? (
//                     <>
//                       <Loader className="animate-spin mr-2 h-4 w-4" />
//                       Generating {selectedRows.size} Documents...
//                     </>
//                   ) : (
//                     <>
//                       <Download className="mr-2 h-4 w-4" />
//                       Download Selected ({selectedRows.size})
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           )}

//           {previewIndex !== null && (
//             <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//               <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-y-auto w-full">
//                 <div className="p-4 border-b border-gray-200 flex justify-between items-center">
//                   <h4 className="text-lg font-semibold">
//                     Preview: {excelData[previewIndex]?.recipientName}
//                   </h4>
//                   <button
//                     onClick={() => setPreviewIndex(null)}
//                     className="text-gray-500 hover:text-gray-700"
//                   >
//                     <X className="h-6 w-6" />
//                   </button>
//                 </div>
//                 <div className="p-6">
//                   <div className="content" style={{ padding: '0 30px', minHeight: '297mm' }}>
//                     {(() => {
//                       if (previewIndex < 0 || previewIndex >= excelData.length) {
//                         console.error('Invalid previewIndex:', previewIndex);
//                         return <div>Error: Invalid record selected</div>;
//                       }
//                       const TemplateComponent = defaultTemplateComponents[selectedTemplate] || OfferLetterTemplate;
//                       const editedContent = DOMPurify.sanitize(excelData[previewIndex]?.customTemplate || '');
//                       console.log(`Rendering preview for index ${previewIndex}, recipient: ${excelData[previewIndex].recipientName}, customTemplate:`, editedContent);
//                       return <TemplateComponent formData={excelData[previewIndex]} templateContent={editedContent} />;
//                     })()}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {editorOpen && editIndex !== null && (
//             <TemplateEditor
//               initialContent={(() => {
//                 if (editIndex < 0 || editIndex >= excelData.length) {
//                   console.error('Invalid editIndex:', editIndex);
//                   return '';
//                 }
//                 const TemplateComponent = defaultTemplateComponents[selectedTemplate] || OfferLetterTemplate;
//                 const data = excelData[editIndex];
//                 const originalHtml = ReactDOMServer.renderToString(<TemplateComponent formData={data} templateContent={data.customTemplate} />);
//                 const parser = new DOMParser();
//                 const doc = parser.parseFromString(originalHtml, 'text/html');
//                 const mainContent = doc.querySelector('.content');
//                 const initialContent = DOMPurify.sanitize(data.customTemplate || (mainContent ? mainContent.innerHTML : doc.body.innerHTML));
//                 console.log(`Editor initial content for index ${editIndex}, recipient: ${data.recipientName}:`, initialContent);
//                 return initialContent;
//               })()}
//               onSave={handleSaveTemplate}
//               onClose={() => {
//                 setEditorOpen(false);
//                 setEditIndex(null);
//               }}
//             />
//           )}

//           <div ref={hiddenPdfContentRef} style={{ display: 'none' }} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ExcelBulkGenerator;





import React, { useState, useRef, useEffect } from 'react';
import { FileText, Upload, FileSpreadsheet, Eye, Trash2, Users, Download, Loader, X, Mail, Edit, Save } from 'lucide-react';
import * as XLSX from 'xlsx';
import { FormData, ExcelBulkGeneratorProps } from '../utils/types';
import { formatDateToString, findFieldValue, validateRowData } from '../utils/utils';
import { generateAllDocuments } from './pdfUtils.tsx';
import { sendDocumentsByEmail } from './emailUtils.tsx';
import InternshipLetterTemplate from './templates/InternshipLetterTemplate';
import OfferLetterTemplate from './templates/OfferLetterTemplate';
import CertificateTemplate from './templates/CertificateTemplate';
import ExperienceLetter from './templates/ExperienceLetter';
import ExitFormalityFinal from './templates/ExitFormalityFinal';
import HikeLetterTemplate from './templates/HikeLetterTemplate';
import RelievingLetterTemplate from './templates/RelievingLetterTemplate';
import SalarySlipTemplate from './templates/SalarySlipTemplate';
import PaymentReceiptTemplate from './templates/PaymentReceiptTemplate';
import TemplateEditor from './TemplateEditor';
import ReactDOMServer from 'react-dom/server';
import DOMPurify from 'dompurify';

const defaultTemplateComponents: Record<string, React.FC<{ formData: FormData; templateContent?: string }>> = {
  internshipLetter: InternshipLetterTemplate,
  offerLetter: OfferLetterTemplate,
  certificate: CertificateTemplate,
  experienceCertificate: ExperienceLetter,
  exitFormality: ExitFormalityFinal,
  hikeLetter: HikeLetterTemplate,
  relievingLetter: RelievingLetterTemplate,
  salarySlip: SalarySlipTemplate,
  paymentReceipt: PaymentReceiptTemplate,
};

const templateImages: Record<string, { headerImage: string; footerImage: string }> = {
  internshipLetter: {
    headerImage: 'https://res.cloudinary.com/dcpoiyzqi/image/upload/v1749546738/uploads/1749546736726-91b660c5372a77bf355b2ba1fa46d02a.png',
    footerImage: 'https://res.cloudinary.com/dcpoiyzqi/image/upload/v1750245037/uploads/1750245035638-c4524c713841e6b3884c1d9e0c713722.jpg',
  },
  offerLetter: {
    headerImage: 'https://res.cloudinary.com/dcpoiyzqi/image/upload/v1749209085/uploads/1749209084379-1563b3f81f4be9fbc787eb359ff0f470.jpg',
    footerImage: 'https://res.cloudinary.com/dcpoiyzqi/image/upload/v1750245037/uploads/1750245035638-c4524c713841e6b3884c1d9e0c713722.jpg',
  },
  certificate: {
    headerImage: 'https://res.cloudinary.com/dcpoiyzqi/image/upload/v1749189616/uploads/1749189615031-b9c34262be2b542ffe239c8c5c4db3a4.jpg',
    footerImage: 'https://res.cloudinary.com/dcpoiyzqi/image/upload/v1750245037/uploads/1750245035638-c4524c713841e6b3884c1d9e0c713722.jpg',
  },
  experienceCertificate: {
    headerImage: 'https://res.cloudinary.com/dcpoiyzqi/image/upload/v1749546738/uploads/1749546736726-91b660c5372a77bf355b2ba1fa46d02a.png',
    footerImage: '',
  },
  exitFormality: {
    headerImage: 'https://res.cloudinary.com/dcpoiyzqi/image/upload/v1749209085/uploads/1749209084379-1563b3f81f4be9fbc787eb359ff0f470.jpg',
    footerImage: 'https://res.cloudinary.com/dcpoiyzqi/image/upload/v1750245037/uploads/1750245035638-c4524c713841e6b3884c1d9e0c713722.jpg',
  },
  hikeLetter: {
    headerImage: 'https://res.cloudinary.com/dcpoiyzqi/image/upload/v1749546738/uploads/1749546736726-91b660c5372a77bf355b2ba1fa46d02a.png',
    footerImage: 'https://res.cloudinary.com/dcpoiyzqi/image/upload/v1750245037/uploads/1750245035638-c4524c713841e6b3884c1d9e0c713722.jpg',
  },
  relievingLetter: {
    headerImage: 'https://res.cloudinary.com/dcpoiyzqi/image/upload/v1749209085/uploads/1749209084379-1563b3f81f4be9fbc787eb359ff0f470.jpg',
    footerImage: 'https://res.cloudinary.com/dcpoiyzqi/image/upload/v1750245037/uploads/1750245035638-c4524c713841e6b3884c1d9e0c713722.jpg',
  },
  salarySlip: {
    headerImage: 'https://res.cloudinary.com/dcpoiyzqi/image/upload/v1749209085/uploads/1749209084379-1563b3f81f4be9fbc787eb359ff0f470.jpg',
    footerImage: '',
  },
  paymentReceipt: {
    headerImage: 'https://res.cloudinary.com/dcpoiyzqi/image/upload/v1749209085/uploads/1749209084379-1563b3f81f4be9fbc787eb359ff0f470.jpg',
    footerImage: '',
  },
};

const templateOptions = [
  { value: 'internshipLetter', label: 'Internship Letter' },
  { value: 'offerLetter', label: 'Offer Letter' },
  { value: 'certificate', label: 'Certificate' },
  { value: 'experienceCertificate', label: 'Experience Certificate' },
  { value: 'exitFormality', label: 'Exit Formality' },
  { value: 'hikeLetter', label: 'Hike Letter' },
  { value: 'relievingLetter', label: 'Relieving Letter' },
  { value: 'salarySlip', label: 'Salary Slip' },
  { value: 'paymentReceipt', label: 'Payment Receipt' },
];

const ExcelBulkGenerator: React.FC<ExcelBulkGeneratorProps> = ({ onClose, templateType }) => {
  const [excelData, setExcelData] = useState<FormData[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState(templateType || '');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSendingEmails, setIsSendingEmails] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const hiddenPdfContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (templateType && templateType !== selectedTemplate) {
      console.log('Updating selectedTemplate to:', templateType);
      setSelectedTemplate(templateType);
    }
  }, [templateType]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadedFileName(file.name);
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        const jsonData = XLSX.utils.sheet_to_json(worksheet, {
          raw: false,
          dateNF: 'yyyy-mm-dd',
          defval: '',
        });

        const validationErrors: string[] = [];
        const cleanedData = jsonData.map((row: any, index: number) => {
          const errors = validateRowData(row, index, selectedTemplate);
          if (errors.length > 0) {
            validationErrors.push(...errors);
          }

          const recipientTitle = findFieldValue(row, ['Title', 'Salutation']);
          const recipientName = findFieldValue(row, ['recipientName', 'Employee Name', 'Name', 'RecipientName', 'Full Name']);
          const email = findFieldValue(row, ['Email', 'email', 'Employee Email']);
          const recipientAddress = findFieldValue(row, ['recipientAddress', 'Address']);
          const issueDate = findFieldValue(row, ['issueDate', 'Issue Date']);
          const internPosition = findFieldValue(row, ['internPosition', 'Position Title', 'Position']);
          const startDate = findFieldValue(row, ['startDate', 'Start Date', 'date of joining', 'Joining Date']);
          const endDate = findFieldValue(row, ['endDate', 'End Date']);
          const employeeId = findFieldValue(row, ['Employee ID', 'EmployeeId', 'employee_id']);
          const salary = findFieldValue(row, ['Monthly Gross Compensation', 'Salary']);
          const ctc = findFieldValue(row, ['Annual CTC', 'CTC']);
          const relievingDate = findFieldValue(row, ['Relieving Date', 'Date of Exit', 'Exit Date']);
          const referenceDate = findFieldValue(row, ['Reference Date']);
          const internshipDuration = findFieldValue(row, ['internship duration', 'Internship Duration']);
          const completionDate = findFieldValue(row, ['completion date', 'Completion Date', 'Date']);
          const doj = findFieldValue(row, ['date of joining', 'DOJ']);
          const location = findFieldValue(row, ['location', 'Location']);
          const paymentMode = findFieldValue(row, ['Payment mode', 'Payment Mode']);
          const monthYear = findFieldValue(row, ['month & year', 'Month Year']);
          const calendarDays = findFieldValue(row, ['calendar days', 'Calendar Days']);
          const paidDays = findFieldValue(row, ['paid days', 'Paid Days']);
          const lop = findFieldValue(row, ['loss of pay (LOP)', 'LOP']);
          const accountNo = findFieldValue(row, ['Account Number']);
          const ifscCode = findFieldValue(row, ['IFSC Code']);
          const bonus = findFieldValue(row, ['Bonus']);
          const employeePf = findFieldValue(row, ['Employee PF']);
          const employeeEsi = findFieldValue(row, ['Employee ESI']);
          const professionalTax = findFieldValue(row, ['Professional Tax']);
          const totalEarnings = findFieldValue(row, ['Total Earnings']);
          const deductionAllowance = findFieldValue(row, ['Total Deduction']);
          const netSalary = findFieldValue(row, ['Net Salary']);
          const netSalaryInWords = findFieldValue(row, ['Net Salary in Words']);
          const date = findFieldValue(row, ['Date']);
          const customTemplate = findFieldValue(row, ['customTemplate', 'Custom Template', 'Template Content']);
          // Fields for PaymentReceiptTemplate
          const studentName = findFieldValue(row, ['studentName', 'Student Name']);
          const registrationNo = findFieldValue(row, ['registrationNo', 'Registration No', 'Registration Number']);
          const courseName = findFieldValue(row, ['courseName', 'Course Name']);
          const contact = findFieldValue(row, ['contact', 'Contact']);
          const address = findFieldValue(row, ['address', 'Address']);
          const duration = findFieldValue(row, ['duration', 'Duration']);
          const courseFees = findFieldValue(row, ['courseFees', 'Course Fees']);
          const totalAmountPaid = findFieldValue(row, ['totalAmountPaid', 'Total Amount Paid']);
          const paymentMethod = findFieldValue(row, ['paymentMethod', 'Payment Method']);
          const upiId = findFieldValue(row, ['upiId', 'UPI ID']);
          const authorizedBy = findFieldValue(row, ['authorizedBy', 'Authorized By']);
          const companyPhone = findFieldValue(row, ['companyPhone', 'Company Phone']);

          let certificateTitle = '';
          let mentorName = '';
          let referenceNo = '';
          let position = '';
          let employeeName = '';
          let dateOfExit = '';
          let department = 'General';

          if (selectedTemplate === 'certificate') {
            certificateTitle = findFieldValue(row, ['Position Title', 'Certificate Title']);
            mentorName = findFieldValue(row, ['Guide Name', 'Mentor Name']);
            referenceNo = findFieldValue(row, ['Reference Number']);
            position = certificateTitle || 'Intern';
          } else if (selectedTemplate === 'experienceCertificate') {
            position = findFieldValue(row, ['Position', 'Job Title']);
          } else if (selectedTemplate === 'exitFormality') {
            employeeName = findFieldValue(row, ['Employee Name', 'recipientName']);
            dateOfExit = findFieldValue(row, ['Date of Exit', 'Exit Date', 'Relieving Date']);
            position = findFieldValue(row, ['Department & Position Name']) || 'N/A';
          } else if (selectedTemplate === 'salarySlip') {
            employeeName = findFieldValue(row, ['Employee name', 'Employee Name', 'recipientName']);
            position = findFieldValue(row, ['Job Title', 'Position', 'Position Title', 'Designation']) || 'Employee';
          } else if (selectedTemplate === 'offerLetter') {
            position = findFieldValue(row, ['Job Title', 'Position', 'Position Title', 'Designation']) || 'Employee';
          } else if (selectedTemplate === 'internshipLetter') {
            position = internPosition || 'Intern';
          } else if (selectedTemplate === 'hikeLetter') {
            position = findFieldValue(row, ['Job Title', 'Position', 'Position Title', 'Designation']) || 'Employee';
          } else if (selectedTemplate === 'paymentReceipt') {
            position = courseName || 'Student';
            employeeName = studentName || recipientName || `Student ${index + 1}`;
          } else {
            position = findFieldValue(row, ['Job Title', 'Position', 'Position Title', 'Designation']) || 'Intern';
          }

          const images = templateImages[selectedTemplate] || templateImages.offerLetter;

          const firstName = recipientName.split(' ')[0] || `Employee ${index + 1}`;

          const cleanedRow = {
            id: index + 1,
            recipientTitle: recipientTitle || 'Mr./Ms.',
            recipientName: recipientName || `Employee ${index + 1}`,
            firstName: firstName,
            employeeName: employeeName || recipientName || `Employee ${index + 1}`,
            email: email || '',
            recipientAddress: recipientAddress || 'Not Provided',
            issueDate: issueDate || new Date().toISOString().split('T')[0],
            internPosition: internPosition || 'Intern',
            startDate: startDate || new Date().toISOString().split('T')[0],
            endDate: endDate || new Date().toISOString().split('T')[0],
            certificateTitle: certificateTitle || (selectedTemplate === 'certificate' ? 'Intern' : ''),
            position: position || 'N/A',
            department: department || 'General',
            salary: salary || '',
            ctc: ctc || '',
            completionDate: completionDate || new Date().toISOString().split('T')[0],
            employeeId: employeeId || 'N/A',
            relievingDate: relievingDate || 'N/A',
            referenceDate: referenceDate || 'N/A',
            internshipDuration: internshipDuration || '3 months',
            mentorName: mentorName || 'N/A',
            referenceNo: referenceNo || '',
            doj: doj || 'N/A',
            location: location || 'Bhubaneswar',
            paymentMode: paymentMode || 'Bank Transfer',
            monthYear: monthYear || '',
            calendarDays: calendarDays || '30',
            paidDays: paidDays || '30',
            lop: lop || '0',
            accountNo: accountNo || '',
            ifscCode: ifscCode || '',
            bonus: bonus || '0',
            employeePf: employeePf || '0',
            employeeEsi: employeeEsi || '0',
            professionalTax: professionalTax || '0',
            totalEarnings: totalEarnings || '',
            deductionAllowance: deductionAllowance || '0',
            netSalary: netSalary || '',
            netSalaryInWords: netSalaryInWords || '',
            probationPeriod: selectedTemplate === 'offerLetter' ? '3 months' : '',
            signatoryName: 'Dayashankar Das',
            signatoryTitle: selectedTemplate === 'relievingLetter' ? 'CEO' : 'Director',
            companyName: 'DAYA Consultancy Services (OPC) Pvt. Ltd.',
            companySubtitle: 'Daya Consultancy Services (OPC) Private Limited',
            companyAddress: 'B-19, Kousalya Bhawan, Saheed Nagar, Bhubaneswar, Odisha, India - 751007',
            headerImage: images.headerImage,
            footerImage: images.footerImage,
            dateOfExit: dateOfExit || formatDateToString(new Date().toISOString().split('T')[0]),
            date: date || formatDateToString(new Date().toISOString().split('T')[0]),
            customTemplate: customTemplate ? DOMPurify.sanitize(customTemplate) : '',
            // PaymentReceiptTemplate fields
            studentName: studentName || `Student ${index + 1}`,
            registrationNo: registrationNo || 'N/A',
            courseName: courseName || 'N/A',
            contact: contact || 'N/A',
            address: address || 'Not Provided',
            duration: duration || 'N/A',
            courseFees: courseFees || '0',
            totalAmountPaid: totalAmountPaid || '0',
            paymentMethod: paymentMethod || 'UPI',
            upiId: upiId || 'N/A',
            authorizedBy: authorizedBy || 'HR Manager',
            companyPhone: companyPhone || '+91 9556261355',
          };

          console.log(`Parsed row ${index + 1}:`, { recipientName: cleanedRow.recipientName, customTemplate: cleanedRow.customTemplate });
          return cleanedRow;
        });

        if (validationErrors.length > 0) {
          alert(`Data validation errors:\n${validationErrors.join('\n')}`);
        } else {
          setExcelData(cleanedData);
          setSelectedRows(new Set());
          alert(`Successfully loaded ${cleanedData.length} records!`);
        }
      } catch (error) {
        alert('Error reading Excel file. Please check the format.');
        console.error('Excel parsing error:', error);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  const saveAllDocuments = async () => {
    if (!selectedTemplate || excelData.length === 0 || selectedRows.size === 0) {
      alert('Please select a template, upload Excel data, and choose at least one record.');
      return;
    }

    setIsSaving(true);

    try {
      let successCount = 0;
      const failedIndices: number[] = [];

      for (const index of selectedRows) {
        if (index < 0 || index >= excelData.length) {
          console.error(`Invalid index: ${index}`);
          failedIndices.push(index + 1);
          continue;
        }

        try {
          const data = excelData[index];
          const templateLabel = templateOptions.find(opt => opt.value === selectedTemplate)?.label || 'Document';
          const safeName = (data.employeeName || data.recipientName)?.replace(/[^a-zA-Z0-9]/g, '_') || 'document';
          const title = `${templateLabel}_${safeName}_${index + 1}`;

          // Deep clone formData to ensure customTemplate is included
          const formDataClone = JSON.parse(JSON.stringify(data));
          console.log(`Saving document for index ${index}, recipient: ${data.recipientName}`);
          console.log(`Title: ${title}, templateType: ${selectedTemplate}`);
          console.log(`CustomTemplate: ${formDataClone.customTemplate || 'Empty'}`);

          const response = await fetch('/api/documents', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              title,
              templateType: selectedTemplate,
              formData: formDataClone,
            }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to save document for ${data.recipientName}: ${errorData.message || response.statusText}`);
          }

          successCount++;
          await new Promise(resolve => setTimeout(resolve, 300));
        } catch (error) {
          console.error(`Error saving record ${index}:`, error);
          failedIndices.push(index + 1);
        }
      }

      if (failedIndices.length > 0) {
        alert(`Saved ${successCount} documents successfully. Failed for records: ${failedIndices.join(', ')}`);
      } else {
        alert(`Successfully saved all ${successCount} documents!`);
      }
    } catch (error) {
      console.error('Fatal error in document saving:', error);
      alert('A critical error occurred while saving. Please check console for details.');
    } finally {
      setIsSaving(false);
    }
  };

  const clearBulkData = () => {
    setExcelData([]);
    setUploadedFileName('');
    setPreviewIndex(null);
    setSelectedRows(new Set());
    setEditIndex(null);
    setEditorOpen(false);
  };

  const toggleRowSelection = (index: number) => {
    const newSelectedRows = new Set(selectedRows);
    if (newSelectedRows.has(index)) {
      newSelectedRows.delete(index);
    } else {
      newSelectedRows.add(index);
    }
    setSelectedRows(newSelectedRows);
  };

  const toggleSelectAll = () => {
    if (selectedRows.size === excelData.length) {
      setSelectedRows(new Set());
    } else {
      const allIndices = new Set(Array.from({ length: excelData.length }, (_, i) => i));
      setSelectedRows(allIndices);
    }
  };

  const handleEdit = (index: number) => {
    if (index < 0 || index >= excelData.length || !selectedTemplate) {
      console.error('Invalid edit index or template:', { index, selectedTemplate });
      alert('Error: Invalid record or template selected.');
      return;
    }
    const TemplateComponent = defaultTemplateComponents[selectedTemplate] || OfferLetterTemplate;
    const data = excelData[index];
    const originalHtml = ReactDOMServer.renderToString(<TemplateComponent formData={data} templateContent={data.customTemplate} />);
    const parser = new DOMParser();
    const doc = parser.parseFromString(originalHtml, 'text/html');
    const mainContent = doc.querySelector('.content');
    const initialContent = DOMPurify.sanitize(data.customTemplate || (mainContent ? mainContent.innerHTML : doc.body.innerHTML));
    console.log(`Opening editor for index ${index}, recipient: ${data.recipientName}, initialContent:`, initialContent);
    setEditIndex(index);
    setEditorOpen(true);
  };

  const handleSaveTemplate = (content: string) => {
    if (editIndex === null || editIndex < 0 || editIndex >= excelData.length) {
      console.error('Invalid editIndex:', editIndex);
      alert('Error: Invalid record selected for saving.');
      return;
    }
    const sanitizedContent = DOMPurify.sanitize(content);
    const newData = [...excelData];
    newData[editIndex] = { ...newData[editIndex], customTemplate: sanitizedContent };
    setExcelData(newData);
    console.log(`Saved customTemplate for index ${editIndex}, recipient: ${newData[editIndex].recipientName}:`, sanitizedContent);
    alert('Template saved successfully!');
    setEditorOpen(false);
    setEditIndex(null);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-6xl max-h-[90vh] overflow-y-auto w-full">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <FileSpreadsheet className="mr-3 h-6 w-6 text-green-600" />
            Excel Bulk Document Generator
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Upload className="mr-2 h-5 w-5" />
              Step 1: Upload Excel File
            </h3>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileUpload}
                className="hidden"
                id="excel-upload"
              />
              <label
                htmlFor="excel-upload"
                className="cursor-pointer flex flex-col items-center"
              >
                <FileSpreadsheet className="h-12 w-12 text-gray-400 mb-2" />
                <span className="text-lg font-medium text-gray-600">
                  Click to upload Excel file
                </span>
                <span className="text-sm text-gray-400 mt-1">
                  Required columns vary by template (optional: customTemplate for custom content):
                  <ul className="text-left mt-2">
                    <li><strong>Internship Letter:</strong> Title, recipientName, email, recipientAddress, issueDate, internPosition, startDate, endDate, customTemplate</li>
                    <li><strong>Offer Letter:</strong> Title, RecipientName, Date, Email, Job Title, Start Date, Monthly Gross Compensation, Annual CTC, customTemplate</li>
                    <li><strong>Certificate:</strong> Title, recipientName, Email, Position Title, internship duration, start date, end date, completion date, Guide Name, Reference Number, customTemplate</li>
                    <li><strong>Experience Certificate:</strong> Title, recipientName, Email, Position, start date, end date, customTemplate</li>
                    <li><strong>Exit Formality:</strong> Title, Employee Name, Email, Employee ID, Department & Position Name, Date of Exit, customTemplate</li>
                    <li><strong>Hike Letter:</strong> Title, recipientName, Email, Employee ID, Monthly Gross Compensation, Annual CTC, Date, Job Title, customTemplate</li>
                    <li><strong>Relieving Letter:</strong> Title, recipientName, Email, Relieving Date, Reference Date, customTemplate</li>
                    <li><strong>Salary Slip:</strong> Title, Employee name, email, date of joining, location, Payment mode, month & year, calendar days, paid days, loss of pay (LOP), Account Number, Bonus, Employee PF, Employee ESI, Professional Tax, Total Earnings, Total Deduction, Net Salary, Net Salary in Words, Employee ID, Job Title, customTemplate</li>
                    <li><strong>Payment Receipt:</strong> studentName, registrationNo, courseName, contact, address, duration, courseFees, totalAmountPaid, paymentMethod, upiId, authorizedBy, companyPhone, customTemplate</li>
                  </ul>
                </span>
              </label>
            </div>
            {uploadedFileName && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
                <p className="text-green-700">
                  <strong>Uploaded:</strong> {uploadedFileName} ({excelData.length} records)
                </p>
              </div>
            )}
          </div>

          {excelData.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Step 2: Select Template
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {templateOptions.map((template) => (
                  <button
                    key={template.value}
                    onClick={() => setSelectedTemplate(template.value)}
                    className={`p-4 border-2 rounded-lg text-left transition-all ${
                      selectedTemplate === template.value ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <FileText className="h-8 w-8 mb-2" />
                    <h4 className="font-semibold">{template.label}</h4>
                  </button>
                ))}
              </div>
            </div>
          )}

          {excelData.length > 0 && selectedTemplate && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Step 3: Preview Data ({excelData.length} records)
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                        <input
                          type="checkbox"
                          checked={selectedRows.size === excelData.length && excelData.length > 0}
                          onChange={toggleSelectAll}
                          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">S.No</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Name</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Email</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Position</th>
                      {['exitFormality'].includes(selectedTemplate) && (
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Department</th>
                      )}
                      {['internshipLetter', 'experienceCertificate'].includes(selectedTemplate) && (
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Start Date</th>
                      )}
                      {['internshipLetter', 'experienceCertificate'].includes(selectedTemplate) && (
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">End Date</th>
                      )}
                      {['offerLetter', 'hikeLetter'].includes(selectedTemplate) && (
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Salary/CTC</th>
                      )}
                      {['exitFormality', 'hikeLetter', 'salarySlip'].includes(selectedTemplate) && (
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Employee ID</th>
                      )}
                      {['relievingLetter', 'exitFormality'].includes(selectedTemplate) && (
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Date of Exit</th>
                      )}
                      {['salarySlip'].includes(selectedTemplate) && (
                        <>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Month & Year</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Total Earnings</th>
                        </>
                      )}
                      {['certificate'].includes(selectedTemplate) && (
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Reference Number</th>
                      )}
                      {['hikeLetter'].includes(selectedTemplate) && (
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Date</th>
                      )}
                      {['paymentReceipt'].includes(selectedTemplate) && (
                        <>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Receipt Number</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Registration Number</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Course Name</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Total Amount Paid</th>
                        </>
                      )}
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {excelData.map((row, index) => (
                      <tr key={row.id} className="border-t border-gray-200">
                        <td className="px-4 py-2">
                          <input
                            type="checkbox"
                            checked={selectedRows.has(index)}
                            onChange={() => toggleRowSelection(index)}
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                        </td>
                        <td className="px-4 py-2 text-sm">{row.id}</td>
                        <td className="px-4 py-2 text-sm font-medium">
                          {row.recipientTitle} {row.recipientName}
                        </td>
                        <td className="px-4 py-2 text-sm">
                          {row.email ? (
                            <span className="text-green-600">{row.email}</span>
                          ) : (
                            <span className="text-red-500">No Email</span>
                          )}
                        </td>
                        <td className="px-4 py-2 text-sm">{row.position || row.certificateTitle || row.internPosition}</td>
                        {['exitFormality'].includes(selectedTemplate) && (
                          <td className="px-4 py-2 text-sm">{row.department}</td>
                        )}
                        {['internshipLetter', 'experienceCertificate'].includes(selectedTemplate) && (
                          <td className="px-4 py-2 text-sm">{row.startDate}</td>
                        )}
                        {['internshipLetter', 'experienceCertificate'].includes(selectedTemplate) && (
                          <td className="px-4 py-2 text-sm">{row.endDate}</td>
                        )}
                        {['offerLetter', 'hikeLetter'].includes(selectedTemplate) && (
                          <td className="px-4 py-2 text-sm">{row.salary || row.ctc}</td>
                        )}
                        {['exitFormality', 'hikeLetter', 'salarySlip'].includes(selectedTemplate) && (
                          <td className="px-4 py-2 text-sm">{row.employeeId}</td>
                        )}
                        {['relievingLetter', 'exitFormality'].includes(selectedTemplate) && (
                          <td className="px-4 py-2 text-sm">{row.dateOfExit || row.relievingDate}</td>
                        )}
                        {['salarySlip'].includes(selectedTemplate) && (
                          <>
                            <td className="px-4 py-2 text-sm">{row.monthYear}</td>
                            <td className="px-4 py-2 text-sm">{row.totalEarnings}</td>
                          </>
                        )}
                        {['certificate'].includes(selectedTemplate) && (
                          <td className="px-4 py-2 text-sm">{row.referenceNo}</td>
                        )}
                        {['hikeLetter'].includes(selectedTemplate) && (
                          <td className="px-4 py-2 text-sm">{row.date}</td>
                        )}
                        {['paymentReceipt'].includes(selectedTemplate) && (
                          <>
                            <td className="px-4 py-2 text-sm">{row.receiptNo}</td>
                            <td className="px-4 py-2 text-sm">{row.registrationNo}</td>
                            <td className="px-4 py-2 text-sm">{row.courseName}</td>
                            <td className="px-4 py-2 text-sm">{row.totalAmountPaid}</td>
                          </>
                        )}
                        <td className="px-4 py-2">
                          <button
                            onClick={() => setPreviewIndex(index)}
                            className="text-blue-600 hover:text-blue-800 mr-2"
                            title="View"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleEdit(index)}
                            className="text-green-600 hover:text-green-800"
                            title="Edit"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {excelData.length > 0 && selectedTemplate && (
            <div className="flex justify-between items-center">
              <button
                onClick={clearBulkData}
                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Clear All
              </button>
              <div className="flex gap-3">
                <button
                  onClick={() => sendDocumentsByEmail(excelData, selectedRows, selectedTemplate, setIsSendingEmails)}
                  disabled={isSendingEmails || selectedRows.size === 0}
                  className="flex items-center px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-green-300"
                >
                  {isSendingEmails ? (
                    <>
                      <Loader className="animate-spin mr-2 h-4 w-4" />
                      Sending Emails...
                    </>
                  ) : (
                    <>
                      <Mail className="mr-2 h-4 w-4" />
                      Send Emails ({selectedRows.size})
                    </>
                  )}
                </button>
                <button
                  onClick={saveAllDocuments}
                  disabled={isSaving || selectedRows.size === 0}
                  className="flex items-center px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:bg-purple-300"
                >
                  {isSaving ? (
                    <>
                      <Loader className="animate-spin mr-2 h-4 w-4" />
                      Saving Documents...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Selected ({selectedRows.size})
                    </>
                  )}
                </button>
                <button
                  onClick={() => generateAllDocuments(excelData, selectedRows, selectedTemplate, setIsProcessing)}
                  disabled={isProcessing || selectedRows.size === 0}
                  className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300"
                >
                  {isProcessing ? (
                    <>
                      <Loader className="animate-spin mr-2 h-4 w-4" />
                      Generating {selectedRows.size} Documents...
                    </>
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" />
                      Download Selected ({selectedRows.size})
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {previewIndex !== null && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-y-auto w-full">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                  <h4 className="text-lg font-semibold">
                    Preview: {excelData[previewIndex]?.recipientName}
                  </h4>
                  <button
                    onClick={() => setPreviewIndex(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <div className="p-6">
                  <div className="content" style={{ padding: '0 30px', minHeight: '297mm' }}>
                    {(() => {
                      if (previewIndex < 0 || previewIndex >= excelData.length) {
                        console.error('Invalid previewIndex:', previewIndex);
                        return <div>Error: Invalid record selected</div>;
                      }
                      const TemplateComponent = defaultTemplateComponents[selectedTemplate] || OfferLetterTemplate;
                      const editedContent = DOMPurify.sanitize(excelData[previewIndex]?.customTemplate || '');
                      console.log(`Rendering preview for index ${previewIndex}, recipient: ${excelData[previewIndex].recipientName}, customTemplate:`, editedContent);
                      return <TemplateComponent formData={excelData[previewIndex]} templateContent={editedContent} />;
                    })()}
                  </div>
                </div>
              </div>
            </div>
          )}

          {editorOpen && editIndex !== null && (
            <TemplateEditor
              initialContent={(() => {
                if (editIndex < 0 || editIndex >= excelData.length) {
                  console.error('Invalid editIndex:', editIndex);
                  return '';
                }
                const TemplateComponent = defaultTemplateComponents[selectedTemplate] || OfferLetterTemplate;
                const data = excelData[editIndex];
                const originalHtml = ReactDOMServer.renderToString(<TemplateComponent formData={data} templateContent={data.customTemplate} />);
                const parser = new DOMParser();
                const doc = parser.parseFromString(originalHtml, 'text/html');
                const mainContent = doc.querySelector('.content');
                const initialContent = DOMPurify.sanitize(data.customTemplate || (mainContent ? mainContent.innerHTML : doc.body.innerHTML));
                console.log(`Editor initial content for index ${editIndex}, recipient: ${data.recipientName}:`, initialContent);
                return initialContent;
              })()}
              onSave={handleSaveTemplate}
              onClose={() => {
                setEditorOpen(false);
                setEditIndex(null);
              }}
            />
          )}

          <div ref={hiddenPdfContentRef} style={{ display: 'none' }} />
        </div>
      </div>
    </div>
  );
};

export default ExcelBulkGenerator;
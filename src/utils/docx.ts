import saveAs from 'file-saver';

export const generateDOCX = async (element: HTMLElement, filename = 'document') => {
  try {
    console.log('Starting DOCX generation...');
    
    // Get HTML content with better formatting
    const htmlContent = element.outerHTML;
    console.log('HTML Content:', htmlContent.substring(0, 200) + '...');
    
    // Create a Word-compatible HTML document
    const wordDocument = `
<!DOCTYPE html>
<html xmlns:o='urn:schemas-microsoft-com:office:office' 
      xmlns:w='urn:schemas-microsoft-com:office:word' 
      xmlns='http://www.w3.org/TR/REC-html40'>
<head>
  <meta charset='utf-8'>
  <title>Document</title>
  <!--[if gte mso 9]>
  <xml>
    <w:WordDocument>
      <w:View>Print</w:View>
      <w:Zoom>100</w:Zoom>
      <w:DoNotPromptForConvert/>
      <w:DoNotShowInsertionsAndDeletions/>
    </w:WordDocument>
  </xml>
  <![endif]-->
  <style>
    @page {
      size: 8.5in 11in;
      margin: 0.75in;
    }
    body {
      font-family: 'Times New Roman', serif;
      font-size: 11pt;
      line-height: 1.4;
      color: #000;
      background: white;
      margin: 0;
      padding: 0;
      width: 7in;
      word-wrap: break-word;
    }
    h1, h2, h3 {
      color: #2563eb;
      margin: 12pt 0 6pt 0;
      font-weight: bold;
    }
    h1 { 
      font-size: 16pt; 
      text-align: center;
    }
    h2 { font-size: 14pt; }
    h3 { font-size: 12pt; }
    p {
      margin: 0 0 6pt 0;
      text-align: justify;
    }
    img {
      max-width: 100%;
      height: auto;
      display: block;
      margin: 0 auto;
    }
    .center {
      text-align: center;
    }
    .header {
      text-align: center;
      margin-bottom: 20pt;
      border-bottom: 1pt solid #2563eb;
      padding-bottom: 10pt;
    }
    .letterhead {
      text-align: center;
      margin-bottom: 20pt;
    }
    .company-logo {
      max-width: 150px;
      height: auto;
      margin: 0 auto 10pt auto;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 10pt 0;
    }
    th, td {
      border: 0.5pt solid #000;
      padding: 4pt;
      text-align: left;
    }
    th {
      background-color: #f0f0f0;
      font-weight: bold;
    }
  </style>
</head>
<body>
  ${htmlContent}
</body>
</html>`;

    // Create blob with BOM for proper encoding
    const blob = new Blob(['\ufeff', wordDocument], {
      type: 'application/msword;charset=utf-8'
    });
    
    // Generate filename with timestamp
    const timestamp = new Date().toISOString().slice(0, 19).replace(/[:-]/g, '');
    const finalFilename = `${filename}_${timestamp}.doc`;
    
    // Create download link
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = finalFilename;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    // Clean up
    setTimeout(() => {
      window.URL.revokeObjectURL(url);
    }, 100);
    
    console.log('DOCX file generated:', finalFilename);
    return finalFilename;
    
  } catch (error) {
    console.error('DOCX generation failed:', error);
    throw new Error('Failed to generate Word document: ' + error.message);
  }
};

// Alternative simpler approach using HTML to RTF conversion
export const generateSimpleDOCX = async (element: HTMLElement, filename = 'document') => {
  try {
    // Get the HTML content
    const htmlContent = element.innerHTML;
    
    // Create RTF content (Rich Text Format - compatible with Word)
    const rtfContent = `{\\rtf1\\ansi\\deff0 {\\fonttbl {\\f0 Times New Roman;}}
\\f0\\fs22 
${htmlContent.replace(/<[^>]*>/g, '').replace(/\n/g, '\\line ')}
}`;

    // Create blob
    const blob = new Blob([rtfContent], {
      type: 'application/rtf'
    });

    // Generate filename
    const timestamp = new Date().toISOString().slice(0, 19).replace(/[:-]/g, '');
    const finalFilename = `${filename}_${timestamp}.rtf`;

    // Save file
    saveAs(blob, finalFilename);

    return finalFilename;
  } catch (error) {
    console.error('Simple DOCX generation failed:', error);
    throw new Error('Failed to generate document: ' + error.message);
  }
};
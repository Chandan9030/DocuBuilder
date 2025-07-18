// utils/pdf.js
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export const generatePDF = async (element, filename = 'document') => {
  try {
    // Ensure the element is visible and properly sized
    const originalStyle = {
      position: element.style.position,
      left: element.style.left,
      top: element.style.top,
      visibility: element.style.visibility,
      zIndex: element.style.zIndex
    };

    // Make element visible for capture
    element.style.position = 'fixed';
    element.style.left = '0';
    element.style.top = '0';
    element.style.visibility = 'visible';
    element.style.zIndex = '10000';

    // Wait for any fonts/images to load
    await new Promise(resolve => setTimeout(resolve, 100));

    // Get actual content height to avoid extra blank space
    const actualHeight = element.scrollHeight;
    const actualWidth = element.scrollWidth;

    // Generate canvas from the element with optimized settings
    const canvas = await html2canvas(element, {
      scale: 1.5, // Reduced from 2 to decrease file size
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: actualWidth,
      height: actualHeight, // Use actual content height
      scrollX: 0,
      scrollY: 0,
      windowWidth: actualWidth,
      windowHeight: actualHeight,
      removeContainer: true,
      imageTimeout: 0,
      logging: false // Disable logging to improve performance
    });

    // Restore original styles
    Object.keys(originalStyle).forEach(key => {
      element.style[key] = originalStyle[key];
    });

    // Calculate PDF dimensions with margins
    const pageWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const margin = -20; // Margin in mm
    const contentWidth = pageWidth - (margin * 1 * 2);
    const contentHeight = pageHeight - (margin * 2 + 10); // Adjusted for header/footer space

    console.log("pdf dimensions:", {
      pageWidth,
      pageHeight,
      contentWidth,
      contentHeight,
      canvasWidth: canvas.width,
      canvasHeight: canvas.height
    });
    
    // Calculate scaled dimensions
    const imgWidth = contentWidth;
    const imgHeight = (canvas.height * contentWidth) / canvas.width;
    
    // Create PDF with compression
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true // Enable compression to reduce file size
    });

    // Convert canvas to compressed JPEG instead of PNG for smaller size
    const imgData = canvas.toDataURL('image/jpeg', 0.85); // 85% quality
    
    if (imgHeight <= contentHeight) {
      // Single page - fits within one page
      pdf.addImage(imgData, 'JPEG', margin, margin, imgWidth, imgHeight);
    } else {
      // Multiple pages - split content properly
      let heightLeft = imgHeight;
      let position = margin;
      let pageCount = 0;
      
      while (heightLeft > 0) {
        if (pageCount > 0) {
          pdf.addPage();
        }
        
        const currentPageHeight = Math.min(heightLeft, contentHeight);
        
        // Only add image if there's meaningful content
        if (currentPageHeight > 5) { // Minimum 5mm content to avoid blank pages
          pdf.addImage(imgData, 'JPEG', margin, position, imgWidth, imgHeight);
        }
        
        heightLeft -= contentHeight;
        position -= contentHeight;
        pageCount++;
        
        // Safety check to prevent infinite loop
        if (pageCount > 10) {
          console.warn('PDF generation stopped at 10 pages to prevent infinite loop');
          break;
        }
      }
    }

    // Generate filename with timestamp
    const timestamp = new Date().toISOString().slice(0, 19).replace(/[:-]/g, '');
    const finalFilename = `${filename}_${timestamp}.pdf`;

    console.log('PDF generated successfulxsafdsadfdfadly:', finalFilename);

    // Download the PDF
    pdf.save(finalFilename);
    
    return finalFilename;
  } catch (error) {
    console.error('PDF generation failed:', error);
    throw new Error('Failed to generate PDF: ' + error.message);
  }
};
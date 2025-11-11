import html2pdf from 'html2pdf.js';
import { ManagerialCharter } from '@/types/charter';

export const generatePDF = async (charter: ManagerialCharter) => {
  const element = document.getElementById('charter-summary');
  
  const options = {
    margin: 10,
    filename: `charte-manageriale-${new Date().toISOString().split('T')[0]}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { 
      scale: 2,
      useCORS: true,
      letterRendering: true
    },
    jsPDF: { 
      unit: 'mm', 
      format: 'a4', 
      orientation: 'portrait' 
    },
    pagebreak: { 
      mode: 'avoid-all',
      avoid: '.print\\:break-inside-avoid'
    }
  };

  return html2pdf().set(options).from(element).save();
};

import { ManagerialCharter } from '@/types/charter';

export const generatePDF = async (charter: ManagerialCharter): Promise<void> => {
  // Import html2pdf dynamically
  const html2pdf = (await import('html2pdf.js')).default;
  
  const element = document.getElementById('charter-summary');
  if (!element) {
    throw new Error('Élément de synthèse non trouvé');
  }

  const opt = {
    margin: 1,
    filename: 'ma-charte-manageriale.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
  };

  try {
    await html2pdf().set(opt).from(element).save();
  } catch (error) {
    console.error('Erreur lors de la génération du PDF:', error);
    throw new Error('Impossible de générer le PDF');
  }
};
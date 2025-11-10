import { ManagerialCharter } from '@/types/charter';

const STORAGE_KEY = 'managerial_charter';

export const saveCharter = (charter: ManagerialCharter): void => {
  try {
    const charterWithTimestamp = {
      ...charter,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(charterWithTimestamp));
  } catch (error) {
    console.error('Erreur lors de la sauvegarde:', error);
  }
};

export const loadCharter = (): ManagerialCharter | null => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error('Erreur lors du chargement:', error);
  }
  return null;
};

export const createEmptyCharter = (): ManagerialCharter => {
  return {
    managerType: '',
    managerDescription: '',
    selectedValues: [],
    customValues: [],
    preferredPosture: '',
    teamVision: '',
    desiredPhrases: ['', '', ''],
    actionPlan: {
      thirtyDays: '',
      sixtyDays: '',
      ninetyDays: '',
      selectedActions: {
        thirtyDays: [],
        sixtyDays: [],
        ninetyDays: []
      }
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
};

export const clearCharter = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Erreur lors de la suppression:', error);
  }
};
import React, { useState, useEffect } from 'react';
import WelcomePage from '@/components/WelcomePage';
import Step1 from '@/components/Step1';
import Step2 from '@/components/Step2';
import Step3 from '@/components/Step3';
import Step4 from '@/components/Step4';
import Step5 from '@/components/Step5';
import Step6 from '@/components/Step6';
import SummaryPage from '@/components/SummaryPage';
import ProgressBar from '@/components/ProgressBar';
import { ManagerialCharter } from '@/types/charter';
import { saveCharter, loadCharter, createEmptyCharter, clearCharter } from '@/utils/storage';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0); // 0 = welcome, 1-6 = steps, 7 = summary
  const [charter, setCharter] = useState<ManagerialCharter>(createEmptyCharter());
  const { toast } = useToast();

  // Charger les données sauvegardées au démarrage
  useEffect(() => {
    const savedCharter = loadCharter();
    if (savedCharter) {
      setCharter(savedCharter);
      toast({
        title: "Données restaurées",
        description: "Vos informations précédentes ont été récupérées.",
      });
    }
  }, []);

  // Sauvegarder automatiquement les modifications
  useEffect(() => {
    if (currentStep > 0) {
      saveCharter(charter);
    }
  }, [charter, currentStep]);

  const handleStart = () => {
    setCurrentStep(1);
  };

  const handleNext = () => {
    if (currentStep < 7) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRestart = () => {
    clearCharter();
    setCharter(createEmptyCharter());
    setCurrentStep(0);
    toast({
      title: "Charte réinitialisée",
      description: "Vous pouvez recommencer votre charte.",
    });
  };

  const updateCharter = (updates: Partial<ManagerialCharter>) => {
    setCharter(prev => ({ ...prev, ...updates }));
  };

  if (currentStep === 0) {
    return <WelcomePage onStart={handleStart} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-coral-50">
      {/* Header avec progression */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-center text-gray-900 mb-6">
            Ma Charte Managériale
          </h1>
          {currentStep < 7 && (
            <ProgressBar currentStep={currentStep} totalSteps={7} />
          )}
        </div>
      </div>

      {/* Contenu principal */}
      <div className="py-8">
        {currentStep === 1 && (
          <Step1
            managerType={charter.managerType}
            managerDescription={charter.managerDescription}
            onManagerTypeChange={(type) => updateCharter({ managerType: type })}
            onDescriptionChange={(description) => updateCharter({ managerDescription: description })}
            onNext={handleNext}
          />
        )}

        {currentStep === 2 && (
          <Step2
            selectedValues={charter.selectedValues}
            customValues={charter.customValues}
            onValuesChange={(values) => updateCharter({ selectedValues: values })}
            onCustomValuesChange={(values) => updateCharter({ customValues: values })}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        )}

        {currentStep === 3 && (
          <Step3
            preferredPosture={charter.preferredPosture}
            onPostureChange={(posture) => updateCharter({ preferredPosture: posture as any })}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        )}

        {currentStep === 4 && (
          <Step4
            teamVision={charter.teamVision}
            onTeamVisionChange={(vision) => updateCharter({ teamVision: vision })}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        )}

        {currentStep === 5 && (
          <Step5
            desiredPhrases={charter.desiredPhrases}
            onPhrasesChange={(phrases) => updateCharter({ desiredPhrases: phrases })}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        )}

        {currentStep === 6 && (
          <Step6
            actionPlan={charter.actionPlan}
            onActionPlanChange={(plan) => updateCharter({ actionPlan: plan })}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        )}

        {currentStep === 7 && (
          <SummaryPage
            charter={charter}
            onRestart={handleRestart}
            onPrevious={handlePrevious}
          />
        )}
      </div>
    </div>
  );
};

export default Index;

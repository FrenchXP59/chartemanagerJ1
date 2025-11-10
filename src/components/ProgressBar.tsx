import React from 'react';
import { Progress } from '@/components/ui/progress';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100;
  
  const steps = [
    'Identité',
    'Valeurs', 
    'Posture',
    'Vision',
    'Phrases',
    'Plan d\'action',
    'Synthèse'
  ];

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      {/* Barre de progression */}
      <div className="mb-4">
        <Progress value={progress} className="h-2" />
      </div>
      
      {/* Étapes */}
      <div className="flex justify-between text-sm">
        {steps.map((step, index) => (
          <div 
            key={index}
            className={`text-center ${
              index < currentStep 
                ? 'text-blue-600 font-semibold' 
                : index === currentStep
                ? 'text-coral-500 font-semibold'
                : 'text-gray-400'
            }`}
          >
            <div className={`w-8 h-8 rounded-full mx-auto mb-1 flex items-center justify-center text-xs font-bold ${
              index < currentStep
                ? 'bg-blue-600 text-white'
                : index === currentStep
                ? 'bg-coral-500 text-white'
                : 'bg-gray-200 text-gray-400'
            }`}>
              {index + 1}
            </div>
            <span className="hidden sm:inline">{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
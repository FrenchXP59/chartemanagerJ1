import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { POSTURES } from '@/types/charter';

interface Step3Props {
  preferredPosture: string;
  onPostureChange: (posture: string) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const Step3: React.FC<Step3Props> = ({
  preferredPosture,
  onPostureChange,
  onNext,
  onPrevious
}) => {
  const canProceed = preferredPosture !== '';

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Ma posture préférée
        </h2>
        <p className="text-lg text-gray-600">
          Sélectionnez la posture qui vous correspond le mieux
        </p>
      </div>

      {/* Image d'illustration */}
      <div className="text-center mb-8">
        <img 
          src="/images/management_styles_3.jpeg" 
          alt="Styles de management"
          className="mx-auto rounded-lg shadow-md max-w-md w-full h-auto"
        />
      </div>

      {/* Sélection des postures */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {POSTURES.map((posture) => (
          <Card 
            key={posture.id}
            className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
              preferredPosture === posture.id 
                ? 'ring-2 ring-blue-500 bg-blue-50 shadow-lg' 
                : 'hover:bg-gray-50'
            }`}
            onClick={() => onPostureChange(posture.id)}
          >
            <CardHeader className="text-center">
              <div className="text-4xl mb-2">{posture.icon}</div>
              <CardTitle className="text-xl">{posture.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center">{posture.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Description détaillée de la posture sélectionnée */}
      {preferredPosture && (
        <Card className="mb-8 bg-gradient-to-r from-blue-50 to-coral-50">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">
                Vous avez choisi : {POSTURES.find(p => p.id === preferredPosture)?.title}
              </h3>
              <p className="text-gray-700">
                {POSTURES.find(p => p.id === preferredPosture)?.description}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        <Button 
          onClick={onPrevious}
          variant="outline"
          className="px-8 py-2"
        >
          Précédent
        </Button>
        <Button 
          onClick={onNext}
          disabled={!canProceed}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2"
        >
          Suivant
        </Button>
      </div>
    </div>
  );
};

export default Step3;
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { MANAGEMENT_STYLES } from '@/types/charter';

interface Step1Props {
  managerType: string;
  managerDescription: string;
  onManagerTypeChange: (type: string) => void;
  onDescriptionChange: (description: string) => void;
  onNext: () => void;
}

const Step1: React.FC<Step1Props> = ({
  managerType,
  managerDescription,
  onManagerTypeChange,
  onDescriptionChange,
  onNext
}) => {
  const canProceed = managerDescription.trim().length > 0;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Mon identité managériale
        </h2>
        <p className="text-lg text-gray-600">
          Définissez le type de manager que vous souhaitez incarner
        </p>
      </div>

      {/* Question principale */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl">
            Quel type de manager souhaitez-vous incarner ?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Décrivez en quelques phrases le manager que vous voulez être..."
            value={managerDescription}
            onChange={(e) => onDescriptionChange(e.target.value)}
            className="min-h-32 text-base"
          />
        </CardContent>
      </Card>

      {/* Suggestions de styles */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-center">
          Ou inspirez-vous de ces styles managériaux
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {MANAGEMENT_STYLES.map((style) => (
            <Card 
              key={style.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                managerType === style.id 
                  ? 'ring-2 ring-blue-500 bg-blue-50' 
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => onManagerTypeChange(style.id)}
            >
              <CardContent className="p-4 text-center">
                <div className="text-3xl mb-2">{style.icon}</div>
                <h4 className="font-semibold text-lg mb-2">{style.title}</h4>
                <p className="text-sm text-gray-600">{style.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-end">
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

export default Step1;
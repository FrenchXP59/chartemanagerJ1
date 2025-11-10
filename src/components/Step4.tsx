import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface Step4Props {
  teamVision: string;
  onTeamVisionChange: (vision: string) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const Step4: React.FC<Step4Props> = ({
  teamVision,
  onTeamVisionChange,
  onNext,
  onPrevious
}) => {
  const canProceed = teamVision.trim().length > 0;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Ma vision idéale de l'équipe
        </h2>
        <p className="text-lg text-gray-600">
          Décrivez l'ambiance et l'environnement de travail que vous souhaitez créer
        </p>
      </div>

      {/* Image d'illustration */}
      <div className="text-center mb-8">
        <img 
          src="/images/team_collaboration_2.jpeg" 
          alt="Collaboration d'équipe"
          className="mx-auto rounded-xl shadow-lg max-w-2xl w-full h-auto"
        />
      </div>

      {/* Question principale */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl text-center">
            Quel type d'ambiance d'équipe souhaitez-vous créer ?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Décrivez votre vision idéale : l'atmosphère de travail, les relations entre collègues, la façon de collaborer, les valeurs partagées..."
            value={teamVision}
            onChange={(e) => onTeamVisionChange(e.target.value)}
            className="min-h-40 text-base"
          />
        </CardContent>
      </Card>

      {/* Suggestions d'inspiration */}
      <Card className="mb-8 bg-gradient-to-r from-blue-50 to-coral-50">
        <CardHeader>
          <CardTitle className="text-lg">💡 Quelques pistes de réflexion</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Ambiance de travail :</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>Conviviale et bienveillante</li>
                <li>Dynamique et stimulante</li>
                <li>Sereine et organisée</li>
                <li>Créative et innovante</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Relations d'équipe :</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>Entraide et solidarité</li>
                <li>Communication ouverte</li>
                <li>Respect mutuel</li>
                <li>Partage des connaissances</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

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

export default Step4;
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, RefreshCw } from 'lucide-react';
import { SUGGESTED_PHRASES } from '@/types/charter';

interface Step5Props {
  desiredPhrases: [string, string, string];
  onPhrasesChange: (phrases: [string, string, string]) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const Step5: React.FC<Step5Props> = ({
  desiredPhrases,
  onPhrasesChange,
  onNext,
  onPrevious
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [currentSuggestionIndex, setCurrentSuggestionIndex] = useState(0);
  
  const canProceed = desiredPhrases.every(phrase => phrase.trim().length > 0);

  const updatePhrase = (index: number, value: string) => {
    const newPhrases = [...desiredPhrases] as [string, string, string];
    newPhrases[index] = value;
    onPhrasesChange(newPhrases);
  };

  const getRandomSuggestions = () => {
    const shuffled = [...SUGGESTED_PHRASES].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  };

  const applySuggestion = (phrase: string, index: number) => {
    updatePhrase(index, phrase);
  };

  const generateNewSuggestions = () => {
    setCurrentSuggestionIndex(prev => (prev + 3) % SUGGESTED_PHRASES.length);
  };

  const currentSuggestions = getRandomSuggestions();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          3 phrases que j'aimerais entendre de mon équipe
        </h2>
        <p className="text-lg text-gray-600">
          Quels retours positifs aimeriez-vous recevoir de vos collaborateurs ?
        </p>
      </div>

      {/* Saisie des phrases */}
      <div className="space-y-6 mb-8">
        {desiredPhrases.map((phrase, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Badge variant="outline" className="mr-3">
                  {index + 1}
                </Badge>
                Phrase {index + 1}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                placeholder={`"${currentSuggestions[index] || 'Votre phrase souhaitée...'}"`}
                value={phrase}
                onChange={(e) => updatePhrase(index, e.target.value)}
                className="text-base py-3"
              />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Suggestions */}
      <Card className="mb-8 bg-gradient-to-r from-blue-50 to-coral-50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center justify-between">
            <div className="flex items-center">
              <Lightbulb className="mr-2 h-5 w-5 text-yellow-500" />
              Phrases d'inspiration
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSuggestions(!showSuggestions)}
            >
              {showSuggestions ? 'Masquer' : 'Afficher'}
            </Button>
          </CardTitle>
        </CardHeader>
        {showSuggestions && (
          <CardContent>
            <div className="space-y-3">
              {currentSuggestions.map((suggestion, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <span className="text-gray-700 italic">"{suggestion}"</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => applySuggestion(suggestion, index)}
                    className="ml-2"
                  >
                    Utiliser
                  </Button>
                </div>
              ))}
              <div className="text-center pt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={generateNewSuggestions}
                  className="text-blue-600 hover:text-blue-700"
                >
                  <RefreshCw className="mr-1 h-4 w-4" />
                  Nouvelles suggestions
                </Button>
              </div>
            </div>
          </CardContent>
        )}
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

export default Step5;
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, X } from 'lucide-react';
import { PREDEFINED_VALUES } from '@/types/charter';

interface Step2Props {
  selectedValues: string[];
  customValues: string[];
  onValuesChange: (values: string[]) => void;
  onCustomValuesChange: (values: string[]) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const Step2: React.FC<Step2Props> = ({
  selectedValues,
  customValues,
  onValuesChange,
  onCustomValuesChange,
  onNext,
  onPrevious
}) => {
  const [newValue, setNewValue] = useState('');
  
  const allSelectedValues = [...selectedValues, ...customValues];
  const canProceed = allSelectedValues.length >= 3;

  const toggleValue = (value: string) => {
    if (selectedValues.includes(value)) {
      onValuesChange(selectedValues.filter(v => v !== value));
    } else if (allSelectedValues.length < 3) {
      onValuesChange([...selectedValues, value]);
    }
  };

  const addCustomValue = () => {
    if (newValue.trim() && !allSelectedValues.includes(newValue.trim()) && allSelectedValues.length < 3) {
      onCustomValuesChange([...customValues, newValue.trim()]);
      setNewValue('');
    }
  };

  const removeCustomValue = (value: string) => {
    onCustomValuesChange(customValues.filter(v => v !== value));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Mes 3 valeurs clés
        </h2>
        <p className="text-lg text-gray-600">
          Choisissez 3 valeurs qui guideront votre management
        </p>
        <div className="mt-4">
          <Badge variant="outline" className="text-lg px-4 py-2">
            {allSelectedValues.length}/3 valeurs sélectionnées
          </Badge>
        </div>
      </div>

      {/* Valeurs sélectionnées */}
      {allSelectedValues.length > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Vos valeurs sélectionnées</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {selectedValues.map((value) => (
                <Badge 
                  key={value}
                  variant="default"
                  className="bg-blue-600 hover:bg-blue-700 cursor-pointer px-3 py-1"
                  onClick={() => toggleValue(value)}
                >
                  {value} <X className="ml-1 h-3 w-3" />
                </Badge>
              ))}
              {customValues.map((value) => (
                <Badge 
                  key={value}
                  variant="default"
                  className="bg-coral-500 hover:bg-coral-600 cursor-pointer px-3 py-1"
                  onClick={() => removeCustomValue(value)}
                >
                  {value} <X className="ml-1 h-3 w-3" />
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Valeurs prédéfinies */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Valeurs suggérées</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {PREDEFINED_VALUES.map((value) => (
              <Button
                key={value}
                variant={selectedValues.includes(value) ? "default" : "outline"}
                className={`h-auto py-3 px-4 text-sm ${
                  selectedValues.includes(value)
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : allSelectedValues.length >= 3
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-blue-50'
                }`}
                onClick={() => toggleValue(value)}
                disabled={!selectedValues.includes(value) && allSelectedValues.length >= 3}
              >
                {value}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Ajouter une valeur personnalisée */}
      {allSelectedValues.length < 3 && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg">Ajouter votre propre valeur</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                placeholder="Votre valeur personnalisée..."
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addCustomValue()}
                className="flex-1"
              />
              <Button 
                onClick={addCustomValue}
                disabled={!newValue.trim() || allSelectedValues.includes(newValue.trim())}
                className="bg-coral-500 hover:bg-coral-600"
              >
                <Plus className="h-4 w-4" />
              </Button>
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

export default Step2;
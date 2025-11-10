import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar, Target, Zap } from 'lucide-react';
import { ACTION_SUGGESTIONS } from '@/types/charter';

interface Step6Props {
  actionPlan: {
    thirtyDays: string;
    sixtyDays: string;
    ninetyDays: string;
    selectedActions: {
      thirtyDays: string[];
      sixtyDays: string[];
      ninetyDays: string[];
    };
  };
  onActionPlanChange: (plan: any) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const Step6: React.FC<Step6Props> = ({
  actionPlan,
  onActionPlanChange,
  onNext,
  onPrevious
}) => {
  const canProceed = 
    actionPlan.thirtyDays.trim().length > 0 ||
    actionPlan.sixtyDays.trim().length > 0 ||
    actionPlan.ninetyDays.trim().length > 0 ||
    actionPlan.selectedActions.thirtyDays.length > 0 ||
    actionPlan.selectedActions.sixtyDays.length > 0 ||
    actionPlan.selectedActions.ninetyDays.length > 0;

  const updateTextPlan = (period: string, value: string) => {
    onActionPlanChange({
      ...actionPlan,
      [period]: value
    });
  };

  const toggleAction = (period: 'thirtyDays' | 'sixtyDays' | 'ninetyDays', action: string) => {
    const currentActions = actionPlan.selectedActions[period];
    const newActions = currentActions.includes(action)
      ? currentActions.filter(a => a !== action)
      : [...currentActions, action];
    
    onActionPlanChange({
      ...actionPlan,
      selectedActions: {
        ...actionPlan.selectedActions,
        [period]: newActions
      }
    });
  };

  const periods = [
    {
      key: 'thirtyDays' as const,
      title: '30 jours',
      subtitle: 'Mise en place',
      icon: <Zap className="h-6 w-6 text-green-500" />,
      color: 'from-green-50 to-green-100',
      suggestions: ACTION_SUGGESTIONS.thirtyDays
    },
    {
      key: 'sixtyDays' as const,
      title: '60 jours', 
      subtitle: 'Développement',
      icon: <Target className="h-6 w-6 text-blue-500" />,
      color: 'from-blue-50 to-blue-100',
      suggestions: ACTION_SUGGESTIONS.sixtyDays
    },
    {
      key: 'ninetyDays' as const,
      title: '90 jours',
      subtitle: 'Consolidation',
      icon: <Calendar className="h-6 w-6 text-purple-500" />,
      color: 'from-purple-50 to-purple-100',
      suggestions: ACTION_SUGGESTIONS.ninetyDays
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Mon plan d'action 30 / 60 / 90 jours
        </h2>
        <p className="text-lg text-gray-600">
          Définissez vos priorités pour les 3 premiers mois
        </p>
      </div>

      {/* Timeline visuelle */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center space-x-4">
          {periods.map((period, index) => (
            <React.Fragment key={period.key}>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-coral-500 flex items-center justify-center text-white font-bold">
                  {index + 1}
                </div>
                <span className="text-sm font-medium mt-2">{period.title}</span>
              </div>
              {index < periods.length - 1 && (
                <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-coral-500 rounded"></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Plans d'action par période */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {periods.map((period) => (
          <Card key={period.key} className={`bg-gradient-to-br ${period.color}`}>
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                {period.icon}
                <div className="ml-3">
                  <div>{period.title}</div>
                  <div className="text-sm font-normal text-gray-600">{period.subtitle}</div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Zone de texte libre */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Vos objectifs personnalisés :
                </label>
                <Textarea
                  placeholder="Décrivez vos priorités pour cette période..."
                  value={actionPlan[period.key]}
                  onChange={(e) => updateTextPlan(period.key, e.target.value)}
                  className="min-h-24 text-sm bg-white/80"
                />
              </div>

              {/* Suggestions à cocher */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Actions suggérées :
                </label>
                <div className="space-y-2">
                  {period.suggestions.map((suggestion) => (
                    <div key={suggestion} className="flex items-start space-x-2">
                      <Checkbox
                        id={`${period.key}-${suggestion}`}
                        checked={actionPlan.selectedActions[period.key].includes(suggestion)}
                        onCheckedChange={() => toggleAction(period.key, suggestion)}
                        className="mt-1"
                      />
                      <label 
                        htmlFor={`${period.key}-${suggestion}`}
                        className="text-sm text-gray-700 cursor-pointer leading-relaxed"
                      >
                        {suggestion}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

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
          Voir ma charte
        </Button>
      </div>
    </div>
  );
};

export default Step6;
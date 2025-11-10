import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Download, Mail, RotateCcw, CheckCircle } from 'lucide-react';
import { ManagerialCharter, POSTURES, MANAGEMENT_STYLES } from '@/types/charter';
import { generatePDF } from '@/utils/pdf';
import { useToast } from '@/hooks/use-toast';

interface SummaryPageProps {
  charter: ManagerialCharter;
  onRestart: () => void;
  onPrevious: () => void;
}

const SummaryPage: React.FC<SummaryPageProps> = ({
  charter,
  onRestart,
  onPrevious
}) => {
  const [email, setEmail] = useState('');
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const { toast } = useToast();

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    try {
      await generatePDF(charter);
      toast({
        title: "PDF généré avec succès",
        description: "Votre charte managériale a été téléchargée.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de générer le PDF. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleSendEmail = () => {
    if (!email.trim()) {
      toast({
        title: "Email requis",
        description: "Veuillez saisir une adresse email valide.",
        variant: "destructive",
      });
      return;
    }

    // Simulation d'envoi d'email (pas de backend dans cette version)
    const subject = encodeURIComponent("Ma Charte Managériale");
    const body = encodeURIComponent(`
Bonjour,

Voici ma charte managériale créée avec l'application interactive :

IDENTITÉ MANAGÉRIALE :
${charter.managerDescription}

MES VALEURS :
${[...charter.selectedValues, ...charter.customValues].join(', ')}

MA POSTURE :
${POSTURES.find(p => p.id === charter.preferredPosture)?.title || charter.preferredPosture}

VISION D'ÉQUIPE :
${charter.teamVision}

Cordialement
    `);
    
    window.open(`mailto:${email}?subject=${subject}&body=${body}`);
    
    toast({
      title: "Email préparé",
      description: "Votre client email va s'ouvrir avec le contenu pré-rempli.",
    });
  };

  const selectedPosture = POSTURES.find(p => p.id === charter.preferredPosture);
  const selectedStyle = MANAGEMENT_STYLES.find(s => s.id === charter.managerType);
  const allValues = [...charter.selectedValues, ...charter.customValues];

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* En-tête */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <CheckCircle className="h-8 w-8 text-green-500 mr-3" />
          <h2 className="text-3xl font-bold text-gray-900">
            Votre charte managériale
          </h2>
        </div>
        <p className="text-lg text-gray-600">
          Félicitations ! Votre charte personnalisée est prête
        </p>
      </div>

      {/* Contenu de la charte pour PDF */}
      <div id="charter-summary" className="bg-white">
        {/* En-tête de la charte */}
        <div className="text-center mb-8 p-6 bg-gradient-to-r from-blue-50 to-coral-50 rounded-xl">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Ma Charte Managériale
          </h1>
          <p className="text-gray-600">
            Créée le {new Date(charter.createdAt).toLocaleDateString('fr-FR')}
          </p>
        </div>

        {/* Section 1 - Identité */}
        <Card className="mb-6">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-coral-500 text-white">
            <CardTitle className="text-xl flex items-center">
              <span className="text-2xl mr-3">🎯</span>
              Mon identité managériale
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {selectedStyle && (
              <div className="mb-4">
                <Badge variant="outline" className="text-lg px-4 py-2 mb-3">
                  Style : {selectedStyle.title}
                </Badge>
              </div>
            )}
            <p className="text-gray-700 leading-relaxed text-lg">
              {charter.managerDescription}
            </p>
          </CardContent>
        </Card>

        {/* Section 2 - Valeurs */}
        <Card className="mb-6">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-coral-500 text-white">
            <CardTitle className="text-xl flex items-center">
              <span className="text-2xl mr-3">⭐</span>
              Mes valeurs clés
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-3">
              {allValues.map((value, index) => (
                <Badge 
                  key={index}
                  variant="default"
                  className="text-lg px-4 py-2 bg-blue-100 text-blue-800 hover:bg-blue-200"
                >
                  {value}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Section 3 - Posture */}
        <Card className="mb-6">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-coral-500 text-white">
            <CardTitle className="text-xl flex items-center">
              <span className="text-2xl mr-3">👤</span>
              Ma posture préférée
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {selectedPosture && (
              <div className="text-center">
                <div className="text-4xl mb-3">{selectedPosture.icon}</div>
                <h3 className="text-2xl font-semibold mb-2">{selectedPosture.title}</h3>
                <p className="text-gray-700 text-lg">{selectedPosture.description}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Section 4 - Vision d'équipe */}
        <Card className="mb-6">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-coral-500 text-white">
            <CardTitle className="text-xl flex items-center">
              <span className="text-2xl mr-3">🤝</span>
              Ma vision de l'équipe
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-700 leading-relaxed text-lg">
              {charter.teamVision}
            </p>
          </CardContent>
        </Card>

        {/* Section 5 - Phrases souhaitées */}
        <Card className="mb-6">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-coral-500 text-white">
            <CardTitle className="text-xl flex items-center">
              <span className="text-2xl mr-3">💬</span>
              Ce que j'aimerais entendre
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {charter.desiredPhrases.map((phrase, index) => (
                <div key={index} className="flex items-start">
                  <Badge variant="outline" className="mr-3 mt-1">
                    {index + 1}
                  </Badge>
                  <p className="text-gray-700 italic text-lg">"{phrase}"</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Section 6 - Plan d'action */}
        <Card className="mb-6">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-coral-500 text-white">
            <CardTitle className="text-xl flex items-center">
              <span className="text-2xl mr-3">📅</span>
              Mon plan d'action 30/60/90 jours
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              {/* 30 jours */}
              <div>
                <h4 className="text-lg font-semibold text-green-600 mb-2 flex items-center">
                  <span className="mr-2">🚀</span>
                  30 jours - Mise en place
                </h4>
                {charter.actionPlan.thirtyDays && (
                  <p className="text-gray-700 mb-2">{charter.actionPlan.thirtyDays}</p>
                )}
                {charter.actionPlan.selectedActions.thirtyDays.length > 0 && (
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    {charter.actionPlan.selectedActions.thirtyDays.map((action, index) => (
                      <li key={index}>{action}</li>
                    ))}
                  </ul>
                )}
              </div>

              <Separator />

              {/* 60 jours */}
              <div>
                <h4 className="text-lg font-semibold text-blue-600 mb-2 flex items-center">
                  <span className="mr-2">🎯</span>
                  60 jours - Développement
                </h4>
                {charter.actionPlan.sixtyDays && (
                  <p className="text-gray-700 mb-2">{charter.actionPlan.sixtyDays}</p>
                )}
                {charter.actionPlan.selectedActions.sixtyDays.length > 0 && (
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    {charter.actionPlan.selectedActions.sixtyDays.map((action, index) => (
                      <li key={index}>{action}</li>
                    ))}
                  </ul>
                )}
              </div>

              <Separator />

              {/* 90 jours */}
              <div>
                <h4 className="text-lg font-semibold text-purple-600 mb-2 flex items-center">
                  <span className="mr-2">📈</span>
                  90 jours - Consolidation
                </h4>
                {charter.actionPlan.ninetyDays && (
                  <p className="text-gray-700 mb-2">{charter.actionPlan.ninetyDays}</p>
                )}
                {charter.actionPlan.selectedActions.ninetyDays.length > 0 && (
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    {charter.actionPlan.selectedActions.ninetyDays.map((action, index) => (
                      <li key={index}>{action}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="space-y-6 mt-8">
        {/* Export PDF */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Télécharger votre charte</CardTitle>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={handleDownloadPDF}
              disabled={isGeneratingPDF}
              className="w-full bg-gradient-to-r from-blue-600 to-coral-500 hover:from-blue-700 hover:to-coral-600 text-white py-3"
            >
              <Download className="mr-2 h-5 w-5" />
              {isGeneratingPDF ? 'Génération en cours...' : 'Télécharger en PDF'}
            </Button>
          </CardContent>
        </Card>

        {/* Envoi par email */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Envoyer par email</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="votre.email@exemple.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
              />
              <Button 
                onClick={handleSendEmail}
                variant="outline"
                className="px-6"
              >
                <Mail className="mr-2 h-4 w-4" />
                Envoyer
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <Button 
          onClick={onPrevious}
          variant="outline"
          className="px-8 py-2"
        >
          Précédent
        </Button>
        <Button 
          onClick={onRestart}
          variant="outline"
          className="px-8 py-2"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Recommencer
        </Button>
      </div>
    </div>
  );
};

export default SummaryPage;
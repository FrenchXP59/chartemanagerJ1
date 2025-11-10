import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface WelcomePageProps {
  onStart: () => void;
}

const WelcomePage: React.FC<WelcomePageProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-coral-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-coral-500/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Ma Charte
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-coral-500">
                {' '}Managériale
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Formalisez votre style de management de manière interactive et personnalisée. 
              Créez une charte visuelle qui reflète vos valeurs, votre posture et vos engagements.
            </p>
          </div>
          
          {/* Hero Image */}
          <div className="mt-12 flex justify-center">
            <div className="relative">
              <img 
                src="/images/manager_hero_1.jpeg" 
                alt="Manager et équipe en collaboration"
                className="rounded-2xl shadow-2xl max-w-4xl w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Personnalisé</h3>
              <p className="text-gray-600">
                Définissez votre identité managériale unique en 6 étapes guidées
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-coral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📋</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Exportable</h3>
              <p className="text-gray-600">
                Téléchargez votre charte en PDF pour votre plan de développement
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Interactif</h3>
              <p className="text-gray-600">
                Interface moderne et intuitive pour une expérience fluide
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Button 
            onClick={onStart}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-coral-500 hover:from-blue-700 hover:to-coral-600 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Commencer ma charte
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <p className="text-sm text-gray-500 mt-4">
            ⏱️ Durée estimée : 15-20 minutes
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
import React from 'react';
import { Shield, Cloud, TrendingUp, Upload, Brain, BarChart3 } from 'lucide-react';

const NiramayaLanding = () => {
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features');
    featuresSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white px-6 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-2xl font-bold text-gray-800">
            Niramaya
          </div>
          <nav className="flex items-center space-x-8">
            <button 
              onClick={scrollToFeatures}
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              Features
            </button>
            <button className="text-gray-600 hover:text-gray-800 transition-colors">
              Sign In
            </button>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors">
              Sign Up
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-24">
        <div className="max-w-6xl mx-auto text-center px-6">
          <h1 className="text-6xl font-bold mb-8 leading-tight">
            Your Health, Unified and<br />
            Intelligent
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            A secure, cloud-based EHR that centralizes patient data, enables<br />
            consent-driven access, and delivers AI-powered insights for faster, safer,<br />
            and more patient-centric care.
          </p>
          <div className="flex items-center justify-center space-x-8">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
              Create Your Patient Account
            </button>
            <button className="text-white hover:text-gray-300 text-lg font-semibold transition-colors">
              For Healthcare Providers
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Patient-Controlled Security */}
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-8">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Patient-Controlled<br />Security
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Selectively grant or revoke access to<br />
                your health records. Your data, your<br />
                rules, ensuring total privacy and control.
              </p>
            </div>

            {/* Centralized Cloud Records */}
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-8">
                <Cloud className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Centralized Cloud<br />Records
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Consolidate your scattered health<br />
                history into a single, secure location for<br />
                seamless and instant access by you and<br />
                your trusted providers.
              </p>
            </div>

            {/* AI-Powered Health Insights */}
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-8">
                <TrendingUp className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                AI-Powered Health<br />Insights
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Our AI analyzes your data to generate<br />
                visual trends, alerts, and physician<br />
                summaries, turning raw information into<br />
                proactive care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple, secure, and intelligent healthcare data management in three easy<br />
              steps
            </p>
          </div>

          <div className="flex items-center justify-center space-x-16">
            {/* Upload */}
            <div className="text-center">
              <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <Upload className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Upload
              </h3>
              <p className="text-gray-600">
                Patient uploads medical<br />
                reports
              </p>
            </div>

            {/* Arrow 1 */}
            <div className="text-blue-500 text-4xl">
              →
            </div>

            {/* Analyze */}
            <div className="text-center">
              <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <Brain className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Analyze
              </h3>
              <p className="text-gray-600">
                Gen-AI securely analyzes the<br />
                data
              </p>
            </div>

            {/* Arrow 2 */}
            <div className="text-blue-500 text-4xl">
              →
            </div>

            {/* Access */}
            <div className="text-center">
              <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <BarChart3 className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Access
              </h3>
              <p className="text-gray-600">
                Receive personalized alerts and view<br />
                visual health trends
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NiramayaLanding;


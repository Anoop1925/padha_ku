"use client";

import { useState } from "react";
import { Play, Youtube, Sparkles, CheckCircle2, AlertCircle, X, Zap, Code, Lightbulb, FileText, Globe } from "lucide-react";

export default function PlaygroundPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [launchStatus, setLaunchStatus] = useState<'idle' | 'launching' | 'success' | 'error'>('idle');
  const [launchMessage, setLaunchMessage] = useState('');
  const [progress, setProgress] = useState(0);
  
  const PLAYGROUND_URL = "/playground"; // Updated to point to playground page

  const handleLaunch = async () => {
    setLoading(true);
    setError(null);
    setLaunchStatus('launching');
    setLaunchMessage('Playground is being loaded right now...');
    setProgress(0);
    
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) return 90;
        return prev + 0.75;
      });
    }, 100);
    
    try {
      // Check if backend is running
      const backendCheck = await fetch('http://localhost:5001/health', {
        method: 'GET',
      }).catch(() => null);
      
      clearInterval(progressInterval);
      setProgress(100);
      
      setLaunchStatus('success');
      setLaunchMessage('Playground opened in new tab!');
      
      // Open Playground in new tab
      window.open(PLAYGROUND_URL, "_blank");
      
      setLoading(false);
      
      setTimeout(() => {
        setLaunchStatus('idle');
        setProgress(0);
      }, 4000);
      
    } catch (err: any) {
      clearInterval(progressInterval);
      console.error('Error launching Playground:', err);
      setError(err.message || 'Failed to launch Playground. Make sure the backend is running on port 5001.');
      setLaunchStatus('error');
      setLaunchMessage('Failed to launch Playground. Please check your setup.');
      setLoading(false);
      setProgress(0);
      
      setTimeout(() => {
        setLaunchStatus('idle');
      }, 10000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-6">
      {/* Canva-style Progress Notification */}
      {launchStatus !== 'idle' && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-emerald-200 overflow-hidden">
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="shrink-0">
                  {launchStatus === 'launching' && (
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full border-4 border-emerald-100"></div>
                      <div 
                        className="absolute inset-0 w-12 h-12 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin"
                      ></div>
                    </div>
                  )}
                  {launchStatus === 'success' && (
                    <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center">
                      <CheckCircle2 className="w-7 h-7 text-white" />
                    </div>
                  )}
                  {launchStatus === 'error' && (
                    <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center">
                      <AlertCircle className="w-7 h-7 text-white" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {launchStatus === 'launching' && 'Launching Playground'}
                    {launchStatus === 'success' && 'Ready to Explore!'}
                    {launchStatus === 'error' && 'Launch Failed'}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {launchMessage}
                  </p>
                  
                  {launchStatus === 'launching' && (
                    <div className="mt-4">
                      <div className="h-1.5 bg-emerald-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-300 ease-out"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-emerald-600 mt-2 font-medium">
                        {Math.round(progress)}% complete
                      </p>
                    </div>
                  )}
                </div>
                
                <button
                  onClick={() => {
                    setLaunchStatus('idle');
                    setProgress(0);
                  }}
                  className="shrink-0 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-6 text-white shadow-xl">
          <div className="flex items-center gap-3 mb-2">
            <Zap className="h-7 w-7" />
            <h1 className="text-3xl font-bold">Playground</h1>
          </div>
          <p className="text-white/90">
            Transform any YouTube video into an interactive learning playground with AI-powered simulations and experiments.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Column - Overview */}
          <div className="space-y-5">
            {/* What is Playground */}
            <div className="bg-white rounded-xl border border-emerald-200 shadow-sm p-5">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-emerald-600" />
                What is Playground?
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Playground converts educational YouTube videos into fully interactive HTML learning environments. 
                Each playground includes dynamic simulations, interactive controls, and hands-on experiments tailored 
                to the video&apos;s content.
              </p>
            </div>

            {/* How It Works */}
            <div className="bg-white rounded-xl border border-emerald-200 shadow-sm p-5">
              <h3 className="font-semibold text-gray-900 mb-3">
                How It Works
              </h3>
              <div className="space-y-2.5 text-sm">
                <div className="flex items-start gap-3 p-3 rounded-lg border border-emerald-100 bg-emerald-50">
                  <div className="bg-emerald-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-xs font-bold">1</div>
                  <div>
                    <p className="font-medium text-gray-900">Paste YouTube URL</p>
                    <p className="text-xs mt-1 text-gray-600">
                      Enter any educational video link
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg border border-teal-100 bg-teal-50">
                  <div className="bg-teal-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-xs font-bold">2</div>
                  <div>
                    <p className="font-medium text-gray-900">AI Analyzes Content</p>
                    <p className="text-xs mt-1 text-gray-600">
                      Extracts transcript and understands the topic
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg border border-cyan-100 bg-cyan-50">
                  <div className="bg-cyan-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-xs font-bold">3</div>
                  <div>
                    <p className="font-medium text-gray-900">Generate Playground</p>
                    <p className="text-xs mt-1 text-gray-600">
                      Creates interactive simulations and experiments
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* What You Can Learn */}
            <div className="bg-white rounded-xl border border-emerald-200 shadow-sm p-5">
              <h3 className="font-semibold text-gray-900 mb-3">
                What You Can Learn
              </h3>
              <div className="grid grid-cols-2 gap-2.5 text-sm">
                <div className="p-3 rounded-lg text-center border border-emerald-100 bg-emerald-50">
                  <Lightbulb className="h-7 w-7 mx-auto mb-1.5 text-emerald-600" />
                  <p className="font-medium text-gray-900 text-xs">Math & Physics</p>
                  <p className="text-xs text-gray-500 mt-0.5">Interactive equations</p>
                </div>
                <div className="p-3 rounded-lg text-center border border-teal-100 bg-teal-50">
                  <Code className="h-7 w-7 mx-auto mb-1.5 text-teal-600" />
                  <p className="font-medium text-gray-900 text-xs">Programming</p>
                  <p className="text-xs text-gray-500 mt-0.5">Live code examples</p>
                </div>
                <div className="p-3 rounded-lg text-center border border-cyan-100 bg-cyan-50">
                  <Sparkles className="h-7 w-7 mx-auto mb-1.5 text-cyan-600" />
                  <p className="font-medium text-gray-900 text-xs">Science</p>
                  <p className="text-xs text-gray-500 mt-0.5">Visual models</p>
                </div>
                <div className="p-3 rounded-lg text-center border border-emerald-100 bg-emerald-50">
                  <Zap className="h-7 w-7 mx-auto mb-1.5 text-emerald-600" />
                  <p className="font-medium text-gray-900 text-xs">Engineering</p>
                  <p className="text-xs text-gray-500 mt-0.5">Physics sims</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Launch & Features */}
          <div className="space-y-5">
            {/* Launch Card */}
            <div className="bg-white rounded-xl border border-emerald-200 shadow-sm p-5">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Play className="h-5 w-5 text-emerald-600" />
                Launch Playground
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Click the button below to start the Playground server and begin creating interactive learning experiences.
              </p>
              
              <button
                onClick={handleLaunch}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                    Launching...
                  </>
                ) : (
                  <>
                    <Play className="h-5 w-5" />
                    Launch Playground
                  </>
                )}
              </button>

              {error && (
                <div className="mt-4 p-3 border border-red-200 rounded-lg flex items-start gap-2 bg-red-50">
                  <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5 text-red-600" />
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}
            </div>

            {/* Features */}
            <div className="bg-white rounded-xl border border-emerald-200 shadow-sm p-5">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-5 w-5 text-emerald-600" />
                <h3 className="font-semibold text-gray-900">
                  Features
                </h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <Youtube className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">YouTube Integration</p>
                    <p className="text-xs text-gray-600 mt-1">
                      Extract transcripts from any educational video
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Lightbulb className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">AI-Powered Generation</p>
                    <p className="text-xs text-gray-600 mt-1">
                      PadhaKU AI creates custom playgrounds
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Code className="h-5 w-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Interactive Simulations</p>
                    <p className="text-xs text-gray-600 mt-1">
                      Canvas, Chart.js, and custom visualizations
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Zap className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Single-Page App</p>
                    <p className="text-xs text-gray-600 mt-1">
                      Fully self-contained HTML with no dependencies
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Globe className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Real-Time Preview</p>
                    <p className="text-xs text-gray-600 mt-1">
                      Instant access to your generated learning environment
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-200 p-5">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="h-5 w-5 text-emerald-600" />
                <h3 className="font-semibold text-gray-900">
                  Requirements
                </h3>
              </div>
              <ul className="space-y-1.5 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                  Valid YouTube URL
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-500"></div>
                  Video must have transcripts enabled
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-500"></div>
                  Stable internet connection required
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-500"></div>
                  Modern web browser (Chrome, Firefox, Edge)
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-500"></div>
                  Allow browser permissions if prompted
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

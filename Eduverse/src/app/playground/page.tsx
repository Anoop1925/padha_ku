"use client";

import { useState, useEffect } from "react";
import { Play, AlertCircle, Sparkles, Info, Sun, Moon } from "lucide-react";
import Image from "next/image";

const BACKEND_URL = process.env.NEXT_PUBLIC_PLAYGROUND_BACKEND_URL || "https://playground-backend-ulfk.onrender.com";

export default function PlaygroundApp() {
  const [activeTab, setActiveTab] = useState<'about' | 'feature'>('about');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [ytUrl, setYtUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [videoId, setVideoId] = useState<string | null>(null);
  const [playgroundHtml, setPlaygroundHtml] = useState<string | null>(null);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Heartbeat to keep backend alive
  useEffect(() => {
    let heartbeatInterval: NodeJS.Timeout | null = null;
    let isActive = true;

    const sendHeartbeat = async () => {
      if (!isActive) return;

      try {
        await fetch(`${BACKEND_URL}/health`);
      } catch (error) {
        console.error("Playground heartbeat failed:", error);
      }
    };

    heartbeatInterval = setInterval(sendHeartbeat, 10000);

    return () => {
      isActive = false;
      if (heartbeatInterval) {
        clearInterval(heartbeatInterval);
      }
    };
  }, []);

  const handleGenerate = async () => {
    if (!ytUrl.trim()) {
      alert("Please enter a YouTube URL");
      return;
    }

    setLoading(true);
    setError(null);
    setVideoId(null);
    setPlaygroundHtml(null);

    try {
      const response = await fetch(`${BACKEND_URL}/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: ytUrl }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setVideoId(data.video_id);
      setPlaygroundHtml(data.html);
    } catch (e: any) {
      setError(e.message || "Failed to generate playground");
      console.error("Error:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-black' : 'bg-gradient-to-b from-gray-50 to-white'}`}>
      {/* Theme Toggle Button - Floating Top Right */}
      <button
        onClick={toggleTheme}
        className={`fixed top-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 ${
          theme === 'dark' 
            ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' 
            : 'bg-white text-indigo-600 hover:bg-gray-50'
        }`}
        title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
      >
        {theme === 'light' ? (
          <Moon className="h-6 w-6" />
        ) : (
          <Sun className="h-6 w-6" />
        )}
      </button>

      {/* Hero Section - App Store Style Layout */}
      <div className={`py-12 transition-colors duration-300 ${
        theme === 'dark' ? 'bg-black border-b border-gray-800' : 'bg-white border-b border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-12 gap-8 items-center">
            {/* Left: Large Logo */}
            <div className="md:col-span-3 flex items-center justify-start">
              <Image
                src={theme === 'dark' ? '/Playground_dark_mode.png' : '/Playground_light_mode.png'}
                alt="Playground Logo"
                width={450}
                height={150}
                className="w-full h-auto max-w-[280px]"
                priority
              />
            </div>

            {/* Right: Information Cards */}
            <div className="md:col-span-9 space-y-4 flex flex-col justify-center">
              {/* Main Description */}
              <div>
                <h1 className={`text-4xl font-bold mb-3 transition-colors duration-300 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  Playground
                </h1>
                <p className={`text-lg mb-6 transition-colors duration-300 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Transform YouTube videos into interactive learning experiences
                </p>
              </div>

              {/* Info Cards Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {/* Rating/Score Card */}
                <div className={`rounded-xl p-4 border transition-colors duration-300 ${
                  theme === 'dark' 
                    ? 'bg-gray-900 border-gray-800' 
                    : 'bg-gray-50 border-gray-200'
                }`}>
                  <div className="flex items-center gap-1 mb-1">
                    <Sparkles className={`h-4 w-4 ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-500'}`} />
                    <Sparkles className={`h-4 w-4 ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-500'}`} />
                    <Sparkles className={`h-4 w-4 ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-500'}`} />
                    <Sparkles className={`h-4 w-4 ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-500'}`} />
                    <Sparkles className={`h-4 w-4 ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-500'}`} />
                  </div>
                  <p className={`text-xs font-medium transition-colors duration-300 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    AI-Powered
                  </p>
                </div>

                {/* Category Card */}
                <div className={`rounded-xl p-4 border transition-colors duration-300 ${
                  theme === 'dark' 
                    ? 'bg-gray-900 border-gray-800' 
                    : 'bg-gray-50 border-gray-200'
                }`}>
                  <p className={`text-sm font-bold mb-1 transition-colors duration-300 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    Interactive
                  </p>
                  <p className={`text-xs transition-colors duration-300 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Category
                  </p>
                </div>

                {/* Tools Count Card */}
                <div className={`rounded-xl p-4 border transition-colors duration-300 ${
                  theme === 'dark' 
                    ? 'bg-gray-900 border-gray-800' 
                    : 'bg-gray-50 border-gray-200'
                }`}>
                  <p className={`text-sm font-bold mb-1 transition-colors duration-300 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    YouTube
                  </p>
                  <p className={`text-xs transition-colors duration-300 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Source
                  </p>
                </div>

                {/* Technology Card */}
                <div className={`rounded-xl p-4 border transition-colors duration-300 ${
                  theme === 'dark' 
                    ? 'bg-gray-900 border-gray-800' 
                    : 'bg-gray-50 border-gray-200'
                }`}>
                  <p className={`text-sm font-bold mb-1 transition-colors duration-300 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    PadhaKU
                  </p>
                  <p className={`text-xs transition-colors duration-300 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Powered By
                  </p>
                </div>
              </div>

              {/* Feature Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r from-[#1b57cc] to-[#9d4afd] text-white border border-[#1b57cc]/20">
                  Video Analysis
                </span>
                <span className="px-3 py-1.5 rounded-full text-xs font-medium" style={{background: 'linear-gradient(to right, #eda82e, #9d4afd)', color: 'white', border: '1px solid rgba(237, 168, 46, 0.2)'}}>
                  Interactive Simulations
                </span>
                <span className="px-3 py-1.5 rounded-full text-xs font-medium" style={{background: 'linear-gradient(to right, #9d4afd, #1b57cc)', color: 'white', border: '1px solid rgba(157, 74, 253, 0.2)'}}>
                  Real-Time Generation
                </span>
                <span className="px-3 py-1.5 rounded-full text-xs font-medium" style={{background: 'linear-gradient(to right, #1b57cc, #eda82e)', color: 'white', border: '1px solid rgba(27, 87, 204, 0.2)'}}>
                  Educational Content
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className={`sticky top-0 z-10 shadow-sm transition-colors duration-300 ${
        theme === 'dark' ? 'bg-gray-900 border-b border-gray-800' : 'bg-white border-b border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-0">
            <button
              onClick={() => setActiveTab('about')}
              className={`flex items-center justify-center gap-2 px-6 py-4 font-medium text-sm transition-all relative ${
                activeTab === 'about'
                  ? theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'
                  : theme === 'dark' ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Info className="h-4 w-4" />
              About
              {activeTab === 'about' && (
                <div className={`absolute bottom-0 left-0 right-0 h-0.5 ${theme === 'dark' ? 'bg-indigo-400' : 'bg-indigo-600'}`} />
              )}
            </button>
            <button
              onClick={() => setActiveTab('feature')}
              className={`flex items-center justify-center gap-2 px-6 py-4 font-medium text-sm transition-all relative ${
                activeTab === 'feature'
                  ? theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'
                  : theme === 'dark' ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Play className="h-4 w-4" />
              Feature
              {activeTab === 'feature' && (
                <div className={`absolute bottom-0 left-0 right-0 h-0.5 ${theme === 'dark' ? 'bg-indigo-400' : 'bg-indigo-600'}`} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'about' && (
        <div className={`max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 transition-colors duration-300 ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
        }`}>
          <div className="space-y-8">
            <div>
              <h2 className={`text-3xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                What is Playground?
              </h2>
              <p className="text-lg leading-relaxed mb-4">
                Playground is an AI-powered tool that transforms educational YouTube videos into engaging, interactive learning experiences. Simply paste a YouTube URL, and watch as our advanced AI creates custom simulations, visualizations, and hands-on activities based on the video content.
              </p>
            </div>

            <div>
              <h3 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                How It Works
              </h3>
              <div className="space-y-4">
                <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-gray-50 border-gray-200'}`}>
                  <h4 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    1. Paste YouTube URL
                  </h4>
                  <p>Copy and paste any educational YouTube video link into the input field.</p>
                </div>
                <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-gray-50 border-gray-200'}`}>
                  <h4 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    2. AI Analysis
                  </h4>
                  <p>Our AI analyzes the video content, extracting key concepts and educational themes.</p>
                </div>
                <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-gray-50 border-gray-200'}`}>
                  <h4 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    3. Interactive Generation
                  </h4>
                  <p>The system creates custom interactive elements including simulations, quizzes, and visualizations tailored to the video's subject matter.</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Key Features
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Sparkles className="h-5 w-5 mt-0.5 flex-shrink-0" style={{color: '#1b57cc'}} />
                  <span><strong>Intelligent Content Analysis:</strong> Extracts core concepts from video metadata and descriptions</span>
                </li>
                <li className="flex items-start gap-2">
                  <Sparkles className="h-5 w-5 mt-0.5 flex-shrink-0" style={{color: '#eda82e'}} />
                  <span><strong>Dynamic Simulations:</strong> Creates interactive elements based on the subject (math, physics, biology, etc.)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Sparkles className="h-5 w-5 mt-0.5 flex-shrink-0" style={{color: '#9d4afd'}} />
                  <span><strong>Instant Generation:</strong> Powered by Google Gemini 2.5 Flash for fast, high-quality results</span>
                </li>
                <li className="flex items-start gap-2">
                  <Sparkles className="h-5 w-5 mt-0.5 flex-shrink-0" style={{color: '#1b57cc'}} />
                  <span><strong>Comprehensive Learning:</strong> Combines video watching with hands-on interaction</span>
                </li>
              </ul>
            </div>

            <div className={`p-6 rounded-xl border ${theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200'}`}>
              <p className={`text-center text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Ready to transform your learning experience? Switch to the Feature tab to get started!
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'feature' && (
        <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-black' : 'bg-gradient-to-b from-gray-50 to-white'}`}>
          {/* Input Section - Improved UI */}
          <div className={`max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 ${
            theme === 'dark' ? 'bg-gray-900/50' : 'bg-white/80'
          } backdrop-blur-sm border-b ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}>
            <div className="text-center mb-6">
              <h2 className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Create Your Playground
              </h2>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Paste a YouTube URL below to generate an interactive learning experience
              </p>
            </div>
            
            <div className="flex gap-3">
              <input
                type="text"
                value={ytUrl}
                onChange={(e) => setYtUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                className={`flex-1 px-6 py-4 rounded-2xl border-2 focus:ring-2 focus:border-transparent outline-none transition-all ${
                  theme === 'dark' 
                    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:ring-indigo-500' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-indigo-500'
                } shadow-lg`}
                disabled={loading}
                onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
              />
              <button
                onClick={handleGenerate}
                disabled={loading}
                className="px-8 py-4 rounded-2xl font-semibold shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 text-white hover:shadow-xl transform hover:scale-105"
                style={{background: 'linear-gradient(to right, #1b57cc, #9d4afd)'}}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent animate-spin rounded-full" />
                    Building...
                  </>
                ) : (
                  <>
                    <Play className="h-5 w-5" />
                    Build Playground
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Loading Overlay */}
          {loading && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/20 backdrop-blur-sm">
              <div className={`p-8 rounded-3xl shadow-2xl text-center max-w-md ${
                theme === 'dark' ? 'bg-gray-900' : 'bg-white'
              }`}>
                <div className="w-16 h-16 border-4 border-t-transparent animate-spin rounded-full mx-auto mb-4" style={{borderColor: '#1b57cc', borderTopColor: 'transparent'}} />
                <p className={`text-lg font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Creating Your Playground
                </p>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Analyzing video content and generating interactive simulations...
                </p>
              </div>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className={`p-4 border-2 rounded-2xl flex items-start gap-3 ${
                theme === 'dark' 
                  ? 'bg-red-900/20 border-red-800 text-red-300' 
                  : 'bg-red-50 border-red-200'
              }`}>
                <AlertCircle className={`h-5 w-5 flex-shrink-0 mt-0.5 ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`} />
                <div>
                  <p className={`font-semibold ${theme === 'dark' ? 'text-red-300' : 'text-red-900'}`}>Error</p>
                  <p className={`text-sm ${theme === 'dark' ? 'text-red-400' : 'text-red-800'}`}>{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Main Content */}
          {videoId && playgroundHtml ? (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
              {/* YouTube Video */}
              <div className={`rounded-2xl shadow-xl overflow-hidden border ${
                theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
              }`}>
                <div className="aspect-video">
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=0`}
                    className="w-full h-full"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>

              {/* Interactive Playground */}
              <div className={`rounded-2xl shadow-xl overflow-hidden border ${
                theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
              }`}>
                <div className="px-6 py-3" style={{background: 'linear-gradient(to right, #1b57cc, #eda82e, #9d4afd)'}}>
                  <h2 className="text-white font-semibold text-lg flex items-center gap-2">
                    <Sparkles className="h-5 w-5" />
                    Playground
                  </h2>
                </div>
                <div className="min-h-[600px]">
                  <iframe
                    srcDoc={playgroundHtml}
                    className="w-full h-[600px] border-none"
                    sandbox="allow-scripts allow-same-origin"
                  />
                </div>
              </div>
            </div>
          ) : !loading && !error && (
            <div className="flex items-center justify-center py-16">
              <div className="text-center max-w-md mx-auto px-6">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center" style={{background: 'linear-gradient(to right, #1b57cc, #9d4afd)'}}>
                  <Play className="h-10 w-10 text-white" />
                </div>
                <h2 className={`text-2xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Ready to Create Your Playground
                </h2>
                <p className={`mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Paste a YouTube URL above and click "Build Playground" to generate an interactive learning environment based on the video content.
                </p>
                <div className={`border-2 rounded-2xl p-6 text-left ${
                  theme === 'dark' 
                    ? 'bg-gray-900/50 border-gray-800' 
                    : 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200'
                }`}>
                  <p className={`text-sm font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    ✨ What you'll get:
                  </p>
                  <ul className={`text-sm space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    <li>• Interactive simulations and visualizations</li>
                    <li>• Hands-on learning experiences</li>
                    <li>• Concept exploration tools</li>
                    <li>• Educational games and quizzes</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

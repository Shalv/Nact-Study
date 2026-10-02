import React, { useState } from 'react';
import {
  Video,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Download,
  Film,
  Layers,
  Wand2,
  Copy,
  CheckCircle2,
  Volume2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const TeacherAiVideoStudio: React.FC = () => {
  const { showToast, addActivityLog, currentUser } = useApp();

  const [topic, setTopic] = useState('Why Light Bends: Snell’s Law & Index of Refraction Explained');
  const [gradeLevel, setGradeLevel] = useState('Class 9 Secondary');
  const [videoFormat, setVideoFormat] = useState('Concept Explainer (3 Minutes)');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const [storyboard, setStoryboard] = useState<
    {
      sceneNum: number;
      duration: string;
      visualPrompt: string;
      narration: string;
      onScreenText: string;
    }[]
  >([
    {
      sceneNum: 1,
      duration: '00:00 - 00:30',
      visualPrompt: 'Animation of a lifeguard running on sand then swimming in water. Split screen comparison.',
      narration:
        'Imagine you are a lifeguard racing to rescue a swimmer. Do you run in a straight line through the water, or do you run more on sand where you are faster? Light does the exact same thing!',
      onScreenText: 'Principle of Least Time (Fermat’s Principle)'
    },
    {
      sceneNum: 2,
      duration: '00:30 - 01:15',
      visualPrompt: 'Laser beam striking glass prism interface at an oblique angle, bending towards normal.',
      narration:
        'When light travels from air into glass, it enters an optically denser medium. Because light slows down, the wavefront tilts, causing the beam to bend toward the normal.',
      onScreenText: 'v_air > v_glass • n = c / v'
    },
    {
      sceneNum: 3,
      duration: '01:15 - 02:10',
      visualPrompt: 'Mathematical derivation of Snell’s Law formula with highlighted trigonometric ratios.',
      narration:
        'Willebrord Snellius formulated this exact relation in 1621: n1 * sin(theta1) = n2 * sin(theta2). The ratio of sines of incidence and refraction equals the ratio of refractive indices.',
      onScreenText: 'n1 * sin(θ1) = n2 * sin(θ2)'
    },
    {
      sceneNum: 4,
      duration: '02:10 - 03:00',
      visualPrompt: 'Real world fiber optic cable with total internal reflection and diamond sparkle.',
      narration:
        'This single law powers our entire modern internet via fiber optics and explains why diamonds sparkle with intense brilliance. Try calculating the critical angle for water today!',
      onScreenText: 'Total Internal Reflection & Fiber Optics'
    }
  ]);

  const handleGenerateScript = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      showToast('AI Video Storyboard generated with 4 cinematic educational scenes!');
      addActivityLog({
        userId: currentUser.id,
        userName: currentUser.name,
        userRole: currentUser.role,
        portalType: currentUser.portalType,
        action: `Generated AI Video Script: ${topic}`,
        details: `${videoFormat} • ${gradeLevel}`,
        category: 'academic'
      });
    }, 1000);
  };

  const handleTogglePlay = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      const interval = setInterval(() => {
        setActiveSceneIndex(prev => {
          if (prev >= storyboard.length - 1) {
            clearInterval(interval);
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 2500);
    } else {
      setIsPlaying(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150 text-xs">
      {/* Header Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Video className="w-5 h-5 text-purple-600" />
              <span>AI Educational Video Creator & Script Studio</span>
            </h2>
            <p className="text-slate-500">
              Generate scene-by-scene educational video storyboards, voiceover scripts, and preview player simulations.
            </p>
          </div>
          <span className="font-mono text-xs font-bold bg-purple-50 text-purple-700 px-3 py-1 rounded-full border border-purple-200">
            AI Video Engine 2.0
          </span>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 border-t border-slate-100">
          <div className="md:col-span-2">
            <label className="block font-semibold text-slate-700 mb-1">Video Topic / Concept</label>
            <input
              type="text"
              value={topic}
              onChange={e => setTopic(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#3d5ee1]"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Target Format</label>
            <select
              value={videoFormat}
              onChange={e => setVideoFormat(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 font-semibold"
            >
              <option value="Concept Explainer (3 Minutes)">Concept Explainer (3 Minutes)</option>
              <option value="Step-by-Step Problem Solving (5 Minutes)">Step-by-Step Problem Solving (5 Minutes)</option>
              <option value="Lab Experiment Simulation (8 Minutes)">Lab Experiment Simulation (8 Minutes)</option>
              <option value="60-Second Micro-Learning Reel">60-Second Micro-Learning Reel</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleGenerateScript}
          disabled={isGenerating}
          className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-[#3d5ee1] text-white font-bold rounded-xl shadow-xs hover:opacity-95 transition-all flex items-center gap-2"
        >
          {isGenerating ? (
            <>
              <Wand2 className="w-4 h-4 animate-spin" />
              <span>Generating AI Script & Visual Storyboard...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Generate Scene-by-Scene Video Storyboard</span>
            </>
          )}
        </button>
      </div>

      {/* Main Split: Left Player Simulator, Right Storyboard List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 6 cols: Video Player Simulator */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Film className="w-4 h-4 text-[#3d5ee1]" />
              <span>Interactive Player Simulator (Scene {activeSceneIndex + 1} of {storyboard.length})</span>
            </h3>
            <span className="font-mono text-[10px] text-slate-400">
              {storyboard[activeSceneIndex].duration}
            </span>
          </div>

          {/* Screen Canvas */}
          <div className="bg-slate-950 text-white rounded-xl aspect-video p-6 flex flex-col justify-between relative overflow-hidden shadow-inner border border-slate-800">
            {/* Background Glow */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-600/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-600/20 rounded-full blur-2xl" />

            <div className="relative z-10 flex items-center justify-between">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-slate-300">
                Scene #{storyboard[activeSceneIndex].sceneNum}
              </span>
              <span className="text-[10px] font-mono bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded">
                AI Storyboard
              </span>
            </div>

            <div className="relative z-10 my-auto text-center space-y-2 px-4">
              <div className="text-xl sm:text-2xl font-mono font-bold tracking-tight text-emerald-400 drop-shadow-md">
                {storyboard[activeSceneIndex].onScreenText}
              </div>
              <p className="text-xs text-slate-300 font-sans italic leading-relaxed line-clamp-3">
                "{storyboard[activeSceneIndex].narration}"
              </p>
            </div>

            <div className="relative z-10 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
              <span>{storyboard[activeSceneIndex].visualPrompt}</span>
            </div>
          </div>

          {/* Controls Bar */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <button
                onClick={handleTogglePlay}
                className="px-4 py-2 bg-[#3d5ee1] text-white font-bold rounded-xl flex items-center gap-1.5 shadow-xs hover:bg-[#324ecc]"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isPlaying ? 'Pause Simulator' : 'Play Simulation'}</span>
              </button>
              <button
                onClick={() => setActiveSceneIndex(0)}
                className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600"
                title="Restart"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center gap-1 font-mono text-[11px]">
              {storyboard.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveSceneIndex(i)}
                  className={`w-7 h-7 rounded-lg font-bold transition-all ${
                    activeSceneIndex === i
                      ? 'bg-[#3d5ee1] text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right 6 cols: Scene-by-Scene Script Breakdown */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Scene-by-Scene Instructional Script</h3>
              <p className="text-slate-400 text-[11px]">Narration voiceover & visual prompts</p>
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(JSON.stringify(storyboard, null, 2));
                showToast('Copied script JSON to clipboard!');
              }}
              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold flex items-center gap-1"
            >
              <Copy className="w-3 h-3" />
              <span>Copy Script</span>
            </button>
          </div>

          <div className="space-y-3">
            {storyboard.map((scene, idx) => (
              <div
                key={scene.sceneNum}
                onClick={() => setActiveSceneIndex(idx)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer space-y-2 ${
                  activeSceneIndex === idx
                    ? 'border-[#3d5ee1] bg-blue-50/50 shadow-2xs'
                    : 'border-slate-200 bg-slate-50/70 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-xs">
                    Scene #{scene.sceneNum}: {scene.onScreenText}
                  </span>
                  <span className="font-mono text-[10px] text-slate-400 font-semibold">{scene.duration}</span>
                </div>

                <div className="text-[11px] text-indigo-900 bg-indigo-50/60 p-2 rounded-lg font-mono leading-relaxed">
                  🎬 <strong>Visual Prompt:</strong> {scene.visualPrompt}
                </div>

                <div className="text-slate-700 text-[11px] leading-relaxed">
                  🎙️ <strong>Narration:</strong> "{scene.narration}"
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

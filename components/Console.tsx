import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface StreamCard {
  id: string;
  type: string;
  content: string;
  icon: string;
  color: 'emerald' | 'blue';
}

const MESSAGES: Omit<StreamCard, 'id'>[] = [
  { 
    type: 'TRANSIT VELOCITY', 
    content: 'Salinas → SF transit times averaging 3h 15m (15m ahead of schedule).', 
    icon: 'local_shipping', 
    color: 'blue' 
  },
  { 
    type: 'COLD CHAIN INTEGRITY', 
    content: '100% temperature stability maintained across Northern CA fleet.', 
    icon: 'thermostat', 
    color: 'emerald' 
  },
  { 
    type: 'PREDICTIVE GRADING', 
    content: 'Inbound strawberries tracking at 99.2% Grade A acceptance.', 
    icon: 'verified', 
    color: 'emerald' 
  }
];

const Console: React.FC = () => {
  const query = "What is the status of active shipments to the Bay Area?";
  const [progress, setProgress] = useState(0);
  const [countdown, setCountdown] = useState(3);
  const [isExecuting, setIsExecuting] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);
  
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isExecuting || hasCompleted) return;
    
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      triggerExecution();
    }
  }, [countdown, isExecuting, hasCompleted]);

  const triggerExecution = () => {
    if (isExecuting) return;
    
    setIsExecuting(true);
    setHasCompleted(false);
    setProgress(0);
    
    const startTime = Date.now();
    const duration = 5000;

    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(currentProgress);

      if (currentProgress === 100) {
        setHasCompleted(true);
        setIsExecuting(false);
        if (timerRef.current) clearInterval(timerRef.current);
      }
    }, 50);
  };

  const handleReset = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setHasCompleted(false);
    setIsExecuting(false);
    setProgress(0);
    setCountdown(3); 
  };

  const isCountingDown = !isExecuting && !hasCompleted && countdown > 0;

  const getCardColorClasses = (colorType: string) => {
     if (colorType === 'blue') {
         return {
             bg: 'bg-[#c76a2a]/10',
             text: 'text-[#c76a2a]'
         };
     }
     return {
         bg: 'bg-[#5f7f73]/10',
         text: 'text-[#5f7f73]'
     };
  };

  return (
    <div className="relative group perspective-1000">
      <svg className="absolute inset-0 pointer-events-none z-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#c76a2a" stopOpacity="0" />
            <stop offset="50%" stopColor="#c76a2a" stopOpacity="1" />
            <stop offset="100%" stopColor="#c76a2a" stopOpacity="0" />
          </linearGradient>
        </defs>
        {!hasCompleted && (
          <path d="M 50,320 Q 250,270 450,320" fill="none" stroke="url(#lineGrad)" strokeWidth="1" className="animate-pulse" />
        )}
      </svg>

      {/* Outer container with fixed height to contain all states and remove extra space */}
      <div className="relative bg-[#fefefb] rounded-[2.5rem] p-6 md:p-8 border border-[#14343b]/5 shadow-2xl shadow-black/5 overflow-hidden h-auto min-h-[510px] flex flex-col gap-5 transition-all duration-500 transform-gpu z-10">
        
        {/* Top Header */}
        <div className="flex justify-between items-center shrink-0">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400/80"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-400/80"></div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-[10px] font-jetbrains font-medium text-gray-400 uppercase tracking-widest">
              {isCountingDown ? `Initializing in ${countdown}s` : 'OVERSIGHT_ACTIVE'}
            </div>
            <div className={`w-1.5 h-1.5 rounded-full ${hasCompleted ? 'bg-[#5f7f73]' : 'bg-[#c76a2a] animate-pulse'}`}></div>
          </div>
        </div>

        {/* Prompt Input Box */}
        <div className="bg-white rounded-2xl border border-gray-100 p-3 shadow-sm flex items-center gap-3 shrink-0">
          <div className="bg-[#c76a2a]/10 p-2 rounded-xl shrink-0">
            <span className={`material-symbols-outlined text-[#c76a2a] text-xl flex ${isExecuting ? 'animate-spin' : ''}`}>
              {isExecuting ? 'progress_activity' : 'auto_awesome'}
            </span>
          </div>
          <div className="w-full text-[11px] font-semibold text-[#14343b] font-jetbrains leading-snug break-words">
            {query}
          </div>
          <button 
            onClick={hasCompleted ? handleReset : undefined}
            disabled={isExecuting || isCountingDown}
            className="bg-[#c76a2a] text-[#fefefb] px-5 py-2.5 rounded-xl text-[10px] font-semibold uppercase tracking-[0.1em] hover:brightness-110 disabled:opacity-50 transition-all active:scale-95 shadow-lg shadow-[#c76a2a]/20 self-center shrink-0 font-jetbrains"
          >
            {isExecuting ? 'RUNNING' : hasCompleted ? 'RUN AGAIN' : 'EXECUTE'}
          </button>
        </div>

        {/* Terminal Section - Rendered immediately once execution starts */}
        {(isExecuting || hasCompleted) && (
          <div className="bg-[#191a1a] rounded-2xl p-5 text-[#e8e8e2] space-y-4 shadow-2xl relative overflow-hidden border border-white/5 shrink-0">
            {isExecuting && <div className="absolute inset-0 bg-gradient-to-br from-[#c76a2a]/10 to-transparent animate-pulse pointer-events-none"></div>}
            
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${isExecuting ? 'bg-[#c76a2a] animate-ping' : 'bg-[#5f7f73]'}`}></div>
                <span className="text-[10px] font-medium font-jetbrains text-white/50 uppercase tracking-[0.2em]">
                  {isExecuting ? 'System analysis in progress' : 'Oversight complete'}
                </span>
              </div>
            </div>
            
            <div className="space-y-1.5 relative z-10 font-jetbrains">
              <div className="flex justify-between text-[9px] font-medium text-white/30 uppercase tracking-widest">
                <span>{isExecuting ? 'Validating signals' : 'Oversight verified'}</span>
                <span className="text-[#c76a2a]">{Math.round(progress)}%</span>
              </div>
              <div className="h-1.5 bg-[#333333] rounded-full overflow-hidden border border-white/5 relative">
                <div 
                  className="h-full bg-[#c76a2a] relative rounded-full"
                  style={{ 
                    width: `${progress}%`,
                    transition: isExecuting ? 'none' : 'width 0.5s ease-out'
                  }}
                >
                  {isExecuting && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shimmer_1.2s_infinite] w-32"></div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Section: Cards appear here */}
        <div className="flex-grow relative overflow-hidden">
          {!hasCompleted && isExecuting && (
            <div className="flex flex-col gap-3 relative h-full">
              {MESSAGES.map((card, idx) => {
                const styles = getCardColorClasses(card.color);
                return (
                  <motion.div 
                    key={card.type} 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 * (idx + 1), duration: 0.4 }}
                    className="bg-[#fefefb] p-3.5 rounded-2xl border border-gray-100 flex items-start gap-4"
                  >
                    <div className={`${styles.bg} p-2 rounded-xl ${styles.text} flex items-center justify-center shrink-0`}>
                      <span className="material-symbols-outlined text-base">{card.icon}</span>
                    </div>
                    <div className="flex-grow min-w-0">
                      <h4 className="text-[8px] font-semibold text-[#14343b] uppercase tracking-[0.2em] mb-0.5 font-jetbrains">{card.type}</h4>
                      <p className="text-[10px] text-gray-600 font-semibold font-jetbrains leading-snug truncate md:whitespace-normal md:line-clamp-2">{card.content}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {hasCompleted && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-[#fefefb] rounded-[2rem] p-5 border border-[#5f7f73]/20 shadow-xl shadow-[#5f7f73]/5 flex flex-col h-fit"
            >
              <div className="flex items-center gap-3 mb-4 shrink-0">
                <div className="bg-[#5f7f73]/10 p-1.5 rounded-lg">
                  <span className="material-symbols-outlined text-[#5f7f73] text-base font-bold">check_circle</span>
                </div>
                <h3 className="font-bold text-[11px] text-[#14343b] tracking-tight leading-tight font-display">Oversight complete. All transit corridors operating within target parameters.</h3>
              </div>
              
              <div className="space-y-4 font-jetbrains">
                <div className="space-y-1">
                  <p className="text-[8px] font-semibold text-gray-400 uppercase tracking-widest">Performance Summary</p>
                  <ul className="text-[10px] text-[#14343b] font-medium leading-tight list-disc list-inside space-y-1">
                    <li>Cold-chain integrity maintained across monitored routes.</li>
                    <li>Transit times remain within SLA across regions.</li>
                    <li>Inventory distribution balanced to preserve shelf-life.</li>
                  </ul>
                </div>
                <div className="bg-[#5f7f73]/10 p-3 rounded-xl border border-[#5f7f73]/20 space-y-1">
                  <p className="text-[8px] font-semibold text-[#5f7f73] uppercase tracking-widest">System Status</p>
                  <ul className="text-[10px] text-[#14343b] font-medium leading-tight list-disc list-inside space-y-0.5">
                    <li>Continuous monitoring active.</li>
                    <li>Forecast alignment confirmed.</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-150%); }
          100% { transform: translateX(150%); }
        }
      `}</style>
    </div>
  );
};

export default Console;

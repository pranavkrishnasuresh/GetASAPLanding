
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const COLORS = {
  brandOrange: '#c76a2a', // Burnished Orange
  brandGreen: '#5f7f73',  // Sage Green
  darkBg: '#050505',
  cardBg: 'rgba(255, 255, 255, 0.03)',
  border: 'rgba(255, 255, 255, 0.08)',
  textMuted: 'rgba(255, 255, 255, 0.5)',
  textBright: '#FFFFFF',
};

// Animation config for the heavy, premium feel
const springTransition = { type: 'spring' as const, stiffness: 200, damping: 20 };

// --- Module 1: AI Demand Intelligence (Live Chart) ---
const AIChartModule = ({ isCollapsed }: { isCollapsed: boolean }) => {
  return (
    <div className="relative h-full w-full p-6 md:p-8 flex flex-col justify-between overflow-hidden">
      <div className="flex justify-between items-start z-10 relative">
        <div className="min-w-0">
          <motion.h3 layout="position" className="text-white text-lg font-bold font-display tracking-tight mb-1 whitespace-nowrap">
            AI Demand
          </motion.h3>
          <motion.p 
            initial={{ opacity: 1 }}
            animate={{ opacity: isCollapsed ? 0 : 1 }}
            className="text-[10px] text-gray-400 font-jetbrains uppercase tracking-widest whitespace-nowrap"
          >
            Predictive Engine v4.2
          </motion.p>
        </div>
        
        {/* Live Badge - Sage Green */}
        <div className={`flex items-center gap-2 bg-[#5f7f73]/10 px-3 py-1.5 rounded-full border border-[#5f7f73]/20 transition-all duration-300 ${isCollapsed ? 'opacity-50 scale-90 origin-right' : 'opacity-100'}`}>
            <div className="w-1.5 h-1.5 rounded-full bg-[#5f7f73] animate-pulse shrink-0"></div>
            <span className={`text-[10px] font-bold text-[#5f7f73] font-jetbrains ${isCollapsed ? 'hidden' : 'block'}`}>LIVE MODEL</span>
        </div>
      </div>

      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <svg width="100%" height="100%">
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Chart Container - Stretches with flex grow */}
      <div className="relative flex-grow w-full mt-6 z-10 flex items-end min-h-[150px]">
        <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
             {/* Legacy Line (Gray) */}
             <path 
                d="M0,150 C50,140 100,160 150,130 C200,100 250,140 300,120 C350,100 400,110 450,130 C500,150 550,100 600,120"
                fill="none"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="2"
                strokeDasharray="5,5"
             />
             
             {/* GETASAP Line (Burnished Orange) */}
             <motion.path 
                d="M0,150 C50,130 100,100 150,80 C200,60 250,90 300,50 C350,30 400,40 450,20 C500,40 550,10 600,30"
                fill="none"
                stroke={COLORS.brandOrange}
                strokeWidth="3"
                vectorEffect="non-scaling-stroke"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
             />
             
             {/* Glowing Dot at tip */}
             <motion.circle 
                cx="600" cy="30" r="4" fill={COLORS.brandOrange}
                animate={{ r: [4, 8, 4], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
             />
        </svg>
      </div>

      {/* Stats Footer - Fades out when collapsed to reduce noise */}
      <motion.div 
        className="flex items-end justify-between mt-4 z-10 relative"
        animate={{ opacity: isCollapsed ? 0 : 1, y: isCollapsed ? 20 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div>
            <div className="text-[10px] text-gray-500 font-jetbrains uppercase tracking-widest mb-1 whitespace-nowrap">Forecast Accuracy</div>
            <div className="text-4xl font-bold font-jetbrains text-white tabular-nums">98.4<span className="text-gray-600 text-lg">%</span></div>
        </div>
        <div className="text-right">
             <div className="text-[10px] text-gray-500 font-jetbrains uppercase tracking-widest mb-1 whitespace-nowrap">Waste Reduction</div>
             <div className="text-xl font-bold font-jetbrains text-white tabular-nums text-brand-orange">-22.8%</div>
        </div>
      </motion.div>
    </div>
  );
};

// --- Module 2: IoT Telemetry (Data Stream) ---
const IoTModule = ({ isCollapsed }: { isCollapsed: boolean }) => {
    const [data, setData] = useState({ temp: 34.2, humidity: 45, co2: 412 });
    
    useEffect(() => {
        const interval = setInterval(() => {
            setData({
                temp: +(34.0 + Math.random() * 0.4).toFixed(1),
                humidity: Math.floor(44 + Math.random() * 3),
                co2: Math.floor(410 + Math.random() * 10)
            });
        }, 800);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-full w-full p-6 md:p-8 flex flex-col relative overflow-hidden">
             <div className="flex justify-between items-center mb-6 z-10">
                <motion.h3 layout="position" className="text-white text-lg font-bold font-display tracking-tight whitespace-nowrap">IoT Telemetry</motion.h3>
                <span className="material-symbols-outlined text-gray-500">sensors</span>
            </div>

            <motion.div 
                className="space-y-4 font-jetbrains flex-grow z-10"
                animate={{ opacity: isCollapsed ? 0.3 : 1 }}
            >
                {/* Data rows - we keep them rendered but fade them if collapsed */}
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-xs text-gray-500 uppercase tracking-widest truncate mr-2">CABIN_TEMP</span>
                    <span className="text-xl text-white font-bold tabular-nums">{data.temp}°F</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-xs text-gray-500 uppercase tracking-widest truncate mr-2">HUMIDITY</span>
                    <span className="text-xl text-white font-bold tabular-nums">{data.humidity}%</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-xs text-gray-500 uppercase tracking-widest truncate mr-2">CO2_PPM</span>
                    <span className="text-xl text-white font-bold tabular-nums">{data.co2}</span>
                </div>
                {!isCollapsed && (
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }}
                        className="flex justify-between items-center pb-2"
                    >
                        <span className="text-xs text-gray-500 uppercase tracking-widest truncate mr-2">SHOCK_G</span>
                        <span className="text-xl text-[#5f7f73] font-bold tabular-nums">0.0G</span>
                    </motion.div>
                )}
            </motion.div>

            <motion.div 
                className="mt-4 pt-4 border-t border-white/10 z-10"
                layout
            >
                 <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#5f7f73] text-sm">check_circle</span>
                    <motion.span 
                        className="text-xs font-bold text-gray-400 font-jetbrains uppercase tracking-wider whitespace-nowrap"
                        animate={{ opacity: isCollapsed ? 0 : 1, width: isCollapsed ? 0 : 'auto' }}
                    >
                        Status: OPTIMAL
                    </motion.span>
                 </div>
            </motion.div>
            
             <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-orange/5 to-transparent h-[20%] w-full animate-[scan_3s_linear_infinite] pointer-events-none z-0"></div>
             <style>{`@keyframes scan { 0% { top: -20%; } 100% { top: 120%; } }`}</style>
        </div>
    );
};

// --- Module 3: Micro-Fulfillment (Active Nodes) ---
const NodesModule = ({ isCollapsed }: { isCollapsed: boolean }) => {
    const rows = 6;
    const cols = 8;
    const [activeNodes, setActiveNodes] = useState<number[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            const count = 3 + Math.floor(Math.random() * 3);
            const newActive = Array.from({length: count}, () => Math.floor(Math.random() * (rows * cols)));
            setActiveNodes(newActive);
        }, 600);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-full w-full p-6 md:p-8 flex flex-col justify-between relative overflow-hidden">
             <div className="flex justify-between items-start mb-4 z-10">
                <div className="min-w-0">
                    <motion.h3 layout="position" className="text-white text-lg font-bold font-display tracking-tight mb-1 whitespace-nowrap">Micro-Hubs</motion.h3>
                    <motion.p 
                        animate={{ opacity: isCollapsed ? 0 : 1 }}
                        className="text-[10px] text-gray-400 font-jetbrains uppercase tracking-widest whitespace-nowrap"
                    >
                        Distributed Fulfillment
                    </motion.p>
                </div>
                <span className="material-symbols-outlined text-gray-500">hub</span>
            </div>

            <motion.div 
                className="grid grid-cols-8 gap-2 w-full h-full content-center z-10 opacity-80"
                animate={{ opacity: isCollapsed ? 0.2 : 0.8 }}
            >
                {Array.from({ length: rows * cols }).map((_, i) => (
                    <motion.div 
                        key={i}
                        className={`w-full aspect-square rounded-sm transition-colors duration-300 ${activeNodes.includes(i) ? 'bg-brand-orange shadow-[0_0_8px_#c76a2a]' : 'bg-white/10'}`}
                        animate={{
                            scale: activeNodes.includes(i) ? 1.1 : 1,
                        }}
                    />
                ))}
            </motion.div>

            <motion.div 
                className="mt-6 flex items-center justify-between z-10"
                animate={{ opacity: isCollapsed ? 0 : 1 }}
            >
                 <span className="text-[10px] text-gray-500 font-jetbrains uppercase tracking-widest whitespace-nowrap">Active Nodes</span>
                 <span className="text-2xl font-bold text-white font-jetbrains tabular-nums">142</span>
            </motion.div>
        </div>
    );
};

const SolutionsBento: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Helper to determine flex value
  const getFlexValue = (index: number) => {
    if (hoveredIndex === null) return 1;
    return hoveredIndex === index ? 3 : 1;
  };

  const isCollapsed = (index: number) => {
    return hoveredIndex !== null && hoveredIndex !== index;
  };

  return (
    <section id="solutions" className="py-32 bg-[#191a1a] relative overflow-hidden">
        {/* Subtle Grid Background */}
        <div className="absolute inset-0 z-0 opacity-10" 
             style={{ 
                 backgroundImage: `linear-gradient(${COLORS.border} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.border} 1px, transparent 1px)`, 
                 backgroundSize: '40px 40px' 
             }}>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="mb-20 max-w-2xl">
              <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6 font-display text-[#e8e8e2]">
                Operating System for Fresh.
              </h2>
              <p className="text-[#e8e8e2]/60 text-lg lg:text-xl leading-relaxed font-normal">
                We don't just ship goods; we provide a full-stack command center replacing legacy friction with sub-second decision making.
              </p>
            </div>

            {/* Fluid Bento Container */}
            <div className="flex flex-col lg:flex-row gap-6 h-auto lg:h-[600px] w-full">
                
                {/* Module 1 */}
                <motion.div 
                    className="relative rounded-[2rem] bg-white/[0.03] border border-white/10 backdrop-blur-sm overflow-hidden group hover:border-white/20 transition-colors h-[400px] lg:h-auto"
                    onHoverStart={() => setHoveredIndex(0)}
                    onHoverEnd={() => setHoveredIndex(null)}
                    layout
                    transition={springTransition}
                    animate={{ flex: getFlexValue(0) }}
                    style={{ flex: 1 }} // Initial SSR state
                >
                    <AIChartModule isCollapsed={isCollapsed(0)} />
                </motion.div>

                {/* Module 2 */}
                <motion.div 
                    className="relative rounded-[2rem] bg-white/[0.03] border border-white/10 backdrop-blur-sm overflow-hidden group hover:border-white/20 transition-colors h-[400px] lg:h-auto"
                    onHoverStart={() => setHoveredIndex(1)}
                    onHoverEnd={() => setHoveredIndex(null)}
                    layout
                    transition={springTransition}
                    animate={{ flex: getFlexValue(1) }}
                    style={{ flex: 1 }}
                >
                    <IoTModule isCollapsed={isCollapsed(1)} />
                </motion.div>

                {/* Module 3 */}
                <motion.div 
                    className="relative rounded-[2rem] bg-white/[0.03] border border-white/10 backdrop-blur-sm overflow-hidden group hover:border-white/20 transition-colors h-[400px] lg:h-auto"
                    onHoverStart={() => setHoveredIndex(2)}
                    onHoverEnd={() => setHoveredIndex(null)}
                    layout
                    transition={springTransition}
                    animate={{ flex: getFlexValue(2) }}
                    style={{ flex: 1 }}
                >
                    <NodesModule isCollapsed={isCollapsed(2)} />
                </motion.div>

            </div>
        </div>
    </section>
  );
};

export default SolutionsBento;

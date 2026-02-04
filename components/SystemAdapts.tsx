
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CYCLE_DURATION = 7000;

const SCENARIOS = [
  {
    id: 'allocation',
    alertTitle: "⚠️ HARVEST MATURITY MISMATCH",
    alertColor: "text-brand-orange",
    body: "Incoming scan shows brix levels are too high for grocery supply chains.",
    action: "✓ REROUTING TO QSR PARTNER",
    actionColor: "bg-[#c76a2a] text-white" // Burnished Orange for Action Logic
  },
  {
    id: 'continuity',
    alertTitle: "⛈️ CRITICAL WEATHER ALERT",
    alertColor: "text-[#8f3d3a]",
    body: "Severe hail in Salinas Zone 4 has compromised the primary harvest.",
    action: "✓ ACTIVATING ARIZONA BACKUP FARM",
    actionColor: "bg-[#8f3d3a] text-white" // Deep Red for Critical Alert
  },
  {
    id: 'rescue',
    alertTitle: "❄️ TEMP THRESHOLD EXCEEDED",
    alertColor: "text-[#8f3d3a]",
    body: "Truck refrigeration failed. Shelf life has dropped to < 24 hours.",
    action: "✓ DIVERTING TO JUICE PROCESSOR",
    actionColor: "bg-[#8f3d3a] text-white" // Deep Red for Critical Alert
  }
];

// --- Visual 1: Smart Allocation (Sorting) ---
const AllocationVisual = () => {
  return (
    <svg className="w-full h-full" viewBox="0 0 400 300" fill="none">
      <defs>
        <pattern id="grid-alloc" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="#333" />
        </pattern>
      </defs>
      <rect width="400" height="300" fill="url(#grid-alloc)" opacity="0.3" />

      {/* Inputs */}
      <text x="200" y="30" fill="#666" fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle">INBOUND HARVEST</text>
      <line x1="200" y1="40" x2="200" y2="80" stroke="#444" strokeWidth="2" />

      {/* Scanner Node */}
      <circle cx="200" cy="100" r="20" fill="#111" stroke="#444" strokeWidth="2" />
      <motion.circle 
        cx="200" cy="100" r="20" stroke="#c76a2a" strokeWidth="2" fill="none"
        animate={{ opacity: [0, 1, 0], scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      />
      <text x="200" y="104" fill="#fff" fontSize="8" fontFamily="JetBrains Mono" textAnchor="middle">SCAN</text>

      {/* Paths */}
      <path d="M 200 120 L 200 150 L 100 200 L 100 240" stroke="#333" strokeWidth="2" fill="none" />
      <path d="M 200 120 L 200 150 L 300 200 L 300 240" stroke="#333" strokeWidth="2" fill="none" />

      {/* Destinations */}
      <rect x="70" y="240" width="60" height="40" rx="4" fill="#111" stroke="#333" />
      <text x="100" y="265" fill="#c76a2a" fontSize="10" fontFamily="Plus Jakarta Sans" fontWeight="bold" textAnchor="middle">QSR</text>
      
      <rect x="270" y="240" width="60" height="40" rx="4" fill="#111" stroke="#333" />
      <text x="300" y="265" fill="#5f7f73" fontSize="10" fontFamily="Plus Jakarta Sans" fontWeight="bold" textAnchor="middle">RETAIL</text>

      {/* Moving Particles - High Brix (Orange) -> QSR */}
      <motion.circle r="6" fill="#c76a2a">
        <animateMotion 
           path="M 200 40 L 200 150 L 100 200 L 100 245"
           dur="2s" begin="0s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear"
        />
      </motion.circle>
      <motion.circle r="6" fill="#c76a2a">
        <animateMotion 
           path="M 200 40 L 200 150 L 100 200 L 100 245"
           dur="2s" begin="1s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear"
        />
      </motion.circle>

      {/* Moving Particles - Standard (Green) -> Retail */}
      <motion.circle r="6" fill="#5f7f73">
        <animateMotion 
           path="M 200 40 L 200 150 L 300 200 L 300 245"
           dur="2s" begin="0.5s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear"
        />
      </motion.circle>
    </svg>
  );
};

// --- Visual 2: Continuity (Map Switch) ---
const ContinuityVisual = () => {
  return (
    <svg className="w-full h-full" viewBox="0 0 400 300" fill="none">
       {/* Background */}
       <defs>
        <pattern id="grid-map" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#222" strokeWidth="1"/>
        </pattern>
      </defs>
      <rect width="400" height="300" fill="url(#grid-map)" />

      {/* Node A: Salinas (Compromised) */}
      <circle cx="80" cy="100" r="6" fill="#333" stroke="#555" />
      <text x="80" y="125" fill="#666" fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle">SALINAS</text>
      
      {/* Storm Icon on A */}
      <motion.g initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }}>
        <text x="80" y="90" fontSize="24" textAnchor="middle">⛈️</text>
        <circle cx="80" cy="100" r="15" stroke="#ef4444" strokeWidth="2" fill="none" className="animate-ping" />
      </motion.g>

      {/* Destination */}
      <circle cx="320" cy="150" r="8" fill="#fff" />
      <text x="320" y="175" fill="#fff" fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle">DIST. CENTER</text>

      {/* Broken Line A -> Dest */}
      <motion.path 
        d="M 80 100 Q 200 80 320 150" 
        stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4"
        initial={{ opacity: 1 }} animate={{ opacity: 0.3 }} transition={{ delay: 0.5, duration: 0.5 }}
      />

      {/* Node B: Arizona (Backup) */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
        <circle cx="120" cy="220" r="6" fill="#5f7f73" />
        <text x="120" y="245" fill="#5f7f73" fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle">ARIZONA</text>
      </motion.g>

      {/* New Line B -> Dest */}
      <motion.path 
        d="M 120 220 Q 220 220 320 150" 
        stroke="#5f7f73" strokeWidth="3" fill="none"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.5, duration: 1.5 }}
      />

      {/* Truck on new line */}
      <motion.circle r="4" fill="#fff">
        <animateMotion 
           path="M 120 220 Q 220 220 320 150"
           dur="1.5s" begin="2.5s" fill="freeze"
        />
      </motion.circle>
    </svg>
  );
};

// --- Visual 3: Value Rescue (Cold Chain Divert) ---
const RescueVisual = () => {
  return (
    <svg className="w-full h-full" viewBox="0 0 400 300" fill="none">
       {/* Roads */}
       <path d="M 50 150 L 350 150" stroke="#333" strokeWidth="12" strokeLinecap="round" />
       <path d="M 200 150 L 200 250" stroke="#333" strokeWidth="12" strokeLinecap="round" />
       <circle cx="200" cy="150" r="8" fill="#333" />

       {/* Destination: Store */}
       <rect x="340" y="130" width="40" height="40" fill="#222" rx="4" />
       <text x="360" y="120" fill="#666" fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle">STORE</text>

       {/* Destination: Processing */}
       <rect x="180" y="250" width="40" height="40" fill="#222" rx="4" />
       <text x="200" y="305" fill="#c76a2a" fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle">FACTORY</text>

       {/* The Truck and Gauge Container */}
       <motion.g
         initial={{ x: 50, y: 150 }}
         animate={{ 
            x: [50, 200, 200],
            y: [150, 150, 250]
         }}
         transition={{ duration: 4, times: [0, 0.4, 1], ease: "easeInOut" }}
       >
          {/* Truck Body */}
          <rect x="-15" y="-10" width="30" height="20" fill="#fff" rx="2" />
          
          {/* Gauge Popup */}
          <motion.g
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: -30 }}
            transition={{ delay: 0.5 }}
          >
             <rect x="-25" y="-20" width="50" height="25" fill="#111" stroke="#333" rx="4" />
             {/* Text Changes */}
             <motion.text 
               x="0" y="-5" textAnchor="middle" fontSize="10" fontFamily="JetBrains Mono" fontWeight="bold"
               initial={{ fill: "#5f7f73" }}
               animate={{ fill: "#ef4444" }}
               transition={{ delay: 1.5 }}
             >
                <tspan className="hidden">5 DAYS</tspan> {/* Fallback */}
             </motion.text>
             {/* Using separate text elements for switch to avoid complex tspan anims */}
             <motion.text x="0" y="-5" textAnchor="middle" fontSize="10" fontFamily="JetBrains Mono" fill="#5f7f73"
                initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ delay: 1.5 }}>
                5 DAYS
             </motion.text>
             <motion.text x="0" y="-5" textAnchor="middle" fontSize="10" fontFamily="JetBrains Mono" fill="#ef4444"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
                &lt; 24HRS
             </motion.text>
          </motion.g>
       </motion.g>

       {/* Alert Icon */}
       <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1, scale: [1, 1.2, 1] }} transition={{ delay: 1.5, repeat: 2 }}>
          <text x="200" y="120" fontSize="20" textAnchor="middle" fill="#ef4444">⚠️</text>
       </motion.g>

    </svg>
  );
};


const SystemAdapts: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Reset progress
    setProgress(0);
    
    // Animation loop for progress bar
    const progressInterval = setInterval(() => {
      setProgress(prev => Math.min(prev + (100 / (CYCLE_DURATION / 50)), 100));
    }, 50);

    // Scenario switch loop
    const cycleInterval = setInterval(() => {
        setIndex((prev) => (prev + 1) % SCENARIOS.length);
        setProgress(0);
    }, CYCLE_DURATION);

    return () => {
        clearInterval(cycleInterval);
        clearInterval(progressInterval);
    };
  }, []);

  const active = SCENARIOS[index];

  return (
    <section className="bg-[#191a1a] py-32 border-b border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
            <div className="mb-12">
                <h2 className="text-4xl font-bold tracking-tight mb-4 font-display text-[#e8e8e2]">Mission Control for Fresh.</h2>
                <p className="text-[#e8e8e2]/60 text-lg max-w-xl font-normal font-jetbrains">
                    Orchestrating complex logistics logic in milliseconds.
                </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-6 lg:gap-12 items-stretch h-[500px]">
                
                {/* LEFT: Status Card (STATIC CONTAINER) */}
                <div className="lg:col-span-5 flex flex-col">
                    <div className="bg-[#111] rounded-2xl border border-white/10 p-1 flex-grow flex flex-col shadow-2xl relative overflow-hidden">
                        
                        {/* Static Header with Progress */}
                        <div className="p-6 pb-4 border-b border-white/5 relative bg-[#151515]">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest font-jetbrains">
                                    System Notification
                                </span>
                                <div className="text-[10px] font-jetbrains text-gray-600">LIVE_SEQ_{index + 1}</div>
                            </div>
                            <div className="absolute bottom-0 left-0 h-0.5 bg-brand-orange transition-all duration-75 ease-linear" style={{ width: `${progress}%` }}></div>
                        </div>

                        {/* Fading Content Area */}
                        <div className="p-8 flex-grow flex flex-col justify-center gap-8 relative">
                           <AnimatePresence mode="wait">
                              <motion.div
                                key={active.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="flex flex-col gap-8"
                              >
                                  {/* 1. Alert Title */}
                                  <div>
                                     <h3 className={`text-xl md:text-2xl font-bold font-display leading-tight mb-2 ${active.alertColor}`}>
                                        {active.alertTitle}
                                     </h3>
                                  </div>

                                  {/* 2. Body Text */}
                                  <div>
                                     <p className="text-[#e8e8e2] text-lg md:text-xl font-medium leading-relaxed font-sans">
                                        {active.body}
                                     </p>
                                  </div>

                                  {/* 3. Action Pill */}
                                  <div className="mt-2">
                                     <div className={`inline-block px-6 py-4 rounded-xl font-bold font-jetbrains text-sm uppercase tracking-wide shadow-lg ${active.actionColor}`}>
                                        {active.action}
                                     </div>
                                  </div>
                              </motion.div>
                           </AnimatePresence>
                        </div>

                    </div>
                </div>

                {/* RIGHT: Schematic Visualization */}
                <div className="lg:col-span-7 bg-[#111] rounded-2xl border border-white/10 relative overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 to-transparent opacity-50"></div>
                    
                    {/* Visual Container */}
                    <div className="w-full h-full p-8 relative z-10">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={active.id}
                                className="w-full h-full"
                                initial={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
                                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                exit={{ opacity: 0, scale: 1.05, filter: "blur(4px)" }}
                                transition={{ duration: 0.5 }}
                            >
                                {active.id === 'allocation' && <AllocationVisual />}
                                {active.id === 'continuity' && <ContinuityVisual />}
                                {active.id === 'rescue' && <RescueVisual />}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Overlay Label */}
                    <div className="absolute top-4 right-6 bg-black/50 backdrop-blur border border-white/10 px-3 py-1 rounded-full">
                         <span className="text-[10px] font-bold text-gray-400 font-jetbrains uppercase tracking-widest">
                            Schematic View
                         </span>
                    </div>
                </div>

            </div>
        </div>
    </section>
  );
};

export default SystemAdapts;

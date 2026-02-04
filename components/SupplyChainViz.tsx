import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Constants & Types ---
const COLORS = {
  bg: '#fcfcf9',          // Universal White
  grid: 'rgba(20, 52, 59, 0.05)', // Deep Teal at low opacity
  nodeBorder: '#CBD5E1',
  nodeFill: '#FFFFFF',
  legacyParticle: '#c76a2a', // Burnished Orange (Problem State)
  optimizedParticle: '#5f7f73', // Sage Green (Solution State)
  brandOrange: '#c76a2a', // Burnished Orange
  textMain: '#14343b',    // Universal Black Text (Deep Teal)
  textMuted: '#94a3b8'
};

interface NodeEntity {
  id: number;
  label: string;
  lx: number;
  ly: number;
  ox: number;
  oy: number;
  type: 'terminal' | 'middle' | 'center' | 'mesh';
}

interface Particle {
  id: string;
  currentSegment: number;
  t: number;
  speed: number;
  color: string;
  isOptimized: boolean;
  pathIndices: number[];
}

const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t;

// Nodes Configuration
const NODES_DATA: NodeEntity[] = [
  { id: 0, label: "Farm", lx: 0.08, ly: 0.5, ox: 0.08, oy: 0.5, type: 'terminal' },
  { id: 1, label: "Processor", lx: 0.22, ly: 0.5, ox: 0.5, oy: 0.5, type: 'middle' },
  { id: 2, label: "Marketer", lx: 0.36, ly: 0.5, ox: 0.5, oy: 0.5, type: 'middle' },
  { id: 3, label: "Importer", lx: 0.50, ly: 0.5, ox: 0.5, oy: 0.5, type: 'middle' },
  { id: 4, label: "", lx: 0.63, ly: 0.30, ox: 0.5, oy: 0.5, type: 'mesh' },
  { id: 5, label: "", lx: 0.63, ly: 0.50, ox: 0.5, oy: 0.5, type: 'mesh' },
  { id: 6, label: "", lx: 0.63, ly: 0.70, ox: 0.5, oy: 0.5, type: 'mesh' },
  { id: 7, label: "", lx: 0.74, ly: 0.40, ox: 0.5, oy: 0.5, type: 'mesh' },
  { id: 8, label: "", lx: 0.74, ly: 0.60, ox: 0.5, oy: 0.5, type: 'mesh' },
  { id: 9, label: "Grocery Store", lx: 0.88, ly: 0.25, ox: 0.88, oy: 0.3, type: 'terminal' },
  { id: 10, label: "Restaurant", lx: 0.88, ly: 0.75, ox: 0.88, oy: 0.7, type: 'terminal' },
  { id: 11, label: "GETASAP: End-to-End Distribution", lx: 0.5, ly: 0.5, ox: 0.5, oy: 0.5, type: 'center' }
];

const SupplyChainViz: React.FC = () => {
  const [isOptimized, setIsOptimized] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mainSectionRef = useRef<HTMLDivElement>(null);
  
  const stateRef = useRef({
    transition: 0, 
    targetTransition: 0,
    particles: [] as Particle[],
    lastSpawn: 0,
    dimensions: { w: 0, h: 0 }
  });

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current && canvasRef.current) {
        const { offsetWidth, offsetHeight } = containerRef.current;
        canvasRef.current.width = offsetWidth * window.devicePixelRatio;
        canvasRef.current.height = offsetHeight * window.devicePixelRatio;
        stateRef.current.dimensions = { w: offsetWidth, h: offsetHeight };
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

    const render = (time: number) => {
      const state = stateRef.current;
      const { w, h } = state.dimensions;
      if (w === 0) return requestAnimationFrame(render);
      
      // Smooth Transition Logic
      state.transition += (state.targetTransition - state.transition) * 0.08;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

      // 1. Grid Background
      ctx.strokeStyle = COLORS.grid;
      ctx.lineWidth = 1;
      const gridSize = 40;
      ctx.beginPath();
      for (let x = 0; x <= w; x += gridSize) { ctx.moveTo(x, 0); ctx.lineTo(x, h); }
      for (let y = 0; y <= h; y += gridSize) { ctx.moveTo(0, y); ctx.lineTo(w, y); }
      ctx.stroke();

      // Calculate Current Node Positions
      const nodes = NODES_DATA.map(node => ({
        ...node,
        px: lerp(node.lx, node.ox, state.transition) * w,
        py: lerp(node.ly, node.oy, state.transition) * h
      }));

      // 2. Draw Legacy Connections
      ctx.lineWidth = 1;
      ctx.globalAlpha = Math.max(0, 1 - state.transition * 2.0); 
      if (ctx.globalAlpha > 0) {
        ctx.strokeStyle = COLORS.nodeBorder;
        ctx.beginPath();
        // Spine
        ctx.moveTo(nodes[0].px, nodes[0].py); ctx.lineTo(nodes[1].px, nodes[1].py);
        ctx.lineTo(nodes[2].px, nodes[2].py); ctx.lineTo(nodes[3].px, nodes[3].py);
        // Entry
        ctx.moveTo(nodes[3].px, nodes[3].py); ctx.lineTo(nodes[4].px, nodes[4].py);
        ctx.moveTo(nodes[3].px, nodes[3].py); ctx.lineTo(nodes[5].px, nodes[5].py);
        ctx.moveTo(nodes[3].px, nodes[3].py); ctx.lineTo(nodes[6].px, nodes[6].py);
        // Mesh
        ctx.moveTo(nodes[4].px, nodes[4].py); ctx.lineTo(nodes[5].px, nodes[5].py);
        ctx.moveTo(nodes[4].px, nodes[4].py); ctx.lineTo(nodes[7].px, nodes[7].py);
        ctx.moveTo(nodes[5].px, nodes[5].py); ctx.lineTo(nodes[6].px, nodes[6].py);
        ctx.moveTo(nodes[5].px, nodes[5].py); ctx.lineTo(nodes[7].px, nodes[7].py);
        ctx.moveTo(nodes[5].px, nodes[5].py); ctx.lineTo(nodes[8].px, nodes[8].py);
        ctx.moveTo(nodes[6].px, nodes[6].py); ctx.lineTo(nodes[8].px, nodes[8].py);
        ctx.moveTo(nodes[7].px, nodes[7].py); ctx.lineTo(nodes[8].px, nodes[8].py);
        // Exit
        [4, 5, 6, 7, 8].forEach(id => {
            ctx.moveTo(nodes[id].px, nodes[id].py); ctx.lineTo(nodes[9].px, nodes[9].py);
            ctx.moveTo(nodes[id].px, nodes[id].py); ctx.lineTo(nodes[10].px, nodes[10].py);
        });
        ctx.stroke();

        ctx.fillStyle = COLORS.textMain;
        ctx.font = "700 10px 'Plus Jakarta Sans'";
        ctx.textAlign = 'center';
        ctx.fillText("REGIONAL DISTRIBUTORS", w * 0.685, h * 0.15);
      }
      ctx.globalAlpha = 1.0;

      // 3. Draw Optimized Connections (Using Burnished Orange)
      if (state.transition > 0.1) {
        ctx.lineWidth = 2 * state.transition;
        ctx.strokeStyle = `rgba(199, 106, 42, ${state.transition})`; // #c76a2a in RGB
        ctx.beginPath();
        ctx.moveTo(nodes[0].px, nodes[0].py); ctx.lineTo(nodes[11].px, nodes[11].py);
        ctx.moveTo(nodes[11].px, nodes[11].py); ctx.lineTo(nodes[9].px, nodes[9].py);
        ctx.moveTo(nodes[11].px, nodes[11].py); ctx.lineTo(nodes[10].px, nodes[10].py);
        ctx.stroke();
      }

      // 4. Draw Nodes
      nodes.forEach(node => {
        const isHiddenInOptimized = ['middle', 'mesh'].includes(node.type);
        const opacity = isHiddenInOptimized ? 1 - state.transition : 1;
        if (opacity <= 0.05) return;
        ctx.globalAlpha = opacity;

        if (node.type === 'center') {
            const size = lerp(0, 30, state.transition);
            if (size > 1) {
                ctx.globalAlpha = state.transition;
                ctx.shadowBlur = 20 * state.transition;
                ctx.shadowColor = COLORS.brandOrange;
                ctx.fillStyle = COLORS.brandOrange;
                ctx.beginPath();
                ctx.arc(node.px, node.py, size, 0, Math.PI * 2);
                ctx.fill();
                ctx.shadowBlur = 0;
                
                ctx.fillStyle = 'white';
                ctx.font = `bold ${16 * state.transition}px "Material Symbols Outlined"`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText('bolt', node.px, node.py);
                
                ctx.fillStyle = COLORS.brandOrange;
                ctx.font = "bold 12px 'Plus Jakarta Sans'";
                ctx.fillText(node.label, node.px, node.py + 50);
            }
        } else if (node.type === 'middle' || node.type === 'mesh') {
            ctx.fillStyle = COLORS.nodeFill;
            ctx.strokeStyle = COLORS.nodeBorder;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(node.px, node.py, 5, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            
            if (node.type !== 'mesh') {
                ctx.fillStyle = COLORS.textMuted;
                ctx.font = "500 9px 'JetBrains Mono'";
                ctx.textAlign = 'center';
                ctx.fillText(node.label, node.px, node.py + 16);
            }
        } else {
            ctx.fillStyle = COLORS.nodeFill;
            ctx.strokeStyle = COLORS.textMain;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(node.px, node.py, 8, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            
            ctx.fillStyle = COLORS.textMain;
            ctx.font = "700 10px 'Plus Jakarta Sans'";
            ctx.textAlign = 'center';
            ctx.fillText(node.label.toUpperCase(), node.px, node.py + 24);
        }
        ctx.globalAlpha = 1.0;
      });

      // 5. Particles Logic
      if (time - state.lastSpawn > (state.targetTransition > 0.5 ? 200 : 300)) {
        const isOpt = state.targetTransition > 0.5;
        let pathIndices: number[] = [];
        if (isOpt) {
            const target = Math.random() > 0.5 ? 9 : 10;
            pathIndices = [0, 11, target];
        } else {
            const r = Math.random();
            const backbone = [0, 1, 2, 3];
            if (r < 0.2) pathIndices = [...backbone, 4, 9];
            else if (r < 0.5) pathIndices = [...backbone, 5, 7, 9];
            else if (r < 0.8) pathIndices = [...backbone, 6, 5, 8, 10];
            else pathIndices = [...backbone, 4, 6, 5, 10];
        }
        state.particles.push({
          id: Math.random().toString(),
          currentSegment: 0,
          t: 0,
          speed: isOpt ? 0.025 : 0.04,
          color: isOpt ? COLORS.optimizedParticle : COLORS.legacyParticle,
          isOptimized: isOpt,
          pathIndices
        });
        state.lastSpawn = time;
      }

      for (let i = state.particles.length - 1; i >= 0; i--) {
        const p = state.particles[i];
        p.t += p.speed;
        if (p.t >= 1) {
            p.t = 0;
            p.currentSegment++;
            if (p.currentSegment >= p.pathIndices.length - 1) {
                state.particles.splice(i, 1);
                continue;
            }
        }
        const startIndex = p.pathIndices[p.currentSegment];
        const endIndex = p.pathIndices[p.currentSegment + 1];
        const startNode = nodes[startIndex];
        const endNode = nodes[endIndex];
        const currX = lerp(startNode.px, endNode.px, p.t);
        const currY = lerp(startNode.py, endNode.py, p.t);

        ctx.fillStyle = p.color;
        if (p.isOptimized) {
            ctx.shadowBlur = 6;
            ctx.shadowColor = p.color;
        }
        ctx.beginPath();
        ctx.arc(currX, currY, p.isOptimized ? 3.5 : 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      ctx.restore();
      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationId);
  }, []);

  useEffect(() => {
    stateRef.current.targetTransition = isOptimized ? 1 : 0;
  }, [isOptimized]);

  return (
    <div 
        ref={mainSectionRef}
        className="w-full pt-24 pb-8 border-t border-gray-100 bg-[#fcfcf9] transition-colors duration-500" 
        id="intelligence"
    >
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-stretch">
            
            <div className="lg:col-span-5 flex flex-col h-full pt-4 pb-4">
                {/* Fixed height container for crossfade transition */}
                <div className="h-[280px] flex flex-col justify-center mb-6 relative">
                    <AnimatePresence>
                        <motion.div
                            key={isOptimized ? "opt" : "leg"}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, transition: { duration: 0 } }}
                            transition={{ duration: 0.3 }}
                            className="absolute top-1/2 -translate-y-1/2 left-0 right-0"
                        >
                            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6 font-display text-[#14343b] leading-tight">
                                {isOptimized ? "Vertical integration. Absolute certainty." : "Reliability is impossible without control."}
                            </h2>
                            <p className="text-lg leading-relaxed font-normal text-gray-500">
                                {isOptimized 
                                    ? "End-to-end control from farm to shelf. < 8 hour delivery made possible with our micro-fulfillment infrastructure and AI-demand intelligence, ensuring we're always in stock."
                                    : "Legacy distribution is built on fragmented ownership. The result is blind spots, unpredictable latency, and frequent stockouts. Optimization is impossible without control."
                                }
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="space-y-8 mt-auto relative z-10">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl border border-gray-100 bg-white/50">
                            <p className="text-[10px] font-semibold uppercase tracking-widest font-jetbrains mb-1 text-gray-400">Transit Time</p>
                            <p className={`text-2xl font-bold font-jetbrains transition-colors duration-500 ${isOptimized ? 'text-brand-orange' : 'text-[#14343b]'}`}>
                                {isOptimized ? "< 8 Hours" : "7+ Days"}
                            </p>
                        </div>
                        <div className="p-4 rounded-xl border border-gray-100 bg-white/50">
                            <p className="text-[10px] font-semibold uppercase tracking-widest font-jetbrains mb-1 text-gray-400">Handoffs</p>
                            <p className={`text-2xl font-bold font-jetbrains transition-colors duration-500 ${isOptimized ? 'text-brand-orange' : 'text-[#14343b]'}`}>
                                {isOptimized ? "1 Direct" : "5+ Middlemen"}
                            </p>
                        </div>
                    </div>

                    <div>
                        <div className="bg-[#e8e8e2] p-1 rounded-full inline-flex relative w-64 h-12">
                            <motion.div 
                              layout
                              className="absolute top-1 bottom-1 rounded-full bg-[#c76a2a]"
                              initial={false}
                              animate={{ 
                                 left: isOptimized ? '50%' : '4px', 
                                 width: 'calc(50% - 4px)' 
                              }}
                              transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                            
                            <button 
                               onClick={() => setIsOptimized(false)}
                               className={`relative z-10 w-1/2 text-xs font-bold uppercase tracking-widest font-jetbrains transition-colors duration-300 ${!isOptimized ? 'text-[#e8e8e2]' : 'text-[#14343b]/60 hover:text-[#14343b]'}`}
                            >
                               Legacy
                            </button>
                            <button 
                               onClick={() => setIsOptimized(true)}
                               className={`relative z-10 w-1/2 text-xs font-bold uppercase tracking-widest font-jetbrains transition-colors duration-300 ${isOptimized ? 'text-[#e8e8e2]' : 'text-[#14343b]/60 hover:text-[#14343b]'}`}
                            >
                               GETASAP
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="lg:col-span-7">
                <div 
                    ref={containerRef}
                    className="relative w-full h-[540px] bg-[#fcfcf9] rounded-[2.5rem] border border-gray-200 overflow-hidden shadow-sm"
                >
                    <div className="absolute top-8 left-8 z-10 flex flex-col items-start gap-1">
                         <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest font-jetbrains">
                            Network Topology
                         </span>
                         <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${isOptimized ? 'bg-brand-orange' : 'bg-gray-400'}`}></div>
                            <span className="text-sm font-bold text-[#14343b] font-display">
                                {isOptimized ? 'GETASAP Supply Chain' : 'Legacy Supply Chain'}
                            </span>
                         </div>
                    </div>

                    <canvas ref={canvasRef} className="w-full h-full block" />
                    
                    <div className="absolute bottom-8 left-8 z-10 opacity-30 pointer-events-none">
                         <p className="text-[8px] font-jetbrains text-gray-400 uppercase tracking-tighter">topology_viz_v4.5_final</p>
                    </div>
                </div>
            </div>

        </div>
    </div>
  );
};

export default SupplyChainViz;

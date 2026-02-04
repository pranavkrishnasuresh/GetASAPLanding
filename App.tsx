
import React from 'react';
import Console from './components/Console';
import SupplyChainViz from './components/SupplyChainViz';
import SolutionsBento from './components/SolutionsBento';
import SystemAdapts from './components/SystemAdapts';
import TrustedPartners from './components/TrustedPartners';
import WorldClassInvestors from './components/WorldClassInvestors';

const App: React.FC = () => {
  const CALENDAR_LINK = "https://calendar.app.google/zPGzUPgEkDvqLTGM9";

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', `#${id}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcf9]">
      <header className="w-full border-b border-gray-100 py-4 sticky top-0 bg-[#fcfcf9]/80 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={(e) => scrollToSection(e as any, 'hero')}>
            <img src="/logo.png" alt="GETASAP Logo" className="w-7 h-7 object-contain" />
            <span className="text-lg font-bold tracking-tighter uppercase font-display text-[#14343b]">GETASAP</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a 
              className="text-[11px] font-medium uppercase tracking-wider text-gray-500 hover:text-brand-orange transition-colors" 
              href="#hero" 
              onClick={(e) => scrollToSection(e, 'hero')}
            >
              About
            </a>
            <a 
              className="text-[11px] font-medium uppercase tracking-wider text-gray-500 hover:text-brand-orange transition-colors" 
              href="#intelligence" 
              onClick={(e) => scrollToSection(e, 'intelligence')}
            >
              Intelligence
            </a>
            <a 
              className="text-[11px] font-medium uppercase tracking-wider text-gray-500 hover:text-brand-orange transition-colors" 
              href="#solutions" 
              onClick={(e) => scrollToSection(e, 'solutions')}
            >
              Solutions
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <a 
              href={CALENDAR_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-orange text-white px-5 py-2.5 rounded text-[11px] font-semibold transition-all hover:brightness-110 active:scale-95 uppercase tracking-wide"
            >
              Meet Our Team
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* HERO SECTION */}
        <section id="hero" className="pt-16 pb-24 overflow-visible border-b border-gray-50">
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-start">
            <div className="relative pt-8">
              <div className="absolute -top-6 left-0">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-gray-100 bg-white shadow-sm">
                  <div className="w-5 h-5 bg-[#ff6600] flex items-center justify-center text-white font-bold text-[10px] rounded-sm">Y</div>
                  <span className="text-[11px] font-semibold text-gray-800 tracking-tight font-jetbrains">Y Combinator S25</span>
                </div>
              </div>
              
              <div className="space-y-8">
                <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-[#14343b] mt-0 font-display">
                  Tech-Enabled Produce Distributor for Global Retail.
                </h1>
                <div className="space-y-6">
                  <p className="text-lg lg:text-xl text-gray-500 max-w-lg leading-relaxed font-normal">
                  We replace legacy wholesalers with end-to-end demand forecasting and micro-hub infrastructure, enabling sub 8-hour delivery of farm-fresh produce.
                  </p>
                  <div className="flex flex-col items-start gap-4">
                    <a 
                      href={CALENDAR_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto text-center bg-brand-orange text-white px-10 py-5 rounded font-semibold text-sm hover:brightness-110 transition-all shadow-lg shadow-[#c76a2a]/20 active:scale-95 uppercase tracking-wide"
                    >
                      Meet Our Team
                    </a>
                    <a 
                      className="inline-flex items-center text-[11px] font-semibold text-gray-400 hover:text-brand-orange transition-colors uppercase tracking-widest ml-1 cursor-pointer font-jetbrains" 
                      onClick={(e) => scrollToSection(e as any, 'contact')}
                    >
                      KEEP YOUR SHELVES STOCKED <span className="material-symbols-outlined text-sm ml-1">arrow_forward</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <Console />
          </div>
        </section>

        {/* SOCIAL PROOF - RETAILERS */}
        <TrustedPartners />

        {/* INTERACTIVE INTELLIGENCE VISUALIZATION */}
        <SupplyChainViz />

        {/* CORE SOLUTIONS (NEW BENTO) & DARK CORE WRAPPER */}
        <div className="bg-[#191a1a] text-[#e8e8e2] relative z-10 overflow-hidden">
          {/* Unified Tech Grid Pattern Overlay */}
          <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
               style={{ 
                   backgroundImage: `linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)`, 
                   backgroundSize: '60px 60px' 
               }}>
          </div>
          
          <div className="relative z-10">
            <SolutionsBento />
            <SystemAdapts />

            {/* METRICS */}
            <section className="py-32 border-t border-white/10">
              <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                  <div className="space-y-4">
                    <p className="text-5xl font-bold font-display tracking-tight text-[#e8e8e2]">7-figure revenue</p>
                    <p className="text-[10px] font-medium text-gray-400 uppercase tracking-[0.3em] font-jetbrains">Bootstrapped & Profitable</p>
                  </div>
                  <div className="space-y-4 border-y md:border-y-0 md:border-x border-white/10 py-16 md:py-0">
                    <p className="text-5xl font-bold font-display tracking-tight text-[#e8e8e2]">30K+ outlets</p>
                    <p className="text-[10px] font-medium text-gray-400 uppercase tracking-[0.3em] font-jetbrains">Distribution footprint</p>
                  </div>
                  <div className="space-y-4">
                    <p className="text-5xl font-bold font-display tracking-tight text-[#e8e8e2]">8 hour</p>
                    <p className="text-[10px] font-medium text-gray-400 uppercase tracking-[0.3em] font-jetbrains">Fulfillment Time</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* INVESTORS */}
        <WorldClassInvestors />

        {/* FINAL CTA */}
        <section id="contact" className="py-40 bg-[#fcfcf9] border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <div className="max-w-4xl mx-auto space-y-12">
              <h2 className="text-6xl lg:text-7xl font-bold tracking-tight text-[#14343b] leading-[1.0] font-display">Modernize your fresh supply chain.</h2>
              <p className="text-xl lg:text-2xl text-gray-500 leading-relaxed max-w-2xl mx-auto font-normal">
                Join the retailers achieving 8-hour farm-to-shelf fulfillment.
              </p>
              <div className="pt-8">
                <a 
                  href={CALENDAR_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-orange text-white px-16 py-7 rounded-2xl font-semibold text-xl hover:brightness-110 transition-all shadow-2xl shadow-[#c76a2a]/30 inline-block active:scale-95 uppercase tracking-wide"
                >
                  Meet Our Team
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-gray-100">
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="GETASAP Logo" className="w-8 h-8 object-contain" />
              <span className="text-xl font-bold tracking-tighter uppercase font-display text-[#14343b]">GETASAP</span>
            </div>
            <div className="flex gap-12">
              <a className="text-[11px] font-semibold text-gray-400 hover:text-brand-orange transition-colors uppercase tracking-widest cursor-pointer font-jetbrains" href="#">Privacy</a>
              <a className="text-[11px] font-semibold text-gray-400 hover:text-brand-orange transition-colors uppercase tracking-widest cursor-pointer font-jetbrains" href="#">Terms</a>
              <a className="text-[11px] font-semibold text-gray-400 hover:text-brand-orange transition-colors uppercase tracking-widest cursor-pointer font-jetbrains" href="mailto:krishna@getasap.asia">Contact</a>
            </div>
            <p className="text-[11px] font-semibold text-gray-400 tracking-widest uppercase font-jetbrains">© 2026 Blaze Market Incorporated.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;

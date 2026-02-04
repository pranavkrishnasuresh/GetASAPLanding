
import React from 'react';
import { INVESTORS } from '../constants';

const WorldClassInvestors: React.FC = () => {
  return (
    <section className="py-24 bg-[#fefefb] border-y border-[#14343b]/5">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-xl font-bold tracking-tight text-[#14343b] font-display">
            Backed by world-class investors
          </h2>
        </div>

        {/* Grid Wall */}
        <div className="w-full border-t border-l border-[#14343b]/5 grid grid-cols-2 md:grid-cols-5">
          {INVESTORS.map((inv, idx) => (
            <div 
              key={idx}
              className="relative h-40 border-r border-b border-[#14343b]/5 bg-[#fefefb] hover:bg-white transition-all duration-500 group flex flex-col items-center justify-center p-6 cursor-default"
            >
              {inv.isPerson ? (
                 <div className="text-center transition-all duration-500 group-hover:scale-105 opacity-40 group-hover:opacity-100 grayscale group-hover:grayscale-0">
                    <p className="font-serif text-lg md:text-xl text-[#14343b] mb-2 leading-tight">{inv.name}</p>
                    <p className="text-[9px] font-semibold uppercase tracking-widest font-jetbrains text-[#14343b]/70">{inv.description}</p>
                 </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                    <img 
                      src={inv.logo} 
                      alt={inv.name} 
                      className="block max-h-10 max-w-[75%] w-auto object-contain opacity-40 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-110"
                      onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          const parent = e.currentTarget.parentElement;
                          if(parent) {
                              const fallback = parent.querySelector('.fallback-text');
                              if(fallback) fallback.classList.remove('hidden');
                          }
                      }}
                    />
                    <span className="fallback-text hidden font-serif text-lg text-[#14343b] opacity-40 group-hover:opacity-100 transition-all duration-500 text-center">
                        {inv.name}
                    </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorldClassInvestors;

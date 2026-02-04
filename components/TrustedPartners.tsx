
import React from 'react';
import { RETAILERS } from '../constants';

const TrustedPartners: React.FC = () => {
  return (
    <section className="py-24 bg-[#fefefb] border-y border-[#14343b]/5">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <h2 className="text-xl font-bold tracking-tight text-[#14343b] font-display">
            Trusted by retailers of all sizes
          </h2>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5f7f73] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#5f7f73]"></span>
            </span>
            <span className="text-[10px] font-bold text-[#5f7f73] font-jetbrains uppercase tracking-widest">
              Live Partners
            </span>
          </div>
        </div>

        {/* Grid Wall */}
        <div className="w-full border-t border-l border-[#14343b]/5 grid grid-cols-2 md:grid-cols-5">
          {RETAILERS.map((retailer, idx) => (
            <div 
              key={idx}
              className="relative h-40 border-r border-b border-[#14343b]/5 bg-[#fefefb] hover:bg-white transition-all duration-500 group flex items-center justify-center p-8 cursor-default"
            >
              {retailer.logo ? (
                <img 
                  src={retailer.logo} 
                  alt={retailer.name}
                  className="max-w-full max-h-full object-contain opacity-40 grayscale group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                />
              ) : (
                <span className="text-xl md:text-2xl font-serif text-[#14343b] opacity-40 grayscale group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 text-center leading-none tracking-tight">
                  {retailer.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedPartners;

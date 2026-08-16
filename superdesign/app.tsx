import React from 'react';
import { CircuitBackground } from './Component';
import { Cpu, MousePointer2 } from 'lucide-react';

const ELECTRIC_BLUE = "#00F0FF";

export default function App() {
  return (
    <div className="w-full h-screen font-sans">
      <CircuitBackground>
        <div className="flex flex-col items-center justify-center w-full h-full gap-6 text-center px-4">
          <div className="space-y-2 pointer-events-auto cursor-default">
            <h1 
              className="text-6xl md:text-8xl font-bold uppercase tracking-tighter text-white select-none transition-all duration-300"
              style={{
                textShadow: `0 0 10px #fff, 0 0 20px #fff, 0 0 30px ${ELECTRIC_BLUE}, 0 0 40px ${ELECTRIC_BLUE}`
              }}
            >
              Cyberpunk
            </h1>
            <h2 
              className="text-4xl md:text-6xl font-medium uppercase tracking-tight text-white/90 select-none"
              style={{
                textShadow: `0 0 5px #fff, 0 0 15px ${ELECTRIC_BLUE}, 0 0 25px ${ELECTRIC_BLUE}`
              }}
            >
              Circuits
            </h2>
          </div>
          
          <div className="mt-8 flex flex-col items-center gap-4 pointer-events-auto">
            <p className="text-[#00F0FF]/80 text-sm max-w-md drop-shadow-md font-mono">
              System initialized. Move cursor to route data paths. Click to alter frequency colors.
            </p>
            
            <button className="flex items-center gap-2 px-6 py-3 bg-[#00F0FF]/10 hover:bg-[#00F0FF]/20 backdrop-blur-md border border-[#00F0FF]/50 rounded-md text-[#00F0FF] transition-all duration-300 group font-mono uppercase tracking-wider text-sm shadow-[0_0_15px_rgba(0,240,255,0.3)] hover:shadow-[0_0_25px_rgba(0,240,255,0.5)]">
              <Cpu className="w-4 h-4 group-hover:rotate-90 transition-transform duration-500" />
              <span>Access Mainframe</span>
            </button>
          </div>

          <div className="absolute bottom-8 flex flex-col items-center gap-2 text-[#00F0FF]/50 animate-pulse pointer-events-none font-mono">
            <MousePointer2 className="w-6 h-6" />
            <span className="text-xs uppercase tracking-widest">Click to mutate</span>
          </div>
        </div>
      </CircuitBackground>
    </div>
  );
}
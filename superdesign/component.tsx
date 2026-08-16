import React, { useEffect, useRef, useState } from 'react';
import { cn } from 'clsx'; // Assuming clsx for standard class merging

const ELECTRIC_BLUE = "#00F0FF";
const NEON_PULSE = "#7000FF";
const DARK_SUBSTRATE = "#080B10";

const getCyberpunkColor = () => {
  const colors = [ELECTRIC_BLUE, NEON_PULSE, "#FF0055", "#00FF9F"];
  return colors[Math.floor(Math.random() * colors.length)];
};

interface CircuitBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  enableClickInteraction?: boolean;
}

export function CircuitBackground({ 
  children, 
  className,
  enableClickInteraction = true 
}: CircuitBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const circuitEngineRef = useRef<any>(null);

  useEffect(() => {
    let mounted = true;
    let cleanup: (() => void) | undefined;

    const initCircuits = async () => {
      if (!canvasRef.current) return;

      try {
        // Utilizing a module that supports angular geometric pathing for PCB styling
        // @ts-ignore
        const module = await import('https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/circuits1.min.js');
        const CircuitCursor = module.default;

        if (!mounted) return;

        const app = CircuitCursor(canvasRef.current, {
          geometry: {
            curveStyle: 'angular',
            terminalPoints: true,
            terminalRadius: 0.02
          },
          circuits: {
            colors: [ELECTRIC_BLUE], 
            lights: {
              intensity: 300,
              colors: [ELECTRIC_BLUE, NEON_PULSE] 
            }
          }
        });

        circuitEngineRef.current = app;
        setIsLoaded(true);

        const handleResize = () => {
          // Add custom resize logic here if the imported library requires it
        };

        window.addEventListener('resize', handleResize);
        
        cleanup = () => {
          window.removeEventListener('resize', handleResize);
        };

      } catch (error) {
        console.error("Failed to load CircuitCursor:", error);
      }
    };

    initCircuits();

    return () => {
      mounted = false;
      if (cleanup) cleanup();
    };
  }, []);

  const handleClick = () => {
    if (!enableClickInteraction || !circuitEngineRef.current) return;
    
    const newPulseColor = getCyberpunkColor();
    circuitEngineRef.current.circuits.setLightsColors([ELECTRIC_BLUE, newPulseColor]);
  };

  return (
    <div 
      className={cn("relative w-full h-full min-h-[400px] overflow-hidden", className)}
      style={{ backgroundColor: DARK_SUBSTRATE }}
      onClick={handleClick}
    >
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.6) 100%)',
          zIndex: 1
        }}
      />
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full block"
        style={{ touchAction: 'none' }}
      />
      
      {/* Content Overlay */}
      <div className="relative z-10 w-full h-full pointer-events-none">
        {children}
      </div>
    </div>
  );
}

export default CircuitBackground;
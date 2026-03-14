import React, { useRef } from 'react';
import { TransformWrapper, TransformComponent, useControls } from 'react-zoom-pan-pinch';
import { ZoomIn, ZoomOut, RotateCcw, Maximize } from 'lucide-react';
import { ComponentData } from '../types';

interface DiagramViewerProps {
  imageUrl: string | null;
  selectedComponent: ComponentData | null;
}

const Controls = () => {
  const { zoomIn, zoomOut, resetTransform } = useControls();
  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-zinc-200 p-1.5 rounded-full shadow-lg z-10">
      <button
        onClick={() => zoomIn()}
        className="p-2 hover:bg-zinc-100 rounded-full text-zinc-600 transition-colors"
        title="Zoom In"
      >
        <ZoomIn size={18} />
      </button>
      <button
        onClick={() => zoomOut()}
        className="p-2 hover:bg-zinc-100 rounded-full text-zinc-600 transition-colors"
        title="Zoom Out"
      >
        <ZoomOut size={18} />
      </button>
      <div className="w-px h-4 bg-zinc-200 mx-0.5" />
      <button
        onClick={() => resetTransform()}
        className="p-2 hover:bg-zinc-100 rounded-full text-zinc-600 transition-colors"
        title="Reset View"
      >
        <RotateCcw size={18} />
      </button>
    </div>
  );
};

export const DiagramViewer: React.FC<DiagramViewerProps> = ({ imageUrl, selectedComponent }) => {
  if (!imageUrl) {
    return (
      <div className="w-full h-[500px] bg-zinc-50 border border-zinc-200 rounded-2xl flex flex-col items-center justify-center text-zinc-400 gap-3">
        <Maximize size={48} strokeWidth={1} />
        <p className="text-sm">Upload a diagram to view it here</p>
      </div>
    );
  }

  return (
    <div className="w-full h-[500px] bg-zinc-100 border border-zinc-200 rounded-2xl overflow-hidden relative group">
      <TransformWrapper
        initialScale={1}
        initialPositionX={0}
        initialPositionY={0}
        centerOnInit
      >
        <Controls />
        <TransformComponent wrapperClass="!w-full !h-full" contentClass="!w-full !h-full flex items-center justify-center">
          <div className="relative">
            <img
              src={imageUrl}
              alt="Diagram"
              className="max-w-full max-h-full object-contain shadow-md"
              referrerPolicy="no-referrer"
            />
            
            {/* Bonus: Visual highlight for selected component */}
            {selectedComponent && selectedComponent.x !== undefined && selectedComponent.y !== undefined && (
              <div
                className="absolute w-12 h-12 border-2 border-emerald-500 bg-emerald-500/20 rounded-lg animate-pulse pointer-events-none"
                style={{
                  left: `${selectedComponent.x}px`,
                  top: `${selectedComponent.y}px`,
                  transform: 'translate(-50%, -50%)'
                }}
              />
            )}
          </div>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
};

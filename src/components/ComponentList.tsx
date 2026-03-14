import React from 'react';
import { ComponentData } from '../types';
import { Cpu, ChevronRight } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ComponentListProps {
  components: ComponentData[];
  selectedId: number | null;
  onSelect: (component: ComponentData) => void;
}

export const ComponentList: React.FC<ComponentListProps> = ({ components, selectedId, onSelect }) => {
  return (
    <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm h-full">
      <div className="p-4 border-bottom border-zinc-100 bg-zinc-50/50">
        <h3 className="font-semibold text-zinc-900 flex items-center gap-2">
          <Cpu size={18} className="text-emerald-600" />
          Detected Components
        </h3>
        <p className="text-xs text-zinc-500 mt-1">{components.length} items found in diagram</p>
      </div>
      
      <div className="divide-y divide-zinc-100 overflow-y-auto max-h-[420px]">
        {components.length > 0 ? (
          components.map((comp) => (
            <button
              key={comp.id}
              onClick={() => onSelect(comp)}
              className={cn(
                "w-full p-4 flex items-center justify-between transition-all text-left hover:bg-zinc-50 group",
                selectedId === comp.id ? "bg-emerald-50 border-l-4 border-emerald-500" : "border-l-4 border-transparent"
              )}
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-8 h-8 rounded flex items-center justify-center text-xs font-bold",
                  selectedId === comp.id ? "bg-emerald-500 text-white" : "bg-zinc-100 text-zinc-500"
                )}>
                  {comp.id}
                </div>
                <span className={cn(
                  "font-medium",
                  selectedId === comp.id ? "text-emerald-900" : "text-zinc-700"
                )}>
                  {comp.name}
                </span>
              </div>
              <ChevronRight 
                size={16} 
                className={cn(
                  "transition-transform",
                  selectedId === comp.id ? "text-emerald-500 translate-x-1" : "text-zinc-300 group-hover:translate-x-1"
                )} 
              />
            </button>
          ))
        ) : (
          <div className="p-8 text-center text-zinc-400 italic text-sm">
            No components detected yet
          </div>
        )}
      </div>
    </div>
  );
};

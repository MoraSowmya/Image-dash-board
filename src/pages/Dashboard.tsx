import React, { useState, useEffect } from 'react';
import { UploadBox } from '../components/UploadBox';
import { DiagramViewer } from '../components/DiagramViewer';
import { ComponentList } from '../components/ComponentList';
import { getComponents } from '../services/api';
import { ComponentData } from '../types';
import { LayoutDashboard, Info } from 'lucide-react';
import { motion } from 'motion/react';

export const Dashboard: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [components, setComponents] = useState<ComponentData[]>([]);
  const [selectedComponent, setSelectedComponent] = useState<ComponentData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
      fetchComponents();
      return () => URL.revokeObjectURL(url);
    } else {
      setImageUrl(null);
      setComponents([]);
      setSelectedComponent(null);
    }
  }, [file]);

  const fetchComponents = async () => {
    setLoading(true);
    try {
      const data = await getComponents() as ComponentData[];
      setComponents(data);
    } catch (error) {
      console.error("Failed to fetch components", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-zinc-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-emerald-600/20">
              <LayoutDashboard size={18} />
            </div>
            <h1 className="text-xl font-bold tracking-tight">DiagramDash</h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-zinc-500 hover:text-zinc-900 transition-colors">
              <Info size={20} />
            </button>
            <div className="w-8 h-8 rounded-full bg-zinc-200 border border-zinc-300" />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Upload Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-zinc-900 mb-2 italic serif">Image Analyzer</h2>
            <p className="text-zinc-500 max-w-lg mx-auto">
              Upload your image to automatically detect objects like humans, vehicles, and more.
            </p>
          </div>
          <UploadBox file={file} onUpload={setFile} />
        </motion.section>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Diagram Viewer */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white p-4 rounded-2xl border border-zinc-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-zinc-900">Diagram View</h3>
                {loading && (
                  <div className="flex items-center gap-2 text-xs text-emerald-600 font-medium">
                    <div className="w-3 h-3 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
                    Analyzing...
                  </div>
                )}
              </div>
              <DiagramViewer 
                imageUrl={imageUrl} 
                selectedComponent={selectedComponent}
              />
            </div>
          </motion.div>

          {/* Right: Components List */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <ComponentList 
              components={components} 
              selectedId={selectedComponent?.id || null}
              onSelect={setSelectedComponent}
            />
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-zinc-200 mt-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-zinc-500 text-sm">
            © 2026 DiagramDash Analyzer. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm font-medium text-zinc-400">
            <a href="#" className="hover:text-zinc-900 transition-colors">Privacy</a>
            <a href="#" className="hover:text-zinc-900 transition-colors">Terms</a>
            <a href="#" className="hover:text-zinc-900 transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

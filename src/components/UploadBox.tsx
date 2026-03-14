import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, FileImage } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface UploadBoxProps {
  onUpload: (file: File | null) => void;
  file: File | null;
}

export const UploadBox: React.FC<UploadBoxProps> = ({ onUpload, file }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onUpload(acceptedFiles[0]);
    }
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
    },
    multiple: false,
  } as any);

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    onUpload(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      {!file ? (
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed rounded-2xl p-8 transition-all cursor-pointer flex flex-col items-center justify-center gap-4",
            isDragActive ? "border-emerald-500 bg-emerald-50/50" : "border-zinc-300 hover:border-zinc-400 bg-zinc-50"
          )}
        >
          <input {...getInputProps()} />
          <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-500">
            <Upload size={24} />
          </div>
          <div className="text-center">
            <p className="text-zinc-900 font-medium">Click to upload or drag and drop</p>
            <p className="text-zinc-500 text-sm">PNG or JPG (max. 10MB)</p>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-zinc-200 rounded-2xl p-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
              <FileImage size={20} />
            </div>
            <div>
              <p className="text-zinc-900 font-medium text-sm truncate max-w-[200px] sm:max-w-md">
                {file.name}
              </p>
              <p className="text-zinc-500 text-xs">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
          <button
            onClick={removeFile}
            className="p-2 hover:bg-zinc-100 rounded-full text-zinc-400 hover:text-zinc-600 transition-colors"
            title="Remove file"
          >
            <X size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

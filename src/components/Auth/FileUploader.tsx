'use client';

import { useDropzone } from 'react-dropzone';
import { useState } from 'react';
import { uploadFile } from '@/lib/api';

interface FileUploaderProps {
  onFileAccepted?: (fileId: string) => void;
}

export function FileUploader({ onFileAccepted }: FileUploaderProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading]   = useState(false);
  const [error, setError]           = useState<string | null>(null);

  const handleDrop = async (files: File[]) => {
    if (files.length === 0) return;
    const file = files[0];
    setSelectedFile(file);
    setUploading(true);
    setError(null);

    try {
      // uploadFile returns the fileId (string)
      const fileId = await uploadFile(file);
      onFileAccepted?.(fileId);
    } catch (err: any) {
      console.error('Upload error', err);
      setError(err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
  } = useDropzone({
    onDrop:     handleDrop,
    multiple:   false,
    accept:     { 'image/*': ['.png', '.jpg', '.jpeg', '.gif'] },
  });

  return (
    <div className="space-y-2">
      <div
        {...getRootProps()}
        className={`
          border border-dashed rounded-md p-4 text-center cursor-pointer transition-all
          ${isDragActive ? 'bg-blue-50 border-blue-400' : 'border-gray-400'}
          ${isDragReject ? 'bg-red-50 border-red-400' : ''}
          hover:bg-gray-50
        `}
      >
        <input {...getInputProps()} />
        <p className="text-sm text-gray-600">
          {isDragReject
            ? 'Unsupported file type.'
            : uploading
            ? 'Uploading...'
            : 'Click or drag an image here'}
        </p>

        {selectedFile && !uploading && (
          <p className="mt-2 text-xs text-green-600">
            {selectedFile.name}
          </p>
        )}
        {error && (
          <p className="mt-2 text-xs text-red-600">{error}</p>
        )}
      </div>
    </div>
  );
}

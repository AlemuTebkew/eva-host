'use client';

import { useDropzone } from 'react-dropzone';
import { useEffect, useState } from 'react';
import { uploadFile } from '@/lib/api';

interface FileUploaderProps {
  label: string;
  onDrop: (file: File) => void;
}

export function FileUploader({ label, onDrop }: FileUploaderProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    acceptedFiles,
  } = useDropzone({
    onDrop: (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setSelectedFile(file);
        onDrop(file);
      }
    },
    multiple: false,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
    },
  });

  useEffect(() => {
    const handleFileUpload = async () => {
      if (acceptedFiles.length > 0) {
        const id = await uploadFile(acceptedFiles[0]);
        setSelectedFile(id);
      }
    };

    handleFileUpload();
  }, [acceptedFiles]);

  return (
    <div className="space-y-2">
      <label className="block font-medium">{label}</label>
      <div
        {...getRootProps()}
        className={`border border-dashed rounded-md p-4 text-center cursor-pointer transition-all
          ${isDragActive ? 'bg-blue-50 border-blue-400' : 'border-gray-400'}
          ${isDragReject ? 'bg-red-50 border-red-400' : ''}
          hover:bg-gray-50`}
      >
        <input {...getInputProps()} />
        <p className="text-sm text-gray-600">
          {isDragReject
            ? 'Unsupported file type. Please upload a valid image file.'
            : 'Click or drag a file here to upload'}
        </p>
        {selectedFile && (
          <p className="text-xs mt-2 text-green-600">{selectedFile.name}</p>
        )}
      </div>
    </div>
  );
}

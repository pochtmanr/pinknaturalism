import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface MediaUploadProps {
  category: 'editorial' | 'commercial' | 'video';
  onUploadComplete: () => void;
}

export default function MediaUpload({ category, onUploadComplete }: MediaUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    setUploading(true);
    setUploadError(null);

    try {
      const file = acceptedFiles[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${category}/${fileName}`;

      // Upload file to Supabase Storage
      const { error: uploadError, data } = await supabase.storage
        .from('media')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(filePath);

      // Create media item in database
      const { error: dbError } = await supabase
        .from('media_items')
        .insert({
          title,
          description,
          category,
          url: publicUrl,
          type: file.type.startsWith('video/') ? 'video' : 'image',
          thumbnail_url: file.type.startsWith('video/') ? null : publicUrl,
        });

      if (dbError) throw dbError;

      onUploadComplete();
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadError('Error uploading file. Please try again.');
    } finally {
      setUploading(false);
    }
  }, [category, title, description, onUploadComplete]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
      'video/*': category === 'video' ? [] : undefined,
    },
    maxFiles: 1,
  });

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
          />
        </div>
      </div>

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-pink-500 bg-pink-50' : 'border-gray-300 hover:border-pink-500'}`}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">
          {isDragActive
            ? 'Drop the file here'
            : `Drag and drop a ${category === 'video' ? 'video' : 'photo'}, or click to select`}
        </p>
      </div>

      {uploadError && (
        <div className="bg-red-50 p-4 rounded-md flex items-center space-x-2 text-red-700">
          <X size={20} />
          <p>{uploadError}</p>
        </div>
      )}

      {uploading && (
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500 mx-auto" />
          <p className="mt-2 text-sm text-gray-600">Uploading...</p>
        </div>
      )}
    </div>
  );
}
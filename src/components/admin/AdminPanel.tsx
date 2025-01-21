import React, { useState, useEffect } from 'react';
import { Trash2, Edit, Plus } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import MediaUpload from './MediaUpload';

export default function AdminPanel() {
  const [mediaItems, setMediaItems] = useState<any[]>([]);
  const [showUpload, setShowUpload] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'editorial' | 'commercial' | 'video'>('editorial');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMediaItems();
  }, []);

  async function fetchMediaItems() {
    try {
      const { data, error } = await supabase
        .from('media_items')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMediaItems(data || []);
    } catch (error) {
      console.error('Error fetching media items:', error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteMediaItem(id: string, url: string) {
    try {
      // Delete from storage
      const filePath = url.split('/').pop();
      if (filePath) {
        await supabase.storage
          .from('media')
          .remove([filePath]);
      }

      // Delete from database
      const { error } = await supabase
        .from('media_items')
        .delete()
        .match({ id });

      if (error) throw error;
      
      fetchMediaItems();
    } catch (error) {
      console.error('Error deleting media item:', error);
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-playfair italic text-pink-500">Media Management</h1>
        <button
          onClick={() => setShowUpload(true)}
          className="flex items-center space-x-2 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 transition-colors"
        >
          <Plus size={20} />
          <span>Add Media</span>
        </button>
      </div>

      {showUpload && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-playfair italic text-pink-500">Upload Media</h2>
              <button
                onClick={() => setShowUpload(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <div className="mb-6">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as any)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
              >
                <option value="editorial">Editorial</option>
                <option value="commercial">Commercial</option>
                <option value="video">Video</option>
              </select>
            </div>

            <MediaUpload
              category={selectedCategory}
              onUploadComplete={() => {
                setShowUpload(false);
                fetchMediaItems();
              }}
            />
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mediaItems.map((item) => (
            <div key={item.id} className="relative group">
              {item.type === 'video' ? (
                <video
                  src={item.url}
                  className="w-full h-64 object-cover rounded-lg"
                  controls
                />
              ) : (
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
              )}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity rounded-lg flex items-center justify-center space-x-4 opacity-0 group-hover:opacity-100">
                <button
                  onClick={() => deleteMediaItem(item.id, item.url)}
                  className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                >
                  <Trash2 size={20} />
                </button>
                <button className="p-2 bg-white text-gray-800 rounded-full hover:bg-gray-100 transition-colors">
                  <Edit size={20} />
                </button>
              </div>
              <h3 className="mt-2 font-medium text-gray-900">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.category}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
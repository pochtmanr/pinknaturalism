import React from 'react';

const editorialImages = [
  "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1583759136431-9d70db2eb04c?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1595411425732-e69c1abe2763?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1584184924103-e310d9dc82fc?auto=format&fit=crop&q=80"
];

function Editorial() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
        {editorialImages.map((src, index) => (
          <div 
            key={index} 
            className={`editorial-item ${index % 3 === 0 ? 'md:col-span-2' : ''}`}
          >
            <div className="relative group">
              <img
                src={src}
                alt={`Editorial ${index + 1}`}
                className="w-full h-[300px] md:h-[600px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-700" />
            </div>
            <div className="mt-4">
              <h3 className="text-xl font-playfair italic text-pink-500">Editorial Series {index + 1}</h3>
              <p className="text-gray-600 mt-2">Fashion Week Collection</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Editorial;
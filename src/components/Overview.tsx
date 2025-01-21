import React from 'react';

interface OverviewProps {
  images: string[];
}

function Overview({ images }: OverviewProps) {
  return (
    <div className="gallery-container">
      <div className="gallery-grid grid-cols-2 md:grid-cols-4">
        {images.map((src, index) => (
          <div key={index} className="gallery-item">
            <img
              src={src}
              alt={`Gallery image ${index + 1}`}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Overview;
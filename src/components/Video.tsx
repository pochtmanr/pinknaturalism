import React from 'react';

const videoProjects = [
  {
    title: "Spring Campaign",
    thumbnail: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&q=80",
    duration: "2:45",
    category: "Fashion Film"
  },
  {
    title: "Behind the Scenes",
    thumbnail: "https://images.unsplash.com/photo-1583759136431-9d70db2eb04c?auto=format&fit=crop&q=80",
    duration: "5:30",
    category: "Documentary"
  },
  {
    title: "Collection Preview",
    thumbnail: "https://images.unsplash.com/photo-1595411425732-e69c1abe2763?auto=format&fit=crop&q=80",
    duration: "1:30",
    category: "Teaser"
  }
];

function Video() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 gap-16">
        {videoProjects.map((video, index) => (
          <div key={index} className="video-project">
            <div className="relative group cursor-pointer">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-[40vh] md:h-[80vh] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-50 transition-opacity duration-700 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full border-2 border-white flex items-center justify-center">
                  <div className="w-0 h-0 border-t-8 border-t-transparent border-l-16 border-l-white border-b-8 border-b-transparent ml-2" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h3 className="text-3xl font-playfair italic mb-2">{video.title}</h3>
                <div className="flex items-center space-x-4">
                  <span className="text-sm uppercase tracking-wider">{video.category}</span>
                  <span className="w-1 h-1 bg-white rounded-full" />
                  <span className="text-sm">{video.duration}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Video;
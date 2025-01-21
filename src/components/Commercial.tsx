import React from 'react';

const commercialProjects = [
  {
    title: "Summer Collection",
    client: "Fashion Brand",
    image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&q=80",
    description: "A vibrant summer campaign capturing the essence of modern fashion."
  },
  {
    title: "Autumn Elegance",
    client: "Luxury House",
    image: "https://images.unsplash.com/photo-1583759136431-9d70db2eb04c?auto=format&fit=crop&q=80",
    description: "Sophisticated autumn wear showcasing timeless elegance."
  },
  {
    title: "Urban Style",
    client: "Street Wear",
    image: "https://images.unsplash.com/photo-1595411425732-e69c1abe2763?auto=format&fit=crop&q=80",
    description: "Contemporary urban fashion for the modern individual."
  }
];

function Commercial() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="space-y-24">
        {commercialProjects.map((project, index) => (
          <div 
            key={index}
            className={`flex flex-col ${
              index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            } gap-6 md:gap-12 items-center`}
          >
            <div className="w-full md:flex-1">
              <div className="relative group">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-[400px] md:h-[700px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-700" />
              </div>
            </div>
            <div className="flex-1 space-y-6">
              <h2 className="text-3xl font-playfair italic text-pink-500">{project.title}</h2>
              <p className="text-xl text-gray-700">{project.client}</p>
              <p className="text-gray-600">{project.description}</p>
              <div className="h-px bg-pink-200 w-24" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Commercial;
import React, { useState } from 'react';
import TemplateCard from '../pages/Templetecardsforweb';
import TemplateModal from '../pages/Templetewebmodels';
import { Template } from '../types/Template';

const templates: Template[] = [
  {
    id: 1,
    title: "Modern Dashboard",
    description: "A sleek and responsive dashboard template with dark theme",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    category: "Dashboard",
    tags: ["React", "TypeScript", "Dark Theme"],
    demoUrl: "https://example.com/demo1",
    featured: true
  },
  {
    id: 2,
    title: "E-commerce Store",
    description: "Complete e-commerce solution with modern design",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
    category: "E-commerce",
    tags: ["Next.js", "Stripe", "Responsive"],
    demoUrl: "https://example.com/demo2",
    featured: false
  },
  {
    id: 3,
    title: "Portfolio Website",
    description: "Creative portfolio template for designers and developers",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop",
    category: "Portfolio",
    tags: ["CSS Grid", "Animations", "Modern"],
    demoUrl: "https://example.com/demo3",
    featured: true
  },
  {
    id: 4,
    title: "SaaS Landing",
    description: "Professional SaaS landing page with conversion focus",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    category: "Landing",
    tags: ["Conversion", "SaaS", "Clean"],
    demoUrl: "https://example.com/demo4",
    featured: false
  },
  {
    id: 5,
    title: "Blog Platform",
    description: "Modern blog template with reading experience focus",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop",
    category: "Blog",
    tags: ["Content", "SEO", "Typography"],
    demoUrl: "https://example.com/demo5",
    featured: false
  },
  {
    id: 6,
    title: "Agency Website",
    description: "Creative agency template with bold animations",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=400&fit=crop",
    category: "Agency",
    tags: ["Creative", "Animations", "Bold"],
    demoUrl: "https://example.com/demo6",
    featured: true
  }
];

const Index = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [bookmarkedTemplates, setBookmarkedTemplates] = useState<number[]>([]);

  const handleCardClick = (template: Template) => {
    setSelectedTemplate(template);
  };

  const handleCloseModal = () => {
    setSelectedTemplate(null);
  };

  const handleBookmark = (templateId: number) => {
    setBookmarkedTemplates(prev => 
      prev.includes(templateId) 
        ? prev.filter(id => id !== templateId)
        : [...prev, templateId]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20"></div>
        <div className="relative container mx-auto px-6 py-16 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Handpicked Templates
            <span className="block text-3xl md:text-4xl bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mt-2">
              From The Design Community
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Discover beautiful, modern templates crafted by talented designers and developers
          </p>
        </div>
      </header>

      {/* Templates Grid */}
      <main className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              isBookmarked={bookmarkedTemplates.includes(template.id)}
              onClick={() => handleCardClick(template)}
              onBookmark={() => handleBookmark(template.id)}
            />
          ))}
        </div>
      </main>

      {/* Modal */}
      {selectedTemplate && (
        <TemplateModal
          template={selectedTemplate}
          isBookmarked={bookmarkedTemplates.includes(selectedTemplate.id)}
          onClose={handleCloseModal}
          onBookmark={() => handleBookmark(selectedTemplate.id)}
        />
      )}
    </div>
  );
};

export default Index;
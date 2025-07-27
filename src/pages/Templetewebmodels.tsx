import React from 'react';
import { X, ExternalLink, Bookmark } from 'lucide-react';
import { Template } from '../types/Template';

interface TemplateModalProps {
  template: Template;
  isBookmarked: boolean;
  onClose: () => void;
  onBookmark: () => void;
}

const TemplateModal: React.FC<TemplateModalProps> = ({
  template,
  isBookmarked,
  onClose,
  onBookmark
}) => {
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleLiveDemo = () => {
    window.open(template.demoUrl, '_blank');
  };

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div>
            <h2 className="text-2xl font-bold text-white">{template.title}</h2>
            <p className="text-purple-400 mt-1">{template.category}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row">
          {/* Image */}
          <div className="lg:w-1/2 relative">
            <img 
              src={template.image} 
              alt={template.title}
              className="w-full h-64 lg:h-96 object-cover"
            />
            {template.featured && (
              <div className="absolute top-4 left-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-bold px-3 py-2 rounded-full">
                Featured Template
              </div>
            )}
          </div>

          {/* Info */}
          <div className="lg:w-1/2 p-6 flex flex-col">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white mb-4">Description</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                {template.description}
              </p>

              <h3 className="text-lg font-semibold text-white mb-4">Technologies</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {template.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="bg-gray-700 text-gray-300 px-3 py-1 rounded-lg text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h3 className="text-lg font-semibold text-white mb-4">Features</h3>
              <ul className="text-gray-300 space-y-2 mb-6">
                <li>• Fully responsive design</li>
                <li>• Modern and clean interface</li>
                <li>• Optimized performance</li>
                <li>• Cross-browser compatibility</li>
                <li>• SEO-friendly structure</li>
              </ul>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t border-gray-700">
              <button
                onClick={handleLiveDemo}
                className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <ExternalLink size={20} />
                Live Demo
              </button>
              
              <button
                onClick={onBookmark}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 ${
                  isBookmarked
                    ? 'bg-purple-600 text-white hover:bg-purple-700'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <Bookmark size={20} fill={isBookmarked ? 'currentColor' : 'none'} />
                {isBookmarked ? 'Saved' : 'Bookmark'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateModal;

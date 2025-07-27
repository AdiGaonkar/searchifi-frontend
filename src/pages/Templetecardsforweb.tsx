import React from 'react';
import { Bookmark } from 'lucide-react';
import { Template } from '../types/Template';

interface TemplateCardProps {
  template: Template;
  isBookmarked: boolean;
  onClick: () => void;
  onBookmark: () => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({
  template,
  isBookmarked,
  onClick,
  onBookmark
}) => {
  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onBookmark();
  };

  return (
    <div 
      className="group relative bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
      onClick={onClick}
    >
      {/* Featured Badge */}
      {template.featured && (
        <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
          Featured
        </div>
      )}

      {/* Bookmark Button */}
      <button
        onClick={handleBookmarkClick}
        className={`absolute top-4 right-4 z-10 p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${
          isBookmarked 
            ? 'bg-purple-600 text-white' 
            : 'bg-gray-800/80 text-gray-300 hover:bg-purple-600 hover:text-white'
        }`}
      >
        <Bookmark size={16} fill={isBookmarked ? 'currentColor' : 'none'} />
      </button>

      {/* Template Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={template.image} 
          alt={template.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-purple-400 text-sm font-medium">{template.category}</span>
        </div>
        
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
          {template.title}
        </h3>
        
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {template.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {template.tags.slice(0, 3).map((tag) => (
            <span 
              key={tag}
              className="text-xs bg-gray-700/50 text-gray-300 px-2 py-1 rounded-md"
            >
              {tag}
            </span>
          ))}
          {template.tags.length > 3 && (
            <span className="text-xs text-gray-500">
              +{template.tags.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
};

export default TemplateCard;
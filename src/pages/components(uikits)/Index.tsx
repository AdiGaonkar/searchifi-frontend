import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const componentCategories = [
  {
    id: "buttons",
    name: "Buttons",
    description: "Interactive button components",
    componentCount: 8,
    preview: (
      <div className="flex gap-2">
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:opacity-90 transition-opacity">
          Click me
        </button>
        <button className="border border-border text-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-accent transition-colors">
          Secondary
        </button>
      </div>
    )
  },
  {
    id: "cards",
    name: "Cards",
    description: "Card layout components",
    componentCount: 12,
    preview: (
      <div className="bg-card border border-border rounded-lg p-4 w-full shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-primary rounded-full"></div>
          <div>
            <div className="h-2 bg-foreground rounded w-16 mb-1"></div>
            <div className="h-1.5 bg-muted-foreground rounded w-12"></div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-1.5 bg-muted-foreground rounded w-full"></div>
          <div className="h-1.5 bg-muted-foreground rounded w-3/4"></div>
        </div>
      </div>
    )
  },
  {
    id: "forms",
    name: "Forms",
    description: "Form input components",
    componentCount: 15,
    preview: (
      <div className="space-y-3 w-full">
        <div>
          <div className="h-1.5 bg-muted-foreground rounded w-12 mb-1"></div>
          <input className="w-full border border-border rounded-md px-3 py-2 bg-background text-foreground text-sm" placeholder="Enter text..." />
        </div>
        <div>
          <div className="h-1.5 bg-muted-foreground rounded w-16 mb-1"></div>
          <select className="w-full border border-border rounded-md px-3 py-2 bg-background text-foreground text-sm">
            <option>Select option</option>
          </select>
        </div>
      </div>
    )
  },
  {
    id: "navigation",
    name: "Navigation",
    description: "Navigation components",
    componentCount: 10,
    preview: (
      <div className="w-full">
        <div className="flex items-center justify-between border-b border-border pb-2 mb-2">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-primary rounded"></div>
            <div className="h-1.5 bg-foreground rounded w-16"></div>
          </div>
          <div className="w-4 h-4 bg-muted-foreground rounded"></div>
        </div>
        <nav className="flex gap-4">
          <div className="h-1.5 bg-primary rounded w-12"></div>
          <div className="h-1.5 bg-muted-foreground rounded w-10"></div>
          <div className="h-1.5 bg-muted-foreground rounded w-14"></div>
        </nav>
      </div>
    )
  },
  {
    id: "modals",
    name: "Modals",
    description: "Dialog and modal components",
    componentCount: 6,
    preview: (
      <div className="relative w-full">
        <div className="bg-background/50 absolute inset-0 rounded backdrop-blur-sm"></div>
        <div className="relative bg-card border border-border rounded-lg p-4 shadow-xl">
          <div className="flex justify-between items-center mb-3">
            <div className="h-2 bg-foreground rounded w-20"></div>
            <div className="w-4 h-4 bg-muted-foreground rounded hover:bg-foreground cursor-pointer"></div>
          </div>
          <div className="space-y-2">
            <div className="h-1.5 bg-muted-foreground rounded w-full"></div>
            <div className="h-1.5 bg-muted-foreground rounded w-2/3"></div>
          </div>
          <div className="flex gap-2 mt-4">
            <div className="h-7 bg-primary rounded w-16"></div>
            <div className="h-7 bg-muted border border-border rounded w-14"></div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "data-display",
    name: "Data Display",
    description: "Tables and data components",
    componentCount: 9,
    preview: (
      <div className="w-full">
        <div className="border border-border rounded-lg overflow-hidden">
          <div className="bg-muted p-2 border-b border-border">
            <div className="grid grid-cols-3 gap-2">
              <div className="h-1.5 bg-foreground rounded w-12 text-xs font-medium"></div>
              <div className="h-1.5 bg-foreground rounded w-16"></div>
              <div className="h-1.5 bg-foreground rounded w-10"></div>
            </div>
          </div>
          <div className="p-2 space-y-1">
            <div className="grid grid-cols-3 gap-2">
              <div className="h-1.5 bg-muted-foreground rounded w-10"></div>
              <div className="h-1.5 bg-muted-foreground rounded w-14"></div>
              <div className="h-1.5 bg-primary rounded w-8"></div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="h-1.5 bg-muted-foreground rounded w-12"></div>
              <div className="h-1.5 bg-muted-foreground rounded w-10"></div>
              <div className="h-1.5 bg-muted-foreground rounded w-6"></div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "feedback",
    name: "Feedback",
    description: "Alerts and notification components",
    componentCount: 7,
    preview: (
      <div className="w-full space-y-2">
        <div className="bg-green-500/10 border border-green-500/20 rounded-md p-3 flex items-start gap-2">
          <div className="w-4 h-4 bg-green-500 rounded-full mt-0.5"></div>
          <div className="flex-1">
            <div className="h-1.5 bg-green-500 rounded w-16 mb-1"></div>
            <div className="h-1 bg-green-500/70 rounded w-full"></div>
          </div>
        </div>
        <div className="bg-red-500/10 border border-red-500/20 rounded-md p-2 flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="h-1 bg-red-500/70 rounded flex-1"></div>
        </div>
      </div>
    )
  },
  {
    id: "layout",
    name: "Layout",
    description: "Layout and container components",
    componentCount: 11,
    preview: (
      <div className="w-full h-full">
        <div className="border border-border rounded-lg p-2 h-full">
          <div className="grid grid-cols-4 gap-1 h-full">
            <div className="bg-muted rounded col-span-1"></div>
            <div className="col-span-3 space-y-1">
              <div className="bg-muted rounded h-2"></div>
              <div className="grid grid-cols-2 gap-1 flex-1">
                <div className="bg-accent rounded"></div>
                <div className="bg-accent rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredComponents = componentCategories.filter(component =>
    component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    component.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCardClick = (componentId: string) => {
    navigate(`/components/${componentId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12 fade-in">
          <h1 className="text-5xl font-bold mb-6 tracking-tight">
            Beautiful UI Components
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            An open-source collection of copy-and-paste components built with Tailwind CSS and React.
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="Quick search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-3 text-lg"
            />
          </div>
        </div>

        {/* Component Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 slide-up">
          {filteredComponents.map((component, index) => (
            <div
              key={component.id}
              className="component-card group"
              onClick={() => handleCardClick(component.id)}
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              <div className="component-preview">
                {component.preview}
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                    {component.name}
                  </h3>
                  <span className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">
                    New
                  </span>
                </div>
                
                <p className="text-sm text-muted-foreground">
                  {component.description}
                </p>
                
                <p className="text-xs text-muted-foreground">
                  {component.componentCount} Components
                </p>
              </div>
            </div>
          ))}
        </div>

        {filteredComponents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No components found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
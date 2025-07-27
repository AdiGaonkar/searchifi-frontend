import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

// Component examples data
const componentExamples = {
  buttons: {
    title: "Button Components",
    description: "Interactive button components with various styles and states",
    components: [
      {
        name: "Primary Button",
        code: `<Button>Primary Button</Button>`,
        preview: <Button>Primary Button</Button>
      },
      {
        name: "Secondary Button",
        code: `<Button variant="secondary">Secondary Button</Button>`,
        preview: <Button variant="secondary">Secondary Button</Button>
      },
      {
        name: "Outline Button",
        code: `<Button variant="outline">Outline Button</Button>`,
        preview: <Button variant="outline">Outline Button</Button>
      },
      {
        name: "Ghost Button",
        code: `<Button variant="ghost">Ghost Button</Button>`,
        preview: <Button variant="ghost">Ghost Button</Button>
      }
    ]
  },
  cards: {
    title: "Card Components",
    description: "Card layout components for displaying content",
    components: [
      {
        name: "Basic Card",
        code: `<div className="bg-card border border-border rounded-lg p-6">
  <h3 className="text-lg font-semibold mb-2">Card Title</h3>
  <p className="text-muted-foreground">Card content goes here</p>
</div>`,
        preview: (
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Card Title</h3>
            <p className="text-muted-foreground">Card content goes here</p>
          </div>
        )
      },
      {
        name: "Card with Header",
        code: `<div className="bg-card border border-border rounded-lg overflow-hidden">
  <div className="bg-muted p-4 border-b border-border">
    <h3 className="font-semibold">Header</h3>
  </div>
  <div className="p-6">
    <p className="text-muted-foreground">Content area</p>
  </div>
</div>`,
        preview: (
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="bg-muted p-4 border-b border-border">
              <h3 className="font-semibold">Header</h3>
            </div>
            <div className="p-6">
              <p className="text-muted-foreground">Content area</p>
            </div>
          </div>
        )
      }
    ]
  },
  forms: {
    title: "Form Components",
    description: "Form input components for user interaction",
    components: [
      {
        name: "Text Input",
        code: `<div className="space-y-2">
  <label className="text-sm font-medium">Email</label>
  <input 
    type="email" 
    placeholder="Enter your email"
    className="w-full px-3 py-2 border border-border rounded-md bg-background"
  />
</div>`,
        preview: (
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <input 
              type="email" 
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-border rounded-md bg-background"
            />
          </div>
        )
      },
      {
        name: "Textarea",
        code: `<div className="space-y-2">
  <label className="text-sm font-medium">Message</label>
  <textarea 
    placeholder="Enter your message"
    className="w-full px-3 py-2 border border-border rounded-md bg-background h-24"
  />
</div>`,
        preview: (
          <div className="space-y-2">
            <label className="text-sm font-medium">Message</label>
            <textarea 
              placeholder="Enter your message"
              className="w-full px-3 py-2 border border-border rounded-md bg-background h-24"
            />
          </div>
        )
      }
    ]
  },
  navigation: {
    title: "Navigation Components",
    description: "Navigation components for app structure",
    components: [
      {
        name: "Simple Navbar",
        code: `<nav className="bg-card border-b border-border p-4">
  <div className="flex items-center justify-between">
    <div className="font-semibold">Brand</div>
    <div className="flex space-x-4">
      <a href="#" className="text-sm hover:text-primary">Home</a>
      <a href="#" className="text-sm hover:text-primary">About</a>
      <a href="#" className="text-sm hover:text-primary">Contact</a>
    </div>
  </div>
</nav>`,
        preview: (
          <nav className="bg-card border border-border rounded p-4">
            <div className="flex items-center justify-between">
              <div className="font-semibold">Brand</div>
              <div className="flex space-x-4">
                <a href="#" className="text-sm hover:text-primary">Home</a>
                <a href="#" className="text-sm hover:text-primary">About</a>
                <a href="#" className="text-sm hover:text-primary">Contact</a>
              </div>
            </div>
          </nav>
        )
      }
    ]
  },
  modals: {
    title: "Modal Components",
    description: "Dialog and modal components for overlays",
    components: [
      {
        name: "Simple Modal",
        code: `<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
  <div className="bg-card border border-border rounded-lg p-6 max-w-md w-full mx-4">
    <h3 className="text-lg font-semibold mb-4">Modal Title</h3>
    <p className="text-muted-foreground mb-6">Modal content goes here</p>
    <div className="flex justify-end space-x-2">
      <Button variant="outline">Cancel</Button>
      <Button>Confirm</Button>
    </div>
  </div>
</div>`,
        preview: (
          <div className="bg-card border border-border rounded-lg p-6 max-w-md">
            <h3 className="text-lg font-semibold mb-4">Modal Title</h3>
            <p className="text-muted-foreground mb-6">Modal content goes here</p>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" size="sm">Cancel</Button>
              <Button size="sm">Confirm</Button>
            </div>
          </div>
        )
      }
    ]
  },
  "data-display": {
    title: "Data Display Components",
    description: "Components for displaying data and information",
    components: [
      {
        name: "Simple Table",
        code: `<div className="border border-border rounded-lg overflow-hidden">
  <table className="w-full">
    <thead className="bg-muted">
      <tr>
        <th className="px-4 py-2 text-left">Name</th>
        <th className="px-4 py-2 text-left">Email</th>
        <th className="px-4 py-2 text-left">Role</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-t border-border">
        <td className="px-4 py-2">John Doe</td>
        <td className="px-4 py-2">john@example.com</td>
        <td className="px-4 py-2">Admin</td>
      </tr>
    </tbody>
  </table>
</div>`,
        preview: (
          <div className="border border-border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="px-4 py-2 text-left text-sm">Name</th>
                  <th className="px-4 py-2 text-left text-sm">Email</th>
                  <th className="px-4 py-2 text-left text-sm">Role</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-border">
                  <td className="px-4 py-2 text-sm">John Doe</td>
                  <td className="px-4 py-2 text-sm">john@example.com</td>
                  <td className="px-4 py-2 text-sm">Admin</td>
                </tr>
              </tbody>
            </table>
          </div>
        )
      }
    ]
  },
  feedback: {
    title: "Feedback Components",
    description: "Alert and notification components",
    components: [
      {
        name: "Success Alert",
        code: `<div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-2">
  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
  <p className="text-green-800">Success! Your action was completed.</p>
</div>`,
        preview: (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            <p className="text-green-800 text-sm">Success! Your action was completed.</p>
          </div>
        )
      },
      {
        name: "Warning Alert",
        code: `<div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center space-x-2">
  <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
  <p className="text-yellow-800">Warning! Please check your input.</p>
</div>`,
        preview: (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center space-x-2">
            <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
            <p className="text-yellow-800 text-sm">Warning! Please check your input.</p>
          </div>
        )
      }
    ]
  },
  layout: {
    title: "Layout Components",
    description: "Layout and container components",
    components: [
      {
        name: "Two Column Layout",
        code: `<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  <div className="bg-card border border-border rounded-lg p-6">
    <h3 className="font-semibold mb-2">Left Column</h3>
    <p className="text-muted-foreground">Content for left side</p>
  </div>
  <div className="bg-card border border-border rounded-lg p-6">
    <h3 className="font-semibold mb-2">Right Column</h3>
    <p className="text-muted-foreground">Content for right side</p>
  </div>
</div>`,
        preview: (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold mb-2 text-sm">Left Column</h3>
              <p className="text-muted-foreground text-xs">Content for left side</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold mb-2 text-sm">Right Column</h3>
              <p className="text-muted-foreground text-xs">Content for right side</p>
            </div>
          </div>
        )
      }
    ]
  }
};

const ComponentShowcase = () => {
  const { componentId } = useParams();
  const navigate = useNavigate();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const componentData = componentExamples[componentId as keyof typeof componentExamples];

  if (!componentData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Component Not Found</h1>
          <Button onClick={() => navigate("/")} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const copyToClipboard = async (code: string, componentName: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(componentName);
      toast.success("Code copied to clipboard!");
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      toast.error("Failed to copy code");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Components
          </Button>
          
          <h1 className="text-4xl font-bold mb-4">{componentData.title}</h1>
          <p className="text-xl text-muted-foreground">
            {componentData.description}
          </p>
        </div>

        {/* Components */}
        <div className="space-y-8">
          {componentData.components.map((component, index) => (
            <div key={index} className="bg-card border border-border rounded-lg overflow-hidden">
              {/* Component Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <h2 className="text-xl font-semibold">{component.name}</h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(component.code, component.name)}
                  className="flex items-center space-x-2"
                >
                  {copiedCode === component.name ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                  <span>{copiedCode === component.name ? "Copied!" : "Copy"}</span>
                </Button>
              </div>

              {/* Preview */}
              <div className="p-6 bg-muted/30">
                <div className="flex items-center justify-center min-h-[120px]">
                  {component.preview}
                </div>
              </div>

              {/* Code */}
              <div className="p-6 bg-muted/10">
                <pre className="text-sm overflow-x-auto">
                  <code className="text-foreground">{component.code}</code>
                </pre>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComponentShowcase;
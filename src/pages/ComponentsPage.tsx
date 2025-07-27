import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/SearchifiMainpage/Navbar";
import Footer from "@/components/SearchifiMainpage/Footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Code, Component, User, ArrowRight } from "lucide-react";
import { getComponents } from "@/utils/componentUtils";
import { useAuth } from "@/contexts/AuthContext";

const UserUploadedComponentCard = ({ component }) => {
  const renderPreview = () => {
    if (component.previewUrl) {
      return (
        <iframe
          src={component.previewUrl}
          title="Component Preview"
          className="w-full h-40 border rounded-md"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
      );
    } else if (component.image) {
      return (
        <img
          src={component.image}
          alt={component.title}
          className="w-full h-40 object-cover object-center rounded-md"
        />
      );
    }
    return (
      <div className="w-full h-40 flex items-center justify-center bg-secondary/30 text-muted-foreground">
        No Preview Available
      </div>
    );
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg border-border bg-card">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">{component.title}</CardTitle>
          <Component className="text-searchifi-purple" size={24} />
        </div>
        <CardDescription>
          {component.description ? component.description.substring(0, 120) + "..." : "No description"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {renderPreview()}
        <div className="mt-3 flex flex-wrap gap-2">
          {Array.isArray(component.tags) &&
            component.tags.map((tag, i) => (
              <Badge key={i} variant="secondary">
                {tag}
              </Badge>
            ))}
        </div>
      </CardContent>
      <CardFooter className="border-t bg-muted/10 flex justify-between">
        <div className="flex items-center gap-2">
          <User size={14} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {component.author || "Anonymous"}
          </span>
        </div>
        <Link to={`/components/${component.id}`}>
          <Button variant="ghost" size="sm" className="text-searchifi-purple">
            View Component <ArrowRight size={16} className="ml-1" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

const ComponentsPage = () => {
  const [userComponents, setUserComponents] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    const components = getComponents();
    setUserComponents(components);
  }, []);

  const filteredUserComponents = userComponents.filter((component) => {
    return (
      component.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      component.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      component.tags?.some((tag: string) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-secondary/30 dark:bg-secondary/10 py-12 px-4 border-b border-border">
          <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-3">UI Components</h1>
            <p className="text-muted-foreground max-w-3xl">
              Browse our collection of UI components to use in your projects.
              These components are built with Tailwind CSS and can be easily customized to fit your design needs.
            </p>
            <div className="mt-6">
              <div className="relative max-w-md">
                <Input
                  placeholder="Search components..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Code className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              </div>
            </div>
          </div>
        </div>
        <section className="py-12 px-4">
          <div className="container mx-auto">
            {filteredUserComponents.length > 0 ? (
              <>
                <h2 className="text-2xl font-semibold mb-6">Community Components</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredUserComponents.map((component) => (
                    <UserUploadedComponentCard key={component.id} component={component} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <p className="text-xl font-medium">No components found</p>
                <p className="text-muted-foreground">Try adjusting your search</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ComponentsPage;

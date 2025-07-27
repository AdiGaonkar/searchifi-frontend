import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const defaultFeaturedProjects = [
  {
    id: 1,
    title: "React Task Manager",
    description: "A beautiful task management application built with React and Firebase",
    author: "Jane Smith",
    tags: ["React", "Firebase", "Tailwind CSS"],
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 2,
    title: "Weather Dashboard",
    description: "Real-time weather application with beautiful visualizations",
    author: "Mike Johnson",
    tags: ["React", "API", "Chart.js"],
    image:
      "https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 3,
    title: "E-commerce Store",
    description: "Full-featured online store with cart and payment processing",
    author: "Alex Thompson",
    tags: ["Next.js", "Stripe", "MongoDB"],
    image:
      "https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
  },
];

const ProjectCard = ({ project }: { project: any }) => {
  return (
    <div className="relative w-full rounded-3xl overflow-hidden shadow-lg bg-stone-950 text-white group transition-all duration-500 ">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-700 via-violet-800 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
      <div className="relative z-10 h-60 md:h-64 overflow-hidden p-4">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>
      <div className="relative z-10 px-5 pb-24">
        <h3 className="text-lg md:text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-sm text-white/80 mb-3">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags?.map((tag: string, index: number) => (
            <Badge key={index} variant="secondary" className="bg-secondary/80">
              {tag}
            </Badge>
          ))}
        </div>
        <span className="text-xs text-white/60">By {project.author}</span>
      </div>
      <div className="absolute bottom-0 right-0 border-t border-l border-white/10 w-40 h-20 bg-black rounded-tl-3xl flex items-center justify-center z-50">
        <Link to={`/projects/${project.id}`}>
          <Button
            size="sm"
            className="bg-white text-violet-700 hover:bg-violet-100 rounded-full text-sm"
          >
            View More <ArrowRight size={14} className="ml-1" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

const FeaturedProjects = () => {
  const [featuredProjects, setFeaturedProjects] = useState(defaultFeaturedProjects);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const userProjects = JSON.parse(localStorage.getItem("searchifi_projects") || "[]");

    if (userProjects && userProjects.length > 0) {
      const sortedProjects = [...userProjects].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      const recentUserProjects = sortedProjects.slice(0, 3);
      const remainingCount = 3 - recentUserProjects.length;
      const displayProjects = recentUserProjects.concat(
        remainingCount > 0 ? defaultFeaturedProjects.slice(0, remainingCount) : []
      );
      setFeaturedProjects(displayProjects);
    }
  }, []);

  return (
    <section className="py-20 px-4 sm:px-6 md:px-10 bg-black dark:bg-secondary/10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col -ml-10 md:flex-row md:justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h2 className="text-8xl sm:text-8xl md:text-6xl lg:text-8xl font-light text-white mb-2">
              Popular Projects
            </h2>
            <p className="text-muted-foreground max-w-xl text-sm sm:text-base">
              Discover some of the best projects on Searchifi that developers love.
            </p>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-10">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* View All Button at Bottom */}
        <div className="flex justify-center">
          <Link to="/projects">
            <Button
              variant="outline"
              className=" rounded-full text-white hover:text-white hover:bg-violet-800"
            >
              View All <ArrowRight size={16} className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;

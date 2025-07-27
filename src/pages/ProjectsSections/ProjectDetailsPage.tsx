import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/SearchifiMainpage/Navbar";
import Footer from "@/components/SearchifiMainpage/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Github,
  ExternalLink,
  Download,
  Monitor,
} from "lucide-react";

interface Project {
  _id: string;
  title: string;
  description: string;
  author: string;
  category: string;
  tags: string[];
  sourceCode: string;
  demoUrl?: string;
  image: string;
  fileName: string;
  createdAt: string;
}

const ProjectDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`https://backend-for-thesearchifi.onrender.com/api/projects/${id}`);
        const data = await res.json();
        setProject(data);
      } catch (err) {
        console.error("Failed to fetch project:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) return <div className="text-center mt-40">Loading...</div>;
  if (!project) return <div className="text-center mt-40">Project Not Found</div>;

  return (
    <div className="min-h-screen bg-background mt-32 text-foreground">
      <Navigation />
      <div className="container mx-auto pt-32 pb-20 px-4">
        <Link to="/projects">
          <Button variant="ghost" size="sm" className="mb-6">
            <ArrowLeft size={16} className="mr-2" />
            Back to Projects
          </Button>
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Thumbnail */}
          <div className="rounded-xl overflow-hidden shadow-xl">
            <img
              src={`https://backend-for-thesearchifi.onrender.com/uploads/${project.image}`}
              alt={project.title}
              className="w-full object-cover h-72 md:h-96"
            />
          </div>

          {/* Info */}
          <div>
            <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
            <p className="text-muted-foreground mb-3">{project.description}</p>

            <p className="text-sm text-white/60 mb-4">
              By <strong>{project.author}</strong> •{" "}
              {new Date(project.createdAt).toLocaleDateString()}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag, index) => (
                <Badge key={index} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Buttons */}
            <div className="space-y-3">
              {project.sourceCode && (
                <a href={project.sourceCode} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Github size={18} />
                    GitHub Repo
                  </Button>
                </a>
              )}

              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Monitor size={18} />
                    Live Demo
                  </Button>
                </a>
              )}

              <a
                href={`https://backend-for-thesearchifi.onrender.com/uploads/${project.fileName}`}
                download
              >
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Download size={18} />
                  Download ZIP
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;

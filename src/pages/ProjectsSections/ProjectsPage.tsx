import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/SearchifiMainpage/Navbar";
import HeroSection from "@/components/SearchifiMainpage/Endherosection";
import HeaderforProjectpage from "@/components/HeaderforProjectpage";

export interface Project {
  _id: string;
  title: string;
  description: string;
  author: string;
  category: string;
  tags: string[];
  sourceCode: string;
  image: string;
  createdAt: string;
}

// ... all imports same

const ProjectsPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login", { state: { from: "/projects" } });
    }
  }, [user]);

  useEffect(() => {
    const fetchProjects = async () => {
      const start = Date.now(); // Track start time

      try {
        const res = await fetch("https://backend-for-thesearchifi.onrender.com/api/projects");
        const data = await res.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        const elapsed = Date.now() - start;
        const delay = Math.max(2000 - elapsed, 0); // wait remaining time if < 2s
        setTimeout(() => {
          setLoading(false);
        }, delay);
      }
    };

    fetchProjects();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <video
          src="\loader.mp4" // 🔁 Replace with your actual loading video path
          autoPlay
          loop
          muted
          className="w-48 h-auto rounded-xl opacity-90"
        />
      </div>
    );

  if (!projects.length)
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <img
          src="\project not found yet.png" // 📦 Replace with your no-projects image
          alt="No Projects"
          className="w-64 h-auto opacity-80"
        />
      </div>
    );

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <div className="absolute top-0 left-0 w-full h-40 pointer-events-none z-30 bg-gradient-to-b from-violet-700/50 to-transparent" />
      <Navbar />
      <div className=" pb-16 p-10">
        <HeaderforProjectpage />
        {/* ➕ Add image below the main heading */}
        <div className="glass mb-10 rounded-xl overflow-hidden">
          <video
            src="\Yellow Futuristic Coming Soon Video.mp4" // Replace with your actual video path
            autoPlay
            loop
            muted
            className="w-full h-auto"
          />
        </div>
        <h1 className="text-5xl font-light py-20 border-white border-t text-left">Explore Projects</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {projects.map((project) => (
            <div
              key={project._id}
              className="relative p-3 bg-stone-950 text-white rounded-2xl overflow-hidden shadow-md"
            >
              {project.image && (
                <img
                  src={`https://backend-for-thesearchifi.onrender.com/uploads/${project.image}`}
                  alt={project.title}
                  className="w-full h-40 object-cover rounded-md"
                />
              )}

              <div className="relative z-10 px-3 pb-20 pt-3">
                <h3 className="text-lg font-semibold mb-1">{project.title}</h3>
                <p className="text-sm text-white/70 mb-2 line-clamp-2">{project.description}</p>

                <div className="flex flex-wrap gap-1 mb-3">
                  {project.tags?.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="bg-secondary/80 text-xs px-2 py-0.5">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <span className="text-xs text-white/50">By {project.author}</span>
              </div>

              <div className="absolute bottom-0 right-0 border-t border-l border-white/10 w-32 h-16 bg-black rounded-tl-2xl flex items-center justify-center z-50">
                <Link to={`/projects/${project._id}`}>
                  <Button
                    size="sm"
                    className="bg-white text-violet-700 hover:bg-violet-100 rounded-full text-xs px-3 py-1"
                  >
                    View more <ArrowRight size={12} className="ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;

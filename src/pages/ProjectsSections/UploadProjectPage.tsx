import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/SearchifiMainpage/Navbar";
import Footer from "@/components/SearchifiMainpage/Footer";

const UploadProjectPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef(null);
  const thumbnailInputRef = useRef(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedThumbnail, setSelectedThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    repoUrl: "",
    demoUrl: "",
    tags: "",
    language: "",
    category: "Web Applications", // Default category
  });

  if (!user) {
    navigate("/login", { state: { from: "/upload-project" } });
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.name.endsWith(".zip")) {
      setSelectedFile(file);
    } else {
      toast({ title: "Invalid ZIP file", variant: "destructive" });
    }
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedThumbnail(file);
      const reader = new FileReader();
      reader.onloadend = () => setThumbnailPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      toast({ title: "Invalid image file", variant: "destructive" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile || !selectedThumbnail) {
      toast({ title: "Please select both ZIP and thumbnail image.", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = new FormData();
      payload.append("title", formData.title);
      payload.append("description", formData.description);
      payload.append("author", user?.name || "Anonymous");
      payload.append("authorId", (user as any)?._id || "unknown");
      payload.append("category", formData.category);
      payload.append("tags", JSON.stringify(formData.tags.split(",").map(tag => tag.trim())));
      payload.append("sourceCode", formData.repoUrl);
      payload.append("demoUrl", formData.demoUrl); // ✅ Add this line
      payload.append("fileName", selectedFile.name);
      payload.append("image", selectedThumbnail); // multer handles this
      payload.append("zip", selectedFile);


      const res = await fetch("https://backend-for-thesearchifi.onrender.com/api/projects", {
        method: "POST",
        body: payload,
      });

      if (!res.ok) throw new Error("Upload failed");

      toast({
        title: "Project uploaded successfully!",
        description: "Your project has been shared with the community.",
      });

      navigate("/dashboard");
    } catch (error: any) {
      const text = await error?.response?.text?.(); // If error has response
      console.error("Upload error:", error, text);
      toast({
        title: "Upload failed",
        description: "Something went wrong while uploading your project.",
        variant: "destructive",
      });
    }
    finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow py-12">
        <div className="container max-w-3xl mx-auto bg-card p-6 rounded-lg">
          <h1 className="text-2xl font-bold mb-6 text-center">Share Your Project</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input name="title" value={formData.title} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea name="description" value={formData.description} onChange={handleChange} required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Repo URL</Label>
                <Input name="repoUrl" value={formData.repoUrl} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label>Live Demo URL (optional)</Label>
                <Input name="demoUrl" value={formData.demoUrl} onChange={handleChange} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Language</Label>
                <Input name="language" value={formData.language} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label>Tags (comma separated)</Label>
                <Input name="tags" value={formData.tags} onChange={handleChange} required />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Thumbnail</Label>
              <Input type="file" ref={thumbnailInputRef} accept="image/*" onChange={handleThumbnailChange} />
              {thumbnailPreview && (
                <img src={thumbnailPreview} alt="Preview" className="w-full h-48 object-cover rounded" />
              )}
            </div>
            <div className="space-y-2">
              <Label>Project ZIP File</Label>
              <Input type="file" ref={fileInputRef} accept=".zip" onChange={handleFileChange} />
            </div>
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Uploading..." : "Upload Project"}
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default UploadProjectPage;

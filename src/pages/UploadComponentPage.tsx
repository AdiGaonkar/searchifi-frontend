import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/SearchifiMainpage/Navbar";
import Footer from "@/components/SearchifiMainpage/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";

const TagInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");

  const addTag = () => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue && !tags.includes(trimmedValue) && tags.length < 5) {
      setTags([...tags, trimmedValue]);
      setInputValue("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div>
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={addTag}
        placeholder="Add up to 5 tags (press Enter after each)"
        className="flex-grow"
      />
      <div className="flex flex-wrap gap-2 mt-2">
        {tags.map((tag, index) => (
          <Badge key={index} variant="secondary" className="px-2 py-1 flex items-center gap-1">
            {tag}
            <button type="button" onClick={() => removeTag(tag)}>
              <X size={14} />
            </button>
          </Badge>
        ))}
        {tags.length === 0 && (
          <span className="text-sm text-muted-foreground">No tags added yet</span>
        )}
      </div>
    </div>
  );
};

const componentCategories = [
  "Buttons", "Cards", "Form Elements", "Navigation", "Page Layouts",
  "UI Elements", "Tables", "Lists", "Modals", "Other"
];

export default function UploadComponentPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState([]);
  const [codeType, setCodeType] = useState("html-css");
  const [htmlCode, setHtmlCode] = useState("");
  const [cssCode, setCssCode] = useState("");
  const [sourceCode, setSourceCode] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [previewContent, setPreviewContent] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (codeType === "html-css" && htmlCode && cssCode) {
      const blob = new Blob([
        `<!DOCTYPE html><html><head><style>${cssCode}</style></head><body>${htmlCode}</body></html>`
      ], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      setPreviewContent(url);
    } else if (codeType === "framework" && sourceCode) {
      const blob = new Blob([
        `<pre style='padding:1rem;font-family:monospace;'>${sourceCode}</pre>`
      ], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      setPreviewContent(url);
    } else {
      setPreviewContent(null);
    }
  }, [htmlCode, cssCode, sourceCode, codeType]);

  if (!user) {
    navigate("/login", { state: { from: "/upload-component" } });
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !category || tags.length === 0 || (!sourceCode && (!htmlCode || !cssCode))) {
      toast({ title: "Missing information", description: "Please fill in all required fields", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      const newComponent = {
        id: crypto.randomUUID(),
        title,
        description,
        author: user.name || user.email,
        authorId: user.id,
        category,
        tags,
        codeType,
        html: codeType === "html-css" ? htmlCode : null,
        css: codeType === "html-css" ? cssCode : null,
        sourceCode: codeType === "framework" ? sourceCode : null,
        previewUrl: previewContent,
        likes: 0,
        createdAt: new Date().toISOString(),
      };

      const existing = JSON.parse(localStorage.getItem("searchifi_components") || "[]");
      localStorage.setItem("searchifi_components", JSON.stringify([...existing, newComponent]));

      toast({ title: "Component uploaded successfully", description: "Your component has been shared." });
      navigate("/components");
    } catch {
      toast({ title: "Upload failed", description: "Error uploading your component", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 px-4">
        <div className="container mt-20 mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold mb-2">Share Your UI Component</h1>
          <p className="text-muted-foreground mb-8">Share your beautiful UI components with the community.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="title">Component Name</Label>
              <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
            </div>
            <div>
              <Label>Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {componentCategories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Tags</Label>
              <TagInput tags={tags} setTags={setTags} />
            </div>
            <div>
              <Label>Code Type</Label>
              <Select value={codeType} onValueChange={setCodeType}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="html-css">HTML + CSS</SelectItem>
                  <SelectItem value="framework">React/Tailwind/Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {codeType === "html-css" ? (
              <>
                <Label>HTML</Label>
                <Textarea value={htmlCode} onChange={(e) => setHtmlCode(e.target.value)} className="min-h-[150px] font-mono text-sm" />
                <Label>CSS</Label>
                <Textarea value={cssCode} onChange={(e) => setCssCode(e.target.value)} className="min-h-[150px] font-mono text-sm" />
              </>
            ) : (
              <>
                <Label>Source Code</Label>
                <Textarea value={sourceCode} onChange={(e) => setSourceCode(e.target.value)} className="min-h-[250px] font-mono text-sm" />
              </>
            )}

            {previewContent && (
              <div className="mt-6">
                <Label>Live Preview</Label>
                <iframe
                  src={previewContent}
                  title="Component Preview"
                  className="w-full h-[300px] border mt-2 rounded"
                />
              </div>
            )}

            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex gap-2"
              >
                {isSubmitting && <div className="animate-spin">◌</div>}
                Share Component
              </Button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}

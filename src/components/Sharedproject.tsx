// components/ShareProjectButton.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import UploadOptions from "@/components/UploadOptions";

const ShareProjectButton = ({ className = "" }: { className?: string }) => {
  const [showUploadOptions, setShowUploadOptions] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    if (user) {
      setShowUploadOptions(true);
    } else {
      navigate("/login", { state: { from: "/upload-project" } });
    }
  };

  return (
    <>
      <Button
        variant="outline"
        onClick={handleClick}
        className={`text-white hover:text-white bg-gradient-to-b from-violet-600 to-violet-950  hover:opacity-70 transform transition-all duration-150 hover:scale-95 rounded-full ${className}`}
      >
        Share Your Project
      </Button>

      <UploadOptions
        open={showUploadOptions}
        onOpenChange={setShowUploadOptions}
      />
    </>
  );
};

export default ShareProjectButton;

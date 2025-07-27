import { toast } from "@/components/ui/use-toast";

export interface Component {
  id: string;
  title: string;
  description: string;
  author: string;
  authorId: string;
  category: string;
  tags: string[];
  sourceCode: string;
  image: string;
  likes: number;
  createdAt: string;
}

// Helper to get components from localStorage
export const getComponents = (): Component[] => {
  try {
    return JSON.parse(localStorage.getItem("searchifi_components") || "[]");
  } catch (e) {
    console.error("Error getting components:", e);
    return [];
  }
};

// Helper to save components to localStorage
export const saveComponents = (components: Component[]): void => {
  try {
    localStorage.setItem("searchifi_components", JSON.stringify(components));
  } catch (e) {
    console.error("Error saving components:", e);
    toast({
      title: "Error",
      description: "Failed to save component data",
      variant: "destructive",
    });
  }
};

// NEW: Delete component
export const deleteComponent = (userId: string, componentId: string): boolean => {
  try {
    const allComponents = getComponents();
    const updatedComponents = allComponents.filter(
      (comp) => comp.id !== componentId || comp.authorId !== userId
    );

    if (allComponents.length === updatedComponents.length) {
      // Nothing was removed
      return false;
    }

    saveComponents(updatedComponents);
    return true;
  } catch (e) {
    console.error("Error deleting component:", e);
    toast({
      title: "Error",
      description: "Failed to delete component",
      variant: "destructive",
    });
    return false;
  }
};

// Get user profile for components
export const getUserComponentProfile = (userId: string) => {
  try {
    const profile = JSON.parse(
      localStorage.getItem(`searchifi_user_${userId}`) ||
        JSON.stringify({
          savedComponents: [],
          likedComponents: [],
        })
    );

    if (!profile.savedComponents) profile.savedComponents = [];
    if (!profile.likedComponents) profile.likedComponents = [];

    return profile;
  } catch (e) {
    console.error("Error getting user component profile:", e);
    return { savedComponents: [], likedComponents: [] };
  }
};

// Save user profile for components
export const saveUserComponentProfile = (userId: string, profile: any) => {
  try {
    localStorage.setItem(`searchifi_user_${userId}`, JSON.stringify(profile));
  } catch (e) {
    console.error("Error saving user component profile:", e);
  }
};

// Toggle like component
export const toggleLikeComponent = (userId: string, componentId: string): boolean => {
  if (!userId) return false;

  const profile = getUserComponentProfile(userId);
  const isLiked = profile.likedComponents.includes(componentId);
  const components = getComponents();
  const componentIndex = components.findIndex((c) => c.id === componentId);

  if (componentIndex === -1) return false;

  if (isLiked) {
    profile.likedComponents = profile.likedComponents.filter(
      (id: string) => id !== componentId
    );
    components[componentIndex].likes = Math.max(
      0,
      (components[componentIndex].likes || 0) - 1
    );
  } else {
    profile.likedComponents.push(componentId);
    components[componentIndex].likes =
      (components[componentIndex].likes || 0) + 1;
  }

  saveUserComponentProfile(userId, profile);
  saveComponents(components);
  return !isLiked;
};

// Check if component is liked by user
export const isComponentLiked = (userId: string, componentId: string): boolean => {
  if (!userId) return false;
  const profile = getUserComponentProfile(userId);
  return profile.likedComponents.includes(componentId);
};

// Format date helper
export const formatComponentDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

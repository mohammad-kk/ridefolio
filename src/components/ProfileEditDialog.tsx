import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ProfileForm, type ProfileFormValues } from "./profile/ProfileForm";
import { ProfileImageUpload } from "./profile/ProfileImageUpload";

interface ProfileEditDialogProps {
  profile: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProfileUpdated: () => void;
}

export function ProfileEditDialog({
  profile,
  open,
  onOpenChange,
  onProfileUpdated,
}: ProfileEditDialogProps) {
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  const onSubmit = async (values: ProfileFormValues) => {
    if (!user) {
      toast.error("You must be logged in to update your profile");
      return;
    }

    setIsSubmitting(true);
    try {
      let profile_picture = profile.profile_picture;
      if (profileImage) {
        const fileExt = profileImage.name.split(".").pop();
        const filePath = `${user.id}/${crypto.randomUUID()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("profile_images")
          .upload(filePath, profileImage);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from("profile_images")
          .getPublicUrl(filePath);

        profile_picture = publicUrl;
      }

      const { error: updateError } = await supabase
        .from("users")
        .update({
          ...values,
          profile_picture,
        })
        .eq("id", user.id);

      if (updateError) throw updateError;

      toast.success("Profile updated successfully!");
      onProfileUpdated();
      onOpenChange(false);
    } catch (error) {
      toast.error("Failed to update profile");
      console.error("Error updating profile:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Update your profile information below
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <ProfileForm
            defaultValues={{
              first_name: profile.first_name || "",
              last_name: profile.last_name || "",
              bio: profile.bio || "",
              instagram_url: profile.instagram_url || "",
              location: profile.location || "",
            }}
            onSubmit={onSubmit}
            isSubmitting={isSubmitting}
          />
          <ProfileImageUpload
            profileImage={profileImage}
            onImageChange={handleImageChange}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
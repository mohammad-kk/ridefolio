import { ImagePlus } from "lucide-react";

interface ProfileImageUploadProps {
  profileImage: File | null;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ProfileImageUpload({ profileImage, onImageChange }: ProfileImageUploadProps) {
  return (
    <div>
      <label className="block">
        <span className="text-sm font-medium">Profile Picture</span>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 rounded-lg">
          <div className="space-y-1 text-center">
            <ImagePlus className="mx-auto h-12 w-12 text-gray-400" />
            <div className="flex text-sm text-gray-600">
              <label className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary/90">
                <span>Upload a photo</span>
                <input
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={onImageChange}
                />
              </label>
            </div>
            <p className="text-xs text-gray-500">
              PNG, JPG, GIF up to 10MB
            </p>
          </div>
        </div>
      </label>
      {profileImage && (
        <div className="mt-4">
          <img
            src={URL.createObjectURL(profileImage)}
            alt="Profile preview"
            className="w-32 h-32 object-cover rounded-full mx-auto"
          />
        </div>
      )}
    </div>
  );
}
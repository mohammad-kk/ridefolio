import { ImagePlus } from "lucide-react";

interface CarImageUploadProps {
  images: File[];
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function CarImageUpload({ images, onImageChange }: CarImageUploadProps) {
  return (
    <div className="space-y-4">
      <label className="block">
        <span className="text-sm font-medium">Add More Images</span>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 rounded-lg">
          <div className="space-y-1 text-center">
            <ImagePlus className="mx-auto h-12 w-12 text-gray-400" />
            <div className="flex text-sm text-gray-600">
              <label className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary/90">
                <span>Upload images</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="sr-only"
                  onChange={onImageChange}
                />
              </label>
            </div>
            <p className="text-xs text-gray-500">
              PNG, JPG, GIF up to 10MB each
            </p>
          </div>
        </div>
      </label>
      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={URL.createObjectURL(image)}
                alt={`Preview ${index + 1}`}
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
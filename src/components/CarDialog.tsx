import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { PlusCircle, ImagePlus, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { CarForm } from "./car/CarForm";
import type { CarFormValues } from "./car/CarFormSchema";

interface CarDialogProps {
  onCarAdded: () => void;
}

export function CarDialog({ onCarAdded }: CarDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const { user } = useAuth();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files);
      setImages((prev) => [...prev, ...newImages]);
    }
  };

  const onSubmit = async (values: CarFormValues) => {
    if (!user) {
      toast.error("You must be logged in to add a car");
      return;
    }

    setIsSubmitting(true);
    try {
      // First insert the car
      const { data: carData, error: carError } = await supabase
        .from("cars")
        .insert({
          make: values.make,
          model: values.model,
          year: values.year,
          trim: values.trim || null,
          color: values.color || null,
          description: values.description || null,
          location: values.location || null,
          instagram_url: values.instagram_url || null,
          user_id: user.id,
        })
        .select()
        .single();

      if (carError) throw carError;

      // Then upload images if any
      if (images.length > 0) {
        for (const image of images) {
          const fileExt = image.name.split(".").pop();
          const filePath = `${carData.id}/${crypto.randomUUID()}.${fileExt}`;

          const { error: uploadError } = await supabase.storage
            .from("car_images")
            .upload(filePath, image);

          if (uploadError) throw uploadError;
        }
      }

      toast.success("Car added successfully!");
      onCarAdded();
      setIsOpen(false);
      setImages([]);
    } catch (error) {
      toast.error("Failed to add car");
      console.error("Error adding car:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <PlusCircle className="h-4 w-4" />
          Add Car
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add a New Car</DialogTitle>
          <DialogDescription>
            Fill in the details of your car below.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <CarForm onSubmit={onSubmit} isSubmitting={isSubmitting} />
          
          <div>
            <label className="block">
              <span className="text-sm font-medium">Car Images</span>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 rounded-lg">
                <div className="space-y-1 text-center">
                  <ImagePlus className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary/90">
                      <span>Upload photos</span>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        className="sr-only"
                        onChange={handleImageChange}
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
              <div className="mt-4 grid grid-cols-2 gap-4">
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
        </div>
      </DialogContent>
    </Dialog>
  );
}
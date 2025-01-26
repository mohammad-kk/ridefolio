import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { CarFormFields } from "./car/CarFormFields";
import { CarImageUpload } from "./car/CarImageUpload";
import { DeleteCarDialog } from "./car/DeleteCarDialog";

const formSchema = z.object({
  year: z.string().min(4, "Year must be 4 digits").max(4),
  make: z.string().min(1, "Make is required"),
  model: z.string().min(1, "Model is required"),
  trim: z.string().optional(),
  color: z.string().min(1, "Color is required"),
  description: z.string().optional(),
  location: z.string().optional(),
  instagram_url: z.string().url().optional().or(z.literal("")),
});

interface ViewCarDialogProps {
  car: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCarUpdated: () => void;
}

export function ViewCarDialog({
  car,
  open,
  onOpenChange,
  onCarUpdated,
}: ViewCarDialogProps) {
  const [images, setImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      year: car.year.toString(),
      make: car.make,
      model: car.model,
      trim: car.trim || "",
      color: car.color || "",
      description: car.description || "",
      location: car.location || "",
      instagram_url: car.instagram_url || "",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files);
      setImages((prev) => [...prev, ...newImages]);
    }
  };

  const handleDelete = async () => {
    try {
      const { error } = await supabase
        .from("cars")
        .delete()
        .eq("id", car.id);

      if (error) throw error;

      toast.success("Car deleted successfully!");
      onOpenChange(false);
      onCarUpdated();
    } catch (error) {
      toast.error("Failed to delete car");
      console.error("Error deleting car:", error);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!user) {
      toast.error("You must be logged in to update a car");
      return;
    }

    setIsSubmitting(true);
    try {
      // Update car data
      const { error: carError } = await supabase
        .from("cars")
        .update({
          ...values,
          year: parseInt(values.year),
        })
        .eq("id", car.id);

      if (carError) throw carError;

      // Upload new images if any
      if (images.length > 0) {
        for (const image of images) {
          const fileExt = image.name.split(".").pop();
          const filePath = `${car.id}/${crypto.randomUUID()}.${fileExt}`;

          const { error: uploadError } = await supabase.storage
            .from("car_images")
            .upload(filePath, image);

          if (uploadError) throw uploadError;
        }
      }

      toast.success("Car updated successfully!");
      onCarUpdated();
      setImages([]);
    } catch (error) {
      toast.error("Failed to update car. Please try again.");
      console.error("Error updating car:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Car</DialogTitle>
          <DialogDescription>Update your car's details below</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <CarFormFields form={form} />
            <CarImageUpload images={images} onImageChange={handleImageChange} />

            <div className="flex justify-between">
              <DeleteCarDialog onDelete={handleDelete} />
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating Car...
                  </>
                ) : (
                  "Update Car"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
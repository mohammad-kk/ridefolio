import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarImageCarouselProps {
  carId: string;
}

export function CarImageCarousel({ carId }: CarImageCarouselProps) {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    async function fetchCarImages() {
      const { data: files } = await supabase.storage
        .from('car_images')
        .list(carId);

      if (files && files.length > 0) {
        const imageUrls = files.map(file => {
          const { data: { publicUrl } } = supabase.storage
            .from('car_images')
            .getPublicUrl(`${carId}/${file.name}`);
          return publicUrl;
        });
        setImages(imageUrls);
      }
    }

    fetchCarImages();
  }, [carId]);

  if (images.length === 0) {
    return (
      <div className="w-full aspect-video bg-muted flex items-center justify-center">
        <span className="text-muted-foreground">No images</span>
      </div>
    );
  }

  return (
    <div className="relative group">
      <Carousel className="w-full">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="aspect-video w-full">
                <img
                  src={image}
                  alt={`Car image ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <CarouselPrevious className="relative left-0 h-8 w-8 rounded-full">
            <ChevronLeft className="h-4 w-4" />
          </CarouselPrevious>
          <CarouselNext className="relative right-0 h-8 w-8 rounded-full">
            <ChevronRight className="h-4 w-4" />
          </CarouselNext>
        </div>
      </Carousel>
    </div>
  );
}
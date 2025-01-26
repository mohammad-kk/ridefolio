import { CarDialog } from "@/components/CarDialog";
import { ViewCarDialog } from "@/components/ViewCarDialog";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { CarDetailsDialog } from "@/components/car/CarDetailsDialog";
import { Instagram } from "lucide-react";

interface Car {
  id: string;
  year: number;
  make: string;
  model: string;
  trim?: string;
  instagram_url?: string;
  modifications?: any[];
}

interface GarageSectionProps {
  cars: Car[];
  onCarAdded: () => Promise<void>;
  onCarUpdated: () => Promise<void>;
}

export function GarageSection({ cars, onCarAdded, onCarUpdated }: GarageSectionProps) {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [carImages, setCarImages] = useState<Record<string, string>>({});
  const [carModifications, setCarModifications] = useState<Record<string, any[]>>({});

  const fetchCarImages = async () => {
    for (const car of cars) {
      try {
        const { data: files } = await supabase.storage
          .from('car_images')
          .list(car.id);

        if (files && files.length > 0) {
          const { data: { publicUrl } } = supabase.storage
            .from('car_images')
            .getPublicUrl(`${car.id}/${files[0].name}`);

          setCarImages(prev => ({
            ...prev,
            [car.id]: publicUrl
          }));
        }
      } catch (error) {
        console.error('Error fetching car images:', error);
      }
    }
  };

  const fetchCarModifications = async () => {
    for (const car of cars) {
      try {
        const { data: modifications, error } = await supabase
          .from('modifications')
          .select(`
            *,
            modification_subcategories (
              name,
              category_id,
              modification_categories (
                name
              )
            )
          `)
          .eq('car_id', car.id);

        if (error) throw error;

        setCarModifications(prev => ({
          ...prev,
          [car.id]: modifications || []
        }));
      } catch (error) {
        console.error('Error fetching car modifications:', error);
      }
    }
  };

  useEffect(() => {
    fetchCarImages();
    fetchCarModifications();
  }, [cars]);

  const handleCarClick = (car: Car) => {
    setSelectedCar({
      ...car,
      modifications: carModifications[car.id] || []
    });
    setIsViewDialogOpen(true);
  };

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">My Garage</h2>
      </div>

      {cars.length === 0 ? (
        <div className="text-center py-16 bg-muted/30 rounded-lg border border-dashed">
          <h3 className="text-lg font-medium text-foreground mb-2">
            Your garage is empty
          </h3>
          <p className="text-muted-foreground mb-4">
            Start building your collection by adding your first car
          </p>
          <CarDialog onCarAdded={onCarAdded} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <div
              key={car.id}
              className="group bg-card rounded-lg border shadow-sm overflow-hidden cursor-pointer hover:border-primary/50 transition-colors"
              onClick={() => handleCarClick(car)}
            >
              <div className="aspect-video bg-muted relative">
                {carImages[car.id] ? (
                  <img
                    src={carImages[car.id]}
                    alt={`${car.year} ${car.make} ${car.model}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <span className="text-muted-foreground">No image</span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">
                      {car.year} {car.make} {car.model}
                    </h3>
                    {car.trim && (
                      <p className="text-sm text-muted-foreground">{car.trim}</p>
                    )}
                  </div>
                  {car.instagram_url && (
                    <Instagram className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  )}
                </div>
                {carModifications[car.id]?.length > 0 && (
                  <p className="text-sm text-muted-foreground mt-2">
                    {carModifications[car.id].length} modification{carModifications[car.id].length !== 1 ? 's' : ''}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedCar && (
        <CarDetailsDialog
          car={selectedCar}
          open={isViewDialogOpen}
          onOpenChange={setIsViewDialogOpen}
          onCarUpdated={onCarUpdated}
        />
      )}
    </div>
  );
}
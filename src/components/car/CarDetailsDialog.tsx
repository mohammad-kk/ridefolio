import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Instagram } from "lucide-react";
import { ViewCarDialog } from "../ViewCarDialog";
import { useState } from "react";
import { Separator } from "../ui/separator";
import { CarImageCarousel } from "./CarImageCarousel";
import { AddModificationDialog } from "./AddModificationDialog";
import { ModificationCard } from "./ModificationCard";

interface CarDetailsDialogProps {
  car: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCarUpdated: () => void;
}

export function CarDetailsDialog({
  car,
  open,
  onOpenChange,
  onCarUpdated,
}: CarDetailsDialogProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {car.year} {car.make} {car.model}
              {car.trim && <span className="text-muted-foreground ml-2">{car.trim}</span>}
            </DialogTitle>
            <DialogDescription>
              View and manage your car's details and modifications
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <CarImageCarousel carId={car.id} />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Details</h3>
                <div className="space-y-2">
                  <p>
                    <span className="text-muted-foreground">Color:</span>{" "}
                    {car.color || "Not specified"}
                  </p>
                  <p>
                    <span className="text-muted-foreground">Location:</span>{" "}
                    {car.location || "Not specified"}
                  </p>
                  {car.instagram_url && (
                    <a
                      href={car.instagram_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-primary hover:underline"
                    >
                      <Instagram className="h-4 w-4" />
                      Instagram
                    </a>
                  )}
                </div>
              </div>

              {car.description && (
                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground">{car.description}</p>
                </div>
              )}
            <div className="flex justify-end">
              <Button onClick={() => setIsEditDialogOpen(true)}>
                Edit Car Details
              </Button>
            </div>
              
            </div>

            <Separator />

            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Modifications</h3>
                <div className="flex-shrink-0">
                  <AddModificationDialog carId={car.id} onModificationAdded={onCarUpdated} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {car.modifications?.map((mod: any) => (
                  <ModificationCard
                    key={mod.id}
                    modification={mod}
                    onDelete={onCarUpdated}
                    onUpdate={onCarUpdated}
                  />
                ))}
                {(!car.modifications || car.modifications.length === 0) && (
                  <p className="text-muted-foreground col-span-2 text-center py-4">
                    No modifications added yet
                  </p>
                )}
              </div>
            </div>


          </div>
        </DialogContent>
      </Dialog>

      <ViewCarDialog
        car={car}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onCarUpdated={onCarUpdated}
      />
    </>
  );
}
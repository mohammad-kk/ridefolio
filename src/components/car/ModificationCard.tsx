import { Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ModificationForm } from "./modification/ModificationForm";

interface ModificationCardProps {
  modification: any;
  onDelete: () => void;
  onUpdate: () => void;
}

export function ModificationCard({ modification, onDelete, onUpdate }: ModificationCardProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDelete = async () => {
    try {
      const { error } = await supabase
        .from('modifications')
        .delete()
        .eq('id', modification.id);

      if (error) throw error;
      
      toast.success("Modification deleted successfully");
      onDelete();
    } catch (error) {
      console.error('Error deleting modification:', error);
      toast.error("Failed to delete modification");
    }
  };

  const handleUpdate = async ({ subcategoryId, price }: { subcategoryId: string; price?: string }) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('modifications')
        .update({
          subcategory_id: subcategoryId,
          price: price ? parseFloat(price) : null
        })
        .eq('id', modification.id);

      if (error) throw error;
      
      toast.success("Modification updated successfully");
      onUpdate();
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error('Error updating modification:', error);
      toast.error("Failed to update modification");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Card className="relative group">
        <CardHeader className="p-4 pb-2">
          <div className="flex justify-between items-start">
            <Badge variant="secondary">
              {modification.modification_subcategories?.modification_categories?.name || "Unknown Category"}
            </Badge>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setIsEditDialogOpen(true)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={handleDelete}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <h4 className="font-medium">
            {modification.modification_subcategories?.name || "Unknown Modification"}
          </h4>
          {modification.price && (
            <p className="text-sm text-muted-foreground mt-1">
              ${modification.price.toLocaleString()}
            </p>
          )}
        </CardContent>
      </Card>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Modification</DialogTitle>
          </DialogHeader>
          <ModificationForm
            initialCategory={modification.modification_subcategories?.modification_categories?.id}
            initialSubcategory={modification.subcategory_id}
            initialPrice={modification.price?.toString()}
            onSubmit={handleUpdate}
            isSubmitting={isSubmitting}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
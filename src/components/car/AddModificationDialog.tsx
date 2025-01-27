import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Plus, Wrench } from "lucide-react";
import { toast } from "sonner";

interface AddModificationDialogProps {
  carId: string;
  onModificationAdded: () => void;
}

export function AddModificationDialog({ carId, onModificationAdded }: AddModificationDialogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);

  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ['modificationCategories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('modification_categories')
        .select('*')
        .order('name');
      if (error) throw error;
      return data;
    },
  });

  const { data: subcategories, isLoading: subcategoriesLoading } = useQuery({
    queryKey: ['modificationSubcategories', selectedCategory],
    queryFn: async () => {
      if (!selectedCategory) return [];
      const { data, error } = await supabase
        .from('modification_subcategories')
        .select('*')
        .eq('category_id', selectedCategory)
        .order('name');
      if (error) throw error;
      return data;
    },
    enabled: !!selectedCategory,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSubcategory) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('modifications')
        .insert({
          car_id: carId,
          subcategory_id: selectedSubcategory,
          status: 'planned',
          price: price ? parseFloat(price) : null
        });

      if (error) throw error;
      
      toast.success("Modification added successfully");
      onModificationAdded();
      setOpen(false);
      setSelectedCategory("");
      setSelectedSubcategory("");
      setPrice("");
    } catch (error) {
      console.error('Error adding modification:', error);
      toast.error("Failed to add modification");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className=" group hover:bg-primary hover:text-primary-foreground transition-all duration-200"
        >
          <Wrench className="w-4 h-4 mr-2 group-hover:rotate-45 transition-transform duration-200" />
          Add Modification
          <Plus className="w-4 h-4 ml-2 group-hover:scale-125 transition-transform duration-200" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Modification</DialogTitle>
          <DialogDescription>
            Choose a category and subcategory for your modification. You can also specify the price.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label>Category</Label>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories?.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedCategory && (
            <div className="space-y-2">
              <Label>Subcategory</Label>
              <Select
                value={selectedSubcategory}
                onValueChange={setSelectedSubcategory}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select subcategory" />
                </SelectTrigger>
                <SelectContent>
                  {subcategories?.map((subcategory) => (
                    <SelectItem key={subcategory.id} value={subcategory.id}>
                      {subcategory.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <Label>Price (optional)</Label>
            <Input
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              min="0"
              step="50.0"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full"
            disabled={isSubmitting || !selectedSubcategory}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding...
              </>
            ) : (
              'Add Modification'
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
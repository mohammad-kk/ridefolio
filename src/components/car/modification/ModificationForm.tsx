import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface ModificationFormProps {
  initialCategory?: string;
  initialSubcategory?: string;
  initialPrice?: string;
  onSubmit: (values: { subcategoryId: string; price?: string }) => Promise<void>;
  isSubmitting: boolean;
}

export function ModificationForm({
  initialCategory,
  initialSubcategory,
  initialPrice,
  onSubmit,
  isSubmitting,
}: ModificationFormProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || "");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>(initialSubcategory || "");
  const [price, setPrice] = useState<string>(initialPrice || "");

  const { data: categories } = useQuery({
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

  const { data: subcategories } = useQuery({
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSubcategory) return;
    onSubmit({ subcategoryId: selectedSubcategory, price });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
          step="0.01"
        />
      </div>

      <Button 
        type="submit" 
        className="w-full"
        disabled={isSubmitting || !selectedSubcategory}
      >
        {isSubmitting ? "Saving..." : "Save Modification"}
      </Button>
    </form>
  );
}
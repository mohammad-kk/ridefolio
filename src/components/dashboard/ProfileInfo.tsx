import { Button } from "@/components/ui/button";
import { Edit2, MapPin, Instagram } from "lucide-react";
import type { UserProfile } from "@/types/user";
import { CarDialog } from "@/components/CarDialog";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface ProfileInfoProps {
  profile: UserProfile;
  onEditProfile: () => void;
  onAddCar: () => void;
}

export function ProfileInfo({ profile, onEditProfile, onAddCar }: ProfileInfoProps) {
  const [carCount, setCarCount] = useState(0);

  useEffect(() => {
    const fetchCarCount = async () => {
      const { count, error } = await supabase
        .from('cars')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', profile.id);
      
      if (!error && count !== null) {
        setCarCount(count);
      }
    };

    fetchCarCount();
  }, [profile.id]);

  return (
    <div className="flex-1 space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
        <h1 className="text-2xl font-bold">
          {[profile.first_name, profile.last_name].filter(Boolean).join(' ')}
        </h1>
          <p className="text-muted-foreground">@{profile.username}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2" onClick={onEditProfile}>
            <Edit2 className="h-4 w-4" />
            Edit Profile
          </Button>
          <CarDialog onCarAdded={onAddCar} />
        </div>
      </div>

      <div className="space-y-2">
        {profile.bio && (
          <p className="text-sm text-foreground/80 whitespace-pre-wrap">
            {profile.bio}
          </p>
        )}
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          {profile.location && (
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{profile.location}</span>
            </div>
          )}
          {profile.instagram_url && (
            <a 
              href={profile.instagram_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-foreground transition-colors"
            >
              <Instagram className="h-4 w-4" />
              <span>Instagram</span>
            </a>
          )}
        </div>
      </div>

      <div className="flex gap-6 pt-4 border-t">
        <div>
          <span className="font-semibold">{carCount}</span>
          <span className="text-muted-foreground ml-1">cars</span>
        </div>
        <div>
          <span className="font-semibold">0</span>
          <span className="text-muted-foreground ml-1">followers</span>
        </div>
        <div>
          <span className="font-semibold">0</span>
          <span className="text-muted-foreground ml-1">following</span>
        </div>
      </div>
    </div>
  );
}
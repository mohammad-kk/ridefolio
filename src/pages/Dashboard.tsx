import Navigation from "@/components/Navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ProfileEditDialog } from "@/components/ProfileEditDialog";
import type { UserProfile } from "@/types/user";
import { ProfileHeader } from "@/components/dashboard/ProfileHeader";
import { GarageSection } from "@/components/dashboard/GarageSection";

const Dashboard = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [cars, setCars] = useState<any[]>([]);
  const [isProfileEditOpen, setIsProfileEditOpen] = useState(false);

  const fetchUserProfile = async () => {
    if (!user?.id) return;
    
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) {
      toast.error("Error fetching profile");
      return;
    }

    setProfile(data);
  };

  const fetchUserCars = async () => {
    if (!user?.id) return;

    const { data, error } = await supabase
      .from('cars')
      .select('*')
      .eq('user_id', user.id);

    if (error) {
      toast.error("Error fetching cars");
      return;
    }

    setCars(data || []);
  };

  useEffect(() => {
    fetchUserProfile();
    fetchUserCars();
  }, [user]);

  const handleProfileUpdate = () => {
    fetchUserProfile();
  };

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <ProfileHeader
        profile={profile}
        onEditProfile={() => setIsProfileEditOpen(true)}
        onAddCar={fetchUserCars}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <GarageSection
          cars={cars}
          onCarAdded={fetchUserCars}
          onCarUpdated={fetchUserCars}
        />
      </div>

      <ProfileEditDialog
        profile={profile}
        open={isProfileEditOpen}
        onOpenChange={setIsProfileEditOpen}
        onProfileUpdated={handleProfileUpdate}
      />
    </div>
  );
};

export default Dashboard;
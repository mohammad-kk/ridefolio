import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera } from "lucide-react";
import type { UserProfile } from "@/types/user";
import { ProfileInfo } from "./ProfileInfo";

interface ProfileHeaderProps {
  profile: UserProfile;
  onEditProfile: () => void;
  onAddCar: () => void;
}

export function ProfileHeader({ profile, onEditProfile, onAddCar }: ProfileHeaderProps) {
  return (
    <>
      <div className="relative h-[300px] w-full">
        <img
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80"
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <Button 
          variant="ghost" 
          size="icon"
          className="absolute top-4 right-4 bg-black/20 hover:bg-black/30 text-white rounded-full"
        >
          <Camera className="h-5 w-5" />
        </Button>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-[96px]">
        <div className="relative z-10 bg-background rounded-xl shadow-sm p-6 border">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="relative flex-shrink-0">
              <Avatar className="h-32 w-32 border-4 border-background">
                <AvatarImage 
                  src={profile?.profile_picture} 
                  alt={profile?.username}
                  className="object-cover"
                />
                <AvatarFallback className="text-4xl">
                  {profile?.first_name?.[0]}
                </AvatarFallback>
              </Avatar>
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute bottom-0 right-0 bg-black/20 hover:bg-black/30 text-white rounded-full"
                onClick={onEditProfile}
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>

            <ProfileInfo profile={profile} onEditProfile={onEditProfile} onAddCar={onAddCar} />
          </div>
        </div>
      </div>
    </>
  );
}
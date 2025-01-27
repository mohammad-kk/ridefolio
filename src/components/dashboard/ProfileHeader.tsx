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
      <div className="relative h-80 w-full overflow-hidden">
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/40 z-10" />
        
        <img
          src="https://www.f1-fansite.com/wp-content/uploads/2023/05/230078-scuderia-ferrari-monaco-gp-race.jpg"
          alt="Cover"
          className="w-full h-full object-cover object-center transform scale-105"
        />
        <Button 
          variant="ghost" 
          size="icon"
          className="absolute top-4 right-4 bg-black/30 hover:bg-black/40 text-white rounded-full z-20 backdrop-blur-sm"
        >
          <Camera className="h-5 w-5" />
        </Button>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24">
        <div className="relative z-20 bg-background rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="relative flex-shrink-0">
              <Avatar className="h-32 w-32 border-4 border-background shadow-xl">
                <AvatarImage 
                  src={profile?.profile_picture} 
                  alt={profile?.username}
                  className="object-cover"
                />
                <AvatarFallback className="text-4xl">
                  {profile?.first_name?.[0]}
                </AvatarFallback>
              </Avatar>
              {!profile?.profile_picture && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute bottom-0 right-0 bg-black/30 hover:bg-black/40 text-white rounded-full backdrop-blur-sm"
                  onClick={onEditProfile}
                >
                  <Camera className="h-4 w-4" />
                </Button>
              )}
            </div>

            <ProfileInfo profile={profile} onEditProfile={onEditProfile} onAddCar={onAddCar} />
          </div>
        </div>
      </div>
    </>
  );
}
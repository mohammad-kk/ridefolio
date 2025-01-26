export interface UserProfile {
  id: string;
  username: string;
  email: string;
  first_name: string;
  last_name?: string;
  is_private: boolean;
  profile_picture?: string;
  bio?: string;
  created_at: string;
  instagram_url?: string;
  location?: string;
}
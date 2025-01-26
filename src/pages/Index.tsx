import Navigation from "@/components/Navigation";
import FeatureCard from "@/components/FeatureCard";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleGetStarted = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/signup");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center animate-fade-down">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-black mb-6">
              Share Your Ride.<br />Connect with Enthusiasts.
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join the ultimate community for car enthusiasts. Show off your ride, connect with others, and discover amazing vehicles.
            </p>
            <Button 
              className="bg-black text-white hover:bg-black/90 h-12 px-8 text-lg"
              onClick={handleGetStarted}
            >
              Get Started
            </Button>
          </div>
          
          <div className="mt-16 relative animate-fade-up">
            <div className="aspect-[16/9] rounded-2xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80"
                alt="Luxury car showcase"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose Rides?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience the perfect platform for automotive enthusiasts
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              title="Showcase Your Car"
              description="Create stunning profiles for your vehicles with high-quality photos and detailed specifications."
              className="animate-fade-up [animation-delay:200ms]"
            />
            <FeatureCard 
              title="Connect & Share"
              description="Join a vibrant community of car enthusiasts, share stories, and make lasting connections."
              className="animate-fade-up [animation-delay:400ms]"
            />
            <FeatureCard 
              title="Discover & Inspire"
              description="Explore an incredible collection of vehicles and get inspired by fellow enthusiasts."
              className="animate-fade-up [animation-delay:600ms]"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Join?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Start sharing your automotive journey with enthusiasts worldwide.
          </p>
          <Button 
            className="bg-black text-white hover:bg-black/90 h-12 px-8 text-lg"
            onClick={() => navigate("/signup")}
          >
            Create Account
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
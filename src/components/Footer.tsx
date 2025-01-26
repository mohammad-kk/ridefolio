const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-black">About</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black">Careers</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black">Press</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-4">Community</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-black">Guidelines</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black">Featured</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black">Events</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-black">Help Center</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black">Safety</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black">Terms</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-black">Privacy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black">Terms</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black">Cookies</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t">
          <p className="text-gray-400 text-sm">© 2024 Rides. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
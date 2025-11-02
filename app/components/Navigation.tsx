import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="bg-green-800 text-white p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold">TATVA</h1>
          <span className="text-green-200">Nutrition Plans</span>
        </div>
        
        <div className="flex space-x-6">
          <Link 
            href="/" 
            className="hover:text-green-200 transition-colors"
          >
            View Plans
          </Link>
          <Link 
            href="/intake" 
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md transition-colors"
          >
            New Client Intake
          </Link>
        </div>
      </div>
    </nav>
  );
}
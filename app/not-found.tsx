import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-800 px-6">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-emerald-600">404</h1>
        <h2 className="text-2xl font-semibold text-black mt-4">
          Page Not Found
        </h2>
        <p className="text-gray-700 mt-2 text-lg">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link href="/">
            <Button className="bg-gradient-to-r from-emerald-500 to-emerald-700 hover:from-emerald-600 hover:to-emerald-800 group">
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Go Back Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

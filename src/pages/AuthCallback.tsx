import { useEffect } from "react";
import { supabase } from "@/lib/supabase";

const AuthCallback = () => {
  useEffect(() => {
    const handleAuthCallback = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session?.user) {
        window.open(`https://prestoliv-dashboard.vercel.app/at/profile?uid=${data.session.user.id}`, '_blank');
        window.location.href = '/';
      } else {
        window.location.href = '/';
      }
    };

    handleAuthCallback();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
        <p className="mt-4 text-gray-600">Redirecting to dashboard...</p>
      </div>
    </div>
  );
};

export default AuthCallback;

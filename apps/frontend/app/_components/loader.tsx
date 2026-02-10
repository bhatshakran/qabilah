import { Loader2 } from "lucide-react";

export default function LoadingPage() {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Loader2 className="animate-spin" />
    </div>
  );
}

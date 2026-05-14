import { Loader2 } from 'lucide-react';

type LoaderProps = {
  className?: string;
};

const Loader = ({ className = "" }: LoaderProps) => {
  return (
    <div className={`flex items-center justify-center min-h-[400px] w-full ${className}`}>
      <div className="flex flex-col items-center gap-3">
        <Loader2 size={40} className="animate-spin text-[#2D335E]" />
        <p className="text-sm font-semibold text-[#A3AED0] animate-pulse">Loading data...</p>
      </div>
    </div>
  );
};

export default Loader;

type SkeletonBaseProps = {
  className?: string;
};

type SkeletonTableProps = {
  rows?: number;
};

const SkeletonBase = ({ className = "" }: SkeletonBaseProps) => (
  <div className={`animate-pulse bg-slate-200 rounded-lg ${className}`} />
);

export const SkeletonStatCard = () => (
  <div className="bg-white p-5 rounded-sm border border-slate-100 shadow-sm flex justify-between h-[120px]">
    <div className="space-y-3 w-2/3">
      <SkeletonBase className="h-3 w-24" />
      <SkeletonBase className="h-8 w-16" />
      <SkeletonBase className="h-3 w-32" />
    </div>
    <SkeletonBase className="h-12 w-12 rounded-lg" />
  </div>
);

export const SkeletonChart = () => (
  <div className="bg-white p-4 md:p-6 rounded-sm border border-slate-100 shadow-sm min-w-0">
    <SkeletonBase className="h-4 w-40 mb-6" />
    <SkeletonBase className="h-48 md:h-64 w-full" />
  </div>
);

export const SkeletonTable = ({ rows = 5 }: SkeletonTableProps) => (
  <div className="bg-white rounded-sm border border-slate-100 shadow-sm overflow-hidden">
    <div className="p-4 md:p-5 flex justify-between items-center border-b border-slate-50">
      <SkeletonBase className="h-4 w-32" />
      <SkeletonBase className="h-8 w-20" />
    </div>
    <div className="p-4 md:p-8 space-y-4">
      <div className="flex gap-4 border-b border-slate-50 pb-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <SkeletonBase key={i} className={`h-3 flex-1 ${i > 3 ? 'hidden md:block' : ''}`} />
        ))}
      </div>
      {[...Array(rows)].map((_, i) => (
        <div key={i} className="flex gap-4 py-2">
          {[1, 2, 3, 4, 5].map((j) => (
            <SkeletonBase key={j} className={`h-4 flex-1 ${j > 3 ? 'hidden md:block' : ''}`} />
          ))}
        </div>
      ))}
    </div>
  </div>
);

const DashboardSkeleton = () => {
  return (
    <div className="space-y-8">
      {/* Title Bar Skeleton */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-6">
        <div className="space-y-2">
          <SkeletonBase className="h-8 w-48" />
          <SkeletonBase className="h-4 w-64" />
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <SkeletonBase className="h-10 w-24" />
          <SkeletonBase className="h-10 w-24" />
        </div>
      </div>

      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {[1, 2, 3, 4].map((i) => (
          <SkeletonStatCard key={i} />
        ))}
      </div>

      {/* Charts Row Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <SkeletonChart />
        <SkeletonChart />
      </div>

      {/* Table Skeleton */}
      <SkeletonTable />
    </div>
  );
};

export default DashboardSkeleton;

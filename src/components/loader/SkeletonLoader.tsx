const SkeletonLoader = () => {
    return (
      <div className="animate-pulse space-y-4 p-4">
        <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
        <div className="h-4 bg-gray-200 rounded w-2/4 mx-auto"></div>
        <div className="h-4 bg-gray-200 rounded w-full mx-auto"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6 mx-auto"></div>
        <div className="h-4 bg-gray-200 rounded w-4/6 mx-auto"></div>
      </div>
    );
  };
  
  export default SkeletonLoader;
  
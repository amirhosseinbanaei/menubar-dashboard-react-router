import React, { useState } from 'react';
import { Skeleton } from '@/common/components/ui/skeleton';

interface WithImageLoadingProps {
  className?: string;
  skeletonClassName?: string;
  alt?: string;
  src: string;
}

export const withImageLoading = <P extends WithImageLoadingProps>(
  WrappedComponent: React.ComponentType<P>
) => {
  return function WithImageLoadingComponent(props: P) {
    const [isLoading, setIsLoading] = useState(true);

    const handleImageLoad = () => {
      setIsLoading(false);
    };

    return (
      <div className="relative">
        {isLoading && (
          <Skeleton 
            className={props.skeletonClassName || "w-full h-full"} 
          />
        )}
        <WrappedComponent
          {...props}
          onLoad={handleImageLoad}
          style={{ 
            display: isLoading ? 'none' : 'block'
          }}
        />
      </div>
    );
  };
}; 
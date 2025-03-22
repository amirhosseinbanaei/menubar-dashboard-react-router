import React from 'react';
import { withImageLoading } from '../hoc/withImageLoading';

interface ImageWithLoadingProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  skeletonClassName?: string;
}

const ImageWithLoading: React.FC<ImageWithLoadingProps> = (props) => {
  return <img {...props} />;
};

export default withImageLoading(ImageWithLoading); 
import React from 'react';
import Config from '../../config';

interface IOwnProps extends Partial<React.ImgHTMLAttributes<any>> {
  className?: string;
  src: string;
  fallbackSrc?: string;
}

const ImageSafe: React.FC<IOwnProps> = (props) => {
  const DEFAULT_FALLBACK_IMAGE_SRC = `${Config.basePath}/images/no-photo.webp`;
  const {
    className,
    src: topSrc = DEFAULT_FALLBACK_IMAGE_SRC,
    fallbackSrc = DEFAULT_FALLBACK_IMAGE_SRC,
    ...restProps
  } = props;
  const [src, setSrc] = React.useState(topSrc);

  const errorHandler = React.useCallback(() => {
    setSrc(fallbackSrc);
  }, [fallbackSrc]);

  return (
    <img
      {...restProps}
      className={className}
      src={src}
      onError={errorHandler}
    />
  );
};

export default ImageSafe;

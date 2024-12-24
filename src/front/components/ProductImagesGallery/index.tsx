import React from 'react';
import clsx from 'clsx';
import memoize from 'fast-memoize';
import ImageSafe from '../ImageSafe';
import { useDeviceInfo } from '../../hooks/device';

import { TViewMode } from '../../types/view';

import ProductImageScaleAndPreview from './components/ProductImageScaleAndPreview';

import styles from './ProductImagesGallery.module.scss';

interface IOwnProps {
  images: string[];
  viewMode?: TViewMode;
}
const ProductImagesGallery: React.FC<IOwnProps> = ({
  images,
  viewMode = 'desktop',
}) => {
  const { isMobile } = useDeviceInfo();

  const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);

  const handleSelectImage = React.useMemo(() => {
    return memoize((index: number) => () => {
      setSelectedImageIndex(index);
    });
  }, [setSelectedImageIndex]);

  return (
    <div
      className={clsx(styles.Wrapper, { [styles.GalleryMobileView]: isMobile })}
    >
      {isMobile ? (
        <div className={styles.SelectedImage}>
          <ImageSafe src={images[selectedImageIndex]} />
        </div>
      ) : (
        <ProductImageScaleAndPreview
          imageSrc={images[selectedImageIndex]}
          className={styles.SelectedImage}
          classNameZoomed={styles.ZoomedImage}
        />
      )}

      {images.length > 1 && (
        <div className={styles.ImagesList}>
          {images.map((image, index) => (
            <div
              key={index}
              className={clsx(styles.Image, {
                [styles.Selected]: index === selectedImageIndex,
              })}
              onClick={handleSelectImage(index)}
            >
              <ImageSafe src={image} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImagesGallery;

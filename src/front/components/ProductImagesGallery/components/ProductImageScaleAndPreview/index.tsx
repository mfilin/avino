import React from 'react';
import ImageSafe from '../../../ImageSafe';

interface IOwnProps {
  imageSrc: string;
  className: string;
  classNameZoomed: string;
}

const ProductImageScaleAndPreview: React.FC<IOwnProps> = (props) => {
  const { className, classNameZoomed, imageSrc } = props;
  const imageRef: React.Ref<HTMLDivElement> =
    React.useRef<HTMLDivElement>(null);
  const [layoutState, setLayoutState] = React.useState(null);

  React.useLayoutEffect(() => {
    // imageRef.current can be undefined when first render has been ended
    // so we need to reset component once again when layout ready and
    // then, imageRef.current will be stored correctly
    setLayoutState(Date.now());
  }, [imageSrc]);

  const moveHandler = React.useMemo(() => {
    if (imageRef.current) {
      imageRef.current.style.backgroundImage = `url("${imageSrc}")`;
      imageRef.current.style.backgroundPosition = `0% 0%`;
    }

    return (e: React.MouseEvent<HTMLImageElement>) => {
      const { left, top, width, height } = (
        e.target as HTMLElement
      ).getBoundingClientRect();

      const scrollTop = e.clientY - e.pageY;

      const x = ((e.pageX - left) / width) * 100;
      const y = ((e.pageY - top + scrollTop) / height) * 100;

      if (imageRef.current) {
        imageRef.current.style.backgroundPosition = `${x}% ${y}%`;
      }
    };
  }, [imageRef.current, layoutState, imageSrc]);

  return (
    <div className={className}>
      <ImageSafe src={imageSrc} onMouseMove={moveHandler} />
      {imageSrc ? <div className={classNameZoomed} ref={imageRef} /> : null}
    </div>
  );
};

export default ProductImageScaleAndPreview;

import { useState, useEffect } from 'react';
import type { ImgHTMLAttributes } from 'react';

interface ImageWithFallbackProps extends ImgHTMLAttributes<HTMLImageElement> {
  sources: string[];
  fallbackText?: string;
  onAllFailed?: () => void;
}

export default function ImageWithFallback({ sources, fallbackText, onAllFailed, ...props }: ImageWithFallbackProps) {
  const [index, setIndex] = useState(0);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setIndex(0);
    setFailed(false);
  }, [sources.join(',')]);

  if (failed && fallbackText) {
    return <span className={props.className} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{fallbackText}</span>;
  }

  if (failed) {
    return <div className={props.className} style={{ background: 'transparent' }} />;
  }

  return (
    <img
      {...props}
      src={sources[index]}
      onError={() => {
        if (index < sources.length - 1) {
          setIndex((prev) => prev + 1);
        } else {
          setFailed(true);
          onAllFailed?.();
        }
      }}
    />
  );
}

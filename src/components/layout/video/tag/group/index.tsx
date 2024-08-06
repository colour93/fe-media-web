import { ITag } from '../../../../../typings/tag.ts';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { VideoTag } from '../index.tsx';

interface IVideoTagGroupProps {
  tags: ITag[];
  onClick?: (tag: ITag) => void | Promise<void>;
  size?: 'sm' | 'md' | 'lg';
  maxWidth?: number;
}

export const VideoTagGroup = forwardRef<HTMLDivElement, IVideoTagGroupProps>(({
                                                                                tags,
                                                                                maxWidth = 400,
                                                                                ...rest
                                                                              }, ref) => {
  const [visibleTags, setVisibleTags] = useState<ITag[]>([]);
  const [hiddenCount, setHiddenCount] = useState(0);
  const tagRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const updateVisibleTags = () => {

      const containerWidth = maxWidth;
      let totalWidth = 0;
      let visibleTagsCount = 0;

      for (let i = 0; i < tags.length; i++) {
        const tagWidth = tagRefs.current[i]?.offsetWidth || 0;
        totalWidth += tagWidth;

        if (totalWidth > containerWidth) {
          break;
        }

        visibleTagsCount++;
      }

      setVisibleTags(tags.slice(0, visibleTagsCount));
      setHiddenCount(tags.length - visibleTagsCount);
    };

    updateVisibleTags();

    window.addEventListener('resize', updateVisibleTags);
    return () => window.removeEventListener('resize', updateVisibleTags);
  }, [tags, maxWidth]);

  return (
    <div ref={ref} style={{ maxWidth }} className="overflow-hidden whitespace-nowrap flex gap-1">
      {visibleTags.map((tag, index) => (
        <VideoTag tag={tag} ref={(el) => (tagRefs.current[index] = el)} key={tag.cid} {...rest} />
      ))}
      {hiddenCount > 0 && <span>+{hiddenCount}</span>}
    </div>
  );
});
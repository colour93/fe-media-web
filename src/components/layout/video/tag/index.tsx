import { Tag } from '@chakra-ui/react';
import { forwardRef } from 'react';
import { ITag } from '../../../../typings/tag.ts';

interface IVideoTagProps {
  tag: ITag;
  onClick?: (tag: ITag) => void | Promise<void>;
  size?: 'sm' | 'md' | 'lg';
}

export const VideoTag = forwardRef<HTMLSpanElement, IVideoTagProps>(({
                                                                       tag,
                                                                       onClick,
                                                                       size = 'md'
                                                                     }, ref) => {
  return <Tag ref={ref} key={tag.cid} colorScheme={tag.cate?.color} size={size} cursor={onClick ? 'pointer' : undefined}
              onClick={() => {
                onClick?.(tag);
              }}>
    {`${tag.cate && tag.cate.displayName + '：'}${tag.displayName}`}
  </Tag>;
});
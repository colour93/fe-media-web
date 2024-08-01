import { Tag } from '@chakra-ui/react';
import React from 'react';
import { ITag } from '../../../../typings/tag.ts';

interface IVideoTagProps {
  tag: ITag;
  onClick?: (tag: ITag) => void | Promise<void>;
  size?: 'sm' | 'md' | 'lg';
}

export const VideoTag: React.FC<IVideoTagProps> = ({ tag, onClick, size = 'md' }) => {
  return <Tag key={tag.cid} colorScheme={tag.cate?.color} size={size} cursor="pointer" onClick={() => {
    onClick?.(tag);
  }}>
    {`${tag.cate && tag.cate.displayName + '：'}${tag.displayName}`}
  </Tag>;
};
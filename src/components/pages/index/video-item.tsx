import React from 'react';
import { IVideo } from '../../../typings/video';
import { Box, Icon, Image } from '@chakra-ui/react';
import { Clock, File } from 'lucide-react';
import { formatVideoDuration } from '../../../utils/time';
import { filesize } from 'filesize';

interface IVideoItemProps {
  video: IVideo;
}
export const VideoItem: React.FC<IVideoItemProps> = ({ video }) => {
  return (
    <Box className="border-[1px] rounded-md overflow-hidden w-auto">
      <div className="relative">
        <div className="aspect-video overflow-hidden bg-[--img-bg] rounded-md z-10">
          <Image
            className="object-center object-contain w-full h-full"
            src={`/api/v1/video/${video.nid}/thumb`}
            alt={`${video.title}的视频缩略图`}
          />
        </div>
        <div className="absolute top-0 left-0 z-20 w-full h-full flex flex-col justify-end">
          <div className="img-mask text-white w-full py-1 px-2 items-center justify-between flex">
            <div className="gap-1 flex items-center">
              <Icon as={File} />
              <span>{filesize(video.size)}</span>
            </div>
            <div className="gap-1 flex items-center">
              <Icon as={Clock} />
              <span>{formatVideoDuration(video.duration)}</span>
            </div>
          </div>
        </div>
      </div>

      <Box className="p-2 flex flex-col">
        <span className="line-clamp-1">{video.title}</span>
        <span className="line-clamp-2 h-[24px] text-sm text-opacity-70">{video.description}</span>
      </Box>
    </Box>
  );
};

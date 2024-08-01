import React, { useEffect, useState } from 'react';
import { Icon, IconButton, Popover, PopoverBody, PopoverContent, PopoverTrigger, useToast } from '@chakra-ui/react';
import { Plus } from 'lucide-react';
import { Virtuoso } from 'react-virtuoso';
import { getTagList } from '../../../../../apis/tag.ts';
import { ITag } from '../../../../../typings/tag.ts';
import { VideoTag } from '../index.tsx';
import { IVideo } from '../../../../../typings/video.ts';
import { addTagToVideo } from '../../../../../apis/manage/video.ts';

interface IVideoTagAddButtonProps {
  video: IVideo;
  onFinish?: () => void | Promise<void>;
}

export const VideoTagAddButton: React.FC<IVideoTagAddButtonProps> = ({ video, onFinish }) => {

  const toast = useToast();

  const [tagListData, setTagListData] = useState<ITag[]>([]);

  useEffect(() => {
    getTagList().then(({ data }) => {
      setTagListData(data);
    });
  }, []);

  const handleAddTagToVideo = async (cid: number) => {
    toast.promise(addTagToVideo(video.nid, cid), {
      success: (resp) => {
        onFinish?.();
        return resp.code === 304 ? { title: '标签已存在' } : { title: '添加成功' };
      },
      error: { title: '添加失败' },
      loading: { title: '添加中...' }
    });
  };

  return <Popover>
    <PopoverTrigger>
      <IconButton aria-label="增加标签" icon={<Icon as={Plus} />} size="sm" isRound />
    </PopoverTrigger>
    <PopoverContent>
      <PopoverBody>
        <Virtuoso
          style={{ height: 150 }}
          data={tagListData}
          itemContent={(_, tag) => (
            <div key={tag.cid} className="p-1">
              <VideoTag tag={tag} onClick={() => {
                void handleAddTagToVideo(tag.cid);
              }} />
            </div>
          )}
        />
      </PopoverBody>
    </PopoverContent>
  </Popover>;
};
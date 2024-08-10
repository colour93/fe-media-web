import { createLazyFileRoute, useParams } from '@tanstack/react-router';
import React, { useMemo, useState } from 'react';
import DPlayer from 'react-dplayer';
import { IVideo } from '../../typings/video';
import { getVideoDataByNid } from '../../apis/video';
import { Heading, Skeleton, SkeletonText, Text } from '@chakra-ui/react';
import { VideoTag } from '../../components/layout/video/tag';
import { VideoTagAddButton } from '../../components/layout/video/tag/add';

export const VideoPage: React.FC = () => {
  const { videoNid } = useParams({ from: '/video/$videoNid' });

  const [videoData, setVideoData] = useState<IVideo | undefined>();

  const fetchData = () => {
    getVideoDataByNid(videoNid).then(({ data }) => {
      setVideoData(data);
    });
  };

  useMemo(() => {
    if (videoNid && videoNid.trim() != '') fetchData();
  }, [videoNid]);

  return (
    <div>
      <div>
        <div className="flex flex-col gap-4">
          <Skeleton
            className="w-[567px] h-[319px] xl:w-[960px] xl:h-[540px] 2xl:w-[1280px] 2xl:h-[720px] shadow-md"
            fadeDuration={1}
            isLoaded={Boolean(videoData)}
          >
            <DPlayer
              className="w-[567px] h-[319px] xl:w-[960px] xl:h-[540px] 2xl:w-[1280px] 2xl:h-[720px] shadow-md"
              options={{
                video: { url: `/api/v1/video/${videoData?.nid}/file` },
              }}
            />
          </Skeleton>
          <div className="flex flex-col gap-2">
            <SkeletonText fadeDuration={1} isLoaded={Boolean(videoData)} noOfLines={3}>
              <Heading size="md">{videoData?.title}</Heading>
              <Text opacity={0.75}>
                {videoData?.description && videoData.description.trim() != '' ? videoData.description : '暂无描述'}
              </Text>
              <div className="flex gap-1 items-center">
                {videoData?.tags && videoData.tags?.length > 0 ? (
                  videoData.tags.map((tag) => <VideoTag tag={tag} key={tag.cid} />)
                ) : (
                  <Text className="text-sm mr-1" opacity={0.75}>
                    暂无标签
                  </Text>
                )}
                {videoData && <VideoTagAddButton video={videoData} onFinish={() => fetchData()} />}
              </div>
            </SkeletonText>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Route = createLazyFileRoute('/video/$videoNid')({
  component: VideoPage,
});

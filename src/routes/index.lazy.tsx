import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { IVideo } from '../typings/video';
import { getVideoList } from '../apis/video';
import { VideoItem } from '../components/pages/index/video-item';
import { Grid, GridItem, Skeleton, SkeletonText } from '@chakra-ui/react';

const Index = () => {
  const [videoList, setVideoList] = useState<IVideo[]>([]);

  useEffect(() => {
    getVideoList().then(({ data }) => {
      setVideoList(data);
    });
  }, []);

  const navigate = useNavigate();

  return (
    <div>
      <Grid className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {videoList.length > 0 ? videoList.map((video) => (
            <GridItem
              key={video.nid}
              className="cursor-pointer"
              onClick={() => {
                void navigate({
                  to: `/video/${video.nid}`
                });
              }}
            >
              <VideoItem video={video} />
            </GridItem>
          )) :
          Array.from({ length: 20 }, (_, i) => i).map((i) => <GridItem
            key={i}
          >
            <Skeleton h={32} />
            <SkeletonText noOfLines={3} />
          </GridItem>)
        }
      </Grid>
    </div>
  );
};

export const Route = createLazyFileRoute('/')({
  component: Index
});

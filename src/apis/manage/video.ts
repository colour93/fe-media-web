import axiosInstance from '../../utils/axiosInstance.ts';
import { IBaseResponse } from '../../typings/network.ts';
import { IVideo } from '../../typings/video.ts';

export const addTagToVideo = async (nid: string, cid: number) => {
  const { data } = await axiosInstance<IBaseResponse<IVideo>>({
    method: 'POST',
    url: `/manage/video/${nid}/tag`,
    data: {
      cid
    }
  });
  return data;
};
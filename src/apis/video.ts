import { IBaseResponse, IPaginationQuery, IPaginationResponse } from '../typings/network';
import { IVideo } from '../typings/video';
import axiosInstance from '../utils/axiosInstance';

export const getVideoList = async (params?: IPaginationQuery) => {
  const { data } = await axiosInstance.get<IPaginationResponse<IVideo>>(`/video`, { params });
  return data;
};

export const getVideoDataByNid = async (nid: string) => {
  const { data } = await axiosInstance.get<IBaseResponse<IVideo>>(`/video/${nid}`);
  return data;
};

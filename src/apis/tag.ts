import axiosInstance from '../utils/axiosInstance.ts';
import { IPaginationQuery, IPaginationResponse } from '../typings/network.ts';
import { ITag } from '../typings/tag.ts';

export const getTagList = async (params?: IPaginationQuery & { tagCateCid?: number }) => {
  const { data } = await axiosInstance.get<IPaginationResponse<ITag>>(`/tag`, { params });
  return data;
};

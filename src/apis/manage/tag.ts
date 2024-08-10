import axiosInstance from '../../utils/axiosInstance.ts';
import { IPaginationQuery, IPaginationResponse } from '../../typings/network.ts';
import { ITag } from '../../typings/tag.ts';

export const getManageTagList = async (params?: IPaginationQuery) => {
  const { data } = await axiosInstance.get<IPaginationResponse<ITag>>(`/manage/tag`, { params });
  return data;
};
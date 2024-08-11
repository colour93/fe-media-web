import axiosInstance from '../../utils/axiosInstance.ts';
import { IBaseResponse, IPaginationQuery, IPaginationResponse } from '../../typings/network.ts';
import { ITag } from '../../typings/tag.ts';
import { ICreateTag } from '../../form-schemas/manage/create-tag.ts';

export const getManageTagList = async (params?: IPaginationQuery & { tagCateCid?: number }) => {
  const { data } = await axiosInstance.get<IPaginationResponse<ITag>>(`/manage/tag`, { params });
  return data;
};

export const createTag = async (body: ICreateTag) => {
  const { data } = await axiosInstance.post<IBaseResponse<Omit<ITag, 'videos'>>>(`/manage/tag`, body);
  return data;
};

export const deleteTag = async (cid: number) => {
  const { data } = await axiosInstance.delete<IBaseResponse>(`/manage/tag/${cid}`);
  return data;
};

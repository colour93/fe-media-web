import { IBaseResponse, IPaginationQuery, IPaginationResponse } from '../../typings/network.ts';
import axiosInstance from '../../utils/axiosInstance.ts';
import { ITagCate } from '../../typings/tag-cate.ts';
import { ICreateTagCate } from '../../form-schemas/manage/create-tag-cate.ts';

export const getManageTagCateList = async (params?: IPaginationQuery) => {
  const { data } = await axiosInstance.get<IPaginationResponse<ITagCate>>(`/manage/tag/cate`, { params });
  return data;
};

export const createTagCate = async (body: ICreateTagCate) => {
  const { data } = await axiosInstance.post<IBaseResponse<Omit<ITagCate, 'tags'>>>(`/manage/tag/cate`, body);
  return data;
};

export const deleteTagCate = async (cid: number) => {
  const { data } = await axiosInstance.delete<IBaseResponse>(`/manage/tag/cate/${cid}`);
  return data;
};

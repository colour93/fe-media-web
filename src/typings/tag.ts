import { ITagCate } from "./tag-cate";
import { IVideo } from "./video";

export type ITag = {
  cid: number;
  name: string;
  displayName?: string;
  description?: string;
  cover?: string;
  cate?: ITagCate;
  videos?: IVideo[];
}
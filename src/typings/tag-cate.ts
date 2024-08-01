import { ITag } from "./tag";

export type ITagCate = {
  cid: number;
  name: string;
  displayName: string;
  color?: "whiteAlpha" | "blackAlpha" | "gray" | "red" | "orange" | "yellow" | "green" | "teal" | "blue" | "cyan" | "purple" | "pink";
  tags?: ITag[];
}
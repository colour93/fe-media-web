import { ITag } from "./tag";

export interface IVideo {
  cid: number;
  nid: string;
  basePath: string;
  relativePath: string;
  filename: string;
  title?: string;
  description?: string | null;
  size: number;
  duration: number;
  hash: string;
  createdAt: Date;
  modifiedAt: Date;
  importedAt: Date;
  updatedAt: Date;
  invalid: boolean;
  tags?: ITag[];
}


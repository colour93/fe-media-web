import { filesize } from "filesize";

export const formatVideoFileSize = (size: number) => filesize(size);
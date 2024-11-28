

export interface IUpdateNotePayload {
  id: string;
  name: string;
  tags: Array<string>;
  content: string;
  createTime: string;
  updateTime: string;
};
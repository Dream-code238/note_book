import React from 'react';

export interface INoteItem {
  id: string;
  name: string;
  tags: Array<string>;
  content: string;
  createTime: string;
  updateTime: string;
}

export interface ILabelItem {
  id: string;
  name: string;
  createTime: string;
  updateTime: string;
}

export const RootContext = React.createContext<
  Partial<{
    notes: Array<INoteItem>;
    labels: Array<ILabelItem>;
    updateNotesValue: (notes: Array<Partial<INoteItem>>) => void;
    updateLabelsValue: (labels: Array<Partial<ILabelItem>>) => void;
  }>
>({
  // 笔记列表
  notes: [],
  // 标签列表
  labels: [],
  updateNotesValue: newValue => {},
  updateLabelsValue: newValue => {}
});
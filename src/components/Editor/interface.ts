import { HTMLAttributes } from 'react';
import { AiEditorOptions  } from 'aieditor';

export type IEditorProps = Omit<HTMLAttributes<HTMLDivElement>, "onChange"> & {
  placeholder?: string;
  defaultValue?: string;
  value?: string;
  onChange?: (val: string) => void;
  options?: Omit<AiEditorOptions, "element">;
};
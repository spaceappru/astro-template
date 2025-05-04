import type { MaybeGetter } from "melt";

export interface DropzoneProps {
  name: string;
  multiple?: boolean;
  accept?: MaybeGetter<string | undefined>;
  maxSize?: MaybeGetter<number | undefined>;
  disabled?: MaybeGetter<boolean | undefined>;
  avoidDuplicates?: MaybeGetter<boolean | undefined>;
}

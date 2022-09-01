// Original file: generation.proto

import type { ClassifierCategory as _gooseai_ClassifierCategory, ClassifierCategory__Output as _gooseai_ClassifierCategory__Output } from '../gooseai/ClassifierCategory';
import type { Action as _gooseai_Action } from '../gooseai/Action';

export interface ClassifierParameters {
  'categories'?: (_gooseai_ClassifierCategory)[];
  'exceeds'?: (_gooseai_ClassifierCategory)[];
  'realizedAction'?: (_gooseai_Action | keyof typeof _gooseai_Action);
  '_realizedAction'?: "realizedAction";
}

export interface ClassifierParameters__Output {
  'categories': (_gooseai_ClassifierCategory__Output)[];
  'exceeds': (_gooseai_ClassifierCategory__Output)[];
  'realizedAction'?: (keyof typeof _gooseai_Action);
  '_realizedAction': "realizedAction";
}

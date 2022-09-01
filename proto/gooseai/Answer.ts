// Original file: generation.proto

import type { AnswerMeta as _gooseai_AnswerMeta, AnswerMeta__Output as _gooseai_AnswerMeta__Output } from '../gooseai/AnswerMeta';
import type { Artifact as _gooseai_Artifact, Artifact__Output as _gooseai_Artifact__Output } from '../gooseai/Artifact';
import type { Long } from '@grpc/proto-loader';

export interface Answer {
  'answerId'?: (string);
  'requestId'?: (string);
  'received'?: (number | string | Long);
  'created'?: (number | string | Long);
  'meta'?: (_gooseai_AnswerMeta | null);
  'artifacts'?: (_gooseai_Artifact)[];
  '_meta'?: "meta";
}

export interface Answer__Output {
  'answerId': (string);
  'requestId': (string);
  'received': (string);
  'created': (string);
  'meta'?: (_gooseai_AnswerMeta__Output | null);
  'artifacts': (_gooseai_Artifact__Output)[];
  '_meta': "meta";
}

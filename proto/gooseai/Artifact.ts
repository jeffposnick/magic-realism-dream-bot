// Original file: generation.proto

import type { ArtifactType as _gooseai_ArtifactType } from '../gooseai/ArtifactType';
import type { Tokens as _gooseai_Tokens, Tokens__Output as _gooseai_Tokens__Output } from '../gooseai/Tokens';
import type { FinishReason as _gooseai_FinishReason } from '../gooseai/FinishReason';
import type { ClassifierParameters as _gooseai_ClassifierParameters, ClassifierParameters__Output as _gooseai_ClassifierParameters__Output } from '../gooseai/ClassifierParameters';
import type { Long } from '@grpc/proto-loader';

export interface Artifact {
  'id'?: (number | string | Long);
  'type'?: (_gooseai_ArtifactType | keyof typeof _gooseai_ArtifactType);
  'mime'?: (string);
  'magic'?: (string);
  'binary'?: (Buffer | Uint8Array | string);
  'text'?: (string);
  'tokens'?: (_gooseai_Tokens | null);
  'index'?: (number);
  'finishReason'?: (_gooseai_FinishReason | keyof typeof _gooseai_FinishReason);
  'seed'?: (number);
  'classifier'?: (_gooseai_ClassifierParameters | null);
  '_magic'?: "magic";
  'data'?: "binary"|"text"|"tokens"|"classifier";
}

export interface Artifact__Output {
  'id': (string);
  'type': (keyof typeof _gooseai_ArtifactType);
  'mime': (string);
  'magic'?: (string);
  'binary'?: (Buffer);
  'text'?: (string);
  'tokens'?: (_gooseai_Tokens__Output | null);
  'index': (number);
  'finishReason': (keyof typeof _gooseai_FinishReason);
  'seed': (number);
  'classifier'?: (_gooseai_ClassifierParameters__Output | null);
  '_magic': "magic";
  'data': "binary"|"text"|"tokens"|"classifier";
}

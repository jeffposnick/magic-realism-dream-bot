// Original file: generation.proto

import type { PromptParameters as _gooseai_PromptParameters, PromptParameters__Output as _gooseai_PromptParameters__Output } from '../gooseai/PromptParameters';
import type { Tokens as _gooseai_Tokens, Tokens__Output as _gooseai_Tokens__Output } from '../gooseai/Tokens';
import type { Artifact as _gooseai_Artifact, Artifact__Output as _gooseai_Artifact__Output } from '../gooseai/Artifact';

export interface Prompt {
  'parameters'?: (_gooseai_PromptParameters | null);
  'text'?: (string);
  'tokens'?: (_gooseai_Tokens | null);
  'artifact'?: (_gooseai_Artifact | null);
  '_parameters'?: "parameters";
  'prompt'?: "text"|"tokens"|"artifact";
}

export interface Prompt__Output {
  'parameters'?: (_gooseai_PromptParameters__Output | null);
  'text'?: (string);
  'tokens'?: (_gooseai_Tokens__Output | null);
  'artifact'?: (_gooseai_Artifact__Output | null);
  '_parameters': "parameters";
  'prompt': "text"|"tokens"|"artifact";
}

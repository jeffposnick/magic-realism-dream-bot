// Original file: generation.proto

import type { SamplerParameters as _gooseai_SamplerParameters, SamplerParameters__Output as _gooseai_SamplerParameters__Output } from '../gooseai/SamplerParameters';

export interface StepParameter {
  'scaledStep'?: (number | string);
  'sampler'?: (_gooseai_SamplerParameters | null);
  '_sampler'?: "sampler";
}

export interface StepParameter__Output {
  'scaledStep': (number);
  'sampler'?: (_gooseai_SamplerParameters__Output | null);
  '_sampler': "sampler";
}

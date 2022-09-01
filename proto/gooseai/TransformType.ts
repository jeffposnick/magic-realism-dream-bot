// Original file: generation.proto

import type { DiffusionSampler as _gooseai_DiffusionSampler } from '../gooseai/DiffusionSampler';
import type { Upscaler as _gooseai_Upscaler } from '../gooseai/Upscaler';

export interface TransformType {
  'diffusion'?: (_gooseai_DiffusionSampler | keyof typeof _gooseai_DiffusionSampler);
  'upscaler'?: (_gooseai_Upscaler | keyof typeof _gooseai_Upscaler);
  'type'?: "diffusion"|"upscaler";
}

export interface TransformType__Output {
  'diffusion'?: (keyof typeof _gooseai_DiffusionSampler);
  'upscaler'?: (keyof typeof _gooseai_Upscaler);
  'type': "diffusion"|"upscaler";
}

// Original file: generation.proto

export enum DiffusionSampler {
  SAMPLER_DDIM = 0,
  SAMPLER_DDPM = 1,
  SAMPLER_K_EULER = 2,
  SAMPLER_K_EULER_ANCESTRAL = 3,
  SAMPLER_K_HEUN = 4,
  SAMPLER_K_DPM_2 = 5,
  SAMPLER_K_DPM_2_ANCESTRAL = 6,
  SAMPLER_K_LMS = 7,
}

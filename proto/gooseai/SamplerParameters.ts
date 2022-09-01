// Original file: generation.proto

import type { Long } from '@grpc/proto-loader';

export interface SamplerParameters {
  'eta'?: (number | string);
  'samplingSteps'?: (number | string | Long);
  'latentChannels'?: (number | string | Long);
  'downsamplingFactor'?: (number | string | Long);
  'cfgScale'?: (number | string);
  '_eta'?: "eta";
  '_samplingSteps'?: "samplingSteps";
  '_latentChannels'?: "latentChannels";
  '_downsamplingFactor'?: "downsamplingFactor";
  '_cfgScale'?: "cfgScale";
}

export interface SamplerParameters__Output {
  'eta'?: (number);
  'samplingSteps'?: (string);
  'latentChannels'?: (string);
  'downsamplingFactor'?: (string);
  'cfgScale'?: (number);
  '_eta': "eta";
  '_samplingSteps': "samplingSteps";
  '_latentChannels': "latentChannels";
  '_downsamplingFactor': "downsamplingFactor";
  '_cfgScale': "cfgScale";
}

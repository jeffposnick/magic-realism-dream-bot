// Original file: generation.proto

import type { TransformType as _gooseai_TransformType, TransformType__Output as _gooseai_TransformType__Output } from '../gooseai/TransformType';
import type { StepParameter as _gooseai_StepParameter, StepParameter__Output as _gooseai_StepParameter__Output } from '../gooseai/StepParameter';
import type { Long } from '@grpc/proto-loader';

export interface ImageParameters {
  'height'?: (number | string | Long);
  'width'?: (number | string | Long);
  'seed'?: (number)[];
  'samples'?: (number | string | Long);
  'steps'?: (number | string | Long);
  'transform'?: (_gooseai_TransformType | null);
  'parameters'?: (_gooseai_StepParameter)[];
  '_height'?: "height";
  '_width'?: "width";
  '_samples'?: "samples";
  '_steps'?: "steps";
  '_transform'?: "transform";
}

export interface ImageParameters__Output {
  'height'?: (string);
  'width'?: (string);
  'seed': (number)[];
  'samples'?: (string);
  'steps'?: (string);
  'transform'?: (_gooseai_TransformType__Output | null);
  'parameters': (_gooseai_StepParameter__Output)[];
  '_height': "height";
  '_width': "width";
  '_samples': "samples";
  '_steps': "steps";
  '_transform': "transform";
}

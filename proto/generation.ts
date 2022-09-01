import type * as grpc from '@grpc/grpc-js';
import type { EnumTypeDefinition, MessageTypeDefinition } from '@grpc/proto-loader';

import type { GenerationServiceClient as _gooseai_GenerationServiceClient, GenerationServiceDefinition as _gooseai_GenerationServiceDefinition } from './gooseai/GenerationService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  gooseai: {
    Action: EnumTypeDefinition
    Answer: MessageTypeDefinition
    AnswerMeta: MessageTypeDefinition
    Artifact: MessageTypeDefinition
    ArtifactType: EnumTypeDefinition
    ClassifierCategory: MessageTypeDefinition
    ClassifierConcept: MessageTypeDefinition
    ClassifierMode: EnumTypeDefinition
    ClassifierParameters: MessageTypeDefinition
    ConditionerParameters: MessageTypeDefinition
    DiffusionSampler: EnumTypeDefinition
    FinishReason: EnumTypeDefinition
    GenerationService: SubtypeConstructor<typeof grpc.Client, _gooseai_GenerationServiceClient> & { service: _gooseai_GenerationServiceDefinition }
    ImageParameters: MessageTypeDefinition
    Prompt: MessageTypeDefinition
    PromptParameters: MessageTypeDefinition
    Request: MessageTypeDefinition
    SamplerParameters: MessageTypeDefinition
    StepParameter: MessageTypeDefinition
    Token: MessageTypeDefinition
    Tokens: MessageTypeDefinition
    TransformType: MessageTypeDefinition
    Upscaler: EnumTypeDefinition
  }
}


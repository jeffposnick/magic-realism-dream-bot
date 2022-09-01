// Original file: generation.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { Answer as _gooseai_Answer, Answer__Output as _gooseai_Answer__Output } from '../gooseai/Answer';
import type { Request as _gooseai_Request, Request__Output as _gooseai_Request__Output } from '../gooseai/Request';

export interface GenerationServiceClient extends grpc.Client {
  Generate(argument: _gooseai_Request, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_gooseai_Answer__Output>;
  Generate(argument: _gooseai_Request, options?: grpc.CallOptions): grpc.ClientReadableStream<_gooseai_Answer__Output>;
  generate(argument: _gooseai_Request, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_gooseai_Answer__Output>;
  generate(argument: _gooseai_Request, options?: grpc.CallOptions): grpc.ClientReadableStream<_gooseai_Answer__Output>;
  
}

export interface GenerationServiceHandlers extends grpc.UntypedServiceImplementation {
  Generate: grpc.handleServerStreamingCall<_gooseai_Request__Output, _gooseai_Answer>;
  
}

export interface GenerationServiceDefinition extends grpc.ServiceDefinition {
  Generate: MethodDefinition<_gooseai_Request, _gooseai_Answer, _gooseai_Request__Output, _gooseai_Answer__Output>
}

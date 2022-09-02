The [generation.proto](./generation.proto) file comes from https://github.com/Stability-AI/stability-sdk/blob/fd78f4d2a74964c58eb6d7e874856b49e7fcc911/src/proto/generation.proto

The TypeScript definitions were generated via

```sh
$ npx proto-loader-gen-types --longs=String --enums=String --defaults --oneofs --grpcLib=@grpc/grpc-js --outDir=proto/ generation.proto
```

See [stable-diffusion.ts](../src/stable-diffusion.ts) for an example of using these definitions in a TypeScript client.

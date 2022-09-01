import {Answer__Output} from './proto/gooseai/Answer';
import {ProtoGrpcType} from './proto/generation';
import {randomUUID} from 'crypto';
import {temporaryFile} from 'tempy';
import {writeFileSync} from 'fs';
import grpc from '@grpc/grpc-js';
import mime from 'mime-types';
import protoLoader from '@grpc/proto-loader';

const ADDRESS = 'grpc.stability.ai:443';
const HEIGHT = 512;
const MAX_RANDOM_SEED = 4294967295;
const PROTO_FILE = './proto/generation.proto';
const WIDTH = 512;

const packageDefinition = protoLoader.loadSync(PROTO_FILE, {
	keepCase: false,
	longs: String,
	enums: String,
	defaults: true,
	oneofs: true,
});

const pkg = grpc.loadPackageDefinition(
	packageDefinition,
) as unknown as ProtoGrpcType;

const callCredentials = grpc.credentials.createFromMetadataGenerator(
	(_, callback) => {
		const metadata = new grpc.Metadata();
		metadata.add('authorization', `Bearer ${process.env.KEY}`);
		callback(null, metadata);
	},
);
const channelCredentials = grpc.credentials.combineChannelCredentials(
	grpc.credentials.createSsl(),
	callCredentials,
);

const serviceClient = new pkg.gooseai.GenerationService(
	ADDRESS,
	channelCredentials,
);

const stream = serviceClient.generate({
	image: {
		height: HEIGHT,
		parameters: [{scaledStep: 0, sampler: {cfgScale: 7.0}}],
		samples: 1,
		seed: [Math.floor(Math.random() * MAX_RANDOM_SEED)],
		steps: 50,
		transform: {diffusion: 'SAMPLER_K_LMS'},
		width: WIDTH,
	},
	engineId: 'stable-diffusion-v1',
	prompt: [{text: 'A ballon floating in the sky.'}],
	requestId: randomUUID(),
});

stream.on('data', (response: Answer__Output) => {
	for (const artifact of response.artifacts) {
		if (artifact.type === 'ARTIFACT_IMAGE' && artifact.data === 'binary') {
			const extension = mime.extension(artifact.mime);
			if (extension) {
				const filename = temporaryFile({extension});
				writeFileSync(filename, artifact.binary!);
				console.log(`Wrote ${filename}`);
			}
		}
	}
});

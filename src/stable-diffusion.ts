import {Answer__Output} from '../proto/gooseai/Answer';
import {ProtoGrpcType} from '../proto/generation';
import {randomUUID} from 'crypto';
import * as dotenv from 'dotenv';
import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';

dotenv.config();

const ADDRESS = 'grpc.stability.ai:443';
const HEIGHT = 512;
const MAX_RANDOM_SEED = 4294967295;
const PROTO_FILE = './proto/generation.proto';
const STYLES = [
	'Futurism',
	'Latin American folk art',
	'Man Ray',
	'New Objectivist',
	'Outsider art',
	'Salvador Dali',
	'Soviet Futurism',
];
const WIDTH = 512;

interface GenerateImageReturn {
	imageBuffer: Buffer;
	mimeType: string;
	prompt: string;
}

function generateFullPrompt(prompt: string) {
	const index = Math.floor(Math.random() * STYLES.length);
	const style = STYLES[index];
	return `A ${style} painting of ${prompt}`;
}

function getServiceClient() {
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
			metadata.add(
				'authorization',
				`Bearer ${process.env.STABLE_DIFFUSION_KEY}`,
			);
			callback(null, metadata);
		},
	);

	const channelCredentials = grpc.credentials.combineChannelCredentials(
		grpc.credentials.createSsl(),
		callCredentials,
	);

	return new pkg.gooseai.GenerationService(ADDRESS, channelCredentials);
}

export function generateImage(partialPrompt: string) {
	const serviceClient = getServiceClient();
	const prompt = generateFullPrompt(partialPrompt);

	const stream = serviceClient.generate({
		classifier: {},
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
		prompt: [{text: prompt}],
		requestId: randomUUID(),
	});

	return new Promise<GenerateImageReturn>((resolve, reject) => {
		stream.on('data', (response: Answer__Output) => {
			for (const artifact of response.artifacts) {
				if (artifact.type === 'ARTIFACT_IMAGE' && artifact.data === 'binary') {
					return resolve({
						prompt,
						imageBuffer: artifact.binary!,
						mimeType: artifact.mime,
					});
				}

				if (artifact.text) {
					return reject(`${artifact.finishReason}: ${artifact.text}`);
				}
			}
		});

		stream.on('error', (err) => reject(err));
	});
}

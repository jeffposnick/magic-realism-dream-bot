import {Answer__Output} from '../proto/gooseai/Answer';
import {ProtoGrpcType} from '../proto/generation';
import {randomUUID} from 'crypto';
import * as dotenv from 'dotenv';
import grpc from '@grpc/grpc-js';
import path from 'path';
import protoLoader from '@grpc/proto-loader';
import {
	ADDRESS,
	CFG_SCALE,
	DIFFUSION,
	ENGINE_ID,
	HEIGHT,
	MAX_RANDOM_SEED,
	SAMPLES,
	SCALED_STEP,
	STEPS,
	STYLES,
	WIDTH,
} from './constants';

dotenv.config();

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
	const packageDefinition = protoLoader.loadSync(
		path.join('proto', 'generation.proto'),
		{
			keepCase: false,
			longs: String,
			enums: String,
			defaults: true,
			oneofs: true,
		},
	);

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
		image: {
			height: HEIGHT,
			parameters: [{scaledStep: SCALED_STEP, sampler: {cfgScale: CFG_SCALE}}],
			samples: SAMPLES,
			seed: [Math.floor(Math.random() * MAX_RANDOM_SEED)],
			steps: STEPS,
			transform: {diffusion: DIFFUSION},
			width: WIDTH,
		},
		engineId: ENGINE_ID,
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

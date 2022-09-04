import log from 'loglevel';
import prefix from 'loglevel-plugin-prefix';

import {getTweetIfNew, sendTweet} from './twitter';
import {generateImage} from './stable-diffusion';

prefix.reg(log);
prefix.apply(log);
log.enableAll();

log.info(`Starting up...`);
try {
	const latestTweet = await getTweetIfNew();
	if (latestTweet) {
		log.info(`Latest tweet: ${latestTweet.full_text}`);
		const {imageBuffer, mimeType, prompt} = await generateImage(
			latestTweet.full_text!,
		);
		log.info(`Generated image from prompt: ${prompt}.`);
		await sendTweet(imageBuffer, mimeType, latestTweet, prompt);
		log.info(`Posted tweet.`);
	} else {
		log.info(`Latest tweet has already been processed.`);
	}
} catch (err: unknown) {
	log.error(err);
}
log.info(`...all done.`);

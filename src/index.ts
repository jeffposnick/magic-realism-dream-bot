import {getTweetIfNew, sendTweet} from './twitter';
import {generateImage} from './stable-diffusion';

function log(...messages: Array<unknown>) {
	const time = new Date().toLocaleTimeString('en-US', {
		timeZone: 'America/New_York',
	});
	console.log(`[${time}]`, ...messages);
}

async function main() {
	log(`Starting up...`);
	const [latestTweet, botId] = await getTweetIfNew();
	if (latestTweet) {
		log(`Latest tweet: ${latestTweet.full_text}`);
		const {imageBuffer, mimeType, prompt} = await generateImage(
			latestTweet.full_text!,
		);
		log(`Generated image from prompt: ${prompt}.`);
		await sendTweet(imageBuffer, mimeType, latestTweet, prompt, botId);
		log(`Posted and retweeted the response.`);
	} else {
		log(`Latest tweet has already been processed.`);
	}
	log(`...all done.`);
}

main().catch((err) => log(err));

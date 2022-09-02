import {TwitterApi} from 'twitter-api-v2';
import * as dotenv from 'dotenv';

dotenv.config();

const MAGICAL_REALISM_TWITTER_ID = '3701125272';
const TWEET_URL_PREFIX = 'https://twitter.com/MagicRealismBot/status/';

const client = new TwitterApi({
	accessSecret: process.env.TWITTER_ACCESS_SECRET,
	accessToken: process.env.TWITTER_ACCESS_TOKEN,
	appKey: process.env.TWITTER_APP_KEY!,
	appSecret: process.env.TWITTER_APP_SECRET!,
}).readWrite;

function tweetIdToURL(id: string) {
	return TWEET_URL_PREFIX + id;
}

export async function getTweetIfNew() {
	const [latestMagicalRealismTweet] = await client.v1.userTimeline(
		MAGICAL_REALISM_TWITTER_ID,
	);
	const magicalRealismTweetURL = tweetIdToURL(latestMagicalRealismTweet.id_str);

	const bot = await client.currentUser();
	const [latestBotTweet] = await client.v1.userTimeline(bot.id_str);
	const urls = latestBotTweet.entities?.urls;

	if (urls?.length) {
		const latestBotTweetReferenceURL = urls[0].expanded_url;
		if (latestBotTweetReferenceURL === magicalRealismTweetURL) {
			return null;
		}
	}

	return latestMagicalRealismTweet;
}

export async function sendTweet(
	imageBuffer: Buffer,
	mimeType: string,
	tweetId: string,
	prompt: string,
) {
	const mediaId = await client.v1.uploadMedia(imageBuffer, {mimeType});
	await client.v1.createMediaMetadata(mediaId, {alt_text: {text: prompt}});
	await client.v1.tweet(tweetIdToURL(tweetId), {
		media_ids: mediaId,
	});
}

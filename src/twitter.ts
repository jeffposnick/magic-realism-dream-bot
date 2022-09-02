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

export async function getLatestTweet() {
	const [latestTweet] = await client.v1.userTimeline(
		MAGICAL_REALISM_TWITTER_ID,
	);
	return latestTweet;
}

export async function sendTweet(
	imageBuffer: Buffer,
	mimeType: string,
	tweetId: string,
) {
	const mediaId = await client.v1.uploadMedia(imageBuffer, {mimeType});
	await client.v1.tweet(TWEET_URL_PREFIX + tweetId, {
		media_ids: mediaId,
	});
}

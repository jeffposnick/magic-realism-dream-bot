import {TweetV1, TwitterApi} from 'twitter-api-v2';
import * as dotenv from 'dotenv';

import {
	HASH_TAGS,
	MAGICAL_REALISM_TWITTER_ID,
	RETWEET_DELAY_MS,
} from './constants';

dotenv.config();

const client = new TwitterApi({
	accessSecret: process.env.TWITTER_ACCESS_SECRET!,
	accessToken: process.env.TWITTER_ACCESS_TOKEN!,
	appKey: process.env.TWITTER_APP_KEY!,
	appSecret: process.env.TWITTER_APP_SECRET!,
}).readWrite;

export async function getTweetIfNew(): Promise<[TweetV1 | null, string]> {
	const [latestMagicalRealismTweet] = await client.v1.userTimeline(
		MAGICAL_REALISM_TWITTER_ID,
	);

	const bot = await client.currentUser();
	const [latestBotTweet] = await client.v1.userTimeline(bot.id_str, {
		exclude_replies: false,
	});

	if (
		latestBotTweet.retweeted_status?.in_reply_to_status_id ===
		latestMagicalRealismTweet.id
	) {
		return [null, bot.id_str];
	}

	return [latestMagicalRealismTweet, bot.id_str];
}

export async function sendTweet(
	imageBuffer: Buffer,
	mimeType: string,
	tweet: TweetV1,
	prompt: string,
	botId: string,
) {
	const mediaId = await client.v1.uploadMedia(imageBuffer, {mimeType});
	await client.v1.createMediaMetadata(mediaId, {alt_text: {text: prompt}});
	const hashTags = HASH_TAGS.map((tag) => '#' + tag).join(' ');
	// Respond to the original tweet.
	const newTweet = await client.v1.reply(hashTags, tweet.id_str, {
		media_ids: mediaId,
	});
	// It can take a few seconds for the new tweet to be RT-able.
	await new Promise((resolve) => setTimeout(resolve, RETWEET_DELAY_MS));
	// Also, retweet it.
	await client.v2.retweet(botId, newTweet.id_str);
}

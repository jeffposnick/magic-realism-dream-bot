import {TweetV1, TwitterApi} from 'twitter-api-v2';
import * as dotenv from 'dotenv';

import {
	HASH_TAGS,
	MAGICAL_REALISM_TWITTER_ID,
	TWEET_URL_PREFIX,
} from './constants';

dotenv.config();

const client = new TwitterApi({
	accessSecret: process.env.TWITTER_ACCESS_SECRET!,
	accessToken: process.env.TWITTER_ACCESS_TOKEN!,
	appKey: process.env.TWITTER_APP_KEY!,
	appSecret: process.env.TWITTER_APP_SECRET!,
}).readWrite;

function tweetToURL(tweet: TweetV1) {
	const user = tweet.user.screen_name;
	return `${TWEET_URL_PREFIX}${user}/status/${tweet.id_str}`;
}

export async function getTweetIfNew() {
	const [latestMagicalRealismTweet] = await client.v1.userTimeline(
		MAGICAL_REALISM_TWITTER_ID,
	);
	const magicalRealismTweetURL = tweetToURL(latestMagicalRealismTweet);

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
	tweet: TweetV1,
	prompt: string,
) {
	const mediaId = await client.v1.uploadMedia(imageBuffer, {mimeType});
	await client.v1.createMediaMetadata(mediaId, {alt_text: {text: prompt}});
	const hashTags = HASH_TAGS.map((tag) => '#' + tag).join(' ');
	// Post a new top-level tweet that quotes the original tweet.
	await client.v1.tweet(hashTags + '\n' + tweetToURL(tweet), {
		media_ids: mediaId,
	});
	// Also, respond to the original tweet.
	await client.v1.reply(hashTags, tweet.id_str, {
		media_ids: mediaId,
	});
}

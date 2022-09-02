import log from 'loglevel';
import prefix from 'loglevel-plugin-prefix';

import {getLatestTweet, sendTweet} from './twitter';
import {generateImage} from './stable-diffusion';

prefix.reg(log);
prefix.apply(log);
log.enableAll();

log.info(`Starting up...`);
const latestTweet = await getLatestTweet();
log.info(`Latest tweet: ${latestTweet.full_text}`);
const {imageBuffer, mimeType} = await generateImage(latestTweet.full_text!);
log.info(`Generated image.`);
await sendTweet(imageBuffer, mimeType, latestTweet.id_str);
log.info(`Posted tweet.`);

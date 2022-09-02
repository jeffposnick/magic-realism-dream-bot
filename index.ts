import {getLatestTweet, sendTweet} from './twitter';
import {generateImage} from './generate';

const latestTweet = await getLatestTweet();
const {imageBuffer, mimeType} = await generateImage(latestTweet.full_text!);
await sendTweet(imageBuffer, mimeType, latestTweet.id_str);

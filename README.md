# Illustrated Magical Realism Bot

## Follow the bot on Twitter

Follow [@ImagicalRealism](https://twitter.com/ImagicalRealism) to see the generated output.

## Technical details

### The Twitter API

This bot uses the fantastic [twitter-api-v2](https://github.com/PLhery/node-twitter-api-v2) library to interact with Twitter.

OAuth 1.0a tokens are used for authentication. I followed the library's [guide](https://github.com/PLhery/node-twitter-api-v2/blob/master/doc/auth.md#user-wide-authentication-flow) to generate all of the necessary tokens.

### Generating images

The [Stability Diffusion API](https://github.com/Stability-AI/stability-sdk)'s gRPC service generates an image for a given prompt.

The [@grpc/grpc-js](https://www.npmjs.com/package/@grpc/grpc-js) library talks to the backend service. You can find details on how the gRPC client definitions were generated in the [proto](proto/) directory.

### Running the bot

A [GitHub Actions workflow definition](.github/workflows/tweet.yaml) executes [`npm run tweet`](package.json) on a one-hour schedule. If there is already a generated image for the latest [@MagicRealismBot](https://twitter.com/MagicRealismBot/) tweet, then `npm run tweet` will exit without posting anything.

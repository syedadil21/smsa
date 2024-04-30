// import { NextResponse } from "next/server";

// const Twitter = require('twitter');

// const client = new Twitter({
// consumer_key: 'SdsIalHVspNK3uu6a5OFrkV7W',
// consumer_secret: 'g5IOm4SsjQOLbyXGGe0DUbJhrwTX9ZY7rRhpHBEe2EVldbsDRw',
// access_token_key: '539215102-COjHe19dsvwK5l1smlxu8O6BV9To4eLBSHxZYKc4',
// access_token_secret: 'SO8lfkvlL3niMd03AgPFgAmZugJdkQKloA4yhrssQo2qy'
// });


// export async function GET(req: import("next").NextApiRequest, res: import("next").NextApiResponse)
// {

// // export default (req, res) => {
// //   res.statusCode = 200
// //   //  Return our eventual payload
// //   res.json()
// // }
// //     NextResponse.

//     const tweets = await client.get('search/tweets', {q: "bayers", count: '10'});
//     console.log(tweets);
//     // res.statusCode = 200;
//     // res.json(tweets);
//     return NextResponse.json(tweets);
// }



// Get Tweet objects by ID, using user authentication
// https://developer.twitter.com/en/docs/twitter-api/tweets/lookup/quick-start

import { got } from "got";

// const got = require('got');
const crypto = require('crypto');
const OAuth = require('oauth-1.0a');
const qs = require('querystring');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

// The code below sets the consumer key and consumer secret from your environment variables
// To set environment variables on macOS or Linux, run the export commands below from the terminal:
// export CONSUMER_KEY='YOUR-KEY'
// export CONSUMER_SECRET='YOUR-SECRET'
const consumer_key = "SdsIalHVspNK3uu6a5OFrkV7W";
const consumer_secret = "g5IOm4SsjQOLbyXGGe0DUbJhrwTX9ZY7rRhpHBEe2EVldbsDRw";

// These are the parameters for the API request
// specify Tweet IDs to fetch, and any additional fields that are required
// by default, only the Tweet ID and text are returned
const tweetIDs = '1278747501642657792,1275828087666679809'; // Edit the Tweet IDs to look up
const params = 'tweet.fields=lang,author_id&user.fields=created_at'; // Edit optional query parameters here

const endpointURL = `https://api.twitter.com/2/tweets?ids=${tweetIDs}&${params}`;

// this example uses PIN-based OAuth to authorize the user
const requestTokenURL = 'https://api.twitter.com/oauth/request_token?oauth_callback=oob';
const authorizeURL = new URL('https://api.twitter.com/oauth/authorize');
const accessTokenURL = 'https://api.twitter.com/oauth/access_token';

const oauth = OAuth({
  consumer: {
    key: consumer_key,
    secret: consumer_secret
  },
  signature_method: 'HMAC-SHA1',
  hash_function: (baseString, key) => crypto.createHmac('sha1', key).update(baseString).digest('base64')
});

async function input(prompt) {
  return new Promise(async (resolve, reject) => {
    readline.question(prompt, (out) => {
      readline.close();
      resolve(out);
    });
  });
}

async function requestToken() {

  const authHeader = oauth.toHeader(oauth.authorize({
    url: requestTokenURL,
    method: 'POST'
  }));

  const req = await got.post(requestTokenURL, {
    headers: {
      Authorization: authHeader["Authorization"]
    }
  });

  if (req.body) {
    return qs.parse(req.body);
  } else {
    throw new Error('Cannot get an OAuth request token');
  }
}

async function accessToken({
  oauth_token,
  oauth_token_secret
}, verifier) {

  const authHeader = oauth.toHeader(oauth.authorize({
    url: accessTokenURL,
    method: 'POST'
  }));

  const path = `https://api.twitter.com/oauth/access_token?oauth_verifier=${verifier}&oauth_token=${oauth_token}`

  const req = await got.post(path, {
    headers: {
      Authorization: authHeader["Authorization"]
    }
  });

  if (req.body) {
    return qs.parse(req.body);
  } else {
    throw new Error('Cannot get an OAuth request token');
  }
}

async function getRequest({
  oauth_token,
  oauth_token_secret
}) {

  const token = {
    key: oauth_token,
    secret: oauth_token_secret
  };

  const authHeader = oauth.toHeader(oauth.authorize({
    url: endpointURL,
    method: 'GET'
  }, token));

  const req = await got(endpointURL, {
    headers: {
      Authorization: authHeader["Authorization"],
      'user-agent': "v2TweetLookupJS"
    }
  });

  if (req.body) {
    return JSON.parse(req.body);
  } else {
    throw new Error('Unsuccessful request');
  }
}

(async () => {
  try {

    // Get request token
    const oAuthRequestToken = await requestToken();

    // Get authorization
    authorizeURL.searchParams.append('oauth_token', oAuthRequestToken.oauth_token);
    console.log('Please go here and authorize:', authorizeURL.href);
    const pin = await input('Paste the PIN here: ');

    // Get the access token
    const oAuthAccessToken = await accessToken(oAuthRequestToken, pin.trim());

    // Make the request
    const response = await getRequest(oAuthAccessToken);
    console.dir(response, {
      depth: null
    });

  } catch (e) {
    console.log(e);
    process.exit(-1);
  }
  process.exit();
})();
import OAuth2Server, { OAuthError, Request, Response } from 'oauth2-server';
import model from './model';

/** @type { OAuth2Server } */
let oauth;

if (process.env.NODE_ENV === 'production') {
  oauth = new OAuth2Server({
    model
  });
} else {
  if (!global.oauth) {
    global.oauth = new OAuth2Server({
      model
    });
  }
  oauth = global.oauth;
}

/**
 * Get Access Token From OauthServer
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 * @param {import("oauth2-server").TokenOptions} options
 * @returns { Promise<import("oauth2-server").Token | OAuthError> }
 */
export const oauthAccessToken = (req, res, options = {}) =>
  oauth.token(new Request(req), new Response(res), options);

/**
 * Get Access Token From OauthServer
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 * @param {import("oauth2-server").AuthenticateOptions} options
 * @returns { Promise<import("oauth2-server").Token | OAuthError> }
 */
export const oauthAuthenticate = (req, res, options) =>
  oauth.authenticate(new Request(req), new Response(res), options);

/**
 * Get Access Token From OauthServer
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 * @param {import("oauth2-server").AuthorizeOptions} options
 * @returns { Promise<import("oauth2-server").Token | OAuthError> }
 */
export const oauthAuthorize = (req, res, options) =>
  oauth.authorize(new Request(req), new Response(res), options);

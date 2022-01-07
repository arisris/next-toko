import prisma from '../prisma';
import bcrypt from "bcryptjs";

/**
 * Invoked to generate a new access token.
 * @param {import("oauth2-server").Client} client
 * @param {import("@prisma/client").Users} user
 * @param {String} scope
 * @returns {String}
 */

async function generateAccessToken(client, user, scope) {}

/**
 * Invoked to generate a new refresh token.
 * @param {import("oauth2-server").Client} client
 * @param {import("@prisma/client").Users} user
 * @param {String} scope
 * @returns {String}
 */

async function generateRefreshToken(client, user, scope) {}

/**
 * Invoked to generate a new refresh token.
 * @param {import("oauth2-server").Client} client
 * @param {import("@prisma/client").Users} user
 * @param {String} scope
 * @returns {String}
 */

async function generateAuthorizationCode(client, user, scope) {}

/**
 * Invoked to retrieve an existing access token previously saved through Model#saveToken().
 * @param { String } accessToken
 * @returns {import("oauth2-server").Token}
 */
async function getAccessToken(accessToken) {
  const token = await prisma.oauthAccessToken.findFirst({
    where: { accessToken },
    include: {
      client: true,
      user: true
    }
  });
  return token;
}

/**
 * Invoked to retrieve an existing refresh token previously saved through Model#saveToken().
 * @param { String } refreshToken
 * @returns { import("oauth2-server").RefreshToken }
 */
async function getRefreshToken(refreshToken) {
  const tokenRefresh = await prisma.oauthRefreshToken.findFirst({
    where: { refreshToken },
    include: {
      client: true,
      user: true
    }
  });
  return tokenRefresh;
}

/**
 * Invoked to retrieve an existing authorization code previously saved through Model#saveAuthorizationCode().
 * @param { String } authorizationCode
 * @returns { import("oauth2-server").AuthorizationCode }
 */

async function getAuthorizationCode(authorizationCode) {
  const codeAuthorization = await prisma.oauthAuthorizationCode.findFirst({
    where: { authorizationCode },
    include: {
      client: true,
      user: true
    }
  });
  return codeAuthorization;
}

/**
 * Invoked to retrieve a client using a client id or a client id/client secret combination, depending on the grant type.
 * @param { String } clientId
 * @param { String } clientSecret
 * @returns { import("oauth2-server").Client }
 */

async function getClient(clientId, clientSecret) {
  //console.log(clientId)
  const client = await prisma.oauthClients.findFirst({
    where: { clientId, clientSecret },
    include: {
      accessToken: true,
      refreshToken: true
    }
  });
  return {
    ...client,
    grants: ["password"]
  };
}

/**
 * Invoked to retrieve a user using a username/password combination.
 * @param { String } username
 * @param { String } password
 * @returns { import("@prisma/client").Users }
 */

async function getUser(username, password) {
  const user = await prisma.users.findFirst({
    where: { username },
    include: {
      oauthClient: true
    }
  });
  if (user) {
    const matchedPassword = await bcrypt.compare(password, user.password);
    if (matchedPassword) {
      return user;
    }
  }
  return null;
}

/**
 * Invoked to retrieve the user associated with the specified client.
 * @param { import("oauth2-server").Client } client
 * @returns { import("@prisma/client").Users }
 */

async function getUserFromClient(client) {
  const clientUser = await prisma.oauthClients.findFirst({
    where: { clientId: client.clientId },
    include: {
      user: true
    }
  });
  return clientUser.user;
}

/**
 * Invoked to save an access token and optionally a refresh token, depending on the grant type.
 * @param {import("oauth2-server").Token} token
 * @param {import("oauth2-server").Client} client
 * @param {import("@prisma/client").Users} user
 * @returns { import("oauth2-server").Token }
 */

async function saveToken(token, client, user) {
  const accessToken = await prisma.oauthAccessToken.create({
    data: {
      accessToken: token.accessToken,
      accessTokenExpiresAt: token.accessTokenExpiresAt,
      scope: token.scope,
      clientId: client.clientId,
      userId: user.id
    }
  });
  const refreshToken = await prisma.oauthRefreshToken.create({
    data: {
      refreshToken: token.refreshToken,
      refreshTokenExpiresAt: token.refreshTokenExpiresAt,
      scope: token.scope,
      clientId: client.clientId,
      userId: user.id
    }
  });
  return {
    accessToken: accessToken.accessToken,
    accessTokenExpiresAt: accessToken.accessTokenExpiresAt,
    refreshToken: refreshToken.refreshToken,
    refreshTokenExpiresAt: refreshToken.refreshTokenExpiresAt,
    scope: accessToken.scope,
    client: { id: accessToken.clientId },
    user: { id: accessToken.userId }
  };
}

/**
 * Invoked to save an authorization code.
 * @param {import("oauth2-server").AuthorizationCode} code
 * @param {import("oauth2-server").Client} client
 * @param {import("@prisma/client").Users} user
 */

async function saveAuthorizationCode(code, client, user) {
  const authorizationCode = await prisma.oauthAuthorizationCode.create({
    data: {
      authorizationCode: code.authorizationCode,
      expiresAt: code.expiresAt,
      redirectUri: code.redirectUri,
      scope: code.scope,
      clientId: client.clientId,
      userId: user.id
    }
  });
  return authorizationCode;
}

/**
 * Invoked to revoke a refresh token.
 * @param {import("oauth2-server").Token} token
 * @returns {boolean}
 */

async function revokeToken(token) {
  let revoked = await prisma.oauthRefreshToken.delete({
    where: { refreshToken: token.refreshToken }
  });
  return revoked.id ? true : false;
}

/**
 * Invoked to revoke an authorization code.
 * @param {import("oauth2-server").AuthorizationCode} code
 * @returns {boolean}
 */

async function revokeAuthorizationCode(code) {
  let revoked = await prisma.oauthAuthorizationCode.delete({
    where: { authorizationCode: code.authorizationCode }
  });
  return revoked.id ? true : false;
}

/**
 * Invoked to check if the requested scope is valid for a particular client/user combination.
 * @param {import("oauth2-server").User} user
 * @param {import("oauth2-server").Client} client
 * @param {String} scope
 * @returns {any}
 */

async function validateScope(user, client, scope) {}

/**
 * Invoked to check if the requested scope is valid for a particular client/user combination.
 * @param {import("oauth2-server").Token} accessToken
 * @param {String} scope
 * @returns {boolean}
 */

async function verifyScope(accessToken, scope) {}

export default {
  // generateAccessToken,
  // generateRefreshToken,
  // generateAuthorizationCode,
  getAccessToken,
  getRefreshToken,
  getAuthorizationCode,
  getClient,
  getUser,
  getUserFromClient,
  saveToken,
  saveAuthorizationCode,
  revokeToken,
  revokeAuthorizationCode
  // validateScope,
  // verifyScope,
};

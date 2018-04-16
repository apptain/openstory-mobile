const apiRootUrl = process.env["API-ROOT"];
const oAuthApiRootUrl = process.env["OAUTH-API-ROOT"];

const oAuthCallbackPath = "/api/oauth/login/callback";
export const facebookLoginUrl = `${oAuthApiRootUrl}/.auth/login/facebook?post_login_redirect_url=${oAuthCallbackPath}`;
export const twitterLoginUrl = `${oAuthApiRootUrl}/.auth/login/twitter?post_login_redirect_url=${oAuthCallbackPath}`;

export const storiesGetUrl = `${apiRootUrl}/stories`;
export const storyUpsertUrl = `${apiRootUrl}/story`;
export const profileGetUrl = `${apiRootUrl}/profile`;


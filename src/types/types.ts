export const status = {
  informational: {
    continue: 100,
    switchingProtocols: 101,
    processing: 102,
    earlyHints: 103,
  },

  successful: {
    ok: 200,
    created: 201,
    accepted: 202,
    noContent: 204,
  },

  redirection: {
    multipleChoices: 300,
    movedPermanently: 301,
    found: 302,
    seeOther: 303,
    notModified: 304,
    temporaryRedirect: 307,
    permanentRedirect: 308,
  },

  clientError: {
    badRequest: 400,
    unauthorized: 401,
    forbidden: 403,
    notFound: 404,
    methodNotAllowed: 405,
    conflict: 409,
    tooManyRequests: 429,
  },

  serverError: {
    internalServerError: 500,
    notImplemented: 501,
    badGateway: 502,
    serviceUnavailable: 503,
    gatewayTimeout: 504,
  },
};

export const TOKEN_NAME = 'auth_token';


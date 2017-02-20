// TODO(paulsmith): this is just temporary

let loginState = {
  user: null,
  creds: null
};

export function newLoginSession(user, accessToken, client) {
  loginState.user = user;
  loginState.creds = {
    accessToken: accessToken,
    client: client
  };
}

export function isLoggedIn() {
  return loginState.user !== null && loginState.creds !== null;
}

export function loggedInUser() {
  return loginState.user;
}

export function apiCreds() {
  return loginState.creds;
}

export function logout() {
  loginState = {
    user: null,
    creds: null
  };
}

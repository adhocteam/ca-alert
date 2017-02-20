// TODO(paulsmith): this is just temporary

export function newLoginSession(user, accessToken, client) {
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem(
    "apiCreds",
    JSON.stringify({ accessToken: accessToken, client: client })
  );
}

export function isLoggedIn() {
  return localStorage.getItem("user") !== null &&
    localStorage.getItem("apiCreds") !== null;
}

export function loggedInUser() {
  return JSON.parse(localStorage.getItem("user") || "null");
}

export function apiCreds() {
  return JSON.parse(localStorage.getItem("apiCreds") || "null");
}

export function logout() {
  localStorage.removeItem("user");
  localStorage.removeItem("apiCreds");
}

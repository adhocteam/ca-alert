export function setUser(user) {
  localStorage.setItem("user", JSON.stringify(user));
}

export function newLoginSession(user, accessToken, client, expiry, uid) {
  if (user && accessToken && client) {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem(
      "apiCreds",
      JSON.stringify({
        accessToken: accessToken,
        client: client,
        expiry: expiry,
        uid: uid
      })
    );
  }
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

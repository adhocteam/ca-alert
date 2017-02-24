import "whatwg-fetch";
import { apiCreds } from "./session";

const MIN_PASSWORD_LEN = 8;

function encodeQueryString(params) {
  let pairs = [];
  for (let i = 0; i < params.length; i++) {
    let pair = `${params[i][0]}=${encodeURIComponent(params[i][1])}`;
    pairs.push(pair);
  }
  return pairs.join("&");
}

function errClassName(isValid, which) {
  let success = "";
  let error = "";
  switch (which) {
    case "div":
      success = "";
      error = "usa-input-error";
      break;
    case "label":
      success = "usa-input-success-label";
      error = "usa-input-error-label";
      break;
    case "input":
      success = "usa-input-success";
      error = "";
      break;
  }
  return isValid === null ? "" : isValid === true ? success : error;
}

class Point {
  constructor(lng, lat) {
    this.lng = lng;
    this.lat = lat;
  }
}

function checkResponse(response) {
  if (response.status === 200) {
    return response;
  } else {
    let err = new Error(response.statusText);
    err.response = response;
    throw err;
  }
}

function geocode(address, callback) {
  let req = {
    address: address,
    componentRestrictions: {
      country: "US",
      administrativeArea: "California"
    }
  };
  let geocoder = new google.maps.Geocoder();
  geocoder.geocode(req, (results, status) => {
    if (status === "OK") {
      let loc = results[0].geometry.location;
      let pt = new Point(loc.lng(), loc.lat());
      callback(null, {
        address: results[0].formatted_address,
        pt: pt
      });
    } else {
      callback("Couldn't find that location", null);
    }
  });
}

// make an auth'd request
function fetchAuthd(url, options) {
  options = options || {};
  options.headers = Object.assign(options.headers || {}, {
    uid: creds.uid,
    "access-token": creds.accessToken,
    client: creds.client,
    "token-type": "Bearer",
    expiry: creds.expiry
  });
  return fetch(url, options);
}

module.exports = {
  MIN_PASSWORD_LEN: MIN_PASSWORD_LEN,
  encodeQueryString: encodeQueryString,
  errClassName: errClassName,
  Point: Point,
  checkResponse: checkResponse,
  geocode: geocode,
  fetchAuthd: fetchAuthd
};

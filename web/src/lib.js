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

module.exports = {
  MIN_PASSWORD_LEN: MIN_PASSWORD_LEN,
  encodeQueryString: encodeQueryString,
  errClassName: errClassName
};

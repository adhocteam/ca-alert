function encodeQueryString(params) {
  let pairs = [];
  for (let i = 0; i < params.length; i++) {
    let pair = `${params[i][0]}=${encodeURIComponent(params[i][1])}`;
    pairs.push(pair);
  }
  return pairs.join("&");
}

module.exports = {
  encodeQueryString: encodeQueryString
};

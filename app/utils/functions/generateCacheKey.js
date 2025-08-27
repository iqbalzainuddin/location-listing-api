const crypto = require("crypto");

function generateCacheKey(item, params) {
  // stringify query safely
  const queryString = JSON.stringify(params);

  // hash to keep key short and avoid long redis keys
  const hash = crypto.createHash("md5").update(queryString).digest("hex");

  return `${item}:${hash}`;
}

module.exports = generateCacheKey;
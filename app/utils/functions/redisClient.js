const { createClient } = require("redis");
const { redis: redis_env } = require("@/config/environment");

const client = createClient({
    username: redis_env.username,
    password: redis_env.password,
    socket: {
        host: redis_env.host,
        port: redis_env.port
    }
});

client.on("ready", () => console.log("Redis connected"));

client.on("error", err => console.log("Redis Client Error", err));

(async () => {
  await client.connect();
})();

module.exports = client;
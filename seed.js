// seed.js — load 100 fake posts into the leaderboard so you have data to rank.
// Run with:  npm run seed

import { redis } from "./leaderboard.js";

async function seed() {
  await redis.del("trending:posts");

  const pipeline = redis.pipeline();
  for (let i = 1; i <= 100; i++) {
    const id = "post:" + i;
    pipeline.hset(id + ":meta", "title", "Post number " + i, "author", "@user" + i);
    pipeline.zadd("trending:posts", Math.floor(Math.random() * 50), id);
  }
  await pipeline.exec(); // 200 writes, one round trip

  console.log("Seeded 100 posts.");
  redis.disconnect();
}

seed();

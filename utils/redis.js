import { createClient } from 'redis';

class RedisClient {
  constructor() {
    this.client = createClient();
    this.client.on('error', (err) => console.log(err));
    this.client.connect().catch((err) => {
      console.log(err);
    });
  }

  isAlive() {
    return this.client.isOpen;
  }

  async get(key) {
    return await this.client.get(key);
  }

  async set(key, val, expTime) {
    await this.client.set(key, val, {
      EX: expTime,
    });
  }

  async del(key) {
    await this.client.del(key);
  }
}

const redisClient = new RedisClient();
export default redisClient;

import { createClient } from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    this.client = createClient();
    this.client.on('error', (err) => console.log(err));
  }

  isAlive() {
    return this.client.connected;
  }

  async get(key) {
    const getVal = promisify(this.client.get).bind(this.client);
    return getVal(key);
  }

  async set(key, val, expTime) {
    const setVal = promisify(this.client.set).bind(this.client);
    setVal(key, val, 'EX', expTime);
  }

  async del(key) {
    const delPair = promisify(this.client.del).bind(this.client);
    delPair(key);
  }
}

const redisClient = new RedisClient();
export default redisClient;

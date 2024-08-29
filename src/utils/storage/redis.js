const RedisInstance = require('ioredis');

class Redis {
  constructor() {
    this.config();
  }

  config = async () => {
    this.client = new RedisInstance(process.env.REDIS_URL);

    await this.client.on('connect', () =>
      console.log('Redis client connected')
    );
    await this.client.on('error', (error) =>
      console.log('Redis client error: ', error)
    );
  };
}

exports.redis = new Redis();

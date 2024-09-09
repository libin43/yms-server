import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { Redis } from 'ioredis';

@Injectable()
export class PubSubService implements OnModuleDestroy {
    private pubSub: RedisPubSub;
    private publisher: Redis;
    private subscriber: Redis;

    constructor() {
        const redisOptions = {
            host: process.env.REDIS_HOST,
            port: parseInt(process.env.REDIS_PORT),
            password: process.env.REDIS_PASSWORD,
        };

        this.publisher = new Redis(redisOptions)
        this.subscriber = new Redis(redisOptions)

        // Initialize Redis PubSub with a Redis publisher and subscriber
        this.pubSub = new RedisPubSub({
            publisher: this.publisher,
            subscriber: this.subscriber,
        });

    }

    async publish(trigger: string, payload: any): Promise<void> {
        await this.pubSub.publish(trigger, payload)
    }

    asyncIterator(trigger: string) {
        return this.pubSub.asyncIterator(trigger)
    }

    onModuleDestroy() {
        this.pubSub.close()
        this.publisher.quit()
        this.subscriber.quit()
        console.log('Pubsub and Redis connections closed.')
    }
}

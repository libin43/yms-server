import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { Redis } from 'ioredis';

@Injectable()
export class PubSubService implements OnModuleDestroy, OnModuleInit {
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

    async onModuleInit() {
        console.log('PubSubService initialized')
        // Optionally, you can validate Redis connection
        await this.publisher.ping();
        await this.subscriber.ping();
    }


    onModuleDestroy() {
        this.pubSub.close()
        this.publisher.quit()
        this.subscriber.quit()
        console.log('Pubsub and Redis connections closed.')
    }
}

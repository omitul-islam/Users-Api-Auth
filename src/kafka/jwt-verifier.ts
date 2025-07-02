import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka, EachMessagePayload } from 'kafkajs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtVerifier implements OnModuleInit {
  private kafka = new Kafka({ brokers: ['kafka:9092'] });
  private consumer = this.kafka.consumer({ groupId: 'kafka-service-group' });
  private producer = this.kafka.producer();

  async onModuleInit() {
    await this.consumer.connect();
    await this.producer.connect();

    console.log('Connecting to Kafka...');

    await this.consumer.subscribe({ topic: 'verify-jwt' });

    await this.consumer.run({
      eachMessage: async ({ message }: EachMessagePayload) => {
        if (!message.value) return;

        const { token, correlationId } = JSON.parse(message.value.toString());
        let response;

        try {
          const user = jwt.verify(token, process.env.JWT_SECRET!);
          console.log('JWT verified:', user);
          response = { valid: true, user, correlationId };
        } catch (error: any) {
          response = { valid: false, error: error.message, correlationId};
        }

        await this.producer.send({
          topic: 'verify-jwt-response',
          messages: [{ value: JSON.stringify(response) }],
        });
      },
    });
  }
}

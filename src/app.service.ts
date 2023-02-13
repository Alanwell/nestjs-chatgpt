import { Injectable, Logger } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  async getChatService(message: string): Promise<unknown> {
    console.log(process.env.OPENAI_API_KEY);
    console.log(message);
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    try {
      const completion = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: message,
        max_tokens: 2048,
        temperature: 1,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0.6,
      });
      console.log(completion.data);
      this.logger.log('success');
      return {
        msg: 'success',
        code: '200',
        result: {
          id: completion.data.id,
          created: completion.data.created,
          text: completion.data.choices[0].text,
        },
      };
    } catch (error) {
      this.logger.error('error');
      if (error.response) {
        return {
          msg: 'error',
          code: error.response.status,
          result: error.response.data,
        };
      } else {
        return error.message;
      }
    }
  }
}

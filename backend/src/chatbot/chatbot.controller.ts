import { Controller, Post, Body, Get } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';

@Controller('chatbot')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @Post('ask')
  async ask(@Body() body: { question: string; context?: string }) {
    return this.chatbotService.askQuestion(body.question, body.context);
  }

  @Get('suggestions')
  async getSuggestions() {
    return {
      suggestions: this.chatbotService.getSuggestedQuestions(),
    };
  }
}

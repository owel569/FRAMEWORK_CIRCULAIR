import { Module } from '@nestjs/common';
import { ChatbotController } from './chatbot.controller';
import { ChatbotService } from './chatbot.service';
import { ChatbotDocumentsService } from './chatbot-documents.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [ChatbotController],
  providers: [ChatbotService, ChatbotDocumentsService, PrismaService],
})
export class ChatbotModule {}

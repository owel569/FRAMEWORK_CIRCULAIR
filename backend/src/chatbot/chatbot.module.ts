import { Module } from '@nestjs/common';
import { ChatbotController } from './chatbot.controller';
import { ChatbotService } from './chatbot.service';
import { ChatbotDocumentsService } from './chatbot-documents.service';
import { HuggingFaceRAGService } from './huggingface-rag.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [ChatbotController],
  providers: [ChatbotService, ChatbotDocumentsService, HuggingFaceRAGService, PrismaService],
})
export class ChatbotModule {}

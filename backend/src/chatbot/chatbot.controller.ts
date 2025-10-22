import { Controller, Post, Body, Get, UseInterceptors, UploadedFile, Headers, UnauthorizedException, Param, Delete, Patch } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ChatbotService } from './chatbot.service';
import { ChatbotDocumentsService } from './chatbot-documents.service';

@Controller('chatbot')
export class ChatbotController {
  constructor(
    private readonly chatbotService: ChatbotService,
    private readonly documentsService: ChatbotDocumentsService,
  ) {}

  @Post('ask')
  async ask(@Body() data: { question: string; context?: string }) {
    return this.chatbotService.askQuestion(data.question, data.context, this.documentsService);
  }

  @Get('suggestions')
  getSuggestions() {
    return {
      suggestions: this.chatbotService.getSuggestedQuestions(),
    };
  }

  // Routes Admin pour la gestion des documents
  @Post('documents/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadDocument(
    @UploadedFile() file: Express.Multer.File,
    @Body() data: { title: string; description?: string },
    @Headers('authorization') auth: string,
  ) {
    // Vérification basique (à améliorer avec vrai middleware)
    if (!auth?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token manquant');
    }

    return this.documentsService.uploadDocument(
      file,
      data.title,
      data.description,
      'admin', // TODO: extraire du token
    );
  }

  @Get('documents')
  async getAllDocuments(@Headers('authorization') auth: string) {
    if (!auth?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token manquant');
    }

    return this.documentsService.getAllDocuments();
  }

  @Patch('documents/:id/toggle')
  async toggleDocument(
    @Param('id') id: string,
    @Headers('authorization') auth: string,
  ) {
    if (!auth?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token manquant');
    }

    return this.documentsService.toggleDocument(id);
  }

  @Delete('documents/:id')
  async deleteDocument(
    @Param('id') id: string,
    @Headers('authorization') auth: string,
  ) {
    if (!auth?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token manquant');
    }

    return this.documentsService.deleteDocument(id);
  }
}
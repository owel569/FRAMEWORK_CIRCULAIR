
import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Headers,
  UnauthorizedException,
  Query,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import {
  AdminLoginDto,
  CreateQuestionDto,
  UpdateQuestionDto,
} from './dto/admin.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // Authentification
  @Post('login')
  async login(@Body() loginDto: AdminLoginDto) {
    return this.adminService.login(loginDto);
  }

  // Middleware de vérification du token
  private async verifyAdmin(authHeader: string) {
    if (!authHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token manquant');
    }
    const token = authHeader.substring(7);
    return this.adminService.verifyToken(token);
  }

  // Dashboard - Statistiques
  @Get('stats')
  async getStats(@Headers('authorization') auth: string) {
    await this.verifyAdmin(auth);
    return this.adminService.getDashboardStats();
  }

  @Get('demo-mode')
  async getDemoMode(@Headers('authorization') auth: string) {
    await this.verifyAdmin(auth);
    return this.adminService.getDemoMode();
  }

  @Post('demo-mode')
  async setDemoMode(
    @Headers('authorization') auth: string,
    @Body() data: { enabled: boolean },
  ) {
    await this.verifyAdmin(auth);
    return this.adminService.setDemoMode(data.enabled);
  }

  // Questions - CRUD
  @Get('questions')
  async getAllQuestions(
    @Headers('authorization') auth: string,
    @Query('sector') sector?: string,
  ) {
    await this.verifyAdmin(auth);
    if (sector) {
      return this.adminService.getQuestionsBySector(sector);
    }
    return this.adminService.getAllQuestions();
  }

  @Post('questions')
  async createQuestion(
    @Headers('authorization') auth: string,
    @Body() data: CreateQuestionDto,
  ) {
    await this.verifyAdmin(auth);
    return this.adminService.createQuestion(data);
  }

  @Put('questions/:id')
  async updateQuestion(
    @Headers('authorization') auth: string,
    @Param('id') id: string,
    @Body() data: UpdateQuestionDto,
  ) {
    await this.verifyAdmin(auth);
    return this.adminService.updateQuestion(id, data);
  }

  @Delete('questions/:id')
  async deleteQuestion(
    @Headers('authorization') auth: string,
    @Param('id') id: string,
  ) {
    await this.verifyAdmin(auth);
    return this.adminService.deleteQuestion(id);
  }

  // Import/Export
  @Post('questions/bulk-import')
  async bulkImport(
    @Headers('authorization') auth: string,
    @Body() data: { questions: CreateQuestionDto[] },
  ) {
    await this.verifyAdmin(auth);
    return this.adminService.bulkImportQuestions(data.questions);
  }

  @Get('questions/export')
  async exportQuestions(
    @Headers('authorization') auth: string,
    @Query('sector') sector?: string,
  ) {
    await this.verifyAdmin(auth);
    return this.adminService.exportQuestions(sector);
  }

  // Gestion des entreprises
  @Get('companies/:id')
  async getCompanyDetails(
    @Headers('authorization') auth: string,
    @Param('id') id: string,
  ) {
    await this.verifyAdmin(auth);
    return this.adminService.getCompanyDetails(id);
  }

  @Get('companies/search')
  async searchCompanies(
    @Headers('authorization') auth: string,
    @Query('q') query: string,
  ) {
    await this.verifyAdmin(auth);
    return this.adminService.searchCompanies(query);
  }
}

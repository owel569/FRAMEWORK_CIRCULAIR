
import { Controller, Get, Post, Put, Patch, Delete, Body, Param, Query, Headers, UnauthorizedException } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CompanyManagementService } from './company-management.service';
import { ActionPlanManagementService } from './action-plan-management.service';
import { TeamManagementService } from './team-management.service';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly companyManagementService: CompanyManagementService,
    private readonly actionPlanManagementService: ActionPlanManagementService,
    private readonly teamManagementService: TeamManagementService,
  ) {}

  private extractAdminId(authHeader: string): string {
    if (!authHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token manquant');
    }
    // TODO: Extraire l'ID du token JWT décodé
    return 'admin-id'; // Placeholder
  }

  @Post('login')
  async login(@Body() credentials: { email: string; password: string }) {
    return this.adminService.login(credentials);
  }

  @Get('stats')
  async getStats(@Headers('authorization') auth: string) {
    this.extractAdminId(auth);
    return this.adminService.getDashboardStats();
  }

  @Get('demo-mode')
  async getDemoMode(@Headers('authorization') auth: string) {
    this.extractAdminId(auth);
    return this.adminService.getDemoMode();
  }

  @Post('demo-mode')
  async toggleDemoMode(@Headers('authorization') auth: string) {
    this.extractAdminId(auth);
    const current = this.adminService.getDemoMode();
    return this.adminService.setDemoMode(!current.demoMode);
  }

  // ============ GESTION DES ENTREPRISES ============
  
  @Get('companies')
  async getAllCompanies(
    @Headers('authorization') auth: string,
    @Query('search') search?: string,
    @Query('sector') sector?: string,
    @Query('maturityLevel') maturityLevel?: string,
    @Query('isActive') isActive?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    this.extractAdminId(auth);
    return this.companyManagementService.getAllCompanies({
      search,
      sector,
      maturityLevel,
      isActive: isActive === 'true' ? true : isActive === 'false' ? false : undefined,
      page: page ? parseInt(page) : 1,
      limit: limit ? parseInt(limit) : 20,
    });
  }

  @Get('companies/stats')
  async getCompanyStats(@Headers('authorization') auth: string) {
    this.extractAdminId(auth);
    return this.companyManagementService.getCompanyStats();
  }

  @Get('companies/:id')
  async getCompanyById(
    @Param('id') id: string,
    @Headers('authorization') auth: string,
  ) {
    this.extractAdminId(auth);
    return this.companyManagementService.getCompanyById(id);
  }

  @Put('companies/:id')
  async updateCompany(
    @Param('id') id: string,
    @Body() data: any,
    @Headers('authorization') auth: string,
  ) {
    const adminId = this.extractAdminId(auth);
    return this.companyManagementService.updateCompany(id, data, adminId);
  }

  @Patch('companies/:id/toggle-status')
  async toggleCompanyStatus(
    @Param('id') id: string,
    @Headers('authorization') auth: string,
  ) {
    const adminId = this.extractAdminId(auth);
    return this.companyManagementService.toggleCompanyStatus(id, adminId);
  }

  @Post('companies/:companyId/assign-expert')
  async assignExpert(
    @Param('companyId') companyId: string,
    @Body('expertId') expertId: string,
    @Headers('authorization') auth: string,
  ) {
    const adminId = this.extractAdminId(auth);
    return this.companyManagementService.assignExpert(companyId, expertId, adminId);
  }

  @Delete('companies/:companyId/experts/:expertId')
  async removeExpert(
    @Param('companyId') companyId: string,
    @Param('expertId') expertId: string,
    @Headers('authorization') auth: string,
  ) {
    const adminId = this.extractAdminId(auth);
    return this.companyManagementService.removeExpertAssignment(companyId, expertId, adminId);
  }

  // ============ GESTION DES PLANS D'ACTION ============

  @Get('companies/:companyId/action-plans')
  async getCompanyActionPlans(
    @Param('companyId') companyId: string,
    @Headers('authorization') auth: string,
  ) {
    this.extractAdminId(auth);
    return this.actionPlanManagementService.getCompanyActionPlans(companyId);
  }

  @Get('action-plans/pending')
  async getPendingActionPlans(@Headers('authorization') auth: string) {
    this.extractAdminId(auth);
    return this.actionPlanManagementService.getPendingActionPlans();
  }

  @Get('action-plans/:id')
  async getActionPlanById(
    @Param('id') id: string,
    @Headers('authorization') auth: string,
  ) {
    this.extractAdminId(auth);
    return this.actionPlanManagementService.getActionPlanById(id);
  }

  @Put('action-plans/:id')
  async updateActionPlan(
    @Param('id') id: string,
    @Body() data: any,
    @Headers('authorization') auth: string,
  ) {
    const adminId = this.extractAdminId(auth);
    return this.actionPlanManagementService.updateActionPlan(id, data, adminId);
  }

  @Get('action-plan-templates')
  async getActionPlanTemplates(@Headers('authorization') auth: string) {
    this.extractAdminId(auth);
    return this.actionPlanManagementService.getActionPlanTemplates();
  }

  @Post('action-plan-templates')
  async createActionPlanTemplate(
    @Body() data: any,
    @Headers('authorization') auth: string,
  ) {
    this.extractAdminId(auth);
    return this.actionPlanManagementService.createActionPlanTemplate(data);
  }

  // ============ GESTION DES QUESTIONS (existant) ============

  @Get('questions')
  async getQuestions(@Headers('authorization') auth: string) {
    this.extractAdminId(auth);
    return this.adminService.getAllQuestions();
  }

  @Post('questions')
  async createQuestion(
    @Body() data: any,
    @Headers('authorization') auth: string,
  ) {
    this.extractAdminId(auth);
    return this.adminService.createQuestion(data);
  }

  @Put('questions/:id')
  async updateQuestion(
    @Param('id') id: string,
    @Body() data: any,
    @Headers('authorization') auth: string,
  ) {
    this.extractAdminId(auth);
    return this.adminService.updateQuestion(id, data);
  }

  @Delete('questions/:id')
  async deleteQuestion(
    @Param('id') id: string,
    @Headers('authorization') auth: string,
  ) {
    this.extractAdminId(auth);
    return this.adminService.deleteQuestion(id);
  }

  @Post('questions/bulk-import')
  async bulkImportQuestions(
    @Body() data: { questions: any[] },
    @Headers('authorization') auth: string,
  ) {
    this.extractAdminId(auth);
    return this.adminService.bulkImportQuestions(data.questions);
  }

  @Get('questions/export')
  async exportQuestions(@Headers('authorization') auth: string) {
    this.extractAdminId(auth);
    return this.adminService.exportQuestions();
  }

  @Get('companies/:id')
  async getCompany(
    @Param('id') id: string,
    @Headers('authorization') auth: string,
  ) {
    this.extractAdminId(auth);
    return this.adminService.getCompanyDetails(id);
  }

  @Get('companies/search')
  async searchCompanies(
    @Query('query') query: string,
    @Headers('authorization') auth: string,
  ) {
    this.extractAdminId(auth);
    return this.adminService.searchCompanies(query);
  }

  // ============ GESTION DE L'ÉQUIPE ============

  @Get('team')
  async getAllTeamMembers(
    @Headers('authorization') auth: string,
    @Query('includeInactive') includeInactive?: string,
  ) {
    this.extractAdminId(auth);
    return this.teamManagementService.getAllMembers(includeInactive === 'true');
  }

  @Get('team/:id')
  async getTeamMember(
    @Param('id') id: string,
    @Headers('authorization') auth: string,
  ) {
    this.extractAdminId(auth);
    return this.teamManagementService.getMemberById(id);
  }

  @Post('team')
  async createTeamMember(
    @Body() data: any,
    @Headers('authorization') auth: string,
  ) {
    const adminId = this.extractAdminId(auth);
    return this.teamManagementService.createMember(data, adminId);
  }

  @Put('team/:id')
  async updateTeamMember(
    @Param('id') id: string,
    @Body() data: any,
    @Headers('authorization') auth: string,
  ) {
    const adminId = this.extractAdminId(auth);
    return this.teamManagementService.updateMember(id, data, adminId);
  }

  @Delete('team/:id')
  async deleteTeamMember(
    @Param('id') id: string,
    @Headers('authorization') auth: string,
  ) {
    const adminId = this.extractAdminId(auth);
    return this.teamManagementService.deleteMember(id, adminId);
  }

  @Patch('team/:id/toggle')
  async toggleTeamMemberStatus(
    @Param('id') id: string,
    @Headers('authorization') auth: string,
  ) {
    const adminId = this.extractAdminId(auth);
    return this.teamManagementService.toggleStatus(id, adminId);
  }

  @Post('team/reorder')
  async reorderTeamMembers(
    @Body() data: { orderedIds: string[] },
    @Headers('authorization') auth: string,
  ) {
    const adminId = this.extractAdminId(auth);
    return this.teamManagementService.reorderMembers(data.orderedIds, adminId);
  }

  // ============ GESTION DES MOYENNES SECTORIELLES ============

  @Post('benchmarks/import')
  async importBenchmarks(
    @Body() data: { filePath: string },
    @Headers('authorization') auth: string,
  ) {
    this.extractAdminId(auth);
    // L'import sera géré par un service dédié
    return { message: 'Import endpoint créé' };
  }

  @Get('benchmarks')
  async getAllBenchmarks(
    @Headers('authorization') auth: string,
    @Query('sector') sector?: string,
    @Query('category') category?: string,
  ) {
    this.extractAdminId(auth);
    // Récupérer toutes les moyennes sectorielles
    return { message: 'Benchmarks endpoint créé' };
  }

  @Delete('benchmarks/:id')
  async deleteBenchmark(
    @Param('id') id: string,
    @Headers('authorization') auth: string,
  ) {
    this.extractAdminId(auth);
    return { message: 'Delete benchmark endpoint créé' };
  }

  @Delete('benchmarks')
  async deleteAllBenchmarks(@Headers('authorization') auth: string) {
    this.extractAdminId(auth);
    return { message: 'Delete all benchmarks endpoint créé' };
  }
}

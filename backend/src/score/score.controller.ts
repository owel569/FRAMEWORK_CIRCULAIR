import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { ScoreService } from './score.service';

@Controller('scores')
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) {}

  @Post('calculate')
  async calculateScore(@Body() body: { companyId: string; responses: any }) {
    return this.scoreService.calculateScore(body.companyId, body.responses);
  }

  @Get('company/:companyId')
  async getCompanyScores(@Param('companyId') companyId: string) {
    return this.scoreService.getCompanyScores(companyId);
  }

  @Get(':id')
  async getScore(@Param('id') id: string) {
    return this.scoreService.getScore(id);
  }
}

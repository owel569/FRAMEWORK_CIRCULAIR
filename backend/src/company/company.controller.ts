import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';

@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  async create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.create(createCompanyDto);
  }

  @Get()
  async findAll() {
    return this.companyService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.companyService.findOne(id);
  }
}

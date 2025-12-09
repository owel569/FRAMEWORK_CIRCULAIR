import { Injectable } from '@nestjs/common';

@Injectable()
export class DemoDataService {
  getDemoStats() {
    const demoData = {
      totalCompanies: 156,
      totalScores: 423,
      totalQuestions: 364,
      
      recentCompanies: this.generateRecentCompanies(),
      scoresByMonth: this.generateScoresByMonth(),
      sectorDistribution: this.generateSectorDistribution(),
      averageScores: this.generateAverageScores(),
      performanceTrends: this.generatePerformanceTrends(),
      topPerformers: this.generateTopPerformers(),
    };

    return demoData;
  }

  private generateRecentCompanies() {
    const companies = [
      { name: 'EcoTextile Maroc', sector: 'Industrie manufacturière', employeeCount: 45 },
      { name: 'GreenBuild Construction', sector: 'Construction / BTP', employeeCount: 78 },
      { name: 'AgriCircular', sector: 'Agriculture, sylviculture et pêche', employeeCount: 32 },
      { name: 'TechRecycle Solutions', sector: 'Informatique et télécommunications', employeeCount: 28 },
      { name: 'Hôtel Durable Casablanca', sector: 'Hôtellerie, restauration et tourisme', employeeCount: 65 },
      { name: 'Transport Vert', sector: 'Transport et logistique', employeeCount: 52 },
      { name: 'Énergie Renouvelable Maroc', sector: 'Énergie et environnement', employeeCount: 41 },
      { name: 'Commerce Équitable Rabat', sector: 'Commerce et distribution', employeeCount: 23 },
      { name: 'Artisans Circulaires', sector: 'Artisanat et métiers de proximité', employeeCount: 15 },
      { name: 'Services Verts PME', sector: 'Services aux entreprises', employeeCount: 19 },
    ];

    return companies.map((company, index) => ({
      id: `demo-company-${index}`,
      ...company,
      email: `contact@${this.sanitizeEmail(company.name)}.ma`,
      createdAt: new Date(Date.now() - (index * 86400000 * 3)),
      scores: [{
        id: `demo-score-${index}`,
        overallScore: Math.floor(55 + Math.random() * 35),
        governanceScore: Math.floor(50 + Math.random() * 40),
        economicScore: Math.floor(50 + Math.random() * 40),
        socialScore: Math.floor(50 + Math.random() * 40),
        environmentalScore: Math.floor(50 + Math.random() * 40),
        createdAt: new Date(Date.now() - (index * 86400000 * 3)),
      }],
    }));
  }

  private generateScoresByMonth() {
    const months = [];
    const now = new Date();
    
    for (let i = 11; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const month = date.toISOString().slice(0, 7);
      
      months.push({
        month,
        count: Math.floor(15 + Math.random() * 20),
        averageScore: Math.floor(60 + Math.random() * 20),
      });
    }
    
    return months;
  }

  private generateSectorDistribution() {
    const sectors = [
      'Agriculture, sylviculture et pêche',
      'Industrie manufacturière',
      'Construction / BTP',
      'Commerce et distribution',
      'Transport et logistique',
      'Énergie et environnement',
      'Santé et action sociale',
      'Informatique et télécommunications',
      'Hôtellerie, restauration et tourisme',
      'Artisanat et métiers de proximité',
      'Services aux entreprises',
      'Services aux particuliers',
      'Associations et ONG',
      'Autres secteurs émergents',
    ];

    return sectors.map(sector => ({
      sector,
      count: Math.floor(5 + Math.random() * 20),
      averageScore: Math.floor(55 + Math.random() * 30),
    }));
  }

  private generateAverageScores() {
    return {
      global: 68.5,
      governance: 65.2,
      economic: 71.3,
      social: 66.8,
      environmental: 70.7,
    };
  }

  private generatePerformanceTrends() {
    const trends = [];
    const now = new Date();
    
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const month = date.toISOString().slice(0, 7);
      
      const baseGovernance = 60 + (5 - i) * 2;
      const baseEconomic = 65 + (5 - i) * 2;
      const baseSocial = 62 + (5 - i) * 1.5;
      const baseEnvironmental = 68 + (5 - i) * 1.8;
      
      trends.push({
        month,
        governance: baseGovernance + Math.random() * 5,
        economic: baseEconomic + Math.random() * 5,
        social: baseSocial + Math.random() * 5,
        environmental: baseEnvironmental + Math.random() * 5,
      });
    }
    
    return trends;
  }

  private generateTopPerformers() {
    const performers = [
      { companyName: 'EcoLeader Industries', sector: 'Industrie manufacturière', overallScore: 92.5 },
      { companyName: 'GreenTech Innovations', sector: 'Informatique et télécommunications', overallScore: 89.3 },
      { companyName: 'Énergie Solaire Plus', sector: 'Énergie et environnement', overallScore: 87.8 },
      { companyName: 'BioAgri Maroc', sector: 'Agriculture, sylviculture et pêche', overallScore: 86.2 },
      { companyName: 'Construction Durable SA', sector: 'Construction / BTP', overallScore: 84.7 },
      { companyName: 'Transport Écologique', sector: 'Transport et logistique', overallScore: 83.5 },
      { companyName: 'Hôtel Vert Marrakech', sector: 'Hôtellerie, restauration et tourisme', overallScore: 82.1 },
      { companyName: 'Commerce Responsable', sector: 'Commerce et distribution', overallScore: 80.9 },
      { companyName: 'Artisanat Circulaire', sector: 'Artisanat et métiers de proximité', overallScore: 79.4 },
      { companyName: 'Services Verts Pro', sector: 'Services aux entreprises', overallScore: 78.2 },
    ];

    return performers.map((p, index) => ({
      ...p,
      rank: index + 1,
    }));
  }

  private sanitizeEmail(name: string): string {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '')
      .trim();
  }
}

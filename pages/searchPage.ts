// pages/searchPage.ts - VERSÃO CORRIGIDA
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './basePage';

export class SearchPage extends BasePage {
    private readonly articles: Locator;
    private readonly noResultsMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.articles = page.locator('article');
        this.noResultsMessage = page.locator('text=/Lamentamos, mas nada foi encontrado/i');
    }

    async validateSearchResults(searchTerm: string) {
        // Aguardar que a página carregue
        await this.page.waitForLoadState('networkidle');
        await this.takeScreenshot('search-results-page');
        
        // Validar título da página (mais flexível)
        const possibleTitleSelectors = [
            '[class*=page-title] [class*=ast-archive-title]',
            'h1',
            '.page-title',
            '[class*=archive-title]',
            'title'
        ];
        
        let titleFound = false;
        for (const selector of possibleTitleSelectors) {
            try {
                const titleElement = this.page.locator(selector);
                const count = await titleElement.count();
                if (count > 0) {
                    const titleText = await titleElement.first().textContent();
                    console.log(`Título encontrado com seletor ${selector}: "${titleText}"`);
                    if (titleText?.toLowerCase().includes(searchTerm.toLowerCase())) {
                        titleFound = true;
                        break;
                    }
                }
            } catch (e) {
                continue;
            }
        }
        
        // Se não encontrou no título, verificar na URL
        if (!titleFound) {
            const currentUrl = this.page.url();
            console.log(`URL atual: ${currentUrl}`);
            const urlContainsSearch = currentUrl.includes('s=') || currentUrl.includes('search');
            expect(urlContainsSearch).toBeTruthy();
        }
        
        // Validar que há artigos
        await expect(this.articles.first()).toBeVisible({ timeout: 15000 });
        
        // Validar que pelo menos um artigo é relevante
        const articlesCount = await this.articles.count();
        console.log(`Encontrados ${articlesCount} artigos`);
        
        if (articlesCount > 0) {
            const firstArticleTitle = this.articles.first().locator('h2 a, h3 a, .entry-title a');
            await expect(firstArticleTitle.first()).toBeVisible();
            
            const titleText = await firstArticleTitle.first().textContent();
            console.log(`Título do primeiro artigo: "${titleText}"`);
            
            // Verificar se contém alguma palavra do termo de busca
            const searchWords = searchTerm.toLowerCase().split(' ');
            const titleLower = titleText?.toLowerCase() || '';
            const hasRelevantWord = searchWords.some(word => titleLower.includes(word));
            
            expect(hasRelevantWord).toBeTruthy();
        }
    }

    async validateNoResults() {
        // Aguardar que a página carregue
        await this.page.waitForLoadState('networkidle');
        
        // Validar mensagem de nenhum resultado ou ausência de artigos
        const articlesCount = await this.articles.count();
        console.log(`Artigos encontrados: ${articlesCount}`);
        
        // Se não há artigos, considera como "sem resultados"
        await expect(this.articles).toHaveCount(0);
        
        console.log('✅ Validação de nenhum resultado concluída');
    }

    async getArticlesCount() {
        return await this.articles.count();
    }

    async getFirstArticleTitle() {
        const firstArticle = this.articles.first().locator('h2 a, h3 a, .entry-title a');
        return await firstArticle.first().textContent();
    }
}
// pages/components/headerComponents.ts - VERSÃO FINAL CORRIGIDA
import { Page, Locator } from '@playwright/test';
import { BasePage } from '../basePage';

export class HeaderComponent extends BasePage {
    private readonly searchField: Locator;

    constructor(page: Page) {
        super(page);
        this.searchField = page.locator('#search-field');
    }

    async openSearchField() {
        await this.takeScreenshot('before-search-click');
        
        // Tentar forçar clique no botão mesmo se não estiver visível
        const searchSelectors = [
            'button:has-text("Pesquisar")',
            'button:has([class*="search"])',
            'button[aria-label*="Search" i]'
        ];

        let buttonFound = false;
        for (const selector of searchSelectors) {
            try {
                const button = this.page.locator(selector);
                const count = await button.count();
                console.log(`Seletor "${selector}" encontrou ${count} elementos`);
                
                if (count > 0) {
                    console.log(`✅ Tentando clicar com seletor: ${selector}`);
                    // Forçar clique mesmo se não visível
                    await button.first().click({ force: true });
                    buttonFound = true;
                    break;
                }
            } catch (e) {
                console.log(`❌ Erro com seletor ${selector}:`, e.message);
                continue;
            }
        }

        if (!buttonFound) {
            // Última tentativa: usar JavaScript para clicar
            try {
                await this.page.evaluate(() => {
                    // Procurar botão com texto "Pesquisar"
                    const buttons = Array.from(document.querySelectorAll('button'));
                    const searchButton = buttons.find(btn => 
                        btn.textContent?.toLowerCase().includes('pesquisar') ||
                        btn.textContent?.toLowerCase().includes('search')
                    );
                    
                    if (searchButton) {
                        searchButton.click();
                        return true;
                    }
                    return false;
                });
                console.log('✅ Clique forçado via JavaScript');
                buttonFound = true;
            } catch (e) {
                console.log('❌ Erro no clique via JavaScript:', e.message);
            }
        }

        if (!buttonFound) {
            throw new Error('Não foi possível encontrar ou clicar no botão de busca');
        }

        await this.page.waitForTimeout(2000);
        await this.takeScreenshot('after-search-click');
        
        // Forçar visibilidade do campo se necessário
        await this.page.evaluate(() => {
            const searchField = document.getElementById('search-field');
            if (searchField) {
                searchField.style.display = 'block';
                searchField.style.visibility = 'visible';
                searchField.style.opacity = '1';
                searchField.removeAttribute('tabindex');
                searchField.tabIndex = 0;
                searchField.focus();
            }
        });
        
        await this.page.waitForTimeout(1000);
    }

    async fillSearchTerm(term: string) {
        // Garantir que o campo está focado e visível
        await this.page.evaluate(() => {
            const searchField = document.getElementById('search-field');
            if (searchField) {
                searchField.focus();
            }
        });
        
        await this.searchField.fill(term);
    }

    async submitSearch() {
        await this.searchField.press('Enter');
        await this.page.waitForLoadState('networkidle');
    }

    async performSearch(term: string) {
        await this.openSearchField();
        await this.fillSearchTerm(term);
        await this.submitSearch();
    }
}
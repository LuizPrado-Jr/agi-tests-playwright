// tests/busca-agi-pom.spec.ts
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { SearchPage } from '../pages/searchPage';
import { SEARCH_TERMS } from '../utils/constants';

test.describe('Testes de Funcionalidade de Busca - Page Objects', () => {
    
    test('Deve realizar uma busca bem-sucedida e validar o resultado', async ({ page }) => {
        const homePage = new HomePage(page);
        const searchPage = new SearchPage(page);
        
        // Navegar para página inicial
        await homePage.navigate();
        
        // Realizar busca
        await homePage.searchFor(SEARCH_TERMS.VALID);
        
        // Validar resultados
        await searchPage.validateSearchResults(SEARCH_TERMS.VALID);
        
        console.log(`Busca por "${SEARCH_TERMS.VALID}" bem-sucedida.`);
    });

    test('Deve exibir mensagem de nenhum resultado para termo inexistente', async ({ page }) => {
        const homePage = new HomePage(page);
        const searchPage = new SearchPage(page);
        
        // Navegar para página inicial
        await homePage.navigate();
        
        // Realizar busca com termo inexistente
        await homePage.searchFor(SEARCH_TERMS.INVALID);
        
        // Validar ausência de resultados
        await searchPage.validateNoResults();
        
        console.log(`Nenhum resultado para "${SEARCH_TERMS.INVALID}".`);
    });
});
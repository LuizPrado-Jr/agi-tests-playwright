// utils/test-helpers.ts
import { Page } from '@playwright/test';

export class TestHelpers {
    static async takeDebugScreenshot(page: Page, name: string) {
        await page.screenshot({ 
            path: `debug-${Date.now()}-${name}.png`, 
            fullPage: true 
        });
    }

    static async waitForPageLoad(page: Page) {
        await page.waitForLoadState('networkidle');
        await page.waitForSelector('body');
    }

    static generateRandomString(length: number = 10): string {
        return Math.random().toString(36).substring(2, length + 2);
    }
}
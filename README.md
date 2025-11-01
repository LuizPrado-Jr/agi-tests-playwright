# 🚀 Projeto de Testes Automatizados - Blog do Agi

Este projeto implementa testes automatizados para a funcionalidade de busca do Blog do Agibank usando **Playwright** com **TypeScript** e o padrão **Page Object Model (POM)**.

## 📋 Índice

- [🎯 Sobre o Projeto](#-sobre-o-projeto)
- [🏗️ Arquitetura](#️-arquitetura)
- [📁 Estrutura do Projeto](#-estrutura-do-projeto)
- [⚙️ Pré-requisitos](#️-pré-requisitos)
- [🔧 Instalação](#-instalação)
- [🚀 Execução dos Testes](#-execução-dos-testes)
- [📊 Relatórios](#-relatórios)
- [🧪 Cenários de Teste](#-cenários-de-teste)
- [💡 Boas Práticas Implementadas](#-boas-práticas-implementadas)
- [🔍 Debug e Troubleshooting](#-debug-e-troubleshooting)
- [📈 Melhorias Futuras](#-melhorias-futuras)

## 🎯 Sobre o Projeto

Este projeto automatiza os testes da funcionalidade de busca do **Blog do Agibank**, validando:
- ✅ Busca com resultados válidos
- ✅ Busca sem resultados (termos inexistentes)
- ✅ Relevância dos resultados encontrados
- ✅ Interface responsiva e funcional

### 🌐 Site Testado
- **URL**: https://blog.agibank.com.br/
- **Funcionalidade**: Sistema de busca de artigos

## 🏗️ Arquitetura

O projeto utiliza o padrão **Page Object Model (POM)** para:
- 📦 **Organização**: Separação clara entre páginas, componentes e testes
- 🔄 **Reutilização**: Componentes reutilizáveis em múltiplos testes
- 🛠️ **Manutenibilidade**: Alterações centralizadas em um local
- 📝 **Legibilidade**: Testes mais limpos e descritivos

## 📁 Estrutura do Projeto

O problema é que o GitHub está interpretando incorretamente a formatação do código no README. Vou corrigir a estrutura usando a formatação correta do Markdown. O problema está na seção de código que não está sendo renderizada adequadamente.

Vou atualizar a seção da estrutura do projeto no README com a formatação correta:


agi-tests-playwright/

├── 📂 .github/ # Configurações do GitHub
│ └── 📂 workflows/
│ └── 📄 playwright.yml # Pipeline CI/CD com GitHub Actions
│
├── 📂 pages/ 🏗️ # Page Object Model - Páginas
│ ├── 📄 basePage.ts # Classe base com funcionalidades comuns
│ ├── 📄 homePage.ts # Página inicial do Blog do Agi
│ ├── 📄 searchPage.ts # Página de resultados de busca
│ └── 📂 components/ # Componentes reutilizáveis
│ └── 📄 headerComponents.ts # Componente do cabeçalho (busca)
│
├── 📂 tests/ 🧪 # Testes automatizados
│ ├── 📄 buscaAgi.spec.ts # Cenários de teste da funcionalidade de busca
│ └── 📂 fixtures/ # Fixtures personalizadas
│ └── 📄 pageFixtures.ts # Fixtures para Page Objects
│
├── 📂 utils/ 🛠️ # Utilitários e helpers
│ ├── 📄 constants.ts # Constantes globais (URLs, termos de busca, timeouts)
│ └── 📄 testHelpers.ts # Funções auxiliares para testes
│
├── 📂 test-results/ 📊 # Resultados dos testes (auto-gerado)
│ ├── 📂 screenshots/ # Capturas de tela em caso de falha
│ ├── 📂 videos/ # Vídeos da execução dos testes
│ └── 📂 traces/ # Traces para análise detalhada
│
├── 📂 playwright-report/ 📈 # Relatórios HTML (auto-gerado)
│ ├── 📄 index.html # Relatório principal
│ └── 📂 data/ # Dados dos relatórios
│
├── 📂 node_modules/ 📦 # Dependências (auto-gerado)
│ └── ... (dependências do npm)
│
├── 📄 .gitignore 🚫 # Arquivos/pastas ignorados pelo Git
├── 📄 package.json 📋 # Configuração do projeto e dependências
├── 📄 package-lock.json 🔒 # Lock das versões das dependências
├── 📄 playwright.config.ts ⚙️ # Configuração do Playwright
├── 📄 README.md 📖 # Documentação do projeto (este arquivo)
└── 📄 .git/ 🌿 # Controle de versão Git (oculto)


## 🏗️ Arquitetura Detalhada

### 📂 Pages (Page Object Model)

**basePage.ts** - 🏛️ Classe base com funcionalidades comuns
- `goto()` - Navegar para páginas
- `takeScreenshot()` - Capturar screenshots  
- `waitForElement()` - Aguardar elementos
- `clickWithRetry()` - Clique com retry

**homePage.ts** - 🏠 Página inicial do Blog do Agi
- `navigate()` - Navegar para home
- `searchFor()` - Executar busca
- `header` - Componente de cabeçalho

**searchPage.ts** - 🔍 Página de resultados de busca
- `validateSearchResults()` - Validar resultados encontrados
- `validateNoResults()` - Validar ausência de resultados
- `getArticlesCount()` - Contar artigos
- `getFirstArticleTitle()` - Obter título do primeiro artigo

**components/headerComponents.ts** - 🎯 Componente de busca
- `openSearchField()` - Abrir campo de busca
- `fillSearchTerm()` - Preencher termo
- `submitSearch()` - Submeter busca
- `performSearch()` - Processo completo de busca

### 🧪 Tests (Cenários de Teste)

**buscaAgi.spec.ts** - 📝 Testes principais
- ✅ "Deve realizar uma busca bem-sucedida" - Cenário positivo
- ❌ "Deve exibir mensagem de nenhum resultado" - Cenário negativo

**fixtures/pageFixtures.ts** - 🏭 Fixtures personalizadas
- `homePage` - Instância da HomePage
- `searchPage` - Instância da SearchPage
- `allPages` - Todas as páginas

### 🛠️ Utils (Utilitários)

**constants.ts** - 📊 Constantes globais
- `URLS` - URLs do ambiente
- `SEARCH_TERMS` - Termos de busca
- `TIMEOUTS` - Timeouts padrão

**testHelpers.ts** - 🔧 Funções auxiliares
- `takeDebugScreenshot()` - Screenshots de debug
- `waitForPageLoad()` - Aguardar carregamento
- `generateRandomString()` - Gerar strings aleatórias


## ⚙️ Pré-requisitos

Antes de executar o projeto, certifique-se de ter instalado:

- **Node.js** (versão 18 ou superior)
- **npm** ou **yarn**
- **Git** (para clonar o repositório)

### 🔍 Verificar Versões

```bash
node --version    # v18.0.0 ou superior
npm --version     # 8.0.0 ou superior

Instalação
1️⃣ Clone o Repositório

git clone <url-do-repositorio>

cd Agi_tests

2️⃣ Instale as Dependências

npm install

3️⃣ Instale os Navegadores do Playwright

npx playwright install

4️⃣ Verificar Instalação

npx playwright --version

🚀 Execução dos Testes

🎬 Executar Todos os Testes

# Execução padrão (headless)
npm test

# ou
npx playwright test

👀 Executar com Navegador Visível

# Execução em modo headed (navegador visível)
npx playwright test --headed

🎯 Executar Testes Específicos

# Executar apenas os testes de busca
npx playwright test tests/buscaAgi.spec.ts

# Executar um teste específico
npx playwright test -g "busca bem-sucedida"

🔍 Executar com Debug

# Modo debug (pausa na execução)
npx playwright test --debug

# Debug de um teste específico
npx playwright test tests/buscaAgi.spec.ts --debug

📊 Executar com Diferentes Relatórios

# Relatório em lista
npx playwright test --reporter=list

# Relatório em linha
npx playwright test --reporter=line

# Relatório JSON
npx playwright test --reporter=json

📊 Relatórios

📈 Relatório HTML
Após a execução, um relatório HTML é gerado automaticamente:

# Abrir relatório HTML
npx playwright show-report

📸 Screenshots e Vídeos

Screenshots: Geradas automaticamente em caso de falha
Vídeos: Gravados para cada teste (configurável)
Traces: Disponíveis para análise detalhada

📍 Localização dos Artefatos

test-results/
├── screenshots/           # Capturas de tela
├── videos/               # Vídeos dos testes
└── traces/              # Traces para debug

🧪 Cenários de Teste

✅ Teste 1: Busca Bem-sucedida

Objetivo: Validar busca com termo que retorna resultados

Passos:

Navegar para a página inicial
Clicar no botão de busca
Inserir termo: "cartão de crédito"
Executar busca
Validar resultados relevantes

Validações:

✅ Título da página contém o termo buscado
✅ Artigos são exibidos
✅ Primeiro artigo é relevante ao termo

❌ Teste 2: Busca sem Resultados

Objetivo: Validar comportamento para termo inexistente

Passos:

Navegar para a página inicial
Clicar no botão de busca
Inserir termo inexistente: "zxywvutrqpplmnokj"
Executar busca
Validar ausência de resultados

Validações:

✅ Nenhum artigo é exibido
✅ Contador de artigos = 0

Boas Práticas Implementadas

🏗️ Page Object Model (POM)

Separação de responsabilidades: Cada página tem sua classe
Reutilização: Componentes compartilhados entre testes
Manutenibilidade: Seletores centralizados

🔧 Seletores Robustos

Múltiplas estratégias: Vários seletores para cada elemento
Fallbacks: JavaScript como último recurso
Logs detalhados: Para troubleshooting

📊 Configuração Otimizada

Apenas Chrome: Execução mais rápida
Modo headed: Visualização durante desenvolvimento
Timeouts apropriados: Aguarda carregamento completo

🛡️ Tratamento de Erros

Try-catch: Para seletores múltiplos
Force clicks: Para elementos não visíveis
Screenshots: Para análise de falhas

🔍 Debug e Troubleshooting

🐛 Problemas Comuns

❌ Elemento não encontrado
# Executar com debug visual
npx playwright test --debug --headed

❌ Timeout em elementos

# Aumentar timeout específico
await element.waitFor({ timeout: 30000 });

❌ Elementos não visíveis

# Forçar clique
await element.click({ force: true });

📸 Capturas de Debug

O projeto gera automaticamente:

debug-before-search-click.png: Antes de clicar na busca
debug-after-search-click.png: Após clicar na busca
debug-search-results-page.png: Página de resultados

🔍 Logs Detalhados

Console logs mostram:

Seletores tentados
Elementos encontrados
Sucessos e falhas
Títulos e contadores
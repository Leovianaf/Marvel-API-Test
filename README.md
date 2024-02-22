# | Teste prático MERX Energia - TI 2024 |

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Descrição geral:
Repositório com o projeto do teste técnico proposto para a vaga de estágio na empresa Merx Energia, feito por Leonardo Viana.

### Deploy do projeto
* O site está hospedado no Vercel e pode ser visualizado através do seguinte [link](https://testetecnico2024-leonardo.vercel.app/).

### Funcionalidades

* Lista todos os personagens retornados na requisição da API.
* Exibe os personagens em uma tabela com seus respectivos nomes, descrições e imagens.
* Contém uma barra de busca para buscar um personagem na API.
* Contém dois filtros para melhor visualização dos mesmos.
* Media Querys para se adaptar aos dispositivos mobile.

### Tecnologias Utilizadas
* Typescript
* NextJs (React)
* CSS

### Passo a passo para instalação e execução
Para executar este projeto, você precisa seguir estas etapas:

1. Instale o Node.js em seu computador a partir do site oficial: https://nodejs.org/ (O NPM será instalado junto e será essencial)

2. Clone este repositório para o seu computador:
```bash
git clone https://github.com/Leovianaf/testetecnico2024-leonardo.git
```

3. Navegue até a pasta do projeto e instale as dependências através do terminal com o seguinte código:
```bash
cd testetecnico2024-leonardo/
npm i
```

4. Não esqueça de configurar a variável de ambiente para executar o projeto. Você precisa criar um arquivo `.env`, e este arquivo deve conter:
```bash
NEXT_PUBLIC_PUBLIC_KEY={your_key}
NEXT_PUBLIC_PRIVATE_KEY={your_key}
```

5. Inicie o servidor de desenvolvimento do NPM:
```bash
npm run dev
```

### Tela inicial do App
![Preview Teste Tecnico1](/src/assets/img/Tela1.png)

### Filtrando apenas pela descrição
![Preview Teste Tecnico2](/src/assets/img/Tela2.png)

### Filtrando apenas pela imagem
![Preview Teste Tecnico3](/src/assets/img/Tela3.png)

### Filtrando pela descrição e pela imagem
![Preview Teste Tecnico4](/src/assets/img/Tela4.png)

## Preview em mobile
![Preview Teste Tecnico Mobile1](/src/assets/img/TelaMobile1.png)

![Preview Teste Tecnico Mobile2](/src/assets/img/TelaMobile2.png)
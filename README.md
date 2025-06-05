# Blog

Este repositório contém o código-fonte de um projeto de blog desenvolvido por [Jhonata Souza (einasota)](https://github.com/einasota). O projeto utiliza tecnologias modernas como TypeScript, Prisma e Docker para fornecer uma base sólida para desenvolvimento de aplicações web.

## Tecnologias Utilizadas

* **TypeScript**
* **Prisma**
* **Docker**
* **PNPM**

## Estrutura do Projeto

O projeto está organizado da seguinte forma:

* `src/`: Contém o código-fonte principal da aplicação.
* `prisma/`: Inclui os arquivos de configuração e migrações do Prisma.
* `docker-compose.yml`: Define os serviços Docker necessários para o ambiente de desenvolvimento.
* `package.json`: Gerencia as dependências do projeto.
* `tsconfig.json`: Configurações do compilador TypeScript.
* `.env.example`: Exemplo de arquivo de variáveis de ambiente.

## Pré-requisitos

Antes de iniciar, certifique-se de ter instalado:

* [Node.js](https://nodejs.org/)
* [PNPM](https://pnpm.io/)
* [Docker](https://www.docker.com/)

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/einasota/blog.git
   cd blog
   ```

2. Instale as dependências:

   ```bash
   pnpm install
   ```

3. Configure as variáveis de ambiente:

   ```bash
   cp .env.example .env
   ```

   Edite o arquivo `.env` conforme necessário.

4. Inicie os serviços com Docker:

   ```bash
   docker-compose up -d
   ```

## Uso

Após a instalação, você pode iniciar a aplicação com:

```bash
pnpm dev
```

A aplicação estará disponível em `http://localhost:3000`.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

## Licença

Este projeto está licenciado sob a Licença MIT. Consulte o arquivo [LICENSE](https://github.com/einasota/blog/blob/main/LICENSE) para obter mais informações.

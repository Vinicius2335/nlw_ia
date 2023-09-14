- ``npm i -g pnpm`` -> igual o npm porêm ele otimiza o espaço utilizado

# WEB
- ``pnpm create vite``
- shadcn/ui -> biblioteca com componente do radix, personalizaveis -> utiliza o radix + tailwind
  - instalar o tailwind
    - ``pnpm add -D tailwindcss postcss autoprefixer``
    - ``npx tailwindcss init -p``
    - configurar o tailwind.config
  - modificar o tsconfig
  - ``pnpm i -D @types/node``
  - configurar o vit.config
  - finalizando ``pnpm dlx shadcn-ui@latest init``
    - yes para o typescrip
    - style New York -> componentes menores, default -> componentes maiores
    - tonalidades de cinza -> zinc
    - indicar onde está o css global -> src/globals.css
    - css variables -> yes
    - localização do tailwind.config -> enter
    - cria uma pasta para os componentes -> enter
    - cria uma pasta para classes utilitarias -> enter
    - react server components -> no
    - yes
- adicionando o primeiro componente do shadcn-ui
  - ``pnpm dlx shadcn-ui@latest add button``
  - ele traz o componente para a pasta components/ui/button
- ``pnpm i lucide-react``
- ``pnpm dlx shadcn-ui@latest add separator``
- ``pnpm dlx shadcn-ui@latest add textarea``
- ``pnpm dlx shadcn-ui@latest add label``
- ``pnpm dlx shadcn-ui@latest add select``
- ``pnpm dlx shadcn-ui@latest add slider``

# Bug
````
Cannot find module '@radix-ui/react-separator' or its corresponding type declarations.
````
Solução: Reload vscode


- ``pnpm remove @radix-ui/react-separator``
- ``pnpm add @radix-ui/react-separator``

````
$ pnpm dlx shadcn-ui@latest add label

 ERR_PNPM_NO_MATCHING_VERSION  No matching version found for @babel/types@^7.22.18

This error happened while installing the dependencies of shadcn-ui@0.3.0
 at @babel/core@7.22.18

The latest release of @babel/types is "7.22.17".

Other releases are:
  * esm: 7.21.4-esm.4
  * next: 8.0.0-alpha.2

If you need the full list of all 140 published versions run "$ pnpm view @babel/types versions".
Progress: resolved 63, reused 62, downloaded 0, added 0
````
Solução: criar o componente manualmente

# Back
- ``pnpm init``
- ``pnpm i typescript @types/node tsx -D``
- ``pnpm i fastify``
- ``pnpm i prisma -D``
- ``pnpm prisma init --datasource-provider sqlite``
  - ``pnpm prisma migrage dev`` -> cria a migration após criar as tabelas
  - ``pnpm prisma studio`` -> visualizar a tabela no navegador
- ``pnpm i @fastify/multipart``
- ``pnpm i zod`` -> validação de objetos
- ``pnpm i openai``
- ``pnpm i dotenv -D`` -> para o uso de variaveis de ambiente
- ``pnpm i fastify/cors``


# Serviços para upload de arquivos
- Amazon S3
- Cloudflare R2
npm i -g pnpm -> igual o npm porêm ele otimiza o espaço utilizado

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

# Bug
- Cannot find module '@radix-ui/react-separator' or its corresponding type declarations.
- Reload vscode

pnpm remove @radix-ui/react-separator
pnpm add @radix-ui/react-separator

# Back

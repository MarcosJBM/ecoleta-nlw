<h1 align="center">
  <img alt="Ecoleta" src=".github/logoEcoleta.png" height="100px" />
  <br>Next Level Week #1<br/>
  Node.js | ReactJS | React Native
</h1>

<p align="center">
  <a href="#sobre">Sobre</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#layout">Layout</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#executar">Como Executar</a>
</p>

<p align="center">
  <img alt="Design do Projeto" width="780px" src=".github/designEcoleta.png" />
<p>

<a id="sobre"></a>

# 📖 Sobre o Projeto

O **Ecoleta** é uma aplicação Web e Mobile que ajuda pessoas a cadastrarem e encontrarem pontos de coleta de lixo.

Esta aplicação foi desenvolvida durante a **Next Level Week #1**, projeto da [Rocketseat](https://rocketseat.com.br/).

<a id="layout"></a>

# 🎨 Layout

Caso queira dar uma olhada no layout da aplicação, ele está disponivel no [Figma](<https://www.figma.com/file/9TlOcj6l7D05fZhU12xWT3/Ecoleta-(Booster)?node-id=0%3A1>).

<a id="tecnologias"></a>

# 🔩 Tecnologias

- [React.js](https://pt-br.reactjs.org/)
- [React Native](https://reactnative.dev/)
- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)

<a id="executar"></a>

# 🤔 Como Executar

<h2><strong>Pré-requisitos</strong></h2>

- É **necessário** possuir o **[Node.js](https://nodejs.org/en/)** instalado no computador.
- É **necessário** possuir o **[Git](https://git-scm.com/)** instalado e configurado no computador.
- É **necessário** possuir um gerenciador de pacotes, **[Yarn](https://yarnpkg.com/)** ou **[NPM](https://www.npmjs.com/)**.
- É **necessário** ter o **[Expo](https://expo.io/)** instalado de forma global na máquina.

## Passo 1: Clonando o Projeto na sua máquina:

Abra seu terminal, escolha um lugar para clonar o repositório e execute:

```sh
  git clone https://github.com/MarcosJBM/Ecoleta-NLW.git
```

## Passo 2: Configurando o Projeto:

Nas pastas **Server** e **Web** execute respectivamente:

```sh
 npm install e yarn install
```

Com isso, dependências do projeto serão instaladas.

Na pasta **Server** voce irá precisar criar o **banco de dados**, execute:

```sh
 npx knex migrate:up "nome da migration"
```

Faça isso com cada Migration.

Voce irá precisar criar uma Seed, execute:

```sh
 npm run knex:seed
```

## Passo 3: Executando a aplicação:

Para executar a aplicação **Web** e **Mobile** utilize:

```sh
 yarn start
```

Para executar o **Server**, utilize:

```sh
 npm run dev
```

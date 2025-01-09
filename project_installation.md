# Project Installation

## Author:

- [Hien Thuy, Tran Nguyen](https://github.com/JuliaThTranNguyen)

## IDE tools I use for this project:

- Visual Studio Code
- Command Prompt

## DB for this project:

- MySQL or PostgreSQL

## Tools I use for testing:

- API testing with Postman
- Unit testing with Jest/Karma
- End-to-end testing with Cypress

## Distribution:

- Linux OS, Ubuntu 24.04 LTS

## Languages I use for this project:

- TypeScript (JavaScript)
- HTML
- CSS & SCSS

## UI Framework & CSS Libraries I use for this project:

- Angular Material UI
- Tailwind CSS

## DB Schemas I use for this project:

- This project can be complete with out a specific Backend DB. For that instance, I use the data & API protocols from:

* [Fake Store APIs](https://fakeapi.platzi.com/)
* The [documentation](https://fakeapi.platzi.com/en/about/introduction/) can be visit here.

Other fake store APIs, such as:

- [Fake Store APIs](https://fakestoreapi.com/)
- The [documentation](https://fakestoreapi.com/docs) can be visit here.

It has all of the products, categories, users data & authentication process to be followed.

- Otherwise, you can create a Backend App to store & manage your own DB schema. THe Backend app can be written in any language you prefer.

---

# Environment Setup:

[Read this documentation before proceeding the next step](`./env_setup.md`)

---

# Project setup:

## How to create a new Angular project:

1/ Create a new Angular project:

```bash
ng new ecom-store --routing --standalone=false
```

- --standalone=false: Ensures the app is created with NgModules instead of standalone components.

- --routing: Creates a routing module.

Review these selections below when creating a new project:
[picture here]

2/ Navigate to the project directory & open it with VSCode:

```bash
cd ecom-store
code .
```

Run:

```bash
npm serve
```

To start the development server. There is no need to share the pseudonymous usage data with Angular Team. The local server will be running at `http://localhost:4200/`.

3/ Install dependencies:

a/ Install Angular Material UI:

To dowload Angular Material UI, run:

```bash
ng add @angular/material
```

[show picture here]
Type 'Y/y' to install the package.

[other picture here]
Choose any of the following options to set the default theme.

[other picture here]
Click on 'y' to enable global typography style & then select `Include & enable ` for Angular animation module.

Because the project is created as not standalone component, please be aware to add the required import after each package installation into the app.module.ts file. For instance:

How to activate the angular material UI package:
[picture here]

How to add in each of the needed angular material UI components:
[other picture here]

b/ Tailwind CSS installation:

For [documentation](https://tailwindcss.com/docs/installation/using-postcss), otherwise, please follow the steps below:

- Navigate to your main project directory.
- Run the following command:

```bash
npm install -D tailwindcss postcss autoprefixer
```

After the installation completes, you will need to initialize a configuration file for Tailwind CSS. Run the following command:

```bash
npx tailwindcss init
```

- Open the tailwind.config.js file in your project directory and add the following code:

[picture here]

- Then edit the default styles.css file within the src/ to import the Tailwind CSS settings:


## Learn how to create/generate components & services for your Angular project:
[Read this configuration file](`./angular_config.md`)


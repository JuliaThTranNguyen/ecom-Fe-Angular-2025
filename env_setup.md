# Environment Setup:

## Prerequisites

- Node.js
- Angular CLI
- Angular Devkit
- Visual Studio Code

## Node.js

1. How to install Node.js ?

- Go to [Node.js](https://nodejs.org/en/download/) and download the latest LTS version of Node.js.

a/ Install Node.js on Windows

- Double-click the .msi file to run the installer.
  Follow the installation wizard:

  - Accept the license agreement.
  - Choose the destination folder.
    - Select default components (recommended).
  - Click Install to start the process.

- Once installation is complete, click Finish.

b/ Install Node.js on macOS

    - Double-click the downloaded .pkg file.
    - Follow the prompts in the installer.
    - Once the installation is complete, Node.js and npm (Node Package Manager) will be installed.

c/ Install Node.js on Linux

- Use your package manager or the binary provided on the website.

  - For Debian-based systems (e.g., Ubuntu):

- Run the installer and follow the instructions.

```bash
sudo apt update
sudo apt install -y nodejs npm
```

- Alternatively, use nvm (Node Version Manager) for more flexibility:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
source ~/.bashrc
nvm install node
```

2/ Verify Installation:

- OPen the terminal or command prompt. & type:

```bash
node -v
npm -v
```

- If the installation was successful, the version number will be displayed. If not, check the installation steps.

3/ Install Angular CLI:

- Open the terminal or command prompt. & type:

```bash
npm install -g @angular/cli
```

4/ Install Angular Devkit:

- Open the terminal or command prompt. & type:

```bash
npm install -g @angular-devkit/schematics-cli
```

5/ Install Visual Studio Code:

- Go to [Visual Studio Code](https://code.visualstudio.com/download) and download the latest version of Visual Studio Code.
- Run the downloaded file and follow the installation wizard.
- Once installation is complete, Visual Studio Code will be launched.

6/ Verify Installation:

- Open the terminal or command prompt. & type:

```bash
node -v
npm -v
ng version
```

- If the installation was successful, the version number will be displayed. If not, check the installation steps.

---

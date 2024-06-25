# Project Starter Guide 🚀😡

Oooh cicciooooa

## Stack

- **Frontend**: Ionic/Angular
- **UI**: Ionic UI
- **Backend**: NestJS
- **Database**: Supabase

## Overview

### Ionic
Ionic is an open-source mobile UI toolkit for building high-quality, cross-platform native and web app experiences. Check out the [Ionic Documentation](https://ionicframework.com/docs/).

### Ionic UI Components
Ionic comes with a rich set of UI components. You can explore them [here](https://ionicframework.com/docs/components).

### TailwindCSS (Optional)
TailwindCSS is a utility-first CSS framework for rapidly building custom designs. If you want to use it, follow the installation guide [here](https://tailwindcss.com/docs/installation).

### Angular 18
Angular is a platform for building mobile and desktop web applications. For more information, visit the [Angular Overview](https://angular.dev/overview).

### NestJS
NestJS is a progressive Node.js framework for building efficient, reliable, and scalable server-side applications. Learn more [here](https://nestjs.com).

### General Telegram Mini App
Learn about building mini apps for Telegram [here](https://docs.telegram-mini-apps.com/platform/about).

### Telegram Library JS
For interacting with Telegram in your project, refer to the [Telegram JS SDK Documentation](https://docs.telegram-mini-apps.com/packages/tma-js-sdk).

## Before Starting the Project

1. **Change Branch**: Ensure you are on the dev branch. To change branch:
    ```bash
    git checkout dev
    ```
2. **Install Node.js**: Ensure you have Node.js version `v20.12.2` installed. Use [nvm](https://nvm.sh) command line to manage nodejs versions
3. **VSCode Extensions**: Install the recommended VSCode extensions for Ionic, Angular, Nestjs, Javascript debugger, **Thunder Client**.
4. **Global CLI Tools**: Install Ionic and Nest CLI globally by running the following commands:
    ```bash
    npm install -g @ionic/cli @nestjs/cli localtunnel

    ```

## Configure and Start the Backend

1. **Environment Variables**: Create a file named `.env` inside the backend folder and add the required environment variables. You can find the required content [here](https://drive.google.com/drive/folders/1puRkZH-ib7z6U-0h4_ra6CioTms1ikdO).

2. **Install Dependencies and Start Backend**:
    ```bash
    cd backend
    npm install
    npm run start:dev
    ```
**Or start in debug mode if you want**:
    ```bash
    npm run start:debug
    ```
    
## Start the Frontend

1. **Install Dependencies and Serve Frontend**:
    ```bash
    cd frontend
    npm install
    ionic serve
    ```

## Make example requests to the backend
Test if the backend works correctly using postman or the vscode extension **Thunder Client**. 
You can try the endpoints:
- http://localhost:3000/
- http://localhost:3000/tenants

done 🎉

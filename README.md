# Project Starter Guide 🚀😡

Oooh ciccioooo

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

1. **Install Node.js**: Ensure you have Node.js version `v20.12.2` installed.
2. **VSCode Extensions**: Install the recommended VSCode extensions for Ionic & Angular.
3. **Global CLI Tools**: Install Ionic and Nest CLI globally by running the following commands:
    ```bash
    npm install -g @ionic/cli @nestjs/cli
    ```

## Configure and Start the Backend

1. **Environment Variables**: Create a file named `.env` inside the backend folder and add the required environment variables. You can find the required content [here](https://drive.google.com/drive/folders/1puRkZH-ib7z6U-0h4_ra6CioTms1ikdO).

2. **Install Dependencies and Start Backend**:
    ```bash
    cd backend
    npm install
    npm run start:dev
    ```

## Start the Frontend

1. **Install Dependencies and Serve Frontend**:
    ```bash
    cd frontend
    npm install
    ionic serve
    ```

done 🎉

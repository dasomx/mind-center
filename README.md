# Mind Center

## About this project

Mind Center is dedicated to providing support and vocational training to individuals affected by the traumatic events in the Jaranwala region of Pakistan. In August 2023, a fire caused significant damage to the local church and its congregation. In response, various organizations, including a team from Korea certified by the UN for trauma treatment methods, are offering their assistance.

Our organization operates a trauma center and provides essential vocational training to help individuals rebuild their lives. In collaboration with the Future Talent Training Center, we are planning to conduct a comprehensive computer training course. As an affiliate of a university, we have been preparing for this cooperation to ensure the highest quality of training and support.

## Project Setup

To set up the project, follow these steps:

1. Clone the repository:
```bash
git clone <repository-url>
cd <repository-directory>
```

2. Create a .env file and add the necessary environment variables.
3. Install dependencies:
```bash
npm install
```

4. Start the Firebase local emulator:
```bash
npm run emulator
```

5. In a separate terminal, start the development server and open the app in a new browser tab:
```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Deployment

Our deployment process is automated using Firebase Hosting. After a developer submits a pull request and it is approved by a maintainer, the changes are merged into the `main` branch. This triggers an automatic build and deployment to Firebase Hosting.

## Contributing

We welcome contributions to improve the Mind Center project. If you are interested in helping out, please follow these steps:

1. Choose an issue from the issues list.
2. Comment on the issue to notify others that you will be working on it.
3. Create a branch for your issue. The branch name should follow the format yourID/issue{issue #}. For example, if your ID is choipd and you are working on issue #3, the branch name should be `choipd/issue3`.

```bash
git checkout -b yourID/issue{issue #}
```

4. Once you’ve made your changes, push the branch to the repository and submit a pull request.
5. After your pull request is reviewed and merged into the main branch, the changes will be automatically deployed to production.

## Contact

For any inquiries or further information, please contact us at info@dasomx.com

Thank you for supporting Mind Center and helping us make a difference in the lives of those affected by trauma.

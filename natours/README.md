## Setup typescript with express

1. Install the typescript, ts-node and types for express and nodes

```bash
npm i -D typescript ts-node @types/express @types/node
```

2. Generate the tsconfig.json file

```bash
npx tsc --init
```

3. Default options and what they mean : <br>
   **target**: Enables the specification of the target JavaScript version that the compiler will output<br>
   **module**: Facilitates the utilization of a module manager in the compiled JavaScript code, CommonJS is supported and is a standard in Node.js<br>
   **strict**: Toggles strict type-checking protocols<br>
   **esModuleInterop**: Enables the compilation of ES6 modules to CommonJS modules<br>
   **skipLibCheck**: When set to true, bypasses type-checking of default library declaration files<br>
   **forceConsistentCasingInFileNames**: When set to true, enforces case-sensitive file naming<br>

4. Change the output directory to dist

```json
{
  "compilerOptions": {
    ...
    "outDir": "./dist"
    ...
  }
}
```

5. The app.ts should look like this now

```ts
// ./app.ts
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});
```

6. You can use ts-node to open the app.ts file

```shell
npx ts-node app.ts
```

7. Change the scripts in the package.json file

```json
"scripts": {
    "build": "npx tsc",
    "start": "node dist/app.js",
    "dev": "nodemon -x ts-node app.ts"
  }
```

### Tools to use with typescript

1. https://transform.tools/json-to-typescript

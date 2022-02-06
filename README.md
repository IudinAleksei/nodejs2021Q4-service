# RS School REST service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker Engine and Docker Compose - [Download & Install Docker Desktop](https://www.docker.com/get-started)

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Running application in docker container

```
npm run docker:start
```

Make sure that you have Docker Engine and Docker Compose installed and running
After that run the command above - two docker images will be created and REST service will be started in docker container

For stop application:

```
npm run docker:stop
```

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm test
```

To run only one of all test suites (users, boards or tasks)

```
npm test <suite name>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization (users, boards or tasks)

```
npm run test:auth <suite name>
```

## Development

If you're using VSCode, you can get a better developer experience from integration with [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extensions.

### Auto-fix and format

```
npm run lint
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging

# Artillery report

## Express

<html>
<body>
<!--StartFragment--><h4 style="box-sizing: border-box; font-family: sans-serif; font-weight: 500; line-height: 1.1; color: rgb(51, 51, 51); margin-top: 10px; margin-bottom: 10px; font-size: 18px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(252, 252, 252); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">Summary</h4>

| Test duration           | 40 sec |
| ----------------------- | ------ |
| Virtual Users created   | 641    |
| Virtual Users completed | 641    |

<!--EndFragment-->
</body>
</html>
<html>
<body>
<!--StartFragment--><h4 style="box-sizing: border-box; font-family: sans-serif; font-weight: 500; line-height: 1.1; color: rgb(51, 51, 51); margin-top: 10px; margin-bottom: 10px; font-size: 18px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(252, 252, 252); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">Counters</h4><p style="box-sizing: border-box; margin: 0px 0px 10px; font-family: sans-serif; font-size: 13.3333px; color: rgb(51, 51, 51); font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(252, 252, 252); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"></p>

| vusers.created_by_name.Users | 641  |
| ---------------------------- | ---- |
| vusers.created               | 641  |
| http.requests                | 3205 |
| http.codes.200               | 1923 |
| http.responses               | 3205 |
| http.codes.201               | 641  |
| http.codes.204               | 641  |
| vusers.failed                | 0    |
| vusers.completed             | 641  |

<!--EndFragment-->
</body>
</html>

## Fastify

<html>
<body>
<!--StartFragment--><h4 style="box-sizing: border-box; font-family: sans-serif; font-weight: 500; line-height: 1.1; color: rgb(51, 51, 51); margin-top: 10px; margin-bottom: 10px; font-size: 18px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(252, 252, 252); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">Summary</h4>

| Test duration           | 40 sec |
| ----------------------- | ------ |
| Virtual Users created   | 662    |
| Virtual Users completed | 662    |

</div></div></div><!--EndFragment-->
</body>
</html>                                            
<html>
<body>
<!--StartFragment--><h4 style="box-sizing: border-box; font-family: sans-serif; font-weight: 500; line-height: 1.1; color: rgb(51, 51, 51); margin-top: 10px; margin-bottom: 10px; font-size: 18px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(252, 252, 252); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">Counters</h4><p style="box-sizing: border-box; margin: 0px 0px 10px; font-family: sans-serif; font-size: 13.3333px; color: rgb(51, 51, 51); font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(252, 252, 252); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"></p>

| vusers.created_by_name.Users | 662  |
| ---------------------------- | ---- |
| vusers.created               | 662  |
| http.requests                | 3310 |
| http.codes.200               | 1986 |
| http.responses               | 3310 |
| http.codes.201               | 662  |
| http.codes.204               | 662  |
| vusers.failed                | 0    |
| vusers.completed             | 662  |

<!--EndFragment-->
</body>
</html>

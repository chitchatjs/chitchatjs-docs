# Directory Structure

You can use CJS using Typescript or Javascript and `npm` package manager. Following shows Typescript project structure.

![Dir](../images/dir-structure.png)

In the `index.ts` file, we define our entire application, which is then used by Chitchat as a hook to generate all the artifacts, dialog engine and wire all the blocks and their implementation together automatically.

Package comes with one Chitchat dependency - `@chitchatjs/alexa` - an Alexa oriented building block library, which depends on the core library `@chitchatjs/core`. We will use components from these libraries to manufacture our voice interfaces.

## Building a package

When you use `cjs build` to build your project, it creates a `/pkg` directory in your skill project. This directory will contain all the generated artifacts, your skill code etc. When you deploy using `cjs deploy`, it deploys the content of the `/pkg` directory.

::: tip
You must commit this directory, because removing this directory will cause cjs to generate a new skill id. There are ways to update the skill id in the generate `/pkg`. But keeping `/pkg` in a git repo is much easier!
:::

::: tip
You can also configure the output directory to something else as well. Check the [build configuration section](./configuration).
:::

## Build Configurations

Build configurations are defined in the `cjs.json` in your project root.

```json
{
  "outDir": "./pkg",
  "target": "Alexa"
}
```

| Config   | Description                                     | Required |
| -------- | ----------------------------------------------- | -------- |
| `outDir` | Location of the output directory.               | Yes      |
| `target` | Platform you want to deploy to. Can be `Alexa`. | Yes      |

## Deploy

Deploys the project to the target platform.

```
$ cjs deploy
```

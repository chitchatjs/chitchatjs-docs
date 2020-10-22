# Writing a Plugin

A plugin is simply a building block that is either built on top of the existing building blocks or is built from scratch.

## Setup plugin package

You can use Javascript or Typescript to build a plugin package. Here we will demonstrate Typescript.

```sh
mkdir weather && cd $_
npm init --yes
```

::: tip Tip
It is strongly recommended to use the package name format `"chitchatjs-plugin-[your-plugin-name]"` so that others can find it. For example - `chitchatjs-plugin-weather`
:::

Install dependencies:

```sh
npm i @chitchatjs/alexa@latest --save
# you may also need to install typescript dependencies, if using TS
```

## Option 1: Build on top of existing building block

This is the most common way to writing a plugin. A simple building block plugin to add an experience for "weather":

In your `index.ts` :

```ts
export default ax
  .whenUserSays(["how is the weather"])
  .then(ax.say("weather is nice"))
  .build();
```

## Option 2: Build from scratch

This provides you more control as you can do more.

Create a class in `WeatherBlockBuilder.ts`

```ts
import { AskSpeechBlock, WhenBlock } from "@chitchatjs/core";

interface WeatherBlock extends AlexaBlock {
  type: "WeatherBlock";
}

export class WeatherBlockBuilder {
  build(): WeatherBlock {
    return {
      type: "WeatherBlock",
      execute: this._executor,
      build: this._builder,
    };
  }

  /**
   * This is where you will handle the runtime request and modify the response.
   */
  private _executor = (context: AlexaDialogContext, event: AlexaEvent): void => {};

  /**
   * This is where you will handle compilation/build
   * and generate artifacts such as intents, slots etc.
   */
  private _builder = (context: AlexaBuilderContext) => {};
}
```

then in `index.ts` export:

```ts
export default () => {
  return new WeatherBlockBuilder();
};
```

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

Building from scratch is also super easy. You can provider a `builder` or an `executor` or both. Builder builds the artifacts during build time and executor executes the user request.

```ts
export default ax
  .custom()
  .builder((c: AlexaBuilderContext) => {
    // specify how this plugin will update the builder context.
    return ax.intent("WeatherIntent", ["how is the weather"]).build();
  })
  .executor((c: AlexaDialogContext, e: AlexaEvent) => {
    // specify what this plugin would do in the run time.

    // 1. manipulate the response manually
    let res = ResponseFactory.init();
    res.speak("weather is nice");
    c.currentResponse = res;

    // 2. or use existing building block:
    return ax.say("weather is nice");
  })
  .build();
```

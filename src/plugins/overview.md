# Plugins

Plugins are a great way to enrich your development and reuse as much as possible. Plugins are components that expose more building blocks than what platform provides. They may be higher level conversational constructs such as _"greeting a good morning"_ or a lower level construct such as a rich APL template home screen building block.

## Platform Developed

- [@chitchatjs/alexa](https://www.npmjs.com/package/@chitchatjs/alexa) - 🔥 Core Alexa building blocks library.
- [@chitchatjs/plugin-ax-common](https://www.npmjs.com/package/@chitchatjs/plugin-ax-common) - 🧩 A library of some common building blocks such as fallback, stop, help handlers.
- [@chitchatjs/plugin-ax-session](https://www.npmjs.com/package/@chitchatjs/plugin-ax-session) - 🧩 A library of session management building blocks that allow you to manipulate and customize session.
- [@chitchatjs/plugin-ax-display](https://www.npmjs.com/package/@chitchatjs/plugin-ax-display) - 🧩 A library of display related building blocks, prebuilt APL layouts and more.
- [@chitchatjs/plugin-ax-card](https://www.npmjs.com/package/@chitchatjs/plugin-ax-card) - 🧩 A library of building blocks to display Cards in Alexa App.

## Examples

```ts
import { ax } from "@chitchatjs/alexa";
import { common } from "@chitchatjs/plugin-ax-common";

ax.compound()
  .add(
    ax
      .whenLaunch()
      .then(ax.say("Hello world!"))
      .build()
  )
  // automatically add help, stop, fallback handlers
  .add(common.defaultHandlers())
  .build();
```

or customize

```ts
common.defaultHandlers({
  help: ax
    .ask("You can ask me a number, I will say that number back.")
    .reprompt("What is your number?")
    .build(),
});
```

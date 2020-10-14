# Getting Started

## What is Chitchat.js? <Badge text="beta" />

Chitchat (or CJS) is a framework for building voice driven multi-modal user interfaces (a.k.a. VUI). Chitchat is designed to be incrementally adaptable. You can write a simple rule based voice user interface or as complex as a machine learnt model based VUI. Chitchat comes with three primary components - core library (`@chichatjs/core`), a CLI (`@chitchatjs/cli`) and the implementation strategies (dialog management) which may or may not be platform dependent. We offer `@chitchatjs/alexa` to seamlessly integrate your voice user interface with Alexa.

`@chichatjs/core` is a primitive base that defines core framework premitives that are voice-platform and dialog management strategy agnostic. `@chitchatjs/cli` provides an easy command access to create a project, build and deploy it (only supported for Alexa platform right now). `@chitchatjs/alexa` is a collection of VUI components designed on top of the core library specifically for Alexa Skill development.

## Prerequisites

Chitchat requires the following dependencies:

- Node.js
- [ASK CLI (configured)](https://www.npmjs.com/package/ask-cli)

## Quick Start

![An image](../images/gifs/create-project.gif)

1. Install CLI

```sh
npm install -g @chitchat/cli
```

2.  Create a new project

Projects can be created from a prebuilt template. CJS is agnostic of the Node language you use, you can use Typescript or Javascript based templates. You can also install new templates to your cli, check [templates](/guide/templates) section.

```sh
cjs new
```

3. Build the project

Building a project generates all the required artifacts, and the backend infrastructure.

::: warning Caution
For Typescript projects, make sure you perform `tsc` first.
:::

```sh
cjs build
```

4. Deploy

Deploy command deploys the generated project to the chosen platform.

```sh
cjs deploy
```

::: tip Note
Examples below are shown using the Alexa implementation `@chitchatjs/alexa` of the framework.
:::

## Examples

### Hello World

```ts
import { alexa as ax } from "@chitchatjs/alexa";

// A sample conversation
let initialState = ax
  .start()
  .block(ax.say("Hello world!"))
  .build();

// Skill instance that wires all the
// everything together
let skill = ax
  .skill()
  .addState(initialState)
  .build();

export = ax.dialogManager(skill).exports();
```

Output:

```
User: open my skill
Alexa: Hello world!
```

### Food Menu

```ts
import { alexa as ax } from "@chitchatjs/alexa";

let initialState = ax
  .start()
  .block(ax.ask("Welcome, do you want menu for breakfast, lunch or dinner?").build())
  .block(ax.goto("food-menu"))
  .build();

let foodMenuState = ax
  .state("food-menu")
  .block(
    ax
      .compound()
      .add(
        ax
          .whenUserSays(["breakfast", "i want breakfast"])
          .then(ax.say("okay I have egg omlette for breakfast today."))
          .build()
      )
      .add(
        ax
          .whenUserSays(["lunch", "i want lunch"])
          .then(ax.say("okay I have biryani for lunch today."))
          .build()
      )
      .add(
        ax
          .whenUserSays(["dinner", "i want dinner"])
          .then(ax.say("okay I have chicken curry, roti for dinner today."))
          .build()
      )
      .build()
  )
  .build();

let skill = ax
  .skill()
  .addState(initialState)
  .addState(foodMenuState)
  .build();

export = ax.dialogManager(skill).exports();
```

Output:

```
U: open my skill
A: Welcome, do you want menu for breakfast, lunch or dinner?
U: lunch
A: okay I have biryani for lunch today
```

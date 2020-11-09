# Getting Started

## What is chitchat.js?

Chitchat.js (or CJS) is a framework for building voice driven multi-modal user interfaces (a.k.a. VUI). Chitchat is designed to be incrementally adaptable. Chitchat comes with three primary components - core library (`@chichatjs/core`), a CLI (`@chitchatjs/cli`) and the implementation strategies (dialog management) which may or may not be platform dependent. It offers `@chitchatjs/alexa` to seamlessly integrate your voice user interface with Alexa.

`@chichatjs/core` is a primitive base that defines core framework premitives that are voice-platform and dialog management strategy agnostic. `@chitchatjs/cli` provides an easy command access to create a project, build and deploy it (only supported for Alexa platform right now). `@chitchatjs/alexa` is a collection of VUI components designed on top of the core library specifically for Alexa Skill development.

## Prerequisites

Chitchat requires the following dependencies:

- Node.js
- [ASK CLI (configured)](https://www.npmjs.com/package/ask-cli)

## Quick Start

**1. Installation**

```sh
npm i -g @chitchatjs/cli
```

**2. Creating a new project**

```sh
# then choose a starting template
cjs new
```

**3. Build the project**

```sh
# tsc only if it is a typescript project
tsc && cjs build
```

**4. Deploy**

```sh
cjs deploy
```

**5. And test..**

You can either go to [Alexa Developer Console](https://developer.amazon.com) and open your skill and then go to the test tab.
Or you can use [ask dialog command](https://developer.amazon.com/en-US/docs/alexa/smapi/ask-cli-command-reference.html#dialog-command) to test your dialog in CLI itself.

```sh
cd pkg/ # generated output
ask dialog -l en-US

U> open my skill
A> hello world!
```

## Demo and Tutorials

<br/>
<iframe width="560" height="315" src="https://www.youtube.com/embed/-1Qwf7E8e-M" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

## Writing a simple skill

To get started, simply write this in your index.ts

```ts
import { ax } from "@chitchatjs/alexa";

let state = ax
  .start()
  .block(ax.say("Hello world"))
  .build();

// create our skill using the state above
let skill = ax
  .skill()
  .addState(state)
  .build();
exports = ax.dialogManager(skill).exports();
```

Output:

```
U: open <skill-name>
A: Hello world
```

Let's add a dialog turn to ask user their name:

```ts
let state = ax
  .start()
  .block(
    ax
      .compound()
      .add(
        ax
          .whenLaunch()
          .then(ax.ask("Hello, what is your name?").build())
          .build()
      )
      .add(
        ax
          .whenUserSays(["my name is {name}"])
          .withSlotType("name", builtins.SlotType.FirstName)
          .then(ax.say("Welcome, {name}! It's nice to talk to you."))
          .build()
      )
      .build()
  )
  .build();
```

Output:

```
U: open <skill name>
A: Hello, what is your name?
U: my name is kevindra
A: Welcome, kevindra! It's nice to talk to you.
```

Build and deploy using ChitchatJS CLI:

```sh
> tsc
> cjs build
> cjs deploy
```

That's it!

## Deploy to your stack using code

Wrap this in your stack module and deploy as code:

```ts
const handler = ax.dialogManager(skill).handler();
```

### AWS Lambda

```ts
import { Function, Runtime, AssetCode, Code } from "@aws-cdk/aws-lambda";

// ...
this.lambdaFunction = new Function(this, props.functionName, {
  functionName: props.functionName,
  handler: "handler.handler",
  runtime: Runtime.NODEJS_10_X,
  code: new AssetCode(`./src`), // points to your skill module
  memorySize: 512,
  timeout: Duration.seconds(10),
});
```

### Express JS

```ts
import * as express from "express";
import skill from "./src/skill";

const app = express();
const port = 3000;

app.get("/", skill.express());

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
```

## Test

Test using [alexa-skill-test-framework](https://www.npmjs.com/package/alexa-skill-test-framework).

```ts
import "mocha";
import skill from "../src/index";
const alexaTest = require("alexa-skill-test-framework");

describe("Hello World Skill", function() {
  alexaTest.initialize(skill, "appId", "userId", "deviceId");

  alexaTest.test([
    {
      request: alexaTest.getLaunchRequest(),
      says: "Hello World",
      shouldEndSession: true,
    },
  ]);
});
```

## Packages

1. [chitchat.js core library](https://www.npmjs.com/package/@chitchatjs/core)
2. [chitchat.js alexa library](https://www.npmjs.com/package/@chitchatjs/alexa)
3. [chitchat.js cli](https://www.npmjs.com/package/@chitchatjs/cli)

**Sample Skills**

1. [Hello bot](https://github.com/chitchatjs/hello-bot-template)
2. [Dog Matcher](https://github.com/chitchatjs/pet-match-template)
3. [High log game](https://github.com/chitchatjs/high-low-game)
4. [Coffee shop](https://github.com/chitchatjs/coffee-shop)
5. [Workout Buddy](https://github.com/chitchatjs/workout-buddy)

**Plugins**

1. [@chitchatjs/plugin-ax-common](https://www.npmjs.com/package/@chitchatjs/plugin-ax-common)
2. [@chitchatjs/plugin-ax-session](https://www.npmjs.com/package/@chitchatjs/plugin-ax-session)
3. [@chitchatjs/plugin-ax-display](https://www.npmjs.com/package/@chitchatjs/plugin-ax-display)
4. [@chitchatjs/plugin-ax-card](https://www.npmjs.com/package/@chitchatjs/plugin-ax-display)

## Comparison

| Skill         | Standard SDK (code lines) | chitchat.js (code lines) |
| ------------- | ------------------------- | ------------------------ |
| Hello World   | 250 lines                 | 80 lines                 |
| Dog Matcher   | 1000 lines                | 140 lines                |
| High low game | 400 lines                 | 212 lines                |

# Testing a chitchat.js project

We can use external Alexa test framework to test our skill.

```sh
npm install alexa-skill-test-framework --save-dev
```

Let's say you defined your skill like:

```ts
import { ax } from "@chitchatjs/alexa";

const state = ax
  .start()
  .block(ax.say("Hello World"))
  .build();

const skill = ax
  .skill()
  .addState(state)
  .build();

export = ax.dialogManager(skill).exports();
```

Define your test :

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

Run tests:

```sh

  Hello World Skill
    ✓ returns the correct responses

  1 passing (7ms)
```

See end to end working tests [here](https://github.com/chitchatjs/hello-bot-template/blob/main/test/index.test.ts).

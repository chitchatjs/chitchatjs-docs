# Directory Structure

A Chitchat project will look something like this. It may be a Typescript or Javascript package using `npm` package manager.

![Dir](../images/dir-structure.png)

In the `index.ts` file, we define our entire application, which is then used by Chitchat as a hook to generate all the artifacts, dialog engine and wire all the blocks and their implementation together automatically.

Package comes with couple of Chitchat dependencies - `@chitchatjs/core` - a core primitive library and `@chitchatjs/alexa` - an Alexa oriented building block library. We will use components from these libraries to manufacture our voice interfaces.

Let's take a look how a simple dialog might look like in CJS.

## First Dialog

Let's take a simple example, where we want to listen to an event where user says `"hello agent"` to our application and application says `"hello world"` back. To do this, we need to build a Block.

```ts
import { blocks } from "@chitchatjs/core";

let greetingBlock = blocks
    .when()
    .userSays(["hello agent"])
    .then(blocks.says("hello world!").build())
    .build();
```

Output:

```
User: hello agent
Agent: hello world!
```

Now, we can make it better by adding dynamic data into it:

```ts
let personalizedGreetingBlock = blocks
    .compound()
    // A block to set the user name in the state
    .add(
        blocks
            .setStateVar()
            .set((ctx: Context, event: Event) => {
                return { name: myDB.getUserName() };
            })
            .build()
    )
    // A block to render speech
    .add(
        blocks
            .when()
            .userSays(["hello agent"])
            .then(blocks.say("hello world, {name}!").build())
    )
    .build();
```

Output:

```
User: hello agent
Agent: hello world, Kevindra!
```

As you can see, `{name}` will carry the state from the previous block automatically.

## Deploying Skill

To make use of the `personalizedGreetingBlock` we wrote above, we will need to plug it into our skill code. All the dialogs and logic come together in the `index.ts` file. From which, you need to export two variables.

```ts
/**
 * This exports a handler for the AWS Lambda function.
 */
export const handler = dm.handler();

/**
 * This exports the skill object for the dialog manager to properly generate artifacts during the build process.
 */
export default skill;
```

To deploy to Alexa, you will first need to instantiate an Alexa specific dialog manager with an engine for it to handle runtime dialogs (a.k.a. `DialogEngine`). `@chitchatjs/alexa` library provides default Dialog manager and a default dialog engine you might want to use.

```ts
let dm = new AlexaDialogManager(mySkill, new RuleBasedDialogEngine());
```

Here, we are using a default `RuleBasedDialogEngine` in our dialog manager which is responsible for generating resources for Alexa platform. Similarly, we may use the same `RuleBasedDialogEngine` with some other platform as well.

```ts
let dm = new FooDialogManager(mySkill, new RuleBasedDialogEngine());
```

As you can see, we are passing a skill object `mySkill` into our dialog manager. `Skill` object defines all the VUI we wrote in the previous step. We define `Skill` object like so:

```ts
let skill = new AlexaSkill(conversation);
```

And to build a conversation:

```ts
let conversation = conv()
    .addState(
        state("INIT")
            .block(
                blocks
                    .compound()
                    .addBlock(
                        blocks
                            .ask()
                            .say("Hello, you can say hello")
                            .build()
                    )
                    .addBlock(blocks.gotoState("Initialized").build())
                    .build()
            )
            .build()
    )
    .addState(
        state("Initialized")
            .block(personalizedGreetingBlock)
            .build()
    )
    .build();
```

## More Block Examples

When user says a text, say a text back:

```ts
blocks
    .when()
    .userSays(["user says this"])
    .then(blocks.say("system says this back").build())
    .build();
```

When user says a text, say a text back, otherwise say something else:

```ts
blocks
    .when()
    .userSays(["user says this"])
    .then(blocks.say("system says this back").build())
    .otherwise(blocks.say("sorry, I don't understand").build())
    .build();
```

When user is a returning user, say something else:

```ts
// Check if user is returning and set welcome message in the state.
let prepareWelcomeMessage = () => {
    return blocks
        .setStateVar()
        .set((ctx: Context, event: Event) => {
            let userId = event..
            if (isReturningUser(userId || "")) {
                return { welcomeMessage: "Hello! welcome back." };
            }
            return { welcomeMessage: "Hello! welcome." };
        })
        .build();
};

// render the welcomeMessage
blocks
    .compound()
    .add(prepareWelcomeMessage())
    .add(blocks.say("{welcomeMessage}").build())
    .build();
```

Setting Skill Information such as skill name etc using blocks:

```ts
let skillNameBlock = blocks
    .info(Locale.en_US)
    .name("My Chatbot")
    .build();
```

This will set the Skill name to be `"My Chatbot"`. You can add this block in your `Conversation` chain anywhere. To define name for different locales, you can make use of `compound` block.

```ts
let builder = blocks.compound();
for (let locale in Locale) {
    if (locale.startsWith("en_")) {
        builder.add(
            blocks
                .info(locale)
                .name("My Chatbot")
                .build()
        );
    }
}
let skillNamesBlock = builder.build();
```

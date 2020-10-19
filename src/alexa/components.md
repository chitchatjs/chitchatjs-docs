# Components

With `@chitchatjs/alexa` you get many prebuilt Blocks that you can plug into your skill code. We will use `ax` as a short form of `alexa` below.

## Core

### `ax.dialogManager()`

`ax.dialogManager()` instantiates a dialog manager for your skill. It uses the specified `Skill` and a `RuleBasedDialogManager` by default.

You should export your skill and dialog manager `handler` from your skill's `index.js` file.

```ts
export = ax.dialogManager(skill).exports();
```

### `ax.skill()`

This is where your Skill code begins. A skill contains multiple states such as 'welcome', 'pizza ordering', 'new offers' etc.

```ts
ax.skill()
    .addState(..)
    .addState(..)
    .build()
```

### `ax.state()`

Defines a new state in your `Skill`.

```ts
let dungenState = ax.state("Dungen").block(ax.say("welcome to the dungen"));

skill.addState(dungenState.build());
```

Every state comes with a default error handling and default fallback layer. Error handling renders a message to the user gracefully when some error occurs. Fallback layer renders a message to the user if there are no matching block found to execute for the input event. You can customize these default behaviors:

```ts
// Catching an error
dungenState.catch((c: AlexaDialogContext, e: AlexaEvent, err: Error) => {
  return ax.say("Dungen is not working correctly right now, please try again.");
});

// Fallback
dungenState.fallback(ax.ask("Sorry I didn't understand, please try again").build());
```

### `ax.start()`

One of the states in your `Skill` must start with `ax.start()..`. Think of it as a root state of your skill. This is where `LaunchRequest` is captured when user opens your skill.

### `ax.compound()`

Compound block allows you to stitch multiple blocks together. It executes all the blocks sequentially and prepares the final response.

```ts
ax.compound()
  .add(ax.say("Hello world"))
  .add(..)
  .build();
```

::: warning Caution
If using multiple blocks that generate the same field in the final response, the last block will overwrite the previous block's response field.
:::

## Presentation

These blocks allow you to generate a response to the user during runtime.

### `ax.ask()`

This block allows you to ask question to the user.

```ts
ax.ask("what is your name?").build();
// or
ax.ask("what is your name?")
  .reprompt("your name please")
  .build();
```

### `ax.say()`

This block allows you to say something back to the user and then close the session.

```ts
ax.say("Hello!");
```

::: tip Tip
Notice that there is no `.build()` at the end of this block. Some simple blocks don't have `.build()`.
:::

### `ax.end()`

Similar to `ax.start()`, this block handles the `SessionEndedRequest` gracefully. Hence, it is important to add this block in your skill's terminal states.

### `ax.empty()`

Sometimes, you may not want to render any response back. This is useful when you want to handle the `SessionEndedRequest` using your own code. You can return this block after implementing your custom code.

## Conditionality

These blocks allow you to wire logic to the user input based on an outcome of a conditional expression.

### `ax.when()`

When block in its simplest form executes its block only when provided condition is met.

```ts
let whenBlock = ax
  .when()
  .true((ctx: AlexaDialogContext, event: AlexaEvent) => {
    return event.currentRequest.request.type === "IntentRequest";
  })
  .then(ax.say("This is an intent request!"));
```

Above code will render `This is an intent request` on every `IntentRequest`.

Optionally, you can also use `.otherwise(..)` to wire a Block when condition doesn't meet.

```ts
whenBlock.otherwise(ax.say("This is not an intent request"));
```

### `ax.whenUserSays()`

A much simple `when` block that only checks if user said a specific utterance.

```ts
ax.whenUserSays(["hello alexa"])
  .then(ax.say("hello!"))
  .build();
```

This will generate:

```
U: hello alexa
A: hello!
```

This block automatically generates an intent for the specified utterance!

#### Capturing slot types

You can use `{..}` to annotate a type inside a sample utterance and then use `.withSlotType(<name>, <slot-type-name>)` method to add a type and then use them in the response using the same annotation!

```ts
ax.whenUserSays(["hello {name}"])
  .withSlotType("name", "AMAZON.FIRST_NAME")
  .then(ax.say("hello you called me {name}!"))
  .build();
```

### `ax.whenIntentName()`

Another variation of `when` block that gives you a bit more control. You can define your intent outside and use this block to define condition by intent name.

```ts
ax.whenIntentName("HelloAlexaIntent")
  .then(ax.say("hello!"))
  .build();
```

### `ax.whenMissingSlot()`

By default if user did not speak a slot value, Alexa would not ask them for the value. This block allows us to do that. It's usually used with `ax.whenIntentName()` or `ax.whenUserSays()` blocks.

```ts
ax.whenMissingSlot("city")
  .then(ax.ask("which city?").build())
  .otherwise(ax.ask("ok {city} and how about the date?").build())
  .build();
```

## Artifacts

These blocks allow you to generate artifacts such as intents, slots etc within your skill.

### `ax.info()`

Info block allows you to update your skill's details such as its name, invocation name etc. You can simply plug in this block anywhere in your skill and it will inject the specified name in your Skill's manifest and/or in your interaction models.

```ts
ax.info(Locale.en_US)
  .name("My Skill")
  .invocationName("My Skill")
  .build();
```

### `ax.intent()`

A block that allows you to inject an intent in your skill.

```ts
ax.intent("HelloIntent", ["hello how are you"]).build();
// or
ax.intent("HelloIntent", ["hello how are you {name}"])
  .slot("name", "AMAZON.FirstName")
  .build();
```

::: tip Note
By default this block will generate intent in the `en-US` locale only. Wrap it inside the `ax.localize()` block to generate this intent in the specific locales.
:::

### `ax.slotType()`

A block that allows you to inject a Slot Type in your skill.

```ts
ax.slotType("MyCity")
  .values(["hapur", "ghaziabad"])
  .build();
// or
let slotType: SlotType = mySlotType(); // create your slot type from scratch
ax.slotType()
  .import(slotType)
  .build();
```

::: tip Note
By default this block will generate slot type in the `en-US` locale only. Wrap it inside the `ax.localize()` block to generate this slot type in the specific locales.
:::

## Localization

### `ax.localize()`

A block to localize the artifacts in your skill, which you can add anywhere in your block tree.

```ts
ax.localize([Locale.en_US, Locale.en_CA])
  .block(
    // now, info block is localized and
    // will produce artifacts in both en-US and en-CA locales.
    ax
      .info()
      .name("Hello bot")
      .build()
  )
  .build();
```

::: tip Note
`ax.localize()` will have no effect on blocks that are purely to execute run time requests, such as `ax.say(..)`.
:::

## State Management

These blocks let you manipulate the state during a session.

### `ax.setStateVar()`

This block allows you to set state variable(s), so that you can use them in your responses.

```ts
ax.compound()
  .add(ax.setStateVar("name", "Kevindra"))
  .add(ax.say("hello, {name}!"))
  .build();
```

Output: Now Alexa knows our name.

```ts
U: hello alexa
A: hello, Kevindra!
```

You can also use this block to hook your own function, for more dynamic value injections.

```ts
ax.compound()
  .add(
    ax.setStateVar((ctx: AlexaDialogContext, event: AlexaEvent) => {
      let userName = myApi.getUserName();
      return { name: userName };
    })
  )
  .add(ax.say("hello, {name}!"))
  .build();
```

This block uses string interpolation. When you define a variable name inside `{}` it will look for the state.

### `ax.removeStateVar()`

This block simply removes a state variable.

```ts
ax.removeStateVar("name")
// or
ax.removeStateVar(["name", ..])
// or
ax.removeStateVar((ctx: AlexaDialogManager, event: AlexaEvent) => {
    return ["name"]
})
```

### `ax.goto()`

This block allows you to go to a new state.

```ts
ax.compound()
  .add(ax.say("taking you to the dungen"))
  .add(ax.goto("Dungen"));

ax.state("Dungen")
  .add(
    ax
      .whenUserSays(["why am I in the dungen"])
      .then(ax.say("because dungen is cool"))
      .build()
  )
  .build();
```

Output:

```
...
A: taking you to the dungen
U: why am I in the dungen
A: because dungen is cool
```

## Miscellaneous

### `ax.custom()`

Custom block gives your full control in how you want to handle the resource generation and request handling yourself.

```ts
ax.custom()
  .executor((c: AlexaDialogContext, e: AlexaEvent) => {
    let res = ResponseFactory.init();
    res.speak("I'm speaking this from a custom block.");
    return res.getResponse();
  })
  .build();
```

Output:

```
..
A: I'm speaking this from a custom block.
```

Sometimes you also want to manually handle the Interaction Models, Skill Manifest and other resources yourself. `ax.custom()` block allows you to do that as well. You can set a resource using the [Skill Package path](https://developer.amazon.com/en-US/docs/alexa/smapi/skill-package-api-reference.html) of the resource.

```ts
ax.custom()
  .builder((c: AlexaBuilderContext) => {
    return {
      resourceMap: {
        "/skill.json": mySkillManifest,
      },
    };
  })
  .build();
```

::: tip
Returning `resourceMap` or `Response` from the `custom` block performs a merge with the already generated artifacts and response from other blocks.
:::

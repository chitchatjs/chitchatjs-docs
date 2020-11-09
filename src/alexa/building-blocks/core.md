# Core - Alexa Building Blocks

## `ax.dialogManager()`

`ax.dialogManager()` instantiates a dialog manager for your skill. It uses the specified `Skill` and a `RuleBasedDialogManager` by default.

You should export your skill and dialog manager `handler` from your skill's `index.js` file.

```ts
export = ax.dialogManager(skill).exports();
```

## `ax.skill()`

This is where your Skill code begins. A skill contains multiple states such as 'welcome', 'pizza ordering', 'new offers' etc.

```ts
ax.skill()
    .addState(..)
    .addState(..)
    .build()
```

## `ax.state()`

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

## `ax.start()`

One of the states in your `Skill` must start with `ax.start()..`. Think of it as a root state of your skill. This is where `LaunchRequest` is captured when user opens your skill.

## `ax.compound()`

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

## `ax.custom()`

Custom block gives your full control in how you want to handle the resource generation and request handling yourself. You can run a custom code and then return a block or you can simply update the context after running your code. Custom block has two methods you can hook your code into - `executor` and `builder`. Executor allows you to handle runtime request and Builder allows you to handle the resource generation. You can choose to implement either one of them or both.

```ts
ax.custom()
  .executor(async (c: AlexaDialogContext, e: AlexaEvent) => {
    const userName = await myapi.getUserName(c);
    return ax.say(`Hello, ${userName}. I'm speaking this from a custom block.`);
  })
  .build();
```

Output:

```
..
A: Hello, Kevindra. I'm speaking this from a custom block.
```

Another example:

```ts
ax.custom()
  .executor((c: AlexaDialogContext, e: AlexaEvent) => {
    const res = ResponseFactory.init()
      .withSimpleCard(title, text)
      .getResponse();
    Object.assign(c.currentResponse.response, res);
  })
  .build();
```

Sometimes you may also want to manually generate part of the resources such as Interaction Model, Skill Manifest etc yourself. `ax.custom()` block allows you to do that as well. You can set a resource using the [Skill Package path](https://developer.amazon.com/en-US/docs/alexa/smapi/skill-package-api-reference.html) of the resource.

```ts
ax.custom().builder(async (c: AlexaBuilderContext) => {
  const cityNames = await myDB.queryCityNames();
  return ax
    .slotType("City")
    .values(cityNames)
    .build();
});
```

Another example:

```ts
ax.custom()
  .builder((c: AlexaBuilderContext) => {
    c.resources.resourceMap["/skill.json"] = mySkillManifest;
  })
  .build();
```

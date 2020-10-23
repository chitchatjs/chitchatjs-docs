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

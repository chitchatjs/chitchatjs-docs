# Conditionality - Alexa Building Blocks

These blocks allow you to wire logic to the user input based on an outcome of a conditional expression.

## `ax.when()`

When block in its simplest form executes its block only when provided condition is met.

```ts
let whenBlock = ax
  .when((ctx: AlexaDialogContext, event: AlexaEvent) => {
    return event.currentRequest.request.type === "IntentRequest";
  })
  .then(ax.say("This is an intent request!"));
```

Above code will render `This is an intent request` on every `IntentRequest`.

Optionally, you can also use `.otherwise(..)` to wire a Block when condition doesn't meet.

```ts
whenBlock.otherwise(ax.say("This is not an intent request"));
```

## `ax.whenLaunch()`

A simple `when` block that checks if skill received a launch request.

```ts
ax.whenLaunch()
  .then(ax.say("It's a launch request."))
  .otherwise(ax.say("It's not a launch request."))
  .build();
```

## `ax.whenUserSays()`

A simple `when` block that only checks if user said a specific utterance.

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

### Capturing slot types

You can use `{..}` to annotate a type inside a sample utterance and then use `.withSlotType(<name>, <slot-type-name>)` method to add a type and then use them in the response using the same annotation!

```ts
ax.whenUserSays(["hello {name}"])
  .withSlotType("name", builtins.SlotType.FirstName)
  .then(ax.say("hello you called me {name}!"))
  .build();
```

## `ax.whenIntentName()`

Another variation of `when` block that gives you a bit more control. You can define your intent outside and use this block to define condition by intent name.

```ts
ax.whenIntentName("HelloAlexaIntent")
  .then(ax.say("hello!"))
  .build();
```

## `ax.whenMissingSlot()`

By default if user did not speak a slot value, Alexa would not ask them for the value. This block allows us to do that. It's usually used with `ax.whenIntentName()` or `ax.whenUserSays()` blocks.

```ts
ax.whenMissingSlot("city")
  .then(ax.ask("which city?").build())
  .otherwise(ax.ask("ok {city} and how about the date?").build())
  .build();
```

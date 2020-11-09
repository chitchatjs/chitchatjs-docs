# Artifacts - Alexa Building Blocks

These blocks allow you to generate artifacts such as intents, slots etc within your skill.

## `ax.info()`

Info block allows you to update your skill's details such as its name, invocation name etc. You can simply plug in this block anywhere in your skill and it will inject the specified name in your Skill's manifest and/or in your interaction models.

```ts
ax.info(Locale.en_US)
  .name("My Skill")
  .invocationName("My Skill")
  .build();
```

## `ax.intent()`

A block that allows you to inject an intent in your skill.

```ts
ax.intent("HelloIntent", ["hello how are you"]).build();
// or
ax.intent("HelloIntent", ["hello how are you {name}"])
  .slot("name", builtins.SlotType.FirstName)
  .build();
```

::: tip Note
By default this block will generate intent in the `en-US` locale only. Wrap it inside the `ax.localize()` block to generate this intent in the specific locales.
:::

## `ax.slotType()`

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

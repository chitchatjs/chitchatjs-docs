# Miscellaneous - Alexa Building Blocks

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

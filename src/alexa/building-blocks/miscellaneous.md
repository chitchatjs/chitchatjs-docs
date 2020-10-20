# Miscellaneous

## `ax.custom()`

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

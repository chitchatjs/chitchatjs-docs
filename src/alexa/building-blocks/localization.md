# Localization - Alexa Building Blocks

## `ax.localize()`

A block to localize the building blocks in your skill, which you can add anywhere in your block tree.

Localize generated artifacts:

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

Localize runtime outputs

```ts
ax.localize([Locale.en_US, Locale.en_CA])
  .block(ax.say("hello!")) // will be considered only if input locale matches en-US or en-CA
  .build();
```

It also works on `ax.ask()` and `ax.directive()` building blocks as well.

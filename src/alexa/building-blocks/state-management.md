# State Management - Alexa Building Blocks

These blocks let you manipulate the state during a session.

## `ax.setStateVar()`

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

## `ax.removeStateVar()`

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

## `ax.goto()`

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

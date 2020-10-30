# Using a plugin

You can use a plugin by simply installing it using `npm`.

```sh
npm i @chitchatjs/plugin-ax-common
```

and then, importing it into the state where you want to add that experience in your skill.

```ts
import { common } from "@chitchatjs/plugin-ax-common";

let state1 = ax
  .state()
  .block(
    ax
      .compound()
      .add() // your own building block
      .add(common.defaultHandlers()) // from common plugin
      .build()
  )
  .build();
```

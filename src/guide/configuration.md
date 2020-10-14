# Build Configurations

Build configurations are defined in the `cjs.json` in your project root.

```json
{
  "outDir": "./pkg",
  "target": "Alexa"
}
```

| Config   | Description                                                                                            | Required |
| -------- | ------------------------------------------------------------------------------------------------------ | -------- |
| `outDir` | Location of the output directory.                                                                      | Yes      |
| `target` | Platform you want to deploy to. Can be `Alexa` or `Google`. <br/> Only `Alexa` is supported right now. | Yes      |

## Deploy

Deploys the project to the target platform.

```
$ cjs deploy
```

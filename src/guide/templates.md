# Templates

You can bootstrap your projects using external templates. Some of the existing templates:

-   [hello-bot](https://github.com/chitchatjs/hello-bot-template)

## Installing templates

Installing template is easy!

Go to your `~/.cjs/config.json`

```json
{
    "version": "1.0",
    "templates": [
        {
            "name": "hello-bot",
            "url": {
                "type": "GIT",
                "value": "https://github.com/chitchatjs/hello-bot-template.git"
            }
        },
        {
            "name": "<my-template>",
            "url": {
                "type": "GIT",
                "value": "<git-url>"
            }
        }
    ]
}
```

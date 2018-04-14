# Initial page

## Getting Super Powers

Becoming a super hero is a fairly straight forward process:

```bash
$ yarn add alcaeus
```

{% hint style="info" %}
 Super-powers are granted randomly so please submit an issue if you're not happy with yours.
{% endhint %}

Once you're strong enough, save the world:

```
// Ain't no code for that yet, sorry
echo 'You got to trust me on this, I saved the world'
```

{% runkit %}
const client = require("alcaeus@0.4.0-a2").Hydra;

const representation = await client.loadResource('http://wikibus-test.gear.host/brochures');

representation.root;
{% endrunkit %}

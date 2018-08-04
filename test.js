const alcaeus = require("./dist/alcaeus");
const client = alcaeus.Hydra;

async function run()
{
  const representation = await  client.loadResource('http://wikibus-test.gear.host/brochures?title=salon%20ca');

  console.log(representation.get('http://wikibus-test.gear.host/brochures?title=salon ca'));
}

run().catch(console.error);

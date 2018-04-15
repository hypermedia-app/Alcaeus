const alcaeus = require("./dist/alcaeus");
const client = alcaeus.Hydra;

async function run()
{
  const representation = await  client.loadResource('http://stat.stadt-zuerich.ch/api/dataset/GEB-RAUM-ZEIT/slice');

  console.log(representation.root);
}

run().catch(console.error);

const builder = require('xmlbuilder2');


const grid = [
  { id: 1, name: 'John', age: 25 },
  { id: 2, name: 'Mary', age: 30 },
  { id: 3, name: 'Bob', age: 40 },
];

 

const xml = builder.create('grid');
for (const row of grid) {
  const xmlRow = xml.ele('row');
  for (const [key, value] of Object.entries(row)) {
    xmlRow.ele(key, value);
  }
}

 

console.log(xml.end({ prettyPrint: true }));
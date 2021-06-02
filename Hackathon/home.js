const program = require("commander"); 
const add =require("./add");
const New =require("./new");
var link = require("./new");


program
    .command('NEW')
    .description('CREATE NEW FORM')
    .action(New);
// program
//     .command('ADD')
//     .description('ADD NEW QUESTION')
//     .action(add(link));
// program
//     .command('slots <districtid>')
    // .description('GET ALL SLOTS FOR THE DISTRICT')
    // .action(slots);
program.parse();
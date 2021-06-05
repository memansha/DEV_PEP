const program = require("commander"); 
const add =require("./add");
const New =require("./new");
var link = require("./new");


program
    .command('NEW')
    .description('CREATE NEW FORM')
    .action(New);
program.parse();
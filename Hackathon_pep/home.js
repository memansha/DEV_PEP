const program = require("commander"); 
const New =require("./new");

program
    .command('NEW')
    .description('CREATE NEW FORM')
    .action(New);
program.parse();
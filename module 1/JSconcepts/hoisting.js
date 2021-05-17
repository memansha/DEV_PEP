//Hoisting => Mechanism of accessing variables before initialisation

//VAR example
console.log(a);    //undefined
var a="Memansha";
console.log(a);    //Memansha


console.log(c);   //ReferenceError: c is not defined



//LET and CONST example
console.log(b);    //ReferenceError: Cannot access 'b' before initialization
let b="Memansha";
console.log(b);




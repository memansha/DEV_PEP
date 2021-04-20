console.log("Hello world");
let a=10;
console.log(a);
if(true){
    a=20;
    console.log(a);
}
console.log(a);
const pi=3.14;
console.log(pi);

let values=[1,2,3,4,5,6,7,8];
console.log(values);
values.push("captain america");
console.log(values);
let obj={
    name:"memansha",
    place:"new delhi",
    movies:["captain america","spiderman",{
        fruit:"apple",
        partner:"falcon",
        weakness:["brainwash"]
    }]
    
}
console.log(obj.movies[2].weakness[0][5]);
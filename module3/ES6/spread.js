let a = [1, 2, 3];
let b = [4, 6];

let c = [...a, ...b];

let d = [...a, ...a, ...a];

console.log(a);
console.log(b);
console.log(c);
console.log(d);

//--------------------------------

let o1={ a:1 ,b:2};
let o2={c:3};
let o3={...o1,...o2,...o1,...o2};
console.log(o1);
console.log(o2);
console.log(o3);

//---------------------------------

let a=[1,2,4,5];
//a.slice(0,2)=> [1,2]
//a.slice(2,4)=>[4,5]

let b=[...a.slice(0,2),3,...a.slice(2,4)];
console.log(b);
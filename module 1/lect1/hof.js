function getfirstname(fullname){
    fullname=fullname.split(" ");
    return fullname[0];
}
function getlastname(fullname){
    fullname=fullname.split(" ");
    return fullname[1];
}
function fun(fullname,cb){
    let name=cb(fullname);
    console.log(name);
}

fun("Steve Roger",getfirstname);
fun("Iran Man",getlastname);
let addbutton=document.querySelector(".add-todo");
let todoinput=document.querySelector(".todo-input");
let totolist=document.querySelector(".todo-list-container");

todoinput.addEventListener("keypress",function(e){
    if(e.key=="Enter"){
        addtodo();
    }
});
addbutton.addEventListener("click",function(){
    addtodo();
});

function addtodo(){
    let todoinputvalue=todoinput.value;
    if(todoinputvalue){
        appendtodo(todoinputvalue);
        todoinput.value="";
    }
}
function appendtodo(todo){
    let todoitemDiv=document.createElement("div");
    todoitemDiv.classList.add("todo-item");

    let ptag=document.createElement("p");
    ptag.classList.add("todo-input");
    ptag.textContent=todo;

    let deletebutton=document.createElement("button");
    deletebutton.classList.add("delete-todo");
    deletebutton.textContent="Delete";

    deletebutton.addEventListener("click",deletetodo);

    todoitemDiv.append(ptag);
    todoitemDiv.append(deletebutton);

    totolist.append(todoitemDiv);

    function deletetodo(e){
        e.target.parentNode.remove();
    }
}
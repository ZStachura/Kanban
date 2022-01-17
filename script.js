window.onload=function(){
document.getElementById("newTask").addEventListener("keyup", function(event) {
    if (event.code === 'Enter') {
    var text = document.getElementById("newTask").value;
    var node=document.createElement("LI");
    node.draggable = true;
    var newNode=document.createTextNode(text);
    node.appendChild(newNode);
    document.getElementById("toDoList").appendChild(node);
}});


}

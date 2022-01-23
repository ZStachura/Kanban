window.onload=function(){
document.getElementById("newTask").addEventListener("keyup", function(event) {
    if (event.code === 'Enter') {
    var text = document.getElementById("newTask").value;
    var node=document.createElement("div");
    var newNode=document.createTextNode(text);
    node.appendChild(newNode);
    node.setAttribute("class","task")
    node.setAttribute("draggable","true")
    node.setAttribute("ondragstart","onDragStart(event)")
    document.getElementById("toDoList").appendChild(node);
}});

function onDragStart(event) {
    event
      .dataTransfer
      .setData('text/plain', event.target.id);
  }

  function onDragStart(event) {
    event
      .dataTransfer
      .setData('text/plain', event.target.id);
  }

  function onDragOver(event) {
    event.preventDefault();
  }

  function onDrop(event) {
    const id = event
      .dataTransfer
      .getData('text');
      const draggableElement = document.getElementById(id);
      const dropzone = event.target;
      event
      .dataTransfer
      .clearData();
  }

}

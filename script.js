//Prepare localstorage
//Prepare localstorage
var toDoStorage = window.localStorage;
var toDoArray = toDoStorage.getItem("toDo");
var toDo = toDoArray ? JSON.parse(toDoArray) : [];
var inProgressArray = toDoStorage.getItem("inProgress");
var inProgress = inProgressArray ? JSON.parse(inProgressArray) : [];
var doneArray = toDoStorage.getItem("done");
var done = doneArray ? JSON.parse(doneArray) : [];

window.onload=function(){
//load toDolist
toDo.forEach(element => {
	var task = document.createTextNode(element);
	var node = document.createElement("div");
	node.appendChild(task);
	node.setAttribute("class","task");
	node.setAttribute("onClick", "moveToInProgress(this)");
	node.setAttribute("data-long-press-delay", "500");	
	node.addEventListener("long-press", function(e){removeFromToDo(this)});
    document.getElementById("toDoList").appendChild(node);
})
//load inProgress
inProgress.forEach(element => {
	var task = document.createTextNode(element);
	var node = document.createElement("div");
	node.appendChild(task);
	node.setAttribute("class","task")
	node.setAttribute("onClick", "moveToDone(this)")
    document.getElementById("inProgressList").appendChild(node);
})

done.forEach(element=>{
	var task = document.createTextNode(element);
	var node = document.createElement("div");
	node.appendChild(task);
	node.setAttribute("class","task")
	node.setAttribute("data-long-press-delay", "500");
	node.addEventListener("long-press", function(e){removeFromDone(this)});
	document.getElementById("doneList").appendChild(node);
})

//add on click listener
document.getElementById("newTask").addEventListener("keyup", function(event) {
    if (event.code === 'Enter') {
    var text = document.getElementById("newTask").value;
    var node=document.createElement("div");
    var newNode=document.createTextNode(text);
	toDo.push(text);
	toDoStorage.setItem("toDo", JSON.stringify(toDo));
	console.log(toDoStorage);
    node.appendChild(newNode);
    node.setAttribute("class","task")
	node.setAttribute("onClick", "moveToInProgress(this)");
	node.setAttribute("data-long-press-delay", "500");	
	node.addEventListener("long-press", function(e){removeFromToDo(this)});
    document.getElementById("toDoList").appendChild(node);
	document.getElementById("newTask").value = "";
}});
}
//Move to progress tab
function moveToInProgress(startDiv){
	var newTask = document.createElement("div");
	var newText = document.createTextNode(startDiv.innerHTML);
	//Push to local storage
	inProgress.push(startDiv.innerHTML);
	toDoStorage.setItem("inProgress", JSON.stringify(inProgress));
	//Remove from other listStyleType
	var ind = toDo.indexOf(startDiv.innerHTML);
	toDo.splice(ind, 1);
	toDoStorage.setItem("toDo", JSON.stringify(toDo));
	//Update gui
	newTask.appendChild(newText);
	newTask.setAttribute("class", "task");
	newTask.setAttribute("onClick", "moveToDone(this)");
	newTask.setAttribute("data-long-press-delay", "500");	
	newTask.addEventListener("long-press", function(e){moveBackToToDo(this)});
	document.getElementById("inProgressList").appendChild(newTask);
	document.getElementById("toDoList").removeChild(startDiv);
}

//Move to done tab
function moveBackToToDo(startDiv){
	var newTask = document.createElement("div");
	var newText = document.createTextNode(startDiv.innerHTML);
	newTask.appendChild(newText);
	newTask.setAttribute("class", "task");
	newTask.setAttribute("onClick", "moveToInProgress(this)");
	document.getElementById("toDoList").appendChild(newTask);
	document.getElementById("inProgressList").removeChild(startDiv);
}
function moveToDone(startDiv){
	var newTask = document.createElement("div");
	var newText = document.createTextNode(startDiv.innerHTML);
	//Push to local storage
	done.push(startDiv.innerHTML);
	toDoStorage.setItem("done", JSON.stringify(done));
	//Remove from other listStyleType
	var ind = inProgress.indexOf(startDiv.innerHTML);
	inProgress.splice(ind, 1);
	toDoStorage.setItem("inProgress", JSON.stringify(inProgress));
	//Update gui
	newTask.appendChild(newText);
	newTask.setAttribute("class", "task");
	newTask.setAttribute("data-long-press-delay", "500");
	newTask.addEventListener("long-press", function(e){removeFromDone(this)});
	document.getElementById("doneList").appendChild(newTask);
	document.getElementById("inProgressList").removeChild(startDiv);
}


function removeFromDone(curDiv){
	console.log("test");
	//Remove from other listStyleType
	var ind = done.indexOf(curDiv.innerHTML);
	done.splice(ind, 1);
	toDoStorage.setItem("done", JSON.stringify(done));
	document.getElementById("doneList").removeChild(curDiv);
}


function removeFromToDo(curDiv){
	//Remove from other listStyleType
	var ind = toDo.indexOf(curDiv.innerHTML);
	toDo.splice(ind, 1);
	toDoStorage.setItem("toDo", JSON.stringify(toDo));
	document.getElementById("toDoList").removeChild(curDiv);
}
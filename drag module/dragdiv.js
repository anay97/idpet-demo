function addDrag(dragCount){
for(i=1;i<=dragCount;i++){
dragElement(document.getElementById("drag"+i));
}
}
function drawAllLines(){
	var list=['12','13','23'];
	for(i=0;i<list.length;i++){
		var a=parseInt(list[i].charAt(0));
		var b=parseInt(list[i].charAt(1));
		drawLine(a,b);
	}
}
function drawLine(i,j){
line1 = $('#c'+i+''+j);
div1 = $('#drag'+i);   
div2 = $('#drag'+j);
var pos1 = div1.position();
var pos2 = div2.position();
line1
  .attr('x1', pos1.left)
  .attr('y1', pos1.top)
  .attr('x2', pos2.left)
  .attr('y2', pos2.top);

}
function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
	drawAllLines();
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
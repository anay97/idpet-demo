distanceOffset={};
distanceOffset.loc=0;
function addDrag(dragCount){
for(i=1;i<=dragCount;i++){
dragElement(document.getElementById("drag"+i));
}
}
function drawAllLines(){
	var list=['11','22','33','44'];
	for(i=0;i<list.length;i++){
		var a=parseInt(list[i].charAt(0));
		var b=parseInt(list[i].charAt(1));
		drawLine(a,b);
	}
}
function getCenterX(div1){
	var offset = div1.offset();
var width = div1.width();
var height = div1.height();

var centerX = offset.left + width / 2;
var centerY = offset.top + height / 2;
return centerX;
}
function getCenterY(div1){
var offset = div1.offset();
var width = div1.width();
var height = div1.height();

var centerX = offset.left + width / 2;
var centerY = offset.top + height / 2;
return centerY;
}

function drawAllReversedArrows(){
	var list=['221'];
	for(i=0;i<list.length;i++){
		var a=parseInt(list[i].charAt(0));
		var b=parseInt(list[i].charAt(1));
		drawReversedArrow(a,b,list[i]);
	}
}
function drawCondition(l){
	var div1=$('#c'+l.charAt(0));
	var centerX=getCenterX(div1)-120;
	var centerY=distanceOffset.loc+100;
	distanceOffset.loc+=100;
	$('#cond'+l).css('top',centerY+'px');
	$('#cond'+l).css('left',centerX+'px');
}
function drawText(i,j,id){
	var div1=$("#a"+id);
	var txt=$('#at'+id);
	centerX1=getCenterX(div1);
	centerY1=getCenterY(div1);
	var mXY=(getMXY(div1.attr('d'))).split(',');//Has MoveTo of line so it can be directly used
	var mX=parseInt(mXY[0].substr(2));
	var mY=mXY[1];
	if(parseInt(i)>parseInt(j)){
	mX-=200;
	txt.attr('x',mX);
	console.log(i+''+j);
	}
	else{
		txt.attr('x',mX+5);
	}
	if(!distanceOffset.loc){
		txt.attr('y',mY-5);
	}
	else{
	txt.attr('y',distanceOffset.loc-2);
	}
}
function drawReverseText(i,j,id){
	var div1=$("#ar"+id);
	var txt=$('#rat'+id);
	centerX1=getCenterX(div1);
	centerY1=getCenterY(div1);
	var mXY=(getMXY(div1.attr('d'))).split(',');//Has MoveTo of line so it can be directly used
	var mX=parseInt(mXY[0].substr(2));
	console.log(mX);
	var mY=mXY[1];
	txt.attr('x',mX+2);
	txt.attr('y',mY-3);
}
function drawReversedArrow(i,j,id){
	var div1=$("#c"+i);
	var revLine=$('#ar'+id);
	centerX1=getCenterX(div1)+5;
	centerY1=(distanceOffset.loc+20);
	distanceOffset.loc=centerY1+50;
	revLine.attr('d','M '+(centerX1)+','+(centerY1)+' L '+(centerX1+50)+','+(centerY1)+'L'+(centerX1+50)+','+(centerY1+50)+' L'+(centerX1)+','+(centerY1+50));
}
function getMXY(a){
	var counter=0;
	var s='';
	for(i=0;i<a.length;i++){
		if(a.charAt(i)===' '){
			if(counter===1)return s;
			else{
				counter++;
				s+=a.charAt(i);
			}
		}
		else{
			s+=a.charAt(i);
		}
	}
}
function drawCurve(i,j,id){
	var div1=$("#c"+i+''+i);
	var div2=$("#c"+j+''+j);
	var arrowedLine=$('#a'+id);
	centerX1=getCenterX(div1);
	centerX2=getCenterX(div2);
	if(distanceOffset.loc==0){
	centerY1=getCenterY(div1);
	centerY2=getCenterY(div2);	
	}
	else{
	centerY1=distanceOffset.loc+50;
	centerY2=centerY1;
	distanceOffset.loc+=50;
	}
	arrowedLine.attr('d','m '+(centerX1-10)+','+(centerY1+20)+' L '+(centerX2-4)+','+(centerY2+20));
	distanceOffset.loc=centerY1+20;
}
function drawLine(i,j){
line1 = $('#c'+i+''+j);
div1 = $('#c'+i);

var centerX = getCenterX(div1);
var centerY = getCenterY(div1);

line1
  .attr('x1', centerX)
  .attr('y1', centerY-50)
  .attr('x2', centerX)
  .attr('y2', centerY+1500);

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
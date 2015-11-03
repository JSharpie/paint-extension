$(document).ready(function(){
var easel = $('#easel').get(0);
var ctx = easel.getContext('2d');
var painting = $('#paint').get(0);
var paintDim = getComputedStyle(painting);
easel.width = parseInt(paintDim.getPropertyValue('width'));
easel.height = parseInt(paintDim.getPropertyValue('height'));
var cursor = {x: 0, y: 0};
var currFill;
ctx.lineWidth = 3;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.strokeStyle = 'rgb(0, 0, 0)';
new ColorChange('.black');
$(easel).on('mousemove', function(e) {
  cursor.x = e.pageX - this.offsetLeft;
  cursor.y = e.pageY - this.offsetTop;
});
$('.clear').on('click', function(e){
  ctx.fillStyle = 'white';
  ctx.fillRect(0,0,easel.width, easel.height);
  ctx.fillStyle = currFill;
});
$('.eraser').on('click', function(e){
  ctx.strokeStyle = 'white';
  ctx.fillStyle = 'white';
});
$('#easel').on('dblclick', function(e){
  ctx.fill();
});
$(easel).on('mousedown', function(e) {
    ctx.beginPath();
    ctx.moveTo(cursor.x, cursor.y);
    $(easel).on('mousemove', painted);
});
$(easel).on('mouseup', function() {
    $(easel).off('mousemove', painted);
});
var painted = function() {
    ctx.lineTo(cursor.x, cursor.y);
    ctx.stroke();
};
function ColorChange(clrCls){
  $(clrCls).on('click', function(){
    ctx.fillStyle = $(this).text();
    currFill = $(this).text();
    ctx.strokeStyle = $(this).text();
  });
}
function SizeChange(sizeCls){
  $(sizeCls).on('click', function(){
    if($(this).text() === "Small Pen"){
      ctx.lineWidth = 3;
    }
    if($(this).text() === "Medium Pen"){
      ctx.lineWidth = 7;
    }
    if($(this).text() === "Large Pen"){
      ctx.lineWidth = 11;
    }
  });
}
});

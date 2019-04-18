
var usetouch;
var mykits=new Array();
var myint;
var numkits=8;

$(document).ready(function(){
	usetouch=isMobile();
	init();
});




function init(){
	$.backstretch("images/cloudz.jpg", {speed: 300});
	var imgarray=new Array();
	for (var i=0; i<numkits; i++) imgarray.push('images/kit'+i+'.png');
	preload(imgarray);
	$('body').bind('mousedown touchstart', function(e){
		e.preventDefault();
		var parentOffset = $(this).offset(); 
   		//or $(this).offset(); if you really just want the current element's offset
		var relX=1;
		var relY=1;
		if (usetouch){//usetouch
			relX = e.originalEvent.touches[0].pageX - parentOffset.left;
			relY = e.originalEvent.touches[0].pageY - parentOffset.top;
		}else{
   			relX = e.pageX - parentOffset.left;
			relY = e.pageY - parentOffset.top;
		}
		createkit(relX, relY);
	});
	myint=setInterval(function(){kdown()},50);
}

function createkit(cx, cy){
	var vsize=50+Math.random()*150;
	var hsize=vsize/2;
	var vx=cx-hsize;
	var vy=cy-hsize;
	var vop=vsize>100? 1:vsize*.01
	var n=Math.floor(Math.random()*numkits);
	var newkit=$('<div class="kit" style="width:'+vsize+'px; height:'+vsize+'px; left:'+vx+'px; top:'+vy+'px; opacity:'+vop+';"><img src="images/kit'+n+'.png" width="'+vsize+'" height="'+vsize+'" /></div>');
	playsound();
	$('body').append(newkit);
	newkit.data('y0',vy);
	newkit.data('yadd',vsize/40);
	mykits.push(newkit);
}


function isMobile(){
	var isipad = navigator.userAgent.match(/iPad/i) != null;
	var isiphone = (navigator.userAgent.match(/iPhone/i) != null) || (navigator.userAgent.match(/iPod/i) != null);
	var isandroid = (navigator.userAgent.toLowerCase().indexOf("android") > -1);
    return (isipad || isiphone || isandroid); 
}

function kdown(){
	var kcount=mykits.length;
	var vht=$('body').height();
	for(var i=kcount-1; i>-1; i--){
		var thiskit=mykits[i];
		var t=thiskit.data('y0');
		t+=thiskit.data('yadd');
		thiskit.data('y0',t).css('top',t+'px');
		
		if (t>vht){
			mykits.splice(i,1);
			thiskit.remove(); 
		}
	}
}

function preload(arrayOfImages) {
    $(arrayOfImages).each(function(){
        $('<img/>')[0].src = this;
        // Alternatively you could use:
        // (new Image()).src = this;
    });
}

function playsound(){
	var s=Math.floor(Math.random()*6);
	var audio = $("#me"+s)[0];
  	audio.play();
}
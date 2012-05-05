$(document).ready(function() { 
var last;
$("input").focus(function() {
    last = $(this).attr('id');
});

(function(){
	var timezone = jstz.determine_timezone(); 
	timezone = parseFloat(timezone.offset());
	$("option[value="+timezone+"]").prop("selected", true);
})();

Date.prototype.getSwatch = function() {
    var swatch = ((this.getUTCHours() + 1) % 24) + this.getUTCMinutes() / 60 + this.getUTCSeconds() / 3600;
	var inetTime =  Math.floor(swatch * 1000 / 24);
	if (inetTime < 10){
		inetTime = "00"+inetTime;
	}else if(inetTime < 100){
		inetTime = "0"+inetTime;
	}
    return inetTime;
};

function updateSwatch() {
    var today = new Date();
    $("#internet-time").html(today.getSwatch());
    $("title").html('@' + today.getSwatch() + ' .beats | Current Internet Time - .Beats by Vian');
}

function timeConversion(){	
	// A free script from: www.mresoftware.com
	function isDST(){
	var mtoday = new Date;
	var yr = mtoday.getFullYear();
	var jn = new Date(yr,0);
	//Is the current offset the same as it would be in January?  If so, DST is not in effect on client computer.
		if (mtoday.getTimezoneOffset() == jn.getTimezoneOffset()){
			return false; //if offsets are the same return false
		}
		return true; //otherwise return true
	}
	var lastClickedElement = $($.lastClicked).attr('id');
	var hour = parseFloat($("#hour").val());		
    var mins  = parseFloat($("#min").val()); 
    var sec  = parseFloat($("#sec").val());  
	var beats = parseFloat($("#beats").val());
    var zone = parseFloat($("#DropDownTimezone").val()); //Get selected timezone value, initially selected by getTimezoneOffset()    	
		if (isDST() == true) zone += 1; //Acount for DST determined by isDST() 
    var diff = (zone-1); // currentTimezone-1 because Biel is +1 from GMT
	var endResult;
	console.log(zone);
	if (!hour) hour = 0;   
	if (!mins) mins = 0;   
	if (!sec) sec = 0;     
	if (!beats) beats = 0;
	
	if (last == 'hour' || last == 'min' || last == 'sec'){
	  if(hour >= 0 && hour <= 24 && mins >= 0 && mins <= 60 && sec >= 0 && sec <= 60){
    	var conversion =  ((hour - diff) % 24) + mins / 60 + sec / 3600;    
		var converted = Math.floor(conversion * 1000 / 24);  
		$("#beats").val(converted);
	  }
	  endResult = "Beats"; 
	}
	
	if (last == 'beats'){
	  if (beats >= 0 && beats < 1000){
    	var totalsecs = ( beats * 86.4 );
    	var totalmins = parseInt( totalsecs / 60 ) ;
    	var hour     = parseInt( totalmins / 60 );
    	var mins      = ( totalmins % 60 );
   		var sec      = parseInt( ( totalsecs % 3600 ) % 60 );
		
		hour = hour + diff;
		if(hour > 23){
			hour = hour - 24;
		}else if(hour < 0){
			hour = hour + 12;
		}
		
		if (hour < 10) hour = "0"+hour;
		if (mins < 10) mins = "0"+mins;
		if (sec < 10) sec = "0"+sec;		
		
		hour = $("#hour").val(hour); 
		mins = $("#min").val(mins);
		sec = $("#sec").val(sec);
	  }
	  endResult = "Time";
	}else{
		hour = "Error";
		mins = "Error";
		sec = "Error";
		beats = "Error";
	}
}

$("#convert").on('click', function() {
	timeConversion();
});

$(document).keypress(function(e) {
    if(e.keyCode == 13) {	
	timeConversion();
    }
});

updateSwatch();
setInterval(updateSwatch, 10000);
});
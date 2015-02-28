var args = arguments[0] || {};
var section = Alloy.createModel("Section");
var day;
init(args.sec);
if (section) {
	showSection(section);
}

//using section object to build section model
function init(secObj) {
	if (secObj) {
		section.set(secObj);
	} else {
		console.log("no section acquired");
	}
}

//write section data into view
//include:SECTION,SESSION,TYPE,BEGIN_TIME,END_TIME,DAY,LOCATION,REGISTERED,INSTRUCTOR
function showSection(section) {
	if(section.get("SECTION")){
		$.secId.setTitle("Section ID: " + section.get("SECTION"));
	}
	else{
		$.secId.setTitle("Section ID: N/A");
	}
	
	if(section.get("TYPE")){
		$.secType.setTitle("Type: " + section.get("TYPE"));
	}
	else{
		$.secType.setTitle("Type: N/A");
	}
	
	if (section.get("REGISTERED")){
		$.secUnit.setTitle("Units: " + section.get("REGISTERED"));
	}
	else{
		$.secUnit.setTitle("Units: N/A");
	}
	if(section.get("BEGIN_TIME") && section.get("END_TIME")){
		$.secTime.setTitle("Time: " + section.get("BEGIN_TIME") + "-" + section.get("END_TIME"));
	}
	
	else{
//				$.secTime.setTitle("Time: " + section.get("BEGIN_TIME") + "-" + section.get("END_TIME"));

			$.secTime.setTitle("Time: N/A");
	}
	//if(section.get("DAY")){
	//	$.secDay.setTitle("Day: " + section.get("DAY"));
	//}
	//else{
	//			$.secDay.setTitle("Day: N/A");
	//}
	
	day = showDay(section);
	
	if(section.get("LOCATION")){
		$.secRoom.setTitle("Room: " + section.get("LOCATION"));
	}
	else{
		$.secRoom.setTitle("Room: N/A");
	}
	if(section.get("INSTRUCTOR")){
		$.secProf.setTitle("Instructor: " + section.get("INSTRUCTOR"));
	}
	else{
		$.secProf.setTitle("Instructor: N/A");
	}
}

function showDay(section){
	var day = section.get("DAY");
	
	if (day == "M"){
		$.secDay.setTitle("Day: M");
	}
	else if (day == "T"){
		$.secDay.setTitle("Day: T");
	}
	else if (day == "W"){
		$.secDay.setTitle("Day: W");
	}
	else if (day == "H"){
		$.secDay.setTitle("Day: TH");
	}
	else if (day == "F"){
		$.secDay.setTitle("Day: F");
	}
	else if (day == "TH"){
		$.secDay.setTitle("Day: T/Th");
	}
	else if (day == "MW"){
		$.secDay.setTitle("Day: M/W");
	}
	else if (day == "MWF"){
		$.secDay.setTitle("Day: M/W/F");
	}
	else{
		$.secDay.setTitle("Day:" + day);
	}
	return day;
}

function addToBin() {
	var courseBin = Alloy.Collections.cbin;
	
	var pLen = courseBin.length;
	var mm;
	//console.log(courseBin.where({SECTION : section.get("SECTION").length}) );
	if (courseBin.where({SECTION : section.get("SECTION")}).length < 1) {
		try {
			Ti.App.fireEvent("upSec",section.toJSON());
			console.log(Alloy.Collections.cbin.length);
			
		} catch(e) {
			console.log(e);
		}
	}
	else{
		alert("Already added.");
	}
}

$.sectionDetail.addEventListener('close', function() {
	$.destroy();
}); 
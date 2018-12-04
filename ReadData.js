var areas=[]; 
var hostNames=[]; 
var upTimes=[]; 
var versions=[]; 
var finalData;
var tableData=[];
var keys;

var config = {
	apiKey: "AIzaSyDj3WmU4bQvtI65DYOlllFIv3-alBXYi0E",
	authDomain: "bloomberg-project.firebaseapp.com",
	databaseURL: "https://bloomberg-project.firebaseio.com",
	projectId: "bloomberg-project",
	storageBucket: "bloomberg-project.appspot.com",
	messagingSenderId: "267927372179"
};

firebase.initializeApp(config);
console.log(firebase);
var databaseInstance = firebase.database();
var databaseReference = databaseInstance.ref();
databaseReference.on("value", dataRetrieved, dataException);

function dataRetrieved(data){
	console.log(data.val());
	finalData=data.val();
	keys=Object.keys(finalData);
	for(var x=0;x<keys.length;x++){
		try{
			if(finalData[x].area != undefined)
				areas.push(finalData[x].area);
			else
				areas.push("");
		   }catch(e){
			   console.log(e);
			   areas.push("");
		   }
		try{
			if(finalData[x].hostname != undefined)
				hostNames.push(finalData[x].hostname);
			else
				hostNames.push("");
		   }catch(e){
			   console.log(e);
			   hostNames.push("");
		   }
		try{
			if(finalData[x].uptime != undefined)
				upTimes.push(finalData[x].uptime);
			else
				upTimes.push("");
		   }catch(e){
			   console.log(e);
			   upTimes.push("");
		   }
		try{
			if(finalData[x].version != undefined)
				versions.push(finalData[x].version);
			else
				versions.push("");
		   }catch(e){
			   console.log(e);
			   versions.push("");
		   }
	}
	console.log(areas);console.log(hostNames);console.log(upTimes);console.log(versions);
	for(var y=0;y<keys.length;y++){
		tableData.push([areas[y],hostNames[y],upTimes[y],versions[y]]);
	}
	console.log(tableData);
	$(document).ready(function() {
	    $("#table1").DataTable( {
		data: tableData,
		//"ordering": false,
		columns: [
		    { title: "area" },
		    { title: "hostname" },
		    { title: "uptime" },
		    { title: "version." }
		]
	    } );
	} );
}
function dataException(e){console.log(e);}

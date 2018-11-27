var areas=[]; var hostNames=[]; var upTimes=[]; var versions=[]; var finalData; var keys;
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
var finalData2=[];
function dataRetrieved(data){
	console.log(data.val());
	finalData=data.val();
	keys=Object.keys(finalData);
	for(var x=0;x<keys.length;x++){
		try{areas.push(finalData[x].area);}catch(e){console.log(e);areas.push("");}
		try{hostNames.push(finalData[x].hostname);}catch(e){console.log(e);hostNames.push("");}
		try{upTimes.push(finalData[x].uptime);}catch(e){console.log(e);upTimes.push("");}
		try{versions.push(finalData[x].version);}catch(e){console.log(e);versions.push("");}
	}
	console.log(areas);
	console.log(hostNames);
	console.log(upTimes);
	console.log(versions);
	
	for(var y=0;y<keys.length;y++){
		finalData2.push([areas[y]],[hostNames[y]],[upTimes[y]],[versions[y]]);
		log.console("1");
	}
	console.log(finalData2);
	$(document).ready(function() {
    $('#table1').DataTable( {
        data: finalData2,
        columns: [
            { title: "area" },
            { title: "hostname" },
            { title: "uptime" },
            { title: "version" }
        ]
    } );
} );
}
function dataException(e){
	console.log(e);
}

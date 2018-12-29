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
			if(finalData[x].area != undefined){
				areas.push(finalData[x].area);
			}else{
				areas.push("");
			}
			if(finalData[x].hostname != undefined){
				hostNames.push(finalData[x].hostname);
			}else{
				hostNames.push("");
			}
			if(finalData[x].uptime != undefined){
				upTimes.push(finalData[x].uptime);
			}else{
				upTimes.push("");
			}
			if(finalData[x].version != undefined){
				versions.push(finalData[x].version);
			}else{
				versions.push("");
			}
	}
	
	console.log(areas);
	console.log(hostNames);
	console.log(upTimes);
	console.log(versions);
	
	//2D Array -->(area, hostname, uptime, version)
	for(var y=0;y<keys.length;y++){
		tableData.push([
			areas[y],
			hostNames[y],
			upTimes[y],
			versions[y]
		]);
	}

	console.log(tableData);
	
	//Create Datatable 
	$(document).ready(function() {
	    $("#table1").DataTable( {
		data: tableData,
		columns: [
			{ title: "area" },
			{ title: "hostname" },
			{ title: "uptime" },
			{ title: "version." }
		]
	    } );
	} );
	averageGraph(areas,upTimes);
	
}
function dataException(e){	
	console.log(e);	 
}
function averageGraph(areas,upTimes){
	var temp=[];
	var sums=[];
	var counts=[];
	var gdata=[];
	for(var x=0;x<areas.length;x++){
		var hold = parseInt(upTimes[x])
		temp.push(hold);
	}
	for(var y=0;y<areas.length;y++){
		if(areas[x]!=undefined){
			if(areas[x]==('1')){
				sums[0]+=temp[x];
				counts[0]+=1;
			}else if(areas[x]==('admin')){
				sums[1]+=temp[x];
				counts[1]+=1;
			}else if(areas[x]==('apex')){
				sums[2]+=temp[x];
				counts[2]+=1;
			}else if(areas[x]==('bcloud')){
				sums[3]+=temp[x];
				counts[3]+=1;
			}else if(areas[x]==('corp')){
				sums[4]+=temp[x];
				counts[4]+=1;
			}else if(areas[x]==('dev')){
				sums[5]+=temp[x];
				counts[5]+=1;
			}else if(areas[x]==('feed')){
				sums[6]+=temp[x];
				counts[6]+=1;
			}else if(areas[x]==('inet')){
				sums[7]+=temp[x];
				counts[7]+=1;
			}else if(areas[x]==('prod')){
				sums[8]+=temp[x];
				counts[8]+=1;
			}else if(areas[x]==('storage')){
				sums[9]+=temp[x];
				counts[9]+=1;
			}else if(areas[x]==('tdmz')){
				sums[10]+=temp[x];
				counts[10]+=1;
			}	
		}
	}
	for(var x=0;x<sums.length;x++){
		gdata.push((sums[x]/counts[x]));
	}
	var graph = new Chart(document.getElementById("graph1").getContext('2d'),{
		type:'doughnut',
		data:{
			labels:["1","admin","apex","bcloud","corp","dev","feed","inet","prod","storage","tdmz"],
			backgroundColor:["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850","#00FFFF","#7FFF00","#008000","#87CEFA","#800000","#191970"],
			datasets:[{
				label:"Average uptime per hostname",
				data:gdata
			}]
		},
		options:{
			title:{
				display:true,
				text:"Average uptime per hostname"
			}
		}
	});
}

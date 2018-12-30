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
	lineGraphs(areas,upTimes);
	averageGraph(areas,upTimes);
}
function dataException(e){	
	console.log(e);	 
}
function lineGraphs(areas,upTimes){
	var one =[];
	var admin=[];
	var apex=[];
	var bcloud=[];
	var corp=[];
	var dev=[];
	var feed=[];
	var inet=[];
	var prod=[];
	var storage=[];
	var tdmz=[];
	var counts=[0,0,0,0,0,0,0,0,0,0,0];
	var lengths=[[],[],[],[],[],[],[],[],[],[],[]];
	for(var y=0;y<areas.length;y++){
		if(areas[y]!=undefined){
			//console.log(areas[y]);
			//console.log(temp[y]);
			if(areas[y]==('1')){
				one.push(upTimes[y]);
				counts[0]+=1;
			}else if(areas[y]==('admin')){
				admin.push(upTimes[y]);
				counts[1]+=1;
			}else if(areas[y]==('apex')){
				apex.push(upTimes[y]);
				counts[2]+=1;
			}else if(areas[y]==('bcloud')){
				bcloud.push(upTimes[y]);
				counts[3]+=1;
			}else if(areas[y]==('corp')){
				corp.push(upTimes[y]);
				counts[4]+=1;
			}else if(areas[y]==('dev')){
				dev.push(upTimes[y]);
				counts[5]+=1;
			}else if(areas[y]==('feed')){
				feed.push(upTimes[y]);
				counts[6]+=1;
			}else if(areas[y]==('inet')){
				inet.push(upTimes[y]);
				counts[7]+=1;
			}else if(areas[y]==('prod')){
				prod.push(upTimes[y]);
				counts[8]+=1;
			}else if(areas[y]==('storage')){
				storage.push(upTimes[y]);
				counts[9]+=1;
			}else if(areas[y]==('tdmz')){
				tdmz.push(upTimes[y]);
				counts[10]+=1;
			}	
		}
	}
	for(var z=0;z<counts.length;z++){
		for(var a=0; a<counts[z];a++){
			lengths[z].push(a);
		}
	}
	var adminGraph = new Chart(document.getElementById("adminGraph").getContext('2d'),{
		type:'line',
		backgroundColor:"#E59191",
		data:{
			borderColor:"#C94848",
			labels:lengths[1],
			datasets:[{
				label:"Average uptime per area",
				data:admin
			}]
		},
		options:{
			title:{
				display:true,
				text:"Uptime for admin"
			}
		}
	});
	var apexGraph = new Chart(document.getElementById("apexGraph").getContext('2d'),{
		type:'line',
		borderColor:"#C94848",
		data:{
			labels:lengths[2],
			backgroundColor:"#E59191",
			datasets:[{
				//label:"Average uptime per area",
				data:apex
			}]
		},
		options:{
			title:{
				display:true,
				text:"Uptime for apex"
			}
		}
	});
	var bcloudGraph = new Chart(document.getElementById("bcloudGraph").getContext('2d'),{
		type:'line',
		data:{
			labels:lengths[3],
			datasets:[{
				//label:"Average uptime per area",
				data:bcloud
			}]
		},
		options:{
			borderColor:"#C94848",
			backgroundColor:"#E59191",
			title:{
				display:true,
				text:"Uptime for bcloud"
			}
		}
	});
	var corpGraph = new Chart(document.getElementById("corpGraph").getContext('2d'),{
		type:'line',
		data:{
			labels:lengths[4],
			datasets:[{
				//label:"Average uptime per area",
				data:corp
			}]
		},
		options:{
			title:{
				display:true,
				text:"Uptime for corp"
			}
		}
	});
	var devGraph = new Chart(document.getElementById("devGraph").getContext('2d'),{
		type:'line',
		data:{
			labels:lengths[5],
			datasets:[{
				//label:"Average uptime per area",
				data:dev
			}]
		},
		options:{
			title:{
				display:true,
				text:"Uptime for dev"
			}
		}
	});
	var feedGraph = new Chart(document.getElementById("feedGraph").getContext('2d'),{
		type:'line',
		data:{
			labels:lengths[6],
			datasets:[{
				//label:"Average uptime per area",
				data:feed
			}]
		},
		options:{
			title:{
				display:true,
				text:"Uptime for feed"
			}
		}
	});
	var inetGraph = new Chart(document.getElementById("inetGraph").getContext('2d'),{
		type:'line',
		data:{
			labels:lengths[7],
			datasets:[{
				//label:"Average uptime per area",
				data:inet
			}]
		},
		options:{
			title:{
				display:true,
				text:"Uptime for inet"
			}
		}
	});
	var prodGraph = new Chart(document.getElementById("prodGraph").getContext('2d'),{
		type:'line',
		data:{
			labels:lengths[8],
			datasets:[{
				//label:"Average uptime per area",
				data:prod
			}]
		},
		options:{
			title:{
				display:true,
				text:"Uptime for prod"
			}
		}
	});
	var storageGraph = new Chart(document.getElementById("storageGraph").getContext('2d'),{
		type:'line',
		data:{
			labels:lengths[9],
			datasets:[{
				//label:"Average uptime per area",
				data:storage
			}]
		},
		options:{
			title:{
				display:true,
				text:"Uptime for storage"
			}
		}
	});
	var tdmzGraph = new Chart(document.getElementById("tdmzGraph").getContext('2d'),{
		type:'line',
		data:{
			labels:lengths[10],
			datasets:[{
				//label:"Average uptime per area",
				data:tdmz
			}]
		},
		options:{
			title:{
				display:true,
				text:"Uptime for tdmz"
			}
		}
	});
}
function averageGraph(areas,upTimes){
	var temp=[];
	var sums=[0,0,0,0,0,0,0,0,0,0,0];
	var counts=[0,0,0,0,0,0,0,0,0,0,0];
	var gdata=[];
	for(var x=0;x<areas.length;x++){
		if(upTimes[x] != ""){
			var hold = parseInt(upTimes[x])
			temp.push(hold);
		}else{
			temp.push(0);
		}
	}
	for(var y=0;y<areas.length;y++){
		if(areas[y]!=undefined){
			//console.log(areas[y]);
			//console.log(temp[y]);
			if(areas[y]==('1')){
				sums[0]+=temp[y];
				counts[0]+=1;
			}else if(areas[y]==('admin')){
				sums[1]+=temp[y];
				counts[1]+=1;
			}else if(areas[y]==('apex')){
				sums[2]+=temp[y];
				counts[2]+=1;
			}else if(areas[y]==('bcloud')){
				sums[3]+=temp[y];
				counts[3]+=1;
			}else if(areas[y]==('corp')){
				sums[4]+=temp[y];
				counts[4]+=1;
			}else if(areas[y]==('dev')){
				sums[5]+=temp[y];
				counts[5]+=1;
			}else if(areas[y]==('feed')){
				sums[6]+=temp[y];
				counts[6]+=1;
			}else if(areas[y]==('inet')){
				sums[7]+=temp[y];
				counts[7]+=1;
			}else if(areas[y]==('prod')){
				sums[8]+=temp[y];
				counts[8]+=1;
			}else if(areas[y]==('storage')){
				sums[9]+=temp[y];
				counts[9]+=1;
			}else if(areas[y]==('tdmz')){
				sums[10]+=temp[y];
				counts[10]+=1;
			}	
		}
	}
	for(var x=0;x<sums.length;x++){
		gdata.push((sums[x]/counts[x]));
	}
	console.log(sums);
	console.log(counts);
	console.log(gdata);
	var graph = new Chart(document.getElementById("avgGraph1").getContext('2d'),{
		type:'doughnut',
		data:{
			labels:["1","admin","apex","bcloud","corp","dev","feed","inet","prod","storage","tdmz"],
			backgroundColor:["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850","#00FFFF","#7FFF00","#008000","#87CEFA","#800000","#191970"],
			datasets:[{
				label:"Average uptime per area",
				data:gdata
			}]
		},
		options:{
			title:{
				display:true,
				text:"Average uptime per area"
			}
		}
	});
	var graph2 = new Chart(document.getElementById("avgGraph2").getContext('2d'),{
		type:'bar',
		data:{
			labels:["1","admin","apex","bcloud","corp","dev","feed","inet","prod","storage","tdmz"],
			backgroundColor:["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850","#00FFFF","#7FFF00","#008000","#87CEFA","#800000","#191970"],
			datasets:[{
				label:"Average uptime per area",
				data:gdata
			}]
		},
		options:{
			title:{
				display:true,
				text:"Average uptime per area"
			}
		}
	});
}

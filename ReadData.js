var databaseInstance=firebase.database();

function dataRetreived(data){
	console.log(data.val());
}

function dataException(err){
	console.log(err);
}
var ref=database.ref('area' , dataRetreived, dataException)
//Socket de connexion au serveur
$(document).ready(function () {
	var host = "157.169.100.155";							// hote pour la connection
	var entry_port = "8333";								// port de connection
	var sock = new io.Socket(host, {port:entry_port});		// socket de connection 
	
	sock.connect();			// connection au serveur
	
	actionClient(sock);		//gestion des actions clients
	
	//Get article
	var articles = sock.send(JSON.stringify({message:'get'}));
	
	//Reception des messages serveur
	sock.on('message', function (data) {
		var obj = JSON.parse(data);			//Transformation de la chaine JSON en objet
		messageProcessing(obj);				//Traitement du message
	});
	
});

//Actions clients sur les documents²
function actionClient(sock){
	//Ajout d'un article
	$("#add").click(function(e){
		newMessage('Page en cours d\'envoi...');
		sock.send(JSON.stringify({message:'add', title:$("#titre").html(), data:$("#article").html()}));
	});

	//Suppression d'un article
	$("#delete").click(function(){
		newMessage('Page en cours de suppresion...');
		sock.send(JSON.stringify({message:'delete', data:$("#id_article").html()}));
	});
	
	//Mise à jour d'un article
	$("#update").click(function(){
		newMessage('Page en cours de mise à jour...');
		sock.send(JSON.stringify({message:'update', title:$("#titre").html(), data:$("#article").html()}));
	});
}

//Traite les messages de retour serveur
function messageProcessing(obj){
	
	switch (obj.message){
		case 'connect':
			newMessage('Connect&eacute; au serveur');
			break;
		case 'disconnect':
			newMessage('D&eacute;connect&eacute; du serveur');
			break;
		case 'add':
			newMessage('Page ajout&eacute;e');
			break;
		case 'update':
			newMessage('Page modifi&eacute;e');
			break;
		case 'delete':
			newMessage('Page supprim&eacute;e');
			break;
		case 'error':
			newMessage('');
			break;
		default:
	}
}

//Affiche un nouveau message
function newMessage(message){
	var dialog;
	dialog	= $('#dialog');
	dialog.html(message);
}

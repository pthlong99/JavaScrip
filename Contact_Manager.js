var Contact = require('./Contact.js');
var fs = require('fs');
var readlineSync = require('readline-sync');
var Contacts = [];

function readData(){
	var readFile = fs.readFileSync('./Contact_Data.json', encoding = 'utf8');
	Contacts = JSON.parse(readFile);
}

function showMenu(){
	console.log("1. Create new contact");
	console.log("2. Fix contacts list");
	console.log("3. Delete contact");
	console.log("4. Search contact");
	console.log("5. Show contacts list")
	console.log("0. Save & Exit");
	var option = readlineSync.question('> ');
	switch(option){
		case '1':
			create_Contact();
			showMenu();
			break;
		case '2':
			fix_Contact();
			showMenu();
			break;
		case '3':
			delete_Contact();
			showMenu();
			break;
		case '4':
			search_Contact();
			showMenu();
			break;
		case '5':
			show_Contacts();
			showMenu();
			break;
		case '0':
			saveAndExit();
			break;
		default:
			console.log('Wrong option!');
			showMenu();
	}
}

function create_Contact(){
	var name = readlineSync.question('Name: ');
	var phone = readlineSync.question('Phone: ');
	var contact = new Contact(name, phone);
	Contacts.push(contact);
}

function fix_Contact(){
	var fix = readlineSync.question('Enter contact\'name, which you want fix: ');
	var i = Contacts.findIndex(function(x){
		return x.name === fix;
	});
	var name = readlineSync.question('New contact\'name: ');
	var phone = readlineSync.question('New phoned: ');
	Contacts[i].name = name;
	Contacts[i].phone = phone;
}

function delete_Contact(){
	var fix = readlineSync.question('Enter contact\'name, which you want delete: ');
	var i = Contacts.findIndex(function(x){
		return x.name === fix;
	});
	Contacts.splice(i,1);
}

function search_Contact(){
	var str = readlineSync.question('Enter contact\'information, which you want search: ');
	var count = 0;
	for(var i of Contacts){
		if(i.name.search(str) >= 0 || i.phone.search(str) >= 0){
			console.log('Name: ', i.name);
			console.log('Phone: ', i.phone);
			count++;
		}
	}
	if(count === 0){
		console.log('Contact is defined!');
	}
}

function show_Contacts(){
	for(var i of Contacts){
		console.log('Name: ', i.name);
		console.log('Phone: ', i.phone);
		console.log('\n');
	}
}

function saveAndExit(){
	var str = JSON.stringify(Contacts);
	fs.writeFileSync('./Contact_Data.json',str);
}

function main(){
	readData();
	showMenu();
}

main();


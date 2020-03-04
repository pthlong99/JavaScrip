var fs = require('fs');
var readlineSync = require('readline-sync');

var students = [];

function showMenu(){
	console.log('1.Show all students');
	console.log('2.Create a new Student');
	console.log('3.Save & Exit');
	var option = readlineSync.question('> ');
	switch(option){
		case '1':
			showAllStudents();
			showMenu();
			break;
		case '2':
			createStudent();
			showMenu();
			break;
		case '3':
			saveAndExit();
			break;
		default:
			console.log('Wrong option');
			showMenu();
			break;
	}
}

function loadData(){
	var str = fs.readFileSync('./data.json',encoding = 'utf8');
	students = JSON.parse(str);
}

function showAllStudents(){
	for(var student of students){
		console.log(student.name, student.age);
	}
}

function createStudent(){
	var name = readlineSync.question('Name\'student: ');
	var age = readlineSync.question('Student age: ');
	var student = {
		name: name,
		age: parseInt(age)
	};
	students.push(student);
}

function saveAndExit(){
	var str = JSON.stringify(students);
	fs.writeFileSync('./data.json',str);
}

function main(){
	loadData();
	showMenu();
}
main();
function DataTable(config, data) {
	let divElem = document.querySelector(config.parent);
	let table = "<table class='rounded'><thead><tr><th class='number'>№</th>";
	config.columns.forEach(element => table+="<th class="+element.value+">"+element.title+"</th>");
	table += "</tr></thead><tbody>";
	data.forEach(function (row,index){
		table+="<tr><td>"+(index+1)+"</td>";
		config.columns.forEach(function (cell){
			table+="<td>"+row[cell.value]+"</td>";
		})
		table+="</tr>";
	})
	table += "</tbody></table>";
	divElem.innerHTML+=table;
}


const config1 = {
  parent: '#usersTable',
  columns: [
    {title: 'Имя', value: 'name'},
    {title: 'Фамилия', value: 'surname'},
    {title: 'Возраст', value: 'age'},
  ]
};



const users = [
  {id: 30050, name: 'Вася', surname: 'Петров', age: 12},
  {id: 30051, name: 'Вася', surname: 'Васечкин', age: 15},
];
window.onload = function (){
DataTable(config1, users)
};



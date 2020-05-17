// Fetch to get all monsters from api
let _currentPage = 1;

const sortDescById = arr => {
	return arr.sort((a,b) => b.id - a.id )
};

const getMonsters = (page=0,limit=50) => {
	fetch(`http://localhost:3000/monsters?_sort=id&_order=desc&_limit=${limit}&_page=${page}`)
	.then( res => res.json() )
	.then( json => populateMonsterContainer(json) );
};


const populateMonsterContainer = monsterData => {
	monsterData.forEach(monster => {
		const monsterContainer = document.getElementById('monster-container');
		const monsterDiv = document.createElement('div');
		monsterDiv.className = 'monster-div';
		monsterDiv.innerHTML = `
			<h2>${monster.name}</h2>
			<h4>${monster.age}</h4>
			<h6>Id: ${monster.id}</h6>
			<p>${monster.description}</p>`;
		monsterContainer.appendChild(monsterDiv);
	});
};

document.addEventListener("submit", e => {
	e.preventDefault();
	const form = event.target
	const newMonsterData = {
		name: form.name.value,
		age: form.age.value,
		description: form.description.value
	};
	const meta = {
		headers: {
			"Content-Type": "application/json",
  			Accept: "application/json"
		},
		method: "post",
		body: JSON.stringify(newMonsterData)
	};
	const url = "http://localhost:3000/monsters";
	fetch(url, meta)
	.then(res => res.json())
	.then(json => populateMonsterContainer([json]))
})

const handlePageChange = (nextPage=true) => {
	document.getElementById('monster-container').innerHTML = '';
	if (nextPage){
		_currentPage++;
		getMonsters(_currentPage)
	} else {
		_currentPage--;
		getMonsters(_currentPage)
	}
}


document.addEventListener('DOMContentLoaded', () => {
	getMonsters();


	const nextPageButton = document.getElementById('forward');
	nextPageButton.addEventListener('click', e => {
		handlePageChange();
	});
	const lastPageButton = document.getElementById('back');
	lastPageButton.addEventListener('click', () => {
		handlePageChange(false)	
	})
})

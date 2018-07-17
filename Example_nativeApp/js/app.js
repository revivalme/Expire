// Creating objects

class Item {
	constructor(name, volume, expire, type) {
		this.name = name;
		this.volume = volume;
		this.expire = expire;
		this.type = type;
	}
}

class DB {
	static addItem(item) {
		// Firebase vars
		const dbRefObject = firebase.database().ref().child('alcoholic department');
		const dbRefType = dbRefObject.child(item.type);

		// Add new item to the database list with unique id
		dbRefType.push().set(item);
	}
}

class UI {
	static addItemToList(item) {
		// DOM vars
		const list = document.getElementById(detectMonth(item.expire));

		// Create list-group-item
		const link = document.createElement('a');
		link.className = 'list-group-item list-group-item-warning d-flex justify-content-between align-items-center';
		link.innerHTML = `${item.name}<span class="badge badge-secondary">${item.expire}</span>`;
	
		// Add new item to the list
		list.querySelector(`#${item.type}`).appendChild(link);		
	}
}

// Detect month function
function detectMonth(date) {
	const format = date.split('.');
	const monthNames = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
	return monthNames[new Date(format[2], format[1] - 1, format[0]).getMonth()];
}

// Done after some changes in db
firebase.database().ref().child('alcoholic department').child('juice').on('value', snap => {
	snap.forEach(function(child){
		// Unique id of item
		const key = child.key;
		const element = child.val();

		// Create item object
		const item = new Item(element.name, element.volume, element.expire, element.type);
		UI.addItemToList(item);
	});
});

// Add click event to the button
document.querySelector('#submit').addEventListener('click', (e) => {
	// DOM vars
	const item = document.querySelector('#item');
	const volume = document.querySelector('#volume');
	const expire = document.querySelector('#expire');
	const type = item[item.selectedIndex].parentElement.dataset.type;
	
	DB.addItem(new Item(item.value, volume.value, expire.value, type));
});
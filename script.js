var store = [
    {title: "Яблоко", count: 5, price: 20},
    {title: "Апельсин", count: 3, price: 20},
    {title: "Банан", count: 4, price: 20},
    {title: "Груша", count: 7, price: 20},
    {title: "Брусника", count: 10, price: 20},
];

var basket = [];


document.addEventListener("DOMContentLoaded", () => {

	document.getElementById('store').addEventListener('click', function(event){
		if (event.target.className === 'row item disable-selection') {

			basket = incrementElement(basket, store, event.target.value);
			store = decrementElement(store, event.target.value);
			document.getElementById('cost').innerHTML = getCost(basket);

			console.log(basket);
			console.log(store);
			refresh(store, basket)
		}
	})

	document.getElementById('basket').addEventListener('click', function(event){
		if (event.target.className === 'row item disable-selection') {
			
			store = incrementElement(store, basket, event.target.value);
			basket = decrementElement(basket, event.target.value);
			document.getElementById('cost').innerHTML = getCost(basket);

			console.log(basket);
			console.log(store);
			refresh(store, basket)
		}
	})

	refresh(store, basket)
});

	//функция уменьшающая количество продукта на 1 или удаляющая продукт из массива
function decrementElement(data, value) {
	for (let i = 0; i < data.length; i++) {
		if (data[i].title === value) {
			if (data[i].count === 1) {
				data.splice(i, 1);
			}
			else {
				data[i].count -= 1;
			}
		}
   }
   return data
}

	//функция увеличивает количество продукта на 1 или добавляет продукт из массива
function incrementElement(dataInc, dataDec, value) {
	isProductInData = false

	for (let i = 0; i < dataInc.length; i++) {
		if (dataInc[i].title === value) {
			dataInc[i].count += 1;
			isProductInData = true;
		}
	}

	if (isProductInData == false) {
		for (let i = 0; i < dataDec.length; i++) {
			if (dataDec[i].title === value) {
				dataInc[dataInc.length] = {title: value, count: 1, price: dataDec[i].price};
			}
		}
	}

	return dataInc
}

// функция считает цену
function getCost(data) {
	let cost = 0;
	if (data.length === 0) {
		return cost
	}

	for (let i = 0; i < data.length; i++) {
		cost += data[i].count * data[i].price;
	}

	return cost
}

// функция обновления данных
function refresh(store, basket) {
	clear()

	store.forEach(item => {
		document.getElementById('store').appendChild(createElementStore(item))
	});

    basket.forEach(item => {
		document.getElementById('basket').appendChild(createElementBasket(item))
	});
}

// функция очистки
function clear() {
	document.getElementById('store').innerHTML = '';
    document.getElementById('basket').innerHTML = '';
}

// создание html представления хранилища
function createElementStore(item) {
	// ячейка названия продукта
	var inputTitle = document.createElement('input');
	inputTitle.type = 'button';
	inputTitle.className = "row item disable-selection";
	inputTitle.value = item.title;

	// ячейка количества продукта
	var divCount = document.createElement('div');
	divCount.innerHTML = item.count;

	var divStore = document.createElement('div');
	divStore.appendChild(inputTitle);
	divStore.appendChild(divCount);
	divStore.className = "store";
	divStore.id = 'store_product'

	return divStore;
}

// создание html представления корзины
function createElementBasket(item) {
	// ячейка названия продукта
	var inputTitle = document.createElement('input');
	inputTitle.type = 'button';
	inputTitle.className = "row item disable-selection";
	inputTitle.value = item.title;
	inputTitle.id = 'basket_' + item.id;

	// ячейка количества продукта
	var divCount = document.createElement('div');
	divCount.innerHTML = item.count;

	var divBasket = document.createElement('div');
	divBasket.appendChild(inputTitle);
	divBasket.appendChild(divCount);
	divBasket.className = "basket";
	divBasket.id = 'basket_product'

	return divBasket;
}


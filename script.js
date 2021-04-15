class Product {
	constructor(title, count, price) {
		this.title = title;
		this.count = count;
		this.price = price;
	}
}

var store = [];

store.push(new Product("Яблоко", 5, 20))
store.push(new Product("Апельсин", 5, 20))
store.push(new Product("Банан", 5, 20))
store.push(new Product("Груша", 5, 20))
store.push(new Product("Брусника", 5, 20))

var basket = [];


document.addEventListener("DOMContentLoaded", () => {
	document.getElementById('cost').innerHTML = 0;

	document.getElementById('store').addEventListener('click', function(event){
		if (event.target.id === 'store_product') {
			console.log('sffs')
			basket = incrementElement(basket, store, event.target.value);
			store = decrementElement(store, event.target.value);
			document.getElementById('cost').innerHTML = getCost(basket);

			refresh()
		}
	})

	document.getElementById('basket').addEventListener('click', function(event){
		if (event.target.className === 'row item') {
			
			store = incrementElement(store, basket, event.target.value);
			basket = decrementElement(basket, event.target.value);
			document.getElementById('cost').innerHTML = getCost(basket);

			refresh()
		}
	})

	refresh()
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
function refresh() {
	clear()

	store.forEach(item => {
		document.getElementById('store').appendChild(createElement(item, "store"))
	});

    basket.forEach(item => {
		document.getElementById('basket').appendChild(createElement(item, "basket"))
	});
}

// функция очистки
function clear() {
	document.getElementById('store').innerHTML = '';
    document.getElementById('basket').innerHTML = '';
}

// создание html представления корзины и склада
function createElement(item, className) {
	// ячейка названия продукта
	var inputTitle = document.createElement('input');
	inputTitle.type = 'button';
	inputTitle.className = "item-title";
	inputTitle.value = item.title;

	// ячейка количества продукта
	var divCount = document.createElement('div');
	divCount.innerHTML = item.count;
	divCount.className = "item-count";

	// ячейка цена продукта
	var divPrice = document.createElement('div');
	divPrice.innerHTML = item.price;
	divPrice.className = "item-price";

	var divElement = document.createElement('div');
	divElement.appendChild(inputTitle);
	divElement.appendChild(divCount);
	divElement.appendChild(divPrice);
	divElement.className = "row item";
	divElement.id = className + '_product';

	return divElement;
}

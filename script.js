var store = [
    {id: 0, title: "Яблоко"},
    {id: 1, title: "Апельсин"},
    {id: 2, title: "Банан"},
    {id: 3, title: "Груша"},
    {id: 4, title: "Брусника"},
];

var basket = [
    // {id: 0, title: "Кефир"},
    // {id: 1, title: "Молоко"},
    // {id: 2, title: "Йогурт"},
    // {id: 3, title: "Сок"},
    // {id: 4, title: "Шоколад"},
];

document.addEventListener("DOMContentLoaded", () => {

	 //обработка нажатия "обновить"
	// document.getElementById("item-title").addEventListener("click", () => {
	//   	refresh(store);
	// });

	// первичное отображение данных
	refresh(store, basket)
});

// функция обновления данных в контейнере
function refresh(store, basket) {
	clear()

	store.forEach(item => {
		document.getElementById('store').appendChild(createElementStore(item))
	});

    basket.forEach(item => {
		document.getElementById('basket').appendChild(createElementBasket(item))
	});
}

// функция очищения контейнера фильмов
function clear() {
	document.getElementById('store').innerHTML = '';
    document.getElementById('basket').innerHTML = '';
}

// создание html представления хранилища
function createElementStore(item) {
	// ячейка названия продукта
	var divTitle = document.createElement('button');
	divTitle.className = "item-title";
	divTitle.innerHTML = item.title;

	// строка хранилища
	var divItemContainer = document.createElement('div');
	divItemContainer.className = "row item disable-selection";
	divItemContainer.appendChild(divTitle);
	divItemContainer.id = 'store_' + item.id;

	return divItemContainer;
}

// создание html представления корзины
function createElementBasket(item) {
	// ячейка названия продукта
	var divTitle = document.createElement('button');
	divTitle.className = "item-title";
	divTitle.innerHTML = item.title;

	// строка корзины
	var divItemContainer = document.createElement('div');
	divItemContainer.className = "row item disable-selection";
	divItemContainer.appendChild(divTitle);
	divItemContainer.id = 'basket_' + item.id;

	return divItemContainer;
}
class Product {
    id;
    title;
    manufacture;
    price;

    constructor(id, title, manufacture, price) {
        this.id = id;
        this.title = title;
        this.manufacture = manufacture;
        this.price = price;
    }
}

class Milk extends Product {
    fat;
    constructor(id, title, manufacture, price, fat) {
        super(id, title, manufacture, price);
        this.fat = fat;
    }
}

class Chocolate extends Product {
    kind;
    constructor(id, title, manufacture, price, kind) {
        super(id, title, manufacture, price);
        this.kind = kind;
    }
}

class Wine extends Product {
    alcohol;
    constructor(id, title, manufacture, price, alcohol) {
        super(id, title, manufacture, price);
        this.alcohol = alcohol;
    }
}

class Store {
    products = [];
    constructor(products = []) {
        this.products = products;
    }
    add(product) {
        this.products.push(product);
    }
    getAll() {
        return this.products;
    }
    getByType(type) {
        return this.products.filter(p => p instanceof type);
    }
    getByTitle(title) {
        return this.products.filter(p => p.title === title);
    }
}

const store = new Store([
    new Milk(1, "Домик в деревне", "Wimm-Bill-Dann", 5.2, "3.2%"),
    new Milk(2, "Простоквашино", "Danone", 5.5, "2.5%"),
    new Milk(3, "Вкуснотеево", "Рузское молоко", 5.8, "3.2%"),
    new Milk(4, "36 копеек", "Wimm-Bill-Dann", 4.9, "2.5%"),
    new Milk(5, "Веселый молочник", "Danone", 5.1, "3.5%"),
    new Milk(6, "Alpro Soy Milk", "Alpro", 9.0, "0%"),
    new Milk(7, "Alpro Almond Milk", "Alpro", 9.2, "0%"),
    new Milk(8, "Valio Lactose-Free", "Valio", 7.5, "1.5%"),
    new Milk(9, "Arla Organic", "Arla", 6.9, "3.5%"),
    new Milk(10, "Parmalat Classic", "Parmalat", 6.2, "3.2%"),
    new Chocolate(11, "Аленка", "Красный Октябрь", 6.0, "Milk"),
    new Chocolate(12, "Россия – Щедрая душа", "Nestlé Russia", 6.5, "Dark"),
    new Chocolate(13, "Бабаевский", "Бабаевский концерн", 6.9, "Dark"),
    new Chocolate(14, "Коммунарка", "Беларусь", 5.5, "Milk"),
    new Chocolate(15, "Ritter Sport", "Ritter", 7.8, "Milk"),
    new Chocolate(16, "Lindt Excellence", "Lindt", 9.0, "Dark"),
    new Chocolate(17, "Milka Alpine Milk", "Mondelez", 6.8, "Milk"),
    new Chocolate(18, "Toblerone", "Mondelēz", 7.5, "Milk"),
    new Chocolate(19, "Ferrero Rocher", "Ferrero", 8.5, "Milk"),
    new Chocolate(20, "KitKat", "Nestlé", 6.0, "Milk"),
    new Wine(21, "Массандра Кагор", "Массандра", 15.0, "16%"),
    new Wine(22, "Фанагория Каберне", "Фанагория", 14.5, "13.5%"),
    new Wine(23, "Лефкадия Белое", "Лефкадия", 13.5, "12%"),
    new Wine(24, "Абрау-Дюрсо Брют", "Абрау-Дюрсо", 16.0, "12%"),
    new Wine(25, "Château Margaux", "France", 120.0, "13%"),
    new Wine(26, "Penfolds Bin 389", "Australia", 95.0, "14%"),
    new Wine(27, "Barolo DOCG", "Italy", 75.0, "14%"),
    new Wine(28, "Chablis Premier Cru", "France", 50.0, "12.5%"),
    new Wine(29, "Santa Rita 120", "Chile", 20.0, "13%"),
    new Wine(30, "Yellow Tail Shiraz", "Australia", 18.0, "13.5%")
]);

const outputDiv = document.getElementById("output");
const input = document.getElementById("searchInput");
const showAllBtn = document.getElementById("showAllBtn");
const showByTypeBtn = document.getElementById("showByTypeBtn");
const showByTitleBtn = document.getElementById("showByTitleBtn");

function showProducts(products) {
    outputDiv.innerHTML = "";
    if (products.length === 0) {
        outputDiv.textContent = "Ничего не найдено.";
        return;
    }

    const groups = {};
    products.forEach(p => {
        const type = p.constructor.name;
        if (!groups[type]) {
            groups[type] = [];
        }
        groups[type].push(p);
    });

    for (const type in groups) {
        const section = document.createElement("div");
        const ul = document.createElement("ul");
        groups[type].forEach(p => {
            const li = document.createElement("li");
            li.textContent = `${p.title} – ${p.manufacture}, price  $${p.price} `;
            ul.appendChild(li);
        });
        section.appendChild(ul);
        outputDiv.appendChild(section);
    }
}

showAllBtn.addEventListener("click", () => {
    showProducts(store.getAll());
});

showByTypeBtn.addEventListener("click", () => {
    const type = input.value.trim();
    const filtered = store.getAll().filter(product => product.constructor.name.toLowerCase() === type.toLowerCase());

    if (filtered.length > 0) {
        showProducts(filtered);
    } else {
        outputDiv.textContent = "Неверный тип или ничего не найдено. Введите: Milk, Chocolate, Wine.";
    }
});

showByTitleBtn.addEventListener("click", () => {
    const title = input.value.trim();
    showProducts(store.getByTitle(title));
});

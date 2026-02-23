"use strict";

console.log("%c--- ЧАСТИНА 1: Об'єкти без ES6 класів ---", "color: blue; font-weight: bold;");

// 1.2.3 Створення car1 через new Object() [cite: 25]
var car1 = new Object();
car1.color = "Red";
car1.maxSpeed = 240;
car1.driver = {
    name: "Футрак Софія", 
    category: "C",
    "personal limitations": "No driving at night"
};
car1.tuning = true;
car1["number of accidents"] = 0;

// 1.2.4 Створення car2 через літерал [cite: 30]
var car2 = {
    color: "Silver",
    maxSpeed: 210,
    driver: {
        name: "Ваше Ім'я та Прізвище",
        category: "B",
        "personal limitations": null
    },
    tuning: false,
    "number of accidents": 2
};

// 1.2.5 - 1.2.6 Додавання методів drive [cite: 35, 37]
car1.drive = function() { console.log("I am not driving at night"); };
car2.drive = function() { console.log("I can drive anytime"); };

car1.drive();
car2.drive();

// 1.2.7 - 1.2.9 Конструктор Truck та методи [cite: 39, 42, 45]
function Truck(color, weight, avgSpeed, brand, model) {
    this.color = color;
    this.weight = weight;
    this.avgSpeed = avgSpeed;
    this.brand = brand;
    this.model = model;

    this.trip = function() {
        if (!this.driver) {
            console.log("No driver assigned");
        } else {
            let msg = `Driver ${this.driver.name} `;
            msg += this.driver.nightDriving ? "drives at night " : "does not drive at night ";
            msg += `and has ${this.driver.experience} years of experience`;
            console.log(msg);
        }
    };
}

Truck.prototype.AssignDriver = function(name, nightDriving, experience) {
    this.driver = { name, nightDriving, experience };
};

// 1.2.10 Демонстрація Truck [cite: 50]
let truck1 = new Truck("White", 10000, 70, "MAN", "TGX");
let truck2 = new Truck("Yellow", 8000, 75, "DAF", "XF");

truck1.AssignDriver("Олексій Коваленко", true, 12);
truck2.AssignDriver("Ігор Сидоренко", false, 3);

truck1.trip();
truck2.trip();

console.log("%c--- ЧАСТИНА 2: Класи ES6 ---", "color: blue; font-weight: bold;");

// 1.2.12 - 1.2.15 Клас Square [cite: 53, 56, 57, 58]
class Square {
    constructor(a) { this.a = a; }
    static help() { console.log("Квадрат - правильний чотирикутник."); }
    length() { console.log(`Периметр: ${4 * this.a}`); }
    square() { console.log(`Площа: ${this.a * this.a}`); }
    info() {
        console.log(`Квадрат: сторона=${this.a}, Кути=90, Периметр=${4*this.a}, Площа=${this.a*this.a}`);
    }
}

// 1.2.16 - 1.2.17 Клас Rectangle [cite: 66, 69]
class Rectangle extends Square {
    constructor(a, b) { super(a); this.b = b; }
    static help() { console.log("Прямокутник - чотирикутник з рівними кутами."); }
    length() { console.log(`Периметр: ${2 * (this.a + this.b)}`); }
    square() { console.log(`Площа: ${this.a * this.b}`); }
    info() {
        console.log(`Прямокутник: a=${this.a}, b=${this.b}, Периметр=${2*(this.a+this.b)}, Площа=${this.a*this.b}`);
    }
}

// 1.2.18 - 1.2.19 Клас Rhombus [cite: 75, 78]
class Rhombus extends Square {
    constructor(a, alpha, beta) { super(a); this.alpha = alpha; this.beta = beta; }
    static help() { console.log("Ромб - чотирикутник з рівними сторонами."); }
    // Геттери та сеттери (п. 1.2.22) [cite: 92]
    get side() { return this.a; }
    set side(val) { this.a = val; }
    info() {
        console.log(`Ромб: сторона=${this.a}, кути ${this.alpha}/${this.beta}, Периметр=${4*this.a}`);
    }
}

// 1.2.20 - 1.2.21 Клас Parallelogram [cite: 84, 87]
class Parallelogram extends Rectangle {
    constructor(a, b, alpha, beta) { super(a, b); this.alpha = alpha; this.beta = beta; }
    static help() { console.log("Паралелограм - сторони попарно паралельні."); }
    info() {
        console.log(`Паралелограм: a=${this.a}, b=${this.b}, кути ${this.alpha}/${this.beta}`);
    }
}

// 1.2.23 - 1.2.24 Виклики [cite: 93, 94]
Square.help(); Rectangle.help(); Rhombus.help(); Parallelogram.help();
new Square(5).info();
new Rectangle(4, 8).info();
new Rhombus(6, 120, 60).info();
new Parallelogram(5, 10, 110, 70).info();

console.log("%c--- ЧАСТИНА 3: Функції та замикання ---", "color: blue; font-weight: bold;");

// 1.2.25 - 1.2.26 Triangular [cite: 96, 100]
function Triangular(a = 3, b = 4, c = 5) { return { a, b, c }; }
console.log(Triangular());
console.log(Triangular(6, 8, 10));

// 1.2.27 - 1.2.28 PiMultiplier [cite: 101, 102]
function PiMultiplier(factor) {
    return function() { return Math.PI * factor; };
}
const p1 = PiMultiplier(2);
const p2 = PiMultiplier(2/3);
const p3 = PiMultiplier(0.5);
console.log("Pi * 2:", p1());
console.log("Pi * 2/3:", p2());
console.log("Pi / 2:", p3());

// 1.2.29 - 1.2.31 Painter [cite: 106, 107, 108]
function Painter(color) {
    return function(obj) {
        if (obj.type) {
            console.log(`Колір: ${color}, Тип: ${obj.type}`);
        } else {
            console.log("No ‘type’ property occurred!");
        }
    };
}
const PaintBlue = Painter("Blue");
const PaintRed = Painter("Red");
PaintBlue({ type: "Sportcar" });
PaintRed({ maxSpeed: 100 }); // Виведе помилку
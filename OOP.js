// factory function
const carObj = color => ({color})
let car_1 = carObj("red")
car_1

// constructor function
// 'use strict' // this too would prevent not using new
let CarObj = function(color) {
    if(!new.target) throw 'CarObj() must be called with new'
    this.color = color
};
let car = new CarObj("blue")
car

let CarObj2 = function(_color) {
    if(!new.target) throw 'CarObj() must be called with new'
    // Private Properties
    this.setColor = function(color){
        _color = color
    }
    this.getColor = function(){
        return _color
    }
};

let car2 = new CarObj2("blue").getColor()
car2

CarObj.prototype.myColor = function(){
    return `my color is ${this.color}`
}
let carProto = new CarObj('yellow').myColor()
carProto

///////// Object.create - makes prototype inheritance possible

console.dir(Object) // Master object (Constructor function)
// Object.create(prototypeObject, propertyObject) - 2nd arg is optional

const myObject = Object.create(Object.prototype)
const myObject2 = {}
const npProto = Object.create(null)
//console.dir all 3 and you see that 1 & 2 are same while 3 has no prototype

const Car = function(color){
    this.color = color
}

const car1 = new Car('red') // this runs the constructor hence it sets the initial ppt "color"
const car12 = Object.create(Car.prototype) // Same Prototype with initial ppt

// Extending Prototype

Car.prototype ={
    getColor() {
        return this.colr
    }
}

const ToyCar = function(){

}

ToyCar.prototype = Object.create(Car.prototype)

const legoCar = new ToyCar()

console.dir(legoCar instanceof ToyCar)  //true
console.dir(legoCar instanceof Car)  //true
console.dir(legoCar instanceof Object)  //true

console.dir(ToyCar.prototype.isPrototypeOf(legoCar))  //true
console.dir(Car.prototype.isPrototypeOf(legoCar))  //true
console.dir(Object.prototype.isPrototypeOf(legoCar))  //true

////////// Prototype Chain
const Carz = function(){}
Carz.prototype ={
    print() {
        return "I am a Car"
    }
}

const ToyCarz = function(){}
ToyCarz.prototype = Object.create(Carz.prototype)
ToyCarz.prototype.print = function(){
    return "I am a toyCar"
}

const ToyTransformer = function(){}
ToyTransformer.prototype = Object.create(ToyCarz.prototype)
ToyTransformer.prototype.print = function(){
    return "I am a ToyTransformer"
}

const toyota = new Carz().print();
const lego = new ToyCarz().print();
const optimusPrime = new ToyTransformer().print();

toyota
lego
optimusPrime
// we keep changing the print method, if there is non, it looks in its parent

////////// Extending Constructors

//Base Constructors
let Mammal = function(legs){
    this.legs = legs
}
Mammal.prototype ={
    walk(){
        return 'walking!'
    },
    sleep(){
        return 'sleeping!'
    }
}

let Bat = function(legs, isVegetarian){
    this.legs = legs
    Mammal.call(this, legs);
    this.isVegetarian = isVegetarian
}
Bat.prototype = Object.create(Mammal.prototype)
Bat.prototype.constructor = Bat
Bat.prototype.fly = function(){
    return 'flying';
}
console.dir(Bat)

let fruitBat = new Bat(4, true)
fruitBat

//////////// Object.setPrototypeOf

//Object.setPrototypeOf(destinationObject, SourceObject)

let honda = {
    drive(){
        return 'driving honda'
    }
}
let accord = {
    // drive(){
    //     return 'driving accord'
    // }, // this would run first
    drive(){
        return `${super.drive()} accord`
    }, // this would super instead
    wifi(){
        return 'using wifi'
    }
}
Object.setPrototypeOf(accord, honda)
// accord.__proto__ = honda //don't use this 

console.dir(accord.drive())


//////////// Object.assign (making copies)

let ford = {
    brand: "ford mgt",
    drive(){
        return 'driving ford'
    },
    break(){
        return 'breaking ford'
    }
}

let edge = {
    wifi(){
        return 'using wifi'
    }
}

Object.assign(edge, ford)
// - It copies all ppt & mtds of source to destination (directly not proto).
// - It override anything in the destination (if similar)

let exploreIsCopyOfFord = Object.assign({}, ford)
// this creates an empty object with shallow copy of ford i.e no proto

Object.assign(edge, {
    ignition(){
        return 'Thumb Start'
    }
})
// Add new methods

// Use case in constructors

let constructor1 = function(x,y,z){
    this.x = x;
    this.y = y;
    this.z = z;
}
let constructor2 = function(x,y,z){
    Object.assign(this, {x, y, z})
}

//////////// Javascript Mixins
const jsSkill = {
    knowsJS(){
        return true
    }
}
const engDegree = {
    hasDegree(){
        return true
    }
}
const jsEngr = Object.assign({}, jsSkill, engDegree)

jsEngr

// Factory Function
const humanFactory = function(obj){
    let isCrying = false;
    return Object.assign({}, obj, {
        cry(){
            isCrying =true;
            return this
        },
        isCrying(){
            return isCrying
        }
    })
}

const flyFactory = function(obj){
    let isFlying = false;
    return Object.assign({}, obj, {
        fly(){
            isFlying =true;
            return this
        },
        isFlying(){
            return isFlying
        }
    })
}

const superman = humanFactory(flyFactory({}))

console.log(superman.fly().cry().isFlying())


//////////////////// CLASSES /////////////////////

class Mammal2{
    constructor(_legs, _name){
        this.legs = _legs;
        this.name = _name;
        this.warmBlooded = true;
    }
    walk(){
        return `${this.name} is walking`
    }
}
class Bat2 extends Mammal2{
    constructor(_legs, _name, _eatsMeat){
        super(_legs, _name);
        this.eatsMeat = _eatsMeat;
    }
    fly(){
        return `${this.name} is flying`
    }
    walk(){
        let holding = this.eatsMeat ? 'bug' : 'carrot'
        return `${super.walk} with a ${holding}`
    }
}

let fruitBat2 = new Bat2(4, 'peter', false)

fruitBat2

// simplified

class Alpha{
    constructor(a,b,c,d){
        Object.assign(this, {a,b,c,d})
        // //Knowing which constructor is used//
        // console.log(new.target.name)
        // console.log(new.target)
    }
}
class Bravo extends Alpha{
    constructor(e,f, ...args){
        super(...args)
        Object.assign(this, {e,f})
    }
}
const newAlpha = new Alpha('a','b','c','d')
newAlpha
const newBravo = new Bravo('e','f','a','b','c','d')
newBravo

////////// Static Methods ///////////

class CarX{
    constructor(color, price){
        Object.assign(this, {color, price})
    }
    static comparePrice(car1, car2){
        return Math.abs(car1.price - car2.price)
    }
    getColor(){
        return this.color
    }
}

const redCarX = new CarX('red', 100)
const blueCarX = new CarX('blue', 105)
console.dir(CarX.comparePrice(redCarX, blueCarX))

/////////// Decorators ///////////////
// needs babel
// let shoes = function(target){
//     target.shoe = 'black'
// }
// let lipstick = function(color){
//     return function(target){
//         target.lips = color
//     }
// }

// @shoes
// @lipstick('pink')
// class Girl{}
// console.log(Girl.shoe, Girl.lips)

////////// Older ways

class Cart{
    constructor(color){
        this.color = color
    }
    getColor(){
        return this.color
    }
}

const redCart = new Cart('red')
//  method getColor can be overwritten
redCart.getColor = function(){
    return 'blah blah'
}
console.log(redCart.getColor())

// prevent overwrite without decorator
class Cart2{
    constructor(color){
        this.color = color
    }
}
// Object.defineProperty(objectWhosePptIs2BDefined, theMethod, Config )

// abstracting descriptor from Object.defineProperty
let descriptor = {
    value: function(){
        return this.color
    },
    writable: false,
    configurable: true,
    enumerable: true

}
// wrapping descriptor in readonly functio forflexibility
let readonly = function(target, key, descriptor){
    descriptor.writable = false
    return descriptor
}
descriptor = readonly(Cart2.prototype, 'getColor', descriptor)
Object.defineProperty(Cart2.prototype, 'getColor', descriptor)

const redCart2 = new Cart2('red')
//  method getColor would not get overwritten
redCart2.getColor = function(){
    return 'blah blah'
}
console.dir(redCart2.getColor())

//// Finally

// let readonly3 = function(target, key, descriptor){
//     descriptor.writable = false
//     return descriptor
// }

// class Cart3{
//     constructor(color){
//         this.color = color
//     }
//     @readonly3
//     getColor(){
//         return this.color
//     }
// }

// install
    // npm i typescript -g



// Compiling
    //tsc index.ts index.js
    //tsc index.ts index.js -w
    //tsc -w



// workflow
    // tsc init
    // "compilerOptions": { 'available on tsc init' }
    // "exclude": []
    // "include": []
    // "files": []



// type
    // 1) has to be Static for premitive data type, Array must have same type of value
    //    object must have same keys and each key must have same data type


/////////////////////////////  Dynamic types  /////////////////////////////

interface Example1 {
    [key: string]: string // you absolutely donna know what the key value would be
}

type TypeOne = 'default' | 'custom';

interface Example2 {
    [key in TypeOne]: string // the key would be one of the types in TypeOne
    // OR [key in 'default' | 'custom']: string
}

type TypeTwo = {
  id: number;
  name: string;
}

interface Example3 {
    [key in keyof TypeTwo]: string // the key would be one of the keys of object TypeTwo
}

enum Enum1 { A, B, C }

interface Example3 {
    [key in keyof typeof Enum1]: string // the key would be one of Enum1
}

//////////////////////////////////////////////////////////////////////////


// explicit types
    // let name: string;
    // let age: number;
    // let ispresent: boolean;
    // let data: string| number;

    // let name: string = jide;

    // let arr: string[] = []; (always initialize);
    // let arr2: Array<number> = [];
    // let mixedArr: (string| number | boolean)[] = [];
    // let fixedArr:ReadonlyArray<number> = [1,2]

    // let obj: object; (this would include every type of object including arrays, functions etc)
    // let obj2: {
    //     name: string,
    //     age: number,
    //     bool: boolean
    // }

    // let funct: Function; (Note that Function is in sentence case)
    // funct = (a: string, b: string|number, c?: number, d: boolean = true) => {
    //     ...
    // };
    // function funct2 (a: string, b: number):number { ... } or
    // let funct2 = (a: string, b: number) =>number { ... }
    //     (this is explicitly saying the function must return a Number. if nothing is returned, it is of type void)




// union type
    //(string| number | boolean)



// Intersection Types  >>>'combines multiple types into one.'
    // interface ErrorHandling {
    //     success: boolean;
    //     error?: { message: string };
    // }
    
    // interface ArtworksData {
    //     artworks: { title: string }[];
    // }
    
    // interface ArtistsData {
    //     artists: { name: string }[];
    // }


    // type ArtworksResponse = ArtworksData & ErrorHandling;
    // type ArtistsResponse = ArtistsData & ErrorHandling;


// any type
    // let data: any;
    // let arr : any[] =[];
    // with any, all type checking are disabled;



// unknown type
    // let hope: unknown; 'similar to any but not as lose.'
    // if we say
    // let age: number;
    // Then
    // age = unknown; we would get an error bcoz age expect number but unknown is not guaranteed to return number.



// never type
    // used to say a variable will never have a value. A good example is a function that throws error.
    // it would never have a value because it only runs when the code crashes.
    // function generateError(message: string, code: number):never {
    //     throw {message, code};
    // }



// literal type
    // let Gender: 'male' | 'female'; you can specify the exact value that should be accepted. 



// type aliases
    //type strOrNum = string | number; ( let result:strOrNum; )



// function signature
    // let funct1: (a:string, b:string) => void;  (function does not return any value);
    // let funct2: (a:number, b:number) => number; (function return a number);
    // let funct3: (obj: {name:string, age: number} ) => void; or 
    // type detail = {name:string, age: number}
    // let newFunct3: (obj: detail) => void



// DOM & Type Casting
    // const anchor = document.querySelector('a')!; ('the ! tell TypeScript that you are sure the element exist')
    // const nextElement = document.querySelector('.className')! as HTMLFormElement ('Tells typescript the type of element being selected');
    // const Detail = document.querySelector('.amount') as HTMLInputElement;
    // anchor.addEventListener('click', (e: Event) => { 
    //     Detail.valueAsNumber ('value should be of type number')
    // })
    // N.B: ('Typescript has an Event type');



// CLASSES
//     class Invoice {
//         client: string;
//         detail: string;
//         amount: number;

//         constructor(c: string, d: string, a: number ){
//             this.client = c;
//             this.detail = d;
//             this.amount = a;
//         }

//         format() {
//             return `${this.client} owes ${this.amount} for ${this.detail}`;
//         }
//     }

//     const inv1 = new Invoice('mario', 'work on mario website', 250);
//     const inv2 = new Invoice('luigi', 'work on luigi website', 300);
//     console.log(inv1, inv2);
//     // const invoiceList: Invoice[] =[]; (--- only instances of class object would be allowed in this array)



// Class Access Modifier
        //class Invoice2 {
        //    public client: string;
        //    private detail: string;
        //    readonly amount: number;

        //    constructor(c: string, d: string, a: number ){
        //        this.client = c;
        //        this.detail = d;
        //        this.amount = a;
        //    }
        //}

        //This gives us an option of
        //class Invoice3 {

        //    constructor(public client: string, private detail: string, readonly amount: number ){

        //    }
        //}


        

//Interface (define a structure for objects)
    // interface isPerson {
    //     name: string;
    //     age: number;
    //     present?: boolean  >>>  'optional property'
    //     readonly role: 'string'  >>>  'values in a readonly value cannot be reassigned after creation '
    //     speak(a: string): void;
    //     spend(a:number): number;
    // }

    // object of interface 'isPerson'
    // const me: isPerson = {
    //     name: 'sheriff',
    //     age: 99,
    //     speak(text: string): void{
    //         console.log(text)
    //     },
    //     spend(amount :number): number{
    //         console.log(`I spent ${amount}`)
    //         return amount
    //     }
    // }

    // This function accepts only object of interface 'isPerson'
    // const funcGreet = (param: isPerson) => console.log('hello', param.name);
    // funcGreet(me)




// Interface with function ()
    // interface InterfacedFunct {
    //     (source: string, subString: string): boolean;
    // }
    // let newFunct:InterfacedFunct = (src: string, substr: string ) =>{
    //     if(src && substr) return true;
    //     return false;
    // }




// Interface with class (class must include the 'implemented' interface )
    // interface hasFormatter {
    //     namy: string;
    //     format(): string;
    // }

    // class InterfacedClass implements hasFormatter {
    //     constructor(public nom:string, public namy: string){

    //     }
    //     format() {
    //         return `My name is ${this.namy}`
    //     }
    //     formatize() {
    //         return `My name is ${this.nom}`
    //     }
    // };

    // let savedValue: hasFormatter; ('this must either be an object of structure hasFormatter or an instance of a class that has implemented it')
    // savedValue = new InterfacedClass('this', 'that');
    // let listOfSavedValues: hasFormatter[] = []; ('This array would only contain hasFormatter type data')



// Interface Extend another interface
    // interface Username {
    //     firstName: string;
    //     lastName: string;
    // }
    
    // interface Profile extends Username{
    //     gender: string;
    //     age: number;
    // }



// Interface Extending Class




// GENERICS
    // const addId = (obj: object)=> {
    // const addId = <T>(obj: T)=> {
    // const addId = <T extends object>(obj: T)=> {
    // const addId = <T extends {name: string}>(obj: T)=> {
    //     let newId = Math.floor(Math.random() * 100)
    //     return {...obj, newId}
    // }

    // function loggingIdentity<T>(arg: T[]): T[] {
    // function loggingIdentity<T>(arg: Array<T>): Array<T> {
    //     console.log(arg.length);
    //     return arg;
    // }

    // with interface
        // interface Whatever<T> {
        //     name: string;
        //     age: number;
        //     others: T
        // }

        // const newValue: Whatever<string[]> = {
        //     name: 'dave',
        //     age: 20,
        //     others: ['hello']
        // }

// ENUM
    // enum CarBrand { toyota, honda, maserati }
        // 'we can access the enum with'
    // CarBrand.maserati
        // 'and we get 2 which is the index/value of maserati'
    //enum CarBrand { toyota = 9, honda, maserati }
    // CarBrand.maserati --- gets an index/value of 11
    //enum CarBrand { toyota = 9, honda = 15, maserati = 35 }
    // CarBrand.maserati --- gets an index/value of 35
    //enum CarBrand { toyota = 'strong', honda = 'fare', maserati = 'classy' }
    // CarBrand.maserati --- gets an index/value of 'classy'


// TUPLE ('are arrays with fixed number of data & data type for the specified index e.g')
    // it helps us know the type in array index when dynmically used
    // let myTuple: [string, number, boolean] = ['jade', 67, true];

    // let myTuple2: [string, number, boolean];
    // myTuple2= ['jade', 67, true];
        // N.B: values can be added into tuple with .push(). Good or bad?


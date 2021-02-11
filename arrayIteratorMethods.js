let sample = [1, 3, 11, 12, 22, 23, 31, 2, 3]
let nestedArr = [1, 2, [3, 4, [5, 6, [7, 8]]], [5, 6, [7, 8]]]

// sample.forEach((item, index) => console.log(`${item} is on index ${index}`))

// let newt = sample.map((item, index) => `${item} is on index ${index}`)  // return new Array

// let newt = sample.some((item, index) => item < 10 )  // return boolean

// let newt = sample.includes(1, 1) // return boolean - params "value", "optional start index"

// let newt = sample.every((item, index) => item < 100 )  // return boolean

// let newt = sample.filter((item, index) => item < 10 ) // return new Array

// let newt = sample.find((item, index) => item === 3 )  // return value

// sample.sort((a, b) => a -b ) // mutate the current array
// sample.sort((a, b) => {
//     var x = a
//     var a = b
//     if(x < y){return -1}
//     if(x > y){return 1}
//     return 0
// }) // especially useful when the for alphabets with special ops


// sample.fill(4, 2, 5) // mutate the current array. takes 3 params "the value to fill with", "optional start index default 0", "optional end index default array.length"

// sample.reverse() // mutate the current array.

// sample.flatMap() // same as sample.flat().Map()

// sample.reduce((accumulator, currentValue, currentIndex ) => accumulator + currentValue, initialValue)

// let newt = sample.reduce((accumulator, currentValue, currentIndex ) => accumulator + currentValue, 200 )

// let flatArr1 = nestedArr.flat(Infinity) // takes depth as argument default is 1
// flatArr1

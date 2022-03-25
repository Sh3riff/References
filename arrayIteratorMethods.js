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

// multiSample.sort((a, b) => a.age - b.age || a.name.localeCompare(b.name))
// moreSample.sort((a, b) => a.age < b.age ? -1 : a.age > b.age ? 1 : 0)

// Sorting decimal

const arr = [ '.0', '.1', '.2', '.4', '.2.1', '.3', '.4.1', '.5', '.5.1.5' ];
// lowest to highest
const compare = (a, b) => {
   if (a === b) {
      return 0
   };
   const aArr = a.split("."), bArr = b.split(".");
   for (let i = 0; i < Math.min(aArr.length, bArr.length); i++) {
      if (parseInt(aArr[i]) < parseInt(bArr[i])) {
         return -1
      };
      if (parseInt(aArr[i]) > parseInt(bArr[i])) {
         return 1
      };
   }
   if (aArr.length < bArr.length) {
      return -1
   };
   if (aArr.length > bArr.length) {
      return 1
   };
   return 0;
};
arr.sort(compare);


// sample.fill(4, 2, 5) // mutate the current array. takes 3 params "the value to fill with", "optional start index default 0", "optional end index default array.length"

// sample.reverse() // mutate the current array.

// sample.flatMap() // same as sample.flat().Map()

// sample.reduce((accumulator, currentValue, currentIndex ) => accumulator + currentValue, initialValue)

// let newt = sample.reduce((accumulator, currentValue, currentIndex ) => accumulator + currentValue, 200 )

// let flatArr1 = nestedArr.flat(Infinity) // takes depth as argument default is 1
// flatArr1

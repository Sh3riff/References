type promiserType = (promise: any) => {data: any; error: any}
export const promiser: promiserType = (promise) => {
  return promise.then((data:any) => ({ data, error: null })).catch((error: any) => ({ data: null, error }))
//   return promise.then((data:any) => [data, null]).catch((error: any) => [null, error])
}

// Multi promises - to be implemented when needed
// const promiser = (promise) => {
//     if (Array.isArray(promise)) promise = Promise.all(promise);
//     return promise.then((data) => [data, null]).catch((error) => [null, error]);
//   };

// Async version below

// const promiser = async (promise) => {
//   try {
//     const data = await promise
//     return [data, null]
//   } catch (err) {
//     return [null, error]
//   }
// }

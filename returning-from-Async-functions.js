// Note that you cannot return a synchronous result from an asynchronous function. 
// you should either use the response in the async function or return the promise

// Example

/////////doAsync.js

// function in full
const doAsync = async (param) => {
  const response = await TheAsyncFunction(parma);
  return response
}

// Same function in short syntax
const doAsync = async (userToken) => await TheAsyncFunction;

/////////usedoAsync.js
import doAsync from ('doAsync')

const  usedoAsync = async (abc) => {
    try {
       const value = await doAsync(abc)
        // use value here, do not return value 
    } catch (error) {
        //handle error        
    }
    
}

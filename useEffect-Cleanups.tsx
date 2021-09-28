https://dmitripavlutin.com/react-cleanup-async-effects/


//////////////////////////////////////////  Axios  //////////////////////////////////////////

import { useState, useEffect } from 'react';

function MyComponent() {
  const [value, setValue] = useState();

  useEffect(() => {
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();
    (async () => {
      try {
        const { data } = await instance.get("/", {
          cancelToken: source.token,
        });
      } catch (err) { 
        // Axios gives us the “isCancel” method, which can be used to determine the cause of the request failing.
        if (axios.isCancel(err)) {
          return "axios request cancelled";
        }
        // Handle fetch error
      }
    })();
    return () => source.cancel("axios request cancelled");
  }, []);

  // ...
}

const query = useQuery('todos', () => {
   // Create a new CancelToken source for this request
   const CancelToken = axios.CancelToken
   const source = CancelToken.source()
 
   const promise = axios.get('/todos', {
     // Pass the source token to your request
     cancelToken: source.token,
   })
 
   // Cancel the request if React Query calls the `promise.cancel` method
   promise.cancel = () => {
     source.cancel('Query was cancelled by React Query')
   }
 
   return promise
 })



//////////////////////////////////////////  Fetch requests  //////////////////////////////////////////

import { useState, useEffect } from 'react';

function MyComponent() {
  const [value, setValue] = useState();

  useEffect(() => {
    let controller = new AbortController();
    (async () => {
      try {
        const response = await fetch('/api', {
          signal: controller.signal
        });
        setValue(await response.json());
        controller = null;
      } catch (e) { 
        // Handle fetch error
      }
    })();
    return () => controller?.abort();
  }, []);

  // ...
}

const query = useQuery('todos', () => {
   // Create a new AbortController instance for this request
   const controller = new AbortController()
   // Get the abortController's signal
   const signal = controller.signal
 
   const promise = fetch('/todos', {
     method: 'get',
     // Pass the signal to your request
     signal,
   })
 
   // Cancel the request if React Query calls the `promise.cancel` method
   promise.cancel = () => controller.abort()
 
   return promise
 })



//////////////////////////////////////////  Timer functions  //////////////////////////////////////////

function MyComponent() {
  const [value, setValue] = useState('');

  useEffect(() => {
    let timerId = setTimeout(() => {
      setValue('New value');
      timerId = null;
    }, 3000);
    return () => clearTimeout(timerId);
  }, []);

  // ...
}


//////////////////////////////////////////  Debounce and throttle  //////////////////////////////////////////


import { useState, useEffect } from 'react';
import throttle from 'lodash.throttle';

function MyComponent () {
  useEffect(() => {
    const handleResize = throttle(() => {
      // Handle window resize...
    }, 300);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      handleResize.cancel();
    };
  }, []);

  // ...
}


//////////////////////////////////////////  Web sockets  //////////////////////////////////////////

function MyComponent() {
  const [value, setValue] = useState();

  useEffect(() => {
    const socket = new WebSocket("wss://www.example.com/ws");
    socket.onmessage = (event) => {
      setValue(JSON.parse(event.data));
    };
    return () => socket.close();
  }, []);

  // ...
}

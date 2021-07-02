https://dmitripavlutin.com/react-cleanup-async-effects/


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

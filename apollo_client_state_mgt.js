//////////////// SIMPLE CASE (Reactive Variable) /////////////

//(1) Creating the state using makeVar
import { makeVar } from "@apollo/client";
export const nameVar = makeVar(""); // makeVar holds the default value or nothing

//(2) Setting the state
import { nameVar } from "./somewhere"; 
nameVar("abdullah")

//(3) Getting the state (value)
import { useReactiveVar } from "@apollo/client";
import { nameVar } from "./somewhere";
const name = useReactiveVar(nameVar) // or nameVar() not tested







//NameForm.js
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { nameVar } from "./cache";

function NameForm() {
  const [name, setName] = useState("");

  return (
    <Form>
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
        />
      </Form.Group>
      <Button
        variant="primary"
        onClick={() => {
          nameVar(name);
          setName("");
        }}
      >
        Update Name
      </Button>
    </Form>
  );
}

export default NameForm;











//NameDisplay.js
import React from "react";
import { useReactiveVar } from "@apollo/client";
import { Jumbotron } from "react-bootstrap";
import { nameVar } from "./cache";

function NameDisplay() {
  const name = useReactiveVar(nameVar);

  return name ? (
    <Jumbotron>
      <h1>{`Hello, ${name}!`}</h1>
      <p>This component is reading the client state and displaying the name!</p>
    </Jumbotron>
  ) : null;
}

export default NameDisplay;




//cache.js
import { makeVar, InMemoryCache } from "@apollo/client";

export const nameVar = makeVar("");
export const cache = new InMemoryCache();




// App.js
import React from "react";
import NameForm from "./NameForm";

import { cache } from "./cache";
import { ApolloClient, ApolloProvider } from "@apollo/client";
import NameDisplay from "./NameDisplay";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

const client = new ApolloClient({cache});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <h2 className="header">Apollo useReactiveVar Example!</h2>
      <div className="input">
        <NameForm />
      </div>
      <NameDisplay />
    </ApolloProvider>
  );
}
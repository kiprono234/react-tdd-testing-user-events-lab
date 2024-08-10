
import React, { useState } from "react";

function App() {
  const [pepperoniIsChecked, setPepperoniIsChecked] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [interests, setInterests] = useState({
    technology: false,
    design: false,
    marketing: false,
  });
  const [submitted, setSubmitted] = useState(false);

  function togglePepperoni(e) {
    setPepperoniIsChecked(e.target.checked);
  }

  const handleCheckboxChange = (event) => {
    setInterests({
      ...interests,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <main>
      <h1>Hi, I'm Kiprono</h1>
      <img alt="My profile pic" src="https://via.placeholder.com/350" />
      <h2>About Me</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>

      <div>
        <a href="https://github.com">GitHub</a>
        <a href="https://linkedin.com">LinkedIn</a>
      </div>

      <h2>Select Pizza Toppings</h2>
      <input
        type="checkbox"
        id="pepperoni"
        checked={pepperoniIsChecked}
        aria-checked={pepperoniIsChecked}
        onChange={togglePepperoni}
      />
      <label htmlFor="pepperoni">Add pepperoni</label>

      <h3>Your Toppings:</h3>
      <ul>
        <li>Cheese</li>
        {pepperoniIsChecked && <li>Pepperoni</li>}
      </ul>

      <h2>Sign Up for Our Newsletter</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <fieldset>
          <legend>Select Your Interests:</legend>
          <div>
            <input
              id="technology"
              name="technology"
              type="checkbox"
              checked={interests.technology}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="technology">Technology</label>
          </div>
          <div>
            <input
              id="design"
              name="design"
              type="checkbox"
              checked={interests.design}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="design">Design</label>
          </div>
          <div>
            <input
              id="marketing"
              name="marketing"
              type="checkbox"
              checked={interests.marketing}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="marketing">Marketing</label>
          </div>
        </fieldset>
        <button type="submit">Submit</button>
      </form>

      {submitted && <p>Thank you for signing up!</p>}
    </main>
  );
}

export default App;
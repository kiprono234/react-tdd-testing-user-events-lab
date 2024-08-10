
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom';

import App from "../App";

// Portfolio Elements
test("displays a top-level heading with the text Hi, I'm _______", () => {
  render(<App />);

  const topLevelHeading = screen.getByRole("heading", {
    name: /hi, i'm/i,
    exact: false,
    level: 1,
  });

  expect(topLevelHeading).toBeInTheDocument();
});

test("displays an image of yourself", () => {
  render(<App />);

  const image = screen.getByAltText("My profile pic");

  expect(image).toHaveAttribute("src", "https://via.placeholder.com/350");
});

test("displays second-level heading with the text About Me", () => {
  render(<App />);

  const secondLevelHeading = screen.getByRole("heading", {
    name: /about me/i,
    level: 2,
  });

  expect(secondLevelHeading).toBeInTheDocument();
});

test("displays a paragraph for your biography", () => {
  render(<App />);

  const bio = screen.getByText(/lorem ipsum/i);

  expect(bio).toBeInTheDocument();
});

test("displays the correct links", () => {
  render(<App />);

  const githubLink = screen.getByRole("link", {
    name: /github/i,
  });
  const linkedinLink = screen.getByRole("link", {
    name: /linkedin/i,
  });

  expect(githubLink).toHaveAttribute(
    "href",
    expect.stringContaining("https://github.com")
  );

  expect(linkedinLink).toHaveAttribute(
    "href",
    expect.stringContaining("https://linkedin.com")
  );
});


// Newsletter Form - Initial State
test("the form includes text inputs for name and email address", () => {
  render(<App />);

  // Check for name input field
  const nameInput = screen.getByLabelText(/name/i);
  expect(nameInput).toBeInTheDocument();
  expect(nameInput).toHaveAttribute("type", "text");

   // Check for email input field
   const emailInput = screen.getByLabelText(/email/i);
   expect(emailInput).toBeInTheDocument();
   expect(emailInput).toHaveAttribute("type", "email");
 });

test("the form includes three checkboxes to select areas of interest", () => {
  render(<App />);

  // Check for the checkboxes
  const interests = ["Technology", "Design", "Marketing"];
  interests.forEach((interest) => {
    const checkbox = screen.getByLabelText(new RegExp(interest, "i"));
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute("type", "checkbox");
  });
});

test("the checkboxes are initially unchecked", () => {
  render(<App />);

  // Check initial unchecked status of all checkboxes
  const checkboxes = screen.getAllByRole("checkbox");
  checkboxes.forEach((checkbox) => {
    expect(checkbox).not.toBeChecked();
  });
});

// Newsletter Form - Adding Responses
test("the page shows information the user types into the name and email address form fields", () => {
  render(<App />);

  // Simulate user typing into the name input field
  const nameInput = screen.getByLabelText(/name/i);
  userEvent.type(nameInput, "John Doe");
  expect(nameInput).toHaveValue("John Doe");

  // Simulate user typing into the email input field
  const emailInput = screen.getByLabelText(/email/i);
  userEvent.type(emailInput, "johndoe@example.com");
  expect(emailInput).toHaveValue("johndoe@example.com");
});

test("checked status of checkboxes changes when user clicks them", () => {
  render(<App />);

  const technologyCheckbox = screen.getByLabelText(/technology/i);
  const designCheckbox = screen.getByLabelText(/design/i);
  const marketingCheckbox = screen.getByLabelText(/marketing/i);

   // Simulate user clicking checkboxes
   userEvent.click(technologyCheckbox);
   expect(technologyCheckbox).toBeChecked();
 
   userEvent.click(designCheckbox);
   expect(designCheckbox).toBeChecked();
 
   userEvent.click(marketingCheckbox);
   expect(marketingCheckbox).toBeChecked();
 
   // Simulate user unchecking a checkbox
   userEvent.click(designCheckbox);
   expect(designCheckbox).not.toBeChecked();
 });

test("a message is displayed when the user clicks the Submit button", () => {
  render(<App />);

  // Simulate user filling out the form
  userEvent.type(screen.getByLabelText(/name/i), "John Doe");
  userEvent.type(screen.getByLabelText(/email/i), "johndoe@example.com");
  userEvent.click(screen.getByLabelText(/technology/i));

  // Simulate user clicking the Submit button
  userEvent.click(screen.getByRole("button", { name: /submit/i }));

  // Expect a thank you message to appear
  expect(screen.getByText(/thank you for signing up!/i)).toBeInTheDocument();
});
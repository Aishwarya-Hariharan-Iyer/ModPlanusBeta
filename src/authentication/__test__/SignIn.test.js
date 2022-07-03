import React from'react';
import ReactDOM from 'react-dom';
import SignIn from './../SignIn'; 
import {render, cleanup, fireEvent} from '@testing-library/react'
import "@testing-library/jest-dom/extend-expect";
import { SignInMethod } from 'firebase/auth';
//import renderer from 'react-test-renderer';

afterEach(cleanup);

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<SignIn></SignIn>, div);
})


it("renders signin correctly", () => {
    const {getByTestId} = render(<SignIn></SignIn>);
    expect(getByTestId('SignIn'));
})

const validateInput = (str = "") => str.includes("@u.nus.edu");
const validatepass = (str = "") => str.length >= 8;
describe("login", () => {
    it("correct input", () => {
        const text = "text@u.nus.edu";
        expect(validateInput(text)).toBe(true);
    });

    it("incorrect input", () => {
        const text = "text";
        expect(validateInput(text)).toBe(false);
    });

    it("accurate password length", () => {
        const text = "text12345678";
        expect(validatepass(text)).toBe(true);
    });

    it("password length less", () => {
        const text = "text12";
        expect(validatepass(text)).toBe(false);
    });

    it("email field should have label", () => {
        const component = render(<SignIn/>);
        const emailInputNode = component.getByLabelText("Email Address");
        expect(emailInputNode.getAttribute("name")).toBe("email");
    });

    it("email input should accept test", () => {
        const { getByLabelText, getByText } = render(<SignIn/>);
        const emailInputNode = getByLabelText("Email Address");
        expect(emailInputNode.value).toMatch("");
        fireEvent.change(emailInputNode, {target: {value: 'testing'}})
        expect(emailInputNode.value).toMatch("testing");

        const errorMessageNode = getByText("Email not valid");
        expect(errorMessageNode).toBeInTheDocument();

        fireEvent.change(emailInputNode).not.toBeInTheDocument();

        expect(errorMessageNode).not.toBeInTheDocument();
    });

    it("should be able to submit form", () => {
        const mockFn = jest.fn()
        const {getByRole} = render(<SignInMethod handleSubmit = {mockFn} />);
        const buttonNode = getByRole('button');
        fireEvent.submit(buttonNode);
        expect(mockFn).toHaveBeenCalled();

    })

});

/** 
it("matches snapshot", () => {
    const tree =renderer.create(<signIn></signIn>).toJSON();
    expect(tree).toMatchSnapshot();
})*/



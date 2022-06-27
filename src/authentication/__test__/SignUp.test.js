import React from'react';
import ReactDOM from 'react-dom';
import SignUp from './../SignUp'; 
import {render, cleanup, fireEvent} from '@testing-library/react'
import "@testing-library/jest-dom/extend-expect";
import { SignUpMethod } from 'firebase/auth';
//import renderer from 'react-test-renderer';

afterEach(cleanup);

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<SignUp></SignUp>, div);
})


it("renders signin correctly", () => {
    const {getByTestId} = render(<SignUp></SignUp>);
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

    it("password length", () => {
        const text = "text12345678";
        expect(validatepass(text)).toBe(true);
    });

    it("password length less", () => {
        const text = "text12";
        expect(validatepss(text)).toBe(false);
    });

    it("email field should have label", () => {
        const component = render(<SignUp/>);
        const emailInputNode = component.getByLabelText("Email Address");
        expect(emailInputNode.getAttribute("name")).toBe("email");
    });

    it("email input should accept test", () => {
        const { getByLabelText } = render(<SignUp/>);
        const emailInputNode = getByLabelText("Email Address");
        expect(emailInputNode.value).toMatch("");
        fireEvent.change(emailInputNode, {target: {value: 'testing'}})
        expect(emailInputNode.value).toMatch("testing");
    })

    it("should be able to submit form", () => {
        const mockFn = jest.fn()
        const {getByRole} = render(<SignUpMethod handleSubmit = {mockFn} />);
        const buttonNode = getByRole('button');
        fireEvent.submit(buttonNode);
        expect(mockFn).toHaveBeenCalled();

    })
});

/** 
it("matches snapshot", () => {
    const tree =renderer.create(<SignUp></SignUp>).toJSON();
    expect(tree).toMatchSnapshot();
})*/



import React from'react';
import ReactDOM from 'react-dom';
import SignOut from './../SignOut'; 
import {render} from '@testing-library/react'
import "@testing-library/jest-dom/extend-expect";

/** 
it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<SignIn></SignIn>, div);
})
*/

it("renders button correctly", () => {
    const {getByTestId} = render(<SignOut></SignOut>);
    expect(getByTestId('SignOut'));
})
import React from 'react'
import renderer from 'react-test-renderer';
import {render} from "@testing-library/react"
import "@testing-library/jest-dom"
import AuthForm from './AuthForm'

describe("SnapShot of AuthForm", ()=>{
    it('renders correctly', () => {
        const tree = renderer
          .create(<AuthForm/>)
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
})


describe("username input ", ()=>{
it("Username Input Exist Test", ()=>{
const {getByTestId} = render(<AuthForm />)
const input = getByTestId("username-input")
expect(input).toBeTruthy()
}    )

it("empty string", ()=>{
    const {getByTestId} = render(<AuthForm />)
    const input = getByTestId("username-input")
    expect(input.textContent).toBe('')
    }    )

})
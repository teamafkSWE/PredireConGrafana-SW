import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {cleanup, render} from "@testing-library/react";
import FormEdit from "../../components/form_edit";
import Controller from "../../../controller/controller";
import {Connection} from "../../../types";

class EmitterMock {
    emit = jest.fn()
}

const mockGetConnection = jest.fn().mockImplementation(() => {
    return [new Connection('1', 'x', [{query: 'cpu', predictor: 'y'}])]
})
const mockEditConnection = jest.fn()


describe('Form edit', () => {
    const queries = [{name: 'xy', fields: [], length: 0}, {name: 'yx', fields: [], length: 0}]
    const close = jest.fn()
    const controller = Controller.requireController(1)
    controller.getConnections = mockGetConnection
    controller.editConnection = mockEditConnection
    const emitter = new EmitterMock()
    beforeEach(() => {
        close.mockClear()
        emitter.emit.mockClear()
        mockGetConnection.mockClear()
        mockEditConnection.mockClear()
    })

    afterEach(() => {
        cleanup()
    })

    test('render', () => {
        const {asFragment,} = render(<FormEdit queries={queries} closeEdit={close} idConnection={'1'} controller={controller} emitter={emitter}/>)
        expect(asFragment()).toMatchSnapshot()
    })

    // test('update name', () => {
    //     render(<FormEdit queries={queries} closeEdit={close} idConnection={'1'} controller={controller} emitter={emitter}/>)
    //
    // })
})
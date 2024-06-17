import React, { Component } from 'react';
import { RenderResult, act, fireEvent, render, waitFor } from '@testing-library/react';
import App, { GymSession } from './App';

const axios = require('axios');

jest.mock('axios');

describe('toggle button tests', ()=> {
    let component : RenderResult;
    it('toggle button is on screen and rendered as expected', async ()=>{
        axios.get.mockResolvedValue({
          data: [
            {
                _id: 1,
                DayType: 'Push Session',
                Date: new Date(),
            } as GymSession
          ] as GymSession[],
        });
        act(() => {
            component = render(
                <App/>,
            );
        });
        act(() => {
            fireEvent.click(component.getByTestId('toggle-button'));
        });
        await waitFor(() => expect(component.getByText('Push Session')).toBeTruthy());
        expect(component.baseElement).toMatchSnapshot();
        expect(component.getByTestId('toggle-button')).toBeTruthy();
    });
})
 
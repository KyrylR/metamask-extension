import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { genUnapprovedContractInteractionConfirmation } from '../../../../../../../../test/data/confirmations/contract-interaction';
import mockState from '../../../../../../../../test/data/mock-state.json';
import { renderWithConfirmContextProvider } from '../../../../../../../../test/lib/confirmations/render-helpers';
import { AdvancedDetails } from './advanced-details';

describe('<AdvancedDetails />', () => {
  const middleware = [thunk];

  it('does not render component for advanced transaction details', () => {
    const state = { ...mockState, confirm: { currentConfirmation: null } };
    const mockStore = configureMockStore(middleware)(state);
    const { container } = renderWithConfirmContextProvider(
      <AdvancedDetails />,
      mockStore,
    );

    expect(container).toMatchSnapshot();
  });

  it('renders component for advanced transaction details', () => {
    const state = {
      ...mockState,
      confirm: {
        currentConfirmation: genUnapprovedContractInteractionConfirmation(),
      },
      metamask: {
        ...mockState.metamask,
        useNonceField: true,
        nextNonce: 1,
        customNonceValue: '12',
      },
    };
    const mockStore = configureMockStore(middleware)(state);
    const { container } = renderWithConfirmContextProvider(
      <AdvancedDetails />,
      mockStore,
    );

    expect(container).toMatchSnapshot();
  });
});

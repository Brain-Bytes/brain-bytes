import React from 'react';
import { render } from '../../../tests/testUtils';
import Slidebar from '.';

const defaultProps = {};

const setup = (props) => {
  return render(<Slidebar {...{ ...defaultProps, ...props }} />);
};

describe('Slidebar', () => {
  it('renders', () => {
    setup();
  });
});

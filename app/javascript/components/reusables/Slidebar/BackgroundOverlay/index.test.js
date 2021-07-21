import { render } from '../../../../tests/testUtils';
import BackgroundOverlay from '.';

const defaultProps = {};

const setup = (props) => {
  return render(<BackgroundOverlay {...{ ...defaultProps, ...props }} />);
};

describe('BackgroundOverlay', () => {
  it('renders', () => {
    setup();
  });
});

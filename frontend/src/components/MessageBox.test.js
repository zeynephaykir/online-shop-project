import renderer from 'react-test-renderer';
import Alert from 'react-bootstrap/Alert';
import MessageBox from './MessageBox';

jest.mock('react-bootstrap/Alert');

const renderTree = tree => renderer.create(tree);
describe('<MessageBox>', () => {
  it('should render component', () => {
    expect(renderTree(<MessageBox 
    />).toJSON()).toMatchSnapshot();
  });
  
});
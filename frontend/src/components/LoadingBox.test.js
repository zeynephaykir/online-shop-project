import renderer from 'react-test-renderer';
import Spinner from 'react-bootstrap/Spinner';
import LoadingBox from './LoadingBox';

jest.mock('react-bootstrap/Spinner');

const renderTree = tree => renderer.create(tree);
describe('<LoadingBox>', () => {
  it('should render component', () => {
    expect(renderTree(<LoadingBox 
    />).toJSON()).toMatchSnapshot();
  });
  
});
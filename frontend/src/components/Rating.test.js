import renderer from 'react-test-renderer';
import Rating from './Rating';

const renderTree = tree => renderer.create(tree);
describe('<Rating>', () => {
  it('should render component', () => {
    expect(renderTree(<Rating 
    />).toJSON()).toMatchSnapshot();
  });
  
});
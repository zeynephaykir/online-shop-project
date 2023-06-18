import renderer from 'react-test-renderer';
import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CheckoutSteps from './CheckoutSteps';

jest.mock('react-bootstrap/Row');
jest.mock('react-bootstrap/Col');

const renderTree = tree => renderer.create(tree);
describe('<CheckoutSteps>', () => {
  it('should render component', () => {
    expect(renderTree(<CheckoutSteps 
    />).toJSON()).toMatchSnapshot();
  });
  
});
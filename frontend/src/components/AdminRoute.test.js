import renderer from 'react-test-renderer';
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Store } from '../Store';
import AdminRoute from './AdminRoute';

jest.mock('react-router-dom');
jest.mock('../Store');

const renderTree = tree => renderer.create(tree);
describe('<AdminRoute>', () => {
  it('should render component', () => {
    expect(renderTree(<AdminRoute 
    />).toJSON()).toMatchSnapshot();
  });
  
});
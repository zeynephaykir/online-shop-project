import renderer from 'react-test-renderer';
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Store } from '../Store';
import ProtectedRoute from './ProtectedRoute';

jest.mock('react-router-dom');
jest.mock('../Store');

const renderTree = tree => renderer.create(tree);
describe('<ProtectedRoute>', () => {
  it('should render component', () => {
    expect(renderTree(<ProtectedRoute 
    />).toJSON()).toMatchSnapshot();
  });
  
});
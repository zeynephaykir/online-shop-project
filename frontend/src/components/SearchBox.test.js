import renderer from 'react-test-renderer';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { useNavigate } from 'react-router-dom';
import SearchBox from './SearchBox';

jest.mock('react-bootstrap/Button');
jest.mock('react-bootstrap/Form');
jest.mock('react-bootstrap/InputGroup');
jest.mock('react-bootstrap/FormControl');
jest.mock('react-router-dom');

const renderTree = tree => renderer.create(tree);
describe('<SearchBox>', () => {
  it('should render component', () => {
    expect(renderTree(<SearchBox 
    />).toJSON()).toMatchSnapshot();
  });
  
});
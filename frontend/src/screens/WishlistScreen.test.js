import renderer from 'react-test-renderer';
import React, { useState, useEffect, useContext } from 'react';
import { Store } from '../Store';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import WishlistScreen from './WishlistScreen';

jest.mock('../Store');
jest.mock('axios');
jest.mock('react-router-dom');
jest.mock('react-bootstrap/Card');
jest.mock('react-bootstrap/Row');
jest.mock('react-bootstrap/Col');
jest.mock('react-bootstrap/Button');
jest.mock('react-router-dom');

const renderTree = tree => renderer.create(tree);
describe('<WishlistScreen>', () => {
  it('should render component', () => {
    expect(renderTree(<WishlistScreen 
    />).toJSON()).toMatchSnapshot();
  });
  
});
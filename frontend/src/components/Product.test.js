import renderer from 'react-test-renderer';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {Link, useNavigate} from 'react-router-dom';
import Rating from './Rating';
import axios from 'axios';
import { useContext } from 'react';
import { Store } from '../Store';
import { useEffect, useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import {toast} from "react-toastify";
import Product from './Product';

jest.mock('react-bootstrap/Card');
jest.mock('react-bootstrap/Button');
jest.mock('react-router-dom');
jest.mock('./Rating');
jest.mock('axios');
jest.mock('../Store');
jest.mock('react-icons/fa');
jest.mock("react-toastify");

const renderTree = tree => renderer.create(tree);
describe('<Product>', () => {
  it('should render component', () => {
    expect(renderTree(<Product 
    />).toJSON()).toMatchSnapshot();
  });
  
});
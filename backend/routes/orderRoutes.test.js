import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import User from '../models/userModel.js';
import Product from '../models/productModel.js';
import { isAuth, isAdmin } from '../utils.js';
import './orderRoutes.js';

jest.mock('express');
jest.mock('express-async-handler');
jest.mock('../models/orderModel.js');
jest.mock('../models/userModel.js');
jest.mock('../models/productModel.js');
jest.mock('../utils.js');
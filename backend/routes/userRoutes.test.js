import express from 'express';
import bcrypt from 'bcryptjs';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import { isAuth, generateToken } from '../utils.js';
import './userRoutes.js';

jest.mock('express');
jest.mock('bcryptjs');
jest.mock('express-async-handler');
jest.mock('../models/userModel.js');
jest.mock('../utils.js');
import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';
import { isAdmin, isAuth } from '../utils.js';
import dotenv from 'dotenv'
import  from './uploadRoutes';

jest.mock('express');
jest.mock('multer');
jest.mock('cloudinary');
jest.mock('streamifier');
jest.mock('../utils.js');
jest.mock('dotenv');
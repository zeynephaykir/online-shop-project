import express from "express";
import expressAsyncHandler from 'express-async-handler';
import Product from "../models/productModel.js";
import { isAuth, isAdmin } from '../utils.js';
import "./productRoutes.js";

jest.mock("express");
jest.mock('express-async-handler');
jest.mock("../models/productModel.js");
jest.mock('../utils.js');
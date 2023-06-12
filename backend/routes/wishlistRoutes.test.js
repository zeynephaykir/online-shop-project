import express from "express";
import expressAsyncHandler from 'express-async-handler';
import Wishlist from "../models/wishlistModel.js";
import { isAuth } from '../utils.js';
import  from "./wishlistRoutes";

jest.mock("express");
jest.mock('express-async-handler');
jest.mock("../models/wishlistModel.js");
jest.mock('../utils.js');
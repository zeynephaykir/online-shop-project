import express from "express";
import path from 'path';
import mongoose from "mongoose";
import dotenv from "dotenv";
import seedRouter from "./routes/seedRoutes.js";
import productRouter from "./routes/productRoutes.js";
import userRouter from './routes/userRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import "./server.js";

jest.mock("express");
jest.mock('path');
jest.mock("mongoose");
jest.mock("dotenv");
jest.mock("./routes/seedRoutes.js");
jest.mock("./routes/productRoutes.js");
jest.mock('./routes/userRoutes.js');
jest.mock('./routes/orderRoutes.js');
import express from "express";
import data from "../data.js";
import User from "../models/userModel.js";
import "./seedRoutes.js";

jest.mock("express");
jest.mock("../data.js");
jest.mock("../models/userModel.js");
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import seedRouter from "./routes/seedRoutes.js";
import productRouter from "./routes/productRoutes.js";

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI, {
  dbName: "crochet-by-sarin",
})
.then(() => {
  console.log("Database connection is ready");
})
    .catch((err) => {
      console.log(err);
    });

const app = express();
app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter)

app.get('/api/products/:id', (req, res) => {
  const product = data.products.find((x) => x._id === req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server connected at localhost:${port}`);
});

import bcrypt from 'bcryptjs';

const data = {
  users:
  [
    {
      name: 'Sinan',
      email: 'sinan@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true
    },
    {
      name: 'Rana',
      email: 'rana@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true
    },
    {
      name: 'Zeynep',
      email: 'zeynep@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true
    },
    {
      name: 'Oguz',
      email: 'oguz@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true
    },
    {
      name: 'Mert',
      email: 'mert@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true
    },
    {
      name: 'Ege',
      email: 'ege@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true
    },
    {
      name: 'John Customeroglu',
      email: 'john@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
      taxId: "82613125"
    },
  ],
  products: [
    {
      name: "Rainbow Floral Crochet Vest",
      slug: "rainbow-vest",
      category: "Vests",
      image: "/images/p1.jpg",
      price: 100,
      countInStock: 5,
      brand: "Crochet by Sarin",
      rating: 4.6,
      numReviews: 10,
      description:
        "rainbow floral crochet vest, made with granny squares, aesthetic boho style zigzag design",
    },
    {
      name: "Brown Floral Crochet Top",
      slug: "brown-floral-top",
      category: "Crochet Tops",
      image: "/images/p2.jpg",
      price: 120,
      countInStock: 7,
      brand: "Crochet by Sarin",
      rating: 4.0,
      numReviews: 4,
      description:
        "brown floral crochet top, made with granny squares, aesthetic cottage core blouse",
    },
    {
      name: "Blue Crochet Bucket Hat",
      slug: "bucket-hat",
      category: "Hats",
      image: "/images/p3.jpg",
      price: 70,
      countInStock: 0,
      brand: "Crochet by Sarin",
      rating: 5,
      numReviews: 2,
      description:
        "crochet bucket hat, handmade with flower granny squares, floral summer hat",
    },
    {
      name: "Crochet Crop Top",
      slug: "crochet-crop-top",
      category: "Crochet Tops",
      image: "/images/p4.jpg",
      price: 100,
      countInStock: 3,
      brand: "Crochet by Sarin",
      rating: 4.3,
      numReviews: 7,
      description:
        "crochet crop top, made with granny squares, aesthetic bikini top for summer",
    },
    {
      name: "Ecru Floral Crochet Cardigan",
      slug: "ecru-floral-cardigan",
      category: "Cardigans",
      image: "/images/p5.jpg",
      price: 150,
      countInStock: 1,
      brand: "Crochet by Sarin",
      rating: 4.1,
      numReviews: 5,
      description:
        "ecru floral crochet cardigan, made with granny squares, vintage bershka pull and bear style",
    },
  ],
};

export default data;
/* eslint-disable prefer-template */
const easyinvoice = require('easyinvoice');
const fs = require('fs');

// Products = [
//   {
//     quantity: 2,
//     description: 'Product 1',
//     'tax-rate': 6,
//     price: 33.87,
//   },
//   {
//     quantity: 4.1,
//     description: 'Product 2',
//     'tax-rate': 6,
//     price: 12.34,
//   },
//   {
//     quantity: 4.5678,
//     description: 'Product 3',
//     'tax-rate': 21,
//     price: 6324.453456,
//   },
// ]

exports.createReceipt = async (order, Products, user) => {
  console.log(user);
  let date_ob = new Date();
  let date = ('0' + date_ob.getDate()).slice(-2);
  let month = ('0' + (date_ob.getMonth() + 1)).slice(-2);
  let year = date_ob.getFullYear();
  let formatteddate = date + '-' + month + '-' + year;
  console.log(typeof Products);
  const data = {
    customize: {
      //  "template": fs.readFileSync('template.html', 'base64') // Must be base64 encoded html
    },
    images: {
      // The logo on top of your invoice
      logo: 'https://public.easyinvoice.cloud/img/logo_en_original.png',
      // The invoice background
    },
    // Your own data
    sender: {
      company: 'TeknoSU',
      address: 'Sabanci University',
      zip: '34956',
      city: 'Istanbul',
      country: 'Turkey',
    },
    // Your recipient
    
    client: {
      company: user.name,
      address: order.address,
      zip: order.zipCode,
      city: order.city,
      country: order.country,
    },
    information: {
      // Invoice number
      number: '2021.0001',
      // Invoice data
      date: date + '-' + month + '-' + year,
      // Invoice due date
      'due-date': null,
    },
    // The products you would like to see on your invoice
    // Total values are being calculated automatically
    products: Products,

    // The message you would like to display on the bottom of your invoice
    'bottom-notice': 'Thank you for your purchase',
    // Settings to customize your invoice
    settings: {
      currency: 'USD', // See documentation 'Locales and Currency' for more info. Leave empty for no currency.
      // "locale": "nl-NL", // Defaults to en-US, used for number formatting (See documentation 'Locales and Currency')
      // "tax-notation": "gst", // Defaults to 'vat'
      // "margin-top": 25, // Defaults to '25'
      // "margin-right": 25, // Defaults to '25'
      // "margin-left": 25, // Defaults to '25'
      // "margin-bottom": 25, // Defaults to '25'
      // "format": "A4", // Defaults to A4, options: A3, A4, A5, Legal, Letter, Tabloid
      // "height": "1000px", // allowed units: mm, cm, in, px
      // "width": "500px", // allowed units: mm, cm, in, px
      // "orientation": "landscape", // portrait or landscape, defaults to portrait
    },
    // Translate your invoice to your preferred language
  };
  //console.log('data23', data);
  const result = await easyinvoice.createInvoice(data);
  await fs.writeFileSync(
    `./receipts/${user.name}-${formatteddate}.pdf`,
    result.pdf,
    'base64'
  );
  console.log('Created');
  return `${user.name}-${formatteddate}.pdf`;
};

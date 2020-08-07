const axios = require('axios');
const { allProduct } = require('./testList');

///// gets the list in the right order
const listProducts = (req, res, next) => {
    let products = [];
    let addItem = (item) => {
        prods = {
            id: item.id,
            name: item.name,
            description: item.description,
            image: item.thumbnailUrl,
            price: item.price
        }
        products.push(prods);
    }
    let url = "https://msbit-exam-products-store.firebaseio.com/deliveryProducts/products.json";
    axios.get(url)
        .then(response => {
            console.log(response.data);
            response.data.forEach(item => {
                if (item.status != 0) {
                    if (item.type == 1) {
                        item = item.fedex;
                        addItem(item);
                    }
                    else if (item.type == 2) {
                        item.ups.forEach(element => {
                            addItem(element)
                        });

                    } else {
                        addItem(item);
                    }
                }
            });

        })
        .catch(error => {
            console.log(error);
        });
    req.afterFilter = products;
    next();
}




////////// for test how to get the products
// const listProducts = (req,res,next) => {
//     let products = [];
//     let addItem = (item) => {
//         prods = {
//           id: item.id,
//           name: item.name,
//           description: item.description,
//           image: item.thumbnailUrl,
//           price:item.price
//         }
//         products.push(prods);
//       }

//       let resp=allProduct;

//       resp.forEach(item => {
//         if (item.status != 0) {
//           if (item.type == 1) {
//             item = item.fedex;
//             addItem(item)
//           }
//           else if (item.type == 2) {
//             item.ups.forEach(element => {
//               addItem(element)
//             });
    
//           } else {
//             addItem(item)
//           }
    
//         }
//       });
//       req.afterFilter=products;
//       next();
//   }

  module.exports = listProducts;
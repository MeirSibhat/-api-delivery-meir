const express = require('express');
const listProducts = require('../myServer');  // use for to get the list of product
const router = express.Router();
const axios = require('axios');
const _ = require("lodash");  // for sort and picks the value ["id", "name","description","image"]



///  return without price and return only the  ["id", "name","description","image"]
router.get('/', listProducts,(req, res, next)=> {
    let prods=req.afterFilter;
    let fixProducts=[];  
    prods.forEach(item => {
        fixProducts.push((_.pick(item, ["id", "name","description","image"])))
    });
    console.log(fixProducts);
    res.json(fixProducts)
    });



// return sort by params  name,id,pric  and return only the  ["id", "name","description","image"]
router.get('/sort/:valSort', listProducts,(req, res, next)=> {
    let val = req.params.valSort
    let list=req.afterFilter;
    let tempList = _.sortBy(list, val);

    let sortProducts=[];
    tempList.forEach(item => {
        sortProducts.push((_.pick(item, ["id", "name","description","image"])))
    });
    console.log(fixProducts);
    res.json(sortProducts)
    }); 


    


module.exports = router;

const Cart = require("./model");
const fetch = require('node-fetch');

exports.listUserCart = async (req, res) => { 
    await Cart.find({ userId: req.params.id }, (err, cart) => {
        if (err) {
            res.status(500).send(err);
            console.log("ERROR:500");
        }
        res.status(200).json(cart);
        console.log("Cart fetched: "+ cart);
    });
};

exports.updateUserCart = (req, res) => {
    var amount, prodNames

    fetch(`http://localhost:3000/rest/v1/products/`, {
        method: 'GET',
        credentials: 'same-origin',
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
    })
    .then(response => response.json())
    .then(response => {
        let pCount = 0
        var i = 0;
        while(i < response.length) {
            if (response[i].productId == req.body.productId) {
                pCount += 1
                if ((response[i].availableQuantity - req.body.quantity) <= 0) {
                    req.body.quantity = response[i].availableQuantity
                }
                amount = req.body.quantity * response[i].price
                prodName = response[i].productName
            } 
            i++;
        }
        
        if (pCount == 0) {
            throw new Error("productId not found.") //Product ID validation
        }

        req.body = { productId: req.body.productId, productName: prodName, quantity: req.body.quantity, amount: amount }

        fetch(`http://localhost:4000/rest/v1/users/${req.params.id}/cart`, {
            method: 'GET',
            credentials: 'same-origin',
            redirect: 'follow',
            referrerPolicy: 'no-referrer'
        })
        .then(responseCart => responseCart.json())
        .then(responseCart => {
            let cCount = 0
            var j = 0;
            while (j < responseCart[0].cart.length) {
                if (responseCart[0].cart[j].productId == req.body.productId) {
                    cCount += 1
                } 
                j++
            }

            if (cCount >= 1 && req.body.quantity != 0) {
                Cart.findOneAndUpdate({ "userId": req.params.id, "cart.productId": req.body.productId }, { "cart.$": req.body }, { new: true }, (err, cart) => {
                    if (err) {
                        res.status(500).send(err);
                        console.log("ERROR:500");
                    }
                    res.status(200).json(cart.cart);
                    console.log("Cart updated: "+ cart);
                });
            } 

            if (cCount >= 1 && req.body.quantity == 0) {
                Cart.findOneAndUpdate({ "userId": req.params.id, "cart.productId": req.body.productId }, { $pull: { "cart": { "productId": req.body.productId } } }, { new: true }, (err, cart) => {
                    if (err) {
                        res.status(500).send(err);
                    }
                    res.status(200).json(cart.cart);
                    console.log("Product removed from cart, updated cart: " + cart)
                });
            }
            
            if (cCount == 0 && req.body.quantity != 0) {
                Cart.findOneAndUpdate({ userId: req.params.id }, { $addToSet: { "cart": req.body } }, { new: true }, (err, cart) => {
                    if (err) {
                        res.status(500).send(err);
                        console.log("ERROR:500");
                    }
                    res.status(200).json(cart.cart);
                    console.log("Product added to cart, updated cart: " + cart)
                });
            }
            
            
            if (cCount == 0 && req.body.quantity == 0) {
                throw new Error ("Quantity cannot be zero for items not in cart.")
            }
        });
    });
};

exports.createUser = async (req, res) => { //To create new user. This won't be exposed to the user, only to be used to hardcode a few users
    let newUser = new Cart (req.body);
    await newUser.save ((err, cart) => {
        if (err) {
            res.status(500).send(err);
            console.log("ERROR:500");
        }
        res.status(201).json(cart);
        console.log("User created: "+ cart);
    });
};



# ESA_product_microservice
 An E-commerce back-end microservice designed to facilitate a user's cart management needs of a business.
 
## Technologies used
Node.js \n
ExpressJS \n
Database: MongoDB
 
## Lisence
 This project is licensed under the Apache License 2.0.
 A permissive license whose main conditions require preservation of copyright and license notices. Contributors provide an express grant of patent rights. Licensed works, modifications, and larger works may be distributed under different terms and without source code.
 <p align="center"> Copyright (c) 2021 Pranay Bandaru. All rights reserved.</p>

## Instructions to setup
Run the commands below in a terminal in the project directory.
```bash

$ npm install
$ npm install mongoose
```
The project includes the connection string to my MongoDB database. To use your own database create a database in your MongoDB cluster and obtain a connection string. 
Use this connection string in place if mine in the server.js file.

To run the service run the below command in a terminal in the project directory.
```bash
$ node server.js
```
The product microservice also should be running for this to work correctly. Find it at https://github.com/PranayBandaru/ESA_product_microservice
This API can be either used with your service or can be tested using postman using the following.

#### Create a new user with empty cart
This will create a new user with an empty cart. If the user already exists, it returns an error.
This API will not be exposed to the client. Only for adminto hard-code users.

- Method – POST
- Route – http://localhost:4000/rest/v1/users/

Example request body:
```bash
{
    "userId": "test-user-1"
}
```

Example successful response:
```bash
{
    "_id": "6073db9d7f5f2161f09cefdd",
    "userId": "test-user-1",
    "cart": [],
    "__v": 0
}
```
The new user's details are also displayed in the terminal.

#### Create or Update cart item
This will add a product to the cart if it doesn't exist or update the cart with the latest quantity if it exists. Also, connects with the Product Microservice API and validates the input quantity with the available quantity, and returns the product name and its amount. The amount is calculated by multiplying the product price with the quantity. 

If the input quantity is more than the available quantity, the cart will be updated with the available quantity.

If the quantity is made zero for the product already in the cart, the product will be deleted from the cart. Otherwise, it returns error. It also returns error if the product id is not found.


- Method – PUT
- Route – http://localhost:4000/rest/v1/users/<userId>/cart

Example request body:
```bash
{
    "productId": "12445dsd234",
    "quantity": 2
}
```

Example successful response:
```bash
[
    {
        "productId": "123245ds4234",
        "quantity": 2,
        "productName": "Sony",
        "amount": 2400
    },
    {
        "productId": "12445dsd234",
        "quantity": 2,
        "productName": "Samsung",
        "amount": 1400
    }
]
```
The created or updated cart item is also shown in the terminal.

#### Retrieve user cart
This will retrieve the user cart for a userId provided in the database.

- Method – GET
- Route – http://localhost:4000/rest/v1/users/<userId>/cart

Example successful response:
```bash
[
    {
        "_id": "6073db9d7f5f2161f09cefdd",
        "userId": "test-user-1",
        "cart": [
            {
                "productId": "123245ds4234",
                "quantity": 2,
                "productName": "Sony",
                "amount": 2400
            },
            {
                "productId": "12445dsd234",
                "quantity": 2,
                "productName": "Samsung",
                "amount": 1400
            }
        ],
        "__v": 0
    }
]
```
The user cart is also shown in the terminal.

### Validations
The API performs necessary validations as per the design specifications provided. 

# OMNICART

Omni Cart is Restful Api for E-Commerce android application that has the most features requried in e-commerce process.

you can get it from MediaFire:
https://www.mediafire.com/file/v42vxnrtg85f336/OmniCart.apk/file

## Tools:
    .expressjs
    .mongoose
    .nodemailer
    .multer
    .bcryptjs
    .json-web-token
    .stripe

## Features:
     - Authentication

        | Feature                 | Coded?  |
        | ----------------------- | ------- |
        | Signup                  |  ✔️     |
        | Login                   |  ✔️     |
        | Forget & Reset Password |  ✔️     |
        | Update Password         |  ✔️     |
    
    - Products
    
      Admin Features
    
        | Feature               | Coded?   |
        | --------------------- | -------  |
        | Add Product           |  ✔️     |
        | Edit a Product        |  ✔️     |
        | Delete a Product      |  ✔️     |
        | Add Discount          |  ✔️     |
        | Remove Discount       |  ✔️     |
    
      User Features
    
        | Feature                         | Coded? |
        | ------------------------------- | ------ |
        | List of Products and Categories |  ✔️    |
        | Sales                           |  ✔️    |
        | Search for Product              |  ✔️    |
        | Add to Cart                     |  ✔️    |
        | See Cart                        |  ✔️    |
        | Remove from Cart                |  ✔️    |
        | Checkout                        |  ✔️    |
    
    - Reviews
    
        | Feature               |   Coded? |
        | --------------------- | -------- |
        | Create Review         |  ✔️     |
        | Update Review         |  ✔️     |
        | Delete Review         |  ✔️     |
    
    - Wishlist
    
        | Feature               |  Coded? |
        | --------------------- | ------- |
        | Add to Wishlist       |  ✔️     |
        | Remove from Wishlist  |  ✔️     |

## base url:https://omnicart.onrender.com/api

## DB
MONGO_URL: either a local or atlas mongodb connection

## APP SETTINGS
NODE_ENV: either development or production

## JWT
JWT_SECRET: create a JWT secret key of at least 32 characters.

## STRIPE SETTINGS
STRIPE_KEY: strip the secret api key, and the public key will be sent to the front-end developer

## NODE_MAILER
EMAIL_USERNAME :The username or email address associated with the email account you intend to use for sending emails.

EMAIL_PASSWORD:The password for the email account specified in EMAIL_USERNAME. It is used to authenticate and authorize access for sending emails.

EMAIL_HOST:The host or server address of the email service provider. This can be the SMTP server provided by your email service.

SERVICE:The email service provider you are using, which determines the predefined settings for the email service. Common values include "gmail," "yahoo," "outlook," etc.

EMAIL_PORT:


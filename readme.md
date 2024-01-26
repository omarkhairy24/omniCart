# OMNI-CART

Omni Cart is restful api for E-Commerce android application that has the most features requried in e-commerce process.
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
    -authentication:

        <table>
          <tr>
            <th>Feature</th>
            <th>Coded</th>
          </tr>
          <tr>
            <td>signup</td>
            <td>login</td>
            <td>forget & reset password</td>
            <td>update password</td>
          </tr>
          <tr>
            <td>✔️</td>
            <td>✔️</td>
            <td>✔️</td>
            <td>✔️</td>
          </tr>
        </table>
    -products:

        admin Features
            <table>
              <tr>
                <th>Feature</th>
                <th>Coded</th>
              </tr>
              <tr>
                <td>Add  Product</td>
                <td>Edit a Product</td>
                <td>Delete a Product</td>
                <td>add discount</td>
                <td>remove discount</td>
              </tr>
              <tr>
                <td>✔️</td>
                <td>✔️</td>
                <td>✔️</td>
                <td>✔️</td>
                <td>✔️</td>
              </tr>
            </table>

        user Features
            <table>
              <tr>
                <th>Feature</th>
                <th>Coded</th>
              </tr>
              <tr>
                <td>List of Products and categories</td>
                <td>sales</td>
                <td>search for product</td>
                <td>Add to cart</td>
                <td>Remove from Cart</td>
                <td>Checkout</td>
              </tr>
              <tr>
                <td>✔️</td>
                <td>✔️</td>
                <td>✔️</td>
                <td>✔️</td>
                <td>✔️</td>
                <td>✔️</td>
              </tr>
            </table>
    
    -reviews:
        <table>
              <tr>
                <th>Feature</th>
                <th>Coded</th>
              </tr>
              <tr>
                <td>Create review</td>
                <td>update review</td>
                <td>delete review</td>
              </tr>
              <tr>
                <td>✔️</td>
                <td>✔️</td>
                <td>✔️</td>
              </tr>
            </table>

    -wishlist:
            <table>
              <tr>
                <th>Feature</th>
                <th>Coded</th>
              </tr>
              <tr>
                <td>add to wishlist</td>
                <td>remove from wishlist</td>
              </tr>
              <tr>
                <td>✔️</td>
                <td>✔️</td>
              </tr>
            </table>

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


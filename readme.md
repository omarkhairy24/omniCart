OMNI-CART

Omni Cart is restful api for E-Commerce android application that has the most features requried in e-commerce process.
you can get it from MediaFire:
https://www.mediafire.com/file/v42vxnrtg85f336/OmniCart.apk/file

Tools:
    .expressjs
    .mongoose
    .nodemailer
    .multer
    .bcryptjs
    .json-web-token
    .stripe

Features:
    -authentication:

        | Feature  |  Coded?       | 
        |----------|:-------------:|
        | signup | &#10004; |
        | login | &#10004; |
        | forget & reset password | &#10004; | 
        | update password | &#10004; |

    -products:

        <b>admin Features</b>

        | Feature  |  Coded?       | 
        |----------|:-------------:|
        | Add  Product | &#10004; | 
        | Edit a Product | &#10004; | 
        | Delete a Product | &#10004; |
        | add discount | &#10004; |
        | remove discount | &#10004; |

        <b>user Features</b>

        | Feature  |  Coded?       |
        |----------|:-------------:|
        | List of Products and categories | &#10004; |
        | sales | &#10004; |
        | search for product | &#10004; |
        | Add to cart | &#10004; |
        | See Cart | &#10004; | 
        | Remove from Cart | &#10004; |
        | Checkout | &#10004; | 
    
    -reviews:
        | Feature  |  Coded?       |
        |----------|:-------------:|
        | Create review | &#10004; | 
        | update review | &#10004; | 
        | delete review | &#10004; |

    -wishlist:
        | Feature  |  Coded?       |
        |----------|:-------------:|
        | add to wishlist | &#10004; | 
        | remove from wishlist | &#10004; |

base url:https://omnicart.onrender.com/api

# DB
MONGO_URL: either a local or atlas mongodb connection

# APP SETTINGS
NODE_ENV: either development or production

# JWT
JWT_SECRET: create a JWT secret key of at least 32 characters.

# STRIPE SETTINGS
STRIPE_KEY: strip the secret api key, and the public key will be sent to the front-end developer

# NODE_MAILER
EMAIL_USERNAME :The username or email address associated with the email account you intend to use for sending emails.

EMAIL_PASSWORD:The password for the email account specified in EMAIL_USERNAME. It is used to authenticate and authorize access for sending emails.

EMAIL_HOST:The host or server address of the email service provider. This can be the SMTP server provided by your email service.

SERVICE:The email service provider you are using, which determines the predefined settings for the email service. Common values include "gmail," "yahoo," "outlook," etc.

EMAIL_PORT:


## E-commerce demo with Gatsby.js
A demo for an online plant shop built from the Gatsby `hello-world` boilerplate.

The product inventory comes from [Aamu.app](Aamu.app) via GraphQL.

The original author is [https://github.com/nhuynh1](Nancy), who we want to thank a lot. We at Aamu.app added the GraphQL integration.

## Requirements

- An account at [Aamu.app](Aamu.app).
- A *database* at Aamu.app and an API key to this database.
- A [Stripe](https://stripe.com/) account and a secret API key (Dashboard/Developers/API keys) (testing key is OK).

## Installation

- Click "Deploy to Netlify" (see below).
- Click "Connect to GitHub".
- Insert your secret keys (Aamu.app + Stripe).
- After Netlify is done building, go to your repository at GitHub and edit the file `config-client.js` and insert your Stripe *public key*, commit the file.
- After Netlify is done building again, everything should work. If not, go through every step to make sure everything was done correctly.

## General notes

This is a demo, a starting point that you should probably edit quite a bit until it's ready for your needs. At the moment the following is true:

- The products are hosted on Aamu.app. 
- The purchases will be visible at Stripe. Currently they will not be stored into Aamu.app. This is something you can change if you need to.
- At the moment there is no email confirmation for the customer. This is also something that needs to be added when this is taken to production use.

## Live demo hosted on Netlify
[https://aamu-muffinsplantshop.netlify.app/](https://aamu-muffinsplantshop.netlify.app/)

## Payment processing
Card payment via Stripe in testing mode; please use testing card details shown on the form

## Deploying to Netlify

You can deploy this on Netlify: 

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/AamuApp/muffinsplantshop)

Deployment to Netlify asks your **Aamu.app API key** and **Stripe Secret key**.

### What I learned by building an online store with Gatsby and Stripe
[Read Nancy's blog post](https://dev.to/nhuynh1/five-things-i-learned-by-building-my-own-shopping-cart-and-checkout-with-gatsby-and-stripe-273k)

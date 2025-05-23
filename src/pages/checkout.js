import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import CheckoutForm from '../components/checkout-form/checkout-form';
import Layout from '../components/layout/layout';
import Seo from '../components/seo';
import config from '../../config-client.js';

const Checkout = ({ location }) => {
    const promise = loadStripe(config.stripe);

    return (
        <Layout location={location}>
            <Seo title="Checkout" />
            <Elements stripe={promise}>
                <CheckoutForm />
            </Elements>
        </Layout>
    );
}

export default Checkout ;
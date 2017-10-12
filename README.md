# react-script-loader-hoc
A higher-order React component that assists in the asynchronous loading of third party JS libraries (eg. Stripe.js)


### Example usage with Stripe React Elements
Barebones example of asynchronously loading the Stripe.js library. The `Loader` will be rendered until the Stripe.js library loads asynchronously, at which point the `Loader` will be replaced by the `StripeProvider`.
```jsx
  import React from 'react';
  import ScriptLoader from 'react-script-loader-hoc';
  import { StripeProvider, Elements } from 'react-stripe-elements';
  import { Loader, CheckoutForm } from '../components';

  const StripePayment = ({ scriptsLoadedSuccessfully }) => {
    if (!scriptsLoadedSuccessfully) return <Loader />;

    return (
      <StripeProvider apiKey="pk_test_12345">
        <Elements>
          <CheckoutForm />
        </Elements>
      </StripeProvider>
    );
  };

  export default ScriptLoader('https://js.stripe.com/v3/')(StripePayment);
```

### API
`ScriptLoader` takes a `n` arguments, each being a string URL of a javascript resource to load. The component will pass in two boolean-valued props:
 - `scriptsLoaded`
 - `scriptsLoadedSuccessfully`

Both props will be `false` until all scripts load at which point `scriptsLoaded` will be `true` and `scriptsLoadedSuccessfully` will refect whether or not any errors occurred (e.g. false if a 404 occurred).

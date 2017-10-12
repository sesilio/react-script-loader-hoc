# react-script-loader-hoc
A higher-order React component that assists in the asynchronous loading of third party JS libraries (eg. Stripe.js)


### Example usage with Stripe React Elements
Simple example of asynchronously loading the Stripe.js library. The `LoadIcon` component will be rendered until the Stripe.js library loads asynchronously, at which point the `LoadIcon` will be replaced by the `StripeProvider`.
```jsx
  import React from 'react';
  import ScriptLoader from 'react-script-loader-hoc';
  import { StripeProvider, Elements } from 'react-stripe-elements';
  import { LoadIcon, CheckoutForm } from '../components';

  const StripePayment = ({ scriptsLoadedSuccessfully }) => {
    if (!scriptsLoadedSuccessfully) return <LoadIcon />;

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
`ScriptLoader` takes `n` string arguments, each of which should be a URL of a javascript resource to load. The higher-order `ScriptLoader` component will pass two boolean-valued props to the wrapped component:
 - `scriptsLoaded`
 - `scriptsLoadedSuccessfully`

`scriptsLoaded` will be `false` until either all scripts load successfully or one or more of the scripts fail to load (eg. if a 404 occurs), at which point it will be `true`. `scriptsLoadedSuccessfully` will be `true` if all scripts load successfully or `false` if either an error occurs or if some scripts are still loading. `scriptsLoadedSuccessfully` will always be `false` while `scriptsLoaded` is false.

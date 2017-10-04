import React from 'react';
import hoistStatics from 'hoist-non-react-statics';

const scriptLoader = (...scriptSrcs) => (WrappedComponent) => {
  class ScriptLoader extends React.Component {
    constructor(props, context) {
      super(props, context);

      this.state = {
        scriptsLoaded: false,
        scriptsLoadedSuccessfully: false,
      };

      this._isMounted = false;
    }

    componentDidMount() {
      this._isMounted = true;
      this.loadScripts(scriptSrcs);
    }

    componentWillUnmount() {
      this._isMounted = false;
    }

    loadScripts = async (srcs) => {
      const promises = srcs.map(src => this.loadScript(src));

      let success = true;
      try {
        await Promise.all(promises);
      } catch (err) {
        success = false;
      }

      if (!this._isMounted) {
        return;
      }

      this.setState({
        scriptsLoaded: true,
        scriptsLoadedSuccessfully: success,
      });
    };

    loadScript = (src) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;

      const promise = new Promise((resolve, reject) => {
        script.addEventListener('load', () => resolve(src));
        script.addEventListener('error', e => reject(e));
      }).catch((e) => {
        const parentNode = script.parentNode;
        if (parentNode) parentNode.removeChild(script);
        throw e;
      });

      document.body.appendChild(script);

      return promise;
    };

    render() {
      const props = {
        ...this.props,
        ...this.state,
      };

      return <WrappedComponent {...props} />;
    }
  }

  return hoistStatics(ScriptLoader, WrappedComponent);
};

export default scriptLoader;

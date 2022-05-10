const useHttpDecorators = (axios) => {
  function hasMethod(method, ...methods) {
    return methods.includes(method);
  }
  const createRequestDecorator = (url, method, config) => {
    return (target, propertyKey, descriptor) => {
      descriptor.value = (...args) => {
        config.method = method;
        let data = null;
        if (typeof url === "function" && args.length >= 1 && args.length <= 2) {
          config.url = url(args[0]);
          if (args.length === 2) {
            data = args[1];
          }
        } else if (typeof url === "string") {
          config.url = url;
          if (args.length === 1) {
            data = args[0];
          }
        }
        if (hasMethod(method, "DELETE", "GET") && data !== null) {
          config.params = data;
        } else if (hasMethod(method, "POST", "PUT") && data !== null) {
          config.data = data;
        }
        return axios(config);
      };
    };
  };
  const GET = (url, config = {}) => {
    return createRequestDecorator(url, "GET", config);
  };
  const POST = (url, config = {}) => {
    return createRequestDecorator(url, "POST", config);
  };
  const DELETE = (url, config = {}) => {
    return createRequestDecorator(url, "DELETE", config);
  };
  const PUT = (url, config = {}) => {
    return createRequestDecorator(url, "PUT", config);
  };
  return {
    GET,
    POST,
    DELETE,
    PUT,
    defaultResult: () => null
  };
};

export { useHttpDecorators };

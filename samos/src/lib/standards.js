export const headers = {
    std: {
        "content-type": "application/json;charset=UTF-8",
        'Access-Control-Allow-Origin': "*"
    },
    cors: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
        "Access-Control-Max-Age": "86400",
    }
};

export const match = ( actual, expect ) => actual.startsWith( expect );
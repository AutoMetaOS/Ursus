export const AMOS = {
    root: "https://cmos.nukes.in",
    meme: "https://www.youtube.com/watch?v=6KbRA2RjhgQ"
};

export default constants = {
    domain_name: "",
    account_id: "",
    zone_id: "",
    API: {
        urlmeta: "c3NtYW5hdkBpY2xvdWQuY29tOjBmM0NkbGhpbnlBVmNHNjRSRXh4"
    }
}

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
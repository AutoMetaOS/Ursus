import KEYS from "../lib/standards";

export const get_metadata: object = async (searchTerm: string) => {
    const data: object = await fetch(`https://api.urlmeta.org/?url=${searchTerm}`, {
        headers: {
            Authorization: `Basic ${KEYS.urlmeta}`
        }
    }).then(r => r.json());

    return data;
};

// q=new%20york&cp=8&hl=en-GB&authuser=0&psi=JsXfYuaeNY_R-QaIqbuACQ.1658832217519&dpr=1

// cp=6&q=

export const search_suggestions: object = async (term: string) => {
    const Google_BASE: string = "https://www.google.com/complete/search?cp=6&client=gws-wiz&xssi=t&hl=en-GB&dpr=1&q=";
    const response: any = await fetch(Google_BASE + term, {
        method: "GET",
        keepalive: true,
        headers: {
            'Accept': '*/*',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'en-IN,en-GB;q=0.9,en;q=0.8',
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Safari/605.1.15"
        },
    }).then(d => d.text());

    const json: string = response.split("]}'")[1];
    const reply: Array<string> = JSON.parse(json)[0].slice(0, 2);
    return reply;
};
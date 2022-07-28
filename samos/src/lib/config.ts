import { AMOS } from "./standards";

import { youtube_filter, youtubeHandler } from "../handlers/youtube";
import { cms_icons } from "../handlers/cms";
import { search_suggestions, get_metadata } from "../handlers/quick";
import { twitter_tweet } from "../handlers/social";

const config = {
    quick: {
        suggest: {
            type: "func",
            func: search_suggestions,
            filter: (params: any): string => params.get('q')
        },
        metadata: {
            type: "func",
            func: get_metadata,
            filter: (params: any): string => params.get('url')
        }
    },
    cms: {
        css: {
            type: "redirect",
            url: (params: any): string =>
                `${AMOS.gh.cdn}/css/${params.get('name')}`
        },
        icon: {
            type: "redirect",
            url: cms_icons
        },
    },
    social: {
        twitter: {
            type: "func",
            // gets tweet data from tweet id
            func: twitter_tweet,
            filter: (params: any): string => params.get('id')
        },
        youtube: {
            type: "func",
            func: youtubeHandler,
            filter: youtube_filter
        },
        behance: {
            type: "func",
            func: (params: any): string => params.get('id'),
            filter: console.log
        }
        // google: {
        //     type: "func",
        //     func: google_news,
        //     filter: ( params ) => params
        // }
    }
};

export default config;
import { AMOS } from "./standards";
import { search_suggestions, get_metadata } from "../handlers/quick";
import { twitter_tweet } from "../handlers/social";

export default config = {
    quick: {
        suggest: {
            type: "func",
            func: search_suggestions,
            filter: ( params ) => params.toString()
        },
        metadata: {
            type: "func",
            func: get_metadata,
            filter: ( params ) => params.get( 'url' )
        }
    },
    cms: {
        css: {
            type: "redirect",
            url: ( params ) =>
                `${ AMOS.root }/OUI/css/${ params.get( 'name' ) }`
        }
    },
    social: {
        twitter: {
            type: "func",
            func: twitter_tweet,
            filter: ( params ) => params.get( 'id' )
        },
        // google: {
        //     type: "func",
        //     func: google_news,
        //     filter: ( params ) => params
        // }
    }
};
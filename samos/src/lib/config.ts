import { AMOS } from "./standards";
import { search_suggestions, get_metadata } from "../handlers/quick";
import { twitter_tweet } from "../handlers/social";

const config = {
    quick: {
        suggest: {
            type: "func",
            func: search_suggestions,
            filter: ( params: any ):string => params.toString()
        },
        metadata: {
            type: "func",
            func: get_metadata,
            filter: ( params: any ):string => params.get( 'url' )
        }
    },
    cms: {
        css: {
            type: "redirect",
            url: ( params: any ):string =>
                `${ AMOS.root }/OUI/css/${ params.get( 'name' ) }`
        },
        icon:{
            type: "redirect",
            url: ( params: any ):string =>{
                // Format
                // https://api.nukes.in/cms/icon?name=generic:amazon.svg
                // https://api.nukes.in/cms/icon?name=amos:cmos.svg
                // https://api.nukes.in/cms/icon?name=web:worker.svg

                const base_url = `${ AMOS.gh_raw }/UI/main/prod`;

                let sub_url = "x"; // Default "AMOS"
                const [type,file] = params.get( 'name' ).split(':');
                const [fileName, fileType] = file.split('.');

                if( type === 'generic' ) sub_url = "i";
                if( type === 'web' ) sub_url = "w";

                return `${ base_url }/${ sub_url }/${ fileType }/${ fileName }.${ fileType }`;
            }
        },
    },
    social: {
        twitter: {
            type: "func",
            func: twitter_tweet,
            filter: ( params:any ):string => params.get( 'id' )
        },
        // google: {
        //     type: "func",
        //     func: google_news,
        //     filter: ( params ) => params
        // }
    }
};

export default config;
import { AMOS } from "../lib/standards";

export const cms_icons =( params: any ):string =>{
    // Format
    // https://api.nukes.in/cms/icon?name=generic:amazon.svg
    // https://api.nukes.in/cms/icon?name=amos:cmos.svg
    // https://api.nukes.in/cms/icon?name=web:worker.svg

    const base_url = `${ AMOS.gh.ui }/icons`;

    let sub_url = "x"; // Default "AMOS"
    const [type,file] = params.get( 'name' ).split(':');
    const [fileName, fileType] = file.split('.');

    if( type === 'generic' ) sub_url = "i";
    if( type === 'web' ) sub_url = "w";

    return `${ base_url }/${ sub_url }/${ fileType }/${ fileName }.${ fileType }`;
};
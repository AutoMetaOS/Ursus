```ts
const config ={
cms: {
    css: {
        type: "redirect",
        url: ( params: any ):string =>
            `${ AMOS.gh.cdn }/css/${ params.get( 'name' ) }`},
    icon:{
        type: "redirect",
        url: cms_icons},
},
social: {
    twitter: {
        type: "func",
        // gets tweet data from tweet id
        func: twitter_tweet,
        filter: ( params:any ):string => params.get( 'id' )},
    youtube: {
        type: "func",
        func: youtubeHandler,
        filter: youtube_filter}
}};
```

# Ursus API Docs
Examples have been taken from AMOS since it is made for AMOS. All endpoints are assumed to be rendered on `BaseURL=`[https://api.nukes.in](https://api.nukes.in)

All endpoints will soon need authentication therefore making no open endpoints. All endpoints are sorted by individual processor

All endpoints are `GET` and all data is currently operated in query parameters.

# General Structure
Each API is configured in the config file as either a `function` or a `redirect`.

**functions**: i.e {type: '`func`'} will first take in a `filter` which transforms the queryParams to the desired format for the `func` to take in which will then make all necessary transformations and calls and return a promise chain which finally the handler resolves

```js
// Excecution order of func
return func( filter( params ) );

// Excecution order of redirect
return { type: 'special', url: url( params ) }
```


## Quick Return (`/quick`)

### Search Suggestions (`/quick/suggest`)
```js
suggest = {
    type: "func",
    func: search_suggestions,
    filter: ( params: any ):string => params.toString()
};
```

### URL Metadata (`/quick/metadata`)
```js
metadata = {
    type: "func",
    func: get_metadata,
    filter: ( params: any ):string => params.get( 'url' )
};
```

## Content Management System (`/cms`)

## Social Services (`/social`)
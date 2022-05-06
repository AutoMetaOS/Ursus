export default config = {
    quick: {
        suggest: {
            response: {
                type: "func",
                func: search_suggestions,
                filter: ( params ) => params.toString()
            }
        },
        metadata: {
            response: {
                type: "func",
                func: get_metadata,
                filter: ( params ) => params.get( 'url' )
            }
        }
    },
    // cms: {
};
import {
    b64,
    getRandomSubstring, orderCheck,
    fixLength, rawLength
} from "./index.js";

const keys = {
    test_str: "test",
    test: "9F86D081884C7D659A2FEAA0C55AD015A3BF4F1B2B0B822CD15D6C15B0F00A08",
    master: "6840256F3F754CDF5ECE9913C5E7518DB5D1213E4A287E21FC357A2E5AFC2310"
};

// Comments are backward
const getToken = ( key = keys.master ) => b64.encode( fixLength( getRandomSubstring( key, 0.25, true ) ) );
// Get String -> Fix Len to 24 -> Encode to B64

const checkToken = ( token, key = keys.master ) => orderCheck( key, rawLength( b64.decode( token ) ) );
// Decode B64 -> Remove 0 Padding -> Check Order From Master

export const auth = {
    getKey: getToken,
    checkKey: checkToken
};
import KEYS from "../lib/standards";

const { youtube: key } = KEYS;

const arrify = (data:any):string =>typeof data === "object" ? data.join("%2C"):data.replaceAll(',','%2C');
const recentOnly = (el: any): boolean =>
  (+new Date() - +new Date(el.contentDetails.videoPublishedAt)) / 864e5 < 4;

const configToString = ({
  path = "search",
  part = "snippet",
  max = 5,
  playlistId = null,
  channelId = null,
  type = null,
  order = null,
  id = null,
  query = null,
}): string => {
  let params = "";

  params += `&part=${arrify(part)}`;
  params += `&maxResults=${max}`;
  if (playlistId) params += `&playlistId=${playlistId}`;
  if (channelId) params += `&channelId=${channelId}`;
  if (type) params += `&type=${type}`;
  if (order) params += `&order=${order}`;
  if (id) params += `&id=${arrify(id)}`;
  if (query) params += `&q=${query}`;

  return `/${path}?key=${key}${params}`;
};

const YTFetch = async (endpoint: object): Promise<any> => fetch(
    `https://youtube.googleapis.com/youtube/v3${configToString(endpoint)}`
  ).then((b) => b.json());

const playlist = (q: string): Promise<object> =>
  YTFetch({
    path: `playlistItems`,
    part: ["snippet","contentDetails"],
    max: 5,
    playlistId: q,
    order: "date",
  });

const search = (q: string): Promise<any> =>
  YTFetch({
    path: `search`,
    max: 10,
    query: q,
    type: "video",
  });

// const channel = (id: string): Promise<object> =>
//   YTFetch({
//     path: `search`,
//     channelId: id,
//     order: "date",
//   });

const getChannels = (id: any): Promise<object> =>
  YTFetch({
    path: `channels`,
    part: ["snippet","contentDetails"],
    id: id,
  });

export const getRecents = async (ids: Array<any>): Promise<object> => {
  const json = await getChannels(ids);

  let videoList = await Promise.all(
    json["items"]
      .map((el) => el.contentDetails.relatedPlaylists.uploads)
      .map(async (plId) => {
        const plist = await playlist(plId);
        return plist["items"];
      })
  );

  return videoList.flat().filter(recentOnly);
};

export const youtube_filter = (params: any):object => {
  return {
    func: params.get('do'),
    id: params.get('id')
  };
};

export const youtubeHandler = async ({
  func,
  id,
}): Promise<object> => {
  let result;
  // https://api.nukes.in/social/youtube?do=recents&id=UCUHW94eEFW7hkUMVaZz4eDg
  if( func === 'recents' ) {
    const mod_id: Array<string> = Array.from(id.replaceAll('%2C',',').split(','));
    result = await getRecents(mod_id);
  };
  // https://api.nukes.in/social/youtube?do=search&id=minutephysics
  if( func === 'search' ) result = (await search(id)).items;

  return result;
};

import colors from 'colors';
import redis from "redis";
import fs from 'fs/promises';
import cron from 'node-cron';
colors.enable();

const redisClient = redis.createClient({ url: `redis://redis:6379`}) 
/** You have to Manually use the URL */
/** This is stupid. */

redisClient.on("error", (err) => {
    console.log(`${err}`.red)
});
redisClient.on("connect", (err) => {
    console.log("Connected to Redis!".green)
})

let config = {};
/** Loads in Config */
async function loadConfig(){
    let configFile, parsedJson = {};
    try {
        configFile = await fs.readFile('./tracker.config.json');
        parsedJson = await JSON.parse(configFile);
    } catch (err){
        console.log("Error! Failed to load tracker.config.json".red);
    } finally {
        return parsedJson;
    }
}
/**
 *  name: "Sena Bonbon"  // Display Name - Set in CONFIG
 *  db_ref: "senabonbon", // Internal Reference to Channel/Talent (to Compute NuxtLink Destination in NavBlock Component),
 *  twitter: "twitter.com", // Link to Twitter
 *  youtube: "youtube.com", // Link to Youtube
 *  twitch: "twitch.com", // Link to Twitch
 *  subs: 34, // total subs
 *  view: 30399, // total yt views
 *  videos: 204 // Num Vids 
 *  -----------------------
 *  redisClient.set(`talent-${dbref}-${attr}`, val);
 */
async function getStatsByHandle(stats, handle) {
    for(const stat of stats)
        if(stat.snippet.customUrl === `@${handle.toLowerCase()}`) 
            return stat;
    return {};
}
async function updateStats(){
    const KEY = process.env.YOUTUBE_API_KEY;
    const talents = config.talents;
    const channelIds = [];
    const handle_id_dict = {};
    // Gets Ids from Handles
    for (const talent of talents) {
        try {
            const channelId = await fetch(`https://yt.lemnoslife.com/channels?handle=@${talent.handle}`);
            const resText = await channelId.text();
            const parsed = await JSON.parse(resText);
            const id = parsed.items[0].id;
            channelIds.push(id);
            handle_id_dict[talent.handle] = id; // pain
        } catch (err) {
            console.log(`Error! ${err}`.red);
        }
    }
    // Constructs the Request for the Channel Stats
    let reducedIds = channelIds.reduce((a,b)=>a+','+b);
    //https://www.googleapis.com/youtube/v3/channels?key=${KEY}&part=snippet, statistics&fields=items(snippet(title, thumbnails/high/url), statistics(viewCount, subscriberCount, videoCount))
    let statsQuery = `https://www.googleapis.com/youtube/v3/channels?id=${reducedIds}&key=${KEY}&part=snippet, statistics, brandingSettings&fields=items(snippet(title, thumbnails/high/url, customUrl), statistics(viewCount, subscriberCount, videoCount),brandingSettings(image/bannerExternalUrl))`;
    let _stats;
    try {
        let statsResponse = await fetch(statsQuery);
        let statsResponseText = await statsResponse.text() || "{}";
        let parsedStats = await JSON.parse(statsResponseText);
        _stats= parsedStats.items;
    } catch (err) {
        console.log(`${err}`.red); 
        stats = {};
    }
    let refcache = {};
    for (const talent of talents) {
        try {
            // Returned stats are Unsorted (for some reason ;-;)
            const stats = await getStatsByHandle(_stats, talent.handle);
            /**
             * Store Values into Object and Serializes it into a JSON String
             */
            const store = {
                // Profile/Banner This was Stupid
                name:  talent.name,
                db_ref: talent.ref,
                handle: `@${talent.handle}`,
                profile_picture_src: stats.snippet.thumbnails.high.url,
                banner_picture_src: stats?.brandingSettings?.image?.bannerExternalUrl ?? 'none',
                view_count: stats.statistics.viewCount,
                sub_count: stats.statistics.subscriberCount,
                video_count: stats.statistics.videoCount,
                youtube_link: `https://youtube.com/@${talent.handle}`,
                twitter_link: `https://twitter.com/${talent.twitter}`,
                twitch_link: talent?.twitch ? `https://twitter.com/${talent?.twitch}` : 'none',
                channel_id: handle_id_dict[talent.handle],
                uploads_id: handle_id_dict[talent.handle].replace("UC", "UU"),
                live: false, // boolean, accessed from global - updated by updateBroadcast (move to /live endpoint later.)
                desc: "none", // string, accessed from global - updated by updateBroadcast (move to /live endpoint later.)
            }
            // No clue why this works - but it allows you to access a higher res banner image
            // at the cost of it being a little cropped
            // Sometimes failed - Likely because of the Quality of the Original Image being too Low
            // Will test if Highres
            if(store?.banner_picture_src){
                let failed = false
                let src2 = store.banner_picture_src + `=w2120-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj`
                // Test if Source is Valid 
                try {
                    let res = await fetch(src2);
                } catch (err){
                    console.log("upbanner fetch failed".red)
                    failed = true;
                } finally {
                    if(!failed) store.banner_picture_src = src2;
                }
            }
            let serialized_stats = JSON.stringify(store);
            await redisClient.set(`talent-${talent.ref}`, serialized_stats);
        } catch(err) {
            console.log(err);
            continue;
        }
        /** Caches all Successful Stats Fetches (by ref) into a JSON formatted String on the Sidebar */
        refcache[talent.ref]="";
    }
    let serialized_refs = JSON.stringify(refcache);
    await redisClient.set(`talent-refs`, serialized_refs);
}

/* Tracks Live Stats
 *
 * LIVE STATUS: talent-${ref}-live
 *   
 *
 */
async function updateBroadcasts(){ /** Fetches Info by Config and Stores in Redis */
    const KEY = process.env.YOUTUBE_API_KEY;
    for(const talent of config.talents) {
        const handle = talent.handle;
    }
}

/* Task ran every 3 hours to updateStats(); */
cron.schedule('* 3 * * *', async () => {
    console.log('Updating Stats'.yellow);
    try {
        config = await loadConfig(); // Reloads Config 
        await updateStats();
    } catch(err){
        console.log("Failed to update Channel Stats".yellow, "\n", `${err}`.red)
    }
});

/* Task ran every 5 minutes to updateBroadcasts(); */
/*cron.schedule('5 * * * *', async () => {
    try {
        await updateStats();
    } catch(err){
        console.log("Failed to update Tracked Broadcasts".yellow, "\n", `${err}`.red)
    }
});*/

async function launch(){
    console.log("Launching Stat Aggregrator Service".yellow)
    await redisClient.connect();
    config = await loadConfig();
    await updateStats();
    // updateStats(); Avoiding these Unnecessary Update Calls are Essential for Development with limited quote cost - thank god for redis
}
launch();
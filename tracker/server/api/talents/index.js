// Returns values stored in Redis by aggregator service
// I have never used Nuxt (or vue) until now, If someone is watching this,
// I'm looking at docs
import colors from 'colors';
import cron from 'node-cron';
import redis from 'redis';
colors.enable()
const redisClient = redis.createClient({url:`redis://redis:6379`});
async function cnnct(){
    await redisClient.connect();
}
cnnct();
let stats = {};
// can't wait to get doxxed when some log exposes my ip address :D
// updates the Live 'Stat' + the Scheduled & Live Broadcasts
/* Do not need to filter Broadcasts ;)
   {
        - scheduled_start_time
        - time_until
        - formatted_start_time
    }
 */
async function updateBroadcasts(){

}
async function loadStats(){
    let error = false;
    let result = {};
    try {
        let dbrefs = await redisClient.get("talent-refs");
        let refs = Object.keys(await JSON.parse(dbrefs));
        for(const dbref of refs){
            try {
                result[dbref] = {};
                const statpackage = await redisClient.get(`talent-${dbref}`);
                let stats = await JSON.parse(statpackage);
                result[dbref] = stats;
            } catch(err){
                console.log("Error!", err);
                continue;
            }
        }
    } catch (err) {
        console.log('Error!', err);
        error = true;
    } finally {
        if(error)
            return {};
        else
            return result;
    }
}
// loads and caches from aggregator every 30 seconds
cron.schedule('30 * * * * *', async () => {
    console.log('Updating Stats'.yellow);
    try {
        stats = await loadStats();
    } catch(err){
        console.log("Failed to update Channel Stats".yellow, "\n", `${err}`.red)
    }
});

stats = loadStats();
export default defineEventHandler(async (e) => {
    await stats;
    console.log("API Accessed".green);
    if(e.node.req.method === 'GET')
        return stats;
})
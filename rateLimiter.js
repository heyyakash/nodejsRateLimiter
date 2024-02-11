const moment = require("moment")
const { connectToRedis } = require("./helpers")
const LimitInMinutes = 1
const RequestLimit = 5

exports.rateLimiter = async (req, res, next) => {
    try {
        const client = await connectToRedis()
        const { ip } = req
        const currentTimeStamp = moment().unix()
        const windowStartTimeStamp = moment().subtract(LimitInMinutes, "minute").unix()
        const requests = await client.zRangeByScore(ip, windowStartTimeStamp, currentTimeStamp)
        console.log(requests)
        if(requests.length < RequestLimit) {
            await client.zAdd(ip,[{score:currentTimeStamp,value: currentTimeStamp.toString()}])
            next()
        } else {
            return res.status(429).json({msg:"You have crossed the rate limit.. try later"})
        }
    } catch (err) {
        return res.status(500).json({ msg: "Some error occuered", err })
    }
}
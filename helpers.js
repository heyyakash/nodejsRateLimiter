const { createClient } = require("redis")

exports.connectToRedis = async () => {
    try {
        const client = createClient()
        client.on("error", (err) => console.log("Error : ", err))
        await client.connect()
        console.log("Conected to redis")
        return client 
    } catch (err) {
        console.log(err)
    }
}

const MbotVang = require('../models/BotGold')
const MbotThoi = require('../models/BotThoi')
thongKeThoiBot = async () => {
    var zzz = await MbotThoi.aggregate([
        {
            $match: { 
            }
        },
        {
            $group: {
                _id: {
                    "Server": "$Server"
                },
                "Gold": { $sum: "$Gold" },
                count: { $sum: 1 }
            }
        },
        {
            "$project": {
                "_id": 0,
                "Server": "$_id.Server",
                "Count": "$count",
                "Gold": "$Gold"
            }
        },
        { $sort: { "Server": 1 } }
    ])
    return zzz
}
thongKeVangBot = async () => {
    var zzz = await MbotVang.aggregate([
        {
            $match: { 
            }
        },
        {
            $group: {
                _id: {
                    "Server": "$Server"
                },
                "Gold": { $sum: "$Gold" },
                count: { $sum: 1 }
            }
        },
        {
            "$project": {
                "_id": 0,
                "Server": "$_id.Server",
                "Count": "$count",
                "Gold": "$Gold"
            }
        },
        { $sort: { "Server": 1 } }
    ])
    return zzz
}
module.exports = {
    thongKeVangBot: thongKeVangBot,
    thongKeThoiBot: thongKeThoiBot,
}
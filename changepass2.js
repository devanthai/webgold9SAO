const fs = require('fs')

changepassAcc = async () => {
    const accneed = await fs.readFileSync('accneed.txt').toString().replace(/\r\n/g, '\n').split('\n');
    const accAll = await fs.readFileSync('accAll.txt').toString().replace(/\r\n/g, '\n').split('\n');
    let accAllz = {}
    for(let acc of accAll)
    {
        const server = acc.split('|')[0]
        const accz = acc.split('|')[1]
        const pass = acc.split('|')[2]
        accAllz[accz] = pass
    }
    let arrAcc = []
    for(let acc of accneed)
    {
        const server = acc.split('|')[0]
        const accz = acc.split('|')[1]
        let pass = acc.split('|')[2]
        if(accAllz[accz])
        {
            pass = accAllz[accz]
        }
        arrAcc.push(server+"|"+accz+"|"+pass)
    }
    for(let acc of arrAcc)
    {
        
        await fs.appendFileSync("accneed2.txt",acc+"\n")
    }
}
changepassAcc()

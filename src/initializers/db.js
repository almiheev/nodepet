const fs = require('fs');
const path = require('path');
const util = require('util');
const uuid = require('uuid/v4');

const dirPath = path.join(__dirname,'../..', 'assets');
const filePath = path.join(dirPath,'db.json');

const readFileAsync  = util.promisify(fs.readFile);
const writeFileAsync  = util.promisify(fs.writeFile);

class DB {
    constructor() {
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath);
        }

        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, JSON.stringify([]));
        }
    }

   async getItems() {
       const fileContent = await readFileAsync(filePath);
       return JSON.parse(fileContent.toString());

    }

    async createItem({price, name}) {
        const data = await this.getItems();
        const id = uuid();
        data.push({
            id : id,
            price,
            name
        });

        await writeFileAsync(filePath, JSON.stringify(data));
        return id;
    }

    async getItem(id) {
        const data = await this.getItems();
        return data.find(item => item.id === id);
    }

    async deleteItem(id) {
        const data = await this.getItems();
        data.filter(item => item.id != id);
        await writeFileAsync(filePath, JSON.stringify(data));
    }
}

module.exports = DB;
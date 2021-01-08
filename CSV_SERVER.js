const express = require("express");
const app = express();
const csv = require('csv-parser');
const fs = require('fs');
const fetch = require('node-fetch');

app.use(express.json());
app.use(express.urlencoded()); 

const IdentifierGenerator = (length) => {
        const alphanums = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        return new Array(length).fill(null).map( () => alphanums[Math.floor(Math.random() * alphanums.length)] ).join("")
}

const refactorCsv = (file, values) => {
    const newEntry = []
    file.map(fileEntry => {
        const filterObject = (obj, arr) => {
            Object.keys(obj).forEach((key) => {
                if(!arr.includes(key)){
                    delete obj[key];
                };
            });
        };
        newEntry.push(fileEntry)
        
        filterObject(fileEntry, values) 
    })
    return newEntry
}

app.post("/", async (req, res) => {
    const {url, select_fields: fields } = req.body.csv;

    const fetchCsv = await fetch(url);
    const dest = fs.createWriteStream('./CSV_TEMPLATE.csv');
    const writeCsv = await fetchCsv.body.pipe(dest);

    const csv_file = [];
    fs.createReadStream('CSV_TEMPLATE.csv')
        .pipe(csv())
        .on('data', (data) => csv_file.push(data))
        .on('end', () => {
            const newCsv = refactorCsv(csv_file, fields)
            const responseID = IdentifierGenerator(20)
            res.json({
                "conversion_key": responseID,
                "json": newCsv
            })
        });

        fs.unlink("./CSV_TEMPLATE.csv", (err) => {
            if (err) {
                console.error(err)
                return
            }

        //file removed
        })
    
});


const PORT = process.env.PORT || 8080

const listener = app.listen(PORT, () => { 
  console.log("Your app is listening on port " + listener.address().port)
})

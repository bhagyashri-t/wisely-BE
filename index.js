const express = require('express');
const app = express();
const port = 8888;
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const CAPACITY_INVENTORY = [
    {hour: 9, minutes: {m00: 2, m15: 4, m30: 3, m45: 5} , hourTotal: 14},
    {hour: 10, minutes: {m00: 2, m15: 4, m30: 3, m45: 5} , hourTotal: 14},
    {hour: 11, minutes: {m00: 2, m15: 4, m30: 3, m45: 5} , hourTotal: 14},
    {hour: 12, minutes: {m00: 2, m15: 4, m30: 3, m45: 5} , hourTotal: 14},
    {hour: 13, minutes: {m00: 2, m15: 4, m30: 3, m45: 5} , hourTotal: 14},
    {hour: 14, minutes: {m00: 2, m15: 4, m30: 3, m45: 5} , hourTotal: 14},
    {hour: 15, minutes: {m00: 2, m15: 4, m30: 3, m45: 5} , hourTotal: 14},
    {hour: 16, minutes: {m00: 2, m15: 4, m30: 3, m45: 5} , hourTotal: 14},
  ];

app.all('/', (req, res) => {
    res.send("Hello world!");
});

app.get('/inventory' , (req, res) => {
    res.json(CAPACITY_INVENTORY);
});

app.put('/inventory/:id', (req, res) => {
    let index = getIndex(req.params.id, CAPACITY_INVENTORY);
    CAPACITY_INVENTORY[index].minutes = req.body.minutes;
    CAPACITY_INVENTORY[index].hourTotal = req.body.hourTotal;
    res.json(CAPACITY_INVENTORY[index]);
});

app.put('/updateInventory', (req, res) => {
    let data = req.body.data;
    let index = getIndex(data[0].hour, CAPACITY_INVENTORY);
    CAPACITY_INVENTORY.splice(index, data.length, ...data);
    
    let responseData = CAPACITY_INVENTORY.slice(index, data.length);
    console.log("Updated bookings in inventory! ", responseData);
    res.json(responseData);
});

function getIndex(id, array) {
    return array.findIndex((element) => {
        return element.hour == id;
    });
}

app.listen(port, ()=> {
    console.log(`Server is listening on port http://localhost:${port}...`);
});
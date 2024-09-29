import express, { query } from 'express'
import cors from 'cors'

const app = express();
app.use(cors());
app.use(express.json());

const items = [{
    name: "Uva",
    quantity: 2,
    type: "fruta"
},
{
    name: "Maçã",
    quantity: 5,
    type: "fruta"
},
{
    name: "Banana",
    quantity: 6,
    type: "fruta"
},
{
    name: "Pão",
    quantity: 1,
    type: "padaria"
},
{
    name: "Bolo",
    quantity: 1,
    type: "padaria"
},
{
    name: "Leite",
    quantity: 3,
    type: "laticínios"
},
{
    name: "Queijo",
    quantity: 1,
    type: "laticínios"
},
{
    name: "Ovo",
    quantity: 12,
    type: "proteína"
},
{
    name: "Frango",
    quantity: 1,
    type: "proteína"
},
{
    name: "Arroz",
    quantity: 1,
    type: "grãos"
},
{
    name: "Feijão",
    quantity: 1,
    type: "grãos"
}]

app.post('/items', (req, res) => {
    const { name, quantity, type } = req.body
    if (!name || !quantity || !type) {
        return res.status(422).send('Todos os campos são obrigatórios!!')
    }
    if (typeof name !== 'string') {
        return res.status(422).send('O nome deve ser uma string.');
    }
    if (typeof quantity !== 'number' || !Number.isInteger(quantity)) {
        return res.status(422).send('A quantidade deve ser um número inteiro.');
    }
    if (typeof type !== 'string') {
        return res.status(422).send('O tipo deve ser uma string.');
    }

    const itemExists = items.some(
        (item) => item.name.toLowerCase() === name.toLowerCase()
    );

    if (itemExists) {
        return res.status(409).send('Este item já está cadastrado!');
    }

    const newItems = { id: items.length + 1, name, quantity, type }
    items.push(newItems)

    return res.status(201).send(newItems)

})

app.get('/items', (req, res) => {
    const { type } = req.query;

    if (type) {
        const filter = items.filter((item) => item.type.toLowerCase() === type.toLowerCase());
        return res.status(200).send(filter);
    }

    return res.status(200).send(items);
});

app.listen(5000, () => {
    console.log('Rodando na porta 5000');
});
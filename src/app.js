import express, { query } from 'express'
import cors from 'cors'

const app = express();
app.use(cors());
app.use(express.json());

const items = [
    {
        id: 1,
        name: "Uva",
        quantity: 2,
        type: "fruta"
    },
    {
        id: 2,
        name: "Maçã",
        quantity: 5,
        type: "fruta"
    },
    {
        id: 3,
        name: "Banana",
        quantity: 6,
        type: "fruta"
    },
    {
        id: 4,
        name: "Pão",
        quantity: 1,
        type: "padaria"
    },
    {
        id: 5,
        name: "Bolo",
        quantity: 1,
        type: "padaria"
    },
    {
        id: 6,
        name: "Leite",
        quantity: 3,
        type: "laticínios"
    },
    {
        id: 7,
        name: "Queijo",
        quantity: 1,
        type: "laticínios"
    },
    {
        id: 8,
        name: "Ovo",
        quantity: 12,
        type: "proteína"
    },
    {
        id: 9,
        name: "Frango",
        quantity: 1,
        type: "proteína"
    },
    {
        id: 10,
        name: "Arroz",
        quantity: 1,
        type: "grãos"
    },
    {
        id: 11,
        name: "Feijão",
        quantity: 1,
        type: "grãos"
    }
];


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

app.get('/items/:id', (req, res) => {
    const { id } = req.params;
    const idNumber = parseInt(id, 10);
    if (isNaN(idNumber) || idNumber < 1 || idNumber > items.length) {
        return res.status(400).send('ID inválido!');
    }

    const item = items.find(item => item.id === idNumber);
    if (!item) {
        return res.status(404).send('Item não encontrado.');
    }

    return res.status(200).send(item);
});

app.listen(5000, () => {
    console.log('Rodando na porta 5000');
});
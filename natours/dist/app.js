"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.get('/', (req, res) => {
    res
        .status(200)
        .json({ message: 'Hello from the server side!', app: 'Natours' });
});
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log('App is running');
});

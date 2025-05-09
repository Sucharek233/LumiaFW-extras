import { Router } from 'express';
import * as Database from '../database/db.js';

const router = Router();

router.get('/', (req, res) => {
    res.send("da api rests here");
});

router.post('/test', (req, res) => {
    const { query } = req.body;
    const result = Database.testing(query);
    res.send(result);
});

export default router;
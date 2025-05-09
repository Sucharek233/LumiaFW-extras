import { Router, raw } from 'express';
import { readFileSync, writeFileSync } from 'fs';
import { checkAdminKey } from '../auth/admin.js';

const router = Router();

router.use(checkAdminKey);

const dbName = "./test.db";

router.post('/upload-db', raw({ type: '*/*', limit: '10mb' }), (req, res) => {
    writeFileSync(dbName, req.body);
    res.send('Database uploaded successfully');
});

router.get('/download-db', (req, res) => {
    const dbBuffer = readFileSync(dbName);
    res.set({
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename="test.db"`,
    });
    res.send(dbBuffer);
});

export default router;
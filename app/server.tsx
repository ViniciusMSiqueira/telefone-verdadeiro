import express, { Request, Response } from 'express'
import next from 'next'

const port = parseInt(process.env.PORT, 10) || 3080;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

(async () => {
    try {
        await app.prepare();
        const server = express();
        server.all("*", (req: Request, res: Response) => {
            return handle(req, res);
        });

        server.listen(port, (err?: any) => {
            if (err) throw err;
            console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`);
        });
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
})();
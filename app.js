import path from "path";
import { promises as fs, readFile } from 'fs';
export default async (req, res) => {
    // Desestructurando de "req"
    let { url, method } = req;

    console.log(`📣 CLIENT-REQUEST:${req.url} ${req.method}`);
    const error500Path = path.join("views", "500.html");
    // Enrutando peticiones
    switch (url) {
        case '/':
            const pathIndex = path.join("views", "index.html");
            try {
                const data = await fs.readFile(pathIndex);
                res.writeHead(200, { "Content-Type": "text/html" });
                res.statusCode = 200;
                res.end(data);
            } catch (err) {
                console.error(err);
                const data = await fs.readFile(error500Path);
                res.writeHead(200, { "Content-Type": "text/html" });
                res.end(data);
                console.log(`Answering: 500 ${req.url} ${req.method}`);
                console.log(`Error: 500 ${err.message}`);
                // Stablishing the answer code
                res.statusCode = 500;
                // Closing comunication
                res.end();
            }
            break;
        case '/author':
            const pathAuthor = path.join("views", "author.html");
            try {
                const data = await fs.readFile(pathAuthor);
                res.writeHead(200, { "Content-Type": "text/html" });
                res.statusCode = 200;
                res.end(data);
            } catch (err) {
                console.error(err);
                const data = await fs.readFile(error500Path);
                res.writeHead(200, { "Content-Type": "text/html" });
                res.end(data);
                console.log(`Answering: 500 ${req.url} ${req.method}`);
                console.log(`Error: 500 ${err.message}`);

                res.statusCode = 500;
                // Closing comunication
                res.end();
            }
            break;

        case "/favicon.ico":
            // Especificar la ubicación del archivo de icono
            const faviconPath = path.join(__dirname, 'favicon.ico');
            try {
                const data = await fs.readFile(faviconPath);
                res.writeHead(200, { 'Content-Type': 'image/x-icon' });
                res.end(data);
            } catch (err) {
                console.error(err);
                // Peticion raiz
                // Estableciendo cabeceras
                res.setHeader('Content-Type', 'text/html');
                // Escribiendo la respuesta
                console.log(`📣 Respondiendo: 500 ${req.url} ${req.method}`);
                // Estableciendo codigo de respuesta
                res.statusCode = 500;
                // Cerrando la comunicacion
                res.end();
            }
            break;

        case "/message":
            // Verificando si es post
            if (method === "POST") {
                // Se crea una variable para almacenar los
                // Datos entrantes del cliente
                let body = "";
                // Se registra un manejador de eventos
                // Para la recepción de datos
                req.on("data", (data => {
                    body += data;
                    if (body.length > 1e6) return req.socket.destroy();
                }));
                // Se registra una manejador de eventos
                // para el termino de recepción de datos
                req.on("end", () => {
                    // Procesa el formulario
                    // Mediante URLSearchParams se extraen
                    // los campos del formulario
                    const params = new URLSearchParams(body);
                    // Se construye un objeto a partir de los datos
                    // en la variable params
                    const parsedParams = Object.fromEntries(params);
                    fs.writeFile('message.txt', parsedParams.message);
                })

                res.statusCode = 302;
                res.setHeader('Location', '/');
                // Se finaliza la conexion
                return res.end();
            } else {
                res.statusCode = 404;
                res.write("404: Endpoint no encontrado")
                res.end();
            }
            break;
        // Continua con el defautl
        default:
            const pathDefault = path.join("views", "default.html");
            try {
                const data = await fs.readFile(pathDefault);
                res.writeHead(200, { "Content-Type": "text/html" });
                res.statusCode = 404;
                res.end(data);
            } catch (err) {
                console.error(err);
                res.writeHead(200, { "Content-Type": "text/html" });
                res.end(data);
                console.log(`Answering: 500 ${req.url} ${req.method}`);
                console.log(`Error: 500 ${err.message}`);
                // Stablishing the answer code
                res.statusCode = 500;
                // Closing comunication
                res.end();
            }
            break;
    }
};
// 1. importando el modulo http
import http from 'http';
// Biblioteca path
import path from "path";
import fs from "fs";

// Recreando Built-in variables
global["__dirname"] = path.dirname(new URL(import.meta.url).pathname);
/*
global["__filename"] = path.join(new URL(import.meta.url).pathname);
*/
// 2. crear el servidor

const server = http.createServer((req, res) => {
    // Desestructurando de "req"
    let { url, method } = req;

    console.log(`📣 CLIENT-REQUEST:${req.url} ${req.method}`);

    // Enrutando peticiones
    switch (url) {
        case '/':
            // Petición raiz 
            // Estableciendo cabeceras
            res.setHeader('Content-Type', 'text/html')
            // Escribiendo la respuesta
            res.write(`
            <html>
                <head>
                    <link rel="icon" type="image/png" sizes="32x32" href="https://img.icons8.com/fluency/256/domain.png">
                    <title>My App</title>
                </head>
                <body> 
                    <h1>&#128534; 404 Recurso no encontrado</h1>
                    <p>Lo sentimos pero no tenemos lo que buscas...</p>
                </body>
            </html>
            `);
            console.log(`📣 Respondiendo: 404 ${req.url} ${req.method}`);
            // Estableciendo código de respuesta 
            res.statusCode = 404;
            // Cerrando la comunicación 
            res.end();
            break;
        case '/author':
            res.setHeader('Content-Type', 'text/html')

            // Escribiendo la respuesta
            res.write(`
            <html>
                <head>
                    <link rel="icon" type="image/png" sizes="32x32" href="https://img.icons8.com/color/48/null/standing-woman.png">
                    <title>My App</title>
                </head>
                <body> 
                    <h1 style="color:#EA1955;"> Autor </h1>
                    <p>Obrajero Arguelles Mariana Abigail</p>
                    <img src="https://scontent.fmex23-1.fna.fbcdn.net/v/t1.6435-9/122602514_1697256130433020_570043739953015801_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeE0fJrSSmymMpuWNaeWUcb70JNezeuScsLQk17N65Jywipr5XrsWJijXpUV0Pqpa9EJifkh_7qlH0GMmhDN30dR&_nc_ohc=4eLtvrE16SIAX9oREg7&_nc_ht=scontent.fmex23-1.fna&oh=00_AfC0DcwJdPxNLYYaUiXaw-5rMB3qkeVPVf_xqGLVhLKCaA&oe=6477CDFD" alt="Girl in a jacket" width="300" height="400">
                </body>
            </html>
            `);
            console.log(`📣 Respondiendo: 200 ${req.url} ${req.method}`);
            // Estableciendo código de respuesta 
            res.statusCode = 200;
            // Cerrando la comunicación 
            res.end();
            break;

        case '/favicon.ico':
            // Especificar la ubicación del archivo de icono
            const filePath = path.join(path.dirname(new URL(import.meta.url).pathname), 'favicon.ico');

            console.log(filePath);
            fs.readFile(filePath, (err, data) => {
                if (err) {

                    res.writeHead(404, { 'Content-Type': 'text/html' });

                    res.end('404 Not Found');

                } else {

                    res.setHeader('Content-Type', 'image/x-icon');
                   
                    res.end(data);

                }
            });
            break;
    }
});

// 3. arrancar el servidor
server.listen(3000, "0.0.0.0", () => {
    console.log("👩‍🍳 Servidor escuchando en http://localhost:3000");
});
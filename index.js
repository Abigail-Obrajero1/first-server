// 1. importando el modulo http
import http from 'http';
// Biblioteca path
import path from 'path';
import { runInNewContext } from 'vm';
// Recreando Built-in variables
global["__dirname"] = path.dirname(new URL(import.meta.url).pathname);
global["__filename"] = path.join(new URL(import.meta.url).pathname);

// 2. crear el servidor

const server = http.createServer(( req, res) => {
    console.log(`📣 CLIENT-REQUEST:${req.method} ${req.url}`);

    res.setHeader('Content-Type','text/html')
    res.write("<head>");
    res.write("<head>");
    res.write("<title>My app");
    res.write("</title>");
    res.write("</head>");
    res.write("<body>");
    res.write("<h1>Hello from my server...</h1>")
    res.write("</body>");
    res.write("</html>");
    // Creando un logger de peticiones
    // toda logica del server
    // 1. respondiendo al cliente
   console.log(`Se ha contestado recurso: ${req.method} ${req.url}`);
    // 2. cerrar la conexion
    console.log("📣 Cerrando la conexion");
    res.end();
});

// 3. arrancar el servidor
server.listen(3000,"0.0.0.0",()=>{
    console.log("Servidor escuchando en http://localhost:3000");
});
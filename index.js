// 1. importando el modulo http
import http from 'http';
// Biblioteca path
import path from 'path';
// Recreando Built-in variables
global["__dirname"] = path.dirname(new URL(import.meta.url).pathname);
global["__filename"] = path.join(new URL(import.meta.url).pathname);

// 2. crear el servidor

const server = http.createServer(( _, res) => {
    // logica del server
    // 1. respondiendo al cliente
    res.write(`
    __dirname:${__dirname}
    __filename:${__filename}`);
    // 2. cerrar la conexion
    res.end();
});

// 3. arrancar el servidor
server.listen(3000,"0.0.0.0",()=>{
    console.log("Servidor escuchando en http://localhost:3000");
});
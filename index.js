// 1. importando el modulo http

import http from 'http';


// 2. crear el servidor

const server = http.createServer((req, res) => {
    // logica del server
    // 1. respondiendo al cliente
    res.write('Hello from the server...');
    // 2. cerrar la conexion
    res.end();
});

// 3. arrancar el servidor
server.listen(3000,"0.0.0.0",()=>{
    console.log("Servidor escuchando en http://localhost:3000");
});
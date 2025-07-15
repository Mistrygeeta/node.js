const http = require('http');

const server = http.createServer((req , res)=>{
    res.end("Hello World!")
} );

server.listen(3000, ()=>{
    console.log("server is running in port 3000")
})


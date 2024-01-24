const fs = require('fs');
const http = require('http');
const url = require('url');
const replaceTemplate = require('./modules/replaceTemplate');

//! Reading Files (Blocking, Synchronous way)
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8")
// console.log(textIn);

// const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOut);
// console.log("File written!");

//! Non-Blocking, Asynchronous way
// fs.readFile("./txt/start.txt", "utf-8", (error, data) => {
//   if (error) return console.log("ERROR! 💥");

//   fs.readFile(`./txt/${data}.txt`, "utf-8", (error, data2) => {
//     console.log(data2);
//     fs.readFile(`./txt/append.txt`, "utf-8", (error, data3) => {
//       console.log(data3);

//       fs.writeFile(
//         "./txt/final.txt",
//         `${data2}\n${data3}`,
//         "utf-8",
//         (error) => {
//           console.log("Your file has been written 😁");
//         }
//       );
//     });
//   });
// });
// console.log("Will read file!");

//! Creating a simple web server
// const server = http.createServer((req, res) => {
//     // Callback function that will be called each time a new request hits the server
//     const pathName = req.url;

//     if (pathName === "/" || pathName === "/overview") {
//         res.end("This is the OVERVIEW");
//     } else if (pathName === "/product") {
//         res.end("This is the PRODUCT");
//     } else {
//         res.writeHead(404, {
//             "Content-type": "text/html",
//             "my-own-header": "hello-world",
//         });
//         res.end("<h1>Page not found!</h1>");
//     }
// });

// server.listen(8000, "localhost", () => {
//   console.log("Listening to requests on port 8000");
// });

//! Building a (Very) Simple API

// Read the template files
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  // Response to each request
  const { query, pathname } = url.parse(req.url, true);

  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, {
      'Content-type': 'text/html',
    });
    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join('');
    const output = tempOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHtml);
    res.end(output);
  } else if (pathname === '/product') {
    res.writeHead(200, {
      'Content-type': 'text/html',
    });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);
  } else if (pathname === '/api') {
    res.writeHead(200, {
      'Content-type': 'application/json',
    });
    res.end(data);
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
    });
    res.end('<H1>Not Found</H1>');
  }
});

server.listen(8000, 'localhost', () => {
  console.log('Listening to requests on port 8000');
});

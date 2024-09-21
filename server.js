const http = require('http');
const fs = require('fs');
const path = require('path');

const app = http.createServer((req, res)=>{
    if(req.url == "/" && req.method == "GET"){
        res.end(fs.readFileSync("./index.html", "utf8"));
    }else if(req.url == "/script.js" && req.method == "GET"){
        res.end(fs.readFileSync("./script.js", "utf8"));
    }else if(req.url == "/getdetails" && req.method == "POST"){
      let data = '';
      req.on('data', (chunk) => {
        data = data + chunk;
      })
      req.on('end', () => {
        const empid=JSON.parse(data);
        console.log(empid);
        const details = JSON.parse(fs.readFileSync("./item.json", "utf-8"));
        const result = details.filter(ele=>ele.id == empid.val);
        
        if(result.length>0){
          res.end(JSON.stringify(result));
        }
        else{
          res.end(JSON.stringify({message: "Employee not found"}));
        }


      })
    }
    else{
        res.end();
    }
});



app.listen(3000,(err)=>{
    if (err) throw err;
    console.log('Server is running on port 3000');
});

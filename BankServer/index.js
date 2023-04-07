//Server creation----------------

const { application } = require("express");

//1 import express
const express = require('express')

//to  import datasevice
const dataService =require('./services/data.service')

// import cors 
const cors = require('cors');



//2 creating an application  for express
const app= express()

//to parse json from req body
app.use(express.json()) //type conversion
//Give command to share data via cors 
app.use(cors({
    origin:['http://localhost:4200', ' http://192.168.211.146:8080',' http://127.0.0.1:8080']
}))

//3 create port number
app.listen(3000, ()=>{
    console.log('Listening on port 3000');
})

//aplication specific middleware
const appMiddleware = (req,res,next)=>{
    console.log('application specific middleware');
    next();
}
app.use(appMiddleware)


const jwt=require('jsonwebtoken')
const jwtMiddleware= (req,res,next)=>{
    console.log('ROUTER specific middleware');
    const token = req.headers['x-access-token'];
    //verify token - verify()
    const data = jwt.verify(token,'superkey2022')
    console.log(data);
    next();
}

//4 Resolving http request
//get http request

app.get('/', (req,res)=>{
    res.send('get http request');
})

app.post('/', (req,res)=>{
    res.send('Post request');
})

app.put('/', (req,res)=>{
    res.send('Put request');
})

app.delete('/', (req,res)=>{
    res.send('Delete request');
})

app.patch('/', (req,res)=>{
    res.send('Patch request');
})


//API Calls
//registration request
app.post('/register', (req,res)=>{
    console.log(req.body);
   dataService.register(req.body.acno, req.body.username, req.body.pswd)
   .then(result=>{
    res.status(result.statusCode).json(result)
   })
   
})


//login request
app.get('/register', (req,res)=>{
    console.log(req.body);
    res.send('Login succesfull');
})
app.post('/login', (req,res)=>{
    console.log(req.body);
    dataService.login(req.body.acno,req.body.pswd)
   .then(result=>{
    res.status(result.statusCode).json(result)
   })
})

//deposit request
app.post('/deposit',jwtMiddleware, (req,res)=>{
    console.log(req.body);
    dataService.deposit(req.body.acno,req.body.pswd,req.body.amount,req.body.transTime)
    .then(result=>{
    res.status(result.statusCode).json(result)
    })
})
//withdraw request
app.post('/withdraw',jwtMiddleware, (req,res)=>{
    console.log(req.body);
    dataService.withdraw(req.body.acno,req.body.pswd,req.body.amount,req.body.transTime)
    .then(result=>{
    res.status(result.statusCode).json(result)
    })
})
//transactiion request
app.post('/getTransaction',jwtMiddleware, (req,res)=>{
    console.log(req.body);
    dataService.getTransaction(req.body.acno)
    .then(result=>{
    res.status(result.statusCode).json(result)
    })
})

app.post('/Balance',jwtMiddleware, (req,res)=>{
    console.log(req.body);
    dataService.getBalance(req.body.acno)
    .then(result=>{
    res.status(result.statusCode).json(result)
    })
})



//delete request
app.delete('/deleteAcc/:acno', (req,res)=>{
    dataService.deleteAcc(req.params.acno)
    .then(result=>{
    res.status(result.statusCode).json(result)
    })
})
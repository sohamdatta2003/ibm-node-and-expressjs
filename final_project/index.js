const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;
const public_users = require("./router/general.js"); 

const app = express();

app.use(express.json());

app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

app.use("/customer/auth/*", function auth(req,res,next){
//Write the authenication mechanism here
   const token = req.headers["authorization"];

   if (!token) {
     // No token provided, respond with 401 Unauthorized
     return res.status(401).json({ error: "No token provided" });
   }

   // Verify the token
   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
     if (err) {
       // Invalid token, respond with 401 Unauthorized
       return res.status(401).json({ error: "Invalid token" });
     }

     // Token is valid, attach user information to request object
     req.user = decoded; // The decoded token usually contains the user's info (e.g., id, email)

     // Proceed to the next middleware/route handler
     next();
   });
});
 
const PORT =5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running"));

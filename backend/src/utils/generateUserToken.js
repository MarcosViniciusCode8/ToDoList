import jwt from 'jsonwebtoken';

if(email && password){
    jwt.sign({});
}
else{
    throw new Error("Invalid credentials")
}
import * as userRepository from '../../repository/sub-actions/verifyEmailForLogin.js';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { searchInfos } from '../../repository/sub-actions/searchInfos.js';

export default async function login(user) {
    let searchUser = await userRepository.verifyEmailForLogin(user.email);
    let infos = await searchInfos(user.email)
    if(searchUser){
        const hash_compare = await bcrypt.compare(user.password, searchUser.password_hash);
        if(hash_compare){
           let token = jwt.sign(
            {id: Number(infos.id), user_type: String(infos.user_type)},
            process.env.JWT_SECRET,
            {expiresIn: '1h', algorithm: 'HS256'}
        )
        return token;
        }
        else{
            throw new Error("Credenciais incorretas1");
            
        }
    }
    else{
        throw new Error("Credenciais incorretas2");
        
    }



}

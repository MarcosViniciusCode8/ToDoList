import * as userRepository from '../../repository/actions/userRepository.js';
import { httpError } from '../../utils/httpError.js';
import { verifyEmail } from '../../repository/sub-actions/verifyEmail.js';

export default async function editEmail(email,id) {
    if(!email){
        throw httpError(400, "Email are required")
    }

    let existingEmail = await verifyEmail(email);
    if(existingEmail.length > 0){
        throw httpError(409, "Email is already registered")
    }

    let response = await userRepository.editEmail(email,id)
    return response;

}
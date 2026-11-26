import * as userRepository from '../../repository/actions/userRepository.js';
import { httpError } from '../../utils/httpError.js';
import { verifyName } from '../../repository/sub-actions/verifyName.js';

export default async function editUsername(user,id) {
    if(!user){
        throw httpError(400, "Name are required")
    }

    let existingName = await verifyName(user);
    if(existingName.length > 0){
        throw httpError(409, "Name is already registered")
    }

    let response = await userRepository.editUsername(user,id)
    return response;

}
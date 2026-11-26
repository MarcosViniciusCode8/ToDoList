import userRouter from './controller/userController.js';

export default function registerRoutes(api){
    api.use(userRouter);
}

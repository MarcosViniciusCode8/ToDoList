import taskRouter from './controller/taskController.js';
import userRouter from './controller/userController.js';

export default function registerRoutes(api){
    api.use(taskRouter);
    api.use(userRouter);
}
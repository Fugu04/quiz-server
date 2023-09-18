import express from 'express';
import mongoose from 'mongoose';

import { registerValidation, loginValidation, postCreateValidation } from './validations.js';
import checkAuth from './utils/checkAuth.js';

import * as UserController from './controllers/UserController.js';
import * as PostController from './controllers/PostContreller.js';
import handleValidationErrors from './utils/handleValidationErrors.js';

mongoose.connect('mongodb+srv://tilekakhmetov2021:wwwwww@cluster0.vppdbca.mongodb.net/blog?retryWrites=true&w=majority'
).then(() => console.log('Db ok'))
.catch((err) => console.log('Db error', err));

const app = express();
const port = 4444;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('complete');
});

app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login);
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);



app.get('/tags', PostController.getLastTags);

app.get('/posts', PostController.getAll);
app.get('/posts/tags', PostController.getLastTags);
// app.get('/posts/:id', PostController.getOne);
app.post('/posts', checkAuth, postCreateValidation, PostController.create);
// app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch('/posts/:id', checkAuth, postCreateValidation, PostController.update);

app.listen(port, (err) => {
    if(err){
        return console.log(err);
    }
    console.log('Server running on http://localhost:'+port);
});
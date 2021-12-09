const jwt = require('../utils/jwt');
const repository = require('../repositories/UserRepository');
const bcrypt = require('bcrypt');
const userRepo = new repository();

const login = async (username, password) => {
    return new Promise((resolve, reject) => {
        userRepo.getByUsername(username)
            .then(response => {
                if(response.length > 0) {
                    const res = response[0];
                    const user = {
                        _id: res._id,
                        email: res.email,
                        name: res.name,
                        username: res.username,
                        sex: res.sex,
                        dateOfBirth: res.dateOfBirth,
                        displayPicture: res.displayPicture,
                        createdAt: res.createdAt,
                        updatedAt: res.updatedAt
                    };
                    const passwordValid = bcrypt.compareSync(password, res.password);
                    if(!passwordValid) {
                        reject(new Error('Invalid Password'));
                    } else {
                        const token = jwt.createToken(user._id, '30 s');
                        resolve({
                            status: 'success',
                            message: 'User Logged In',
                            access_token: token,
                            token_type: 'Bearer',
                            user: user
                        });
                    }
                } else {
                    reject({
                        status: 'failed',
                        message: 'User Not Found!'
                    });
                }
            })
            .catch(err => {
                console.log(err);
                reject(err);
            })
    })
}

const register = async (data) => {
    const userExists = await userRepo.checkIfExists(data.username, data.email);
    // console.log(userExists);
    return new Promise((resolve, reject) => {
        if(userExists.length > 0) {
            reject(new Error('Username and Email already exists!'));
        } else {
            userRepo
                .create(data)
                .then(response => {
                    if(response) {
                        resolve({
                            status: 'success',
                            message: 'User successfully registered!'
                        });
                    } else {
                        reject(new Error("Register User failed!"));
                    }
                })
                .catch(err => {
                    reject(err);
                })
        }

    })
}

const getUserLogin = (token) => {
    return new Promise((resolve, reject) => {
        const info = jwt.verifyToken(token);
        userRepo
            .getById(info.id)
            .then(response => {
                resolve({
                    status: 'success',
                    message: 'Taking user data successfully',
                    data: response[0]
                });
            })
            .catch(err => {
                reject(err);
            })
    })
}

const getUser = () => {
    return new Promise((resolve, reject) => {
        userRepo
            .getAll()
            .then(response => {
                resolve({
                    status: 'success',
                    data: response
                });
            })
            .catch(err => {
                reject(err);
            })
    });
}

const deleteUser = (id) => {
    return new Promise((resolve, reject) => {
        userRepo
            .delete(id)
            .then(response => {
                resolve({
                    status: 'success',
                    message: 'User has been deleted'
                });
            })
            .catch(err => {
                reject(err);
            });
    })
}

const logout = (token) => {
    return new Promise((resolve, reject) => {
        const info = jwt.verifyToken(token);
        const refresh = jwt.createToken(info.id, '2 s');
        if(refresh) {
            req.token = refresh;
            resolve({
                status: 'success',
                message: 'User Logged Out successfully'
            });
        } else {
            reject(new Error('Logout Failed!'));
        }
    })
}

module.exports = {
    login,
    register,
    getUser,
    deleteUser,
    getUserLogin,
    logout
};
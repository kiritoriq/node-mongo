const authService = require('../services/AuthService');

const login = (req, res) => {
    if(req.body.username && req.body.password) {
        const userLogin = {
            username: req.body.username,
            password: req.body.password
        };
        authService
            .login(userLogin.username, userLogin.password)
            .then(response => {
                res.status(200).json(response);
            })
            .catch(err => {
                console.log(err);
                res.status(401).json({
                    status: 'failed',
                    message: 'Password not matched!'
                });
            })
    } else {
        console.log(req.body);
        res.status(400).send('Invalid Request');
    }
}

const register = (req, res) => {
    if(
        req.body.email &&
        req.body.username &&
        req.body.name &&
        req.body.password
    ) {
        data = {
            email: req.body.email,
            username: req.body.username,
            name: req.body.name,
            password: req.body.password,
            sex: (req.body.sex ? req.body.sex : ''),
            dob: (req.body.dob ? req.body.dob : ''),
            dp: (req.body.dp ? req.body.dp : '')
        };
        return authService
            .register(data)
            .then(response => {
                // console.log(response);
                res.status(200).json(response);
            })
            .catch(err => {
                console.log(err);
                res.status(200).send({
                    status: 'failed',
                    message: 'Username and Email already Exists'
                });
            })
    } else {
        res.status(400).send('Invalid Request');
    }
}

const getUserLogin = (req, res) => {
    authService
        .getUserLogin(req.token)
        .then(response => {
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
        })
}

const getUser = (req, res) => {
    authService.getUser()
        .then(response => {
            console.log(response);
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(400).send('Get User Failed');
        })
}

const deleteUser = (req, res) => {
    if(req.body.id) {
        authService
            .deleteUser(req.body.id)
            .then(response => {
                if(response.status == 'success') {
                    res.status(200).json(response);
                } else {
                    res.json({
                        status: 'failed',
                        message: 'Failed deleting User'
                    });
                }
            })
    } else {
        res.status(400).send('Invalid Request');
    }
}

const logout = (req, res) => {
    authService
        .logout(req.token)
        .then(response => {
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(400).send('Bad Request');
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
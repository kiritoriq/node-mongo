const Users = require('../models/Users');
const bcrypt = require('bcrypt');

class UserRepository {
    create(data) {
        let password = bcrypt.hashSync(data.password, 8);
        let newUser = new Users({
            email: data.email,
            username: data.username,
            name: data.name,
            password: password,
            sex: data.sex,
            dateOfBirth: data.dob,
            displayPicture: data.dp
        });

        return newUser.save();
    }

    checkIfExists(username, email) {
        return Users.find({
            username: username,
            email: email
        }).exec();
    }

    getAll() {
        return Users.find({}).select('-password');
    }

    getById(id) {
        return Users.find({
            _id: id
        }).select('-password');
    }

    getByUsername(username) {
        return Users.find({
            username: username
        }).exec();
    }

    update(data) {
        //
    }

    delete(id) {
        return Users.findByIdAndDelete(id);
    }
}

module.exports = UserRepository;
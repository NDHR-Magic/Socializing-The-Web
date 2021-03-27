const { User } = require("../models")

const getRequests = async (req, res, next) => {
    const userData = await User.findByPk(req.session.user_id);

    let requests;
    if (userData) {
        requests = await userData.countRequesters();
    }

    req.requests = requests;
    next();
}

module.exports = { getRequests }
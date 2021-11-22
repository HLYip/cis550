const connection = require('./connectDB')
const { v4: uuidv4 } = require('uuid');
const passport = require('passport')
const { hashUserPassword } = require('./utils')

// authorization - signup
async function signup(req, res) {
    if (!req.body.username || !req.body.password || !req.body.prefer_health) {
        res.status(400).json({ description: 'Invalid input' });
    } else {
        try {
            const { username, password, prefer_health } = req.body;
            connection.query(`SELECT * FROM Users WHERE username = '${username}'`,  async function(err,rows) {
                if (err) return res.status(500).json({ description: err });
                if (rows.length) {
                    return res.status(409).json({ description: 'Username has already taken' }); 
                } 
            
                // all is well, insert this user information
                user_id = uuidv4(); // generate a random UUID for this user
                hash_password = await hashUserPassword(password)
                connection.query(`
                    INSERT INTO Users (user_id, username, password, prefer_health)
                    VALUES ('${user_id}', '${username}', '${hash_password}', ${prefer_health})
                `, function(err, _) {
                    if (err) return res.status(500).json({ description: err });
                    return res.status(200).json({ description: 'Success' })
                })
            });
        } catch (e) {
            res.status(500).json({ description: 'Internal Server Error for unforeseen reason' });
        }
    }
}

// authorization - login
async function login(req, res, next) {
    passport.authenticate('login', (err, user, info) => {
        if (err) {
          res.status(500).json({ description: err });
        } else {
          const { message } = info;
          if (message == 'Incorrect username.' || message == 'Incorrect password.') {
            res.status(400).json({ description: message });
          } else {
            req.logIn(user, (error) => {
              if (error) {
                return next(error);
              }
              return res.status(200).json({
                description: message,
                authenticated: true,
                username: user.username,
                userId: user.user_id,
                prefer_health: user.prefer_health
              });
            });
          }
        }
      })(req, res, next);
}


module.exports = {
    signup,
    login
}
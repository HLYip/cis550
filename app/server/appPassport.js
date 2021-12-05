var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

const connection = require('./connectDB')
const { comparePassword } = require('./utils')

module.exports = function(passport) {
  /**
   * Passport Authentication Initialization
   */
  passport.use('login', new LocalStrategy({
    usernameField: 'username', passwordField: 'password',
  },
    async function(username, password, done) {
      connection.query(`SELECT * FROM Users WHERE username = '${username}'`, async function(err,rows){
        if (err)
          return done(err);
        if (!rows.length) {
            return done(null, false, { message: 'Incorrect username.' }); 
        } 
        
        // if the user is found but the password is wrong
        const valid = await comparePassword(password, rows[0].password)
        if (!valid) {
            return done(null, false, { message: 'Incorrect password.' }); 
        }
        // all is well, return successful user
        return done(null, rows[0], { message: 'Success.'});			
      });
    }
  ));

  passport.serializeUser((user, done) => {
    // eslint-disable-next-line no-underscore-dangle
    console.log('serializing user '+user)
    done(null, user.user_id);
  });

  passport.deserializeUser((id, done) => {
    console.log('deserializing user '+id)
    connection.query(`select * from Users where user_id = '${id}'`,function(err,rows){	
      done(err, rows[0]);
    });
  });
}
const config = require('./config.json')
const mysql = require('mysql');
const e = require('express');

// TODO: fill in your connection details here
const connection = mysql.createConnection({
    host: config.rds_host,
    user: config.rds_user,
    password: config.rds_password,
    port: config.rds_port,
    database: config.rds_db
});
connection.connect();



// Route 1 (handler)


async function stateinfo(req,res){

    const state = req.query.state
    

    
    if(req.query.state){
        connection.query(`with temp as (
            select r.county, count(c.category) as counts, avg(stars) as avg_stars
            from Restaurants r
                     join Categories c on r.business_id = c.business_id
            where r.state = '${state}'
            group by r.county
        ), health_index as (
            select county, sum(vacc_count),
        Rank() OVER
            (ORDER BY avg(vacc_pct) DESC) as vac_rate_rank,
        Rank() OVER
            (ORDER BY avg(pos_pct) ASC) as low_pos_rate_rank
        from Health
        where state_abbr = '${state}'
        and vacc_pct is not null and pos_pct is not null
        group by county
        )
        select health_index.county, temp.avg_stars as average_rating,
        case when temp.counts >10 then 'plentiful choices'
        when temp.counts >5 and temp.counts<=10 then 'several choices'
        when temp.counts is null then 'choices unknown'
        else 'few choices'
        end as num_category_county,
        case when low_pos_rate_rank < 0.3* (select count(distinct(county)) from Health where state_abbr = '${state}') then 'safe county'
        when low_pos_rate_rank <= 0.7* (select count(distinct(county)) from Health where state_abbr = '${state}') then 'fine county'
        else 'risky county'
        end as positive_level,
        case when vac_rate_rank < 0.3* (select count(distinct(county)) from Health where state_abbr = '${state}') then 'highly vaccinated'
        when vac_rate_rank < 0.7* (select count(distinct(county)) from Health where state_abbr = '${state}') then 'medium vaccinated'
        else 'low vaccinated'
        end as vaccination_level
        from health_index left join temp on health_index.county = temp.county
        group by county
        order by health_index.county asc`, function (error, results, fields)  {

            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });
        
    }else{
        res.send('bye')
    }
}



async function restlocation (req, res){

    const lat = req.query.lat
    const long = req.query.long
    const category = req.query.category

    if(req.query.lat && req.query.long && req.query.category){
        connection.query(`with a as (
            select * from Categories natural join Restaurants
        )
        select a.business_id,a.name,a.stars,
        case when stars >4 and review_count > 20 then 'highly recommend'
        when stars >3 and review_count > 5 then 'recommend'
        else 'not recommend'
        end as recommendation
        
        from a
        where abs(a.r_lat - ${lat}) <= 0.01  
        and abs(a.r_long - (${long})) <= 0.01  
        and a.category Like '%${category}%' 
        order by a.stars,a.review_count desc `,function (error, results, fields) {

           if (error) {
               console.log(error)
               res.json({ error: error })
           } else if (results) {
               res.json({ results: results })
               
               
           }
       });

}else{
    connection.query(`select * from Restaurants
    where stars>=4 and is_open = 1
    order by RAND()
    limit 8`,function (error, results, fields) {

       if (error) {
           console.log(error)
           res.json({ error: error })
       } else if (results) {
           res.json({ results: results })
           
           
       }
   });

    
}
    }





    
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
    login,
    stateinfo,
    restlocation
}
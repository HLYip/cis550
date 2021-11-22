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
async function hello(req, res) {
    // a GET request to /hello?name=Steve
    if (req.query.name) {
        res.send(`Hello, ${req.query.name}! Welcome to the FIFA server!`)
    } else {
        res.send(`Hello! Welcome to the FIFA server!`)
    }
}

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






module.exports = {
    hello,
    stateinfo,
    restlocation
}
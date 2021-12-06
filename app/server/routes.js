const connection = require('./connectDB')
const { v4: uuidv4 } = require('uuid');
const passport = require('passport')
const { hashUserPassword } = require('./utils')

const nonrestaurants = `
'Home Services', 'Radiologists,Doctors', 'Jewelry,Health & Medical,Chiropractors', 'Massage Therapy',
'Hair Salons', 'Waxing,Hair Removal', 'Health & Medical',
'Arts & Crafts', 'Real Estate', 'Pediatric Dentists', 'Permanent Makeup', 'Beauty & Spas', 'Massage',
'Oil Change Stations', 'Tires,Auto Repair', 'Automotive',
'Children''s Clothing', 'Fashion', 'Hospitals', 'Shopping', 'Eyelash Service', 'Hair Extensions',
'Security Systems', 'Television Service Providers', 'Professional Services',
'Home Services', 'Women''s Clothing', 'Home & Garden', 'Used', 'Vintage & Consignment',
'Men''s Clothing', 'Shoe Stores', 'Nail Salons', 'Urgent Care', 'Auto Glass Services',
'Florists', 'Thrift Stores', 'Waxing', 'Day Spas', 'Eyelash Service', 'Tattoo', 'Permanent Makeup',
'Skin Care', 'Landscaping', 'Orthopedists', 'Plumbing', 'Building Supplies',
'Trainers', 'Gyms', 'Pilates', 'Apartments', 'Yoga', 'Appliances & Repair', 'Boxing', 'Art Classes',
'Baby Gear & Furniture', 'Thrift Stores', 'Laser Hair Removal', 'Wedding Planning',
'Tanning', 'Art Supplies', 'Window Washing', 'Financial Advising', 'Mortgage Lenders', 'Sex Therapists',
'Prosthetics', 'Orthotics', 'Carpet Installation', 'Tai Chi', 'Office Equipment',
'Strip Clubs', 'Roof Inspectors', 'Carpenters', 'Dance Schools', 'Neurotologists', 'Kickboxing',
'Art Space Rentals', 'Real Estate Photography', 'Embroidery & Crochet', 'Title Loans',
'Real Estate Law', 'Criminal Defense Law', 'Business Law', 'Hunting & Fishing Supplies',
'Gastroenterologist', 'Taekwondo', 'Junk Removal & Hauling', 'Pet Groomers', 'Furniture Reupholstery',
'Fingerprinting', 'Motorcycle Dealers', 'Motorcycle Repair', 'Check Cashing/Pay-day Loans',
'Speech Therapists', 'Snow Removal', 'Pool Halls', 'Paint & Sip', 'Outdoor Furniture Stores',
'Lawn Services',
'Estate Planning Law', 'Tennis', 'Golf Lessons', 'Drywall Installation & Repair', 'Trampoline Parks',
'Masonry/Concrete', 'Accountants', 'Smog Check Stations', 'Photo Booth Rentals', 'Paint Stores',
'Solar Installation',
'Vehicle Shipping', 'Towing', 'Wallpapering', 'Emergency Rooms', 'Mountain Biking',
'Farm Equipment Repair', 'Battery Stores', 'Self-defense Classes', 'Brazilian Jiu-jitsu', 'Gymnastics',
'Musical Instruments & Teachers', 'Commissioned Artists', 'Gun/Rifle Ranges', 'Historical Tours',
'Guitar Stores', 'Used Car Dealers', 'Furniture Rental', 'Pet Photography', 'Nurse Practitioner',
'Immunodermatologists',
'Television Stations', 'Boat Repair', 'Boating', 'Pet Stores', 'Trailer Repair', 'Test Preparation',
'Prosthodontists', 'Skate Shops', 'Childbirth Education', 'Driving Schools', 'Debt Relief Services',
'Kitchen Supplies',
'Knife Sharpening', 'Montessori Schools', 'Immigration Law', 'Pet Training', 'Police Departments',
'Hockey Equipment', 'Badminton', 'Passport & Visa Services', 'Art Restoration', 'Halotherapy',
'Rock Climbing', 'Fire Departments',
'Mobility Equipment Sales & Services', 'Medical Foot Care', 'Auto Electric Services', 'Rheumatologists',
'Pet Adoption', 'Massage Schools', 'Pulmonologist', 'Horse Equipment Shops', 'Clock Repair',
'Animal Physical Therapy',
'3D Printing', 'Calligraphy', 'Game Truck Rental', 'Climbing', 'Baseball Fields', 'Geneticists',
'Surfing', 'Pet Waste Removal', 'Boat Parts & Supplies', 'Nursing Schools', 'Hepatologists',
'Dialysis Clinics', 'Traffic Schools',
'Traffic Ticketing Law', 'Pet Transportation', 'Surf Shop', 'College Counseling',
'Electricity Suppliers', 'Skiing', 'Perfume', 'Movers', 'IT Services & Computer Repair',
'Mobile Phone Repair', 'Electronics Repair', 'Men''s Hair Salons',
'Hair Stylists', 'Barbers', 'Beauty & Spas', 'Massage', 'Personal Injury Law', 'Lawyers', 'DUI Law',
'Gas Stations', 'Financial Services', 'Auto Loan Providers', 'Banks & Credit Unions', 'Medical Centers',
'Radiologists', 'Diagnostic Services',
'Diagnostic Imaging', 'Doctors', 'Education', 'Family Practice', 'Medical Centers', 'Hair Stylists',
'Jewelry', 'Jewelry Repair', 'Home Decor', 'Cosmetics & Beauty Supply', 'Beauty & Spas',
'Furniture Assembly', 'Mailbox Centers', 'Beauty & Spas',
'Shredding Services', 'Shipping Centers', 'Weight Loss Centers', 'Physical Therapy', 'Pain Management',
'Hair Removal', 'Reflexology','Printing Services','Parks','Public Services & Government'
`

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


async function stateinfo(req,res){
    const state = req.query.state
    if(req.query.state){
        connection.query(`with not_resturants as (
            select distinct business_id from Categories
                where category in (${nonrestaurants})
         ), temp as (
            select county, count(c.category) as counts, avg(stars) as avg_stars
            from Restaurants r
                     join Categories c on r.business_id = c.business_id
                     left join not_resturants nr on r.business_id = nr.business_id
            where nr.business_id is null and state = '${state}'
               or state like '${state}'
            group by county
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
        connection.query(`SELECT ((1-AVG(pos_pct))*0.6+AVG(vacc_pct)*0.4) AS health_score,state_abbr
        FROM Health
        GROUP BY ${state}`,function (error, results, fields) {

        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })
        }
    });
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
        and business_id in (
            with not_resturants as (
                select distinct business_id
                from Categories
                where category in (${nonrestaurants})
            )Select r.business_id from Restaurants r left join not_resturants nr on r.business_id = nr.business_id
            where nr.business_id is null)
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

//TODO: add attributes filter and like indicator
async function search(req, res) {
    if (!req.query.city) {
        res.status(400).json({ description: 'Invalid input' });
    } else {
        const city = req.query.city
        const category = req.query.category? req.query.category : ''
        const pagesize = req.query.pagesize ? req.query.pagesize : 10
        const page = req.query.page? req.query.page : 1
        const offset = pagesize * (page - 1) 
        const query = `
        WITH health_score AS (
            SELECT ((1-AVG(pos_pct))*0.6+AVG(vacc_pct)*0.4) AS score,
                   ROUND(PERCENT_RANK() over (ORDER BY ((1-AVG(pos_pct))*0.6+AVG(vacc_pct)*0.4)), 2) AS score_rank,
                   county, state_abbr
            FROM Health
            GROUP BY county, state
        ),
        rest_score AS (
            SELECT business_id, name, address, city, state, zipcode, r_lat AS latitude, r_long AS longitude,
                stars, ROUND(PERCENT_RANK() over (ORDER BY stars), 2) AS stars_rank,
                review_count, ROUND(PERCENT_RANK() over (ORDER BY review_count), 2) AS review_rank,
                is_open, hours, county
            FROM Restaurants R
            NATURAL JOIN Categories
            WHERE city='${city}' AND category like '%${category}%'
        )
        SELECT  distinct business_id, name, address, city, state, zipcode, latitude, longitude,
                stars, review_count, is_open, hours
        FROM rest_score R
        JOIN health_score ON R.county = health_score.county AND R.state = health_score.state_abbr
        WHERE business_id in (
            select distinct business_id
            from Categories
            where category in (${nonrestaurants})
        )
        ORDER BY (stars*0.3+score_rank*0.6+review_rank*0.1) DESC
        LIMIT ${offset}, ${pagesize};`
        connection.query(query, function(error, results, fields) {
            if (error) {
                res.status(500).json({ description: error })
            } else if (results) {
                res.status(200).json({ results: results })
            }
        })
    }
}

async function addLike(req, res) {
    if (!req.body.business_id || !req.body.user_id) {
        res.status(400).json({ description: 'Invalid input' });
    } else {
        const business_id = req.body.business_id
        const user_id = req.body.user_id
        connection.query(`
        SELECT * FROM Likes
        WHERE user_id = '${user_id}' AND business_id = '${business_id}'
        `, function(error, results) {
            if (error) {
                res.status(500).json({ error: error })
            } else if (results.length > 0) {
                res.status(409).json({ description: 'Duplicate' })
            } else {
                connection.query(`
                    INSERT INTO Likes (user_id, business_id)
                    VALUES ('${user_id}', '${business_id}')
                `, function(error, _) {
                    if (error) {
                        res.status(500).json({ description: error })
                    } else {
                        res.status(200).json({ description: 'Success'})
                    }
                })
            }
        })
    }
}

async function removeLike(req, res) {
    if (!req.body.business_id || !req.body.user_id) {
        res.status(400).json({ description: 'Invalid input' });
    } else {
        const business_id = req.body.business_id
        const user_id = req.body.user_id
        connection.query(`
        SELECT * FROM Likes
        WHERE user_id = '${user_id}' AND business_id = '${business_id}'
        `, function(error, results) {
            if (error) {
                res.status(500).json({ description: error })
            } else if (results.length == 0) {
                res.status(404).json({ description: 'Not found' })
            } else {
                connection.query(`
                    DELETE FROM Likes
                    WHERE user_id = '${user_id}' AND business_id = '${business_id}'
                `, function(error, _) {
                    if (error) {
                        res.status(500).json({ description: error })
                    } else {
                        res.status(200).json({ description: 'Success'})
                    }
                })
            }
        })
    }
}

async function getLikedRest(req, res) {
    if (!req.params.username) {
        res.status(400).json({ description: 'Invalid input' });
    } else {
        const username = req.params.username
        connection.query(`
        SELECT business_id FROM Users
        NATURAL JOIN Likes
        WHERE username = '${username}'
        `, function(error, results) {
            if (error) {
                res.status(500).json({ description: error })
            } else if (results.length == 0) {
                res.status(404).json({ description: 'Not found' })
            } else {
                res.status(200).json({ results: results})
            }
        })
    }
}

async function getRestInfo(req,res){
    const bus_id = req.query.bus_id
    connection.query(`Select lat, lng from Restaurant where business_id = ${bus_id}`,function (error, results, fields) {

        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })   
        }
    });
 
   
    }


async function todayrecommendation (req, res){
    
    const category = req.query.category 
    
    if(req.query.category){
        connection.query(`WITH TABLE1 AS(SELECT category, MAX(review_count) as popularity
        FROM Health H join Restaurants R on H.county=R.county join Categories C on R.business_id = C.business_id
        WHERE H.trans_level!='high' and H.trans_level!='null' and H.report_date='2021-11-10' and stars=5
        GROUP BY category),
             TABLE2 AS(SELECT name, address, city, R.state, category, trans_level
        FROM Health H join Restaurants R on H.county=R.county join Categories C on R.business_id = C.business_id
        WHERE H.trans_level!='high' and H.trans_level!='null' and H.report_date='2021-11-10' and stars=5)
        SELECT DISTINCT (name) as restaurant, address, city, TABLE2.state, trans_level
        FROM TABLE1 join TABLE2 on TABLE1.category=TABLE2.category and TABLE1.popularity = TABLE1.popularity
        WHERE TABLE1.category ='${category}'
        LIMIT 8; `,function (error, results, fields) {

           if (error) {
               console.log(error)
               res.json({ error: error })
           } else if (results) {
               res.json({ results: results })   
           }
       });
    }
    
}
async function explore (req, res){
    
    const category = req.query.category 
    
    if(req.query.category){
        connection.query(`WITH TABLE1 AS(SELECT category, MAX(review_count) as popularity
        FROM Health H join Restaurants R on H.county=R.county join Categories C on R.business_id = C.business_id
        WHERE H.trans_level!='high' and H.trans_level!='null' and H.report_date='2021-11-10' and stars=5
        GROUP BY category),
             TABLE2 AS(SELECT name, address, city, R.state, category, trans_level
        FROM Health H join Restaurants R on H.county=R.county join Categories C on R.business_id = C.business_id
        WHERE H.trans_level!='high' and H.trans_level!='null' and H.report_date='2021-11-10' and stars=5)
        SELECT DISTINCT (name) as restaurant, address, city, TABLE2.state, trans_level
        FROM TABLE1 join TABLE2 on TABLE1.category=TABLE2.category and TABLE1.popularity = TABLE1.popularity
        WHERE TABLE1.category ='${category}'; `,function (error, results, fields) {

           if (error) {
               console.log(error)
               res.json({ error: error })
           } else if (results) {
               res.json({ results: results })   
           }
       });
    }
    
}
async function covid (req, res){
    
    const state = req.query.state 
    
    if(req.query.state){
        connection.query(`SELECT report_date, SUM(case_count_change) as number
        FROM Health
        WHERE state='%${state}' or state_abbr = '${state}'
        GROUP BY report_date
        ORDER BY report_date;`,function (error, results, fields) {

           if (error) {
               console.log(error)
               res.json({ error: error })
           } else if (results) {
               res.json({ results: results })   
           }
       });
    }
    else{
        connection.query(`SELECT report_date, SUM(case_count_change) as number
        FROM Health
        GROUP BY report_date
        ORDER BY report_date;`,function (error, results, fields) {

           if (error) {
               console.log(error)
               res.json({ error: error })
           } else if (results) {
               res.json({ results: results })   
           }
       });
      
    }
    
}

async function logout(req, res) {
    req.logout();
    req.session.destroy();
    res.status(200).json({ description: 'Log out successfully' });
}



module.exports = {
    signup,
    login,
    stateinfo,
    restlocation,
    todayrecommendation,
    explore,
    covid,
    search,
    addLike,
    removeLike,
    getLikedRest,
    abc,
    getRestInfo
}
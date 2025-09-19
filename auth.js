// Authentication using passportJS
const passport=require('passport');
const localStrategy=require('passport-local').Strategy;
const Person=require('./models/person');

passport.use(new localStrategy(
    {
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true // allows access to req in callback
    }, 
    async (req,uname,pwd,done)=>{
    // authentication logic here
    try {
        // Get credentials from req.query for GET requests
            if (req.method === 'GET') {
                uname = req.query.username;
                pwd = req.query.password;
            }
         // Check for missing credentials
        if (!uname || !pwd) {
            return done(null, false, { message: 'Missing credentials' });
        }   
        console.log('Recieved Credentials: ',uname,pwd);
        const user=await Person.findOne({username: uname});
        if(!user)
            return done(null,false, {message: 'Incorrect username'});
        
        const isPasswordMatch=await user.comparePassword(pwd);
        console.log('Checking the password of credentials and isMatch: ',isPasswordMatch);
        if(isPasswordMatch){console.log('Matched pwd');
            return done(null, user);
        }
        else{
            return done(null,false,{message: 'Invalid Password'});
        }
    } catch (error) {
        return done(error);
    }

}));

// Custom middleware for GET authentication using query params
// const authenticateGet = async (req, res, next) => {
//     const { username, password } = req.query;
//     if (!username || !password) {
//         return res.status(401).send('Missing credentials');
//     }
//     try {
//         const user = await Person.findOne({ username });
//         if (!user || user.password !== password) {
//             return res.status(401).send('Invalid credentials');
//         }
//         req.user = user; // Attach user to request if needed
//         next();
//     } catch (err) {
//         return res.status(500).send('Server error');
//     }
// };

module.exports=passport;
# Adding the authenticator by passportJs module in npm
workflow of the authentication process:
    Client GET /?username=...&password=...
        |
        v
Express app.get('/', passport.authenticate('local'), handler)
        |
        v
Passport localStrategy(uname, pwd, done)
        |
        v
MongoDB: Person.findOne({ username: uname })
        |
        v
done(null, user) or done(null, false, { message })
        |
        v
If authenticated: handler runs
Else: 401 Unauthorized

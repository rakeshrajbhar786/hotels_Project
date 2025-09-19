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

# Hashed Function by adding salt in plain text
      Person.save() or update
    |
    v
personSchema.pre('save') middleware
    |
    v
Check if password is modified
    |
    v
Generate salt -> Hash password -> Store hashed password
    |
    v
Save to MongoDB

Authentication:
    |
    v
user.comparePassword(loginPassword)
    |
    v
bcrypt.compare(loginPassword, storedHashedPassword)
    |
    v
true/false (authentication result)

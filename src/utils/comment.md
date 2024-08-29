# ENCRYPTION

# hashInput

toString() is used so that PINs could be hashed too.

# HELPERS

# adminId

generate a new adminId and update it in the database

# generateOtp

generate a 6 digits OTP that expires after one hour

# generateJwt

generate a JWT with random code and invidual id as the payload.
the code is random because it will changed on each request for security reasons
the JWT is valid for 100 days
the expiry time is for for checking the expiration of the token from what is on the DB and cron job to delete tokens that have expired

# expiryTime

expire the OTP by reducing the time by 24 hours

# JWT

# authUser

decode jwt and get the adminId
query the JWT table in db with the adminId
check the JWT from the request header matches what is on the database
check if user is blocked
check if JWT has expired. if it has expired, delete the token and return and empty token as response
if successful, update the token expiry time by 100 days

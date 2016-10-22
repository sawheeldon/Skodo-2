exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                       (process.env.NODE_ENV === 'production' ?
                            'mongodb://<dbuser>:<dbpassword>@ds063406.mlab.com:63406/heroku_gdw46k4r' :
                            'mongodb://<dbuser>:<dbpassword>@ds063406.mlab.com:63406/heroku_gdw46k4r');
exports.PORT = process.env.PORT || 5000;

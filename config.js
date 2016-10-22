exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                       (process.env.NODE_ENV === 'production' ?
                            'mongodb://heroku_gdw46k4r:pevh8mhud5jk9odkq52u4m48u4@ds063406.mlab.com:63406/heroku_gdw46k4r' :
                            'mongodb://heroku_gdw46k4r:pevh8mhud5jk9odkq52u4m48u4@ds063406.mlab.com:63406/heroku_gdw46k4r');
exports.PORT = process.env.PORT || 5000;

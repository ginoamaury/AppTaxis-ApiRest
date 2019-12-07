module.exports ={
    port: process.env.PORT || 3000,
    db: process.env.MONGODB || 'mongodb://heroku_6tjjgp0n:4euvcoteliks4j7equ288ehg65@ds335678.mlab.com:35678/heroku_6tjjgp0n',
    //db: process.env.MONGODB || 'mongodb://localhost:27017/Taxis',
    SECRET_TOKEN : 'AppTaxis'
}

const path = require('path');
const express = require('express');
const session = require('express-session');
const pug = require('pug');

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require("./config/connection");
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'Congenial Waffle',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));


const loginRoute = require('./routes/loginRoutes');
const registerRoute = require('./routes/registerRoutes');

app.set('view engine', 'pug');
app.set('views', 'views');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/login', loginRoute);
app.use('/register', registerRoute);


app.get('/', (req, res) => {
    res.status(200).render('login');
})

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
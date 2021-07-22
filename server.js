const path = require('path');
const express = require('express');
const session = require('express-session');
const pug = require('pug');
const middleware = require('./middleware');
const withAuth = require('./utils/auth');
const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require("./config/connection");
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'Congenial Waffle',
  // cookie: {},
  resave: true,
  saveUninitialized: false,
  // store: new SequelizeStore({
  //   db: sequelize
  // })
};

app.use(session(sess));

// Routes
const loginRoute = require('./routes/loginRoutes');
const registerRoute = require('./routes/registerRoutes');

// API routes
const postRouteApi = require('./routes/api/postRoutes');

app.set('view engine', 'pug');
app.set('views', 'views');

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(express.static(path.join(__dirname, '/public')));


app.use('/login', loginRoute);
app.use('/register', registerRoute);

app.use('/api/postRoutes', postRouteApi);



app.get('/', middleware.requireLogin, (req, res, next) => {

  var payload = {
    pageTitle: "Top 5",
    userLoggedIn: req.session.user,
    userLoggedInJs: JSON.stringify(req.session.user),
  }

  res.status(200).render('home', payload);
})

sequelize.sync({
  force: false
}).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
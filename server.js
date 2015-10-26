var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
var methodOverride = require('method-override');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('vitals.db');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

app.use('/js', express.static(__dirname + '/client/js'));
app.use('/partials', express.static(__dirname + '/client/partials'));
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(bodyParser());
app.use(cookieParser());
// __________________PASSPORT_____________________
app.use(session({ secret: 'hello',
									resave: false,
									saveUninitialized: false
								}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(function(name, password, done){
	console.log("IN HERE " + name)
	db.all('SELECT * FROM users WHERE name=?', name, function(err, table){
		if(table[0]){
			if(table[0].name === name && table[0].password === password){
				done(null, {user: table});
			}else{
				done(null, false);
			}
		}else{
			done(null, false);
		}
	});
}));

passport.serializeUser(function(user, done){
	done(null, user);
});

passport.deserializeUser(function(user, done){
	done(null, user);
});


// __________________PASSPORT_____________________

var loginCheck = function(req, res){
	if(req.session.passport.user === undefined){
		console.log('NOT LOGGED IN');
		res.redirect('/');
	}
}



app.get('/', function(req, res){
	res.redirect('/login')
});



app.get('/login', function(req, res){
	res.sendFile(__dirname + '/client/views/login.html')
});



app.post('/login', passport.authenticate('local', {
	failureRedirect: '/accessfailed',
	successRedirect: '/home'
}));



app.post('/signup', function(req, res){
	var name = req.body.username;
	var password = req.body.password;

	db.all('SELECT * FROM users', function(err, rows){
		for(var i = 0; i < rows.length; i++){
			if(rows[i] === name){
				res.redirect('/login');
				return
			}
		};
		db.run('INSERT INTO users (name, password) VALUES (?, ?)', name, password, function(err){
			if(err){
				throw err;
			}
		});
	});
	res.redirect('/login')
});



app.get('/home', function(req, res){
	res.sendFile(__dirname + '/client/main.html')
});


























app.listen(3000, function(){
	console.log("I'm liistening...");
});
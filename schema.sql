DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS pressure;
DROP TABLE IF EXISTS glucose;

CREATE TABLE users (
	user_id INTEGER PRIMARY KEY autoincrement, 
	name TEXT,
	password VARCHAR
);

CREATE TABLE pressure (
	pressure_id INTEGER PRIMARY KEY autoincrement,
	systolic INTEGER,
	diastolic INTEGER,
	user_idp INTEGER,
	time INTEGER,
	filter TEXT,
	FOREIGN KEY(user_idp) REFERENCES users(users_id)
);

CREATE TABLE glucose (
	glucose_id INTEGER PRIMARY KEY autoincrement,
	level INTEGER,
	user_idg INTEGER,
	time INTEGER,
	filter TEXT,
	FOREIGN KEY(user_idg) REFERENCES users(users_id)
);
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS records;

CREATE TABLE user (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  full_name TEXT NOT NULL
);

CREATE TABLE records (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  owner_id INTEGER NOT NULL,
  activity_type TEXT NOT NULL,
  f_name TEXT NOT NULL,
  FOREIGN KEY (owner_id) REFERENCES user (id)
);

INSERT INTO user VALUES (1, "CMR", "1234", "User 1");
INSERT INTO user VALUES (2, "MM", "1234", "User 2");

INSERT INTO records VALUES (1, 1, "Reading", "CMR_0301_1705.csv");
INSERT INTO records VALUES (2, 1, "Math", "CMR_0301_1735.csv");
INSERT INTO records VALUES (3, 1, "Reading", "CMR_0301_1705.csv");
INSERT INTO records VALUES (4, 1, "Math", "CMR_0302_1705.csv");

INSERT INTO records VALUES (5, 2, "Math", "MM_0305_1008.csv");
INSERT INTO records VALUES (6, 2, "Reading", "MM_0305_1502.csv");
INSERT INTO records VALUES (7, 2, "Math", "MM_0305_1941.csv");
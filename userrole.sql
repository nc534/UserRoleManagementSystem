CREATE TABLE if not exists user(
  id bigint NOT NULL AUTO_INCREMENT,
  first_name varchar(25) not null,
  last_name varchar(25) not null,
  email varchar(25) UNIQUE NOT NULL,
  password varchar(25) NOT NULL,
  role varchar(25) not null,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO user (first_name, last_name, email, password, role)
	VALUES ('John', 'Smith', 'js@email.com', 'P@ssW0rd', 'admin');
INSERT INTO user (first_name, last_name, email, password, role)
	VALUES ('Mary', 'Jones', 'mj@email.com', 'P@ssW0rd', 'user');
INSERT INTO user (first_name, last_name, email, password, role)
	VALUES ('Mary', 'Jane', 'mjane@email.com', 'P@ssW0rd', 'user');

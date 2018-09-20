drop table if exists week_days CASCADE;
create table week_days(
	id serial not null primary key,
	week_day text not null
);

drop table if exists waiters;
create table waiters(
	id serial not null primary key,
    waiter_name text not null UNIQUE
    
);
drop table if exists shifts;
create table shifts(
	id serial not null primary key,
	waiter_id int not null,
	week_day_id int not null,
	foreign key (waiter_id) references waiters(id),
	foreign key (week_day_id) references week_days(id)
);


-- Add the locations as well as week_days
INSERT INTO week_days (week_day) VALUES ('Sunday');
INSERT INTO week_days (week_day) VALUES ('Monday');
INSERT INTO week_days (week_day) VALUES ('Tuesday');
INSERT INTO week_days (week_day) VALUES ('Wednesday');
INSERT INTO week_days (week_day) VALUES ('Thursday');
INSERT INTO week_days (week_day) VALUES ('Friday');
INSERT INTO week_days (week_day) VALUES ('Saturday');






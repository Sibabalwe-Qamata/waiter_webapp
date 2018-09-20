drop table if exists towns CASCADE;
create table towns(
	id serial not null primary key,
	town text not null,
	location_indicator text not null
);

drop table if exists reg_numbers;
create table reg_numbers(
	id serial not null primary key,
    reg_number text not null UNIQUE,
	town_id int not null,
    foreign key (town_id) references towns(id)
	
);


-- Add the locations as well as towns
INSERT INTO towns (town, location_indicator) VALUES ('Cape Town', 'CA');
INSERT INTO towns (town, location_indicator) VALUES ('Caledon & Kleinmond', 'CAM');
INSERT INTO towns (town, location_indicator) VALUES ('Clanwilliam & Lamberts Bay', 'CAR');
INSERT INTO towns (town, location_indicator) VALUES ('George', 'CAW');

INSERT INTO towns (town, location_indicator) VALUES ('Stellenbosch', 'CL');
INSERT INTO towns (town, location_indicator) VALUES ('Wellington', 'CN');
INSERT INTO towns (town, location_indicator) VALUES ('Worcester', 'CW');
INSERT INTO towns (town, location_indicator) VALUES ('Bellville, Durbanville & Kraaifontein', 'CY');
INSERT INTO towns (town, location_indicator) VALUES ('Beaufort West', 'CZ');
INSERT INTO towns (town, location_indicator) VALUES ('Paarl', 'CJ');




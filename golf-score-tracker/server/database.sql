CREATE DATABASE golf_score_tracker;

CREATE TABLE course (
    id SERIAL PRIMARY KEY,
    course_name VARCHAR(100),
    course_rating NUMERIC,
    slope_rating INTEGER,
    h1 INTEGER,
    h2 INTEGER,
    h3 INTEGER,
    h4 INTEGER,
    h5 INTEGER,
    h6 INTEGER,
    h7 INTEGER,
    h8 INTEGER,
    h9 INTEGER,
    h10 INTEGER,
    h11 INTEGER,
    h12 INTEGER,
    h13 INTEGER,
    h14 INTEGER,
    h15 INTEGER,
    h16 INTEGER,
    h17 INTEGER,
    h18 INTEGER,
    total INTEGER
);

CREATE TABLE score_card (
    id SERIAL PRIMARY KEY,
    player_name VARCHAR(100),
    course_name VARCHAR(100),
    game_date DATE NOT NULL DEFAULT CURRENT_DATE,
    h1 INTEGER,
    h2 INTEGER,
    h3 INTEGER,
    h4 INTEGER,
    h5 INTEGER,
    h6 INTEGER,
    h7 INTEGER,
    h8 INTEGER,
    h9 INTEGER,
    h10 INTEGER,
    h11 INTEGER,
    h12 INTEGER,
    h13 INTEGER,
    h14 INTEGER,
    h15 INTEGER,
    h16 INTEGER,
    h17 INTEGER,
    h18 INTEGER,
    total INTEGER
);

CREATE TABLE putt_card (
    id SERIAL PRIMARY KEY,
    player_name VARCHAR(100),
    course_name VARCHAR(100),
    game_date DATE NOT NULL DEFAULT CURRENT_DATE,
    p1 INTEGER,
    p2 INTEGER,
    p3 INTEGER,
    p4 INTEGER,
    p5 INTEGER,
    p6 INTEGER,
    p7 INTEGER,
    p8 INTEGER,
    p9 INTEGER,
    p10 INTEGER,
    p11 INTEGER,
    p12 INTEGER,
    p13 INTEGER,
    p14 INTEGER,
    p15 INTEGER,
    p16 INTEGER,
    p17 INTEGER,
    p18 INTEGER,
    putt_total INTEGER
);
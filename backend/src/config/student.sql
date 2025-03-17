CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS students;

CREATE TABLE students (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    email VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    rut VARCHAR(20),
    birthdate DATE,
    sex VARCHAR(10),
    address TEXT,
    nationality VARCHAR(100),
    source VARCHAR(50),
    contact TEXT,
    phone BIGINT NOT NULL,
    contactDate TIMESTAMP,
    call1 JSONB,
    call2 JSONB,
    call3 JSONB,
    positiveFeedback BOOLEAN,
    linkDni TEXT,
    school INT,
    course INT,
    communicationPreference VARCHAR(50),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
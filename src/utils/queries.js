export const createAgentTable = `
DROP TABLE IF EXISTS agents;
CREATE TABLE "agents" (
  "id" serial primary key,
  "first_name" varchar(255) NOT NULL,
  "last_name" varchar(255) NOT NULL,
  "email" varchar(255) UNIQUE NOT NULL,
  "password" varchar(255) NOT NULL,
  "phone_no" integer NOT NULL
);
`;

export const createPropertyTable = `
DROP TABLE IF EXISTS properties;
CREATE TABLE "properties" (
  "id" serial primary key,
  "agent_id" integer REFERENCES agents(id),
  "image_url" varchar NOT NULL,
  "title" varchar(255) NOT NULL,
  "address" varchar(255) NOT NULL,
  "land_area" varchar NOT NULL,
  "no_of_rooms" varchar NOT NULL,
  "no_of_bathrooms" varchar NOT NULL,
  "no_of_garage" varchar NOT NULL,
  "no_of_store" varchar NOT NULL,
  "year_of_build" varchar NOT NULL,
  "price" varchar NOT NULL,
  "purpose" varchar NOT NULL,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

export const dropAgentTable = 'DROP TABLE agents';
export const dropPropertyTable = 'DROP TABLE properties';

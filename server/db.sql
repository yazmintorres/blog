--
-- PostgreSQL database dump
--

-- Dumped from database version 13.3
-- Dumped by pg_dump version 14.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: students; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.students (
    id integer NOT NULL,
    firstname character varying(255),
    lastname character varying(255),
    is_current boolean
);


ALTER TABLE public.students OWNER TO postgres;

--
-- Name: students_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.students_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.students_id_seq OWNER TO postgres;

--
-- Name: students_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.students_id_seq OWNED BY public.students.id;


--
-- Name: students id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students ALTER COLUMN id SET DEFAULT nextval('public.students_id_seq'::regclass);


--
-- Data for Name: students; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.students (id, firstname, lastname, is_current) FROM stdin;
1	Jane	Doe	f
2	Ammelie	France	t
3	Zide	Grey	t
12	Cristina	Gomez	f
4	Lisa	Simpson	t
15	Arepa	Rodriguez	\N
\.


--
-- Name: students_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.students_id_seq', 16, true);


--
-- Name: students students_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

-- FROM TEMPLATE CREATE CONTACTS 

CREATE TABLE public.contacts (
	contact_id serial PRIMARY KEY,
	firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR (255) NOT NULL,
	phone VARCHAR(25) NOT NULL,
	email VARCHAR(255) NOT NULL,
    notes TEXT
);

-- CREATE USERS TABLE 

CREATE TABLE public.users (
	id serial PRIMARY KEY,
	username VARCHAR(45) NOT NULL,
	email VARCHAR(255) NOT NULL,
    password VARCHAR (255) NOT NULL
);

INSERT INTO public.users(username, email, password) VALUES ('yazmin','test@test.com','password');

-- CREATE POSTS TABLE 

CREATE TABLE public.posts (
	id serial PRIMARY KEY,
    title VARCHAR(255) NOT NULL, 
    body VARCHAR(1000) NOT NULL,
    img VARCHAR(255),
    date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    uid INT,
    CONSTRAINT fk_uid
        FOREIGN KEY (uid) 
            REFERENCES public.users(id)
            ON DELETE CASCADE
            ON UPDATE CASCADE
);

INSERT INTO public.posts(title, body, img, uid) VALUES ('About Me', 'Hi everyone, in this post I plan to give a little background about myself. I hope some of you can relate! 
1. Born and raised in the Bay Area 
2. Proud Mexican-American 
3. Graduated from Santa Clara University with a BS in Biochemistry
4. I worked for a year and a half as a Research Assistant at Genentech! That was lots of fun! 
5. I am now trying to break into tech as a Software Engineer. Hello working remotely and (hopefully) better pay! 
6.  My hobbies include listening to the podcast We Can Do Hard Things, working out, reading books and watching movies!',
'https://s3-us-west-2.amazonaws.com/anchor-generated-image-bank/production/podcast_uploaded400/15025178/15025178-1620963269208-aa9865c47f259.jpg', 12);

INSERT INTO public.posts(title, body, img, uid, cat) VALUES ('What I''ve Learned So Far', 'React.js, HTML/CSS, Node.js, Postgres, Express',
'https://miro.medium.com/v2/resize:fit:786/format:webp/1*On7Uc_X23Cn-7QZS0dNEfQ.jpeg', 12, 'webdev');



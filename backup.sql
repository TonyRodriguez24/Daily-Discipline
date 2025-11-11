--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
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
-- Name: daily_logs; Type: TABLE; Schema: public; Owner: TonyR
--

CREATE TABLE public.daily_logs (
    id integer NOT NULL,
    user_id integer NOT NULL,
    date date NOT NULL,
    did_workout boolean DEFAULT false,
    sleep_hours double precision,
    github_commits integer,
    screen_time double precision,
    weight numeric
);


ALTER TABLE public.daily_logs OWNER TO "TonyR";

--
-- Name: daily_logs_id_seq; Type: SEQUENCE; Schema: public; Owner: TonyR
--

CREATE SEQUENCE public.daily_logs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.daily_logs_id_seq OWNER TO "TonyR";

--
-- Name: daily_logs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: TonyR
--

ALTER SEQUENCE public.daily_logs_id_seq OWNED BY public.daily_logs.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: TonyR
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username text NOT NULL,
    password text NOT NULL
);


ALTER TABLE public.users OWNER TO "TonyR";

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: TonyR
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO "TonyR";

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: TonyR
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: daily_logs id; Type: DEFAULT; Schema: public; Owner: TonyR
--

ALTER TABLE ONLY public.daily_logs ALTER COLUMN id SET DEFAULT nextval('public.daily_logs_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: TonyR
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: daily_logs; Type: TABLE DATA; Schema: public; Owner: TonyR
--

COPY public.daily_logs (id, user_id, date, did_workout, sleep_hours, github_commits, screen_time, weight) FROM stdin;
1	1	2025-05-29	t	7.5	2	4.3	\N
3	1	2025-06-03	t	7.5	1	5.5	250
5	1	2025-06-04	t	8	3	6	240
6	1	2025-06-05	f	8.5	3	5.5	250
16	1	2025-10-30	t	6	1	5.5	2319
19	1	2025-10-05	f	5	0	5	\N
20	1	2025-09-05	t	9	3	6	233.33
32	1	2025-11-13	f	7	0	5	300
37	1	2025-11-27	t	9.5	5	6.5	32323232
43	1	2025-11-11	f	8	3	6	6
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: TonyR
--

COPY public.users (id, username, password) FROM stdin;
1	tony	$2b$12$l/DypoSOqySrg46mGuLs1..Ab8x1dB84ZVxDKLlKuplTZdyJ102dy
\.


--
-- Name: daily_logs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: TonyR
--

SELECT pg_catalog.setval('public.daily_logs_id_seq', 43, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: TonyR
--

SELECT pg_catalog.setval('public.users_id_seq', 4, true);


--
-- Name: daily_logs daily_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: TonyR
--

ALTER TABLE ONLY public.daily_logs
    ADD CONSTRAINT daily_logs_pkey PRIMARY KEY (id);


--
-- Name: daily_logs daily_logs_user_id_date_key; Type: CONSTRAINT; Schema: public; Owner: TonyR
--

ALTER TABLE ONLY public.daily_logs
    ADD CONSTRAINT daily_logs_user_id_date_key UNIQUE (user_id, date);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: TonyR
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: TonyR
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: daily_logs daily_logs_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: TonyR
--

ALTER TABLE ONLY public.daily_logs
    ADD CONSTRAINT daily_logs_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--


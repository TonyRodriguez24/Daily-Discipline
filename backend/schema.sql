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


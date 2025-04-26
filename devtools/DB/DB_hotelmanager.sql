--
-- PostgreSQL database dump
--

-- Dumped from database version 14.17 (Ubuntu 14.17-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.17 (Ubuntu 14.17-0ubuntu0.22.04.1)

-- Started on 2025-04-26 17:04:13 CEST

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
-- TOC entry 209 (class 1259 OID 24902)
-- Name: hotel_rooms; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.hotel_rooms (
    has_minibar boolean NOT NULL,
    is_available boolean DEFAULT true NOT NULL,
    room_number integer NOT NULL,
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    room_type character varying(255) NOT NULL,
    CONSTRAINT hotel_rooms_room_type_check CHECK (((room_type)::text = ANY ((ARRAY['SINGLE'::character varying, 'DOUBLE'::character varying, 'SUITE'::character varying])::text[])))
);


ALTER TABLE public.hotel_rooms OWNER TO postgres;

--
-- TOC entry 3403 (class 0 OID 24902)
-- Dependencies: 209
-- Data for Name: hotel_rooms; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.hotel_rooms (has_minibar, is_available, room_number, created_at, updated_at, room_type) FROM stdin;
t	t	101	2025-04-26 16:40:20.59811	2025-04-26 16:40:20.598163	DOUBLE
t	t	202	2025-04-26 16:40:20.610599	2025-04-26 16:40:20.610631	SINGLE
f	t	303	2025-04-26 16:40:20.61567	2025-04-26 16:40:20.615697	SUITE
\.


--
-- TOC entry 3263 (class 2606 OID 24908)
-- Name: hotel_rooms hotel_rooms_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hotel_rooms
    ADD CONSTRAINT hotel_rooms_pkey PRIMARY KEY (room_number);


-- Completed on 2025-04-26 17:04:13 CEST

--
-- PostgreSQL database dump complete
--


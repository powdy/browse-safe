--
-- PostgreSQL database dump
--

-- Dumped from database version 16.8
-- Dumped by pg_dump version 16.5

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
-- Name: reports; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.reports (
    id integer NOT NULL,
    url text NOT NULL,
    reason text NOT NULL,
    details text,
    reported_at timestamp without time zone NOT NULL,
    reported_by text,
    status text NOT NULL
);


ALTER TABLE public.reports OWNER TO neondb_owner;

--
-- Name: reports_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.reports_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.reports_id_seq OWNER TO neondb_owner;

--
-- Name: reports_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.reports_id_seq OWNED BY public.reports.id;


--
-- Name: scans; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.scans (
    id integer NOT NULL,
    url text NOT NULL,
    trust_score integer NOT NULL,
    domain_age text,
    registration_date text,
    expiration_date text,
    registrar text,
    registrant_country text,
    ip_address text,
    ip_location text,
    name_servers text,
    has_valid_ssl boolean,
    has_dnssec boolean,
    has_security_headers boolean,
    has_malware boolean,
    has_phishing boolean,
    blacklist_status text,
    suspicious_patterns text,
    user_reports integer,
    related_sites integer,
    last_scanned timestamp without time zone NOT NULL,
    status text NOT NULL,
    details jsonb
);


ALTER TABLE public.scans OWNER TO neondb_owner;

--
-- Name: scans_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.scans_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.scans_id_seq OWNER TO neondb_owner;

--
-- Name: scans_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.scans_id_seq OWNED BY public.scans.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username text NOT NULL,
    password text NOT NULL
);


ALTER TABLE public.users OWNER TO neondb_owner;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO neondb_owner;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: reports id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.reports ALTER COLUMN id SET DEFAULT nextval('public.reports_id_seq'::regclass);


--
-- Name: scans id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.scans ALTER COLUMN id SET DEFAULT nextval('public.scans_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: reports; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.reports (id, url, reason, details, reported_at, reported_by, status) FROM stdin;
\.


--
-- Data for Name: scans; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.scans (id, url, trust_score, domain_age, registration_date, expiration_date, registrar, registrant_country, ip_address, ip_location, name_servers, has_valid_ssl, has_dnssec, has_security_headers, has_malware, has_phishing, blacklist_status, suspicious_patterns, user_reports, related_sites, last_scanned, status, details) FROM stdin;
17	amazon.com	98	27 years, 5 months	1995-05-15	2028-05-15	Amazon Registrar, Inc.	United States	176.32.103.205	United States	ns1.amazon.com, ns2.amazon.com	t	t	t	f	f	Not blacklisted	None	0	0	2025-05-07 15:01:23.031	safe	{}
18	paypal-secure-login.com	12	2 days	2023-08-08	2024-08-08	NameCheap Inc.	Panama	185.224.138.29	Netherlands	ns1.namecheap.com, ns2.namecheap.com	f	f	f	t	t	Blacklisted on 12 services	Brand impersonation	28	5	2025-05-07 15:01:23.031	dangerous	{}
19	ebay.com	96	25 years, 8 months	1995-09-12	2026-09-12	CSC Corporate Domains, Inc.	United States	66.135.202.236	United States	ns1.ebay.com, ns2.ebay.com	t	t	t	f	f	Not blacklisted	None	0	0	2025-05-06 15:01:23.031	safe	{}
20	google.com	85	27 years, 7 months	September 15, 1997	September 14, 2028	MarkMonitor Inc.	Unknown	173.194.202.102	US	NS1.GOOGLE.COM, NS2.GOOGLE.COM, NS3.GOOGLE.COM, NS4.GOOGLE.COM	t	f	t	f	f	Not blacklisted	None	0	0	2025-05-07 15:02:14.994	safe	"{\\"whoisData\\":{\\"domainName\\":\\"google.com\\",\\"registrar\\":\\"MarkMonitor Inc.\\",\\"creationDate\\":\\"1997-09-15T04:00:00Z\\",\\"domainAge\\":\\"27 years, 7 months\\",\\"expirationDate\\":\\"2028-09-14T04:00:00Z\\",\\"nameServers\\":[\\"NS1.GOOGLE.COM\\",\\"NS2.GOOGLE.COM\\",\\"NS3.GOOGLE.COM\\",\\"NS4.GOOGLE.COM\\"]},\\"domainInfo\\":{\\"ipAddresses\\":[\\"173.194.202.102\\",\\"173.194.202.100\\",\\"173.194.202.113\\",\\"173.194.202.139\\",\\"173.194.202.101\\",\\"173.194.202.138\\"],\\"nameservers\\":[\\"ns3.google.com\\",\\"ns1.google.com\\",\\"ns4.google.com\\",\\"ns2.google.com\\"],\\"mxRecords\\":[{\\"exchange\\":\\"smtp.google.com\\",\\"priority\\":10}],\\"txtRecords\\":[[\\"docusign=05958488-4752-4ef2-95eb-aa7ba8a3bd0e\\"],[\\"globalsign-smime-dv=CDYX+XFHUw2wml6/Gb8+59BsH31KzUr6c1l2BPvqKX8=\\"],[\\"docusign=1b0a6754-49b1-4db5-8540-d2c12664b289\\"],[\\"onetrust-domain-verification=de01ed21f2fa4d8781cbc3ffb89cf4ef\\"],[\\"apple-domain-verification=30afIBcvSuDV2PLX\\"],[\\"google-site-verification=4ibFUgB-wXLQ_S7vsXVomSTVamuOXBiVAzpR5IZ87D0\\"],[\\"google-site-verification=TV9-DBe4R80X4v0M4U_bd_J9cpOJM0nikft0jAgjmsQ\\"],[\\"cisco-ci-domain-verification=479146de172eb01ddee38b1a455ab9e8bb51542ddd7f1fa298557dfa7b22d963\\"],[\\"v=spf1 include:_spf.google.com ~all\\"],[\\"google-site-verification=wD8N7i1JTNTkezJ49swvWW48f8_9xveREV4oB-0Hf5o\\"],[\\"MS=E4A68B9AB2BB9670BCE15412F62916164C0B20BB\\"],[\\"facebook-domain-verification=22rm551cu4k0ab0bxsw536tlds4h95\\"]],\\"reverseDns\\":{\\"173.194.202.102\\":[\\"pf-in-f102.1e100.net\\"],\\"173.194.202.100\\":[\\"pf-in-f100.1e100.net\\"],\\"173.194.202.113\\":[\\"pf-in-f113.1e100.net\\"],\\"173.194.202.139\\":[\\"pf-in-f139.1e100.net\\"],\\"173.194.202.101\\":[\\"pf-in-f101.1e100.net\\"],\\"173.194.202.138\\":[\\"pf-in-f138.1e100.net\\"]},\\"hasDNSSEC\\":false},\\"ipInfo\\":{\\"ip\\":\\"173.194.202.102\\",\\"hostname\\":[\\"pf-in-f102.1e100.net\\"],\\"country\\":\\"US\\",\\"isp\\":\\"Google LLC\\",\\"isProxy\\":false,\\"isTor\\":false,\\"isHosting\\":false,\\"blacklisted\\":false,\\"abuseReports\\":0},\\"blacklistResult\\":{\\"isBlacklisted\\":false,\\"blacklistedOn\\":[],\\"hasMalware\\":false,\\"hasPhishing\\":false,\\"suspiciousContent\\":false,\\"score\\":100}}"
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.users (id, username, password) FROM stdin;
\.


--
-- Name: reports_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.reports_id_seq', 3, true);


--
-- Name: scans_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.scans_id_seq', 20, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.users_id_seq', 1, false);


--
-- Name: reports reports_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.reports
    ADD CONSTRAINT reports_pkey PRIMARY KEY (id);


--
-- Name: scans scans_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.scans
    ADD CONSTRAINT scans_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_unique; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_unique UNIQUE (username);


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO neon_superuser WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON TABLES TO neon_superuser WITH GRANT OPTION;


--
-- PostgreSQL database dump complete
--


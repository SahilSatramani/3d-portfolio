# Sahil Satramani — Professional Knowledge Base

## Personal Summary
Name: Sahil Satramani
Email: sahilsatramani5@gmail.com
LinkedIn: https://www.linkedin.com/in/sahilsatramani/
GitHub: https://github.com/SahilSatramani
Location: Boston, MA
Currently: M.S. Information Systems at Northeastern University (Expected May 2026)
Looking for: Full-time Software Engineering / AI Engineering roles

## About Me
I'm a backend and AI engineer with 3 years of industry experience building systems that replace manual, fragmented processes with automated, event-driven platforms. At LTIMindtree I worked across the full stack — FastAPI microservices, async task queues, caching layers, CI/CD pipelines, React dashboards — always owning the problem end-to-end rather than just a slice of it. At Northeastern I've gone deep on the AI engineering side: multi-agent orchestration with LangGraph, production RAG systems with hybrid retrieval, agentic workflows with MCP and Airflow, and document intelligence pipelines over SEC filings and financial data. I care about the decisions that actually determine whether something works at scale — how you structure a cache, how you chunk for retrieval, how you design a workflow so it doesn't break when reality hits it. I'm looking for roles where the backend is non-trivial and the AI layer is more than a wrapper around an API call.

---

## Work Experience

### Senior Software Engineer — LTIMindtree (Jul 2023 – Jun 2024)

- **What I built:**
  - A unified employee onboarding platform from scratch, replacing 5+ disconnected portals that were sending new hires emails from separate systems with no coordination or timeline
  - A structured lifecycle flow covering Day 1 (documents, ID upload, profile), Week 1 (manager assignment, buddy assignment, IT laptop request, mandatory training enrollment), Week 2 (incomplete task follow-ups, training visibility for managers), and Survey/Close (auto-triggered completion survey)
  - Geo-specific task routing for employees hired across LTAM, EMEA, and the US — each region got a different task set, timeline, and compliance rules driven by a config layer, not hardcoded logic
  - An integration with Shoshin (a standalone third-party training platform) so that when the onboarding workflow reached the Week 1 training milestone, the system automatically registered the employee on Shoshin and pushed mandatory training assignments; managers got a live training completion view without logging into Shoshin directly
  - An integration with SAP HR so that once onboarding completed and a unique employee number was generated, the system automatically created the SAP employee record via a post-completion hook with retry logic — previously this trigger was scattered across a disconnected part of the codebase
  - A FastAPI + Redis caching gateway between all onboarding microservices and SAP HR, so services read employee data from cache rather than hitting SAP independently — with contextual TTLs (short for dynamic fields like task status, longer for stable fields like name and location) and explicit cache busting on critical lifecycle events
  - A React + Next.js HR analytics dashboard with cursor-based paginated APIs, memoized components (React.memo, useMemo, useCallback), and shared filter context — enabling real-time filtering across LTAM, EMEA, and US cohorts without any additional API calls
  - A GitHub Actions CI/CD pipeline with parallelized test jobs (unit, integration, linting running simultaneously via matrix strategy) and multi-stage Dockerfiles for each microservice — automated build, push, and rolling deployment on every merge to main

- **Technologies used:**
  - Backend: FastAPI, Python, Celery, Redis (task broker + caching), SAP HR API, Shoshin API
  - Frontend: React.js, Next.js, TypeScript
  - DevOps: Docker, GitHub Actions, CI/CD
  - Databases: PostgreSQL, Redis

- **Impact / Results:**
  - Reduced candidate/employee processing time by 60% — from 4 days to 18 hours — across 10,000+ monthly applications
  - Cut HR dashboard load time by 70% — from 8 seconds to 2.5 seconds — enabling real-time filtering with no re-renders
  - Reduced cross-system sync latency between onboarding platform and SAP HR by 80% — from 15 minutes to 3 minutes
  - Cut redundant SAP API calls by 65%
  - Reduced deployment time by 75% — from 40 minutes to 10 minutes — enabling daily production releases

- **Biggest challenges solved:**
  - Fragmented onboarding: 5+ disconnected portals with no orchestration → replaced with a single event-driven microservice platform with a clear lifecycle
  - Sequential processing bottleneck: tasks firing one after another → Celery + Redis async queue dispatching tasks in parallel, which is the core reason for the 60% time reduction
  - SAP overload: every microservice independently calling SAP HR → Redis caching gateway collapsed redundant calls into a single upstream fetch per TTL window
  - Slow dashboard: synchronous bulk API fetch on every load → cursor-based pagination + client-side memoized filtering
  - Manual deployments: sequential 40-minute pipeline → parallelized GitHub Actions matrix jobs with Dockerized services

---

### Software Engineer — LTIMindtree (Jul 2021 – Jun 2023)

- **What I built:**
  - An alumni engagement portal for LTIMindtree's ex-employees, replacing a process where alumni had to physically visit the office or email HR to get any document (F&F settlements, payslips, employment verification letters etc.)
  - A document request and delivery system: event-driven AWS Lambda functions that classified incoming requests — commonly needed documents were delivered instantly via pre-signed S3 URLs; documents requiring retrieval were routed to the appropriate HR queue with all context pre-filled, eliminating the back-and-forth email chain
  - An integration with the company's main website so that internal news and company updates appeared as a card layout feed inside the alumni portal dashboard
  - A rejoin workflow that automated the entire manual HR verification process for ex-employee rehiring — when a rejoin request came in, a Lambda function automatically fetched the ex-employee's historical record from SuccessFactors (previous designation, last drawn salary, termination reason code), evaluated the termination reason against a defined misconduct ruleset, and either auto-cleared the case for HR review or flagged it with a specific block reason; HR received a pre-populated, decision-ready case instead of raw data to manually hunt down
  - An integration layer for legacy employee records that predated SuccessFactors — called when SuccessFactors returned incomplete data for long-tenured ex-employees, ensuring no rejoin case was blocked due to missing historical data
  - A React + TypeScript (Next.js-based) analytics dashboard backed by paginated REST APIs, replacing manually compiled weekly Excel reports — gave HR managers and senior leadership a live view of rejoin rates, approval breakdowns by department and region, document request volumes, and trend lines, all filterable in real time
  - A zero-downtime database migration of 50,000+ records from the legacy system into MongoDB using a phased dual-write strategy — the backend wrote every new operation to both the legacy system and MongoDB simultaneously while the historical backfill ran in batches in the background; after each batch, an automated validation script compared record counts and checksummed key fields to detect any corruption before proceeding; once all records were validated, a config flag switched all reads/writes exclusively to MongoDB

- **Technologies used:**
  - Backend: Node.js, Express.js, AWS Lambda, SuccessFactors API
  - Frontend: React.js, Next.js, TypeScript
  - Cloud: AWS (Lambda, S3, RDS)
  - Databases: MongoDB (replica sets, connection pooling), legacy HR DB
  - Other: REST APIs, event-driven architecture

- **Impact / Results:**
  - Reduced document processing time from 3 days to 4 hours across 300+ annual workflows
  - Eliminated manual HR verification effort for rejoin cases — HR went from manually pulling records across systems to receiving decision-ready pre-populated cases
  - Replaced weekly Excel reporting with sub-second on-demand dashboard access for 3 HR teams and senior leadership
  - Sustained 99.5%+ uptime for 10,000+ users over 18 months with zero unplanned downtime
  - Migrated 50,000+ records to MongoDB with zero downtime and 100% data integrity

- **Biggest challenges solved:**
  - No self-serve document access for alumni → event-driven Lambda pipeline with instant S3 delivery for common docs and auto-routed HR queues for the rest
  - Manual rejoin verification across multiple systems → Lambda + SuccessFactors integration with automated ruleset evaluation, delivering decision-ready cases to HR
  - Stale weekly reporting → live React/Next.js dashboard with paginated APIs and real-time filtering
  - High-risk database migration at scale → phased dual-write with per-batch checksum validation, zero downtime, 100% integrity across 50,000+ records
  - Service reliability → MongoDB replica set failover + Node.js connection pooling for consistent uptime under load

---

## Projects

### Scalable User Management Service (Webapp)
- **What it does:** A production-grade user management service with full CRUD operations and email verification on registration, deployed on AWS with fully automated infrastructure provisioned via Terraform.
- **Why I built it:** To learn and demonstrate end-to-end cloud architecture — not just writing application code but owning the full infrastructure: networking, security, scaling, CI/CD, and event-driven workflows.
- **Technologies:** Node.js, Express.js, PostgreSQL, Sequelize, AWS (EC2 ASG, ALB, RDS, S3, SNS, Lambda, CloudWatch, Secrets Manager, KMS, IAM), Terraform, Hashicorp Packer, GitHub Actions
- **Key technical decisions:**
  - Event-driven email verification via SNS → Lambda → Mailgun, keeping the registration request path synchronous and clean
  - Custom AMI baked with Hashicorp Packer on every push via GitHub Actions, so ASG instances always launch from a pre-configured image with no runtime bootstrap scripts
  - ALB with HTTPS listener (SSL via ACM) in public subnet; RDS isolated in private subnet with its own security group
  - KMS customer-managed encryption for RDS, EC2, S3, and Secrets Manager; RDS password fetched at runtime via IAM role from Secrets Manager, never hardcoded
  - CloudWatch alarms driving ASG scale-in/scale-out
  - Route 53 + GoDaddy for DNS, ACM for SSL termination at the load balancer

---

### ConvoPilot — AI Meeting Intelligence App
- **What it does:** A React Native mobile app that captures, transcribes, and summarizes meeting conversations in real-time, with an AI chat interface to query transcripts post-meeting.
- **Why I built it:** To solve the problem of lost context from meetings — combining real-time transcription, calendar awareness, and location tagging into a single mobile experience.
- **Technologies:** React Native, TypeScript, Firebase Auth, Google Calendar API, OpenAI / Gemini API, SQLite, React Navigation, Google Maps Geocoding API
- **Key technical decisions:**
  - 30-second chunked audio pipeline with async API calls to keep transcription latency under 3 seconds — audio is segmented, preprocessed, and sent without blocking the UI
  - Offline-first architecture using SQLite as the local buffer with background Firebase sync and conflict-free reconciliation — transcripts are never lost in low-connectivity scenarios
  - AI chat and summarization only triggers once the transcript crosses 30 seconds, preventing meaningless responses on very short recordings
  - Calendar context and reverse-geocoded location metadata are attached to each transcript, giving the AI chat interface richer context for post-meeting queries
  - Google Sign-In via Firebase Auth with SHA-1 fingerprint binding for secure OAuth flow on both Android and iOS

---

### Project ORBIT — PE Due Diligence Agentic System
- **What it does:** An automated private equity due diligence system that scrapes, structures, and analyzes data for 50 AI companies, generating investor-style dashboards via a multi-agent LangGraph workflow with human-in-the-loop risk escalation.
- **Why I built it:** To explore production-grade agentic system design — combining LLM extraction, RAG retrieval, multi-agent orchestration, MCP, and Airflow into a single end-to-end pipeline rather than isolated demos.
- **Technologies:** Python, LangChain, LangGraph, OpenAI, Pinecone (vector DB), Apache Airflow, FastAPI, Docker, MCP (Model Context Protocol), Pydantic
- **Key technical decisions:**
  - Three-agent architecture — Supervisor (ReAct reasoning), Planner, and Evaluator — coordinated via a LangGraph StateGraph with 7 nodes and conditional branching; risk-flagged companies pause the graph and route to human approval before proceeding
  - Risk detection layer scans 11 keywords across structured payloads; clean companies auto-approve, risky ones trigger HITL with full ReAct trace attached for the reviewer
  - MCP server exposes 6 HTTP endpoints (tools, resources, prompt templates) so any MCP-compatible client can plug into the pipeline without knowing internal implementation
  - RAG pipeline: raw scraped data goes into Pinecone; dashboard generation pulls structured payloads AND vector search results, giving the LLM both structured and semantic context
  - Three Airflow DAGs — initial load, daily incremental update, and agentic dashboard generation — so the system runs on a schedule without manual triggers
  - Full Docker Compose stack with separate Dockerfiles per service (MCP server, agent, Airflow)
- **Results/impact:** 37/37 tests passing across unit, integration, and workflow branch coverage; 100% reliable dashboard generation pipeline across all 50 companies

---

### MADDIP — Multi-Agent M&A Due Diligence Intelligence Platform
- **What it does:** An AI-powered M&A due diligence platform that ingests SEC filings, news, and financial data for 50+ companies, runs them through a multi-agent analysis pipeline, and delivers structured risk assessments with evidence citations — reducing document review time by 70%.
- **Why I built it:** Traditional M&A due diligence takes 90–120 days and costs $2–5M per deal. The goal was to automate the document-heavy analysis layer using domain-specific agents grounded in real source documents via RAG, making the output explainable rather than a black box.
- **Technologies:** Python, LangChain, LangGraph, Llama 3.1 (8B + 70B), PySpark, Apache Airflow, FastAPI, Pinecone, OpenAI Embeddings (text-embedding-3-large), BM25, Docling, AWS (S3, EMR), Docker, Terraform, GitHub Actions
- **Key technical decisions:**
  - Five specialized agents (Financial, Legal, Operational, Sentiment, Synthesis) each powered by Llama 3.1 8B for cost efficiency, with the final Synthesis Agent using Llama 3.1 70B — smaller models handle domain-specific retrieval, the heavyweight model only runs once for final decision
  - Hybrid dense + sparse retrieval in Pinecone: OpenAI text-embedding-3-large (3072-dim) for semantic similarity combined with BM25 sparse vectors for exact keyword matching — improved retrieval accuracy by 40% over dense-only search
  - PySpark distributed processing pipeline for PDF parsing (Docling), semantic chunking (1000 tokens, 200 overlap), embedding generation, and Pinecone upserts — scalable to EMR for full 50-company runs at ~$7.70 one-time cost
  - Two Airflow DAGs: full ingest (manual/weekly) and daily incremental news ingest running at 6AM UTC — keeps the vector store continuously fresh without re-processing historical filings
  - HITL triggers fire automatically when risk score exceeds 8 or confidence drops below 0.6, preventing high-stakes auto-approvals
  - Pydantic schema validation with risk score bounds (0–10) and confidence thresholds enforced on every agent output before it reaches the synthesis layer
- **Results/impact:** 70% reduction in document review time; 40% improvement in retrieval accuracy over dense-only search; full pipeline cost for 50 companies ~$7.70; live deployed web interface with exportable PDF/JSON reports

---

### AI-Powered PDF Parsing System
- **What it does:** A modular, DVC-managed pipeline for parsing SEC filings and financial PDFs — extracting text, tables, images, layout structure, and rich metadata through multiple parsing approaches including an advanced Docling layer.
- **Why I built it:** SEC filings are dense, inconsistently structured PDFs. The goal was to build a reusable, benchmarkable parsing foundation that downstream RAG systems could depend on for clean, structured document input.
- **Technologies:** Python, Docling, DVC (Data Version Control), PyMuPDF / pdfplumber (text + table extraction), layout detection libraries, JSONL, Markdown
- **Key technical decisions:**
  - Two-tier parsing architecture: a standard tier (text extraction, table extraction, layout detection) and an advanced Docling tier — both run in parallel, outputs stored separately so downstream consumers can choose fidelity vs speed
  - DVC pipeline management with a `dvc.yaml` DAG — each stage is independently reproducible; `dvc repro` reruns only what changed, not the full pipeline
  - Table extraction outputs both structured tables and JSONL format, making them directly consumable by LLM pipelines without additional transformation
  - Layout detection stage produces visualization outputs alongside structured results, useful for debugging parsing failures on complex multi-column filings
  - Word-level bounding boxes extracted alongside text, preserving spatial context for documents where section order matters (e.g. risk factors vs MD&A in a 10-K)
  - Benchmarking and pipeline comparison scripts built in to measure parsing quality across approaches — not just "did it run" but "which parser handles this document type better"

---

### AURELIA — Financial RAG Chatbot (GCP)
- **What it does:** A production-deployed RAG system that answers financial concept queries by retrieving from a hybrid Pinecone index, generating structured concept notes with citations, and falling back to Wikipedia when retrieval confidence is low.
- **Why I built it:** To build a RAG system with production-grade concerns beyond basic retrieval — caching, structured output enforcement, graceful fallbacks, and full GCP deployment with IaC.
- **Technologies:** Python, FastAPI, Streamlit, LangChain, OpenAI (text-embedding-3-large + GPT), Pinecone (hybrid dense + BM25), PostgreSQL (Cloud SQL), Instructor, Pydantic, Apache Airflow (Cloud Composer), Terraform, GitHub Actions, GCP Cloud Run
- **Key technical decisions:**
  - Cache-first request path: FastAPI checks Cloud SQL before making any model or vector DB calls — cache hits eliminate both latency and token cost entirely; a dedicated Airflow Seed DAG pre-warms the cache by calling `/query` for a known concept list on a schedule
  - Hybrid Pinecone retrieval: OpenAI text-embedding-3-large (3072-dim dense) + BM25 sparse vectors for combined semantic and keyword matching
  - Instructor + Pydantic enforces a consistent ConceptNote schema on every LLM response — citations and sources are required fields, not optional additions
  - Wikipedia fallback fires automatically when Pinecone recall is below threshold — users still get an answer, clearly labeled as a fallback, rather than an empty or hallucinated response
  - Two Airflow DAGs on Cloud Composer: Ingest DAG (parse → chunk → hybrid upload to Pinecone) and Seed DAG (cache pre-warm) — both deployed via GitHub Actions syncing to Composer's GCS bucket
  - Full Terraform IaC provisioning Cloud Run services, Cloud SQL, and Composer; GitHub Actions handles image build, push to GCR, and Cloud Run deployment on every merge

---

### Dow 30 Earnings Intelligence Pipeline
- **What it does:** An automated pipeline that discovers investor relations pages for all 30 Dow companies, downloads their latest quarterly earnings documents, parses them with Docling, and uploads structured output to S3 — replacing hours of manual analyst work with a fully orchestrated Airflow DAG.
- **Why I built it:** Earnings documents are scattered across 30 different IR sites with no standard structure. The goal was to build a robust scraper that could handle website heterogeneity at scale and feed clean parsed output into downstream financial analysis pipelines.
- **Technologies:** Python, Selenium, Apache Airflow, Docling, AWS S3, boto3, ProcessPoolExecutor
- **Key technical decisions:**
  - Multi-strategy IR page discovery: tries subdomain patterns first (worked for 29/30 companies), falls back to link navigation — achieved 100% success rate across all 30 Dow companies with no manual intervention
  - Adaptive scraper handles the three main failure modes of modern IR sites: cookie consent walls (OneTrust, TrustArc, Quantcast), scroll-triggered lazy loading, and nested "Learn More" detail pages — each handled as a fallback layer rather than hardcoded per site
  - Document type priority ranking (10-Q > press releases > presentations > supplements) with position and keyword heuristics to identify the latest quarterly report without hardcoding dates
  - ProcessPoolExecutor with 3 concurrent Docling parsing processes — balanced throughput against memory constraints (~2GB per process); 53 source PDFs produced 1,093 parsed derivative files totaling 178MB
  - Dual-path S3 storage: raw-documents/ for source PDFs, earnings-documents/ for parsed output — maintains traceability while optimizing each path for different access patterns
  - Sequential Airflow DAG (IR extractor → file downloader → Docling parser → S3 upload) with task-level logging to debug.jsonl for post-run diagnosis

---

### CodeBuddies — Real-Time Pair Programming Platform
- **What it does:** A collaborative platform for live pair programming sessions with WebRTC video/audio calls, a synchronized shared code editor, session recording, RBAC for organization accounts, and a subscription/payment module.
- **Why I built it:** To build a full-featured real-time collaboration system that combined WebRTC peer connections, WebSocket-based code sync, and session lifecycle management in a single platform — closer to a production SaaS tool than a demo.
- **Technologies:** React, Node.js, Express.js, Socket.IO, PeerJS (WebRTC), Monaco Editor, MongoDB
- **Key technical decisions:**
  - WebRTC via PeerJS for peer-to-peer video/audio — avoids routing media through the server, keeping call latency low and server load minimal
  - Socket.IO for real-time code synchronization — every keystroke in Monaco Editor is broadcast over a WebSocket room so both users see changes instantly without polling
  - Session lifecycle managed as a state machine: invite sent → accepted → active → terminated; each transition updates session status in MongoDB and triggers real-time notifications to both participants
  - RBAC model supports both individual users and organization accounts — organizations define roles, admins manage employee access, and session invitation preferences are controlled at the profile level
  - MongoDB document model keeps session state (code snapshot, video URL, duration, language) co-located for easy dashboard retrieval without joins

---

## Technical Skills

### Languages
Python, JavaScript, TypeScript, Java, SQL, Swift

### AI/ML
LangChain, LangGraph, LlamaIndex, OpenAI APIs, Gemini API, RAG (Retrieval-Augmented Generation), Multi-Agent Systems, LLM-based Systems, Pinecone (hybrid dense + sparse), FAISS, BM25, Instructor, Pydantic, MCP (Model Context Protocol), ReAct reasoning, HITL workflows

### Backend
FastAPI, Node.js, Express.js, Celery, REST APIs, event-driven architecture, microservices, WebSockets (Socket.IO), WebRTC (PeerJS)

### Frontend
React.js, Next.js, React Native, TypeScript, Redux, Monaco Editor, Streamlit

### Data & Streaming
Apache Spark (PySpark), Apache Airflow, Apache Kafka, DVC (Data Version Control), Docling, Selenium, pandas, NumPy

### Cloud & DevOps
AWS (EC2 ASG, ALB, RDS, S3, Lambda, SNS, CloudWatch, Secrets Manager, KMS, IAM, EMR), GCP (Cloud Run, Cloud SQL, Cloud Composer), Docker, Docker Compose, Kubernetes, Terraform, Hashicorp Packer, GitHub Actions (CI/CD)

### Databases
PostgreSQL, MongoDB (replica sets, connection pooling), Redis, MySQL, SQLite, Pinecone

---

## Education

### Northeastern University
Degree: M.S. Information Systems
Period: 2024 – May 2026
Relevant coursework: [list any]

### Thadomal Shahani Engineering College
Degree: B.E. Computer Engineering
Period: 2017 – 2021

---

## Frequently Asked Questions

Q: What kind of roles are you looking for?
A: Full-time roles as a Backend Engineer, AI Engineer, or Full Stack Engineer. I'm open to any role that involves building backend systems, APIs, data pipelines, or AI-powered applications.

Q: Are you open to relocation?
A: Yes, open to relocation anywhere in the US.

Q: What is your visa status?
A: I am on an F-1 student visa and will require OPT authorization to work full-time after graduating in May 2026. I will eventually require H-1B sponsorship.

Q: What are your strongest technical skills?
A: Backend engineering with Python and Node.js (FastAPI, Express.js, microservices, async queuing with Celery + Redis), AI engineering (LangChain, LangGraph, RAG pipelines, multi-agent systems, hybrid vector retrieval with Pinecone), cloud infrastructure on AWS and GCP, and data pipeline orchestration with Airflow and Spark.

Q: What's your most impressive project?
A: MADDIP — a multi-agent M&A due diligence platform that ingests SEC filings, news, and financial data for 50+ companies, runs them through five specialized LLM agents (Financial, Legal, Operational, Sentiment, Synthesis), and delivers structured risk assessments with evidence citations. It reduced document review time by 70% and improved retrieval accuracy by 40% using hybrid dense + sparse search in Pinecone. The full data pipeline runs on PySpark, orchestrated by Airflow, deployed on AWS EMR — at a one-time cost of ~$7.70 for 50 companies.

Q: Are you available immediately?
A: I am currently completing my M.S. at Northeastern University with an expected graduation of May 2026. I am available for full-time roles starting June 2026.

Q: What industries have you worked in?
A: Enterprise HR tech (LTIMindtree — employee onboarding, alumni engagement, HR analytics), financial services and fintech (M&A due diligence, SEC filing analysis, earnings intelligence, PE dashboards), and developer tooling (pair programming platforms, cloud infrastructure).
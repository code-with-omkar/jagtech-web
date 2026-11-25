import { Project } from '../models/portfolio.models';

/**
 * Seed data. Replace with the .NET API by switching the ProjectRepository
 * provider (see core/repositories) — components never import this file.
 */
export const PROJECTS: readonly Project[] = [
  {
    slug: 'e-invoicing-platform',
    title: 'E-Invoicing Platform — Peppol Integration',
    category: 'Web App',
    status: 'Live',
    featured: true,
    image: '/images/projects/e-invoicing-platform.svg',
    imageAlt:
      'Illustration: invoices flowing through a message queue to the Peppol network, with a generated PDF and email dispatch.',
    summary:
      'Microservices-based E-Invoicing platform integrating with the Peppol network — automating invoice validation, asynchronous processing via RabbitMQ, and PDF generation for 500+ transactions/day. Reduced manual processing effort by 30%.',
    features: [
      'Peppol network integration',
      'Async message queuing with RabbitMQ',
      'Automated PDF generation & email dispatch',
      'Master data validation workflows',
    ],
    tech: ['ASP.NET Core', 'C#', 'Angular', 'Microservices', 'RabbitMQ', 'SQL Server'],
    caseStudy: [
      {
        heading: 'The problem',
        body: [
          'Clients processing digital invoices via the Peppol network were handling validation and dispatch manually. With 500+ transactions per day, errors were frequent and processing delays cost business hours.',
        ],
      },
      {
        heading: 'The approach',
        body: [
          'Architected a scalable microservices platform using ASP.NET Core. Each service owns a bounded context — ingestion, validation, processing, and dispatch — communicating via RabbitMQ to decouple load spikes from processing throughput.',
          'Automated workflows ingest transaction data, enforce master data validation rules, generate PDF invoices, and orchestrate email dispatch — end to end without manual intervention.',
        ],
      },
      {
        heading: 'Key outcomes',
        body: [
          '30% reduction in manual processing effort. Async message queuing absorbed transaction load peaks without degrading response times. Full audit trail on every transaction for compliance.',
        ],
      },
    ],
  },
  {
    slug: 'capex-tool',
    title: 'CAPEX Tool — Branding & CAPEX Management',
    category: 'Web App',
    status: 'Live',
    featured: true,
    image: '/images/projects/capex-tool.svg',
    imageAlt:
      'Illustration: a budget dashboard with bar chart beside a multi-step approval workflow.',
    summary:
      'Centralised CAPEX planning and approval platform digitising branding activities, budget approvals, and workflow management across multiple business units. Improved audit transparency and turnaround time by 50%.',
    features: [
      'Full approval hierarchy with role-based access',
      'Budget planning & multi-unit dashboards',
      'Audit-ready workflow tracking',
      'MIS reporting modules',
    ],
    tech: ['ASP.NET MVC', 'C#', 'Entity Framework', 'SQL Server', 'jQuery', 'AJAX'],
    caseStudy: [
      {
        heading: 'The problem',
        body: [
          'Budget approvals for branding and capital expenditure were handled through email chains and spreadsheets. Approvals stalled, audit trails were incomplete, and business units had no visibility into the approval pipeline.',
        ],
      },
      {
        heading: 'The approach',
        body: [
          'Designed a centralised platform with a configurable approval hierarchy — each business unit has role-based access; requests flow through defined approval stages with automated notifications at each step.',
          'Built dashboards and reporting modules that give finance and management real-time visibility into pending approvals, budgets consumed, and audit history.',
        ],
      },
      {
        heading: 'Key outcomes',
        body: [
          '50% improvement in turnaround time. Digitised audit trail eliminated compliance gaps. SQL query and workflow optimisation kept dashboards fast even with large historical datasets.',
        ],
      },
    ],
  },
  {
    slug: 'digiclaim',
    title: 'DigiClaim — Claims Management System',
    category: 'Web App',
    status: 'Live',
    featured: false,
    image: '/images/projects/digiclaim.svg',
    imageAlt:
      'Illustration: a claim form with an attached document passing through approval stages to an approved stamp.',
    summary:
      'End-to-end claims lifecycle management — submission, multi-stage approval workflows, document validation, and audit-ready history tracking — with MIS reporting and dashboards for business stakeholders.',
    features: [
      'Claims submission & multi-stage approval',
      'Document validation & audit history',
      'MIS reporting & dashboards',
      'Business user adoption support',
    ],
    tech: ['ASP.NET MVC', 'C#', 'Entity Framework', 'SQL Server'],
    caseStudy: [
      {
        heading: 'The problem',
        body: [
          'Claims were processed manually across teams, with no unified system for submission, approval, or audit. Disputes were common; processing times were long.',
        ],
      },
      {
        heading: 'The approach',
        body: [
          'Built the complete claims lifecycle in a single ASP.NET MVC application — structured submission forms, configurable approval workflows, document upload and validation, and an immutable audit trail for every state change.',
          'Developed dashboards and MIS reports tailored to business users, and coordinated directly with stakeholders through the rollout to ensure adoption.',
        ],
      },
      {
        heading: 'Key decisions',
        body: [
          'Immutable audit history on every claim — every state change is timestamped and attributed. Reporting queries written as optimised stored procedures to keep dashboard loads snappy on large claim volumes.',
        ],
      },
    ],
  },
  {
    slug: 'gst-engine',
    title: 'GST Engine — Tax Compliance & Reporting',
    category: 'Web App',
    status: 'Live',
    featured: false,
    image: '/images/projects/gst-engine.svg',
    imageAlt:
      'Illustration: a GSTR-1 data table moving through upload, validate and submit stages with a reconciliation report.',
    summary:
      'GST compliance engine for uploading, validating, processing, and submitting GSTR-1 data — generating statutory and reconciliation reports for tax compliance across large transaction volumes.',
    features: [
      'GSTR-1 upload, validation & submission',
      'Statutory & reconciliation report generation',
      'Large transaction SQL optimisation',
      'Production deployment & support',
    ],
    tech: ['ASP.NET MVC', 'C#', 'Entity Framework', 'SQL Server', 'T-SQL'],
    caseStudy: [
      {
        heading: 'The problem',
        body: [
          'Tax compliance teams were reconciling GST data manually across large volumes of transactions. Errors in GSTR-1 submissions triggered compliance penalties.',
        ],
      },
      {
        heading: 'The approach',
        body: [
          'Built a structured pipeline: upload → validate → process → submit. Each stage enforces business rules before advancing, preventing invalid data from reaching the GST portal.',
          'Optimised heavy transactional SQL queries with proper indexing and stored procedures — critical for processing thousands of records within statutory deadlines.',
        ],
      },
      {
        heading: 'Key outcomes',
        body: [
          'Automated validation eliminated manual reconciliation errors. Performance-tuned SQL kept batch processing well within deadline windows. Handled production deployment and ongoing issue resolution.',
        ],
      },
    ],
  },
  {
    slug: 'kargil-infra',
    title: 'Kargil Infra — Business Management App',
    category: 'Web App',
    status: 'In Progress',
    featured: false,
    image: '/images/projects/kargil-infra.svg',
    imageAlt:
      'Illustration: a business management dashboard with a building, a secure login shield and API data panels.',
    summary:
      'Personal full-stack project — an infrastructure/business management application built with Angular, .NET Core Web API, and SQL Server. Covers authentication, form validation, RESTful APIs, and end-to-end schema design.',
    features: [
      'JWT authentication',
      'RESTful API design',
      'Full SQL Server schema & CRUD',
      'Angular frontend with form validation',
    ],
    tech: ['Angular', 'TypeScript', '.NET Core Web API', 'C#', 'SQL Server', 'Entity Framework Core'],
    caseStudy: [
      {
        heading: 'The context',
        body: [
          'A personal project to build a real-world business management tool from scratch — no scaffolding shortcuts, every layer designed from first principles.',
        ],
      },
      {
        heading: 'What was built',
        body: [
          'A full-stack application with Angular standalone components on the frontend and a Clean Architecture .NET Core Web API backend. SQL Server schema designed from scratch — normalised, indexed, and ready for production load.',
          'Implemented JWT authentication, reactive form validation, and RESTful CRUD endpoints — the same patterns used in enterprise client projects, applied in a greenfield context.',
        ],
      },
    ],
  },
];

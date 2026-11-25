import { Profile } from '../models/portfolio.models';

export const PROFILE: Profile = {
  name: 'Omkar Jagtap',
  brand: 'JagTech',
  roles: ['Senior .NET Developer', 'Full-Stack Engineer', 'Solution Architect'],
  tagline: 'Building enterprise-grade applications with precision, performance, and purpose.',
  aboutLead:
    "I'm Omkar Jagtap — a Senior .NET Developer with 9+ years delivering enterprise applications across finance, tax compliance, and infrastructure domains.",
  aboutTeaser: [
    "I'm Omkar Jagtap — a Senior .NET Developer based in Navi Mumbai with 9+ years of experience architecting and delivering enterprise-grade applications. I specialise in ASP.NET MVC, .NET Core, Angular, and SQL Server — and I care deeply about solution architecture, performance, and security.",
    "From microservices-based E-Invoicing platforms to CAPEX approval workflows, I build systems that scale, perform, and hold up under real-world load. JagTech is where my name, my roots, and my craft converge.",
  ],
  story: [
    "I started at Mindgate Solutions supporting BSE trading platforms — high-stakes, zero-downtime environments where getting it wrong wasn't an option. That early exposure to production systems shaped how I think about software: reliability first, always.",
    "Since 2016 at the National Center of Information Technology, I've led end-to-end development of enterprise applications — from architecting a microservices-based Peppol E-Invoicing platform to building CAPEX approval workflows and GST compliance engines. I own the full lifecycle: requirement analysis, technical design, SQL optimisation, deployment, and client coordination.",
    "JagTech is my platform. Jag from Jagtap — my roots. Jag from जग — the world I build for. Tech — the craft I live by. This isn't a portfolio. It's a statement of intent.",
  ],
  currentlyBuilding: 'Mobile app',
  openTo: 'Senior Roles & Freelance',
  responseTime: 'Within 24 hours',
  location: 'Navi Mumbai, India',
  homeStack: [
    'ASP.NET Core', 'C#', '.NET Framework', 'Angular', 'TypeScript',
    'SQL Server', 'T-SQL', 'Entity Framework', 'RabbitMQ', 'Microservices',
    'REST APIs', 'Git', 'IIS',
  ],
  experience: [
    {
      period: 'Sep 2016 – Present',
      role: 'Senior .NET Developer',
      organisation: 'National Center of Information Technology, Thane',
      description:
        'Where my development career began. I joined as a developer writing my first production ASP.NET MVC and SQL Server code, and grew into the senior engineer who now owns enterprise applications end to end — requirement analysis, solution architecture, .NET Core and Angular delivery, SQL optimisation, production deployments, and direct client coordination. Today I mentor a team of 4 junior developers and maintain 99% uptime/SLA across every project I run.',
    },
    {
      period: 'Sep 2015 – Sep 2016',
      role: 'Application Support Executive',
      organisation: 'Mindgate Solutions Pvt. Ltd.',
      description:
        'Supported BSE (Bombay Stock Exchange) trading platforms — UCC, RTRMS, BEFS, and Extranet — ensuring uninterrupted trading operations for 50+ daily users. Performed manual testing for trading software releases and coordinated incident resolution during market hours.',
    },
    {
      period: '2019',
      role: 'BCA — Bachelor of Computer Applications',
      organisation: 'Bharati Vidyapeeth University',
      description:
        'Studied computer science fundamentals — data structures, algorithms, databases, and software engineering. Where the curiosity became a career.',
    },
    {
      period: '2014',
      role: 'Diploma in Information Technology',
      organisation: 'Maharashtra State Board',
      description:
        'Foundation in information technology, programming, and systems — the starting point of a decade-long engineering career.',
    },
  ],
  skillGroups: [
    {
      title: 'Backend',
      skills: [
        { name: 'ASP.NET Core', level: 'Expert' },
        { name: 'C#', level: 'Expert' },
        { name: '.NET Framework / MVC', level: 'Expert' },
        { name: 'Web API', level: 'Expert' },
        { name: 'Entity Framework / EF Core', level: 'Proficient' },
        { name: 'RabbitMQ', level: 'Proficient' },
      ],
    },
    {
      title: 'Frontend',
      skills: [
        { name: 'Angular', level: 'Expert' },
        { name: 'TypeScript', level: 'Expert' },
        { name: 'JavaScript / jQuery', level: 'Expert' },
        { name: 'Bootstrap', level: 'Proficient' },
        { name: 'HTML & CSS', level: 'Expert' },
      ],
    },
    {
      title: 'Database',
      skills: [
        { name: 'SQL Server', level: 'Expert' },
        { name: 'T-SQL', level: 'Expert' },
        { name: 'Stored Procedures', level: 'Expert' },
        { name: 'Query & Index Optimisation', level: 'Proficient' },
      ],
    },
    {
      title: 'Tools & Practices',
      skills: [
        { name: 'Git / TFS', level: 'Expert' },
        { name: 'IIS', level: 'Expert' },
        { name: 'Visual Studio', level: 'Expert' },
        { name: 'Microservices Architecture', level: 'Proficient' },
        { name: 'CSP / Security Hardening', level: 'Proficient' },
      ],
    },
  ],
  principles: [
    {
      title: 'Architecture first',
      description:
        'Before I write a line of code, I understand the system. Requirement analysis, technical design, and data modelling happen before the IDE opens.',
    },
    {
      title: 'SQL is the foundation',
      description:
        'A well-designed schema and optimised queries deliver more value than any frontend trick. I treat the database as a first-class citizen, not an afterthought.',
    },
    {
      title: 'Security is not optional',
      description:
        'From CSP hardening to JWT authentication and VAPT remediation — security is built in, not bolted on. Production systems have zero tolerance for shortcuts.',
    },
    {
      title: 'Mentorship multiplies impact',
      description:
        'Structured code reviews and pairing reduced production defects by 60% on my team. Investing in people is the highest-leverage thing a senior developer can do.',
    },
  ],
};

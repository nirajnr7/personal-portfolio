export const DATA = {
  name: "Niraj Singh",
  title: "Senior Software Engineer",
  tagline: [
    "Senior Backend Engineer with 5+ years building distributed systems at scale.",
    "I extend AbstractProblemSolver, implement SystemDesignInterface, and deploy microservices that handle millions of requests.",
    "Currently at Enphase Energy \u2014 engineering battery scheduling systems and multi-gateway data pipelines.",
  ],
  email: "fgniraj2@gmail.com",
  phone: "+91-9123415146",
  links: {
    linkedin: { url: "https://linkedin.com/in/nirajnr7" },
    github: { url: "https://github.com/nirajnr7" },
    leetcode: { url: "https://leetcode.com/fgniraj" },
    codechef: { url: "https://codechef.com/users/nirajnr7" },
    codeforces: { url: "https://codeforces.com/profile/fgniraj" },
  },
  education: {
    institution: "NIT Jamshedpur",
    degree: "B.Tech in Computer Science",
    period: "2017 \u2013 2021",
    cgpa: "8.3",
  },
  stats: [
    { value: "5+", label: "Years Experience", icon: "\uD83D\uDCBC" },
    { value: "8.3", label: "CGPA \u00B7 NIT JSR", icon: "\uD83C\uDF93" },
  ],
  languages: [
    { name: "Java", level: 90 },
    { name: "Python", level: 84 },
    { name: "C++", level: 82 },
    { name: "C", level: 80 },
    { name: "JavaScript", level: 62 },
    { name: "PHP", level: 58 },
  ],
  skills: {
    Languages: ["Java", "Python", "C++", "C", "JavaScript", "PHP"],
    "Frameworks & Libraries": [
      "Spring Boot", "Spring", "Hibernate", "Django", "Flask", "Streamlit",
    ],
    "Tools & Infra": [
      "Redis", "RabbitMQ", "Docker", "Maven", "Solr", "Git", "REST API",
    ],
    Databases: ["MongoDB", "MySQL"],
    "ML & Data": ["OpenCV", "NumPy", "Pandas"],
    Cloud: ["AWS"],
  },
  interests: [
    { name: "Chess", icon: "\u265F\uFE0F", uptime: "evenings" },
    { name: "PUBG", icon: "\uD83C\uDFAE", uptime: "weekends" },
    { name: "Teaching", icon: "\uD83D\uDCDA", uptime: "flexible" },
  ],
  experience: [
    {
      company: "Enphase Energy",
      role: "Senior Software Engineer",
      period: "Apr 2025 \u2013 Present",
      location: "Bengaluru, IND",
      latency: "~7 mo",
      icon: "enphase",
      stack: ["Java", "Spring Boot", "REST API", "PostgreSQL", "AWS"],
      metrics: [
        { label: "Schedules managed", value: "Multi-battery" },
        { label: "Data flow", value: "24h JSON" },
        { label: "Architecture", value: "Multi-gateway" },
      ],
      highlights: [
        {
          text: "Engineered a scheduling system with REST APIs for multiple battery schedules \u2014 day-level and time-window granularity",
          flow: [
            { label: "REST APIs", type: "api" },
            { label: "Scheduler", type: "service" },
            [
              { label: "Day Planner", type: "script" },
              { label: "Time Windows", type: "cache" },
            ],
            { label: "Battery Ctrl", type: "gateway" },
          ],
        },
        {
          text: "Designed scalable multi-gateway architecture for 24-hour JSON data flows, enabling AI optimization and dynamic tariff features",
          flow: [
            { label: "Multi-Gateway", type: "gateway" },
            { label: "JSON Pipeline", type: "queue" },
            { label: "AI Optimizer", type: "cloud" },
            [
              { label: "Tariff API", type: "api" },
              { label: "Battery Sys", type: "output" },
            ],
          ],
        },
      ],
    },
    {
      company: "99acres \u00B7 InfoEdge",
      role: "Senior Software Engineer",
      period: "Jun 2021 \u2013 Apr 2025",
      location: "Noida, IND",
      latency: "~4 yr",
      icon: "99acres",
      stack: ["Java", "Spring Boot", "MySQL", "MongoDB", "Redis", "RabbitMQ", "Solr", "Python"],
      metrics: [
        { label: "API latency", value: "70ms \u2192 54ms" },
        { label: "Records migrated", value: "2.8M+" },
        { label: "Tables consolidated", value: "16 \u2192 1" },
        { label: "Content pipeline", value: "P2V 30s" },
      ],
      highlights: [
        {
          text: "Led NOSQL migration: 16 MySQL tables \u2192 1 NOSQL collection. GET API latency 70 ms \u2192 54 ms",
          flow: [
            { label: "MySQL (16)", type: "database" },
            { label: "Migration Script", type: "script" },
            [
              { label: "MongoDB", type: "database" },
              { label: "Redis Cache", type: "cache" },
            ],
            { label: "GET API", type: "api", note: "70ms\u219254ms" },
          ],
        },
        {
          text: "Built 30-sec P2V pipeline with Python + ffmpeg; automated YouTube uploads via OAuth 2.0 + YouTube v3 API",
          flow: [
            { label: "Property Images", type: "image" },
            { label: "Python + ffmpeg", type: "script" },
            { label: "Video (30s)", type: "video" },
            { label: "OAuth 2.0", type: "gateway" },
            { label: "YouTube v3", type: "upload" },
          ],
        },
        {
          text: "Migrated 2.8 M listings across cities \u2014 SEO labels, showcase labels, Redis refresh, RabbitMQ events",
          flow: [
            { label: "Listings DB", type: "database" },
            { label: "Partial Update", type: "script" },
            [
              { label: "Redis Refresh", type: "cache" },
              { label: "RabbitMQ", type: "queue" },
            ],
            { label: "Ext Systems", type: "output" },
          ],
        },
        {
          text: "Developed custom BQ engine in Solr with boost queries for optimal search outcomes",
          flow: [
            { label: "Query", type: "api" },
            { label: "BQ Engine", type: "service" },
            { label: "Solr Index", type: "search" },
            { label: "Ranked Results", type: "output" },
          ],
        },
      ],
    },
  ],
  projects: [
    {
      name: "AI-Powered Quote Generation",
      icon: "\uD83E\uDD16",
      tech: ["Java", "Spring Boot", "OpenAI API", "Instagram Graph API", "Java AWT"],
      description: "End-to-end automated content pipeline that generates AI quotes, renders them on templates, and posts to Instagram \u2014 zero human intervention.",
      link: "https://www.instagram.com/3AmThoughts",
      metrics: [
        { label: "Pipeline", value: "Fully automated" },
        { label: "Content", value: "AI-generated" },
        { label: "Scheduling", value: "Cron-based" },
      ],
      highlights: [
        "Integrated OpenAI ChatGPT API for dynamic quote generation with context-aware prompts",
        "Built custom image processing engine using Java AWT/Graphics2D for rendering text on templates",
        "Spring Boot app with H2-DB for content tracking and dedup scheduling",
        "Automated image hosting via ImgHippo and posting via Instagram Graph API",
      ],
      flow: [
        { label: "Cron Trigger", type: "service" },
        { label: "OpenAI API", type: "cloud" },
        { label: "AWT Renderer", type: "image" },
        { label: "H2 DB", type: "database" },
        { label: "ImgHippo CDN", type: "upload" },
        { label: "Instagram", type: "cloud" },
      ],
    },
    {
      name: "URL Shortener",
      icon: "\uD83D\uDD17",
      tech: ["Java", "Spring Boot", "H2 DB", "Thymeleaf", "SHA-256"],
      description: "High-performance URL shortening service with advanced hashing and in-memory caching for sub-millisecond redirection.",
      link: "https://urlshortner-production-8c75.up.railway.app/urlShortener",
      metrics: [
        { label: "Hashing", value: "SHA-256 + Base64" },
        { label: "Redirection", value: "In-memory cache" },
        { label: "API", value: "RESTful" },
      ],
      highlights: [
        "SHA-256 hashing + Base64 encoding for generating compact, collision-resistant short URLs",
        "In-memory caching layer for rapid URL redirection without DB roundtrips",
        "Spring Boot RESTful API with Thymeleaf frontend for seamless URL management",
        "H2 embedded database for zero-config persistence",
      ],
      flow: [
        { label: "Client", type: "api" },
        { label: "Spring API", type: "gateway" },
        { label: "SHA-256", type: "script" },
        [
          { label: "Cache", type: "cache" },
          { label: "H2 DB", type: "database" },
        ],
        { label: "Short URL", type: "output" },
      ],
    },
  ],
};

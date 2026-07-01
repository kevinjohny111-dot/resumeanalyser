import re
def analyze_resume(text: str):
    skills = [
    # Programming Languages
    "python", "java", "javascript", "typescript", "c", "c++", "c#", "go",
    "php", "ruby", "swift", "kotlin", "rust", "r", "scala",

    # Frontend
    "html", "css", "react", "angular", "vue", "next.js", "nuxt.js",
    "bootstrap", "tailwind", "material ui", "redux", "jquery",

    # Backend
    "fastapi", "django", "flask", "spring", "spring boot",
    "node.js", "express", "nestjs", "laravel", "asp.net", ".net",

    # Databases
    "sql", "mysql", "postgresql", "mongodb", "redis", "sqlite",
    "oracle", "firebase", "cassandra", "elasticsearch",

    # Cloud
    "aws", "azure", "gcp", "digitalocean", "heroku", "vercel",

    # DevOps
    "docker", "kubernetes", "jenkins", "terraform", "ansible",
    "github actions", "gitlab ci", "nginx", "apache",

    # Version Control
    "git", "github", "bitbucket",

    # Operating Systems
    "linux", "ubuntu", "windows", "unix",

    # AI / ML / Data Science
    "tensorflow", "pytorch", "keras", "scikit-learn",
    "opencv", "pandas", "numpy", "matplotlib",
    "seaborn", "xgboost", "langchain", "huggingface",

    # APIs
    "rest api", "graphql", "grpc", "postman", "swagger", "openapi",

    # Mobile
    "android", "ios", "flutter", "react native",

    # Testing
    "pytest", "jest", "junit", "selenium", "cypress",

    # Message Brokers
    "kafka", "rabbitmq",

    # Tools
    "jira", "confluence", "figma", "notion", "slack",

    # Security
    "jwt", "oauth", "oauth2", "bcrypt", "ssl", "https",

    # Data Engineering
    "spark", "hadoop", "airflow",

    # ERP / CRM
    "erpnext", "odoo", "salesforce"
]

    text = text.lower()

    found_skills = []

    for skill in skills:
     pattern = r"\b" + re.escape(skill) + r"\b"

    if re.search(pattern, text):
        found_skills.append(skill)

    ats_score = int(
        (len(found_skills) / len(skills)) * 100
    )

    return {
        "skills_found": found_skills,
        "ats_score": ats_score
    }

def analyze_job_match(
    resume_text: str,
    job_description: str
):
    skills = [
    # Programming Languages
    "python", "java", "javascript", "typescript", "c", "c++", "c#", "go",
    "php", "ruby", "swift", "kotlin", "rust", "r", "scala",

    # Frontend
    "html", "css", "react", "angular", "vue", "next.js", "nuxt.js",
    "bootstrap", "tailwind", "material ui", "redux", "jquery",

    # Backend
    "fastapi", "django", "flask", "spring", "spring boot",
    "node.js", "express", "nestjs", "laravel", "asp.net", ".net",

    # Databases
    "sql", "mysql", "postgresql", "mongodb", "redis", "sqlite",
    "oracle", "firebase", "cassandra", "elasticsearch",

    # Cloud
    "aws", "azure", "gcp", "digitalocean", "heroku", "vercel",

    # DevOps
    "docker", "kubernetes", "jenkins", "terraform", "ansible",
    "github actions", "gitlab ci", "nginx", "apache",

    # Version Control
    "git", "github", "bitbucket",

    # Operating Systems
    "linux", "ubuntu", "windows", "unix",

    # AI / ML / Data Science
    "tensorflow", "pytorch", "keras", "scikit-learn",
    "opencv", "pandas", "numpy", "matplotlib",
    "seaborn", "xgboost", "langchain", "huggingface",

    # APIs
    "rest api", "graphql", "grpc", "postman", "swagger", "openapi",

    # Mobile
    "android", "ios", "flutter", "react native",

    # Testing
    "pytest", "jest", "junit", "selenium", "cypress",

    # Message Brokers
    "kafka", "rabbitmq",

    # Tools
    "jira", "confluence", "figma", "notion", "slack",

    # Security
    "jwt", "oauth", "oauth2", "bcrypt", "ssl", "https",

    # Data Engineering
    "spark", "hadoop", "airflow",

    # ERP / CRM
    "erpnext", "odoo", "salesforce"
]
    resume_text = resume_text.lower()
    job_description = job_description.lower()

    required_skills = []

    for skill in skills:
     pattern = r"\b" + re.escape(skill) + r"\b"

     if re.search(pattern, job_description):
        required_skills.append(skill)

    found_skills = []

    for skill in required_skills:
     pattern = r"\b" + re.escape(skill) + r"\b"

      if re.search(pattern, resume_text):
        found_skills.append(skill)

    missing_skills = [
        skill
        for skill in required_skills
        if skill not in found_skills
    ]

    if len(required_skills) == 0:
        ats_score = 0
    else:
        ats_score = int(
            len(found_skills)
            / len(required_skills)
            * 100
        )

    return {
        "ats_score": ats_score,
        "skills_found": found_skills,
        "missing_skills": missing_skills
    }
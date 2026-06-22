
def analyze_resume(text: str):
    skills = [
        "python",
        "fastapi",
        "react",
        "postgresql",
        "sql",
        "git",
        "docker"
    ]

    text = text.lower()

    found_skills = []

    for skill in skills:
        if skill in text:
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
        "python",
        "fastapi",
        "react",
        "postgresql",
        "sql",
        "git",
        "docker",
        "aws"
    ]

    resume_text = resume_text.lower()
    job_description = job_description.lower()

    required_skills = []

    for skill in skills:
        if skill in job_description:
            required_skills.append(skill)

    found_skills = []

    for skill in required_skills:
        if skill in resume_text:
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
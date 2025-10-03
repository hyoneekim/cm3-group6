const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Job = require("../models/jobModel");
const User = require("../models/userModel");

const jobs = [
  {
    "title": "Frontend Developer",
    "type": "Full-time",
    "description": "Build and maintain responsive web applications using React.",
    "company": {
      "name": "TechNova Solutions",
      "contactEmail": "hr@technova.com",
      "contactPhone": "+1-555-1234",
      "website": "https://www.technova.com",
      "size": 150
    },
    "location": "San Francisco, CA",
    "salary": 120000,
    "experienceLevel": "Mid",
    "postedDate": "2025-09-15T00:00:00Z",
    "status": "open",
    "applicationDeadline": "2025-10-15T23:59:59Z",
    "requirements": ["React", "JavaScript", "CSS", "REST APIs"]
  },
  {
    "title": "Data Analyst",
    "type": "Contract",
    "description": "Analyze datasets and create dashboards to support business decisions.",
    "company": {
      "name": "Insight Analytics",
      "contactEmail": "jobs@insightanalytics.com",
      "contactPhone": "+1-555-5678",
      "website": "https://www.insightanalytics.com",
      "size": 75
    },
    "location": "Remote",
    "salary": 45,
    "experienceLevel": "Entry",
    "postedDate": "2025-09-20T00:00:00Z",
    "status": "open",
    "applicationDeadline": "2025-10-05T23:59:59Z",
    "requirements": ["SQL", "Excel", "Data Visualization", "Python"]
  },

]

 
let token = null;

beforeAll(async () => {
  await User.deleteMany({});
  const result = await api.post("/api/users/signup").send( {
    "name": "David Lee",
    "username": "dlee99",
    "password": "mySecret!456",
    "phone_number": "+1-555-2020",
    "gender": "Male",
    "date_of_birth": "1989-03-15",
    "membership_status": "Inactive",
    "address": "456 Oak Ave, New York, NY"
  });
  token = result.body.token;
});

describe("Given there are initially some jobs saved", () => {
  beforeEach(async () => {
    await Job.deleteMany({});
    await Promise.all([
      api
        .post("/api/jobs")
        .set("Authorization", "bearer " + token)
        .send(jobs[0]),
      api
        .post("/api/jobs")
        .set("Authorization", "bearer " + token)
        .send(jobs[1]),
    ]);
  });

  it("should return all jobs as JSON when GET /api/jobs is called", async () => {
    await api
      .get("/api/jobs")
      .set("Authorization", "bearer " + token)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  it("should create one job when POST /api/jobs is called", async () => {
    const newJob =   {
    "title": "Senior Backend Engineer",
    "type": "Full-time",
    "description": "Design and implement scalable backend systems and APIs.",
    "company": {
      "name": "CloudWorks Inc.",
      "contactEmail": "careers@cloudworks.com",
      "contactPhone": "+1-555-9012",
      "website": "https://www.cloudworks.com",
      "size": 300
    },
    "location": "New York, NY",
    "salary": 150000,
    "experienceLevel": "Senior",
    "postedDate": "2025-09-10T00:00:00Z",
    "status": "open",
    "applicationDeadline": "2025-10-20T23:59:59Z",
    "requirements": ["Node.js", "Express", "MongoDB", "AWS"]
  };
    await api
      .post("/api/jobs")
      .set("Authorization", "bearer " + token)
      .send(newJob)
      .expect(201);
  });

  it("should return one job by ID when GET /api/jobs/:id is called", async () => {
    const job = await Job.findOne();
    console.error(job);
    
    await api
      .get("/api/jobs/" + job._id)
      .set("Authorization", "bearer " + token)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  it("should update one job by ID when PUT /api/jobs/:id is called", async () => {
    const job = await Job.findOne();
    const updatedJob = {
    "title": "TESTETESTSET",
    "type": "TESTES",
    };
    const response = await api
      .put(`/api/jobs/${job._id}`)
      .set("Authorization", "bearer " + token)
      .send(updatedJob)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  
    console.log("Response body:", response.body);
  
    const updatedJobCheck = await Job.findById(job._id);
    console.log("Updated tour:", updatedJobCheck);
  
    expect(updatedJobCheck.title).toBe(updatedJob.title);
    expect(updatedJobCheck.type).toBe(updatedJob.type);
  });
  

  it("should delete one job by ID when DELETE /api/jobs/:id is called", async () => {
    const job = await Job.findOne();
    await api
      .delete("/api/jobs/" + job._id)
      .set("Authorization", "bearer " + token)
      .expect(204);
    const jobCheck = await Job.findById(job._id);
    expect(jobCheck).toBeNull();
  });
});

afterAll(() => {
  mongoose.connection.close();
});

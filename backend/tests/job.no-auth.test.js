const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app"); // Your Express app
const api = supertest(app);
const Job = require("../models/jobModel");

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
  }
]


describe("Job controller", ()=>{
    beforeEach(async () => {
        await Job.deleteMany({});
        await Job.insertMany(jobs);
      });
    
      afterAll(() => {
        mongoose.connection.close();
      });

      it("should return all jos as JSON when GET /api/jobs is called", async () => {
    const response = await api
      .get("/api/jobs")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body).toHaveLength(jobs.length);
  });

  it("should create a new job when POST /api/jobs is called", async () => {
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
        .send(newJob)
        .expect(201)
        .expect("Content-Type", /application\/json/);
  
      const jobsAfterPost = await Job.find({});
      expect(jobsAfterPost).toHaveLength(jobs.length + 1);
      const jobTitles = jobsAfterPost.map((job) => job.title);
      expect(jobTitles).toContain(newJob.title);
    });

      it("should return one job by ID when GET /api/jobs/:id is called", async () => {
        const job = await Job.findOne();
        await api
          .get(`/api/jobs/${job._id}`)
          .expect(200)
          .expect("Content-Type", /application\/json/);
      });
        it("should return 404 for a non-existing job ID", async () => {
          const nonExistentId = new mongoose.Types.ObjectId();
          await api.get(`/api/jobs/${nonExistentId}`).expect(404);
        });

         // Test PUT /api/jobs/:id
          it("should update one job with partial data when PUT /api/jobs/:id is called", async () => {
            const job = await Job.findOne();
            const updatedJob = {
              type: "Part-time",
              company: {
                name: "Bad company"
              },
            };
        
            await api
              .put(`/api/jobs/${job._id}`)
              .send(updatedJob)
              .expect(200)
              .expect("Content-Type", /application\/json/);
        
            const updatedJobCheck = await Job.findById(job._id);
            expect(updatedJobCheck.type).toBe(updatedJob.type);
            expect(updatedJobCheck.company.name).toBe(updatedJob.company.name);
          });

          it("should return 400 for invalid job ID when PUT /api/jobs/:id", async () => {
    const invalidId = "12345";
    await api.put(`/api/jobs/${invalidId}`).send({}).expect(400);
  });

    // Test DELETE /api/jobs/:id
    it("should delete one job by ID when DELETE /api/jobs/:id is called", async () => {
      const job = await Job.findOne();
      await api.delete(`/api/jobs/${job._id}`).expect(204);
  
      const deletedJobCheck = await Job.findById(job._id);
      expect(deletedJobCheck).toBeNull();
    });
  
    it("should return 400 for invalid job ID when DELETE /api/jobs/:id", async () => {
      const invalidId = "12345";
      await api.delete(`/api/jobs/${invalidId}`).expect(400);
    });
    

})

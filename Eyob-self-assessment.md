# Self-Assessment (Template)

### Example 1: Improving Code Quality

Initially, our `createJob` and `updateJob` functions spread  req.body directly into the user model. Though functional,  if unexpected data is sent, it could pass through. 
It is recommended to refactor the code by adding :

```javascript
// createJob and updateJob refactoring

if (!req.body.title || !req.body.company) {
  return res.status(400).json({ message: "Title and company are required" });
}

```

### Example 2: Improving Code Quality

Intially we used `findOneAndUpdate({ _id: jobId }, ...)`. Instead we could use the following to make the code more efficient:

```javascript
//  refactoring findOneAndUpdate and indOneAndDelete

const updatedJob = await Job.findByIdAndUpdate(jobId, req.body, { new: true });
const deletedJob = await Job.findByIdAndDelete(jobId);


```

### Example 3: Improving Code Quality

It is recommended to add the following snipt at the end of `userControllers.js` to handle large collection of jobs.

```javascript

//  adding (?page=1&limit=10) to large number of data

const { page = 1, limit = 10 } = req.query;
const jobs = await Job.find({})
  .sort({ createdAt: -1 })
  .skip((page - 1) * limit)
  .limit(parseInt(limit));

```

### Example 4: Improving Code Quality

At the moment `status` and `applicationDeadline` are not linked, it is recommended to add a middleware that can auto-close 
expired jobs

```javascript
//  refactoring findOneAndUpdate and indOneAndDelete

jobSchema.pre("save", function(next) {
  if (this.applicationDeadline && this.applicationDeadline < Date.now()) {
    this.status = "closed";
  }
  next();
});


### Key Improvements:
- **Default Handling:** Used `Number()` with default values (`0` for `minSalary`, `Infinity` for `maxSalary`) to handle missing or invalid inputs.
- **Resilience:** Ensured the endpoint works for various scenarios, making it more user-friendly and robust.

---

### Example 2: Debugging Route Order in Express

We did not encounter route order issue, we organized the properly with the `requireAuth` kept at the right place to pretect protected routes. Here is how our routes are organized:  


```javascript
    // route order

    router.get("/", getAllJobs);

    router.use(requireAuth);

    router.post("/", createJob);
    router.get("/:jobId", getJobById);
    router.put("/:jobId", updateJob);
    router.delete("/:jobId", deleteJob);
```

**Lessons Learned:** 
This coding marathon has been a great learning experience and it was a great way to prepare for the exam. We have worked great as a group.  

 **Testing Matters:** We have done all the neccessary test using `jobs-auth.test.js` and `jobs-no-auth.test.js`. Other that minor syntax error we did not encounter significant error.



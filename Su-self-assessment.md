# Self-Assessment (Template)

### Example 1: Improving Code Quality

Below is a side-by-side comparison of my code vs. the enhanced version, with key improvements explained. 

```javascript
//before
const generateToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, {
        expiresIn: "3d"
    });
};

//after
const generateToken = (id) => 
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "3d" });
```

The endpoint worked for requests like:  
`GET http://localhost:4000/api/jobs/salary?min=5000&max=6000`  




### Key Improvements:
Clearer environment variable (JWT_SECRET).

Cleaner function syntax.

Uses id instead of _id for readability.

---

### Example 2: Debugging Route Order in Express

LLM also suggested to enhance my code like this: 

```javascript
//before
if (!username || !password) {
    throw Error("All fields are required");
}
//after
if (!username || !password) {
  return res.status(400).json({ error: "All fields are required" });
}
```

Instead of using `throw Error`, using `res.status(xxx)` may handle errors better.

### Example 3: A bug found by FE developers
`jobRouter.js` was initially written like this, which caused an issue on the FE side. Later noticing the issue, we relocated the code:

```javascript
// previous route order
router.get("/", getAllJobs);

router.use(requireAuth);

router.get("/:jobId", getJobById);


router.post("/", createJob);
router.put("/:jobId", updateJob);
router.delete("/:jobId", deleteJob);


// Corrected route order
router.get("/", getAllJobs);
router.get("/:jobId", getJobById);

router.use(requireAuth);

router.post("/", createJob);
router.put("/:jobId", updateJob);
router.delete("/:jobId", deleteJob);
```

**Lessons Learned:**

1. **Route Evaluation in Express:** Since the `requireAuth` was protecting `getJobById`, there was an issue that users couldn't check the detailed information of the job when a single `jobListing` was clicked.

### Example 4: Testing


```js
//jobs-auth.test.js
const response = await api.get("/api/jobs")
  .set("Authorization", `Bearer ${token}`)
  .expect(200)
  .expect("Content-Type", /application\/json/);

expect(response.body).toHaveLength(2); //
expect(response.body[0]).toMatchObject({ title: "Frontend Developer" });//
``` 
**Areas for improvement:**
In addtion to only checkihng response status and content type, the last two lines ensures response structure and data integrity.

Also, LLM suggested to add these: 

- Invalid inputs (e.g., missing required fields).
- Unauthorized requests (missing/invalid token).
- Expired or malformed token.
- Non-existent job ID.
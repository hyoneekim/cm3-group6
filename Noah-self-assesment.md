# Self-Assessment

### Example 1:

```js
// jobRouter.js

router.get("/", getAllJobs);
router.get("/:jobId", getJobById);

router.use(requireAuth);

router.post("/", createJob);
router.put("/:jobId", updateJob);
router.delete("/:jobId", deleteJob);
// Was like

router.get("/", getAllJobs);

router.use(requireAuth);

router.get("/:jobId", getJobById);
router.post("/", createJob);
router.put("/:jobId", updateJob);
router.delete("/:jobId", deleteJob);
```

**problem**

Getting a singular job id was impsible making the JobPage non functional.

**Leassons learned**

Properly place the authorization as to not block get routes.

---

### Example 2:

```js
// App.jsx

// Was this
const [isAuthenticated, setIsAuthenticated] = useState(false);

// Fixed to this
const [isAuthenticated, setIsAuthenticated] = useState(() => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  return user && user.token ? true : false;
});
```

**problem**

Authentication can be set using use state but does not save the token for the user in any way.

**Leassons learned**

Save the token properly after a user signs in and make sure to use the same storage througout the whole codebase.

---

### Example 3:

```js
// Various files such as AddJobPage.jsx, EditJobPage.jsx, JobPage.jsx, and HomePage.jsx

console.log("token", token);
```

**problem**

The token wasn't being passed correctly.

**Leassons learned**

Using can console.log() can help determine where your error lies, and many other places. I am used to doing this in other languages but there's something about JS that makes me forget about the best debugging tool there is.

---

### Example 4:

```js
// JobPage.jsx

// Was this
const deleteJob = async (id) => {
  try {
    const res = await fetch(`/api/jobs/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) {
      throw new Error("Failed to delete job");
    }
    navigate("/");
  } catch (error) {
    console.error("Error deleting job", error);
  }
};

// Corrected to this
const deleteJob = async (id) => {
  try {
    const res = await fetch(`/api/jobs/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Failed to delete job: ${errorText}`);
    }
    console.log("Job deleted successfully");
    navigate("/");
  } catch (error) {
    console.error("Error deleting job:", error);
  }
};
```

**problem**

Simple problem here, no token is being passed to the backend for authentication so the fetch delete will never work.

**Leassons learned**

Pass the token when trying to do protected routes.

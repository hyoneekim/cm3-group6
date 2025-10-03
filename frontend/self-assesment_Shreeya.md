# Self-Assessment

## Implements and Improvements ##
### 1. Refactoring Job Creation ###
Initially, our `AddJobPage` component worked for adding jobs but was missing key improvements like asynchronous form handling, structured data validation, and navigation feedback.

Here’s the optimized version of the form submission logic:
```
// AddJobPage.jsx
const addJob = async (newJob) => {
  try {
    const res = await fetch(`/api/jobs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newJob),
    });
    if (!res.ok) {
      throw new Error("Failed to add a job");
    }
  } catch (err) {
    console.error(err);
  }
};

const submitForm = async (e) => {
  e.preventDefault();
  const newJob = {
    title,
    type,
    description,
    location,
    salary,
    company: {
      name: companyName,
      contactEmail,
      contactPhone,
    },
  };
  await addJob(newJob);
  console.log(newJob);
  navigate("/");
};

```
**Key Improvements:**
- Converted the submit handler into an async function to ensure smoother API calls and avoid race conditions.
- Simplified job creation logic with a clean data model for company details.
- Automatically redirects users to the homepage after submission, improving UX.

### 2. Enhancing Job Editing ###
The job editing page originally faced challenges in fetching and updating job data correctly, especially with nested company fields.

Here’s the improved implementation:
```
// EditJobPage.jsx
const updateJob = async (job) => {
  try {
    const res = await fetch(`/api/jobs/${job.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(job),
    });
    if (!res.ok) {
      throw new Error("Failed to update job");
    }
    return res.ok;
  } catch (error) {
    console.error("Error updating job:", error);
    return false;
  }
};

```
**Key Improvements:**
- Used useEffect to pre-fill the form with fetched job data for editing.
- Added error feedback during API calls and ensured safe async updates.

### 3. Modularizing User Signup ###
Our initial signup form handled all logic directly in the component. To improve maintainability, we separated API logic into a custom hook.
```
// useSignup.js
export default function useSignup(setIsAuthenticated) {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (object) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(object),
      });
      const user = await response.json();
      if (!response.ok) {
        setError(user.error || "Signup failed");
        setIsLoading(false);
        return false;
      }
      sessionStorage.setItem("user", JSON.stringify(user));
      setIsAuthenticated?.(true);
      setIsLoading(false);
      return true;
    } catch (err) {
      setError(err.message || "Network error");
      setIsLoading(false);
      return false;
    }
  };

  return { handleSignup, isLoading, error };
}


```
**Key Improvements:**
- Abstracted signup logic into useSignup for reusability and separation of concerns.
- Added validation for invalid JSON responses and network failures.

## Overall Reflection ##
- Strengthened understanding of React Hooks (`useState`, `useEffect`, `useNavigate`, `useParams`) and custom hook creation.
- Learned how to separate API logic into reusable hooks for cleaner and more maintainable code.
- Improved the job management workflow by providing clear navigation, data validation, and consistent form behavior.

### Lesson Learned: ###
This coding marathon strengthened my skills across both frontend and overall project development. I learned how to integrate React components with backend APIs, manage application state efficiently, and handle async operations reliably. Collaborating with my team improved my understanding of version control and full-stack workflows. Overall, it was a valuable experience that enhanced both my technical and teamwork abilities.




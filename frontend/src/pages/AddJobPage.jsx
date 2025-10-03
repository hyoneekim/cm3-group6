import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddJobPage = () => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Full-Time");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");

  const navigate = useNavigate();

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
    console.log("submitForm called");

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

  return (
    <div className="create">
      <h2>Add a New Job</h2>
      <form onSubmit={submitForm}>
        <label>Job title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Job type:</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Remote">Remote</option>
          <option value="Internship">Internship</option>
        </select>

        <label>Job Description:</label>
        <textarea
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <label>Location:</label>
        <input
          type="text"
          required
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <label>Salary:</label>
        <input
          type="text"
          required
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />

        <label>Company Name:</label>
        <input
          type="text"
          required
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <label>Contact Email:</label>
        <input
          type="email"
          required
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
        />
        <label>Contact Phone:</label>
        <input
          type="phone"
          required
          value={contactPhone}
          onChange={(e) => setContactPhone(e.target.value)}
        />
        <button>Add Job</button>
      </form>
    </div>
  );
};

export default AddJobPage;

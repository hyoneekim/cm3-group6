import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const JobPage = ({ isAuthenticated }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(true);
  console.log("isAuthenticated", isAuthenticated);

  const user = JSON.parse(sessionStorage.getItem("user"));
  const token = user ? user.token : null;

  //   console.log("token: ", token);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        console.log("id: ", id);
        const res = await fetch(`/api/jobs/${id}`);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setJob(data);
        setIsPending(false);
      } catch (err) {
        setError(err.message);
        setIsPending(false);
      }
    };
    fetchJob();
  }, [id]);

  //   const deleteJob = async (id) => {
  //     try {
  //       const res = await fetch(`/api/jobs/${id}`, {
  //         method: "DELETE",
  //         headers: { "Content-Type": "application/json" },
  //       });
  //       if (!res.ok) {
  //         throw new Error("Failed to delete job");
  //       }
  //       navigate("/");
  //     } catch (error) {
  //       console.error("Error deleting job", error);
  //     }
  //   };

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

  const onDeleteClick = (jobId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this listing?" + jobId
    );
    if (!confirm) return;

    deleteJob(jobId);
  };

  return (
    <div className="job-details">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {!isPending && job && (
        <>
          <h2>{job.title}</h2>
          <p>Type: {job.type}</p>
          <p>Description: {job.description}</p>
          <p>Location: {job.location}</p>
          <p>Salary: {job.salary}</p>
          <p>Company: {job.company?.name}</p>
          <p>Email: {job.company?.contactEmail}</p>
          <p>Phone: {job.company?.contactPhone}</p>
          {/* <button onClick={() => onDeleteClick(job._id)}>delete</button>
          <button onClick={() => navigate(`/edit-job/${job._id}`)}>edit</button> */}
          {isAuthenticated && (
            <>
              <button onClick={() => onDeleteClick(job._id)}>delete</button>
              <button onClick={() => navigate(`/edit-job/${job._id}`)}>
                edit
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default JobPage;

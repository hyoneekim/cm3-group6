import JobListing from "./JobListing";
import { useNavigate } from "react-router-dom";

const JobListings = ({ jobs }) => {
  const navigate = useNavigate();

  return (
    <div className="job-list">
      {jobs.map((job) => (
        <button
          key={job._id}
          onClick={() => navigate(`/job-page/${job._id}`)}
          style={{ all: "unset", cursor: "pointer" }} // optional styling
        >
          <JobListing job={job} />
        </button>
      ))}
    </div>
  );
};

export default JobListings;

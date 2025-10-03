import { Link } from "react-router-dom";

const JobListing = ({ job }) => {
  return (
    <div className="job-preview">
      <h2>
        <Link to={`/jobs/${job._id}`}>{job.title}</Link>
      </h2>
      <p>Type: {job.type}</p>
      <p>Description: {job.description}</p>
      <p>Company: {job.company?.name}</p>
      <p>Location: {job.location}</p>
      <p>Salary:{job.salary}</p>
    </div>
  );
};

export default JobListing;

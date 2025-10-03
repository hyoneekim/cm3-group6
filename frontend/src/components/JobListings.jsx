
import JobListing from "./JobListing";

const JobListings = ({jobs}) => {
  return (
    <div className="job-list">
      {error && <div>{error}</div>}
      {isPending && <div>Loading jobs...</div>}
      {jobs.map((job) => (
        <JobListing key={job._id} job={job} />
      ))}
    </div>
  );
};

export default JobListings;

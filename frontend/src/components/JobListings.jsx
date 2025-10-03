import JobListing from "./JobListing";

const JobListings = ({ jobs }) => {
  return (
    <div className="job-list">
      {jobs.map((job, index) => (
        <JobListing key={index} job={job} />
      ))}
    </div>
  );
};

export default JobListings;

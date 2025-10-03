const JobListing = ({ job }) => {
  // console.log(job._id);
  return (
    <div className="job-preview">
      <h2>{job.title}</h2>
      <p>Type: {job.type}</p>
      <p>Description: {job.description}</p>
      <p>Company: {job.company.name}</p>
      <p>Location: {job.location}</p>
      <p>Salary: {job.salary}</p>
      <p>Requirements: {job.requirements}</p>
    </div>
  );
};

export default JobListing;

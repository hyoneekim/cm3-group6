import {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const JobPage = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [job, setJob] = useState(null);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(true);

    useEffect(() => {
        const fetchJob = async() => {
            try{
                console.log("id: ", id);
                const res = await fetch(`/api/jobs/${id}`);
                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await res.json();
                setJob(data);
                setIsPending(false);
            } catch (err){
                setError(err.message);
                setIsPending(false);
            }
        }
        fetchJob();
    }, [id]);

    const deleteJob = async() => {
        try{
            const res = await fetch (`/api/jobs/${id}`,{
                method: "DELETE",
                headers:{"Content-Type":"application/json" }
            })
            if (!res.ok){
                throw new Error("Failed to delete job");
            }
            navigate("/");
        } catch(error){
            console.error("Error deleting job", error)
        }
    }

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
          <button onClick={deleteJob}>Delete</button>
          <button onClick={() => navigate(`/jobs/${job.id || job._id}/edit`)}>Edit</button>
        </>
      )}
    </div>
  )
}

export default JobPage;
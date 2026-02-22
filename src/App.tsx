import { useEffect, useState } from "react"
import { CandidateService } from "./services/candidateService"
import type { Candidate } from "./types/candidate";
import type { Job } from "./types/job";
import { JobService } from "./services/jobService";
import JobsTable from "./components/JobsTable";

function App() {

  const candidateService = new CandidateService();
  const jobService = new JobService();
  const email = "rodrigo_tartaglia@hotmail.com"
  const [candidate, setCandidate] = useState<Candidate>();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [candidateResponse, jobsResponse] = await Promise.all([
          candidateService.getCandidate(email),
          jobService.getJobs()
        ]);

        setCandidate(candidateResponse);
        setJobs(jobsResponse);
      }
      catch (err: any) {
        setError(err.message || "Error al cargar datos");
      }
      finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col p-6">
      {isLoading && (
        <span className="text-gray-500 text-center text-lg">Cargando datos...</span>
      )}

      {error && (
        <span className="text-red-500 font-semibold text-center text-lg flex-1 flex items-center justify-center">{error}</span>
      )}
      
      {!isLoading && !error && (
        <JobsTable jobs={jobs} candidate={candidate} />
      )}
    </div>
  )
}

export default App

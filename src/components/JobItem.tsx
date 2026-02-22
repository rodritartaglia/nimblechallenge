import { useState } from "react";
import type { ApplyPayload } from "../types/applyPayload";
import type { Candidate } from "../types/candidate";
import type { Job } from "../types/job"
import { JobService } from "../services/jobService";

interface JobItemProps {
    item: Job;
    candidate: Candidate | undefined;
}


function JobItem({item, candidate}: JobItemProps) {

    const [repoUrl, setRepoUrl] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(false);
    const jobService = new JobService();

 const handleSubmit = async (e: React.SubmitEvent) => {
    setIsLoading(true)
    e.preventDefault();
    if (!candidate) return;

    const payload : ApplyPayload = {
        uuid: candidate.uuid,
        jobId: item.id,
        candidateId: candidate.candidateId,
        repoUrl: repoUrl,
        applicationId: candidate.applicationId
    };
    
    try {
      await jobService.applyToJob(payload)
      setSuccess(true)
    }
    catch (err: any) {
      setError(err.message || "Error al aplicar")
    }
    finally {
      setIsLoading(false);
    }
 }

  return (
    <div className="flex flex-col w-3xl h-36 bg-white shadow-md rounded-md p-4 mb-4 hover:shadow-lg transition-shadow">
      <form onSubmit={handleSubmit} className="flex flex-col w-full justify-center items-center gap-2 text-center">
        <span className="font-semibold text-gray-800 w-full">{item.title}</span>
        <div className="flex gap-4 w-full">
            <input
            type="text"
            placeholder="URL del repo"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            className="border flex-1 border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
            />
            <button
            type="submit"
            disabled={!repoUrl || !candidate || isLoading}
            className="cursor-pointer bg-blue-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
            Submit
            </button>
        </div>
      </form>
      {error && <span className="text-red-500 font-semibold text-center mt-2 text-lg flex items-center justify-center">{error}</span>}
      {success && <span className="text-green-500 font-semibold text-center mt-2 text-lg flex items-center justify-center">Enviado!</span>}
    </div>
  )
}

export default JobItem
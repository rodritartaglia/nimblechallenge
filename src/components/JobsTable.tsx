import type { Candidate } from "../types/candidate";
import type { Job } from "../types/job"
import JobItem from "./JobItem";

interface JobsTableProps {
    jobs: Job[];
    candidate: Candidate | undefined;
}

function JobsTable({ jobs, candidate }: JobsTableProps) {
    return (
        <div className="flex flex-wrap justify-center gap-4 flex-1">
            {jobs.map((job) => (
                <JobItem key={job.id} item={job} candidate={candidate} />
            ))}
        </div>
    )
}

export default JobsTable
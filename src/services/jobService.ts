import type { ApplyPayload } from "../types/applyPayload";
import type { Job } from "../types/job";

const BASE_URL = import.meta.env.VITE_API_BASE_URL


export class JobService {
    async getJobs() {
        const response = await fetch(`${BASE_URL}/api/jobs/get-list`);
        if (!response.ok) {
            throw new Error(`Error al obtener jobs: ${response.status}`);
        }
        const data: Job[] = await response.json();
        return data;
    }

    async applyToJob(payload: ApplyPayload) {
        const response = await fetch(`${BASE_URL}/api/candidate/apply-to-job`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });
        if (!response.ok) {
            throw new Error(`Error al aplicar: ${response.status}`);
        }
        return response.json()
    }
}
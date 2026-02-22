import type { Candidate } from "../types/candidate";

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export class CandidateService {
    async getCandidate(email: string) {
        const response = await fetch(`${BASE_URL}/api/candidate/get-by-email?email=${email}`);
        if (!response.ok) {
            throw new Error(`Error al obtener al candidato: ${response.status}`);
        }
        const data: Candidate = await response.json();
        return data;
    }
}
export interface Candidate {
    id: number;
    name: string;
    username: string;
    location: string;
    avatar_url: string;
    email?: string; // Makes email optional
    html_url: string;
    company?: string; // Makes company optional
}

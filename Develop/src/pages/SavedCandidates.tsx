import { useEffect, useState } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const candidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    setSavedCandidates(candidates);
  }, []);

  if (savedCandidates.length === 0) {
    return <div>No candidates have been accepted.</div>;
  }

  return (
    <>
      <h1>Potential Candidates</h1>
      <ul>
        {savedCandidates.map((candidate) => (
          <li key={candidate.id}>
            <img src={candidate.avatar_url} alt={candidate.name} />
            <p>Name: {candidate.name}</p>
            <p>Username: {candidate.username}</p>
            <p>Location: {candidate.location}</p>
            <p>Email: {candidate.email}</p>
            <p>Company: {candidate.company}</p>
            <a href={candidate.html_url}>GitHub Profile</a>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SavedCandidates;

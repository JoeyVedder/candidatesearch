import { useState, useEffect } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';
import { searchGithub } from '../api/API';

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(null);

  useEffect(() => {
    const fetchCandidates = async () => {
      const data = await searchGithub();
      setCandidates(data);
      if (data.length > 0) setCurrentCandidate(data[0]);
    };
    fetchCandidates();
  }, []);

  const saveCandidate = () => {
    if (currentCandidate) {
      const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
      savedCandidates.push(currentCandidate);
      localStorage.setItem('savedCandidates', JSON.stringify(savedCandidates));
      nextCandidate();
    }
  };

  const nextCandidate = () => {
    setCandidates((prev) => prev.slice(1));
    setCurrentCandidate(candidates.length > 1 ? candidates[1] : null);
  };

  if (!currentCandidate) {
    return <div>No more candidates available</div>;
  }

  return (
    <div>
      <h1>Candidate Search</h1>
      <div>
        <img src={currentCandidate.avatar_url} alt={currentCandidate.name} />
        <p>Name: {currentCandidate.name}</p>
        <p>Username: {currentCandidate.username}</p>
        <p>Location: {currentCandidate.location}</p>
        <p>Email: {currentCandidate.email}</p>
        <p>Company: {currentCandidate.company}</p>
        <a href={currentCandidate.html_url}>GitHub Profile</a>
        <div>
          <button onClick={saveCandidate}>+</button>
          <button onClick={nextCandidate}>-</button>
        </div>
      </div>
    </div>
  );
};

export default CandidateSearch;
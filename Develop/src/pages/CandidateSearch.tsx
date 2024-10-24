import { useState, useEffect } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';
import { searchGithub } from '../api/API';

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(null);
  const [message, setMessage] = useState<string>(''); // State for feedback message

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const data = await searchGithub();
        setCandidates(data);
        if (data.length > 0) setCurrentCandidate(data[0]);
      } catch (error) {
        setMessage('Failed to fetch candidates. Please try again later.'); // Error message
      }
    };
    fetchCandidates();
  }, []);

  const saveCandidate = () => {
    if (currentCandidate) {
      const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
      savedCandidates.push(currentCandidate);
      localStorage.setItem('savedCandidates', JSON.stringify(savedCandidates));
      setMessage(`${currentCandidate.name} has been saved!`); // Confirmation message
      nextCandidate();
    }
  };

  const nextCandidate = () => {
    setCandidates((prev) => {
      const newCandidates = prev.slice(1);
      setCurrentCandidate(newCandidates.length > 0 ? newCandidates[0] : null);
      return newCandidates;
    });
  };

  if (!currentCandidate) {
    return <div>No more candidates available</div>;
  }

  return (
    <div>
      <h1>Candidate Search</h1>
      {message && <p>{message}</p>} 
      <div>
        <img src={currentCandidate.avatar_url} alt={currentCandidate.name} />
        <p>Name: {currentCandidate.name}</p>
        <p>Username: {currentCandidate.username}</p>
        <p>Location: {currentCandidate.location}</p>
        <p>Email: {currentCandidate.email}</p>
        <p>Company: {currentCandidate.company}</p>
        <a href={currentCandidate.html_url} target="_blank" rel="noopener noreferrer">GitHub Profile</a>
        <div>
          <button onClick={saveCandidate}>+</button>
          <button onClick={nextCandidate}>-</button>
        </div>
      </div>
    </div>
  );
};

export default CandidateSearch;

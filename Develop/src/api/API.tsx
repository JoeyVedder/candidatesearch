const searchGithub = async () => {
  try {
    const start = Math.floor(Math.random() * 100000000) + 1;
    const response = await fetch(
      `https://api.github.com/users?since=${start}`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Invalid API response, check the network tab');
    }

    const data = await response.json();

    
    const candidates = data.map((user: any) => ({
      name: user.name || 'N/A',
      username: user.login,
      location: user.location || 'N/A',
      avatar: user.avatar_url,
      email: user.email || 'N/A',
      html_url: user.html_url,
      company: user.company || 'N/A',
    }));

    console.log('Candidates:', candidates);
    return candidates;
  } catch (err) {
    console.error('An error occurred', err);
    return []; 
  }
};

const searchGithubUser = async (username: string) => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error('Invalid API response, check the network tab');
    }

    const data = await response.json();

    
    const candidate = {
      name: data.name || 'N/A',
      username: data.login,
      location: data.location || 'N/A',
      avatar: data.avatar_url,
      email: data.email || 'N/A',
      html_url: data.html_url,
      company: data.company || 'N/A',
    };

    return candidate;
  } catch (err) {
    console.error('An error occurred', err);
    return {}; 
  }
};

export { searchGithub, searchGithubUser };

import { useEffect, useState } from 'react';
import {
  EXCLUDED_REPOS,
  FEATURED_REPOS,
  GITHUB_USERNAME,
} from '../data/githubConfig';

function sortRepos(repos) {
  return [...repos].sort((a, b) => {
    const aFeatured = FEATURED_REPOS.indexOf(a.name);
    const bFeatured = FEATURED_REPOS.indexOf(b.name);

    if (aFeatured !== -1 || bFeatured !== -1) {
      if (aFeatured === -1) return 1;
      if (bFeatured === -1) return -1;
      return aFeatured - bFeatured;
    }

    if (b.stargazers_count !== a.stargazers_count) {
      return b.stargazers_count - a.stargazers_count;
    }

    return new Date(b.updated_at) - new Date(a.updated_at);
  });
}

export function useGitHubRepos(limit = 8) {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchRepos() {
      try {
        const response = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
        );

        if (!response.ok) {
          throw new Error('GitHub API request failed');
        }

        const data = await response.json();
        const filtered = data.filter(
          (repo) =>
            !repo.fork &&
            !EXCLUDED_REPOS.includes(repo.name) &&
            repo.name !== `${GITHUB_USERNAME}`,
        );

        if (!cancelled) {
          setRepos(sortRepos(filtered).slice(0, limit));
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
          setRepos([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchRepos();

    return () => {
      cancelled = true;
    };
  }, [limit]);

  return { repos, loading, error };
}

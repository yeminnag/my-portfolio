import {
  GITHUB_PROFILE_URL,
  GITHUB_USERNAME,
  PROGRAMMING_DESCRIPTION,
  PROGRAMMING_TITLE,
} from '../data/githubConfig';
import { useGitHubRepos } from '../hooks/useGitHubRepos';

export default function GitHubProjects({ reverse = true }) {
  const { repos, loading, error } = useGitHubRepos(4);

  return (
    <section
      className={`project-section project-split${reverse ? ' project-split-reverse' : ''}`}
      id="programming-content"
    >
      <div className="section-text">
        <h2>{PROGRAMMING_TITLE}</h2>
        <p>{PROGRAMMING_DESCRIPTION}</p>
        <a
          className="github-profile-link"
          href={GITHUB_PROFILE_URL}
          target="_blank"
          rel="noreferrer"
        >
          <i className="fa-brands fa-github"></i>
          github.com/{GITHUB_USERNAME}
        </a>
      </div>

      <div className="section-media">
        {loading && (
          <p className="github-status">GitHub からプロジェクトを読み込み中...</p>
        )}
        {error && (
          <p className="github-status github-status-error">
            プロジェクトを読み込めませんでした。{' '}
            <a href={GITHUB_PROFILE_URL} target="_blank" rel="noreferrer">
              GitHub で見る
            </a>
          </p>
        )}

        {!loading && !error && (
          <div className="github-grid">
            {repos.map((repo) => (
              <a
                key={repo.id}
                className="github-card"
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
              >
                <div className="github-card-top">
                  <span className="github-card-name">{repo.name}</span>
                  {repo.language && (
                    <span className="github-card-lang">{repo.language}</span>
                  )}
                </div>
                <p className="github-card-desc">
                  {repo.description || '説明はありません。'}
                </p>
                <div className="github-card-meta">
                  {repo.stargazers_count > 0 && (
                    <span>
                      <i className="fa-regular fa-star"></i> {repo.stargazers_count}
                    </span>
                  )}
                  {repo.homepage && (
                    <span className="github-card-live">デモを見る</span>
                  )}
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

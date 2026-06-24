import { CONTACT_EMAIL, LINE_URL } from '../data/contactConfig';
import { GITHUB_PROFILE_URL } from '../data/githubConfig';

export default function Footer() {
  return (
    <section className="footer">
      <div className="social-contact">
        <ul>
          <li>
            <a href={GITHUB_PROFILE_URL} target="_blank" rel="noreferrer">
              <i className="fa-brands fa-github"></i>
              GitHub
            </a>
          </li>
          <li>
            <a href={`mailto:${CONTACT_EMAIL}`}>
              <i className="fa-solid fa-envelope"></i>
              Mail
            </a>
          </li>
          <li>
            <a href={LINE_URL} target="_blank" rel="noreferrer">
              <i className="fa-brands fa-line"></i>
              LINE
            </a>
          </li>
        </ul>
      </div>
      <div>
        LETS <span>WORK</span> TOGETHER!
      </div>
      <div>
        <p>© 2025 Ye Min Aung. All rights reserved.</p>
      </div>
    </section>
  );
}

import { Link } from 'react-router-dom';
import { useNavAnimation } from '../hooks/useNavAnimation';

export default function Nav() {
  useNavAnimation();

  return (
    <nav>
      <ul>
        <li>
          <p>
            <Link to="/about">
              <span className="scramble">About</span>
            </Link>
          </p>
        </li>
        <li>
          <Link className="navBtn" to="/">
            <span>ホーム</span>
          </Link>
        </li>
        <li>
          <Link className="navBtn" to="/projects">
            <span>プロジェクト</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

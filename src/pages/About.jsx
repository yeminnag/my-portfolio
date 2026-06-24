import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';
import { useAboutAnimations } from '../hooks/useAboutAnimations';

const aboutItems = [
  'Ye Min Aung（イエ　ミン　アウン）と申します。ミャンマー出身で、現在は読売理工医療福祉専門学校 ITエンジニア学科に在籍しております。',
  '日本語能力試験（JLPT）N1を取得しており、日本語での円滑なコミュニケーションが可能です。',
  'プログラミングとWebシステム開発に興味を持ち、React、JavaScript、Node.js、Supabaseなどの技術を用いた開発を学んでいます。学校での学習に加え、個人開発にも積極的に取り組み、企画から設計、実装、テストまでの一連の開発プロセスを経験しています。',
  '多国籍な環境で培った柔軟な対応力と学習意欲を強みとし、将来はフルスタックエンジニアとして幅広い技術領域で活躍できる人材を目指しています。',
];

export default function About() {
  useAboutAnimations();

  return (
    <>
      <section className="profile-wrapper">
        <div className="parallax-bg">
          <img src="/assets/profile.PNG" alt="Ye Min Aung" />
        </div>

        <div className="about-content">
          <h1 className="about-title">ABOUT ME</h1>
          <ul className="about-text">
            {aboutItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <ContactForm />
      </section>

      <Footer />
    </>
  );
}

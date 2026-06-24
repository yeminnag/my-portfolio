import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { useHomeAnimations } from '../hooks/useHomeAnimations';

const cards = [
  {
    id: 'photoshop',
    title: 'Photoshoping',
    link: '/projects#photoshop-content',
    description:
      '私は写真を編集したり、フォトショップを使ってデジタルアートを制作するのが大好きです。こちらは、私のフォトショップ作品の一部です。',
  },
  {
    id: 'illustration',
    title: 'Graphic Design',
    link: '/projects#illustration-content',
    description:
      'イラストレーションは、ビジュアルコミュニケーションにおいてとても重要です。私は以前、グラフィックデザイナーとして働いていました。こちらは、私のグラフィックデザイン作品の一部です。',
  },
  {
    id: 'blender',
    title: '3D modeling',
    link: '/projects#blender-content',
    description:
      'ゲーム制作を学び始めたことをきっかけに、3Dモデリングの魅力に惹かれるようになりました。3Dモデリング作品の制作には、Blenderを使用しています。こちらは、私の作品の一部です。',
  },
  {
    id: 'zbrush',
    title: '3D sculpting',
    link: '/projects#zbrush-content',
    description:
      'ZBrushを使用して、3Dモデルのスカルプトを学びました。絵を描くことが好きなので、キャラクターをスカルプトする時間はとても楽しかったです。こちらは、私のスカルプト作品です。',
  },
  {
    id: 'aftereffects',
    title: 'Video Editing',
    link: '/projects#aftereffects-content',
    description:
      '現在、動画編集を学んでいます。動画編集に挑戦するのは今回が初めてですが、全力で取り組んでいます。そして、この作業を本当に楽しんでいます。',
  },
  {
    id: 'programming',
    title: 'Programming',
    link: '/projects#programming-content',
    description:
      'React や Node.js で Web アプリを開発しています。出欠管理や学習タイマーなど、GitHub で公開中のプロジェクトがあります。',
  },
];

export default function Home() {
  const wrapperRef = useHomeAnimations();

  return (
    <>
      <section className="about-wrapper" ref={wrapperRef}>
        <div className="about">
          <h1 className="scramble">YE MIN</h1>
          <h1 className="scramble">AUNG</h1>
          <p>
            只今読売理工医療福祉専門学校でITエンジニア学科に
            在学中のミャンマー出身の留学生です。子供の時からコンピューターが
            好きで、遊びながら色々な作品も作りました。
            今目指したいのはバックエンドプログラマです。 <br />
          </p>
        </div>

        {cards.map((card) => (
          <div key={card.id} className="about card-wrap">
            {card.link ? (
              <Link to={card.link} className="card-link">
                <div className="card" id={card.id}></div>
              </Link>
            ) : (
              <div className="card" id={card.id}></div>
            )}
            <p className="card-text">
              {card.title} <br />
              <span style={{ fontSize: '12px', fontWeight: 300 }}>
                {card.description}
              </span>
            </p>
          </div>
        ))}
      </section>

      <Footer />
    </>
  );
}

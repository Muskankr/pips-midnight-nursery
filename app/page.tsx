
"use client";

import { useState } from "react";

const projects = [
  {
    number: "01",
    icon: "♫",
    title: "The Lullaby Lab",
    tag: "SOUND DESIGN",
    description:
      "Tiny music-box melodies for creatures whose dreams are taking a little too long to arrive.",
    detail: "Every note is a tiny blanket for a restless mind.",
    color: "pink",
  },
  {
    number: "02",
    icon: "☾",
    title: "Nightlight Collection",
    tag: "LIGHT ENGINEERING",
    description:
      "Handcrafted moon lamps that turn the darkest corners into soft, safe places to dream.",
    detail: "Warm light. Brave little hearts. Zero scary shadows.",
    color: "blue",
  },
  {
    number: "03",
    icon: "✦",
    title: "Dream Delivery",
    tag: "NIGHT LOGISTICS",
    description:
      "A carefully planned route across sleepy rooftops, cloud bridges, and the occasional comet.",
    detail: "Current mission: 12 dreams waiting for delivery!",
    color: "yellow",
  },
];

export default function Home() {
  const [night, setNight] = useState(true);
  const [muted, setMuted] = useState(true);
  const [secret, setSecret] = useState(false);
  const [starClicks, setStarClicks] = useState(0);
  const [message, setMessage] = useState("You're right on time, dreamer.");
  const [playing, setPlaying] = useState(false);
  const [dream, setDream] = useState(
  "Your next dream is waiting to be discovered..."
);
const [dreamCount, setDreamCount] = useState(0);

const dreamPlaces = [
  "a moonlit library where the books whisper kind secrets",
  "a cotton-candy planet with tiny dancing stars",
  "a cloud train travelling through a lavender galaxy",
  "an underwater palace where jellyfish glow like lanterns",
  "a sleepy forest where fireflies tell bedtime stories",
  "a tiny rooftop café visited by friendly constellations",
];

const dreamCompanions = [
  "a brave little cloud fox",
  "a sleepy dragon who sneezes glitter",
  "a moon rabbit carrying a pocket watch",
  "a tiny astronaut made of stardust",
  "a friendly ghost who collects wishes",
  "a star kitten with a constellation-shaped tail",
];

const dreamGifts = [
  "a lantern that makes worries shrink",
  "a music box that remembers happy moments",
  "a jar filled with tomorrow's first sunrise",
  "a blanket woven from shooting-star trails",
  "a compass pointing toward forgotten wishes",
  "a tiny key that opens doors to good memories",
];

function createDream() {
  const pick = (items: string[]) =>
    items[Math.floor(Math.random() * items.length)];

  setDream(
    `Tonight, you will visit ${pick(dreamPlaces)}, meet ${pick(
      dreamCompanions
    )}, and receive ${pick(dreamGifts)}. Remember: even the smallest dream can hold a little magic.`
  );

  setDreamCount((count) => count + 1);
  setMessage("Pip has delivered a brand-new dream just for you. ✨");
  chime();
}

  function chime() {
    if (muted) return;
    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as Window & { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();
      oscillator.type = "sine";
      oscillator.frequency.value = 660;
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
      oscillator.connect(gain);
      gain.connect(ctx.destination);
      oscillator.start();
      oscillator.stop(ctx.currentTime + 0.35);
      oscillator.onended = () => void ctx.close();
    } catch {
      // Audio is optional; the website still works without it.
    }
  }

  function discoverSecret() {
    const next = starClicks + 1;
    setStarClicks(next);
    chime();
    if (next >= 5) {
      setSecret(true);
      setMessage("You found my secret! You deserve the softest dreams.");
    } else {
      setMessage(`A little star twinkles... ${5 - next} more to go!`);
    }
  }

  function playLullaby() {
    if (playing) {
      setPlaying(false);
      setMessage("The music box is resting. Sweet dreams!");
      return;
    }
    setPlaying(true);
    setMessage("A tiny melody for your journey. Tap again to stop.");
    if (!muted) {
      [523.25, 659.25, 783.99, 659.25].forEach((frequency, index) => {
        window.setTimeout(() => {
          if (muted) return;
          try {
            const AC =
              window.AudioContext ||
              (window as Window & { webkitAudioContext?: typeof AudioContext })
                .webkitAudioContext;
            if (!AC) return;
            const ctx = new AC();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.frequency.value = frequency;
            gain.gain.setValueAtTime(0.04, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(
              0.001,
              ctx.currentTime + 0.3
            );
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.3);
            osc.onended = () => void ctx.close();
          } catch {
            // Keep the controls usable if browser audio is unavailable.
          }
        }, index * 350);
      });
    }
  }

  return (
    <main className={night ? "site night" : "site dawn"}>
      <div className="stars" aria-hidden="true">
        ✦　·　　 ✧　　　 ·　✦　　　 ˚
      </div>

      <nav className="nav">
        <a className="brand" href="#home">
          <span className="brand-icon">☾</span> midnight nursery
          <span className="tiny-label">® DREAMS DIVISION</span>
        </a>
        <div className="nav-links">
          <a href="#work">THE WORK</a>
          <a href="#story">MY STORY</a>
          <button
            className="nav-button"
            onClick={() => setNight(!night)}
            aria-label="Toggle day and night theme"
          >
            {night ? "☀ DAWN MODE" : "☾ NIGHT MODE"}
          </button>
          <button
            className="nav-button"
            onClick={() => setMuted(!muted)}
            aria-label={muted ? "Enable sound" : "Mute sound"}
          >
            {muted ? "♫ SOUND OFF" : "♫ SOUND ON"}
          </button>
        </div>
      </nav>

      <section className="hero" id="home">
        <div className="hero-copy">
          <div className="pill">
            <span className="live-dot" /> JUNIOR DREAM ENGINEER · ONLINE
          </div>
          <p className="eyebrow">WELCOME, SLEEPYHEAD!</p>
          <h1>
            Dreams are
            <br />
            <span>under</span> construction<span className="blink">_</span>
          </h1>
          <p className="hero-text">
            I'm Pip. I build tiny, wonderful dreams for the little creatures
            who need a softer place to land.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#work">
              EXPLORE MY DREAMS <span>↗</span>
            </a>
            <button className="text-button" onClick={playLullaby}>
              {playing ? "Ⅱ PAUSE THE MUSIC" : "♫ WIND MY MUSIC BOX"}
            </button>
          </div>
          <div className="status">
            <span>✳ CURRENT STATUS</span>
            <strong>Dreaming up something nice.</strong>
          </div>
        </div>

        <div className="character-panel">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <span className="float-star star-one">✦</span>
          <span className="float-star star-two">✧</span>
          <span className="float-star star-three">✳</span>
          <div className="image-frame">
            <img
              src="/images/pip.png"
              alt="Pip, a friendly skull-faced baby wearing a starry nightcap, floating on a cloud"
              className="pip-image"
            />
          </div>
          <div className="character-label">
            <span>✦ SAY HELLO TO</span>
            <strong>Pip <span className="heart">♥</span></strong>
            <small>Certified little dreamer</small>
          </div>
          <button className="secret-star" onClick={discoverSecret}>
            ✦
          </button>
        </div>
        <div className="hero-bottom">
          <span>SCROLL TO EXPLORE ↓</span>
          <span>EST. SOMEWHERE BETWEEN A YAWN & A WISH</span>
        </div>
      </section>

      <section className="work section" id="work">
        <div className="section-heading">
          <div>
            <p className="eyebrow">✳ THE LITTLE THINGS I MAKE</p>
            <h2>A portfolio of <span>sweet dreams.</span></h2>
          </div>
          <p className="section-note">
            Small projects, made with a big amount of love and approximately
            three cups of imaginary cocoa.
          </p>
        </div>

        <div className="project-grid">
          {projects.map((project) => (
            <article className={`project-card ${project.color}`} key={project.number}>
              <div className="project-top">
                <span className="project-number">/{project.number}</span>
                <span className="project-icon">{project.icon}</span>
              </div>
              {project.number === "01" && (
                <img className="project-art music-art" src="/images/musicbox.png" alt="Pastel dream music box" />
              )}
              {project.number === "02" && (
                <img className="project-art" src="/images/lantern.png" alt="Glowing moon-shaped dream lantern" />
              )}
              {project.number === "03" && (
                <div className="map-art" aria-label="Illustrated dream delivery route">
                  <span>⌂</span><i>〰〰〰</i><span>☾</span><i>〰〰〰</i><span>✦</span>
                </div>
              )}
              <p className="project-tag">{project.tag}</p>
              <h3>{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <button
                className="project-link"
                onClick={() => {
                  setMessage(project.detail);
                  chime();
                }}
              >
                DISCOVER THE MAGIC ↗
              </button>
            </article>
          ))}
        </div>
        <div className="message-bar" role="status">
          <span>✧ A NOTE FROM PIP</span>
          <p>{message}</p>
        </div>
      </section>

      <section className="story section" id="story">
        
      <section className="dream-lab section" id="dream-lab">
        <p className="eyebrow">✳ PIP'S LATEST INVENTION</p>
        <h2>Welcome to the <span>Dream-o-Matic.</span></h2>
        <p className="dream-intro">
          Every sleepy visitor deserves a little magic.
          Let Pip invent a brand-new dream just for you.
        </p>

        <div className="dream-machine">
          <div className="dream-machine-art" aria-hidden="true">
            <span>☾</span>
            <i>✦</i>
            <i>✧</i>
            <i>✳</i>
          </div>

          <div className="dream-output" aria-live="polite">
            <span>✧ YOUR DREAM TRANSMISSION</span>
            <p>{dream}</p>
          </div>

          <button
            className="primary-button dream-button"
            onClick={createDream}
          >
            ✦ {dreamCount === 0 ? "GENERATE MY DREAM" : "DREAM AGAIN"} ↗
          </button>

          <p className="dream-counter">
            DREAMS CREATED THIS VISIT: {dreamCount}
          </p>
        </div>
      </section>

        <p className="eyebrow">✳ A LITTLE BACKSTORY</p>
        <h2>Every dream has a <span>beginning.</span></h2>
        <div className="timeline">
          <article className="story-step">
            <div className="story-symbol">☁</div>
            <div><span>CHAPTER 01 · THE ARRIVAL</span><h3>A baby on a cloud.</h3><p>I woke up in the Midnight Nursery with a tiny hat, a curious heart, and no idea why the stars were giggling.</p></div>
          </article>
          <article className="story-step">
            <div className="story-symbol">☾</div>
            <div><span>CHAPTER 02 · THE DISCOVERY</span><h3>A light in the dark.</h3><p>One sleepy neighbor couldn't find a peaceful dream. I built a little lantern, hummed a lullaby, and watched their worries turn into stars.</p></div>
          </article>
          <article className="story-step">
            <div className="story-symbol">✦</div>
            <div><span>CHAPTER 03 · THE JOURNEY</span><h3>More dreams to deliver.</h3><p>Now I travel from rooftop to rooftop, making bedtime kinder for every tiny creature I meet. Tomorrow? The whole universe, perhaps.</p></div>
          </article>
        </div>
      </section>

      <section className="guest section">
        <div className="guest-card">
          <span className="guest-moon">☾</span>
          <p className="eyebrow">BEFORE YOU FLOAT AWAY</p>
          <h2>Leave with a little <span>stardust.</span></h2>
          <p>May your pillow be cool, your worries be small, and your dreams be wonderfully weird.</p>
          <a className="primary-button" href="#home">BACK TO THE TOP ↑</a>
          {secret && (
            <div className="secret-message">
              <span>✧ SECRET DREAM UNLOCKED ✧</span>
              <p>You are made of stardust, brave ideas, and the magic of beginning. Keep building, dreamer. ♡</p>
            </div>
          )}
        </div>
      </section>

      <footer className="footer">
        <div><span className="brand-icon">☾</span> MIDNIGHT NURSERY <span>© 2026 · PIP'S DREAM DEPARTMENT</span></div>
        <p>Made with tiny hands, sleepy eyes & a whole lot of heart.</p>
        <small>
          ART CREDITS: Pip waving on cloud, Lullaby Lab music box, and Dream
          Nightlight Lantern — official haX.baby Track 1 asset pack.
          Character canon and challenge by haX.baby. No audio files used;
          sound effects are synthesized with the Web Audio API.
        </small>
      </footer>
    </main>
  );
}

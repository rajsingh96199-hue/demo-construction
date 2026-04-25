import { useEffect, useMemo, useRef, useState } from "react";

const whatsappLink =
  "https://wa.me/919999999999?text=Hello%20Ironcrest%20Construction,%20I%20want%20to%20discuss%20my%20project.";

const services = [
  {
    title: "Residential Development",
    text: "Luxury villas, gated communities, and urban residences delivered with structural rigor and timeless detailing.",
    accent: "Precision Housing",
    icon: (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <path d="M11 53h42v-4L32 15 11 49Zm10-8 11-18 11 18Z" />
      </svg>
    ),
  },
  {
    title: "Commercial Construction",
    text: "Corporate headquarters, office campuses, and mixed-use spaces designed for scale, prestige, and performance.",
    accent: "Corporate Grade",
    icon: (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <path d="M16 52h32V12H16Zm8-8v-8h6v8Zm0-14v-8h6v8Zm10 14v-8h6v8Zm0-14v-8h6v8Z" />
      </svg>
    ),
  },
  {
    title: "Renovation & Restoration",
    text: "Complex structural upgrades and modern transformations executed without compromising business continuity.",
    accent: "Adaptive Expertise",
    icon: (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <path d="m45 18 4 4-7 7-4-4ZM18 42l16-16 4 4-16 16h-4Z M15 45h10v4H15z" />
      </svg>
    ),
  },
  {
    title: "Interior Fit-Out",
    text: "High-spec interiors that align architecture, brand identity, and day-to-day usability into one cohesive result.",
    accent: "Refined Delivery",
    icon: (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <path d="M12 18h40v28H12Zm6 6v16h28V24Zm32 0h2v16h-2Z" />
      </svg>
    ),
  },
];

const projects = [
  {
    title: "North Axis Tower",
    type: "Commercial",
    category: "commercial",
    location: "Mumbai Business District",
    description: "A signature office tower combining high-efficiency glazing, premium lobby experiences, and accelerated delivery planning.",
    imageClass: "project-card__image--tower",
  },
  {
    title: "Westfield Residences",
    type: "Residential",
    category: "residential",
    location: "Pune Urban Edge",
    description: "A multi-block residential community focused on elegant facades, resident comfort, and long-term durability.",
    imageClass: "project-card__image--residence",
  },
  {
    title: "Vertex Innovation Campus",
    type: "Commercial",
    category: "commercial",
    location: "Bengaluru Tech Corridor",
    description: "Flexible collaborative spaces built for future-ready businesses, fast occupancy, and premium brand presence.",
    imageClass: "project-card__image--campus",
  },
  {
    title: "Summit Villa Collection",
    type: "Residential",
    category: "residential",
    location: "Goa Coastal Estate",
    description: "Architect-led villas with material warmth, clean geometry, and seamless indoor-outdoor living experiences.",
    imageClass: "project-card__image--villa",
  },
  {
    title: "Harborfront Hotel",
    type: "Commercial",
    category: "commercial",
    location: "Waterfront Hospitality Zone",
    description: "A hospitality destination built for high footfall, premium finishes, and operational resilience.",
    imageClass: "project-card__image--hotel",
  },
  {
    title: "Oakline Estate",
    type: "Residential",
    category: "residential",
    location: "Ahmedabad Premium Enclave",
    description: "A private estate collection balancing family-focused planning, privacy, and elegant contemporary form.",
    imageClass: "project-card__image--estate",
  },
];

const metrics = [
  {
    label: "Years of Experience",
    target: 25,
    suffix: "+",
    icon: (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <path d="M32 12a20 20 0 1 0 20 20A20 20 0 0 0 32 12Zm0 36a16 16 0 1 1 16-16A16 16 0 0 1 32 48Zm2-25h-4v11l9 6 2-3-7-5Z" />
      </svg>
    ),
  },
  {
    label: "Projects Completed",
    target: 340,
    suffix: "+",
    icon: (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <path d="M14 50h36v-4H14Zm4-8h8V18h-8Zm12 0h8V10h-8Zm12 0h8V26h-8Z" />
      </svg>
    ),
  },
  {
    label: "Corporate Clients",
    target: 120,
    suffix: "+",
    icon: (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <path d="M22 30a8 8 0 1 0-8-8 8 8 0 0 0 8 8Zm20 0a8 8 0 1 0-8-8 8 8 0 0 0 8 8ZM22 34C15.4 34 10 38.3 10 43.5V48h24v-4.5C34 38.3 28.6 34 22 34Zm20 0a15.5 15.5 0 0 0-5.3.9 14.2 14.2 0 0 1 5.3 10.6V48h12v-4.5C54 38.3 48.6 34 42 34Z" />
      </svg>
    ),
  },
  {
    label: "Safety Commitment",
    target: 100,
    suffix: "%",
    icon: (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <path d="M32 10 8 20v12c0 13.2 10.2 25.6 24 28 13.8-2.4 24-14.8 24-28V20Zm0 45.8C20.7 53.2 12 42.6 12 32V22.8l20-8.3 20 8.3V32c0 10.6-8.7 21.2-20 23.8Z" />
      </svg>
    ),
  },
];

const processSteps = [
  {
    number: "01",
    title: "Strategic Planning",
    text: "We align budgets, schedules, design intent, and site realities before execution begins.",
  },
  {
    number: "02",
    title: "Disciplined Execution",
    text: "Every stage is managed through coordinated teams, transparent milestones, and on-site control.",
  },
  {
    number: "03",
    title: "Premium Delivery",
    text: "We finish with inspection-led quality, refined detailing, and handover standards that inspire confidence.",
  },
];

const testimonials = [
  {
    quote:
      "Ironcrest brought executive-level discipline to our headquarters project. The experience felt premium from the first meeting to final delivery.",
    author: "Daniel Mercer",
    role: "Managing Director, Axis Developments",
  },
  {
    quote:
      "Their ability to combine speed, finish quality, and clear communication made them feel like a true delivery partner, not just a contractor.",
    author: "Sophia Bennett",
    role: "Founder, Bennett Living",
  },
  {
    quote:
      "We trusted them with a complex renovation and they handled every challenge with structure, transparency, and impressive attention to detail.",
    author: "Rahul Mehta",
    role: "Operations Head, Harborfront Hospitality",
  },
];

const partnerLogos = ["Atlas Group", "UrbanCore", "PrimeSpan", "SteelGrid", "Aurex"];

function App() {
  const [loading, setLoading] = useState(true);
  const [navOpen, setNavOpen] = useState(false);
  const [navSolid, setNavSolid] = useState(false);
  const [filter, setFilter] = useState("all");
  const [slide, setSlide] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [visibleMap, setVisibleMap] = useState({});
  const [counterValues, setCounterValues] = useState(() => metrics.map(() => 0));
  const [heroShift, setHeroShift] = useState(0);
  const observedRef = useRef([]);
  const counterStarted = useRef(new Set());
  const sliderTimer = useRef(null);

  const filteredProjects = useMemo(() => {
    return filter === "all" ? projects : projects.filter((project) => project.category === filter);
  }, [filter]);

  useEffect(() => {
    document.body.classList.add("is-loading");
    const timer = window.setTimeout(() => {
      document.body.classList.remove("is-loading");
      setLoading(false);
    }, 900);

    return () => {
      document.body.classList.remove("is-loading");
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      setNavSolid(currentY > 30);
      setHeroShift(currentY * 0.2);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const revealKey = entry.target.dataset.reveal;
          if (revealKey) {
            setVisibleMap((current) => ({ ...current, [revealKey]: true }));
          }

          const counterIndex = entry.target.dataset.counterIndex;
          if (counterIndex && !counterStarted.current.has(counterIndex)) {
            counterStarted.current.add(counterIndex);
            animateCounter(Number(counterIndex));
          }

          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.18 }
    );

    observedRef.current.forEach((node) => {
      if (node) {
        observer.observe(node);
      }
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    sliderTimer.current = window.setInterval(() => {
      setSlide((current) => (current + 1) % testimonials.length);
    }, 5400);

    return () => {
      window.clearInterval(sliderTimer.current);
    };
  }, []);

  const animateCounter = (index) => {
    const target = metrics[index].target;
    const start = performance.now();
    const duration = 1500;

    const frame = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      const nextValue = Math.floor(target * eased);

      setCounterValues((current) => {
        const copy = [...current];
        copy[index] = nextValue;
        return copy;
      });

      if (progress < 1) {
        window.requestAnimationFrame(frame);
      }
    };

    window.requestAnimationFrame(frame);
  };

  const registerReveal = (key, counterIndex = null) => (node) => {
    if (!node) {
      return;
    }
    node.dataset.reveal = key;
    if (counterIndex !== null) {
      node.dataset.counterIndex = String(counterIndex);
    }
    observedRef.current.push(node);
  };

  const visible = (key) => (visibleMap[key] ? " is-visible" : "");

  const heroClass = (extra = "") => `reveal${extra ? ` ${extra}` : ""}${loading ? "" : " is-visible"}`;

  const changeSlide = (next) => {
    setSlide((next + testimonials.length) % testimonials.length);
    if (sliderTimer.current) {
      window.clearInterval(sliderTimer.current);
    }
    sliderTimer.current = window.setInterval(() => {
      setSlide((current) => (current + 1) % testimonials.length);
    }, 5400);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    const form = event.currentTarget;

    window.setTimeout(() => {
      form.reset();
      setSubmitted(false);
    }, 1800);
  };

  return (
    <>
      <div className={`preloader${loading ? "" : " is-hidden"}`} aria-hidden="true">
        <div className="preloader__inner">
          <div className="preloader__mark">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <p>Ironcrest Construction</p>
        </div>
      </div>

      <div className="page-noise" aria-hidden="true"></div>

      <div className="site-shell">
        <nav className={`navbar${navSolid ? " is-solid" : ""}`}>
          <a href="#home" className="brand" aria-label="Ironcrest Construction">
            <span className="brand__icon"></span>
            <span className="brand__text">
              <strong>Ironcrest</strong>
              <small>Construction Group</small>
            </span>
          </a>

          <button
            className="nav-toggle"
            type="button"
            aria-expanded={navOpen}
            aria-label="Open navigation"
            onClick={() => setNavOpen((current) => !current)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <div className={`nav-links${navOpen ? " is-open" : ""}`}>
            {["About", "Services", "Projects", "Why Us", "Contact"].map((label) => {
              const href = `#${label.toLowerCase().replace(" ", "-")}`;
              return (
                <a key={label} href={href} onClick={() => setNavOpen(false)}>
                  {label}
                </a>
              );
            })}
            <a
              href={whatsappLink}
              className="nav-links__cta"
              target="_blank"
              rel="noreferrer"
              onClick={() => setNavOpen(false)}
            >
              WhatsApp Us
            </a>
          </div>
        </nav>

        <header className="hero" id="home">
          <div
            className="hero__media"
            style={{ transform: `scale(1.08) translate3d(0, ${heroShift}px, 0)` }}
          ></div>
          <div className="hero__overlay"></div>
          <div className="hero__grid"></div>
          <div className="hero__orb hero__orb--one"></div>
          <div className="hero__orb hero__orb--two"></div>

          <div className="container hero__layout">
            <div className="hero__content">
              <div className={heroClass("hero__eyebrow")}>
                Legacy craftsmanship. Modern execution. Corporate-grade trust.
              </div>
              <h1 className={heroClass("delay-1")}>
                Building bold spaces with strength, precision, and premium discipline.
              </h1>
              <p className={heroClass("hero__copy delay-2")}>
                Ironcrest delivers high-end construction experiences for residential,
                commercial, and transformational projects with elevated design sense,
                schedule control, and measurable reliability.
              </p>
              <div className={heroClass("hero__actions delay-3")}>
                <a href="#contact" className="button button--primary">
                  Get a Quote
                </a>
                <a href="#projects" className="button button--secondary">
                  Explore Projects
                </a>
                <a href={whatsappLink} target="_blank" rel="noreferrer" className="button button--ghost">
                  Chat on WhatsApp
                </a>
              </div>
              <div className={heroClass("hero__stats delay-4")}>
                <article>
                  <strong>25+</strong>
                  <span>Years of Expertise</span>
                </article>
                <article>
                  <strong>340+</strong>
                  <span>Projects Delivered</span>
                </article>
                <article>
                  <strong>98%</strong>
                  <span>Repeat Client Confidence</span>
                </article>
              </div>
            </div>

            <aside className={heroClass("hero__panel delay-4")}>
              <span className="section-tag">Executive Snapshot</span>
              <h2>Premium construction delivery for clients who expect certainty.</h2>
              <ul className="hero__panel-list">
                <li>Dedicated site governance and milestone visibility</li>
                <li>High-spec material standards with refined finishes</li>
                <li>Residential, corporate, hospitality, and renovation expertise</li>
              </ul>
            </aside>
          </div>
        </header>

        <section className="partners">
          <div className="container partners__inner">
            <span className="partners__label">Trusted by development and infrastructure teams</span>
            <div className="partners__rail">
              {partnerLogos.map((name) => (
                <span key={name}>{name}</span>
              ))}
            </div>
          </div>
        </section>

        <main>
          <section className="section about" id="about">
            <div className="container split-grid split-grid--feature">
              <div ref={registerReveal("about-media")} className={`about__media section-reveal${visible("about-media")}`}>
                <div className="about__card about__card--large">
                  <div className="about__image about__image--main"></div>
                </div>
                <div className="about__card about__card--floating">
                  <div className="about__image about__image--secondary"></div>
                  <div className="about__floating-copy">
                    <strong>Execution-first mindset</strong>
                    <span>Built around timelines, safety, and finish quality.</span>
                  </div>
                </div>
              </div>

              <div ref={registerReveal("about-copy")} className={`section-copy section-reveal${visible("about-copy")}`}>
                <span className="section-tag">About Us</span>
                <h2>We shape confidence through disciplined construction leadership.</h2>
                <p>
                  The upgraded Ironcrest experience is built to feel established, refined, and
                  deeply trustworthy. Every project is approached with the mindset of a premium
                  delivery partner: strategic planning, on-site control, transparent reporting,
                  and craftsmanship that holds its value over time.
                </p>
                <div className="about__highlights">
                  <article>
                    <strong>End-to-end control</strong>
                    <p>From pre-construction coordination to final handover, we keep execution aligned and visible.</p>
                  </article>
                  <article>
                    <strong>Design-sensitive building</strong>
                    <p>We combine structural rigor with aesthetic precision to elevate both performance and perception.</p>
                  </article>
                  <article>
                    <strong>Client-first communication</strong>
                    <p>Clear milestones, proactive updates, and dependable accountability at every phase.</p>
                  </article>
                </div>
              </div>
            </div>
          </section>

          <section className="section services" id="services">
            <div className="container">
              <div ref={registerReveal("services-heading")} className={`section-heading section-reveal${visible("services-heading")}`}>
                <span className="section-tag">Services</span>
                <h2>A sharper, more premium service presentation for serious projects.</h2>
                <p>
                  Each service is presented with clearer positioning, stronger messaging, and a
                  more corporate visual treatment so the entire website feels closer to a final
                  client-facing brand platform.
                </p>
              </div>

              <div className="service-grid">
                {services.map((service, index) => (
                  <article
                    key={service.title}
                    ref={registerReveal(`service-${index}`)}
                    className={`service-card section-reveal${visible(`service-${index}`)}`}
                    style={{ transitionDelay: `${index * 70}ms` }}
                  >
                    <span className="service-card__accent">{service.accent}</span>
                    <div className="service-card__icon">{service.icon}</div>
                    <h3>{service.title}</h3>
                    <p>{service.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="section projects" id="projects">
            <div className="container">
              <div className="projects__heading-row">
                <div ref={registerReveal("projects-heading")} className={`section-heading section-reveal${visible("projects-heading")}`}>
                  <span className="section-tag">Projects</span>
                  <h2>Portfolio presentation redesigned to feel larger, cleaner, and more premium.</h2>
                </div>

                <div ref={registerReveal("projects-filters")} className={`project-filters section-reveal${visible("projects-filters")}`}>
                  {[
                    { label: "All", value: "all" },
                    { label: "Residential", value: "residential" },
                    { label: "Commercial", value: "commercial" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      className={`filter-button${filter === option.value ? " is-active" : ""}`}
                      onClick={() => setFilter(option.value)}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="project-grid">
                {filteredProjects.map((project, index) => (
                  <article
                    key={project.title}
                    ref={registerReveal(`project-${project.title}`)}
                    className={`project-card section-reveal${visible(`project-${project.title}`)}`}
                    style={{ transitionDelay: `${index * 60}ms` }}
                  >
                    <div className={`project-card__image ${project.imageClass}`}></div>
                    <div className="project-card__overlay">
                      <div className="project-card__meta">
                        <span>{project.type}</span>
                        <small>{project.location}</small>
                      </div>
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="section why-us" id="why-us">
            <div className="container">
              <div ref={registerReveal("why-heading")} className={`section-heading section-reveal${visible("why-heading")}`}>
                <span className="section-tag">Why Choose Us</span>
                <h2>More trust signals, stronger proof points, and a cleaner premium narrative.</h2>
              </div>

              <div className="metrics-grid">
                {metrics.map((metric, index) => (
                  <article
                    key={metric.label}
                    ref={registerReveal(`metric-${index}`, index)}
                    className={`metric-card section-reveal${visible(`metric-${index}`)}`}
                    style={{ transitionDelay: `${index * 70}ms` }}
                  >
                    <div className="metric-card__icon">{metric.icon}</div>
                    <strong>
                      {counterValues[index]}
                      {metric.suffix}
                    </strong>
                    <span>{metric.label}</span>
                  </article>
                ))}
              </div>

              <div className="process-grid">
                {processSteps.map((step, index) => (
                  <article
                    key={step.number}
                    ref={registerReveal(`process-${index}`)}
                    className={`process-card section-reveal${visible(`process-${index}`)}`}
                    style={{ transitionDelay: `${index * 70}ms` }}
                  >
                    <span>{step.number}</span>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="section testimonials" id="testimonials">
            <div className="container testimonial-layout">
              <div ref={registerReveal("testimonials-copy")} className={`section-copy section-reveal${visible("testimonials-copy")}`}>
                <span className="section-tag">Testimonials</span>
                <h2>Social proof upgraded to feel calmer, sharper, and more credible.</h2>
                <p>
                  The testimonial presentation now supports the premium tone of the website with
                  more breathing room, better hierarchy, and a smoother interaction pattern.
                </p>
              </div>

              <div ref={registerReveal("testimonial-slider")} className={`testimonial-slider section-reveal${visible("testimonial-slider")}`}>
                <div className="testimonial-track">
                  {testimonials.map((testimonial, index) => (
                    <article
                      key={testimonial.author}
                      className={`testimonial-card${slide === index ? " is-active" : ""}`}
                    >
                      <p>&ldquo;{testimonial.quote}&rdquo;</p>
                      <div className="testimonial-card__person">
                        <strong>{testimonial.author}</strong>
                        <span>{testimonial.role}</span>
                      </div>
                    </article>
                  ))}
                </div>

                <div className="slider-controls">
                  <button type="button" className="slider-button" onClick={() => changeSlide(slide - 1)}>
                    ‹
                  </button>
                  <div className="slider-dots">
                    {testimonials.map((item, index) => (
                      <button
                        key={item.author}
                        type="button"
                        className={slide === index ? "is-active" : ""}
                        onClick={() => changeSlide(index)}
                        aria-label={`Go to testimonial ${index + 1}`}
                      ></button>
                    ))}
                  </div>
                  <button type="button" className="slider-button" onClick={() => changeSlide(slide + 1)}>
                    ›
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="section contact" id="contact">
            <div className="container contact-grid">
              <div ref={registerReveal("contact-copy")} className={`section-copy section-reveal${visible("contact-copy")}`}>
                <span className="section-tag">Contact</span>
                <h2>Contact experience upgraded for faster conversion and a stronger executive feel.</h2>
                <p>
                  The inquiry area is designed to feel cleaner and more reassuring, while still
                  giving visitors multiple ways to start a conversation immediately.
                </p>

                <div className="contact-info">
                  <div>
                    <strong>Office</strong>
                    <span>18 Skyline Avenue, Business District, Mumbai</span>
                  </div>
                  <div>
                    <strong>Email</strong>
                    <span>hello@ironcrestbuild.com</span>
                  </div>
                  <div>
                    <strong>Phone</strong>
                    <span>+91 22 5555 0147</span>
                  </div>
                  <div>
                    <strong>WhatsApp</strong>
                    <a href={whatsappLink} target="_blank" rel="noreferrer" className="contact-link">
                      Start Instant Chat
                    </a>
                  </div>
                </div>

                <div className="contact-promo">
                  <strong>Need a quicker response?</strong>
                  <p>Use WhatsApp for direct project discussions, quick quote requests, and early consultation.</p>
                  <a href={whatsappLink} target="_blank" rel="noreferrer" className="button button--primary">
                    Open WhatsApp
                  </a>
                </div>
              </div>

              <form
                ref={registerReveal("contact-form")}
                className={`contact-form section-reveal${visible("contact-form")}`}
                onSubmit={handleSubmit}
              >
                <div className="form-row">
                  <label>
                    <span>Full Name</span>
                    <input type="text" placeholder="Your name" />
                  </label>
                  <label>
                    <span>Email Address</span>
                    <input type="email" placeholder="your@email.com" />
                  </label>
                </div>
                <div className="form-row">
                  <label>
                    <span>Project Type</span>
                    <select defaultValue="Residential">
                      <option>Residential</option>
                      <option>Commercial</option>
                      <option>Renovation</option>
                      <option>Interior Fit-Out</option>
                    </select>
                  </label>
                  <label>
                    <span>Budget Range</span>
                    <input type="text" placeholder="Approximate budget" />
                  </label>
                </div>
                <label>
                  <span>Project Details</span>
                  <textarea rows="6" placeholder="Tell us about your vision, site status, and expected timeline"></textarea>
                </label>
                <button type="submit" className="button button--primary button--full" disabled={submitted}>
                  {submitted ? "Inquiry Sent" : "Send Inquiry"}
                </button>
              </form>
            </div>
          </section>
        </main>

        <footer className="footer">
          <div className="container footer__inner">
            <div className="footer__brand">
              <h3>Ironcrest Construction</h3>
              <p>
                Premium construction experiences shaped by strategy, craftsmanship, and dependable execution.
              </p>
            </div>
            <div className="footer__links">
              <a href="#about">About</a>
              <a href="#services">Services</a>
              <a href="#projects">Projects</a>
              <a href="#contact">Contact</a>
            </div>
            <div className="footer__socials">
              <a href={whatsappLink} target="_blank" rel="noreferrer">
                WhatsApp
              </a>
              <a href="#">LinkedIn</a>
              <a href="#">Instagram</a>
            </div>
          </div>
        </footer>

        <a href={whatsappLink} target="_blank" rel="noreferrer" className="whatsapp-float" aria-label="Chat on WhatsApp">
          <svg viewBox="0 0 32 32" aria-hidden="true">
            <path d="M19.11 17.27c-.29-.15-1.72-.85-1.98-.94-.27-.1-.46-.15-.66.15-.19.29-.76.94-.93 1.13-.17.2-.34.22-.63.08-.29-.15-1.24-.46-2.36-1.46-.87-.77-1.46-1.73-1.64-2.03-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.2-.29.29-.49.1-.2.05-.37-.02-.51-.08-.15-.66-1.59-.9-2.18-.24-.57-.49-.49-.66-.49h-.56c-.2 0-.51.08-.78.37s-1.02 1-1.02 2.44 1.05 2.83 1.2 3.02c.15.2 2.05 3.12 4.97 4.37.7.3 1.24.47 1.66.6.7.22 1.33.19 1.83.12.56-.08 1.72-.7 1.96-1.39.24-.68.24-1.27.17-1.39-.07-.12-.27-.2-.56-.34Z" />
            <path d="M27.29 4.69A15.8 15.8 0 0 0 16.01 0C7.18 0 .01 7.16.01 15.99c0 2.82.74 5.58 2.14 8.01L0 32l8.23-2.14a15.94 15.94 0 0 0 7.77 1.98h.01c8.82 0 15.99-7.17 15.99-16 0-4.27-1.66-8.28-4.71-11.15Zm-11.28 24.5h-.01a13.2 13.2 0 0 1-6.73-1.85l-.48-.28-4.89 1.27 1.31-4.76-.31-.49a13.2 13.2 0 0 1-2.04-7.08C2.86 8.72 8.73 2.86 16 2.86c3.52 0 6.83 1.36 9.31 3.84a13.08 13.08 0 0 1 3.83 9.31c0 7.27-5.87 13.18-13.13 13.18Z" />
          </svg>
          <span>WhatsApp</span>
        </a>
      </div>
    </>
  );
}

export default App;

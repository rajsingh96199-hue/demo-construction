import { useEffect, useMemo, useRef, useState } from "react";

const services = [
  {
    title: "Residential",
    text: "Luxury residences and communities built with detail, comfort, and structural integrity in mind.",
    icon: (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <path d="M11 53h42v-4L32 15 11 49Zm10-8 11-18 11 18Z" />
      </svg>
    ),
  },
  {
    title: "Commercial",
    text: "Corporate spaces, office complexes, and mixed-use developments executed to premium standards.",
    icon: (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <path d="M16 52h32V12H16Zm8-8v-8h6v8Zm0-14v-8h6v8Zm10 14v-8h6v8Zm0-14v-8h6v8Z" />
      </svg>
    ),
  },
  {
    title: "Renovation",
    text: "Complex upgrades, modernization programs, and structural refreshes with minimal disruption.",
    icon: (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <path d="m45 18 4 4-7 7-4-4ZM18 42l16-16 4 4-16 16h-4Z M15 45h10v4H15z" />
      </svg>
    ),
  },
  {
    title: "Interior Fit-Out",
    text: "Refined interior environments that align brand, workflow, and elevated user experience.",
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
    description: "High-rise business center with energy-efficient facade systems.",
    imageClass: "project-card__image--tower",
  },
  {
    title: "Westfield Residences",
    type: "Residential",
    category: "residential",
    description: "Premium urban homes balancing elegance, comfort, and durability.",
    imageClass: "project-card__image--residence",
  },
  {
    title: "Vertex Innovation Campus",
    type: "Commercial",
    category: "commercial",
    description: "Collaborative workspaces designed for scale, flexibility, and impact.",
    imageClass: "project-card__image--campus",
  },
  {
    title: "Summit Villa Collection",
    type: "Residential",
    category: "residential",
    description: "Architect-led homes with curated finishes and seamless indoor-outdoor flow.",
    imageClass: "project-card__image--villa",
  },
  {
    title: "Harborfront Hotel",
    type: "Commercial",
    category: "commercial",
    description: "Hospitality destination defined by premium interiors and resilient construction.",
    imageClass: "project-card__image--hotel",
  },
  {
    title: "Oakline Estate",
    type: "Residential",
    category: "residential",
    description: "Family-centered development with contemporary detailing and lasting value.",
    imageClass: "project-card__image--estate",
  },
];

const metrics = [
  {
    target: 25,
    suffix: "+",
    label: "Years of Experience",
    icon: (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <path d="M32 12a20 20 0 1 0 20 20A20 20 0 0 0 32 12Zm0 36a16 16 0 1 1 16-16A16 16 0 0 1 32 48Zm2-25h-4v11l9 6 2-3-7-5Z" />
      </svg>
    ),
  },
  {
    target: 340,
    suffix: "+",
    label: "Projects Completed",
    icon: (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <path d="M14 50h36v-4H14Zm4-8h8V18h-8Zm12 0h8V10h-8Zm12 0h8V26h-8Z" />
      </svg>
    ),
  },
  {
    target: 120,
    suffix: "+",
    label: "Corporate Clients",
    icon: (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <path d="M22 30a8 8 0 1 0-8-8 8 8 0 0 0 8 8Zm20 0a8 8 0 1 0-8-8 8 8 0 0 0 8 8ZM22 34C15.4 34 10 38.3 10 43.5V48h24v-4.5C34 38.3 28.6 34 22 34Zm20 0a15.5 15.5 0 0 0-5.3.9 14.2 14.2 0 0 1 5.3 10.6V48h12v-4.5C54 38.3 48.6 34 42 34Z" />
      </svg>
    ),
  },
  {
    target: 100,
    suffix: "%",
    label: "Safety Commitment",
    icon: (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <path d="M32 10 8 20v12c0 13.2 10.2 25.6 24 28 13.8-2.4 24-14.8 24-28V20Zm0 45.8C20.7 53.2 12 42.6 12 32V22.8l20-8.3 20 8.3V32c0 10.6-8.7 21.2-20 23.8Z" />
      </svg>
    ),
  },
];

const testimonials = [
  {
    quote:
      "Ironcrest brought executive-level discipline to every phase of our headquarters project. The result feels premium, efficient, and built to last.",
    author: "Daniel Mercer",
    role: "Managing Director, Axis Developments",
  },
  {
    quote:
      "Their team balanced speed and quality beautifully. From planning meetings to site delivery, the experience felt polished and deeply reliable.",
    author: "Sophia Bennett",
    role: "Founder, Bennett Living",
  },
  {
    quote:
      "Communication stayed transparent throughout a complex renovation, and the final space elevated our brand exactly the way we envisioned.",
    author: "Rahul Mehta",
    role: "Operations Head, Harborfront Hospitality",
  },
];

function App() {
  const [loading, setLoading] = useState(true);
  const [navOpen, setNavOpen] = useState(false);
  const [navSolid, setNavSolid] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeSlide, setActiveSlide] = useState(0);
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [visibleItems, setVisibleItems] = useState(() => new Set());
  const [counterValues, setCounterValues] = useState(() => metrics.map(() => 0));
  const observedNodesRef = useRef([]);
  const animatedCountersRef = useRef(new Set());
  const slideTimerRef = useRef(null);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") {
      return projects;
    }

    return projects.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

  useEffect(() => {
    document.body.classList.add("is-loading");

    const timer = window.setTimeout(() => {
      setLoading(false);
      document.body.classList.remove("is-loading");
    }, 900);

    return () => {
      document.body.classList.remove("is-loading");
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      setNavSolid(scrollY > 40);
      setParallaxOffset(scrollY * 0.18);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const key = entry.target.dataset.revealId;
          if (key) {
            setVisibleItems((current) => {
              const next = new Set(current);
              next.add(key);
              return next;
            });
          }

          const counterIndex = entry.target.dataset.counterIndex;
          if (counterIndex && !animatedCountersRef.current.has(counterIndex)) {
            animatedCountersRef.current.add(counterIndex);
            animateCounter(Number(counterIndex));
          }

          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.18 }
    );

    observedNodesRef.current.forEach((node) => {
      if (node) {
        observer.observe(node);
      }
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    slideTimerRef.current = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % testimonials.length);
    }, 5200);

    return () => {
      window.clearInterval(slideTimerRef.current);
    };
  }, []);

  const animateCounter = (index) => {
    const metric = metrics[index];
    const duration = 1600;
    const startTime = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      const value = Math.floor(metric.target * eased);

      setCounterValues((current) => {
        const next = [...current];
        next[index] = value;
        return next;
      });

      if (progress < 1) {
        window.requestAnimationFrame(tick);
      }
    };

    window.requestAnimationFrame(tick);
  };

  const registerReveal = (key) => (node) => {
    if (!node) {
      return;
    }

    node.dataset.revealId = key;
    observedNodesRef.current.push(node);
  };

  const registerCounter = (key, index) => (node) => {
    if (!node) {
      return;
    }

    node.dataset.revealId = key;
    node.dataset.counterIndex = String(index);
    observedNodesRef.current.push(node);
  };

  const isVisible = (key) => visibleItems.has(key);

  const changeSlide = (nextIndex) => {
    setActiveSlide((nextIndex + testimonials.length) % testimonials.length);

    if (slideTimerRef.current) {
      window.clearInterval(slideTimerRef.current);
    }

    slideTimerRef.current = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % testimonials.length);
    }, 5200);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);

    window.setTimeout(() => {
      event.target.reset();
      setSubmitted(false);
    }, 1800);
  };

  const revealClass = (key, base = "") =>
    `${base} section-reveal${isVisible(key) ? " is-visible" : ""}`.trim();

  const heroRevealClass = (key, extra = "") =>
    `reveal${extra ? ` ${extra}` : ""}${!loading ? " is-visible" : ""}`;

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

      <div className="site-shell">
        <header className="hero" id="home">
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
              aria-label="Open navigation"
              aria-expanded={navOpen}
              onClick={() => setNavOpen((current) => !current)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>

            <div className={`nav-links${navOpen ? " is-open" : ""}`}>
              {["about", "services", "projects", "why-us", "testimonials"].map((item) => (
                <a key={item} href={`#${item}`} onClick={() => setNavOpen(false)}>
                  {item === "why-us"
                    ? "Why Us"
                    : item.charAt(0).toUpperCase() + item.slice(1)}
                </a>
              ))}
              <a href="#contact" className="nav-links__cta" onClick={() => setNavOpen(false)}>
                Contact
              </a>
            </div>
          </nav>

          <div
            className="hero__media parallax-layer"
            style={{ transform: `scale(1.08) translate3d(0, ${parallaxOffset}px, 0)` }}
          ></div>
          <div className="hero__grid"></div>
          <div className="hero__overlay"></div>

          <div className="container hero__content">
            <div className={heroRevealClass("hero-eyebrow")}>
              Built for legacy, engineered for performance
            </div>
            <h1 className={heroRevealClass("hero-heading", "delay-1")}>
              Building the Future with Strength &amp; Precision
            </h1>
            <p className={heroRevealClass("hero-copy", "hero__copy delay-2")}>
              We deliver landmark spaces through disciplined execution, modern craftsmanship,
              and a commitment to timelines, safety, and long-term value.
            </p>
            <div className={heroRevealClass("hero-actions", "hero__actions delay-3")}>
              <a href="#contact" className="button button--primary">
                Get a Quote
              </a>
              <a href="#projects" className="button button--secondary">
                Our Projects
              </a>
            </div>
            <div className={heroRevealClass("hero-stats", "hero__stats delay-4")}>
              <div>
                <strong>25+</strong>
                <span>Years of Expertise</span>
              </div>
              <div>
                <strong>340+</strong>
                <span>Projects Delivered</span>
              </div>
              <div>
                <strong>98%</strong>
                <span>Client Retention</span>
              </div>
            </div>
          </div>
        </header>

        <main>
          <section className="section about" id="about">
            <div className="container split-grid">
              <div ref={registerReveal("about-image")} className={revealClass("about-image", "image-card")}>
                <div className="image-card__photo image-card__photo--about"></div>
                <div className="image-card__badge">
                  <strong>Trusted Build Partner</strong>
                  <span>Safety-led execution from concept to completion.</span>
                </div>
              </div>

              <div ref={registerReveal("about-copy")} className={revealClass("about-copy", "section-copy")}>
                <span className="section-tag">About Us</span>
                <h2>Construction leadership shaped by discipline, trust, and deep field expertise.</h2>
                <p>
                  Ironcrest Construction combines engineering precision with premium project
                  management to build spaces that perform beautifully for decades. From
                  high-spec commercial towers to refined residential developments, we focus on
                  quality that clients can see and reliability they can measure.
                </p>
                <div className="feature-list">
                  <article>
                    <h3>Experienced Teams</h3>
                    <p>Highly coordinated architects, engineers, site managers, and specialist crews.</p>
                  </article>
                  <article>
                    <h3>Transparent Process</h3>
                    <p>Clear milestones, schedule visibility, and dependable communication at every stage.</p>
                  </article>
                  <article>
                    <h3>Premium Standards</h3>
                    <p>Materials, finishes, and workflows selected to balance design impact and durability.</p>
                  </article>
                </div>
              </div>
            </div>
          </section>

          <section className="section services" id="services">
            <div className="container">
              <div ref={registerReveal("services-heading")} className={revealClass("services-heading", "section-heading")}>
                <span className="section-tag">Services</span>
                <h2>Integrated construction solutions for ambitious developments.</h2>
                <p>
                  Each service line is designed to deliver control, craftsmanship, and confidence
                  from planning through handover.
                </p>
              </div>

              <div className="service-grid">
                {services.map((service, index) => (
                  <article
                    key={service.title}
                    ref={registerReveal(`service-${index}`)}
                    className={revealClass(`service-${index}`, "service-card")}
                  >
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
              <div ref={registerReveal("projects-heading")} className={revealClass("projects-heading", "section-heading")}>
                <span className="section-tag">Portfolio</span>
                <h2>Selected projects that reflect our standards and range.</h2>
              </div>

              <div ref={registerReveal("project-filters")} className={revealClass("project-filters", "project-filters")}>
                {["all", "residential", "commercial"].map((filter) => (
                  <button
                    key={filter}
                    className={`filter-button${activeFilter === filter ? " is-active" : ""}`}
                    onClick={() => setActiveFilter(filter)}
                    type="button"
                  >
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </button>
                ))}
              </div>

              <div className="project-grid">
                {filteredProjects.map((project, index) => (
                  <article
                    key={project.title}
                    ref={registerReveal(`project-${project.title}`)}
                    className={revealClass(`project-${project.title}`, "project-card")}
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    <div className={`project-card__image ${project.imageClass}`}></div>
                    <div className="project-card__overlay">
                      <span>{project.type}</span>
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
              <div ref={registerReveal("why-heading")} className={revealClass("why-heading", "section-heading")}>
                <span className="section-tag">Why Choose Us</span>
                <h2>Built on measurable performance and long-term client confidence.</h2>
              </div>

              <div className="metrics-grid">
                {metrics.map((metric, index) => (
                  <article
                    key={metric.label}
                    ref={registerCounter(`metric-${index}`, index)}
                    className={revealClass(`metric-${index}`, "metric-card")}
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
            </div>
          </section>

          <section className="section testimonials" id="testimonials">
            <div className="container testimonial-layout">
              <div ref={registerReveal("testimonials-copy")} className={revealClass("testimonials-copy", "section-copy")}>
                <span className="section-tag">Testimonials</span>
                <h2>Partnerships built on confidence, clarity, and exceptional delivery.</h2>
                <p>
                  We approach each project as a long-term reputation commitment, which is why
                  many of our clients return to build with us again.
                </p>
              </div>

              <div ref={registerReveal("testimonial-slider")} className={revealClass("testimonial-slider", "testimonial-slider")}>
                <div className="testimonial-track">
                  {testimonials.map((testimonial, index) => (
                    <article
                      key={testimonial.author}
                      className={`testimonial-card${activeSlide === index ? " is-active" : ""}`}
                    >
                      <p>&ldquo;{testimonial.quote}&rdquo;</p>
                      <div>
                        <strong>{testimonial.author}</strong>
                        <span>{testimonial.role}</span>
                      </div>
                    </article>
                  ))}
                </div>

                <div className="slider-controls">
                  <button
                    className="slider-button"
                    aria-label="Previous testimonial"
                    onClick={() => changeSlide(activeSlide - 1)}
                    type="button"
                  >
                    ‹
                  </button>
                  <div className="slider-dots">
                    {testimonials.map((testimonial, index) => (
                      <button
                        key={testimonial.author}
                        className={activeSlide === index ? "is-active" : ""}
                        aria-label={`Go to testimonial ${index + 1}`}
                        onClick={() => changeSlide(index)}
                        type="button"
                      ></button>
                    ))}
                  </div>
                  <button
                    className="slider-button"
                    aria-label="Next testimonial"
                    onClick={() => changeSlide(activeSlide + 1)}
                    type="button"
                  >
                    ›
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="section contact" id="contact">
            <div className="container contact-grid">
              <div ref={registerReveal("contact-copy")} className={revealClass("contact-copy", "section-copy")}>
                <span className="section-tag">Contact</span>
                <h2>Let&apos;s discuss your next landmark project.</h2>
                <p>
                  Share your goals and our team will reach out to explore scope, timeline, and a
                  tailored delivery plan.
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
                </div>

                <div className="map-placeholder">
                  <span>Project Consultation Zone</span>
                  <strong>Map Placeholder</strong>
                </div>
              </div>

              <form ref={registerReveal("contact-form")} className={revealClass("contact-form", "contact-form")} onSubmit={handleSubmit}>
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
                  <textarea rows="6" placeholder="Tell us about your vision, timeline, and requirements"></textarea>
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
            <div>
              <h3>Ironcrest Construction</h3>
              <p>
                Premium construction services for residential, commercial, and transformational spaces.
              </p>
            </div>
            <div className="footer__links">
              <a href="#about">About</a>
              <a href="#services">Services</a>
              <a href="#projects">Projects</a>
              <a href="#contact">Contact</a>
            </div>
            <div className="footer__socials">
              <a href="#">LinkedIn</a>
              <a href="#">Instagram</a>
              <a href="#">Facebook</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;

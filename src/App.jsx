import { useEffect, useMemo, useRef, useState } from "react";

const contactEmail = "rajsingh96199@gmail.com";
const contactPhoneDisplay = "+91 86574 66854";
const whatsappLink =
  "https://wa.me/918657466854?text=Hello%20Ironcrest%20Construction,%20I%20want%20to%20discuss%20my%20project.";

const services = [
  {
    title: "Residential Development",
    text: "Luxury villas, premium residences, and gated communities delivered with strong planning and refined finishing.",
  },
  {
    title: "Commercial Construction",
    text: "Corporate towers, office fit-outs, retail developments, and mixed-use projects built for long-term performance.",
  },
  {
    title: "Renovation & Restoration",
    text: "Modern upgrades and complex renovation programs managed with structure, speed, and minimal disruption.",
  },
  {
    title: "Interior Fit-Out",
    text: "Elegant interiors that align functionality, brand image, premium materiality, and long-term usability.",
  },
];

const projects = [
  {
    title: "North Axis Tower",
    type: "Commercial",
    category: "commercial",
    location: "Mumbai Business District",
    imageClass: "project-card__image--tower",
  },
  {
    title: "Westfield Residences",
    type: "Residential",
    category: "residential",
    location: "Pune Urban Edge",
    imageClass: "project-card__image--residence",
  },
  {
    title: "Vertex Innovation Campus",
    type: "Commercial",
    category: "commercial",
    location: "Bengaluru Tech Corridor",
    imageClass: "project-card__image--campus",
  },
  {
    title: "Summit Villa Collection",
    type: "Residential",
    category: "residential",
    location: "Goa Coastal Estate",
    imageClass: "project-card__image--villa",
  },
  {
    title: "Harborfront Hotel",
    type: "Commercial",
    category: "commercial",
    location: "Waterfront Hospitality Zone",
    imageClass: "project-card__image--hotel",
  },
  {
    title: "Oakline Estate",
    type: "Residential",
    category: "residential",
    location: "Ahmedabad Premium Enclave",
    imageClass: "project-card__image--estate",
  },
];

const metrics = [
  ["Years of Experience", 25, "+"],
  ["Projects Completed", 340, "+"],
  ["Corporate Clients", 120, "+"],
  ["Safety Commitment", 100, "%"],
];

const testimonials = [
  {
    quote:
      "Ironcrest brought executive-level discipline to our project and the final result felt premium in every detail.",
    author: "Daniel Mercer",
    role: "Managing Director, Axis Developments",
  },
  {
    quote:
      "The team balanced speed, quality, and communication beautifully. It felt like working with a true delivery partner.",
    author: "Sophia Bennett",
    role: "Founder, Bennett Living",
  },
  {
    quote:
      "Their structured approach gave us confidence from the first meeting to final handover. We always knew where the project stood.",
    author: "Rahul Mehta",
    role: "Operations Head, Harborfront Hospitality",
  },
];

function App() {
  const [loading, setLoading] = useState(true);
  const [navSolid, setNavSolid] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const [slide, setSlide] = useState(0);
  const [heroShift, setHeroShift] = useState(0);
  const [visibleMap, setVisibleMap] = useState({});
  const [counterValues, setCounterValues] = useState(() => metrics.map(() => 0));
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
      const scrollY = window.scrollY;
      setNavSolid(scrollY > 30);
      setHeroShift(scrollY * 0.18);
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
    }, 5200);

    return () => window.clearInterval(sliderTimer.current);
  }, []);

  const animateCounter = (index) => {
    const target = metrics[index][1];
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
    }, 5200);
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
            type="button"
            className="nav-toggle"
            aria-expanded={navOpen}
            aria-label="Open navigation"
            onClick={() => setNavOpen((current) => !current)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <div className={`nav-links${navOpen ? " is-open" : ""}`}>
            <a href="#about" onClick={() => setNavOpen(false)}>About</a>
            <a href="#services" onClick={() => setNavOpen(false)}>Services</a>
            <a href="#projects" onClick={() => setNavOpen(false)}>Projects</a>
            <a href="#why-us" onClick={() => setNavOpen(false)}>Why Us</a>
            <a href="#contact" onClick={() => setNavOpen(false)}>Contact</a>
            <a href={whatsappLink} className="nav-links__cta" target="_blank" rel="noreferrer">
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

          <div className="container hero__layout">
            <div className="hero__content">
              <div className={heroClass("hero__eyebrow")}>
                Legacy craftsmanship. Modern execution. Corporate-grade trust.
              </div>
              <h1 className={heroClass("delay-1")}>
                Building bold spaces with strength, precision, and premium discipline.
              </h1>
              <p className={heroClass("hero__copy delay-2")}>
                Ironcrest delivers high-end residential and commercial projects with disciplined
                planning, on-site control, and polished construction outcomes that build trust instantly.
              </p>
              <div className={heroClass("hero__actions delay-3")}>
                <a href="#contact" className="button button--primary">Get a Quote</a>
                <a href="#projects" className="button button--secondary">Explore Projects</a>
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
              <h2>Construction leadership built around quality, timing, and trust.</h2>
              <ul className="hero__panel-list">
                <li>Transparent progress and milestone visibility</li>
                <li>Premium material and finish standards</li>
                <li>Fast access through direct WhatsApp and email form inquiries</li>
              </ul>
            </aside>
          </div>
        </header>

        <main>
          <section className="section about" id="about">
            <div className="container split-grid">
              <div ref={registerReveal("about-media")} className={`about__media section-reveal${visible("about-media")}`}>
                <div className="about__image about__image--main"></div>
              </div>

              <div ref={registerReveal("about-copy")} className={`section-copy section-reveal${visible("about-copy")}`}>
                <span className="section-tag">About Us</span>
                <h2>We build confidence through disciplined construction leadership.</h2>
                <p>
                  Every project is managed with a premium delivery mindset: strong planning,
                  active site governance, clear updates, and finishes that strengthen the client’s brand.
                </p>
                <div className="about__highlights">
                  <article>
                    <strong>Experienced teams</strong>
                    <p>Engineers, supervisors, and site teams aligned around consistency and execution quality.</p>
                  </article>
                  <article>
                    <strong>Transparent process</strong>
                    <p>Reliable updates, visible milestones, and accountability throughout the full project lifecycle.</p>
                  </article>
                  <article>
                    <strong>Premium standards</strong>
                    <p>Quality materials, sharp detailing, and durable outcomes that make an immediate impression.</p>
                  </article>
                </div>
              </div>
            </div>
          </section>

          <section className="section services" id="services">
            <div className="container">
              <div ref={registerReveal("services-heading")} className={`section-heading section-reveal${visible("services-heading")}`}>
                <span className="section-tag">Services</span>
                <h2>Integrated construction solutions for ambitious developments.</h2>
              </div>
              <div className="service-grid">
                {services.map((service, index) => (
                  <article
                    key={service.title}
                    ref={registerReveal(`service-${index}`)}
                    className={`service-card section-reveal${visible(`service-${index}`)}`}
                  >
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
                  <h2>Selected projects that reflect our range and premium standards.</h2>
                </div>
                <div ref={registerReveal("projects-filters")} className={`project-filters section-reveal${visible("projects-filters")}`}>
                  <button type="button" className={`filter-button${filter === "all" ? " is-active" : ""}`} onClick={() => setFilter("all")}>All</button>
                  <button type="button" className={`filter-button${filter === "residential" ? " is-active" : ""}`} onClick={() => setFilter("residential")}>Residential</button>
                  <button type="button" className={`filter-button${filter === "commercial" ? " is-active" : ""}`} onClick={() => setFilter("commercial")}>Commercial</button>
                </div>
              </div>

              <div className="project-grid">
                {filteredProjects.map((project, index) => (
                  <article
                    key={project.title}
                    ref={registerReveal(`project-${index}`)}
                    className={`project-card section-reveal${visible(`project-${index}`)}`}
                  >
                    <div className={`project-card__image ${project.imageClass}`}></div>
                    <div className="project-card__overlay">
                      <div className="project-card__meta">
                        <span>{project.type}</span>
                        <small>{project.location}</small>
                      </div>
                      <h3>{project.title}</h3>
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
                <h2>Built on measurable performance and long-term client confidence.</h2>
              </div>
              <div className="metrics-grid">
                {metrics.map(([label, , suffix], index) => (
                  <article
                    key={label}
                    ref={registerReveal(`metric-${index}`, index)}
                    className={`metric-card section-reveal${visible(`metric-${index}`)}`}
                  >
                    <strong>
                      {counterValues[index]}
                      {suffix}
                    </strong>
                    <span>{label}</span>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="section testimonials" id="testimonials">
            <div className="container testimonial-layout">
              <div ref={registerReveal("testimonials-copy")} className={`section-copy section-reveal${visible("testimonials-copy")}`}>
                <span className="section-tag">Testimonials</span>
                <h2>Partnerships built on clarity, quality, and trust.</h2>
                <p>
                  We approach every build like a long-term reputation commitment, and that mindset
                  shapes the way we communicate, deliver, and finish.
                </p>
              </div>

              <div ref={registerReveal("testimonials-slider")} className={`testimonial-slider section-reveal${visible("testimonials-slider")}`}>
                <div className="testimonial-track">
                  {testimonials.map((item, index) => (
                    <article key={item.author} className={`testimonial-card${slide === index ? " is-active" : ""}`}>
                      <p>&ldquo;{item.quote}&rdquo;</p>
                      <div className="testimonial-card__person">
                        <strong>{item.author}</strong>
                        <span>{item.role}</span>
                      </div>
                    </article>
                  ))}
                </div>
                <div className="slider-controls">
                  <button type="button" className="slider-button" onClick={() => changeSlide(slide - 1)}>‹</button>
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
                  <button type="button" className="slider-button" onClick={() => changeSlide(slide + 1)}>›</button>
                </div>
              </div>
            </div>
          </section>

          <section className="section contact" id="contact">
            <div className="container contact-grid">
              <div ref={registerReveal("contact-copy")} className={`section-copy section-reveal${visible("contact-copy")}`}>
                <span className="section-tag">Contact</span>
                <h2>Share your project details and our team will respond quickly.</h2>
                <p>
                  Visitors can submit an inquiry through the contact form or start a direct
                  WhatsApp conversation for faster project discussions.
                </p>
                <div className="contact-info">
                  <div>
                    <strong>Email</strong>
                    <span>{contactEmail}</span>
                  </div>
                  <div>
                    <strong>Phone</strong>
                    <span>{contactPhoneDisplay}</span>
                  </div>
                  <div>
                    <strong>WhatsApp</strong>
                    <a href={whatsappLink} target="_blank" rel="noreferrer" className="contact-link">
                      Start Instant Chat
                    </a>
                  </div>
                </div>
                <div className="contact-promo">
                  <strong>Need a faster response?</strong>
                  <p>Use WhatsApp for direct project discussion and quick quote requests.</p>
                  <a href={whatsappLink} target="_blank" rel="noreferrer" className="button button--primary">
                    Open WhatsApp
                  </a>
                </div>
              </div>

              <form
                ref={registerReveal("contact-form")}
                className={`contact-form section-reveal${visible("contact-form")}`}
                action={`https://formsubmit.co/${contactEmail}`}
                method="POST"
              >
                <input type="hidden" name="_subject" value="New Website Inquiry - Ironcrest Construction" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />
                <div className="form-row">
                  <label>
                    <span>Full Name</span>
                    <input type="text" name="Full Name" placeholder="Your name" required />
                  </label>
                  <label>
                    <span>Email Address</span>
                    <input type="email" name="Email Address" placeholder="your@email.com" required />
                  </label>
                </div>
                <div className="form-row">
                  <label>
                    <span>Project Type</span>
                    <select name="Project Type" defaultValue="Residential">
                      <option>Residential</option>
                      <option>Commercial</option>
                      <option>Renovation</option>
                      <option>Interior Fit-Out</option>
                    </select>
                  </label>
                  <label>
                    <span>Budget Range</span>
                    <input type="text" name="Budget Range" placeholder="Approximate budget" />
                  </label>
                </div>
                <label>
                  <span>Phone Number</span>
                  <input type="tel" name="Phone Number" placeholder="Your contact number" required />
                </label>
                <label>
                  <span>Project Details</span>
                  <textarea
                    rows="6"
                    name="Project Details"
                    placeholder="Tell us about your vision, site status, and expected timeline"
                    required
                  ></textarea>
                </label>
                <button type="submit" className="button button--primary button--full">
                  Send Inquiry
                </button>
              </form>
            </div>
          </section>
        </main>

        <footer className="footer">
          <div className="container footer__inner">
            <div>
              <h3>Ironcrest Construction</h3>
              <p>Premium construction experiences shaped by strategy, craftsmanship, and dependable execution.</p>
            </div>
            <div className="footer__links">
              <a href="#about">About</a>
              <a href="#services">Services</a>
              <a href="#projects">Projects</a>
              <a href="#contact">Contact</a>
            </div>
            <div className="footer__socials">
              <a href={whatsappLink} target="_blank" rel="noreferrer">WhatsApp</a>
              <a href={`mailto:${contactEmail}`}>Email</a>
              <a href="tel:+918657466854">Call</a>
            </div>
          </div>
        </footer>

        <a href={whatsappLink} target="_blank" rel="noreferrer" className="whatsapp-float" aria-label="Chat on WhatsApp">
          <span>WhatsApp</span>
        </a>
      </div>
    </>
  );
}

export default App;

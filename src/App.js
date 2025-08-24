import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

// --- Helper Components ---

// Icon component for features
const FeatureIcon = ({ children }) => (
  <div className="feature-icon">
    {children}
  </div>
);

// Feature card component
const FeatureCard = ({ icon, title, description }) => (
  <div className="feature-card">
    <FeatureIcon>{icon}</FeatureIcon>
    <h3 className="feature-title">{title}</h3>
    <p className="feature-description">{description}</p>
  </div>
);

// How it works step component
const Step = ({ number, title, description }) => (
  <div className="step">
    <div className="step-number">
      {number}
    </div>
    <div className="step-content">
      <h3 className="step-title">{title}</h3>
      <p className="step-description">{description}</p>
    </div>
  </div>
);


// --- Main App Component ---

export default function App() {
  // --- CSS Styles ---
  // The CSS is now embedded directly in the component to resolve the import error.
  const cssStyles = `
   /* --- 1. Global Reset & Box Sizing --- */
/* This ensures padding and borders don't break your layout sizing */
*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f9fafb;
  color: #1f2937;
}

/* --- 2. Container --- */
.container {
  width: 100%;
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

/* --- 3. Header --- */
.header {
  background-color: white;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 50;
}
.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  padding-bottom: 1rem;
}
.header-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #4f46e5;
}
.header-button {
  background-color: #4f46e5;
  color: white;
  font-weight: 700;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  text-decoration: none;
  transition: background-color 0.3s;
  white-space: nowrap; /* Prevents button text from wrapping */
}
.header-button:hover {
  background-color: #4338ca;
}

/* --- 4. Fluid Sections & Typography --- */
/* Using clamp() for fluid spacing between sections */
.hero-section,
.features-section,
.how-it-works-section,
.form-section {
  /* It will be 3rem on small screens, 5rem on large screens, and scale smoothly in between */
  padding-top: clamp(3rem, 5vw, 5rem);
  padding-bottom: clamp(3rem, 5vw, 5rem);
}
.section-header {
  text-align: center;
  margin-bottom: 3rem;
  max-width: 65ch; /* Improves readability of subtitles */
  margin-left: auto;
  margin-right: auto;
}
/* Using clamp() for fluid font sizes on titles */
.section-title {
  font-size: clamp(2rem, 4vw, 2.5rem);
  font-weight: 700;
  color: #1f2937;
}
.section-subtitle {
  font-size: clamp(1rem, 2vw, 1.125rem);
  color: #4b5563;
  margin-top: 0.5rem;
  line-height: 1.6;
}

/* --- Hero Section --- */
.hero-section {
  background-color: white;
  text-align: center;
}
.hero-title {
  /* Fluid font size: min 2.5rem, preferred 7vw, max 4rem */
  font-size: clamp(2.5rem, 7vw, 4rem);
  font-weight: 800;
  color: #1f2937;
  line-height: 1.2;
  margin-bottom: 1rem;
}
.hero-subtitle {
  max-width: 60ch; /* Limits line length for readability */
  margin: 0 auto 2rem auto;
}
.hero-button {
  background-color: #4f46e5;
  color: white;
  font-weight: 700;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  text-decoration: none;
  display: inline-block;
  transition: background-color 0.3s;
}
.hero-button:hover {
  background-color: #4338ca;
}

/* --- Features Section --- */
.features-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}
.feature-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1.5rem;
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
}
.feature-icon {
  background-color: #e0e7ff;
  color: #4f46e5;
  border-radius: 9999px;
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  flex-shrink: 0;
}
.feature-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.5rem;
}
.feature-description {
  color: #4b5563;
}

/* --- How It Works Section --- */
.how-it-works-section {
  background-color: white;
}
.steps-container {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  max-width: 800px;
  margin: auto;
}
.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.step-number {
  flex-shrink: 0;
  background-color: #4f46e5;
  color: white;
  border-radius: 9999px;
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}
.step-content .step-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.5rem;
}
.step-content .step-description {
  color: #4b5563;
}

/* --- Form Section --- */
.form-container {
  background-color: white;
  padding: clamp(1.5rem, 4vw, 3rem); /* Fluid padding */
  border-radius: 1rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
  max-width: 56rem; /* Good max-width for readability */
  margin: 0 auto;
}
.form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.form-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}
.form-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
}
.form-input,
.form-textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem; /* Prevents mobile browser zoom on focus */
  transition: border-color 0.2s, box-shadow 0.2s;
}
.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.3);
}
.form-textarea {
  resize: vertical;
  min-height: 120px;
}

/* Form Messages & Button */
.form-error { color: #ef4444; font-size: 0.875rem; }
.form-success, .form-submission-error { padding: 0.75rem 1rem; border-radius: 0.5rem; border: 1px solid; }
.form-success { background-color: #dcfce7; border-color: #4ade80; color: #166534; }
.form-submission-error { background-color: #fee2e2; border-color: #f87171; color: #991b1b; }
.submit-button {
  width: 100%;
  background-color: #4f46e5;
  color: white;
  font-weight: 700;
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}
.submit-button:hover:not(:disabled) { background-color: #4338ca; }
.submit-button:disabled { background-color: #a5b4fc; cursor: not-allowed; }
.spinner { animation: spin 1s linear infinite; width: 1.25rem; height: 1.25rem; margin-right: 0.75rem; border-radius: 50%; border: 4px solid rgba(255, 255, 255, 0.3); border-top-color: white; }
@keyframes spin { to { transform: rotate(360deg); } }

/* --- Footer --- */
.footer {
  background-color: #1f2937;
  color: #ecf0f1;
  padding: 2.5rem 1.5rem;
  text-align: center;
}
.footer p { margin: 5px 0; }
.footer-tagline { font-style: italic; color: #9ca3af; margin-bottom: 20px; }
.footer-contact {
  margin-top: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem 1.5rem;
  flex-wrap: wrap;
}
.footer-contact a { color: #60a5fa; text-decoration: none; transition: color 0.3s; }
.footer-contact a:hover { color: #93c5fd; text-decoration: underline; }
.footer-contact span { display: none; } /* Hide pipe separators, gap is enough */

/* --- 5. Media Query Breakpoints --- */
/* Medium screens (tablets) and up */
@media (min-width: 768px) {
  .header-title { font-size: 1.875rem; }
  .features-grid { grid-template-columns: repeat(2, 1fr); }
  .step {
    flex-direction: row;
    align-items: flex-start;
    text-align: left;
  }
  .step-number { margin-right: 1.5rem; margin-bottom: 0; }
  .form-grid { grid-template-columns: repeat(2, 1fr); }
  .footer-contact span { display: inline; color: #4b5563; } /* Show separators on larger screens */
}
/* Large screens (desktops) and up */
@media (min-width: 1024px) {
  .features-grid { grid-template-columns: repeat(3, 1fr); }
}
  `;

  // --- Firebase Setup ---
  const firebaseConfig = {
    apiKey: "AIzaSyCehiBFsamngHqHFBIZEceB0YPyoIWjnRI",
    authDomain: "automationnexus-a2539.firebaseapp.com",
    projectId: "automationnexus-a2539",
    storageBucket: "automationnexus-a2539.appspot.com",
    messagingSenderId: "343931003282",
    appId: "1:343931003282:web:a746935e11441ceee8a14b",
    measurementId: "G-VEY9QL4166"
  };

  const [db, setDb] = useState(null);

  // Initialize Firebase
  useEffect(() => {
    try {
      const app = initializeApp(firebaseConfig);
      const firestore = getFirestore(app);
      setDb(firestore);
    } catch (error) {
      console.error("Error initializing Firebase:", error);
    }
  }, []);


  // --- Form State ---
  const [clientName, setClientName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null); // 'success', 'error', or null
  const [formError, setFormError] = useState('');


  // --- Form Submission Logic ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    // Basic validation
    if (!clientName || !contactEmail || !projectName || !projectDescription) {
      setFormError('Please fill out all fields.');
      return;
    }

    if (!db) {
      setFormError('Database connection not available. Please try again later.');
      return;
    }

    setIsLoading(true);
    setSubmissionStatus(null);

    try {
      // Add a new document with a generated ID to the "projects" collection.
      const docRef = await addDoc(collection(db, "projects"), {
        clientName: clientName,
        contactEmail: contactEmail,
        projectName: projectName,
        projectDescription: projectDescription,
        status: 'New', // Default status for new projects
        submittedAt: new Date(),
      });

      console.log("Document written with ID: ", docRef.id);
      setSubmissionStatus('success');
      // Reset form fields
      setClientName('');
      setContactEmail('');
      setProjectName('');
      setProjectDescription('');
    } catch (error) {
      console.error("Error adding document: ", error);
      setSubmissionStatus('error');
      setFormError('There was an issue submitting your request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // --- Render ---
  return (
    <div>
      <style>{cssStyles}</style>
      {/* Header */}
      <header className="header">
        <div className="container header-content">
          <h1 className="header-title">AutomateIQ</h1>
          <a href="#submit-form" className="header-button">
            Get Started
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section className="hero-section">
          <div className="container">
            <h2 className="hero-title">
              Your Vision, Automated. For Free.
            </h2>
            <p className="hero-subtitle">
              Have an idea for a web app, an automation script, or a complex project? We bring your ideas to life with expert development, completely free of charge.
            </p>
            <a href="#submit-form" className="hero-button">
              Submit Your Project Idea
            </a>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">What We Build</h2>
              <p className="section-subtitle">From simple scripts to full-fledged applications.</p>
            </div>
            <div className="features-grid">
              <FeatureCard
                title="AI Automation"
                description="Integrate cutting-edge AI to automate tasks, analyze data, and power intelligent applications."
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8" /><rect x="4" y="12" width="16" height="8" rx="2" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="M12 12v4h4" /></svg>
                }
              />
              <FeatureCard
                title="Custom Websites"
                description="Beautiful, responsive, and high-performance websites tailored to your specific needs."
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
                }
              />
              <FeatureCard
                title="Personalized Tools"
                description="Need a custom script for data science, notes management, or anything else? We've got you covered."
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><line x1="10" y1="9" x2="8" y2="9"></line></svg>
                }
              />
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="how-it-works-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Simple & Transparent Process</h2>
              <p className="section-subtitle">From idea to delivery in three easy steps.</p>
            </div>
            <div className="steps-container">
              <Step number="1" title="Submit Your Idea" description="Use the form below to tell us about your project. Provide as much detail as possible so we can fully understand your vision." />
              <Step number="2" title="We Get to Work" description="Our team will review your request and begin development. We handle all the technical details, so you can sit back and relax." />
              <Step number="3" title="Project Delivery" description="Once your project is complete, we'll contact you via your provided details for the final handover and communication." />
            </div>
          </div>
        </section>

        {/* Submission Form Section */}
        <section id="submit-form" className="form-section">
          <div className="container">
            <div className="form-container">
              <div className="form-header">
                <h2 className="form-title">
                  Have a Project in Mind?
                </h2>
                <p className="form-subtitle">
                  Fill out the form below, and let's make it happen.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="form">
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="clientName" className="form-label">Your Name</label>
                    <input type="text" id="clientName" value={clientName} onChange={(e) => setClientName(e.target.value)} className="form-input" placeholder="e.g., Jane Doe" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contactEmail" className="form-label">Contact Email</label>
                    <input type="email" id="contactEmail" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} className="form-input" placeholder="you@example.com" />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="projectName" className="form-label">Project Name / Title</label>
                  <input type="text" id="projectName" value={projectName} onChange={(e) => setProjectName(e.target.value)} className="form-input" placeholder="e.g., Automated Social Media Poster" />
                </div>
                <div className="form-group">
                  <label htmlFor="projectDescription" className="form-label">Project Description</label>
                  <textarea id="projectDescription" value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)} rows="6" className="form-textarea" placeholder="Describe your project in detail. What should it do? What features are important?"></textarea>
                </div>

                {formError && <p className="form-error">{formError}</p>}

                {submissionStatus === 'success' && (
                  <div className="form-success" role="alert">
                    <strong>Success!</strong>
                    <span> Your project has been submitted. We'll be in touch soon!</span>
                  </div>
                )}
                {submissionStatus === 'error' && (
                  <div className="form-submission-error" role="alert">
                    <strong>Oops!</strong>
                    <span> Something went wrong. Please try submitting again.</span>
                  </div>
                )}

                <div>
                  <button type="submit" disabled={isLoading} className="submit-button">
                    {isLoading ? (
                      <div className="spinner"></div>
                    ) : (
                      'Submit Project'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
    <footer className="footer">
  <div className="container">
    <p>&copy; {new Date().getFullYear()} AutomateIQ. All Rights Reserved.</p>
    <p className="footer-tagline">Your Vision, Our Code.</p>

    {/* Contact & Social Links Section */}
    <div className="footer-contact">
      <a href="mailto:bandipreethamreddy16@gmail.com">Email Me</a>
      <span>|</span>
      <a href="https://www.linkedin.com/in/preetham-reddy-bandi-4874a5267/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      <span>|</span>
      <a href="https://github.com/Preetham1983" target="_blank" rel="noopener noreferrer">GitHub</a>
      <span>|</span>
      <a href="tel:+919550022113">Contact: +91-9550022113</a>
    </div>
  </div>
</footer>
    </div>
  );
}



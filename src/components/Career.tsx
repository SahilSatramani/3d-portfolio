import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Senior Software Engineer</h4>
                <h5>LTIMindtree · Mumbai, India</h5>
              </div>
              <h3>Jul 2023 – Jun 2024</h3>
            </div>
            <p>
              Built candidate onboarding platform processing 10,000+ monthly applications,
              reducing processing time by 60%. Improved dashboard response time by 70% for
              real-time HR analytics using React/Next.js. Reduced cross-system sync latency
              by 80% across 5+ HR platforms with FastAPI + Redis caching. Accelerated
              deployment cycles by 75% with Dockerized microservices and GitHub Actions CI/CD.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Software Engineer</h4>
                <h5>LTIMindtree · Mumbai, India</h5>
              </div>
              <h3>Jul 2021 – Jun 2023</h3>
            </div>
            <p>
              Developed alumni engagement platform for 10,000+ users with 99.5%+ uptime.
              Built React + TypeScript analytics dashboard replacing manual reporting for
              3 HR teams. Reduced document processing time from 3 days to 4 hours using
              event-driven AWS Lambda pipelines. Executed zero-downtime migration of
              50,000+ records to MongoDB with 100% data integrity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;

import { motion } from "framer-motion";
import "./styles/BentoGrid.css";

interface BentoCardProps {
  title: string;
  items?: string[];
  size?: "large" | "medium" | "small";
  highlight?: boolean;
}

const BentoCard = ({ title, items, size = "medium", highlight = false }: BentoCardProps) => (
  <motion.div
    className={`bento-card bento-${size} ${highlight ? "bento-highlight" : ""}`}
    whileHover={{ scale: 1.02, y: -4 }}
    transition={{ duration: 0.2, ease: "easeOut" }}
  >
    <div className="bento-card-inner">
      <h3 className="bento-title">{title}</h3>
      {items && (
        <ul className="bento-items">
          {items.map((item) => (
            <li key={item} className="bento-item">{item}</li>
          ))}
        </ul>
      )}
    </div>
  </motion.div>
);

const BentoGrid = () => (
  <section className="bento-section">
    <div className="section-container">
      <p className="bento-label">TECHNOLOGIES</p>
      <h2 className="bento-heading">WHAT I BUILD WITH</h2>
      <div className="bento-grid">
        <BentoCard
          title="AI / ML Systems"
          items={["LangChain", "LangGraph", "LlamaIndex", "RAG Pipelines", "OpenAI APIs", "Pinecone", "Neo4j"]}
          size="large"
          highlight={true}
        />
        <BentoCard
          title="Backend Engineering"
          items={["FastAPI", "Node.js", "Express.js", "REST APIs", "Microservices"]}
          size="large"
        />
        <BentoCard
          title="Languages"
          items={["Python", "TypeScript", "JavaScript", "Java", "Swift"]}
          size="medium"
        />
        <BentoCard
          title="Frontend"
          items={["React.js", "Next.js", "React Native", "Redux"]}
          size="medium"
        />
        <BentoCard
          title="Data & Streaming"
          items={["Apache Kafka", "Apache Spark", "Airflow", "Redis"]}
          size="medium"
        />
        <BentoCard
          title="Databases"
          items={["PostgreSQL", "MongoDB", "MySQL", "Pinecone"]}
          size="medium"
        />
        <BentoCard
          title="Cloud & DevOps"
          items={["AWS (EMR, S3, Lambda, RDS)", "GCP", "Docker", "Kubernetes", "Terraform"]}
          size="large"
        />
        <BentoCard
          title="CI/CD & Testing"
          items={["GitHub Actions", "pytest", "Docker Compose"]}
          size="small"
        />
      </div>
    </div>
  </section>
);

export default BentoGrid;

import React, { useState, useEffect } from "react";
import css from "../../styles/landingPage/ContentInfo.css";

function Step(props) {
  return (
    <div className="step">
      <div className="step-number">{props.stepNumber}</div>
      <div className="step-content">
        <h2>{props.title}</h2>
        <h6>{props.description}</h6>
      </div>
    </div>
  );
}

function App() {
  return (
    <section className="workflow">
      <div className="workflow-header">
        <h1>How it Works</h1>
        <h6 className="workflow-img">
          <br></br>
          <h2 style={{ margin: "50px 0" }}> TraceCheck Workflow</h2>
        </h6>
      </div>
      <div className="workflow-steps">
        <Step
          stepNumber="01"
          title="Login or Signup "
          description="Users can sign in as Individuals or Issuing Authorities to access the platform’s features and services."
        />
        <Step
          stepNumber="02"
          title="Role Based Actions"
          description="Institutions and companies issue certificates. Users can request certificates to enhance their profiles, streamlining background checks and job applications. "
        />
        <Step
          stepNumber="03"
          title="Certificate Management"
          description="All issued and received certificates are securely stored on the blockchain and displayed on the user’s dashboard for easy access and reference."
        />
        <Step
          stepNumber="04"
          title="Get Insights"
          description="Issuing authorities monitor alumni success, while individual users gain career insights and use the platform for employment proof and advancement."
        />
      </div>
    </section>
  );
}

export default App;

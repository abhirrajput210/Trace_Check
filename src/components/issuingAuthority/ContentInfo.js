import React, { useState, useEffect } from 'react';
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
        <h6>Tracecheck Workflow</h6>
        <h1>How it works</h1>
      </div>
      <div className="workflow-steps">
        <Step
          stepNumber="01"
          title="Create a Free Account"
          description="Sign up for free to gain access to Certopus as well as 50 free certificate credits to try out the services."
        />
        <div className="arrow arrow-dotted"></div> {/* Arrow div */}
        <Step
          stepNumber="02"
          title="Design your Certificates"
          description="Design certificates using our template engine, which includes a rich library of professionally designed certificates."
        />
        <div className="arrow arrow-dotted"></div> {/* Arrow div */}
        <Step
          stepNumber="03"
          title="Issue Certificates"
          description="You can bulk generate high-quality PDF and deliver the personalized certificates to the recipients in a few clicks!"
        />
        <div className="arrow arrow-dotted"></div> {/* Arrow div */}
        <Step
          stepNumber="04"
          title="Get Insights"
          description="Get insights on the performance of your certification campaign, and the best audience response!"
        />
      </div>
    </section>
  );
}

export default App;
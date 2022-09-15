import React from "react";

const About = () => {
  return (
    <>
      <div className="container padding">
        <div className="col-md-12">
          <div className="row mx-0">
            <p className="mt-4 text-center" style={{ fontSize: "18px" }}>
              Hi I'm Alejandro Tomasella, a full stack developer from Argentina.
              I have made this blog application to show my skills in React and
              Typescript, and to learn how to implent Firebase in an
              application.
            </p>
            <p className="mt-4 text-center" style={{ fontSize: "18px" }}>
              Check my porfolio at{" "}
            </p>
            <p className="mt-4 text-center" style={{ fontSize: "18px" }}>
              <a
                href="https://portfolioalejandrotomasella.vercel.app/"
                className="text-warning"
                style={{ fontWeight: "bold" }}
                target="_blank"
              >
                alejandrotomasella.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;

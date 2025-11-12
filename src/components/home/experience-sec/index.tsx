import React from "react";

const ExperienceSec = () => {
  const experiences = [
    {
      year: "2020 - 2024",
      title: "Geographic Information System",
      company: "Gadjah Mada University",
      type: "Student",
      description:
        "I completed my four-year degree with a GPA of 3.3, served as an event leader, and actively participated in campus organizations",
    },
    {
      year: "2022 - Present",
      title: "Full Stack Web Developer",
      company: "Freelance",
      type: "Freelance",
      description:
        "I have actively taken on clients seeking website development services, and I continue to receive project offers for small- to mid-scale website and application development. I independently manage full-stack development for these freelance projects, covering both front-end and back-end implementation.",
    },
    {
      year: "2023",
      title: "Machine Learning Cohort",
      company: "Bangkit Academy led by Google, GoTo, & Traveloka",
      type: "Intern",
      description:
        "I participated in the Bangkit Academy Batch 4 program, a national-level technology talent development initiative supported by Google, GoTo, and Traveloka. During this program, I received structured training in software development and industry-relevant competencies, collaborated in team-based projects, and gained practical experience in building real-world technology solutions.",
    },
    {
      year: "2023",
      title: "Logistic Supply Chain Management (LSCM) INTERN ",
      company: "PT. BRIDGESTONE TIRE INDONESIA",
      type: "Intern",
      description:
        "I completed an internship in the Supply Chain Management division at PT Bridgestone Tire Indonesia, where I supported operational workflows, assisted in data processing and reporting, and gained hands-on experience in corporate supply chain processes. This role strengthened my analytical skills, attention to detail, and understanding of end-to-end operational coordination in a large-scale manufacturing environment.",
    },
    {
      year: "2024 - Present",
      title: "Technical Consultant ERP",
      company: "PT. INTI TALENTA TEKNOLOGI",
      type: "Contact",
      description:
        "I work as a Technical Programmer specializing in ERP Consulting using Epicor systems. My responsibilities include system configuration, technical development, workflow customization, troubleshooting, and supporting clients in optimizing their business processes through ERP solutions. This role strengthens my expertise in enterprise systems, analytical problem-solving, and technical implementation in real business environments.",
    },
  ];

  return (
    <section>
      <div className="py-16 md:py-32">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-2 border-b border-black pb-7 mb-9 md:mb-16">
            <h2>Experience</h2>
            <p className="text-xl text-primary">( 02 )</p>
          </div>

          <div className="space-y-7 md:space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 md:gap-4 xl:gap-8 items-start relative"
              >
                <div className="">
                  <h3 className="font-bold mb-2 text-black">{exp.year}</h3>
                  <h4 className="text-lg font-normal">{exp.title}</h4>
                </div>

                <div className=" relative">
                  {index < experiences.length && (
                    <div
                      className={`absolute left-0 top-3 w-px ${
                        index < experiences.length - 1 ? "h-40" : "h-30"
                      } bg-softGray`}
                    ></div>
                  )}

                  <div className="no-print absolute left-0 top-0 transform -translate-x-1/2">
                    <div
                      className={`no-print w-3.5 h-3.5 rounded-full border-1 bg-white flex items-center justify-center ${
                        index === 4 ? "border-primary" : "border-black"
                      }`}
                    >
                      {index === 4 && (
                        <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      )}
                    </div>
                  </div>

                  <div className="pl-4 lg:pl-7">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl text-black font-normal">
                        {exp.company}
                      </span>
                    </div>
                    <p className="text-base font-normal">{exp.type}</p>
                  </div>
                </div>

                <div className="pl-8 sm:pl-0">
                  <p className="leading-relaxed text-base">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSec;

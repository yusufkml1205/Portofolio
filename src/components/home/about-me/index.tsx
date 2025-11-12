import { getImgPath } from "@/utils/image";
import Image from "next/image";

const AboutMe = () => {
  return (
    <section>
      <div className="relative bg-softGray py-10 md:py-32">
        <div className="absolute top-0 w-full px-9">
          <Image
            src={getImgPath("/images/home/about-me/resume-bg-img.svg")}
            alt="resume-bg-img"
            width={1200}
            height={348}
            className="w-full"
          />
        </div>

        <div className="relative z-10">
          <div className="container">
            <div className="flex items-center justify-between gap-2 border-b border-black pb-7">
              <h2>About Me</h2>
              <p className="text-xl text-primary">( 01 )</p>
            </div>

            <div className="pt-10 xl:pt-16 flex gap-10 items-center justify-between">
              <div className="w-[303px] h-[440px] hidden lg:flex">
                <Image
                  src={getImgPath("/images/home/about-me/about-banner-img.svg")}
                  alt="about-banner"
                  width={303}
                  height={440}
                  className="w-full h-full"
                />
              </div>

              <div className="w-full lg:max-w-2xl flex-1">
                <div className="space-y-6">
                  <p className="text-justify leading-relaxed text-gray-600">
                    I am a graduate of Universitas Gadjah Mada, majoring in
                    Information Systems, with strong experience in IT
                    development, programming, and software-based problem
                    solving. I have one year of professional experience working
                    in ERP Consulting, where I specialized in system
                    configuration, technical troubleshooting, and supporting
                    business process implementation. Throughout my academic and
                    professional journey, I have worked on various projects
                    involving Web Development, Machine Learning, Software
                    Development, and Data Processing.
                  </p>
                  <p className="text-justify leading-relaxed text-gray-600">
                    I am proficient in programming languages such as HTML, CSS,
                    PHP, JavaScript, and Python, and experienced with
                    development tools including Visual Studio Code and Android
                    Studio. In addition to my technical background, I was
                    actively involved in student organizations and executive
                    boards, which strengthened my communication, leadership, and
                    teamwork skills. I believe that technical expertise combined
                    with strong organizational experience creates a solid
                    foundation for professional growth. I am open to new
                    opportunities, collaboration, and professional connections.
                    Feel free to reach out or connect with me on LinkedIn
                  </p>
                </div>
                <div className="grid grid-cols-3 py-10 xl:py-16 gap-5 border-b border-mistGray">
                  {[
                    { count: "03+", label: "Years of experience" },
                    { count: "20+", label: "Project Completed" },
                  ].map((item, i) => (
                    <div key={i}>
                      <h3>{item.count}</h3>
                      <p className="text-base md:text-lg text-black">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="pt-8 xl:pt-14 flex flex-col sm:flex-row items-center gap-4">
                  <div className="flex items-center gap-3.5">
                    <Image
                      src={getImgPath("/images/icon/lang-icon.svg")}
                      alt="lang-icon"
                      width={30}
                      height={30}
                    />
                    <p className="text-base xl:text-xl text-black">Language</p>
                  </div>
                  <div className="flex flex-wrap justify-center items-center gap-2.5">
                    {["English", "Bahasa"].map((lang) => (
                      <p
                        key={lang}
                        className="bg-white py-2 md:py-3.5 px-4 md:px-5 w-fit rounded-full text-base xl:text-xl"
                      >
                        {lang}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;

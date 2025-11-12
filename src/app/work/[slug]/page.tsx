import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getImgPath } from "@/utils/image";
import path from "path";
import { promises as fs } from "fs";
import InteractiveGallery from "@/components/ui/interactive-gallery";

// Server-side data fetching
async function getWorkData() {
  try {
    const filePath = path.join(
      process.cwd(),
      "public",
      "data",
      "work-data.json"
    );
    const jsonData = await fs.readFile(filePath, "utf8");
    return JSON.parse(jsonData);
  } catch (error) {
    console.error("Error reading work data:", error);
    return { workData: [] };
  }
}

// Generate static params
export async function generateStaticParams() {
  const data = await getWorkData();
  return data.workData.map((project: any) => ({
    slug: project.slug,
  }));
}

// Generate metadata untuk SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getWorkData();
  const project = data.workData.find((p: any) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} - Yusuf Kamil Portfolio`,
    description: `Project details for ${project.title} - ${project.client}`,
  };
}

// Modern Gallery Component
function ModernGallery({ images }: { images: { src: string; alt: string }[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {images.map((image, index) => (
        <div
          key={index}
          className="group relative aspect-video rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
              <div className="bg-white/90 backdrop-blur-sm rounded-full p-3">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v0m0 4v0m0 4v0"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default async function WorkDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getWorkData();
  const project = data.workData.find((p: any) => p.slug === slug);

  if (!project) {
    notFound();
  }

  // Get gallery images from project data or use fallback
  const galleryImages = project.gallery?.map((img: string, index: number) => ({
    src: getImgPath(img),
    alt: `${project.title} - View ${index + 1}`,
  })) || [
    { src: getImgPath(project.image), alt: `${project.title} - Main View` },
    {
      src: getImgPath("/images/work/gallery/placeholder-1.jpg"),
      alt: `${project.title} - Feature 1`,
    },
    {
      src: getImgPath("/images/work/gallery/placeholder-2.jpg"),
      alt: `${project.title} - Feature 2`,
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header Navigation */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container">
          <div className="flex items-center justify-between py-4">
            <Link
              href="/"
              className="group flex items-center gap-3 text-gray-600 hover:text-primary transition-colors"
            >
              <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </div>
              <span className="font-semibold">Back to Portfolio</span>
            </Link>

            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {project.category}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 lg:py-24">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            {/* Project Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.9 1 3 1.9 3 3V7H21V9ZM3 21C3 22.1 3.9 23 5 23H19C20.1 23 21 22.1 21 21V11H3V21Z" />
                </svg>
                Project Showcase
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                {project.title}
              </h1>

              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Developed for{" "}
                <span className="font-semibold text-primary">
                  {project.client}
                </span>{" "}
                • {project.year}
              </p>
            </div>

            {/* Main Project Image with Modern Card */}
            <div className="mb-20">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-3xl transform group-hover:scale-105 transition-transform duration-500"></div>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
                  <Image
                    src={getImgPath(project.image)}
                    alt={project.title}
                    width={1200}
                    height={600}
                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            </div>

            {/* Project Overview & Details Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-12 mb-20">
              {/* Main Content */}
              <div className="xl:col-span-2 space-y-12">
                {/* Project Story */}
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-2 h-8 bg-primary rounded-full"></div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Project Overview
                    </h2>
                  </div>
                  <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                    {renderProjectDetails(project.slug)}
                  </div>
                </div>

                {/* Key Features */}
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-2 h-8 bg-green-500 rounded-full"></div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Key Features
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {renderKeyFeatures(project.slug).map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                      >
                        <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="text-primary"
                          >
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                          </svg>
                        </div>
                        <span className="text-gray-700 font-medium">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Image Gallery */}
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-8 bg-blue-500 rounded-full"></div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        Project Gallery
                      </h2>
                    </div>
                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      {galleryImages.length} images
                    </span>
                  </div>
                  <InteractiveGallery images={galleryImages} />
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Project Info Card */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 sticky top-24">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Project Details
                  </h3>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="font-medium text-gray-600">Client</span>
                      <span className="font-semibold text-gray-900">
                        {project.client}
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="font-medium text-gray-600">
                        Category
                      </span>
                      <span className="font-semibold text-primary">
                        {getProjectCategory(project.slug)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="font-medium text-gray-600">Year</span>
                      <span className="font-semibold text-gray-900">
                        {project.year || "2024"}
                      </span>
                    </div>

                    <div className="pt-3">
                      <span className="font-medium text-gray-600 block mb-3">
                        Technologies
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {getTechnologies(project.slug).map(
                          (tech: string, index: number) => (
                            <span
                              key={index}
                              className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-primary hover:text-white transition-colors cursor-default"
                            >
                              {tech}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// Helper functions
function renderProjectDetails(slug: string): React.ReactNode {
  const details: { [key: string]: React.ReactNode } = {
    "webgis-wet-wet": (
      <>
        <p className="text-lg text-gray-700 leading-relaxed mb-6 text-justify">
          WebGIS Wet Wet is a web-based Geographic Information System designed
          to manage and promote tourism destinations across Aceh Besar, Banda
          Aceh, and Sabang. The system integrates spatial data visualization,
          tourism information management, and interactive mapping to enhance the
          efficiency and effectiveness of tourism management and marketing in
          the Aceh region. Developed using the Laravel framework, Leaflet
          library, and a PostGIS database, the project provides a dynamic
          platform that enables users to explore tourism destinations through an
          interactive map interface. Each location displays detailed
          information, including facilities, accessibility, operational hours,
          and entrance fees.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed text-justify">
          This project not only serves as a digital tourism information system
          but also supports decision-making and regional promotion through
          spatial data analysis. It was developed as part of an undergraduate
          thesis at Universitas Gadjah Mada, combining technical GIS knowledge,
          web development, and user-centered design principles.
        </p>
      </>
    ),
    simak: (
      <>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          SIMAK (Sistem Informasi Monitoring dan Akademik) is a comprehensive
          academic monitoring system developed for Banda Aceh City Teacher
          Supervisor. This platform streamlines the process of tracking teacher
          performance, student progress, and academic activities across multiple
          schools in the region.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed">
          The system provides real-time reporting, data analytics, and
          centralized management tools that enable supervisors to make
          data-driven decisions and improve educational outcomes throughout the
          school district.
        </p>
      </>
    ),
    tegclean: (
      <>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          WEBGIS TegClean is an innovative environmental monitoring platform
          designed to track and analyze pollution levels across urban areas.
          This system combines GIS technology with real-time data collection for
          comprehensive environmental assessment.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed">
          Features include pollution heat mapping, trend analysis, and automated
          reporting capabilities that help environmental agencies monitor and
          respond to pollution incidents effectively.
        </p>
      </>
    ),
    "less-is-more": (
      <>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          E-Commerce: Less is More is a minimalist e-commerce platform focused
          on user experience and conversion optimization. The platform features
          clean design, intuitive navigation, and advanced analytics for
          business intelligence.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed">
          Built with modern web technologies, this platform demonstrates how
          simplicity in design can lead to better user engagement and higher
          conversion rates in e-commerce applications.
        </p>
      </>
    ),
  };

  return (
    details[slug] || (
      <p className="text-lg text-gray-700 leading-relaxed">
        This project showcases innovative solutions and cutting-edge technology
        implementation. Detailed case study coming soon.
      </p>
    )
  );
}

function renderKeyFeatures(slug: string): string[] {
  const features: { [key: string]: string[] } = {
    "webgis-wet-wet": [
      "Interactive Web Mapping",
      "Tourism Information Management",
      "Filter and Search System",
      "Responsive Web Design",
      "Database Integration (PostGIS)",
      "Admin Dashboard",
      "Spatial Data Visualization",
      "Usability Evaluation",
    ],
    simak: [
      "Comprehensive teacher performance tracking",
      "Student progress monitoring and analytics",
      "Automated report generation",
      "Multi-school management capabilities",
      "Real-time data synchronization",
      "Parent-teacher communication portal",
    ],
    tegclean: [
      "Pollution level monitoring and mapping",
      "Real-time environmental data collection",
      "Historical trend analysis",
      "Automated alert system for critical levels",
      "Multi-parameter environmental assessment",
      "Public awareness dashboard",
    ],
    "less-is-more": [
      "Minimalist and intuitive user interface",
      "Advanced product search and filtering",
      "Secure payment gateway integration",
      "Real-time inventory management",
      "Customer behavior analytics",
      "Mobile-first responsive design",
    ],
  };

  const defaultFeatures = [
    "Responsive design for all devices",
    "Optimized performance and fast loading",
    "Secure data handling and storage",
    "User-friendly interface and experience",
    "Scalable architecture for future growth",
    "Cross-browser compatibility",
  ];

  return features[slug] || defaultFeatures;
}

function getProjectCategory(slug: string): string {
  const categories: { [key: string]: string } = {
    "webgis-wet-wet": "WebGIS & Data Visualization",
    simak: "Education Management System",
    tegclean: "Environmental Monitoring",
    "less-is-more": "E-commerce & Analytics",
    "fashion-website-template": "E-commerce & Web Design",
    "book-cover-design": "Graphic Design",
    "mobile-app-design": "UI/UX Design",
    "mug-sticker-designing": "Product Design",
  };

  return categories[slug] || "Web Development";
}

function getTechnologies(slug: string): string[] {
  const techStack: { [key: string]: string[] } = {
    "webgis-wet-wet": [
      "Laravel",
      "Leaflet",
      "PHP",
      "Javascript",
      "Python",
      "PostgreSQL",
    ],
    simak: [
      "Laravel",
      "MySQL",
      "JavaScript",
      "Bootstrap",
      "Chart.js",
      "PHP",
      "jQuery",
      "AJAX",
    ],
    tegclean: [
      "Vue.js",
      "Mapbox",
      "Node.js",
      "MongoDB",
      "Express",
      "Socket.io",
      "D3.js",
    ],
    "less-is-more": [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Stripe",
      "MongoDB",
      "NextAuth",
      "Vercel",
    ],
  };

  return (
    techStack[slug] || [
      "Custom Development",
      "Modern Framework",
      "Responsive Design",
      "Database Management",
      "API Integration",
      "Cloud Deployment",
    ]
  );
}

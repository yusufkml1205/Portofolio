"use client";
import { getImgPath } from "@/utils/image";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface WorkItem {
  image: string;
  title: string;
  client: string;
  slug: string;
  year?: string;
  category?: string;
}

const LatestWork: React.FC = () => {
  const [workData, setWorkData] = useState<WorkItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isMounted, setIsMounted] = useState(false);

  // TAMBAHKAN useEffect untuk set isMounted
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Hanya fetch data setelah component mounted (client-side)
    if (!isMounted) return;

    const fetchData = async (): Promise<void> => {
      try {
        // Force no cache untuk development
        const res = await fetch(
          "/data/work-data.json?t=" + new Date().getTime(),
          {
            cache: "no-store",
            headers: {
              "Cache-Control": "no-cache",
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        console.log("Fetched work data:", data?.workData); // Debug
        setWorkData(data?.workData || []);
      } catch (error) {
        console.error("Error fetching work data:", error);
        // Fallback dengan data yang benar (4 items)
        setWorkData([
          {
            image: "/images/work/project1.png",
            title: "WEBGIS WET WET",
            client: "Bachelor Thesis - UGM",
            slug: "webgis-wet-wet",
          },
          {
            image: "/images/work/project2.png",
            title: "SIMAK: Sistem Informasi Monitoring dan Akademik",
            client: "Banda Aceh City Teacher Supervisor",
            slug: "simak",
          },
          {
            image: "/images/work/project3.png",
            title: "WEBGIS TegClean",
            client: "UGM Student",
            slug: "tegclean",
          },
          {
            image: "/images/work/project4.png",
            title: "E-Commerce: Less is More",
            client: "UNHAS Student",
            slug: "less-is-more",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isMounted]); // Tambah dependency isMounted

  // Selama SSR, render loading state yang konsisten
  if (!isMounted) {
    return (
      <section id="work">
        <div className="bg-softGray">
          <div className="container">
            <div className="py-16 xl:py-32">
              <div className="flex items-center justify-between gap-2 border-b border-black pb-7 mb-9 md:mb-16">
                <h2>Latest Works</h2>
                <p className="text-xl text-orange-500">( 4 )</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i: number) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-300 h-64 rounded-lg mb-4"></div>
                    <div className="bg-gray-300 h-4 rounded w-3/4 mb-2"></div>
                    <div className="bg-gray-300 h-3 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (loading) {
    return (
      <section id="work">
        <div className="bg-softGray">
          <div className="container">
            <div className="py-16 xl:py-32">
              <div className="flex items-center justify-between gap-2 border-b border-black pb-7 mb-9 md:mb-16">
                <h2>Latest Works</h2>
                <p className="text-xl text-orange-500">Loading...</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i: number) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-300 h-64 rounded-lg mb-4"></div>
                    <div className="bg-gray-300 h-4 rounded w-3/4 mb-2"></div>
                    <div className="bg-gray-300 h-3 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="work">
      <div className="bg-softGray">
        <div className="container">
          <div className="py-16 xl:py-32 ">
            <div className="flex items-center justify-between gap-2 border-b border-black pb-7 mb-9 md:mb-16">
              <h2>Latest Works</h2>
              <p className="text-xl text-orange-500">( {workData.length} )</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6 xl:gap-y-12">
              {workData.map((value: WorkItem, index: number) => {
                return (
                  <div
                    key={index}
                    className="group flex flex-col gap-3 xl:gap-6"
                  >
                    <div className="relative overflow-hidden rounded-lg">
                      <Image
                        src={getImgPath(value.image)}
                        alt={value.title}
                        width={570}
                        height={414}
                        className="rounded-lg w-full h-full object-cover"
                      />
                      <Link
                        href={`/work/${value.slug}`}
                        className="absolute top-0 left-0 backdrop-blur-xs bg-primary/80 w-full h-full hidden group-hover:flex rounded-lg items-center justify-center"
                      >
                        <div className="text-center text-white">
                          <div className="bg-white/20 rounded-full p-4 inline-block mb-3">
                            <svg
                              width="32"
                              height="32"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                              <polyline points="15 3 21 3 21 9" />
                              <line x1="10" y1="14" x2="21" y2="3" />
                            </svg>
                          </div>
                          <p className="font-semibold text-lg">View Project</p>
                        </div>
                      </Link>
                    </div>
                    <div className="flex flex-col gap-0 xl:gap-2">
                      <div className="flex items-center justify-between">
                        <Link
                          href={`/work/${value.slug}`}
                          className="group/title"
                        >
                          <h5 className="text-black group-hover/title:text-primary transition-colors">
                            {value.title}
                          </h5>
                        </Link>
                        <Image
                          src={getImgPath("/images/icon/right-arrow-icon.svg")}
                          alt="right-arrow-icon"
                          width={30}
                          height={30}
                          className="group-hover:translate-x-2 transition-transform"
                        />
                      </div>
                      <p className="text-secondary">Client: {value.client}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* View All Projects Button */}
            <div className="text-center mt-12">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
              >
                Start Your Project
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
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestWork;

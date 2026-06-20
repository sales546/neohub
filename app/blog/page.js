import Link from "next/link";
import PageBanner from "@/components/PageBanner";

export const metadata = {
  title: "Coworking & Startup Insights Blog | NeoHub Lucknow",
  description: "Stay updated with startup trends, flexible office guides, and networking ideas in Uttar Pradesh from the NeoHub Coworking Space team.",
};

const blogPosts = [
  {
    image: "/assets/image7_6ac1b0f1.png",
    date: "11",
    month: "Apr",
    title: "How Modern Coworking Spaces are Accelerating Lucknow's Startup Growth.",
  },
  {
    image: "/assets/image6_5720d7a6.png",
    date: "11",
    month: "Apr",
    title: "5 Critical Productivity Hacks for Teams Working in Shared Office Environments.",
  },
  {
    image: "/assets/image5-1_6a8d661c.png",
    date: "11",
    month: "Apr",
    title: "Choosing Between Dedicated Workstations and Private Cabins: A Detailed Guide.",
  },
  {
    image: "/assets/image4-1_a85b66a9.png",
    date: "11",
    month: "Apr",
    title: "The Future of Work: Why Corporates and MNCs are Moving to Gomti Nagar Lucknow.",
  },
  {
    image: "/assets/image3-1_4fa9ed6f.png",
    date: "11",
    month: "Apr",
    title: "Building a Collaborative Community: How Coworking Spaces Fuel Innovation.",
  },
  {
    image: "/assets/image2-1_c88aa198.png",
    date: "11",
    month: "Apr",
    title: "Redefining Employee Work-Life Balance with Premium Shared Offices.",
  },
];

export default function BlogPage() {
  return (
    <>
      <PageBanner title="Blog" />

      <div id="full-width-blog">
        <div className="container">
          <div className="content_page row pt-5 pb-5">
            {blogPosts.map((post) => (
              <div key={post.title} className="col-xl-4 col-lg-4 col-md-6 col-sm-12 mt-3 mb-3">
                <div className="blog-image-box" style={{ position: "relative" }}>
                  <div className="blog-img-box position-relative">
                    <div className="post-img">
                      <img src={post.image} alt={post.title} loading="lazy" />
                    </div>
                    <div className="blog-date-admin-box">
                      <span className="date-item align-self-center">
                        <span className="date">{post.date}</span>
                        <span className="month">{post.month}</span>
                      </span>
                    </div>
                  </div>

                  <div className="blog-contents-box text-lg-start text-start">
                    <div className="d-flex justify-content-lg-start justify-content-sm-start justify-content-start">
                      <div className="blog-admin-box">
                        <span className="news-author">By NeoHub Team</span>
                      </div>
                    </div>

                    <h5 className="pt-2">
                      <Link href="/contact">{post.title}</Link>
                    </h5>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pb-4">
            <Link className="hero-secondary-btn" href="/contact" style={{ color: "#0f172a", borderColor: "#e2e8f0" }}>
              Ask our team about workspace insights
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

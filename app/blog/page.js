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
            {blogPosts.map((post, index) => (
              <div key={index} className="col-xl-4 col-lg-4 col-md-6 col-sm-12 mt-3 mb-3">
                <div className="blog-image-box" style={{ position: "relative" }}>
                  <div className="blog-img-box position-relative">
                    <div className="post-img">
                      <img src={post.image} alt={post.title} />
                    </div>
                    <div className="blog-date-admin-box">
                      <a className="date-item align-self-center">
                        <div className="date">{post.date}</div>
                        <div className="month">{post.month}</div>
                      </a>
                    </div>
                  </div>

                  <div className="blog-contents-box text-lg-start text-start">
                    <div className="d-flex justify-content-lg-start justify-content-sm-start justify-content-start">
                      <div className="blog-admin-box">
                        <a style={{ textAlign: "center" }} href="#">
                          <div className="d-flex">
                            <i className="fa fa-user"></i>
                            <span className="ms-2 news-author">By NeoHub Team</span>
                          </div>
                        </a>
                      </div>
                      <div className="post-comments align-self-center ps-3">
                        <i className="fas fa-comments"></i>
                        <span className="ms-2">0 Comment</span>
                      </div>
                    </div>

                    <h5 className="pt-2">
                      <a href="#">{post.title}</a>
                    </h5>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="navigation_pagination">
            <span aria-current="page" className="page-numbers current">1</span>
            <a className="page-numbers" href="#">2</a>
            <a className="next page-numbers" href="#">Next &raquo;</a>
          </div>
          <div className="clearfix"></div>
        </div>
        <div className="clearfix"></div>
      </div>
    </>
  );
}

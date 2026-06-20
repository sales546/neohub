import PageBanner from "@/components/PageBanner";

export const metadata = {
  title: "Office Gallery & Virtual Tour | NeoHub Coworking Lucknow",
  description: "Take a tour of our office space. See high-resolution images of our workspaces, conference rooms, hot desks, and private office cabins in Cyber Heights.",
};

const galleryImages = [
  { src: "/assets/galleryimg1_3b163f91.png", alt: "NeoHub workspace gallery" },
  { src: "/assets/galleryimg2_cf31ca9e.png", alt: "NeoHub coworking area" },
  { src: "/assets/galleryimg3_d90d3227.png", alt: "NeoHub meeting room" },
  { src: "/assets/galleryimg4_426fab93.png", alt: "NeoHub private cabins" },
  { src: "/assets/galleryimg5_5319e1bc.png", alt: "NeoHub conference room" },
  { src: "/assets/galleryimg6_41584ce5.png", alt: "NeoHub lounge area" },
  { src: "/assets/galleryimg7_ffa21c49.png", alt: "NeoHub workstations" },
  { src: "/assets/galleryimg8_6c48ff7a.png", alt: "NeoHub office interior" },
  { src: "/assets/galleryimg9_ff9b2219.png", alt: "NeoHub hot desking" },
  { src: "/assets/galleryimg10_b69e6146.png", alt: "NeoHub premium office" },
];

export default function GalleryPage() {
  return (
    <>
      <PageBanner title="Gallery" />

      <div className="gallery-page">
        <div className="container" data-aos="fade-right">
          <div className="col-12 mt-md-5 mb-md-5 gallery-outer">
            {galleryImages.map((image, index) => (
              <div className="gallery_page_front" key={index}>
                <img src={image.src} alt={image.alt} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

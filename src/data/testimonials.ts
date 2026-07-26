export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  company: string;
  project: string;
  projectType: string;
  rating: number;
  location: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "hongxin-sports",
    quote:
      "High precision, excellent quality, and fast delivery. Laotie Steel is a manufacturer you can trust.",
    author: "Project Manager",
    company: "Hongxin Sports Goods Co.",
    project: "20,000 m² Industrial Park",
    projectType: "Industrial Park Steel Structures",
    rating: 5,
    location: "Domestic Project, China",
  },
  {
    id: "laiyixin-home",
    quote:
      "Working with Laotie Steel was completely worry-free. Fast construction with great quality — our 10,000 m² factory was delivered on schedule with zero delays.",
    author: "Factory Owner",
    company: "Laiyixin Home Furnishing Co.",
    project: "10,000 m² Factory Building",
    projectType: "Portal Frame Factory",
    rating: 5,
    location: "Domestic Project, China",
  },
  {
    id: "fengyu-food",
    quote:
      "A hassle-free experience with Laotie Steel. Weld quality was noticeably better than our previous supplier. Our 3,000 m² factory was delivered right on time.",
    author: "Plant Director",
    company: "Fengyu Food Processing Plant",
    project: "3,000 m² Factory Building",
    projectType: "Portal Frame Factory",
    rating: 5,
    location: "Domestic Project, China",
  },
];

export const aggregateRating = {
  ratingValue: "5.0",
  reviewCount: testimonials.length.toString(),
  bestRating: "5",
  worstRating: "1",
};

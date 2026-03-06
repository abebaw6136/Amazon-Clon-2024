import React from 'react';
import './Footer.css';

const Footer = () => {
  const footerData = [
    {
      title: "Get to Know Us",
      links: ["Careers", "Blog", "About Amazon", "Investor Relations", "Amazon Devices", "Amazon Science"]
    },
    {
      title: "Make Money with Us",
      links: ["Sell products on Amazon", "Sell on Amazon Business", "Become an Affiliate", "Advertise Your Products"]
    },
    {
      title: "Amazon Payment Products",
      links: ["Amazon Business Card", "Shop with Points", "Reload Your Balance", "Amazon Currency Converter"]
    },
    {
      title: "Let Us Help You",
      links: ["Your Account", "Your Orders", "Shipping Rates & Policies", "Returns & Replacements", "Help"]
    }
  ];

  const servicesData = [
    { name: "IMDb", description: "Movies & TV" },
    { name: "IMDbPro", description: "Get Info Entertainment Professionals Need" },
    { name: "Kindle Direct Publishing", description: "Indie Digital & Print Publishing Made Easy" },
    { name: "Amazon Photos", description: "Unlimited Photo Storage Free With Prime" },
    { name: "Prime Video", description: "Video Distribution & Streaming" },
    { name: "Amazon Warehouse", description: "Great Deals on Quality Used Products" },
    { name: "AbeBooks", description: "Books, Art & Collectibles" },
    { name: "ACX", description: "Audiobook Publishing Made Easy" },
    { name: "Sell on Amazon", description: "Start a Selling Account" },
    { name: "Amazon Business", description: "Everything For Your Business" },
    { name: "Amazon Global", description: "Ship Orders Internationally" },
    { name: "Home Services", description: "Verified Pros, Guaranteed Pros" },
    { name: "Amazon Ignite", description: "Sell Your Original Digital Resources" },
    { name: "Amazon Web Services", description: "Scalable Cloud Computing Services" },
    { name: "Audible", description: "Download Audio Books" },
    { name: "Book Depository", description: "Books With Free Delivery Worldwide" },
    { name: "Box Office Mojo", description: "Find Movie Box Office Data" },
    { name: "ComiXology", description: "Thousands of Digital Comics" },
    { name: "DPReview", description: "Digital Photography" },
    { name: "Fabric", description: "Sewing, Quilting & Knitting" },
    { name: "Goodreads", description: "Book reviews & recommendations" },
    { name: "IMDb", description: "Movies, TV & Celebrities" },
    { name: "Junglee", description: "Shop Online in India" },
    { name: "Kindle", description: "eBooks & Kindle Unlimited" },
    { name: "Amazon Music", description: "Stream millions of songs" },
    { name: "Amazon Ads", description: "Reach customers wherever they spend their time" },
    { name: "Whole Foods Market", description: "We Believe in Real Food" },
    { name: "Amazon Express", description: "Delivery and Convenience" },
    { name: "Amazon Prime", description: "Unlimited Fast Delivery" },
    { name: "Amazon Subscribe & Save", description: "Save time and money" },
    { name: "Amazon Second Chance", description: "Pass it on, give it a second life" },
    { name: "Zappos", description: "Shoes & Clothing" }
  ];

  return (
    <footer className="footer">
      <div className="backToTop" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
        Back to top
      </div>
      
      <div className="footerLinks">
        {footerData.map((section, index) => (
          <div key={index} className="footerColumn">
            <h3>{section.title}</h3>
            <ul>
              {section.links.map((link, i) => (
                <li key={i}><a href="#">{link}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="footerServices">
        <div className="servicesContent">
          <div className="servicesGrid">
            {servicesData.map((service, index) => (
              <div key={index} className="serviceItem">
                <a href="#">
                  <span className="serviceName">{service.name}</span>
                  <span className="serviceDescription">{service.description}</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="footerSub">
          <div className="footerLogo">
              {/* Add your Amazon/AWS logo here */}
          </div>
          <div className="footerCopy">
              <p>© 1996-2026, Amazon.com, Inc. or its affiliates</p>
          </div>
      </div>
    </footer>
  );
};

export default Footer;

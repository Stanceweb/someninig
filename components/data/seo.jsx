import { useEffect } from "react";

const SEO = ({ pageTitle, description = "Headquartered in Effurun, Someni Nigeria Limited delivers engineering and specialist services for oil and gas and allied industries across Nigeria.", url = "https://www.someninig.com", image = "/assets/img/logo-2.png" }) => {
  useEffect(() => {
    document.title = pageTitle + " - Someni Nigeria Limited";
    // Set meta description
    let descTag = document.querySelector('meta[name="description"]');
    if (!descTag) {
      descTag = document.createElement('meta');
      descTag.name = "description";
      document.head.appendChild(descTag);
    }
    descTag.content = description;

    // Open Graph tags
    const setMeta = (property, content) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.content = content;
    };
    setMeta("og:title", pageTitle + " - Someni Nigeria Limited");
    setMeta("og:description", description);
    setMeta("og:type", "website");
    setMeta("og:url", url);
    setMeta("og:image", image);

    // Twitter Card
    let twitterTag = document.querySelector('meta[name="twitter:card"]');
    if (!twitterTag) {
      twitterTag = document.createElement('meta');
      twitterTag.name = "twitter:card";
      document.head.appendChild(twitterTag);
    }
    twitterTag.content = "summary_large_image";
  }, [pageTitle, description, url, image]);
  return null;
};

export default SEO;

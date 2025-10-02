import { useEffect } from "react";

const SEO = ({ pageTitle }) => {
  useEffect(() => {
    document.title = pageTitle + " - Someni Nigeria Limited";
  }, []);
};

export default SEO;
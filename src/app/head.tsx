export default function Head() {
  return (
    <>
      {/* Meta Tags for Character Set and Viewport */}
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* Title Tag - SEO Optimized */}
      <title>
        Eva Engineering | Expert Construction & Engineering Solutions for Your Projects
      </title>

      {/* Meta Description - Optimized for Clarity and Keywords */}
      <meta
        name="description"
        content="Eva Engineering provides high-quality construction, design, and project management solutions. From structural engineering to sustainable construction, we deliver excellence in every project."
      />

      {/* Meta Keywords */}
      <meta
        name="keywords"
        content="construction engineering, project management, structural engineering, sustainable building, civil engineering, infrastructure, quality assurance, design and planning"
      />

      {/* Open Graph Meta Tags (for social media sharing) */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Eva Engineering | Expert Construction & Engineering Solutions" />
      <meta
        property="og:description"
        content="Eva Engineering offers expert construction, design, and project management services for commercial, residential, and infrastructure projects."
      />
      <meta property="og:image" content="/images/logo/logo.png" />
      <meta property="og:url" content="https://evaengineering.com" />

      {/* Canonical Link */}
      <link rel="canonical" href="https://evaengineering.com" />

      {/* Favicon */}
      <link rel="icon" href="/images/logo/logo.png" />
    </>
  );
}

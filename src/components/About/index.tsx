import Image from "next/image";

const About = () => {
  return (
    <section className="pb-4 pt-[120px] md:pt-[130px] lg:pb-8 lg:pt-[130px]">
      <div className="mx-auto max-w-7xl px-6">
        {/* Title Section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-medium">About Us</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg">
            Eva Engineering is a leading construction and engineering company providing innovative and sustainable solutions across industries. We are committed to excellence, integrity, and trusted partnerships.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div>
            <Image
              src="/images/hero/who.jpg"
              alt="About Us"
              width={600}
              height={400}
              className="rounded-xl border border-gray-700 shadow-lg"
            />
          </div>
          <div>
            <h2 className="text-gold mb-4 text-2xl font-medium">Who We Are</h2>
            <p className="mb-6 leading-relaxed">
              Eva Engineering is a dynamic company offering top-quality services in construction, project management, and engineering solutions. We pride ourselves on providing sustainable solutions that meet global standards with reliability and precision.
            </p>
            <h2 className="text-gold mb-4 text-2xl font-medium">
              Why Choose Us?
            </h2>
            <ul className="list-inside list-disc space-y-2">
              <li>
                Sustainability: We implement eco-friendly practices in all aspects of construction and engineering.
              </li>
              <li>
                Global Reach: Our engineering expertise is applied across multiple countries, ensuring quality delivery.
              </li>
              <li>
                Quality Assurance: We follow the highest industry standards, delivering safe and reliable projects.
              </li>
              <li>
                Innovation: Our innovative approach helps industries adapt and evolve with cutting-edge engineering solutions.
              </li>
              <li>
                Trusted Partnerships: We build long-lasting relationships with clients by maintaining transparency and delivering value.
              </li>
            </ul>
          </div>
        </div>

        {/* Commitment Section */}
        <div className="mt-20">
          <h2 className="mb-10 text-center text-3xl font-medium">
            Our Commitment
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                title: "Our Mission",
                text: "To provide high-quality, innovative engineering solutions that exceed industry expectations.",
              },
              {
                title: "Our Vision",
                text: "To be a global leader in delivering sustainable construction and engineering solutions, shaping the future of infrastructure.",
              },
              {
                title: "Our Core Values",
                text: "We prioritize integrity, innovation, sustainability, and client satisfaction in everything we do.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="rounded-xl border bg-gray-50 p-6 text-center shadow-lg"
              >
                <h3 className="mt-4 text-xl font-semibold text-gray-800">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

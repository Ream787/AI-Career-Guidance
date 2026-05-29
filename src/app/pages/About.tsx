import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Link } from "react-router";
import {
  Target,
  Lightbulb,
  CheckCircle,
  GraduationCap,
  MapPin
} from "lucide-react";

export function About() {
  return (
    <div className="flex-1 overflow-y-auto">
      {/* Hero Section - Full Bleed */}
      <div className="relative h-[70vh] min-h-[500px] flex items-center">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1758270704689-2850704b7338?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
            alt="Belgium Campus students"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a5f]/95 via-[#1e3a5f]/80 to-[#1e3a5f]/60" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-16 text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 max-w-3xl leading-tight">
            About Belgium Campus iTversity
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl text-gray-100">
            Shaping the future of technology through innovation, education, and industry-driven learning.
          </p>
          <Link
            to="/"
            className="inline-block bg-white text-[#1e3a5f] px-8 py-4 text-lg hover:bg-gray-100 transition-colors"
          >
            Explore Programmes
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Who We Are */}
        <section className="mb-24">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1e3a5f] mb-8">Who We Are</h2>
          <p className="text-xl text-gray-700 leading-relaxed max-w-4xl">
            Belgium Campus iTversity is a leading private higher education institution in South Africa,
            specialising in Information Technology and innovation-driven learning. Founded in 1999,
            the institution focuses on developing highly skilled, industry-ready graduates equipped
            to solve real-world challenges through technology.
          </p>
        </section>

        {/* Mission & Vision */}
        <section className="mb-24 grid md:grid-cols-2 gap-16">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <Target className="w-10 h-10 text-[#1e3a5f]" />
              <h3 className="text-3xl font-bold text-[#1e3a5f]">Our Mission</h3>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              To empower students with cutting-edge IT knowledge and practical skills that prepare them
              to thrive in a rapidly evolving digital world.
            </p>
          </div>

          <div>
            <div className="flex items-center gap-4 mb-6">
              <Lightbulb className="w-10 h-10 text-[#1e3a5f]" />
              <h3 className="text-3xl font-bold text-[#1e3a5f]">Our Vision</h3>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              To be a globally recognised IT institution producing innovative thinkers, problem-solvers,
              and future technology leaders.
            </p>
          </div>
        </section>

        {/* What Makes Us Different */}
        <section className="mb-24">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1e3a5f] mb-12">What Makes Us Different</h2>
          <div className="space-y-4 max-w-4xl">
            {[
              "Industry-aligned curriculum designed with real-world application",
              "Strong focus on practical, hands-on learning",
              "Programmes in software development, data science, AI, and cybersecurity",
              "Partnerships with industry leaders and organisations",
              "Support for innovation and emerging technologies"
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-[#1e3a5f] flex-shrink-0 mt-1" />
                <p className="text-lg text-gray-700">{item}</p>
              </div>
            ))}
          </div>
          <p className="text-lg text-gray-700 mt-8 max-w-4xl">
            Graduates are prepared for careers such as software engineering, data science, UX design,
            and systems architecture.
          </p>
        </section>

        {/* Our Impact */}
        <section className="mb-24 bg-[#1e3a5f] text-white -mx-6 px-6 md:mx-0 py-16 md:py-20">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-12">Our Impact</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="border-l-4 border-white pl-6">
                <div className="text-5xl font-bold mb-3">8%+</div>
                <p className="text-xl text-gray-100">
                  Of South Africa's ICT graduates come from Belgium Campus
                </p>
              </div>
              <div className="border-l-4 border-white pl-6">
                <div className="text-5xl font-bold mb-3">Global</div>
                <p className="text-xl text-gray-100">
                  Programmes aligned with global technology trends
                </p>
              </div>
              <div className="border-l-4 border-white pl-6">
                <div className="text-5xl font-bold mb-3">Strong</div>
                <p className="text-xl text-gray-100">
                  Graduate employability through industry exposure
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Campuses */}
        <section className="mb-24">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1e3a5f] mb-12">Our Campuses</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="border-l-4 border-[#1e3a5f] pl-6">
              <h3 className="text-2xl font-bold text-[#1e3a5f] mb-2">Pretoria (Main Campus)</h3>
              <div className="flex items-start gap-2 text-gray-700">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-1" />
                <p>138 Berg Ave, Heatherdale</p>
              </div>
            </div>
            <div className="border-l-4 border-[#1e3a5f] pl-6">
              <h3 className="text-2xl font-bold text-[#1e3a5f] mb-2">Kempton Park Campus</h3>
              <div className="flex items-start gap-2 text-gray-700">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-1" />
                <p>45A Long Street</p>
              </div>
            </div>
            <div className="border-l-4 border-[#1e3a5f] pl-6">
              <h3 className="text-2xl font-bold text-[#1e3a5f] mb-2">Stellenbosch Campus</h3>
              <div className="flex items-start gap-2 text-gray-700">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-1" />
                <p>10 Distillery Road</p>
              </div>
            </div>
          </div>
        </section>

        {/* Facilities & Student Life */}
        <section className="mb-24">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1e3a5f] mb-12">Facilities & Student Life</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl">
            {[
              "Modern hybrid classrooms",
              "Robotics labs and innovation spaces",
              "Libraries and study areas",
              "Sports and recreational facilities",
              "Student accommodation and community activities"
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <GraduationCap className="w-5 h-5 text-[#1e3a5f] flex-shrink-0 mt-1" />
                <p className="text-lg text-gray-700">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center py-16 border-t-2 border-gray-200">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1e3a5f] mb-6">
            Ready to start your IT journey?
          </h2>
          <p className="text-xl text-gray-700 mb-10 max-w-2xl mx-auto">
            Join a community that is shaping the future of technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:apply@belgiumcampus.ac.za"
              className="bg-[#1e3a5f] hover:bg-[#2a4a7f] text-white px-10 py-4 text-lg transition-colors"
            >
              Apply Now
            </a>
            <Link
              to="/contact"
              className="border-2 border-[#1e3a5f] text-[#1e3a5f] hover:bg-[#1e3a5f] hover:text-white px-10 py-4 text-lg transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
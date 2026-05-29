import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Mail, Phone, Clock, MapPin, Send } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Label } from "../components/ui/label";
import { useState } from "react";

export function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    campus: "",
    enquiryType: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Form submission logic would go here
  };

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[400px] flex items-center">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1758874385535-bd209562d2cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
            alt="Contact Belgium Campus"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a5f]/95 via-[#1e3a5f]/85 to-[#1e3a5f]/70" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-16 text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Get in Touch</h1>
          <p className="text-xl md:text-2xl text-gray-100 max-w-2xl">
            We'd love to hear from you. Reach out for enquiries, applications, or support.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Contact Details & Form Grid */}
        <div className="grid lg:grid-cols-5 gap-16 mb-24">
          {/* Contact Information - 2 columns */}
          <div className="lg:col-span-2 space-y-12">
            {/* Phone */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Phone className="w-6 h-6 text-[#1e3a5f]" />
                <h3 className="text-2xl font-bold text-[#1e3a5f]">Phone</h3>
              </div>
              <a
                href="tel:+27105935368"
                className="text-lg text-gray-700 hover:text-[#1e3a5f] transition-colors"
              >
                010 593 5368
              </a>
            </div>

            {/* Email */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Mail className="w-6 h-6 text-[#1e3a5f]" />
                <h3 className="text-2xl font-bold text-[#1e3a5f]">Email</h3>
              </div>
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-gray-600">General Enquiries</p>
                  <a
                    href="mailto:info@belgiumcampus.ac.za"
                    className="text-lg text-gray-700 hover:text-[#1e3a5f] transition-colors"
                  >
                    info@belgiumcampus.ac.za
                  </a>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Applications</p>
                  <a
                    href="mailto:apply@belgiumcampus.ac.za"
                    className="text-lg text-gray-700 hover:text-[#1e3a5f] transition-colors"
                  >
                    apply@belgiumcampus.ac.za
                  </a>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Finance</p>
                  <a
                    href="mailto:finance@belgiumcampus.ac.za"
                    className="text-lg text-gray-700 hover:text-[#1e3a5f] transition-colors"
                  >
                    finance@belgiumcampus.ac.za
                  </a>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Registrar</p>
                  <a
                    href="mailto:registrar@belgiumcampus.ac.za"
                    className="text-lg text-gray-700 hover:text-[#1e3a5f] transition-colors"
                  >
                    registrar@belgiumcampus.ac.za
                  </a>
                </div>
              </div>
            </div>

            {/* Operating Hours */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-6 h-6 text-[#1e3a5f]" />
                <h3 className="text-2xl font-bold text-[#1e3a5f]">Operating Hours</h3>
              </div>
              <div className="space-y-1 text-lg text-gray-700">
                <p>Monday – Friday: 08:00 – 17:00</p>
                <p>Saturday – Sunday: Closed</p>
              </div>
            </div>
          </div>

          {/* Contact Form - 3 columns */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  required
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+27 XX XXX XXXX"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  required
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="campus">Preferred Campus</Label>
                <Select
                  value={formData.campus}
                  onValueChange={(value) =>
                    setFormData({ ...formData, campus: value })
                  }
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select a campus" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pretoria">Pretoria (Main Campus)</SelectItem>
                    <SelectItem value="kempton-park">Kempton Park Campus</SelectItem>
                    <SelectItem value="stellenbosch">Stellenbosch Campus</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="enquiryType">Enquiry Type</Label>
                <Select
                  value={formData.enquiryType}
                  onValueChange={(value) =>
                    setFormData({ ...formData, enquiryType: value })
                  }
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select enquiry type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Enquiry</SelectItem>
                    <SelectItem value="application">Application Information</SelectItem>
                    <SelectItem value="finance">Financial Aid</SelectItem>
                    <SelectItem value="programme">Programme Details</SelectItem>
                    <SelectItem value="campus-tour">Campus Tour</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Tell us more about your enquiry..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                  className="mt-2 min-h-[150px]"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-[#1e3a5f] hover:bg-[#2a4a7f] text-white py-6 text-lg"
              >
                <Send className="w-5 h-5 mr-2" />
                Send Message
              </Button>
            </form>
          </div>
        </div>

        {/* Campus Locations */}
        <section className="mb-24">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1e3a5f] mb-12">Campus Locations</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="border-l-4 border-[#1e3a5f] pl-6">
              <h3 className="text-2xl font-bold text-[#1e3a5f] mb-4">Pretoria Campus</h3>
              <div className="flex items-start gap-2 text-gray-700 mb-4">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-1" />
                <p>138 Berg Ave, Heatherdale, Pretoria</p>
              </div>
              <a
                href="https://maps.google.com/?q=138+Berg+Ave+Heatherdale+Pretoria"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1e3a5f] hover:underline inline-flex items-center gap-2"
              >
                View on Map
              </a>
            </div>

            <div className="border-l-4 border-[#1e3a5f] pl-6">
              <h3 className="text-2xl font-bold text-[#1e3a5f] mb-4">Kempton Park Campus</h3>
              <div className="flex items-start gap-2 text-gray-700 mb-4">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-1" />
                <p>45A Long Street, Kempton Park</p>
              </div>
              <a
                href="https://maps.google.com/?q=45A+Long+Street+Kempton+Park"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1e3a5f] hover:underline inline-flex items-center gap-2"
              >
                View on Map
              </a>
            </div>

            <div className="border-l-4 border-[#1e3a5f] pl-6">
              <h3 className="text-2xl font-bold text-[#1e3a5f] mb-4">Stellenbosch Campus</h3>
              <div className="flex items-start gap-2 text-gray-700 mb-4">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-1" />
                <p>10 Distillery Road, Stellenbosch</p>
              </div>
              <a
                href="https://maps.google.com/?q=10+Distillery+Road+Stellenbosch"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1e3a5f] hover:underline inline-flex items-center gap-2"
              >
                View on Map
              </a>
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="text-center py-16 border-t-2 border-gray-200">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1e3a5f] mb-6">
            Still have questions?
          </h2>
          <p className="text-xl text-gray-700 mb-10 max-w-2xl mx-auto">
            Our team is here to help you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="bg-[#1e3a5f] hover:bg-[#2a4a7f] text-white px-10 py-4 text-lg transition-colors"
            >
              Send Message
            </a>
            <a
              href="mailto:apply@belgiumcampus.ac.za"
              className="border-2 border-[#1e3a5f] text-[#1e3a5f] hover:bg-[#1e3a5f] hover:text-white px-10 py-4 text-lg transition-colors"
            >
              Apply Now
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

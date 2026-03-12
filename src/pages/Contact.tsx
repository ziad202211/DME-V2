import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, Phone, Mail, Clock, Building, Send } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface ContactSettings {
  contact_title: string;
  contact_description: string;
  addresses: string[];
  phone_numbers: string[];
  emails: string[];
}

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const [contactSettings, setContactSettings] = useState<ContactSettings>({
    contact_title: "Location & Contact",
    contact_description:
      "Get in touch with us for your engineering and project management needs.",
    addresses: ["400 East Pratt Street, Suite 604\nBaltimore, MD 21202"],
    phone_numbers: ["(410) 545-0400"],
    emails: ["info@dmeconsulting-us.com"]
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContactSettings();
  }, []);

  const fetchContactSettings = async () => {
    try {
      const { data, error } = await supabase
        .from("contact_settings")
        .select("*")
        .single();

      if (error && error.code !== "PGRST116") throw error;
      if (data) setContactSettings(data);
    } catch (error) {
      console.error("Error fetching contact settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Form submitted:", formData);

    alert("Thank you for your message. We will get back to you soon!");

    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* HERO */}
      <section className="relative h-screen w-full">
        <img
          src='/contact-2.jpg'
          className="absolute w-full h-full object-cover"
          alt="Contact Header"
        />
        <div className="absolute inset-0 bg-black/55"></div> {/* transparent overlay */}
        <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center md:grid md:grid-cols-2 items-center">
          <div className="text-white">
            <h1 className="font-heading text-4xl font-bold text-[#190ab0] leading-tight">
              {contactSettings.contact_title}
            </h1>
            <p className="mt-2 text-xl leading-relaxed text-white ">
              {contactSettings.contact_description || "Get in touch with us for your engineering and project management needs."}
            </p>
           
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-20">
        <div className="container mx-auto px-6">

          <div className="grid lg:grid-cols-2 gap-14">

            {/* LEFT */}
            <div className="space-y-10">

              {/* CONTACT INFO */}
              <div className="bg-card border border-border rounded-xl p-8 shadow-sm">

  <h2 className="text-xl font-semibold text-foreground mb-8">
    Contact Information
  </h2>

  <div className="grid sm:grid-cols-2 gap-6">

    {contactSettings.addresses.map((address, index) => (
      address.trim() && (
        <div
          key={index}
          className="flex gap-4 p-5 rounded-lg border border-border bg-background"
        >
          <Building className="w-5 h-5 mt-1 text-secondary flex-shrink-0" />

          <div className="text-sm leading-relaxed">
            

            <p className="text-foreground whitespace-pre-line">
              {address}
            </p>
          </div>
        </div>
      )
    ))}
<div className="flex gap-4">
      <Phone className="w-5 h-5 mt-1 text-secondary" />
      <div className="text-sm">
        <p className="font-medium text-foreground mb-1">Phone</p>
        {contactSettings.phone_numbers.map((phone, i) => (
          <p key={i} className="text-muted-foreground">{phone}</p>
        ))}
      </div>
    </div>

    {/* Email */}
    <div className="flex gap-4">
      <Mail className="w-5 h-5 mt-1 text-secondary" />
      <div className="text-sm">
        <p className="font-medium text-foreground mb-1">Email</p>
        {contactSettings.emails.map((email, i) => (
          <p key={i} className="text-muted-foreground">{email}</p>
        ))}
      </div>
    </div>

    {/* Business Hours */}
    <div className="flex gap-4">
      <Clock className="w-5 h-5 mt-1 text-secondary" />
      <div className="text-sm leading-relaxed">
        <p className="font-medium text-foreground mb-1">Business Hours</p>
        <p className="text-muted-foreground">
          Monday – Friday: 9:00 AM – 5:00 PM
          <br />
          Saturday – Sunday: Closed
        </p>
      </div>
    </div>
  </div>

              </div>

              {/* MAP */}
              <div className="bg-card border border-border rounded-xl p-8 shadow-sm">

                <h2 className="text-xl font-semibold text-foreground mb-6">
                  Our Location
                </h2>

                <div className="aspect-video rounded-lg overflow-hidden border">
                  <iframe
                    src="https://maps.google.com/maps?q=39.287267,-76.609353&z=15&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    className="w-full h-full"
                    allowFullScreen
                  />
                </div>

                <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 text-secondary" />
                  Baltimore, Maryland
                </div>
              </div>
            </div>

            {/* FORM */}
            <div className="bg-card border border-border rounded-xl p-10 shadow-sm h-fit">

              <h2 className="text-2xl font-semibold text-foreground mb-10">
                Send a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-7">

                <div className="grid sm:grid-cols-2 gap-6">

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Full Name *
                    </label>

                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="John Doe"
                      className="w-full border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email *
                    </label>

                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="john@example.com"
                      className="w-full border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Phone
                  </label>

                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="(410) 555-0123"
                    className="w-full border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Subject *
                  </label>

                  <input
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    placeholder="How can we help?"
                    className="w-full border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Message *
                  </label>

                  <textarea
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleTextareaChange}
                    required
                    placeholder="Tell us about your project..."
                    className="w-full border border-border rounded-lg px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-secondary text-accent-foreground rounded-lg py-3 text-sm font-semibold hover:opacity-90 transition"
                >
                  <Send size={18} />
                  Send Message
                </button>

              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
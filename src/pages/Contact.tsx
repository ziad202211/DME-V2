import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, Phone, Mail, Clock, Building, Send } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log("Form submitted:", formData);
    // You could also use email service like EmailJS, or connect to a backend API
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
    <div className="min-h-screen">
      <Navbar />

      <section className="bg-primary pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold tracking-[0.2em] text-secondary uppercase">Get in Touch</p>
            <h1 className="font-heading mt-2 text-4xl font-extrabold text-primary-foreground md:text-5xl">
              Location &amp; Contact
            </h1>
            <div className="mx-auto mt-4 h-1 w-20 bg-gradient-to-r from-transparent via-secondary to-transparent rounded-full" />
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Left Column: Contact Information + Map */}
            <div className="space-y-6">
              {/* Contact Information */}
              <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
                <h2 className="font-heading text-lg font-bold text-foreground mb-3">
                  Contact Information
                </h2>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <Building className="h-3 w-3 mt-1 text-secondary flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-1 text-xs">Main Office</h3>
                      <p className="text-muted-foreground text-xs">
                        400 East Pratt Street, Suite 604<br />
                        Baltimore, MD 21202
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Phone className="h-3 w-3 mt-1 text-secondary flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-1 text-xs">Phone</h3>
                      <p className="text-muted-foreground text-xs">
                        (410) 545-0400
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Mail className="h-3 w-3 mt-1 text-secondary flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-1 text-xs">Email</h3>
                      <p className="text-muted-foreground text-xs">
                        info@dmeconsulting-us.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Clock className="h-3 w-3 mt-1 text-secondary flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-1 text-xs">Business Hours</h3>
                      <p className="text-muted-foreground text-xs">
                        Monday - Friday: 9:00 AM - 5:00 PM<br />
                        Saturday - Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map/Location */}
              <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
                <h2 className="font-heading text-lg font-bold text-foreground mb-3">
                  Our Location
                </h2>
                
                <div className="space-y-3">
                  <div className="aspect-video rounded-lg overflow-hidden bg-slate-100">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!2d39.2847!3d-76.6192!2m3!1f0!2f0!2f0!3m2!2i1!4v1!2m2!1i1!4i7!1280!2f2!3f1!5m18!1m12!1m3!2d39.2847!3d-76.6192!2m3!2f0!2f0!3m0!2m0!5m18!1m12!1m1!1s0x0!2s0x0!2e0!5m18!1m12!1m3!2d39.2847!3d-76.6192!2m3!2f0!2f0!3m0!2m0!5m18!1m12!1m1!1s0x0!2s0x0!2e0"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      className="w-full h-full"
                    />
                  </div>
                  
                  <div className="flex items-center gap-2 text-muted-foreground mt-3">
                    <MapPin size={12} className="text-secondary" />
                    <span className="text-xs">Baltimore, Maryland</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div>
              <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
                <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
                  Send Us a Message
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                      placeholder="(410) 555-0123"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleTextareaChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all resize-none"
                      placeholder="Tell us more about your project or inquiry..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 rounded-lg bg-secondary px-6 py-3 font-heading text-sm font-bold text-accent-foreground transition-all hover:bg-secondary/90 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
                  >
                    <Send size={18} />
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;

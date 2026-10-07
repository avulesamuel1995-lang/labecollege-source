import { useState } from "react";
import { Send, MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you ${firstName}! Your enquiry has been received.`);
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setSubject("");
    setMessage("");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-emerald-900 mb-2">Contact Us</h1>
      <p className="text-sm text-slate-600 mb-8">We would love to hear from you. Visit us in Gboko.</p>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-2xl shadow-sm border">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold">First Name</label>
              <input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" className="w-full mt-1 px-3 py-2.5 border border-slate-300 rounded-xl text-xs focus:border-emerald-600 focus:outline-none" required />
            </div>
            <div>
              <label className="text-xs font-semibold">Last Name</label>
              <input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" className="w-full mt-1 px-3 py-2.5 border border-slate-300 rounded-xl text-xs focus:border-emerald-600 focus:outline-none" required />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" className="w-full mt-1 px-3 py-2.5 border border-slate-300 rounded-xl text-xs focus:border-emerald-600 focus:outline-none" required />
          </div>
          <div>
            <label className="text-xs font-semibold">Phone</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number" className="w-full mt-1 px-3 py-2.5 border border-slate-300 rounded-xl text-xs focus:border-emerald-600 focus:outline-none" />
          </div>
          <div>
            <label className="text-xs font-semibold">Subject</label>
            <input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Subject" className="w-full mt-1 px-3 py-2.5 border border-slate-300 rounded-xl text-xs focus:border-emerald-600 focus:outline-none" />
          </div>
          <div>
            <label className="text-xs font-semibold">Message</label>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Please write your message..." rows={5} className="w-full mt-1 px-3 py-2.5 border border-slate-300 rounded-xl text-xs focus:border-emerald-600 focus:outline-none" required></textarea>
          </div>
          <button type="submit" className="w-full py-3.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-colors flex items-center justify-center gap-2">
            <Send className="w-4 h-4 text-amber-300" />
            Submit Official Enquiry
          </button>
        </form>

        {/* Real Gboko Map */}
        <div className="space-y-6">
          <div className="rounded-2xl overflow-hidden h-[400px] shadow-sm border">
            <iframe
              title="Labe College Gboko"
              src="https://www.google.com/maps?q=Gboko%20Benue%20Nigeria&z=14&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
          <div className="bg-white p-5 rounded-2xl border shadow-sm space-y-3 text-xs text-slate-700">
            <p className="flex gap-2 items-center"><MapPin className="w-4 h-4 text-emerald-700" /> Labe, Gboko LGA, Benue State, Nigeria</p>
            <p className="flex gap-2 items-center"><Phone className="w-4 h-4 text-emerald-700" /> +234 8126799565</p>
            <p className="flex gap-2 items-center"><Mail className="w-4 h-4 text-emerald-700" /> info@labecollegeofnursing.com.ng</p>
            <p className="flex gap-2 items-center"><Clock className="w-4 h-4 text-emerald-700" /> Mon - Fri, 8am - 5pm</p>
            <a href="https://www.google.com/maps/search/?api=1&query=Gboko+Benue+State" target="_blank" className="inline-block mt-2 px-4 py-2 bg-emerald-800 text-white rounded-lg text-xs font-bold">Open in Google Maps</a>
          </div>
        </div>
      </div>
    </div>
  );
}

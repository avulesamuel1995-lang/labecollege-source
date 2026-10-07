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
    alert("Enquiry submitted!");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-emerald-900 mb-8">Contact Us</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-2xl shadow-sm border">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold">First Name</label>
              <input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-xs focus:border-emerald-600 focus:outline-none" />
            </div>
            <div>
              <label className="text-xs font-semibold">Last Name</label>
              <input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-xs focus:border-emerald-600 focus:outline-none" />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-xs focus:border-emerald-600 focus:outline-none" />
          </div>

          <div>
            <label className="text-xs font-semibold">Phone</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number" className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-xs focus:border-emerald-600 focus:outline-none" />
          </div>

          <div>
            <label className="text-xs font-semibold">Subject</label>
            <input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Subject" className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-xs focus:border-emerald-600 focus:outline-none" />
          </div>

          <div>
            <label className="text-xs font-semibold">Message</label>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Please write your message..." rows={5} className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-xs focus:border-emerald-600 focus:outline-none"></textarea>
          </div>

          <button type="submit" className="w-full py-3.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer">
            <Send className="w-4 h-4 text-amber-300" />
            Submit Official Enquiry
          </button>
        </form>

        {/* Gboko Map */}
        <div className="mt-0 w-full">
          <div className="bg-slate-100 rounded-2xl h-[400px] flex items-center justify-center">
            <p className="text-sm text-slate-500 flex items-center gap-2"><MapPin className="w-4 h-4" /> Gboko Map will be here</p>
          </div>
          <div className="mt-6 space-y-3 text-xs text-slate-600">
            <p className="flex gap-2"><Phone className="w-4 h-4 text-emerald-700" /> +234 8126799565</p>
            <p className="flex gap-2"><Mail className="w-4 h-4 text-emerald-700" /> info@labecollegenursing.com</p>
            <p className="flex gap-2"><Clock className="w-4 h-4 text-emerald-700" /> Mon - Fri, 8am - 5pm</p>
          </div>
        </div>
      </div>
    </div>
  );
}

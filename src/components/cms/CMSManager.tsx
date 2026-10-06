import React, { useState } from 'react';
import { useCollege } from '../../context/CollegeContext';
import {
  Officer,
  Programme,
  Department,
  Facility,
  GalleryItem,
  NewsItem,
  Announcement,
  DownloadItem,
  SiteSettings,
  HomepageContent,
  AboutContent,
} from '../../types/college';
import {
  Save,
  Plus,
  Trash2,
  Edit,
  Globe,
  Layout,
  Info,
  Users,
  BookOpen,
  Building,
  Image,
  Newspaper,
  Bell,
  Download,
  Shield,
  CheckCircle2,
} from 'lucide-react';

export const CMSManager: React.FC = () => {
  const {
    siteSettings,
    updateSiteSettings,
    homepage,
    updateHomepage,
    about,
    updateAbout,
    officers,
    saveOfficer,
    deleteOfficer,
    programmes,
    saveProgramme,
    deleteProgramme,
    facilities,
    saveFacility,
    deleteFacility,
    gallery,
    saveGalleryItem,
    deleteGalleryItem,
    news,
    saveNewsItem,
    deleteNewsItem,
    announcements,
    saveAnnouncement,
    deleteAnnouncement,
    downloads,
    saveDownloadItem,
    deleteDownloadItem,
    auditLogs,
  } = useCollege();

  const [activeSection, setActiveSection] = useState<
    | 'general'
    | 'hero'
    | 'about'
    | 'officers'
    | 'programmes'
    | 'facilities'
    | 'gallery'
    | 'news'
    | 'announcements'
    | 'downloads'
    | 'audit'
  >('general');

  // Form states for general
  const [genCollegeName, setGenCollegeName] = useState(siteSettings.collegeName);
  const [genMotto, setGenMotto] = useState(siteSettings.motto);
  const [genDiocese, setGenDiocese] = useState(siteSettings.diocese);
  const [genAddress, setGenAddress] = useState(siteSettings.address);
  const [genPhone, setGenPhone] = useState(siteSettings.phone);
  const [genEmail, setGenEmail] = useState(siteSettings.email);
  const [genBishop, setGenBishop] = useState(siteSettings.bishopName);

  // Form states for hero
  const [heroHeading, setHeroHeading] = useState(homepage.hero.heading);
  const [heroDesc, setHeroDesc] = useState(homepage.hero.description);
  const [heroImage, setHeroImage] = useState(homepage.hero.heroImageUrl);
  const [heroBtnText, setHeroBtnText] = useState(homepage.hero.buttonText);
  const [welcomeProvost, setWelcomeProvost] = useState(homepage.welcomeMessage.provostName);
  const [welcomeMsg, setWelcomeMsg] = useState(homepage.welcomeMessage.message);

  // Officer editing state
  const [editingOfficer, setEditingOfficer] = useState<Officer | null>(null);

  // Programme editing state
  const [editingProgramme, setEditingProgramme] = useState<Programme | null>(null);

  // News editing state
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);

  // Announcement editing state
  const [editingAnn, setEditingAnn] = useState<Announcement | null>(null);

  // Gallery photo state
  const [newPhotoTitle, setNewPhotoTitle] = useState('');
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [newPhotoCat, setNewPhotoCat] = useState<'Campus' | 'Laboratories' | 'Clinical' | 'Matriculation' | 'Sports'>('Laboratories');
  const [newPhotoCaption, setNewPhotoCaption] = useState('');

  const handleSaveGeneral = async () => {
    await updateSiteSettings({
      collegeName: genCollegeName,
      motto: genMotto,
      diocese: genDiocese,
      address: genAddress,
      phone: genPhone,
      email: genEmail,
      bishopName: genBishop,
    });
    alert('General College Information & Diocesan Details updated in CMS!');
  };

  const handleSaveHero = async () => {
    await updateHomepage({
      hero: {
        ...homepage.hero,
        heading: heroHeading,
        description: heroDesc,
        heroImageUrl: heroImage,
        buttonText: heroBtnText,
      },
      welcomeMessage: {
        ...homepage.welcomeMessage,
        provostName: welcomeProvost,
        message: welcomeMsg,
      },
    });
    alert('Homepage & Provost welcome updated in CMS!');
  };

  const handleAddGalleryPhoto = async () => {
    if (!newPhotoTitle || !newPhotoUrl) {
      alert('Please provide a photo title and image URL');
      return;
    }
    const item: GalleryItem = {
      id: `gal-${Date.now()}`,
      title: newPhotoTitle,
      category: newPhotoCat,
      imageUrl: newPhotoUrl,
      caption: newPhotoCaption,
      date: new Date().toISOString().split('T')[0],
      displayOrder: gallery.length + 1,
      published: true,
    };
    await saveGalleryItem(item);
    setNewPhotoTitle('');
    setNewPhotoUrl('');
    setNewPhotoCaption('');
    alert('New photograph added to college public gallery!');
  };

  return (
    <div className="space-y-8">
      {/* CMS Header */}
      <div className="bg-gradient-to-r from-purple-950 via-purple-900 to-indigo-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-purple-800 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-xs uppercase tracking-widest text-amber-300 font-bold block">
            Authorized Content Administration
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Website Content Management System (CMS)
          </h1>
          <p className="text-xs text-purple-200 mt-1">
            Update public college content, officers, programmes, and press releases without touching source code.
          </p>
        </div>

        <div className="bg-white/10 px-4 py-2 rounded-2xl border border-white/20 text-xs text-amber-300 font-mono font-bold">
          LIVE CMS SYNC ACTIVE
        </div>
      </div>

      {/* CMS Module Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
        {[
          { key: 'general', label: 'General & Contact', icon: <Globe className="w-4 h-4" /> },
          { key: 'hero', label: 'Homepage & Hero', icon: <Layout className="w-4 h-4" /> },
          { key: 'officers', label: 'College Officers', icon: <Users className="w-4 h-4" /> },
          { key: 'programmes', label: 'Programmes', icon: <BookOpen className="w-4 h-4" /> },
          { key: 'facilities', label: 'Facilities', icon: <Building className="w-4 h-4" /> },
          { key: 'gallery', label: 'Photo Gallery', icon: <Image className="w-4 h-4" /> },
          { key: 'news', label: 'News Articles', icon: <Newspaper className="w-4 h-4" /> },
          { key: 'announcements', label: 'Announcements', icon: <Bell className="w-4 h-4" /> },
          { key: 'downloads', label: 'Downloads', icon: <Download className="w-4 h-4" /> },
          { key: 'audit', label: 'Audit Trail Logs', icon: <Shield className="w-4 h-4" /> },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveSection(tab.key as any)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeSection === tab.key
                ? 'bg-purple-900 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* SECTION 1: GENERAL & CONTACT */}
      {activeSection === 'general' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-md border border-slate-200 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-lg font-black text-slate-900 uppercase">
              General Institutional Identity & Diocese
            </h2>
            <p className="text-xs text-slate-500">
              Modifications immediately update the public website header, footer, and contact page.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">College Full Name</label>
              <input
                type="text"
                value={genCollegeName}
                onChange={(e) => setGenCollegeName(e.target.value)}
                className="w-full p-2.5 border rounded-xl"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">College Motto</label>
              <input
                type="text"
                value={genMotto}
                onChange={(e) => setGenMotto(e.target.value)}
                className="w-full p-2.5 border rounded-xl"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Diocese / Proprietor</label>
              <input
                type="text"
                value={genDiocese}
                onChange={(e) => setGenDiocese(e.target.value)}
                className="w-full p-2.5 border rounded-xl"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Bishop / Patron Name</label>
              <input
                type="text"
                value={genBishop}
                onChange={(e) => setGenBishop(e.target.value)}
                className="w-full p-2.5 border rounded-xl"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Official Phone Hotline</label>
              <input
                type="text"
                value={genPhone}
                onChange={(e) => setGenPhone(e.target.value)}
                className="w-full p-2.5 border rounded-xl"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Official Registry Email</label>
              <input
                type="email"
                value={genEmail}
                onChange={(e) => setGenEmail(e.target.value)}
                className="w-full p-2.5 border rounded-xl"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block font-semibold text-slate-700 mb-1">Physical Address</label>
              <input
                type="text"
                value={genAddress}
                onChange={(e) => setGenAddress(e.target.value)}
                className="w-full p-2.5 border rounded-xl"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t">
            <button
              onClick={handleSaveGeneral}
              className="px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4 text-amber-300" /> Save General Information
            </button>
          </div>
        </div>
      )}

      {/* SECTION 2: HOMEPAGE & HERO */}
      {activeSection === 'hero' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-md border border-slate-200 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-lg font-black text-slate-900 uppercase">
              Homepage Hero & Provost Welcome Configuration
            </h2>
            <p className="text-xs text-slate-500">
              Control hero banner copy, image backdrops, and Provost welcome message.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Hero Main Heading</label>
              <input
                type="text"
                value={heroHeading}
                onChange={(e) => setHeroHeading(e.target.value)}
                className="w-full p-2.5 border rounded-xl text-sm font-bold"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Hero Subtitle / Description</label>
              <textarea
                rows={3}
                value={heroDesc}
                onChange={(e) => setHeroDesc(e.target.value)}
                className="w-full p-2.5 border rounded-xl"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Hero Background Image URL</label>
                <input
                  type="text"
                  value={heroImage}
                  onChange={(e) => setHeroImage(e.target.value)}
                  className="w-full p-2.5 border rounded-xl font-mono text-xs"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Primary CTA Button Text</label>
                <input
                  type="text"
                  value={heroBtnText}
                  onChange={(e) => setHeroBtnText(e.target.value)}
                  className="w-full p-2.5 border rounded-xl"
                />
              </div>
            </div>

            <div className="pt-4 border-t space-y-3">
              <h3 className="font-bold text-sm text-slate-900">Provost Welcome Message</h3>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Provost Name</label>
                <input
                  type="text"
                  value={welcomeProvost}
                  onChange={(e) => setWelcomeProvost(e.target.value)}
                  className="w-full p-2.5 border rounded-xl"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Provost Welcome Quote</label>
                <textarea
                  rows={4}
                  value={welcomeMsg}
                  onChange={(e) => setWelcomeMsg(e.target.value)}
                  className="w-full p-2.5 border rounded-xl"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t">
            <button
              onClick={handleSaveHero}
              className="px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4 text-amber-300" /> Save Homepage Content
            </button>
          </div>
        </div>
      )}

      {/* SECTION 3: COLLEGE OFFICERS */}
      {activeSection === 'officers' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-md border border-slate-200 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg font-black text-slate-900 uppercase">
                College Officers & Leadership Management
              </h2>
              <p className="text-xs text-slate-500">
                Update the Provost, Registrar, Bursar, Exam Officer, or Bishop without editing code.
              </p>
            </div>
            <button
              onClick={() => {
                const newOfficer: Officer = {
                  id: `off-${Date.now()}`,
                  fullName: 'New Officer Name',
                  position: 'Deputy Provost / Dean',
                  department: 'Academic Directorate',
                  biography: 'Biographical description...',
                  photographUrl: '',
                  email: 'officer@labecollege.edu.ng',
                  phone: '+234 800 000 0000',
                  displayOrder: officers.length + 1,
                  active: true,
                  role: 'lecturer',
                };
                setEditingOfficer(newOfficer);
              }}
              className="px-3.5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Add Officer
            </button>
          </div>

          {editingOfficer && (
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-300 space-y-4">
              <h3 className="font-bold text-xs uppercase text-emerald-900">
                Edit Officer Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={editingOfficer.fullName}
                    onChange={(e) => setEditingOfficer({ ...editingOfficer, fullName: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 mb-1">Position / Office</label>
                  <input
                    type="text"
                    value={editingOfficer.position}
                    onChange={(e) => setEditingOfficer({ ...editingOfficer, position: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 mb-1">Department</label>
                  <input
                    type="text"
                    value={editingOfficer.department}
                    onChange={(e) => setEditingOfficer({ ...editingOfficer, department: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 mb-1">Photo URL</label>
                  <input
                    type="text"
                    value={editingOfficer.photographUrl}
                    onChange={(e) => setEditingOfficer({ ...editingOfficer, photographUrl: e.target.value })}
                    className="w-full p-2 border rounded-lg font-mono"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setEditingOfficer(null)}
                  className="px-3 py-1.5 bg-slate-200 text-slate-700 rounded-lg text-xs"
                >
                  Cancel
                </button>
                <button
                  onClick={async () => {
                    await saveOfficer(editingOfficer);
                    setEditingOfficer(null);
                    alert('Officer record saved!');
                  }}
                  className="px-4 py-1.5 bg-emerald-800 text-white font-bold rounded-lg text-xs"
                >
                  Save Officer
                </button>
              </div>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="bg-slate-50 text-slate-600 uppercase text-[10px] font-bold border-b border-slate-200">
                  <th className="py-2.5 px-3">Photo</th>
                  <th className="py-2.5 px-3">Name</th>
                  <th className="py-2.5 px-3">Office</th>
                  <th className="py-2.5 px-3">Department</th>
                  <th className="py-2.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {officers.map((off) => (
                  <tr key={off.id} className="hover:bg-slate-50">
                    <td className="py-2.5 px-3">
                      {off.photographUrl ? (
                        <img
                          src={off.photographUrl}
                          alt={off.fullName}
                          className="w-8 h-8 rounded-full object-cover border"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-950 flex items-center justify-center font-bold text-xs border border-emerald-300">
                          {off.fullName.charAt(0)}
                        </div>
                      )}
                    </td>
                    <td className="py-2.5 px-3 font-bold text-slate-900">{off.fullName}</td>
                    <td className="py-2.5 px-3 font-semibold text-emerald-900">{off.position}</td>
                    <td className="py-2.5 px-3 text-slate-500">{off.department}</td>
                    <td className="py-2.5 px-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setEditingOfficer(off)}
                          className="p-1 text-slate-600 hover:text-emerald-800"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteOfficer(off.id)}
                          className="p-1 text-slate-400 hover:text-rose-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SECTION 4: GALLERY MANAGEMENT */}
      {activeSection === 'gallery' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-md border border-slate-200 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-lg font-black text-slate-900 uppercase">
              Photo Gallery CMS (ADMIN → WEBSITE CONTENT → GALLERY → ADD PHOTOS)
            </h2>
            <p className="text-xs text-slate-500">
              Easily upload new school pictures, clinical sessions, and matriculation photos without code.
            </p>
          </div>

          {/* Add Photo Form */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
            <h3 className="font-bold text-xs uppercase text-emerald-950 flex items-center gap-1.5">
              <Plus className="w-4 h-4" /> Upload New Photograph
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="block text-slate-700 mb-1">Photo Title *</label>
                <input
                  type="text"
                  placeholder="e.g. Matriculation Ceremony"
                  value={newPhotoTitle}
                  onChange={(e) => setNewPhotoTitle(e.target.value)}
                  className="w-full p-2 border rounded-xl"
                />
              </div>
              <div>
                <label className="block text-slate-700 mb-1">Image URL / Storage Ref *</label>
                <input
                  type="text"
                  placeholder="https://example.com/photo.jpg or image URL..."
                  value={newPhotoUrl}
                  onChange={(e) => setNewPhotoUrl(e.target.value)}
                  className="w-full p-2 border rounded-xl font-mono text-xs"
                />
              </div>
              <div>
                <label className="block text-slate-700 mb-1">Category</label>
                <select
                  value={newPhotoCat}
                  onChange={(e) => setNewPhotoCat(e.target.value as any)}
                  className="w-full p-2 border rounded-xl"
                >
                  <option value="Laboratories">Laboratories</option>
                  <option value="Campus">Campus</option>
                  <option value="Matriculation">Matriculation</option>
                  <option value="Clinical">Clinical</option>
                  <option value="Sports">Sports</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs text-slate-700 mb-1">Caption / Description</label>
              <input
                type="text"
                placeholder="Brief explanatory caption..."
                value={newPhotoCaption}
                onChange={(e) => setNewPhotoCaption(e.target.value)}
                className="w-full p-2 border rounded-xl text-xs"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleAddGalleryPhoto}
                className="px-5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer"
              >
                + Add Photo to Public Gallery
              </button>
            </div>
          </div>

          {/* Existing Gallery Table */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            {gallery.map((g) => (
              <div key={g.id} className="relative group rounded-xl overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center">
                {g.imageUrl ? (
                  <img src={g.imageUrl} alt={g.title} className="w-full h-24 object-cover" />
                ) : (
                  <div className="w-full h-24 flex items-center justify-center text-xs text-slate-400">
                    No Image
                  </div>
                )}
                <button
                  onClick={() => deleteGalleryItem(g.id)}
                  className="absolute top-1 right-1 bg-rose-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Delete from Gallery"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
                <div className="p-2 bg-white text-[10px]">
                  <p className="font-bold truncate">{g.title}</p>
                  <p className="text-slate-400">{g.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION: ANNOUNCEMENT MANAGEMENT */}
      {activeSection === 'announcements' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-md border border-slate-200 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg font-black text-slate-900 uppercase">
                Global Notice & Announcement Manager
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Type a notice, publish it to the website, edit it later, or delete it completely.
                Published notices appear on the global notice bar and Announcements page.
              </p>
            </div>
            <button
              onClick={() =>
                setEditingAnn({
                  id: `ann-${Date.now()}`,
                  title: '',
                  message: '',
                  date: new Date().toISOString().slice(0, 10),
                  expiryDate: '',
                  priority: 'normal',
                  active: true,
                  linkText: '',
                  linkUrl: '',
                })
              }
              className="px-4 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Create New Notice
            </button>
          </div>

          {editingAnn && (
            <div className="rounded-2xl border-2 border-emerald-100 bg-emerald-50/50 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-black text-slate-900">
                  {announcements.some((a) => a.id === editingAnn.id) ? 'Edit Notice' : 'Write New Notice'}
                </h3>
                <button
                  type="button"
                  onClick={() => setEditingAnn(null)}
                  className="text-slate-500 hover:text-slate-900 text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">Notice Title</label>
                  <input
                    type="text"
                    value={editingAnn.title}
                    onChange={(e) => setEditingAnn({ ...editingAnn, title: e.target.value })}
                    placeholder="e.g. 2026/2027 Admission Notice"
                    className="w-full p-3 border rounded-xl bg-white"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">Notice / Announcement</label>
                  <textarea
                    rows={5}
                    value={editingAnn.message}
                    onChange={(e) => setEditingAnn({ ...editingAnn, message: e.target.value })}
                    placeholder="Type the full notice that should be published..."
                    className="w-full p-3 border rounded-xl bg-white resize-y"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Priority</label>
                  <select
                    value={editingAnn.priority}
                    onChange={(e) =>
                      setEditingAnn({
                        ...editingAnn,
                        priority: e.target.value as Announcement['priority'],
                      })
                    }
                    className="w-full p-3 border rounded-xl bg-white"
                  >
                    <option value="normal">Normal</option>
                    <option value="important">Important</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Publication Date</label>
                  <input
                    type="date"
                    value={editingAnn.date}
                    onChange={(e) => setEditingAnn({ ...editingAnn, date: e.target.value })}
                    className="w-full p-3 border rounded-xl bg-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Expiry Date (optional)</label>
                  <input
                    type="date"
                    value={editingAnn.expiryDate || ''}
                    onChange={(e) => setEditingAnn({ ...editingAnn, expiryDate: e.target.value })}
                    className="w-full p-3 border rounded-xl bg-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Button Text (optional)</label>
                  <input
                    type="text"
                    value={editingAnn.linkText || ''}
                    onChange={(e) => setEditingAnn({ ...editingAnn, linkText: e.target.value })}
                    placeholder="Learn More"
                    className="w-full p-3 border rounded-xl bg-white"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">Button Link (optional)</label>
                  <input
                    type="text"
                    value={editingAnn.linkUrl || ''}
                    onChange={(e) => setEditingAnn({ ...editingAnn, linkUrl: e.target.value })}
                    placeholder="/announcements or /admission"
                    className="w-full p-3 border rounded-xl bg-white"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-emerald-100 pt-4">
                <label className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingAnn.active}
                    onChange={(e) => setEditingAnn({ ...editingAnn, active: e.target.checked })}
                    className="w-4 h-4"
                  />
                  Publish this notice now
                </label>
                <button
                  onClick={async () => {
                    if (!editingAnn.title.trim() || !editingAnn.message.trim()) {
                      alert('Please enter both a notice title and notice message.');
                      return;
                    }
                    await saveAnnouncement({
                      ...editingAnn,
                      title: editingAnn.title.trim(),
                      message: editingAnn.message.trim(),
                    });
                    setEditingAnn(null);
                  }}
                  className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" /> {editingAnn.active ? 'Publish Notice' : 'Save as Draft'}
                </button>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {announcements.length === 0 ? (
              <div className="text-center py-12 rounded-2xl border border-dashed border-slate-300 text-slate-500 text-sm">
                No notices yet. Click <strong>Create New Notice</strong> to publish one.
              </div>
            ) : (
              announcements.map((ann) => (
                <div
                  key={ann.id}
                  className={`rounded-2xl border p-4 ${
                    ann.active
                      ? 'border-emerald-200 bg-emerald-50/40'
                      : 'border-slate-200 bg-slate-50'
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="font-black text-slate-900">{ann.title}</h3>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                          ann.priority === 'urgent'
                            ? 'bg-rose-100 text-rose-700'
                            : ann.priority === 'important'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {ann.priority}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                          ann.active ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-500'
                        }`}>
                          {ann.active ? 'Published' : 'Draft / Hidden'}
                        </span>
                      </div>
                      <p className="text-sm text-slate-700 whitespace-pre-wrap">{ann.message}</p>
                      <p className="text-[10px] text-slate-400 mt-2">
                        Published date: {ann.date}
                        {ann.expiryDate ? ` • Expires: ${ann.expiryDate}` : ''}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => setEditingAnn(ann)}
                        className="px-3 py-2 bg-white border border-slate-200 hover:bg-slate-100 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                      >
                        <Edit className="w-3.5 h-3.5" /> Edit
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete "${ann.title}" permanently?`)) {
                            deleteAnnouncement(ann.id);
                          }
                        }}
                        className="px-3 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* SECTION 5: AUDIT LOG VIEWER */}
      {activeSection === 'audit' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-md border border-slate-200 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-lg font-black text-slate-900 uppercase">
              Immutable System & Academic Audit Trail
            </h2>
            <p className="text-xs text-slate-500">
              Security log of all financial transactions, score modifications, admission approvals, and CMS updates.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="bg-slate-50 text-slate-600 uppercase text-[10px] font-bold border-b border-slate-200">
                  <th className="py-2.5 px-3">Timestamp</th>
                  <th className="py-2.5 px-3">Actor / User</th>
                  <th className="py-2.5 px-3">Role</th>
                  <th className="py-2.5 px-3">Action</th>
                  <th className="py-2.5 px-3">Record Affected</th>
                  <th className="py-2.5 px-3">Reason / Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 text-slate-500">{log.timestamp}</td>
                    <td className="py-2.5 px-3 font-sans font-bold text-slate-900">{log.userName}</td>
                    <td className="py-2.5 px-3 capitalize text-purple-900 font-bold">{log.role.replace('_', ' ')}</td>
                    <td className="py-2.5 px-3 font-sans font-semibold text-emerald-900">{log.action}</td>
                    <td className="py-2.5 px-3 text-slate-700">{log.recordAffected}</td>
                    <td className="py-2.5 px-3 text-slate-500 font-sans">{log.reason || log.newValue || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

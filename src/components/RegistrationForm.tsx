import React, { useState } from "react";

const INTEREST_REASONS = [
  { value: "ASTROPHYSICS", label: "Astrophysics" },
  { value: "BECOME_SCIENTIST", label: "Become a Scientist" },
  { value: "SPACE_EXPLORATION", label: "Space Exploration" },
  { value: "ASTRONOMY_HOBBY", label: "Astronomy Hobby" },
  { value: "CAREER_DEVELOPMENT", label: "Career Development" },
  { value: "ACADEMIC_REQUIREMENT", label: "Academic Requirement" },
  { value: "CURIOSITY", label: "Curiosity" },
  { value: "OTHER", label: "Other" },
];

const RESEND_API_KEY = import.meta.env.VITE_RESEND_API_KEY;

export function RegistrationForm({ eventId, onSuccess, onError, loading, setLoading, email, id }: any) {
  const [form, setForm] = useState({
    fullName: "",
    email: email,
    phoneNumber: "",
    age: "",
    occupation: "",
    organization: "",
    interestReason: "",
    otherReason: "",
    experience: "",
    expectations: "",
    questions: "",
    id: id
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onError(null);
    setLoading(true);
    try {
      const res = await fetch(`https://propagation-be.onrender.com/events/${eventId}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          age: form.age ? Number(form.age) : undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");
      setSubmitted(true);
      onSuccess("Registration successful! You'll be notified about the details of the event in your email.");
    } catch (err: any) {
      onError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Animation classes
  const fadeIn = "animate-fade-in";
  const inputBase =
    "w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 bg-white placeholder-gray-400";
  const labelBase = "block text-gray-700 font-medium mb-1";
  const buttonBase =
    "w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 shadow";

  return (
    <div className={`relative ${fadeIn}`}>
      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className={labelBase}>Full Name*</label>
            <input name="fullName" required placeholder="Full Name" className={inputBase} value={form.fullName} onChange={handleChange} />
          </div>
          <div>
            <label className={labelBase}>Email*</label>
            <input name="email" type="email" required placeholder="Email" className={inputBase} value={form.email} onChange={handleChange} />
          </div>
          <div>
            <label className={labelBase}>Phone Number*</label>
            <input name="phoneNumber" required placeholder="Phone Number" className={inputBase} value={form.phoneNumber} onChange={handleChange} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelBase}>Age</label>
              <input name="age" type="number" placeholder="Age" className={inputBase} value={form.age} onChange={handleChange} />
            </div>
            <div>
              <label className={labelBase}>Occupation</label>
              <input name="occupation" placeholder="Occupation" className={inputBase} value={form.occupation} onChange={handleChange} />
            </div>
          </div>
          <div>
            <label className={labelBase}>Organization</label>
            <input name="organization" placeholder="Organization" className={inputBase} value={form.organization} onChange={handleChange} />
          </div>
          <div>
            <label className={labelBase}>Interest Reason*</label>
            <select name="interestReason" required className={inputBase} value={form.interestReason} onChange={handleChange}>
              <option value="">Select Interest Reason</option>
              {INTEREST_REASONS.map((r) => (
                <option key={r.value} value={r.value}>{r.label}</option>
              ))}
            </select>
          </div>
          {form.interestReason === "OTHER" && (
            <div>
              <label className={labelBase}>Other Reason</label>
              <input name="otherReason" placeholder="Please specify other reason" className={inputBase} value={form.otherReason} onChange={handleChange} />
            </div>
          )}
          <div>
            <label className={labelBase}>Your Experience</label>
            <textarea name="experience" placeholder="Your experience (optional)" className={inputBase} value={form.experience} onChange={handleChange} />
          </div>
          <div>
            <label className={labelBase}>Your Expectations</label>
            <textarea name="expectations" placeholder="Your expectations (optional)" className={inputBase} value={form.expectations} onChange={handleChange} />
          </div>
          <div>
            <label className={labelBase}>Any Questions?</label>
            <textarea name="questions" placeholder="Any questions? (optional)" className={inputBase} value={form.questions} onChange={handleChange} />
          </div>
          <button type="submit" disabled={loading} className={buttonBase + (loading ? " opacity-60 cursor-not-allowed" : "")}>
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Registering...
              </span>
            ) : (
              "Submit Registration"
            )}
          </button>
        </form>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 animate-fade-in">
          <div className="mb-4">
            {/* Animated checkmark */}
            <svg className="w-16 h-16 text-green-500 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" className="opacity-20" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M7 13l3 3 7-7" />
            </svg>
          </div>
          <div className="text-2xl font-bold text-green-600 mb-2">Registration Successful!</div>
          <div className="text-gray-700 text-center max-w-xs">
            You'll be notified about the details of the event in your email.
          </div>
        </div>
      )}
      <style>
        {`
        .animate-fade-in {
          animation: fadeIn 0.7s;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px);}
          to { opacity: 1; transform: translateY(0);}
        }
        `}
      </style>
    </div>
  );
}
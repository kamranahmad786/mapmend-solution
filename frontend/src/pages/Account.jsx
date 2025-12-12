import React, { useState } from "react";
import { FiUser, FiMail, FiLock, FiTrash2 } from "react-icons/fi";

export default function Account() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    newPassword: "",
  });

  const updateField = (f, v) => setForm({ ...form, [f]: v });

  return (
    <div className="animate-fadeIn">
      <h1 className="text-3xl font-extrabold text-brandBlue mb-6">
        Account Settings
      </h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* LEFT — PROFILE SUMMARY CARD */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-brandBlue/10 rounded-full flex items-center justify-center">
              <FiUser className="text-4xl text-brandBlue" />
            </div>

            <h2 className="mt-4 text-xl font-semibold text-brandBlue">
              Your Profile
            </h2>
            <p className="text-gray-500 text-sm mt-1">Manage your account details</p>

            <button
              className="mt-6 px-6 py-2 bg-brandBlue text-white rounded-lg shadow hover:bg-brandBlue/90 transition"
            >
              Upload New Photo
            </button>
          </div>
        </div>

        {/* RIGHT — SETTINGS FORMS */}
        <div className="md:col-span-2 space-y-10">

          {/* UPDATE PROFILE SECTION */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h3 className="text-xl font-bold text-brandBlue mb-4">
              Profile Information
            </h3>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="text-sm font-medium text-gray-600">Full Name</label>
                <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border mt-1">
                  <FiUser className="text-brandBlue" />
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    className="w-full bg-transparent outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">Email Address</label>
                <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border mt-1">
                  <FiMail className="text-brandBlue" />
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    className="w-full bg-transparent outline-none"
                  />
                </div>
              </div>
            </div>

            <button className="mt-6 px-6 py-2 bg-brandOrange text-white rounded-lg shadow hover:bg-brandOrange/90 transition">
              Save Changes
            </button>
          </div>

          {/* CHANGE PASSWORD SECTION */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h3 className="text-xl font-bold text-brandBlue mb-4">Change Password</h3>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Current Password</label>
                <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border mt-1">
                  <FiLock className="text-brandBlue" />
                  <input
                    type="password"
                    placeholder="Current Password"
                    value={form.password}
                    onChange={(e) => updateField("password", e.target.value)}
                    className="w-full bg-transparent outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">New Password</label>
                <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border mt-1">
                  <FiLock className="text-brandBlue" />
                  <input
                    type="password"
                    placeholder="New Password"
                    value={form.newPassword}
                    onChange={(e) => updateField("newPassword", e.target.value)}
                    className="w-full bg-transparent outline-none"
                  />
                </div>
              </div>
            </div>

            <button className="mt-6 px-6 py-2 bg-brandBlue text-white rounded-lg shadow hover:bg-brandBlue/90 transition">
              Update Password
            </button>
          </div>

          {/* ACCOUNT DELETION */}
          <div className="bg-red-50 border border-red-200 rounded-2xl shadow p-8">
            <h3 className="text-xl font-bold text-red-600">Danger Zone</h3>
            <p className="text-gray-600 mt-2">
              Deleting your account is permanent and cannot be undone.
            </p>

            <button
              className="mt-4 flex items-center gap-2 px-6 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition"
            >
              <FiTrash2 /> Delete Account
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react'
import { useAuth } from './AuthProvider'
import { databaseService } from '../services/database'
import { apiClient } from '../services/api'

export function UserProfile() {
  const { user, profile, updateProfile, signOut } = useAuth()
  const [stats, setStats] = useState({
    postsCount: 0,
    totalViews: 0,
    lastLogin: ''
  })
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    location: '',
    website: '',
    github: '',
    linkedin: ''
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        bio: profile.bio || '',
        location: profile.location || '',
        website: profile.website || '',
        github: profile.github || '',
        linkedin: profile.linkedin || ''
      })
      loadUserStats()
    }
  }, [profile])

  const loadUserStats = async () => {
    if (!user) return
    
    try {
      const result = await databaseService.getUserDashboardData(user.id)
      if (result.success && result.dashboard) {
        setStats({
          postsCount: result.dashboard.postsCount,
          totalViews: result.dashboard.totalViews,
          lastLogin: profile?.last_login ? new Date(profile.last_login).toLocaleDateString() : 'Never'
        })
      }
    } catch (error) {
      console.error('Failed to load user stats:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return
    
    setLoading(true)
    try {
      await updateProfile(formData)
      setIsEditing(false)
    } catch (error) {
      console.error('Failed to update profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !user) return

    try {
      const result = await databaseService.uploadFile(file, 'avatars')
      if (result.success) {
        await updateProfile({ avatar_url: result.url })
      }
    } catch (error) {
      console.error('Failed to upload avatar:', error)
    }
  }

  if (!user || !profile) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Please sign in to view your profile.</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <div className="relative">
            <img
              src={profile.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name || user.email)}&background=6366f1&color=fff`}
              alt={profile.name || user.email}
              className="w-20 h-20 rounded-full border-4 border-white dark:border-gray-800 shadow-lg"
            />
            <label className="absolute bottom-0 right-0 bg-indigo-600 text-white p-1 rounded-full cursor-pointer hover:bg-indigo-700 transition">
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileUpload}
              />
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </label>
          </div>
          <div>
            <h1 className="text-2xl font-bold">{profile.name || user.email}</h1>
            <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
            <span className="inline-block px-2 py-1 text-xs font-semibold bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 rounded-full mt-1">
              {profile.role}
            </span>
          </div>
        </div>
        <button
          onClick={signOut}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Sign Out
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
          <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
            {stats.postsCount}
          </div>
          <div className="text-gray-600 dark:text-gray-400">Posts</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
          <div className="text-3xl font-bold text-green-600 dark:text-green-400">
            {stats.totalViews}
          </div>
          <div className="text-gray-600 dark:text-gray-400">Total Views</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
          <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
            {stats.lastLogin}
          </div>
          <div className="text-gray-600 dark:text-gray-400">Last Login</div>
        </div>
      </div>

      {/* Profile Form */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Profile Information</h2>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Enter your location"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Bio</label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                placeholder="Tell us about yourself"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Website</label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                  placeholder="https://example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">GitHub</label>
                <input
                  type="url"
                  value={formData.github}
                  onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                  placeholder="https://github.com/username"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">LinkedIn</label>
              <input
                type="url"
                value={formData.linkedin}
                onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                placeholder="https://linkedin.com/in/username"
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Name</h3>
                <p className="mt-1">{profile.name || 'Not set'}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Location</h3>
                <p className="mt-1">{profile.location || 'Not set'}</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Bio</h3>
              <p className="mt-1">{profile.bio || 'No bio provided'}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Website</h3>
                {profile.website ? (
                  <a
                    href={profile.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 text-indigo-600 hover:underline"
                  >
                    {profile.website}
                  </a>
                ) : (
                  <p className="mt-1">Not set</p>
                )}
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">GitHub</h3>
                {profile.github ? (
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 text-indigo-600 hover:underline"
                  >
                    {profile.github}
                  </a>
                ) : (
                  <p className="mt-1">Not set</p>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">LinkedIn</h3>
              {profile.linkedin ? (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 text-indigo-600 hover:underline"
                >
                  {profile.linkedin}
                </a>
              ) : (
                <p className="mt-1">Not set</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Account Settings */}
      <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-6">Account Settings</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Email Address</h3>
            <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
            <p className="text-sm text-gray-500 mt-1">
              {user.email_confirmed_at ? '✓ Email verified' : '⚠ Email not verified'}
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">Account Created</h3>
            <p className="text-gray-600 dark:text-gray-400">
              {new Date(profile.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
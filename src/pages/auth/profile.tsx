import { createRoute, type AnyRoute } from "@tanstack/react-router"
import { ProtectedRoute } from "../../components/ProtectedRoute"
import { useAuth } from "../../hooks/useAuth"
import { useUserData } from "../../hooks/useUserData"
import { useState } from "react"

export default (parent: AnyRoute) =>
  createRoute({
    path: "/profile",
    getParentRoute: () => parent,
    component: ProfilePage,
  })

function ProfilePage() {
  const { user, profile, signOut, updateProfile } = useAuth()
  const { data, loading, error, refreshData } = useUserData()
  const [activeTab, setActiveTab] = useState('overview')
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: profile?.name || '',
    bio: profile?.bio || '',
    location: profile?.location || '',
    website: profile?.website || '',
    github: profile?.github || '',
    linkedin: profile?.linkedin || ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await updateProfile(formData)
    if (result.success) {
      setIsEditing(false)
    }
  }

  if (loading) {
    return (
      <div className="profile-loading">
        <div className="profile-spinner"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="profile-container">
        <div className="profile-content">
          <div className="profile-error">
            <h2 className="profile-error-title">Error Loading Profile</h2>
            <p className="profile-error-text">{error}</p>
            <button onClick={refreshData} className="profile-btn profile-btn-primary">
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <ProtectedRoute>
      <div className="profile-container">
        <div className="profile-bg-effects">
          <div className="profile-bg-orb"></div>
          <div className="profile-bg-orb"></div>
          <div className="profile-bg-orb"></div>
        </div>

        <div className="profile-content">
          {/* Header */}
          <div className="profile-header">
            <h1 className="profile-header-title">My Profile</h1>
            <p className="profile-header-subtitle">
              Manage your account settings and view your activity
            </p>
          </div>

          {/* Banner with Avatar and Info */}
          <div className="profile-banner">
            <div className="profile-banner-content">
              <div className="profile-avatar-wrapper">
                <img
                  src={profile?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile?.name || user?.email || 'U')}&background=6366f1&color=fff&size=200`}
                  alt={profile?.name || user?.email}
                  className="profile-avatar"
                />
                <label className="profile-avatar-upload">
                  <input type="file" accept="image/*" />
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </label>
              </div>

              <div className="profile-info">
                <h2 className="profile-name">{profile?.name || user?.email}</h2>
                <p className="profile-email">{user?.email}</p>
                <span className="profile-badge">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  {profile?.role || 'user'}
                </span>
              </div>

              <div className="profile-actions">
                <button className="profile-btn profile-btn-primary">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit Profile
                </button>
                <button onClick={signOut} className="profile-btn profile-btn-danger">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Sign Out
                </button>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="profile-stats-grid">
            <div className="profile-stat-card">
              <div className="profile-stat-value">{data?.posts?.length || 0}</div>
              <div className="profile-stat-label">Total Posts</div>
            </div>
            <div className="profile-stat-card">
              <div className="profile-stat-value">{data?.dashboard?.totalViews || 0}</div>
              <div className="profile-stat-label">Total Views</div>
            </div>
            <div className="profile-stat-card">
              <div className="profile-stat-value">
                {profile?.created_at ? new Date(profile.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'N/A'}
              </div>
              <div className="profile-stat-label">Member Since</div>
            </div>
          </div>

          {/* Tabs */}
          <div className="profile-tabs">
            {['overview', 'posts', 'settings', 'security'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`profile-tab ${activeTab === tab ? 'active' : ''}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Layout */}
          <div className="profile-layout">
            {/* Sidebar */}
            <div className="profile-sidebar">
              <div className="profile-sidebar-card">
                <h3 className="profile-sidebar-title">Account Info</h3>
                <div className="profile-sidebar-item">
                  <span className="profile-sidebar-label">Email</span>
                  <span className="profile-sidebar-value">{user?.email_confirmed_at ? '✓' : '⚠'}</span>
                </div>
                <div className="profile-sidebar-item">
                  <span className="profile-sidebar-label">Status</span>
                  <span className="profile-sidebar-value">Active</span>
                </div>
                <div className="profile-sidebar-item">
                  <span className="profile-sidebar-label">Role</span>
                  <span className="profile-sidebar-value">{profile?.role}</span>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="profile-main">
              {activeTab === 'overview' && (
                <div className="profile-card">
                  <div className="profile-card-header">
                    <h2 className="profile-card-title">Profile Information</h2>
                    <button 
                      onClick={() => setIsEditing(!isEditing)}
                      className="profile-btn profile-btn-primary"
                    >
                      {isEditing ? 'Cancel' : 'Edit'}
                    </button>
                  </div>

                  {isEditing ? (
                    <form onSubmit={handleSubmit} className="profile-form">
                      <div className="profile-form-grid">
                        <div className="profile-form-group">
                          <label className="profile-form-label">Name</label>
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="profile-form-input"
                            placeholder="Your name"
                          />
                        </div>
                        <div className="profile-form-group">
                          <label className="profile-form-label">Location</label>
                          <input
                            type="text"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            className="profile-form-input"
                            placeholder="Your location"
                          />
                        </div>
                      </div>

                      <div className="profile-form-group">
                        <label className="profile-form-label">Bio</label>
                        <textarea
                          value={formData.bio}
                          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                          className="profile-form-textarea"
                          placeholder="Tell us about yourself"
                        />
                      </div>

                      <div className="profile-form-grid">
                        <div className="profile-form-group">
                          <label className="profile-form-label">Website</label>
                          <input
                            type="url"
                            value={formData.website}
                            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                            className="profile-form-input"
                            placeholder="https://example.com"
                          />
                        </div>
                        <div className="profile-form-group">
                          <label className="profile-form-label">GitHub</label>
                          <input
                            type="url"
                            value={formData.github}
                            onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                            className="profile-form-input"
                            placeholder="https://github.com/username"
                          />
                        </div>
                      </div>

                      <div className="profile-form-actions">
                        <button type="button" onClick={() => setIsEditing(false)} className="profile-btn" style={{ background: 'rgba(255,255,255,0.05)' }}>
                          Cancel
                        </button>
                        <button type="submit" className="profile-btn profile-btn-primary">
                          Save Changes
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="profile-form">
                      <div className="profile-form-grid">
                        <div className="profile-form-group">
                          <label className="profile-form-label">Name</label>
                          <div className="profile-form-input" style={{ background: 'rgba(10,10,10,0.3)' }}>
                            {profile?.name || 'Not set'}
                          </div>
                        </div>
                        <div className="profile-form-group">
                          <label className="profile-form-label">Location</label>
                          <div className="profile-form-input" style={{ background: 'rgba(10,10,10,0.3)' }}>
                            {profile?.location || 'Not set'}
                          </div>
                        </div>
                      </div>

                      <div className="profile-form-group">
                        <label className="profile-form-label">Bio</label>
                        <div className="profile-form-textarea" style={{ background: 'rgba(10,10,10,0.3)' }}>
                          {profile?.bio || 'No bio provided'}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'posts' && (
                <div className="profile-card">
                  <div className="profile-card-header">
                    <h2 className="profile-card-title">My Posts</h2>
                  </div>

                  {data?.posts?.length > 0 ? (
                    <div className="profile-posts-grid">
                      {data.posts.map((post: any) => (
                        <div key={post.id} className="profile-post-card">
                          <div className="profile-post-header">
                            <h3 className="profile-post-title">{post.title}</h3>
                            <span className="profile-post-date">
                              {new Date(post.created_at).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="profile-post-content">{post.content}</p>
                          <div className="profile-post-footer">
                            <div className="profile-post-tags">
                              {post.tags?.map((tag: string) => (
                                <span key={tag} className="profile-post-tag">{tag}</span>
                              ))}
                            </div>
                            <div className="profile-post-actions">
                              <button className="profile-post-btn profile-post-btn-edit">Edit</button>
                              <button className="profile-post-btn profile-post-btn-delete">Delete</button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="profile-empty-state">
                      <svg className="profile-empty-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <h3 className="profile-empty-title">No posts yet</h3>
                      <p className="profile-empty-text">Start writing your first post to share with the community</p>
                      <button className="profile-btn profile-btn-primary">Create New Post</button>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="profile-card">
                  <div className="profile-card-header">
                    <h2 className="profile-card-title">Settings</h2>
                  </div>

                  <div className="profile-settings-section">
                    <h3 className="profile-settings-title">Notifications</h3>
                    <div className="profile-settings-list">
                      <div className="profile-setting-item">
                        <label className="profile-setting-label">
                          <input type="checkbox" defaultChecked className="profile-checkbox" />
                          <span className="profile-setting-text">Email notifications</span>
                        </label>
                      </div>
                      <div className="profile-setting-item">
                        <label className="profile-setting-label">
                          <input type="checkbox" defaultChecked className="profile-checkbox" />
                          <span className="profile-setting-text">Push notifications</span>
                        </label>
                      </div>
                      <div className="profile-setting-item">
                        <label className="profile-setting-label">
                          <input type="checkbox" className="profile-checkbox" />
                          <span className="profile-setting-text">Marketing emails</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="profile-settings-section">
                    <h3 className="profile-settings-title">Privacy</h3>
                    <div className="profile-settings-list">
                      <div className="profile-setting-item">
                        <label className="profile-setting-label">
                          <input type="checkbox" defaultChecked className="profile-checkbox" />
                          <span className="profile-setting-text">Make profile public</span>
                        </label>
                      </div>
                      <div className="profile-setting-item">
                        <label className="profile-setting-label">
                          <input type="checkbox" className="profile-checkbox" />
                          <span className="profile-setting-text">Show email to others</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <button className="profile-btn profile-btn-primary">Save Settings</button>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="profile-card">
                  <div className="profile-card-header">
                    <h2 className="profile-card-title">Security</h2>
                  </div>

                  <form className="profile-form" style={{ maxWidth: '500px' }}>
                    <div className="profile-form-group">
                      <label className="profile-form-label">Current Password</label>
                      <input type="password" className="profile-form-input" placeholder="••••••••" />
                    </div>
                    <div className="profile-form-group">
                      <label className="profile-form-label">New Password</label>
                      <input type="password" className="profile-form-input" placeholder="••••••••" />
                    </div>
                    <div className="profile-form-group">
                      <label className="profile-form-label">Confirm New Password</label>
                      <input type="password" className="profile-form-input" placeholder="••••••••" />
                    </div>
                    <button type="submit" className="profile-btn profile-btn-primary">Update Password</button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
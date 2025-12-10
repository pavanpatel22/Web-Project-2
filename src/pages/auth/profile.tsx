import { createRoute, type AnyRoute } from "@tanstack/react-router"
import { ProtectedRoute } from "../../components/ProtectedRoute"
import {  UserProfile } from "../../components/UserProfile"
import { useUserData } from "../../hooks/useUserData"
import { useState } from "react"

export default (parent: AnyRoute) =>
  createRoute({
    path: "/profile",
    getParentRoute: () => parent,
    component: ProfilePage,
  })

function ProfilePage() {
  const { data, loading, error, refreshData } = useUserData()
  const [activeTab, setActiveTab] = useState('overview')

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-red-800 dark:text-red-400 mb-2">
            Error Loading Profile
          </h2>
          <p className="text-red-600 dark:text-red-300">{error}</p>
          <button
            onClick={refreshData}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Profile</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your account settings and view your activity
          </p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
          <nav className="flex space-x-8">
            {['overview', 'posts', 'settings', 'security'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 font-medium text-sm border-b-2 transition ${
                  activeTab === tab
                    ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                    <span className="text-indigo-600 dark:text-indigo-400 font-bold text-xl">
                      {data?.user?.name?.charAt(0) || 'U'}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold">{data?.user?.name || 'User'}</h3>
                    <p className="text-sm text-gray-500">{data?.user?.email}</p>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Member since</span>
                      <span className="font-medium">
                        {new Date(data?.user?.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Role</span>
                      <span className="font-medium capitalize">{data?.user?.role}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Status</span>
                      <span className="px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full">
                        Active
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <UserProfile />
                
                {/* Recent Activity */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                  <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                  {data?.recentPosts?.length > 0 ? (
                    <div className="space-y-4">
                      {data.recentPosts.slice(0, 5).map((post: any) => (
                        <div
                          key={post.id}
                          className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition"
                        >
                          <div>
                            <h4 className="font-medium">{post.title}</h4>
                            <p className="text-sm text-gray-500">
                              {new Date(post.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-sm text-gray-500">
                            {post.views} views
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No recent activity</p>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'posts' && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-6">My Posts</h2>
                {data?.posts?.length > 0 ? (
                  <div className="space-y-4">
                    {data.posts.map((post: any) => (
                      <div
                        key={post.id}
                        className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-lg">{post.title}</h3>
                          <span className="text-sm text-gray-500">
                            {new Date(post.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                          {post.content}
                        </p>
                        <div className="flex justify-between items-center">
                          <div className="flex space-x-2">
                            {post.tags?.map((tag: string) => (
                              <span
                                key={tag}
                                className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <div className="flex space-x-2">
                            <button className="text-indigo-600 hover:text-indigo-800">
                              Edit
                            </button>
                            <button className="text-red-600 hover:text-red-800">
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <svg
                      className="w-16 h-16 text-gray-400 mx-auto mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <h3 className="text-lg font-semibold mb-2">No posts yet</h3>
                    <p className="text-gray-500 mb-4">
                      Start writing your first post to share with the community
                    </p>
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                      Create New Post
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-6">Account Settings</h2>
                <div className="space-y-6">
                  {/* Notification Settings */}
                  <div>
                    <h3 className="font-medium mb-4">Notification Preferences</h3>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded text-indigo-600" defaultChecked />
                        <span className="ml-2">Email notifications</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded text-indigo-600" defaultChecked />
                        <span className="ml-2">Push notifications</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded text-indigo-600" />
                        <span className="ml-2">Marketing emails</span>
                      </label>
                    </div>
                  </div>

                  {/* Privacy Settings */}
                  <div>
                    <h3 className="font-medium mb-4">Privacy</h3>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded text-indigo-600" defaultChecked />
                        <span className="ml-2">Make profile public</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded text-indigo-600" defaultChecked />
                        <span className="ml-2">Show email to others</span>
                      </label>
                    </div>
                  </div>

                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                    Save Settings
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-6">Security</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Change Password</h3>
                    <p className="text-gray-500 text-sm mb-4">
                      Update your password to keep your account secure
                    </p>
                    <div className="space-y-4 max-w-md">
                      <div>
                        <label className="block text-sm mb-1">Current Password</label>
                        <input
                          type="password"
                          className="w-full px-3 py-2 border rounded-lg"
                          placeholder="••••••••"
                        />
                      </div>
                      <div>
                        <label className="block text-sm mb-1">New Password</label>
                        <input
                          type="password"
                          className="w-full px-3 py-2 border rounded-lg"
                          placeholder="••••••••"
                        />
                      </div>
                      <div>
                        <label className="block text-sm mb-1">Confirm New Password</label>
                        <input
                          type="password"
                          className="w-full px-3 py-2 border rounded-lg"
                          placeholder="••••••••"
                        />
                      </div>
                      <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                        Update Password
                      </button>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="font-medium mb-2">Two-Factor Authentication</h3>
                    <p className="text-gray-500 text-sm mb-4">
                      Add an extra layer of security to your account
                    </p>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                      Enable 2FA
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
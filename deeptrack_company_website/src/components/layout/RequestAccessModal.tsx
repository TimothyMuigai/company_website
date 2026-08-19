'use client'

import React, { useState, useEffect } from 'react'

export function RequestAccessModal({
  isOpen,
  onClose,
  title,
}: {
  isOpen: boolean
  onClose: () => void
  title: string
}) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isOpen) {
      setName('')
      setEmail('')
      setLoading(false)
      setSuccess(false)
      setError('')
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      const res = await fetch('/api/requestAccess', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, type: title }),
      })

      if (res.ok) {
        setSuccess(true)
        setName('')
        setEmail('')
      } else {
        const data = await res.json()
        setError(data.error || 'Something went wrong.')
      }
    } catch (err) {
      setError('Network error.')
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setName('')
    setEmail('')
    setLoading(false)
    setSuccess(false)
    setError('')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-lg shadow-xl p-6 relative">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-black text-xl"
        >
          ×
        </button>

        <h2 className="text-xl font-semibold text-gray-900 mb-4">{title}</h2>

        <p className="text-sm text-gray-500 mb-6">
          Please enter your name and email below to request for the document.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#13dfde] focus:bg-[#f1f1f1]"
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#13dfde] focus:bg-[#f1f1f1]"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-lg text-white font-semibold disabled:opacity-50"
            style={{ backgroundColor: '#13dfde' }}
          >
            {loading ? 'Submitting...' : 'Request Access'}
          </button>

          {success && (
            <p className="text-green-600 text-sm mt-2">
              Request sent successfully! Monitor your email for the requested document.
            </p>
          )}
          {error && (
            <p className="text-red-600 text-sm mt-2">{error}</p>
          )}
        </form>
      </div>
    </div>
  )
}

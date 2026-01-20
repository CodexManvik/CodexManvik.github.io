'use client';

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, CheckCircle, Github, Linkedin } from 'lucide-react';

export function Contact() {
  const [formState, setFormState] = useState({
    submitting: false,
    succeeded: false,
    error: false,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState({ submitting: true, succeeded: false, error: false });

    try {
      const response = await fetch('https://formspree.io/f/xrbadjdd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormState({ submitting: false, succeeded: true, error: false });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setFormState({ submitting: false, succeeded: false, error: true });
      }
    } catch (error) {
      setFormState({ submitting: false, succeeded: false, error: true });
    }
  };

  const handleReset = () => {
    setFormState({ submitting: false, succeeded: false, error: false });
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section
      id="contact"
      className="relative bg-black py-20 px-4 sm:px-6 lg:px-8"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2
            id="contact-heading"
            className="text-4xl font-bold text-white sm:text-5xl mb-4"
          >
            Get In Touch
          </h2>
          <p className="text-neutral-400 text-lg">
            Have a project in mind? Let's work together to build something amazing.
          </p>
        </motion.div>

        {formState.succeeded ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-neutral-900 to-neutral-950 p-8 text-center"
          >
            <div className="absolute inset-0 bg-noise opacity-5" aria-hidden="true" />
            <div className="relative z-10">
              <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Message Sent! 🚀</h3>
              <p className="text-neutral-400 mb-6">
                Thanks for reaching out! I'll get back to you as soon as possible.
              </p>
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 text-base font-medium text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black"
              >
                Send Another Message
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-neutral-900 to-neutral-950 p-8"
          >
            <div className="absolute inset-0 bg-noise opacity-5" aria-hidden="true" />
            
            <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-neutral-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-4 py-3 text-white placeholder-neutral-500 transition-colors focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                  placeholder="Your name"
                  disabled={formState.submitting}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-4 py-3 text-white placeholder-neutral-500 transition-colors focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                  placeholder="your.email@example.com"
                  disabled={formState.submitting}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-neutral-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-4 py-3 text-white placeholder-neutral-500 transition-colors focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 resize-none"
                  placeholder="Tell me about your project..."
                  disabled={formState.submitting}
                />
              </div>

              {formState.error && (
                <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-red-400">
                  Something went wrong. Please try again or email me directly.
                </div>
              )}

              <button
                type="submit"
                disabled={formState.submitting}
                className="group relative w-full inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 text-base font-medium text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-neutral-950 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {formState.submitting ? (
                  <>
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-white/10 text-center relative z-20">
              <p className="text-neutral-400 text-sm mb-4">Or reach out directly:</p>
              <div className="flex items-center justify-center gap-6">
                <a
                  href="mailto:manvik.talwar@gmail.com"
                  className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 hover:scale-110 transition-all cursor-pointer"
                  aria-label="Email Manvik Talwar"
                >
                  <Mail className="h-5 w-5" />
                  <span className="text-sm">Email</span>
                </a>
                <a
                  href="https://github.com/CodexManvik"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 hover:scale-110 transition-all cursor-pointer"
                  aria-label="GitHub Profile"
                >
                  <Github className="h-5 w-5" />
                  <span className="text-sm">GitHub</span>
                </a>
                <a
                  href="https://linkedin.com/in/manvik-talwar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 hover:scale-110 transition-all cursor-pointer"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="h-5 w-5" />
                  <span className="text-sm">LinkedIn</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

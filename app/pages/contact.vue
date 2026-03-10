<script setup lang="ts">
useSeoMeta({
  title: 'Contact — Manuel Quesada',
  description: 'Get in touch with Manuel Quesada for collaboration, freelance, or any development project.',
})

interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
}

const form = reactive<ContactForm>({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const isSubmitting = ref(false)
const isSubmitted = ref(false)
const errorMessage = ref('')
const focusedField = ref<string | null>(null)

const socialLinks = [
  { label: 'GitHub', url: 'https://github.com/mquesada12', icon: 'mdi:github' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/manuelquesadaruiz/', icon: 'mdi:linkedin' },
  { label: 'Email', url: 'mailto:manuelquesada213@gmail.com', icon: 'mdi:email-outline' },
]

function handleFocus(field: string) {
  focusedField.value = field
}

function handleBlur() {
  focusedField.value = null
}

async function handleSubmit() {
  isSubmitting.value = true
  errorMessage.value = ''

  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: {
        name: form.name,
        email: form.email,
        subject: form.subject,
        message: form.message,
      },
    })

    isSubmitted.value = true
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'data' in error) {
      const fetchError = error as { data?: { statusMessage?: string } }
      errorMessage.value = fetchError.data?.statusMessage || 'Something went wrong. Please try again or email me directly.'
    } else {
      errorMessage.value = 'Something went wrong. Please try again or email me directly.'
    }
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <section class="contact-page">
    <div class="contact-container">

      <!-- Header -->
      <div class="contact-header">
        <h1 class="contact-title">Get in touch<span class="title-dot">.</span></h1>
        <p class="contact-subtitle">
          Have a project in mind or just want to say hello?<br>
          I'd love to hear from you.
        </p>

        <div class="contact-socials">
          <a
            v-for="link in socialLinks"
            :key="link.label"
            :href="link.url"
            target="_blank"
            rel="noopener noreferrer"
            class="social-link"
            :aria-label="link.label"
          >
            <Icon :name="link.icon" class="social-icon" />
          </a>
        </div>
      </div>

      <!-- Form / Success -->
      <Transition name="fade" mode="out-in">
        <form v-if="!isSubmitted" key="form" class="contact-form" @submit.prevent="handleSubmit">
          <div class="form-row">
            <div class="form-group" :class="{ focused: focusedField === 'name' }">
              <label for="name" class="form-label">Name</label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                class="form-input"
                placeholder="Your name"
                required
                @focus="handleFocus('name')"
                @blur="handleBlur"
              >
            </div>

            <div class="form-group" :class="{ focused: focusedField === 'email' }">
              <label for="email" class="form-label">Email</label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                class="form-input"
                placeholder="your@email.com"
                required
                @focus="handleFocus('email')"
                @blur="handleBlur"
              >
            </div>
          </div>

          <div class="form-group" :class="{ focused: focusedField === 'subject' }">
            <label for="subject" class="form-label">Subject</label>
            <input
              id="subject"
              v-model="form.subject"
              type="text"
              class="form-input"
              placeholder="Project inquiry"
              required
              @focus="handleFocus('subject')"
              @blur="handleBlur"
            >
          </div>

          <div class="form-group" :class="{ focused: focusedField === 'message' }">
            <label for="message" class="form-label">Message</label>
            <textarea
              id="message"
              v-model="form.message"
              class="form-input form-textarea"
              placeholder="Tell me about your project..."
              rows="6"
              required
              @focus="handleFocus('message')"
              @blur="handleBlur"
            />
          </div>

          <div v-if="errorMessage" class="form-error">
            <Icon name="mdi:alert-circle-outline" class="error-icon" />
            <span>{{ errorMessage }}</span>
            <a href="mailto:manuelquesada213@gmail.com" class="error-fallback">Email me directly →</a>
          </div>

          <button type="submit" class="submit-btn" :disabled="isSubmitting">
            <span v-if="isSubmitting" class="spinner" />
            <span>{{ isSubmitting ? 'Sending...' : 'Send Message' }}</span>
          </button>
        </form>

        <div v-else key="success" class="success-state">
          <Icon name="mdi:check-circle-outline" class="success-icon" />
          <h3 class="success-title">Message sent</h3>
          <p class="success-text">Thank you for reaching out. I'll get back to you soon.</p>
        </div>
      </Transition>

    </div>
  </section>
</template>

<style scoped>
.contact-page {
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8rem 0 6rem;
  background-color: var(--color-bg-primary);
}

.contact-container {
  width: 100%;
  max-width: 620px;
  margin: 0 auto;
  padding-inline: var(--container-padding);
}

/* Header */
.contact-header {
  text-align: center;
  margin-bottom: 3.5rem;
}

.contact-title {
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 3.5vw, 2.5rem);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 0.75rem;
  letter-spacing: -0.02em;
}

.title-dot {
  color: var(--variant-accent);
}

.contact-subtitle {
  font-family: var(--font-mono);
  font-size: 0.82rem;
  line-height: 1.8;
  color: var(--color-text-muted);
}

.contact-socials {
  display: flex;
  justify-content: center;
  gap: 0.6rem;
  margin-top: 1.5rem;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  border: 1px solid var(--color-border);
  color: var(--color-text-muted);
  text-decoration: none;
  transition: color 0.2s ease, border-color 0.2s ease;
}

.social-link:hover {
  color: var(--variant-accent);
  border-color: var(--variant-accent);
}

.social-icon {
  width: 1.05rem;
  height: 1.05rem;
}

/* Form */
.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.form-group {
  position: relative;
}

.form-label {
  display: block;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  margin-bottom: 0.5rem;
  transition: color 0.2s ease;
}

.form-group.focused .form-label {
  color: var(--variant-accent);
}

.form-input {
  width: 100%;
  font-family: var(--font-mono);
  font-size: 0.85rem;
  padding: 0.65rem 0;
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--color-border);
  color: var(--color-text-primary);
  transition: border-color 0.2s ease;
  outline: none;
  border-radius: 0;
}

.form-input:focus {
  border-color: var(--variant-accent);
}

.form-input::placeholder {
  color: var(--color-text-muted);
  opacity: 0.4;
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
}

/* Error */
.form-error {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: #ef4444;
}

.error-icon {
  width: 0.9rem;
  height: 0.9rem;
}

.error-fallback {
  color: var(--color-text-muted);
  text-decoration: underline;
  text-underline-offset: 2px;
  margin-left: 0.25rem;
}

.error-fallback:hover {
  color: var(--color-text-primary);
}

/* Submit */
.submit-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  font-family: var(--font-mono);
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 0.85rem 2.5rem;
  background: var(--variant-accent);
  color: var(--color-bg-primary);
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  align-self: flex-start;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(var(--variant-accent-rgb), 0.3);
}

.submit-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

/* Spinner */
.spinner {
  width: 12px;
  height: 12px;
  border: 2px solid var(--color-bg-primary);
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.5s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Success */
.success-state {
  text-align: center;
  padding: 4rem 0;
}

.success-icon {
  width: 2.5rem;
  height: 2.5rem;
  color: var(--variant-accent);
  margin-bottom: 1rem;
}

.success-title {
  font-family: var(--font-display);
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 0.4rem;
}

.success-text {
  font-family: var(--font-mono);
  font-size: 0.82rem;
  color: var(--color-text-muted);
  line-height: 1.6;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 640px) {
  .contact-page {
    padding: 6rem 0 4rem;
    align-items: flex-start;
  }

  .form-row {
    grid-template-columns: 1fr;
    gap: 1.75rem;
  }

  .submit-btn {
    width: 100%;
  }
}
</style>
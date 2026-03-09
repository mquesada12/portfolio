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
const focusedField = ref<string | null>(null)

function handleFocus(field: string) {
  focusedField.value = field
}

function handleBlur() {
  focusedField.value = null
}

async function handleSubmit() {
  isSubmitting.value = true

  await new Promise((resolve) => setTimeout(resolve, 1200))

  isSubmitted.value = true
  isSubmitting.value = false
}
</script>

<template>
  <section class="contact-page">
    <!-- Background watermark -->
    <h2 class="contact-watermark">Contact</h2>

    <div class="contact-container">

      <div class="contact-layout">
        <!-- Left: Form -->
        <div class="contact-form-wrapper">
          <div class="section-label">
            <span class="label-line" />
            <span class="label-text">Get in Touch</span>
          </div>

          <h1 class="contact-title">Let's work<br><span class="title-accent">together.</span></h1>

          <p class="contact-subtitle">Have a project in mind? Drop me a message and I'll get back to you as soon as possible.</p>

          <Transition name="fade" mode="out-in">
            <div v-if="!isSubmitted" key="form">
              <form class="contact-form" @submit.prevent="handleSubmit">
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
                  />
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
                  />
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
                  />
                </div>

                <div class="form-group" :class="{ focused: focusedField === 'message' }">
                  <label for="message" class="form-label">Message</label>
                  <textarea
                    id="message"
                    v-model="form.message"
                    class="form-input form-textarea"
                    placeholder="Tell me about your project..."
                    rows="5"
                    required
                    @focus="handleFocus('message')"
                    @blur="handleBlur"
                  />
                </div>

                <button type="submit" class="submit-btn" :disabled="isSubmitting">
                  <span v-if="isSubmitting">Sending...</span>
                  <span v-else>Send Message</span>
                  <Icon v-if="!isSubmitting" name="mdi:arrow-right" class="btn-icon" />
                </button>
              </form>
            </div>

            <div v-else key="success" class="success-state">
              <Icon name="mdi:check-circle-outline" class="success-icon" />
              <h3 class="success-title">Message Sent!</h3>
              <p class="success-text">Thank you for reaching out. I'll get back to you soon.</p>
            </div>
          </Transition>
        </div>

        <!-- Right: Portrait Image -->
        <div class="contact-image">
          <div class="image-card">
            <img src="/images/contact-portrait.png" alt="Manuel Quesada - Developer" class="portrait-img" />
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.contact-page {
  position: relative;
  min-height: 100vh;
  width: 100%;
  padding: 8rem 0 6rem;
  background-color: var(--color-bg-primary);
  overflow: hidden;
}

.contact-watermark {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scaleY(1.4);
  font-size: clamp(6rem, 22vw, 30rem);
  font-weight: 900;
  line-height: 0.8;
  text-align: center;
  text-transform: uppercase;
  font-family: var(--font-display);
  color: var(--variant-accent);
  opacity: 0.04;
  pointer-events: none;
  white-space: nowrap;
  z-index: 0;
  transition: color var(--transition-theme);
}

.contact-container {
  position: relative;
  z-index: 1;
  max-width: var(--container-max);
  margin: 0 auto;
  padding-inline: var(--container-padding);
}

.contact-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

/* Section Label */
.section-label {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.label-line {
  width: 2rem;
  height: 1px;
  background: var(--variant-accent);
  transition: background var(--transition-theme);
}

.label-text {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--variant-accent);
  transition: color var(--transition-theme);
}

/* Title */
.contact-title {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  color: var(--color-text-primary);
  margin-bottom: 1rem;
  line-height: 1.1;
}

.title-accent {
  color: var(--variant-accent);
  transition: color var(--transition-theme);
}

.contact-subtitle {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  line-height: 1.7;
  color: var(--color-text-muted);
  margin-bottom: 2.5rem;
  max-width: 400px;
}

/* Form */
.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  position: relative;
}

.form-label {
  display: block;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  margin-bottom: 0.5rem;
  transition: color 0.3s ease;
}

.form-group.focused .form-label {
  color: var(--variant-accent);
}

.form-input {
  width: 100%;
  font-family: var(--font-mono);
  font-size: 0.85rem;
  padding: 0.75rem 0;
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--color-border);
  color: var(--color-text-primary);
  transition: border-color 0.3s ease;
  outline: none;
}

.form-input:focus {
  border-color: var(--variant-accent);
}

.form-input::placeholder {
  color: var(--color-text-muted);
  opacity: 0.5;
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
}

.submit-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  font-family: var(--font-mono);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.85rem 2rem;
  background: transparent;
  color: var(--color-text-primary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: all 0.3s ease;
  align-self: flex-start;
}

.submit-btn:hover {
  border-color: var(--variant-accent);
  color: var(--variant-accent);
}

.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-icon {
  width: 1rem;
  height: 1rem;
  transition: transform 0.3s ease;
}

.submit-btn:hover .btn-icon {
  transform: translateX(4px);
}

/* Success */
.success-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 3rem 0;
}

.success-icon {
  width: 3rem;
  height: 3rem;
  color: #22c55e;
  margin-bottom: 1rem;
}

.success-title {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 0.5rem;
}

.success-text {
  font-family: var(--font-mono);
  font-size: 0.82rem;
  color: var(--color-text-muted);
  line-height: 1.6;
}

/* Right: Image */
.contact-image {
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-card {
  width: 100%;
  max-width: 480px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--color-border);
  background: var(--color-bg-secondary);
  transition: border-color var(--transition-theme);
}

.portrait-img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .contact-page {
    padding: 6rem 0 4rem;
  }

  .contact-layout {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .contact-image {
    order: -1;
  }

  .image-card {
    max-width: 300px;
  }
}
</style>
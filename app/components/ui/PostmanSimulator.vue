<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useSkillsSimulatorStore } from '~/stores/skillsSimulator'

const getStore = () => {
  const { $pinia } = useNuxtApp()
  return useSkillsSimulatorStore($pinia)
}

const method = ref('GET')
const endpoint = ref('/api/skills')
const requestBody = ref('')
const selectedSkillName = ref('Vue 3')

const methods = ['GET', 'PUT', 'DELETE', 'POST', 'PATCH']

const availableSkills = computed(() => Object.keys(getStore().skills))

interface PresetEndpoint {
  method: string
  label: string
  endpoint: string
  body?: string
  description: string
}

const presets: PresetEndpoint[] = [
  { method: 'GET', label: 'Get All Skills', endpoint: '/api/skills', description: 'Retrieve all skills data to refresh the local state.' },
  { method: 'PUT', label: 'Update Skill', endpoint: `/api/skills/${selectedSkillName.value}`, body: JSON.stringify({ experience: '+6 years' }, null, 2), description: 'Full update of a skill entry.' },
  { method: 'PATCH', label: 'Patch Skill', endpoint: `/api/skills/${selectedSkillName.value}`, body: JSON.stringify({ proficiency: 99 }, null, 2), description: 'Partially update a skill field.' },
  { method: 'DELETE', label: 'Delete Skill', endpoint: `/api/skills/${selectedSkillName.value}`, description: 'Remove a single skill from the local list.' },
  { method: 'POST', label: 'Add New Skill', endpoint: '/api/skills', body: JSON.stringify({ name: 'GraphQL', proficiency: 75, icon: 'logos:graphql', tags: ['API'], experience: '1 year' }, null, 2), description: 'Create a new skill entry.' },
  { method: 'DELETE', label: 'Reset All', endpoint: '/api/skills/reset', description: 'Reset all skills back to original defaults.' },
]

function selectPreset(preset: PresetEndpoint) {
  method.value = preset.method
  if (preset.endpoint.includes('/api/skills/') && !preset.endpoint.endsWith('/reset')) {
    endpoint.value = `/api/skills/${selectedSkillName.value}`
  } else {
    endpoint.value = preset.endpoint
  }
  requestBody.value = preset.body || ''
}

const statusCode = computed(() => {
  if (!getStore().apiResponse) return null
  try {
    const parsed = JSON.parse(getStore().apiResponse)
    if (parsed.error) return parsed.status || 500
    return 200
  } catch {
    return null
  }
})

const statusClass = computed(() => {
  if (!statusCode.value) return ''
  if (statusCode.value >= 200 && statusCode.value < 300) return 'status-success'
  if (statusCode.value >= 400) return 'status-error'
  return ''
})

const methodClass = computed(() => {
  return 'method-' + method.value.toLowerCase()
})

function getMethodClass(m: string) {
  return 'preset-method-' + m.toLowerCase()
}

const endpointDescription = computed(() => {
  const match = presets.find(p => p.method === method.value && (p.endpoint === endpoint.value || (p.endpoint.includes('/api/skills/') && endpoint.value.includes('/api/skills/'))))
  return match?.description || ''
})

async function sendRequest() {
  await getStore().simulateApiCall(method.value, endpoint.value, requestBody.value || undefined)
}

// Keep endpoint in sync with selected skill for dynamic routes
watch(selectedSkillName, (newSkill) => {
  if (endpoint.value.startsWith('/api/skills/') && !endpoint.value.endsWith('/reset') && endpoint.value !== '/api/skills') {
    endpoint.value = `/api/skills/${newSkill}`
  }
})

// Update endpoint when method changes manually
watch(method, (m) => {
  if (m === 'GET' && !endpoint.value.includes('/api/skills/')) {
    endpoint.value = '/api/skills'
  } else if (m === 'POST') {
    endpoint.value = '/api/skills'
  } else if ((m === 'PUT' || m === 'PATCH' || (m === 'DELETE' && endpoint.value !== '/api/skills/reset')) && endpoint.value === '/api/skills') {
    endpoint.value = `/api/skills/${selectedSkillName.value}`
  }
})
</script>

<template>
  <div class="postman-simulator">
    <!-- Header -->
    <div class="simulator-header">
      <div class="simulator-title-row">
        <span class="sim-badge"><Icon name="mdi:api" class="badge-icon" /> API PLAYGROUND</span>
      </div>
      <h3 class="sim-title">Postman <span class="title-accent">Simulator</span></h3>
      <span class="sim-subtitle">Test API endpoints that modify the skills displayed in real-time. No data is persisted.</span>
    </div>

    <div class="simulator-body">
      <!-- Skill Selector for dynamic endpoints -->
      <div v-if="endpoint.includes('/api/skills/') && !endpoint.endsWith('/reset')" class="skill-picker">
        <label class="picker-label">Target skill to modify:</label>
        <select v-model="selectedSkillName" class="skill-select">
          <option v-for="skill in availableSkills" :key="skill" :value="skill">
            {{ skill }}
          </option>
        </select>
      </div>

      <!-- Preset buttons -->
      <div class="presets-bar">
        <button
          v-for="preset in presets"
          :key="preset.label"
          class="preset-btn"
          @click="selectPreset(preset)"
        >
          <span class="preset-method" :class="getMethodClass(preset.method)">{{ preset.method }}</span>
          <span class="preset-label">{{ preset.label }}</span>
        </button>
      </div>

      <!-- Request bar -->
      <div class="request-bar">
        <span class="method-badge" :class="methodClass">{{ method }}</span>
        <input
          v-model="endpoint"
          type="text"
          class="endpoint-input"
          placeholder="/api/skills"
          readonly
        />
        <button class="send-btn" :disabled="getStore().isLoading" @click="sendRequest">
          <Icon v-if="getStore().isLoading" name="mdi:loading" class="spin" />
          <template v-else>
            <Icon name="mdi:send" class="send-icon" />
            <span>SEND</span>
          </template>
        </button>
      </div>

      <p v-if="endpointDescription" class="endpoint-desc">{{ endpointDescription }}</p>

      <!-- Request body (for PUT/POST/PATCH) -->
      <div v-if="method === 'PUT' || method === 'POST' || method === 'PATCH'" class="body-editor">
        <label class="body-label">Request Body (JSON)</label>
        <textarea v-model="requestBody" class="body-textarea" rows="5" spellcheck="false" />
      </div>

      <!-- Response -->
      <div class="response-section">
        <div class="response-header">
          <span class="response-label">Response</span>
          <span v-if="statusCode" class="status-badge" :class="statusClass">
            {{ statusCode }} OK
          </span>
        </div>
        <pre v-if="getStore().apiResponse" class="response-body">{{ getStore().apiResponse }}</pre>
        <div v-else class="response-empty">
          <Icon name="mdi:code-json" class="empty-icon" />
          <span>Send a request to see the response</span>
        </div>
      </div>
    </div>
  </div>
</template>



<style scoped>
.postman-simulator {
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: all var(--transition-theme);
}

/* Header */
.simulator-header {
  padding: 1.5rem 1.75rem 1.25rem;
  border-bottom: 1px solid var(--color-border);
}

.simulator-title-row {
  margin-bottom: 0.75rem;
}

.sim-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--font-mono);
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--variant-accent);
  padding: 0.3rem 0.7rem;
  border: 1px solid rgba(var(--variant-accent-rgb), 0.3);
  border-radius: var(--radius-full);
  background: rgba(var(--variant-accent-rgb), 0.06);
}

.badge-icon {
  width: 0.8rem;
  height: 0.8rem;
}

.sim-title {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 0.25rem;
}

.title-accent {
  color: var(--variant-accent);
}

.sim-subtitle {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--color-text-muted);
  letter-spacing: 0.03em;
  line-height: 1.5;
}

.simulator-body {
  padding: 1.25rem 1.75rem 1.5rem;
}

/* Picker */
.skill-picker {
  margin-bottom: 1.25rem;
  padding: 0.75rem 1rem;
  background: rgba(var(--variant-accent-rgb), 0.05);
  border: 1px dashed rgba(var(--variant-accent-rgb), 0.3);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  gap: 1rem;
}

.picker-label {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--variant-accent);
  white-space: nowrap;
}

.skill-select {
  flex: 1;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  padding: 0.4rem;
  background: var(--color-bg-primary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  color: var(--color-text-primary);
  outline: none;
}

/* Presets */
.presets-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
}

.preset-btn {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.75rem;
  background: var(--color-bg-primary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: var(--font-mono);
}

.preset-btn:hover {
  border-color: rgba(var(--variant-accent-rgb), 0.4);
  background: rgba(var(--variant-accent-rgb), 0.05);
}

.preset-method {
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  padding: 0.15rem 0.35rem;
  border-radius: 3px;
}

.preset-method-get { background: rgba(34, 197, 94, 0.15); color: #22c55e; }
.preset-method-put { background: rgba(245, 158, 11, 0.15); color: #f59e0b; }
.preset-method-delete { background: rgba(239, 68, 68, 0.15); color: #ef4444; }
.preset-method-post { background: rgba(168, 85, 247, 0.15); color: #a855f7; }
.preset-method-patch { background: rgba(59, 130, 246, 0.15); color: #3b82f6; }

.preset-label {
  font-size: 0.72rem;
  color: var(--color-text-secondary);
  font-weight: 500;
}

/* Request bar */
.request-bar {
  display: flex;
  gap: 0;
  margin-bottom: 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  overflow: hidden;
  background: var(--color-bg-primary);
}

.method-badge {
  display: flex;
  align-items: center;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 700;
  padding: 0.6rem 0.85rem;
  letter-spacing: 0.04em;
  white-space: nowrap;
  border-right: 1px solid var(--color-border);
}

.method-get { color: #22c55e; }
.method-put { color: #f59e0b; }
.method-delete { color: #ef4444; }
.method-post { color: #a855f7; }
.method-patch { color: #3b82f6; }

.endpoint-input {
  flex: 1;
  font-family: var(--font-mono);
  font-size: 0.78rem;
  padding: 0.6rem 0.85rem;
  border: none;
  background: transparent;
  color: var(--color-text-primary);
  outline: none;
}

.send-btn {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  padding: 0.6rem 1.25rem;
  border: none;
  background: var(--variant-accent);
  color: #fff;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.send-btn:hover { opacity: 0.85; }
.send-btn:disabled { opacity: 0.5; cursor: not-allowed; }

.send-icon {
  width: 0.85rem;
  height: 0.85rem;
}

.spin {
  animation: spin 1s linear infinite;
  width: 1rem;
  height: 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.endpoint-desc {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--color-text-muted);
  margin-bottom: 1rem;
}

/* Body editor */
.body-editor {
  margin-bottom: 1rem;
}

.body-label {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  font-weight: 600;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  display: block;
  margin-bottom: 0.4rem;
}

.body-textarea {
  width: 100%;
  font-family: var(--font-mono);
  font-size: 0.78rem;
  line-height: 1.6;
  padding: 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-bg-primary);
  color: var(--color-text-primary);
  resize: vertical;
  outline: none;
}

.body-textarea:focus { border-color: var(--variant-accent); }

/* Response */
.response-section {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.response-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.6rem 0.75rem;
  border-bottom: 1px solid var(--color-border);
  background: rgba(var(--variant-accent-rgb), 0.03);
}

.response-label {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  font-weight: 600;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.status-badge {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  font-weight: 700;
  padding: 0.15rem 0.5rem;
  border-radius: var(--radius-full);
}

.status-success {
  background: rgba(34, 197, 94, 0.15);
  color: #22c55e;
}

.status-error {
  background: rgba(239, 68, 68, 0.15);
  color: #ef4444;
}

.response-body {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  line-height: 1.6;
  color: var(--color-text-secondary);
  padding: 1rem;
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
  max-height: 300px;
  overflow-y: auto;
  background: var(--color-bg-primary);
}

.response-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 2rem;
  color: var(--color-text-muted);
  font-family: var(--font-mono);
  font-size: 0.75rem;
}

.empty-icon {
  width: 1.5rem;
  height: 1.5rem;
  opacity: 0.4;
}

@media (max-width: 768px) {
  .presets-bar {
    gap: 0.35rem;
  }

  .preset-btn {
    padding: 0.3rem 0.5rem;
  }

  .preset-label {
    font-size: 0.65rem;
  }

  .skill-picker {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style>

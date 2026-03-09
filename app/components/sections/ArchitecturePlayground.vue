<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface ArchLayer {
  id: string
  name: string
  subtitle: string
  code: string
  filename: string
  patterns: string[]
}

const layers: ArchLayer[] = [
  {
    id: 'domain',
    name: 'Domain',
    subtitle: 'The Heart of Business Logic',
    filename: 'order.aggregate.ts',
    code: `export class Order extends AggregateRoot {
  private items: OrderItem[] = []
  private status: OrderStatus

  static create(props: CreateOrderProps): Order {
    const order = new Order(props)
    order.addDomainEvent(
      new OrderCreatedEvent(order.id)
    )
    return order
  }

  addItem(product: Product, qty: number) {
    this.ensureNotFinalized()
    this.items.push(
      OrderItem.create(product, qty)
    )
  }
}`,
    patterns: ['DDD', 'Aggregates', 'Value Objects', 'Domain Events', 'Entities'],
  },
  {
    id: 'application',
    name: 'Application',
    subtitle: 'Orchestrating Use Cases',
    filename: 'create-order.handler.ts',
    code: `@CommandHandler(CreateOrderCommand)
export class CreateOrderHandler
  implements ICommandHandler<CreateOrderCommand> {

  constructor(
    private readonly orderRepo: IOrderRepository,
    private readonly eventBus: IEventBus,
  ) {}

  async execute(cmd: CreateOrderCommand) {
    const order = Order.create({
      customerId: cmd.customerId,
      items: cmd.items,
    })

    await this.orderRepo.save(order)
    await this.eventBus.publishAll(
      order.pullDomainEvents()
    )
  }
}`,
    patterns: ['CQRS', 'Use Cases', 'Ports', 'DTOs', 'Mediator'],
  },
  {
    id: 'infrastructure',
    name: 'Infrastructure',
    subtitle: 'Adapters & External World',
    filename: 'order.repository.ts',
    code: `@Injectable()
export class TypeOrmOrderRepository
  implements IOrderRepository {

  constructor(
    @InjectRepository(OrderEntity)
    private readonly repo: Repository<OrderEntity>,
    private readonly mapper: OrderMapper,
  ) {}

  async save(order: Order): Promise<void> {
    const entity = this.mapper.toPersistence(order)
    await this.repo.save(entity)
  }

  async findById(id: OrderId): Promise<Order | null> {
    const raw = await this.repo.findOne({
      where: { id: id.value },
      relations: ['items'],
    })
    return raw ? this.mapper.toDomain(raw) : null
  }
}`,
    patterns: ['Hexagonal', 'Adapters', 'Repository', 'ORM', 'REST'],
  },
]

const selectedLayer = ref('domain')
const sectionRef = ref<HTMLElement | null>(null)

const selectedData = computed(() => layers.find((l) => l.id === selectedLayer.value) ?? layers[0])

function selectLayer(id: string) {
  selectedLayer.value = id
}

// ── Hexagon geometry ──
const CX = 260
const CY = 260
type LayerKey = 'domain' | 'application' | 'infrastructure'
const RADII: Record<LayerKey, number> = { domain: 70, application: 135, infrastructure: 200 }

function hexPoints(r: number): string {
  return Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 180) * (60 * i - 90)
    return `${CX + r * Math.cos(a)},${CY + r * Math.sin(a)}`
  }).join(' ')
}

function hexPath(r: number): string {
  const pts = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 180) * (60 * i - 90)
    return { x: CX + r * Math.cos(a), y: CY + r * Math.sin(a) }
  })
  return pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ') + 'Z'
}

// Port labels at infrastructure midpoints
const portLabels = (() => {
  const r = RADII.infrastructure
  const verts = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 180) * (60 * i - 90)
    return { x: CX + r * Math.cos(a), y: CY + r * Math.sin(a) }
  })
  const midOf = (a: number, b: number) => ({
    x: (verts[a]!.x + verts[b]!.x) / 2,
    y: (verts[a]!.y + verts[b]!.y) / 2,
  })
  return [
    { ...midOf(0, 1), label: 'REST', anchor: 'start' as const, dx: 10, dy: -6 },
    { ...midOf(1, 2), label: 'Events', anchor: 'start' as const, dx: 10, dy: 4 },
    { ...midOf(2, 3), label: 'Database', anchor: 'start' as const, dx: 6, dy: 14 },
    { ...midOf(3, 4), label: 'Queue', anchor: 'end' as const, dx: -6, dy: 14 },
    { ...midOf(4, 5), label: 'Cache', anchor: 'end' as const, dx: -10, dy: 4 },
    { ...midOf(5, 0), label: 'HTTP', anchor: 'end' as const, dx: -10, dy: -6 },
  ]
})()

// GSAP scroll reveal
if (import.meta.client) {
  gsap.registerPlugin(ScrollTrigger)
}

onMounted(() => {
  if (!sectionRef.value) return
  const animItems = sectionRef.value.querySelectorAll('.arch-animate')
  if (!animItems.length) return

  gsap.set(animItems, { opacity: 0, y: 40 })

  ScrollTrigger.create({
    trigger: sectionRef.value,
    start: 'top 80%',
    once: true,
    onEnter: () => {
      gsap.to(animItems, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
      })
    },
  })
})
</script>

<template>
  <section id="architecture" ref="sectionRef" class="arch-section">
    <div class="arch-container">
      <!-- Header -->
      <div class="section-header arch-animate">
        <span class="section-badge">
          <Icon name="mdi:hexagon-outline" class="badge-icon" /> SOFTWARE ARCHITECTURE
        </span>
        <h2 class="section-title">
          How I <span class="title-accent">Architect</span>
        </h2>
        <p class="section-description">
          Clean Architecture, Domain-Driven Design, CQRS and Hexagonal patterns — not just buzzwords, but the way I build every system. Click on a layer to explore.
        </p>
      </div>

      <!-- Layout: Diagram + Detail -->
      <div class="arch-layout">
        <!-- SVG Diagram -->
        <div class="diagram-wrapper arch-animate">
          <!-- Live indicator -->
          <div class="live-indicator">
            <span class="live-dot" />
            <span class="live-text">INTERACTIVE</span>
          </div>

          <svg viewBox="0 0 520 520" class="hex-diagram" xmlns="http://www.w3.org/2000/svg">
            <!-- Defs -->
            <defs>
              <filter id="hex-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <path id="domain-orbit" :d="hexPath(RADII.domain)" fill="none" />
              <path id="app-orbit" :d="hexPath(RADII.application)" fill="none" />
              <path id="infra-orbit" :d="hexPath(RADII.infrastructure)" fill="none" />
              <pattern id="grid-dots" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="0.6" fill="rgba(255,255,255,0.04)" />
              </pattern>
            </defs>

            <!-- Grid bg -->
            <rect width="520" height="520" fill="url(#grid-dots)" />

            <!-- Infrastructure -->
            <polygon
              :points="hexPoints(RADII.infrastructure)"
              class="hex-layer hex-infra"
              :class="{ selected: selectedLayer === 'infrastructure' }"
              @click="selectLayer('infrastructure')"
            />
            <!-- Application -->
            <polygon
              :points="hexPoints(RADII.application)"
              class="hex-layer hex-app"
              :class="{ selected: selectedLayer === 'application' }"
              @click="selectLayer('application')"
            />
            <!-- Domain -->
            <polygon
              :points="hexPoints(RADII.domain)"
              class="hex-layer hex-domain"
              :class="{ selected: selectedLayer === 'domain' }"
              @click="selectLayer('domain')"
            />

            <!-- Domain pulse ring -->
            <polygon :points="hexPoints(RADII.domain)" class="domain-pulse" />

            <!-- Layer labels -->
            <text :x="CX" :y="CY + 5" class="hex-label hex-label-domain">DOMAIN</text>
            <text :x="CX" :y="CY - 100" class="hex-label">APPLICATION</text>
            <text :x="CX" :y="CY - 165" class="hex-label">INFRASTRUCTURE</text>

            <!-- CQRS indicators in the app ring -->
            <text :x="CX - 90" :y="CY + 5" class="cqrs-tag cqrs-cmd">CMD</text>
            <text :x="CX + 90" :y="CY + 5" class="cqrs-tag cqrs-qry">QRY</text>

            <!-- Port labels -->
            <text
              v-for="port in portLabels"
              :key="port.label"
              :x="port.x + port.dx"
              :y="port.y + port.dy"
              :text-anchor="port.anchor"
              class="port-label"
            >
              {{ port.label }}
            </text>

            <!-- Orbiting particles -->
            <circle r="3" class="particle">
              <animateMotion dur="7s" repeatCount="indefinite">
                <mpath href="#domain-orbit" />
              </animateMotion>
            </circle>
            <circle r="2.5" class="particle">
              <animateMotion dur="11s" repeatCount="indefinite">
                <mpath href="#app-orbit" />
              </animateMotion>
            </circle>
            <circle r="2" class="particle particle-dim">
              <animateMotion dur="9s" repeatCount="indefinite" begin="4s">
                <mpath href="#app-orbit" />
              </animateMotion>
            </circle>
            <circle r="2" class="particle">
              <animateMotion dur="15s" repeatCount="indefinite">
                <mpath href="#infra-orbit" />
              </animateMotion>
            </circle>
            <circle r="1.5" class="particle particle-dim">
              <animateMotion dur="12s" repeatCount="indefinite" begin="6s">
                <mpath href="#infra-orbit" />
              </animateMotion>
            </circle>
          </svg>
        </div>

        <!-- Detail Panel -->
        <div class="detail-panel arch-animate">
          <Transition name="layer-fade" mode="out-in">
            <div v-if="selectedData" :key="selectedData.id" class="detail-inner">
              <!-- Header -->
              <div class="detail-header">
                <span class="detail-layer-badge" :class="`badge-${selectedData?.id}`">
                  {{ selectedData?.id.toUpperCase() }} LAYER
                </span>
                <h3 class="detail-name">{{ selectedData?.name }}</h3>
                <p class="detail-subtitle">{{ selectedData?.subtitle }}</p>
              </div>



              <!-- Pattern tags -->
              <div class="detail-patterns">
                <span v-for="p in selectedData?.patterns" :key="p" class="pattern-tag">{{ p }}</span>
              </div>

              <!-- Mini code editor -->
              <div class="code-editor">
                <div class="editor-bar">
                  <div class="editor-dots">
                    <span class="dot dot-red" />
                    <span class="dot dot-yellow" />
                    <span class="dot dot-green" />
                  </div>
                  <span class="editor-filename">{{ selectedData?.filename }}</span>
                </div>
                <pre class="editor-code"><code>{{ selectedData?.code }}</code></pre>
              </div>
            </div>
          </Transition>
        </div>
      </div>

      <!-- Dependency Rule -->
      <div class="dep-rule arch-animate">
        <div class="dep-rule-inner">
          <span class="dep-node dep-infra">Infrastructure</span>
          <span class="dep-arrow"><Icon name="mdi:arrow-right" /></span>
          <span class="dep-node dep-app">Application</span>
          <span class="dep-arrow"><Icon name="mdi:arrow-right" /></span>
          <span class="dep-node dep-dom">Domain</span>
        </div>
        <span class="dep-label">DEPENDENCY RULE — dependencies always point inward</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ── Section ── */
.arch-section {
  position: relative;
  width: 100%;
  padding: 6rem 0 8rem;
  background-color: var(--color-bg-primary);
  overflow: hidden;
}
.arch-container {
  max-width: var(--container-max);
  margin: 0 auto;
  padding-inline: var(--container-padding);
}

/* ── Header ── */
.section-header { margin-bottom: 3rem; }
.section-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--variant-accent);
  padding: 0.4rem 0.9rem;
  border: 1px solid rgba(var(--variant-accent-rgb), 0.3);
  border-radius: var(--radius-full);
  background: rgba(var(--variant-accent-rgb), 0.06);
  margin-bottom: 1.25rem;
  transition: all var(--transition-theme);
}
.badge-icon { width: 0.9rem; height: 0.9rem; }
.section-title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: 800;
  color: var(--color-text-primary);
  line-height: 1.1;
  margin-bottom: 0.75rem;
}
.title-accent { color: var(--variant-accent); transition: color var(--transition-theme); }
.section-description {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  line-height: 1.7;
  color: var(--color-text-muted);
  max-width: 620px;
}

/* ── Layout ── */
.arch-layout {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 3rem;
  align-items: start;
}

/* ── Diagram ── */
.diagram-wrapper {
  position: relative;
  width: 100%;
  max-width: 680px;
  margin: 0 auto;
}
.live-indicator {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  z-index: 2;
}
.live-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: var(--variant-accent);
  animation: livePulse 2s ease-in-out infinite;
}
.live-text {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: var(--variant-accent);
  opacity: 0.7;
}
@keyframes livePulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

.hex-diagram { width: 100%; height: auto; display: block; }

/* ── Hexagon layers ── */
.hex-layer {
  fill: rgba(var(--variant-accent-rgb), 0.03);
  stroke: rgba(var(--variant-accent-rgb), 0.15);
  stroke-width: 1.2;
  cursor: pointer;
  transition: fill 0.4s ease, stroke 0.4s ease, stroke-width 0.3s ease;
}
.hex-layer:hover {
  fill: rgba(var(--variant-accent-rgb), 0.07);
  stroke: rgba(var(--variant-accent-rgb), 0.35);
}
.hex-layer.selected {
  fill: rgba(var(--variant-accent-rgb), 0.1);
  stroke: rgba(var(--variant-accent-rgb), 0.5);
  stroke-width: 2;
  filter: url(#hex-glow);
}

/* Domain pulse overlay */
.domain-pulse {
  fill: none;
  stroke: rgba(var(--variant-accent-rgb), 0.25);
  stroke-width: 1.5;
  pointer-events: none;
  animation: domainPulse 3s ease-in-out infinite;
}
@keyframes domainPulse {
  0%, 100% { stroke-opacity: 0.15; stroke-width: 1; }
  50% { stroke-opacity: 0.5; stroke-width: 2.5; }
}

/* ── Labels ── */
.hex-label {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  font-weight: 700;
  fill: rgba(var(--variant-accent-rgb), 0.5);
  text-anchor: middle;
  letter-spacing: 0.2em;
  pointer-events: none;
}
.hex-label-domain {
  font-size: 13px;
  fill: rgba(var(--variant-accent-rgb), 0.7);
}
.cqrs-tag {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-anchor: middle;
  pointer-events: none;
}
.cqrs-cmd { fill: #f0944a; opacity: 0.6; }
.cqrs-qry { fill: #5ee8a8; opacity: 0.6; }

.port-label {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 9.5px;
  font-weight: 500;
  fill: var(--color-text-muted);
  letter-spacing: 0.06em;
  pointer-events: none;
  opacity: 0.5;
}

/* ── Particles ── */
.particle {
  fill: var(--variant-accent);
  opacity: 0.7;
}
.particle-dim { opacity: 0.35; }

/* ── Detail Panel ── */
.detail-panel {
  position: sticky;
  top: 5rem;
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: 0 20px 60px -20px rgba(0, 0, 0, 0.35);
  transition: all var(--transition-theme);
}
.detail-inner { padding: 2rem; }

.detail-header { margin-bottom: 1.5rem; }
.detail-layer-badge {
  display: inline-block;
  font-family: var(--font-mono);
  font-size: 0.6rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  padding: 0.2rem 0.6rem;
  border-radius: var(--radius-sm);
  margin-bottom: 0.75rem;
  transition: all var(--transition-theme);
}
.badge-domain {
  color: var(--variant-accent);
  background: rgba(var(--variant-accent-rgb), 0.1);
  border: 1px solid rgba(var(--variant-accent-rgb), 0.2);
}
.badge-application {
  color: #f0944a;
  background: rgba(240, 148, 74, 0.1);
  border: 1px solid rgba(240, 148, 74, 0.2);
}
.badge-infrastructure {
  color: #5ee8a8;
  background: rgba(94, 232, 168, 0.1);
  border: 1px solid rgba(94, 232, 168, 0.2);
}

.detail-name {
  font-family: var(--font-display);
  font-size: 1.6rem;
  font-weight: 800;
  color: var(--color-text-primary);
  line-height: 1.1;
  margin-bottom: 0.3rem;
}
.detail-subtitle {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--color-text-muted);
  letter-spacing: 0.03em;
}
.detail-desc {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  line-height: 1.7;
  color: var(--color-text-secondary);
  margin-bottom: 1.25rem;
}

/* Pattern tags */
.detail-patterns {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-bottom: 1.5rem;
}
.pattern-tag {
  font-family: var(--font-mono);
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  padding: 0.2rem 0.55rem;
  border-radius: var(--radius-full);
  border: 1px solid rgba(var(--variant-accent-rgb), 0.15);
  color: var(--variant-accent);
  background: rgba(var(--variant-accent-rgb), 0.05);
  transition: all var(--transition-theme);
}

/* ── Code Editor ── */
.code-editor {
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--color-border);
}
.editor-bar {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.6rem 1rem;
  background: rgba(0, 0, 0, 0.3);
  border-bottom: 1px solid var(--color-border);
}
.editor-dots { display: flex; gap: 5px; }
.dot { width: 8px; height: 8px; border-radius: 50%; }
.dot-red { background: #ff5f57; }
.dot-yellow { background: #febc2e; }
.dot-green { background: #28c840; }
.editor-filename {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  color: var(--color-text-muted);
  letter-spacing: 0.03em;
}
.editor-code {
  padding: 1rem 1.25rem;
  margin: 0;
  background: rgba(0, 0, 0, 0.2);
  font-family: var(--font-mono);
  font-size: 0.7rem;
  line-height: 1.65;
  color: var(--color-text-secondary);
  overflow-x: auto;
  max-height: 320px;
  white-space: pre;
  tab-size: 2;
}
.editor-code code {
  background: none;
  padding: 0;
  font-size: inherit;
  color: inherit;
}

/* ── Dependency Rule ── */
.dep-rule {
  margin-top: 4rem;
  text-align: center;
}
.dep-rule-inner {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1.5rem;
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  margin-bottom: 0.5rem;
}
.dep-node {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.06em;
}
.dep-infra { color: #5ee8a8; }
.dep-app { color: #f0944a; }
.dep-dom { color: var(--variant-accent); }
.dep-arrow {
  color: var(--color-text-muted);
  font-size: 0.9rem;
  display: flex;
  align-items: center;
}
.dep-label {
  display: block;
  font-family: var(--font-mono);
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  color: var(--color-text-muted);
  opacity: 0.5;
  text-transform: uppercase;
}

/* ── Transitions ── */
.layer-fade-enter-active,
.layer-fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.layer-fade-enter-from { opacity: 0; transform: translateY(8px); }
.layer-fade-leave-to { opacity: 0; transform: translateY(-8px); }

/* ── Responsive ── */
@media (max-width: 1100px) {
  .arch-layout {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  .diagram-wrapper { max-width: 560px; }
  .detail-panel { position: static; }
}

@media (max-width: 768px) {
  .arch-section { padding: 4rem 0 5rem; }
  .diagram-wrapper { max-width: 100%; }
  .dep-rule-inner { gap: 0.5rem; padding: 0.5rem 1rem; }
  .dep-node { font-size: 0.6rem; }
}
</style>

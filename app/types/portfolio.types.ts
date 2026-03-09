export type RoleType = 'FRONTEND' | 'BACKEND' | 'FULLSTACK'

export interface Skill {
  id: number
  name: string
  icon: string
  description: string
  proficiency: number
  tags: string[]
  contributions: string[]
  experience: string
  role: RoleType
}

export interface JobExperience {
  id: number
  role: string
  company: string
  period: string
  description: string
  tags: string[]
}

export interface Project {
  id: number
  name: string
  description: string
  image: string
  tags: string[]
  url?: string
  github?: string
}

export interface BlogArticle {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  image?: string
  publishedAt: string
  tags: string[]
}

export function variantToRole(variant: string): RoleType {
  switch (variant) {
    case 'frontend':
      return 'FRONTEND'
    case 'backend':
      return 'BACKEND'
    case 'fullstack':
      return 'FULLSTACK'
    default:
      return 'FULLSTACK'
  }
}

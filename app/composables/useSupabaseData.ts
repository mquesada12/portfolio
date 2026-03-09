import type { Skill, JobExperience, Project, BlogArticle, RoleType } from '../types/portfolio.types'
import { variantToRole } from '../types/portfolio.types'
import type { PortfolioVariant } from '../stores/variant'

export function useSupabaseData() {
  const client = useSupabaseClient()

  async function fetchSkills(variant: PortfolioVariant): Promise<Skill[]> {
    const role = variantToRole(variant)
    const { data, error } = await client
      .from('skills')
      .select('*')
      .eq('role', role)
      .order('proficiency', { ascending: false })

    if (error) {
      console.error('Error fetching skills:', error)
      return []
    }

    return data as Skill[]
  }

  async function fetchProjects(): Promise<Project[]> {
    const { data, error } = await client
      .from('projects')
      .select('*')
      .order('id', { ascending: true })

    if (error) {
      console.error('Error fetching projects:', error)
      return []
    }

    return data as Project[]
  }

  async function fetchExperiences(): Promise<JobExperience[]> {
    const { data, error } = await client
      .from('experiences')
      .select('*')
      .order('id', { ascending: true })

    if (error) {
      console.error('Error fetching experiences:', error)
      return []
    }

    return data as JobExperience[]
  }

  async function fetchArticles(): Promise<BlogArticle[]> {
    const { data, error } = await client
      .from('articles')
      .select('*')
      .order('publishedAt', { ascending: false })

    if (error) {
      console.error('Error fetching articles:', error)
      return []
    }

    return data as BlogArticle[]
  }

  return {
    fetchSkills,
    fetchProjects,
    fetchExperiences,
    fetchArticles,
  }
}
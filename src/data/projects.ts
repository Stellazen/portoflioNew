export const projectCategories = {
  profissional: { label: 'Profissional', filter: 'Profissionais' },
  academico: { label: 'Acadêmico', filter: 'Acadêmicos' },
  wordpress: { label: 'WordPress', filter: 'WordPress' }
} as const

export type ProjectCategory = keyof typeof projectCategories

export type ProjectMedia =
  | { type: 'image'; src: string; alt: string }
  | { type: 'video'; src: string; alt: string; poster?: string; captions?: string }

export interface Project {
  id: string
  name: string
  category: ProjectCategory
  description: string
  technologies: string[]
  objective: string
  features: string[]
  learnings: string
  url: string
  media: ProjectMedia
  creation_date: string
}

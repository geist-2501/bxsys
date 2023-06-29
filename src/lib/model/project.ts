export interface ProjectFrontmatter {
  title: string;
  github: string;
  tags: string[];
  description: string;
  slug: string;
}

export interface ProjectLink {
  displayName: string;
  link: string;
}

export interface Project {
  title: string;
  links: ProjectLink[];
  tags: string[];
  description: string;
  slug: string;
}
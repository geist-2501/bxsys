export interface ProjectLink {
  displayName: string;
  link: string;
}

export interface Project {
  title: string;
  links: ProjectLink[];
  tags: string[];
  description: string;
}
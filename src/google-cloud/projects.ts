import { OAuth } from 'mosaic';
import { NotFoundError } from 'js-common';

export interface ServiceConfig{
	id: string;
	defaultHost?: string;
}

export interface GoogleOAuthClient{
	id: string;

	package?: string; /* Android package */
	bundle?: string; /* iOS app bundle identifier */
	fingerprint?: string; /* Android signing key SHA-1 fingerprint */

	secret?: string;
	redirectUri?: string;
}

export interface Project{
	name: string;
	resourceNumber?: string;
	oauth?: OAuth.OAuthConfig[];
	keys?: string[];
	apis?: ServiceConfig[];
	clients?: GoogleOAuthClient[];
}

export class ProjectRegistry{
	private provider;
	private projects;

	constructor(provider: OAuth.OAuthProvider = OAuth.DefaultOAuthProvider){
		this.provider = provider;
		this.projects = new Map<string, Project>();
	}

	registerProjects(projects: Project[]){
		for(let project of projects){
			this.projects.set(project.name, project);

			for(let client of project.clients ?? []){
				this.provider.registerClients([
					{
						config: project.oauth![0],
						project,
						...client
					}
				]);
			}
		}
	}

	getProject(name: string){
		let project = this.projects.get(name);

		if(!project)
			throw new NotFoundError(`Project with name '${name}' not found`);
		return project;
	}
}

export const DefaultProjectRegistry = new ProjectRegistry();
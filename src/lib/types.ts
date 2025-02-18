export type Categories = 'sveltekit' | 'svelte'

export enum VGrade {
  v0 = 'V0',
  v1 = 'V1',
  v2 = 'V2',
  v3 = 'V3',
  v4 = 'V4',
  v5 = 'V5',
  v6 = 'V6',
  v7 = 'V7',
  v8 = 'V8',
  v9 = 'V9',
  v10 = 'V10',
  v11 = 'V11',
  v12 = 'V12',
  v13 = 'V13',
  v14 = 'V14',
  v15 = 'V15',
  v16 = 'V16',
  v17 = 'V17',
}

export interface Post {
	title: string
	slug: string
	description: string
	date: string
	categories: Categories[]
	published: boolean
}

export interface Boulder {
  name: string
  description: string
  grade: VGrade
  location: string | null
  image: string | null
  video_url: string | null
}
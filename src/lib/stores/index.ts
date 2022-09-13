import type { Map } from 'maplibre-gl';
import { writable } from 'svelte/store';
import type { CactusStudyData } from '$lib/interfaces';

// map store for maplibre-gl object
export const map = writable<Map>(undefined);

// the data from CACTUS API
export const cactusStudyData = writable<CactusStudyData[]>(undefined);

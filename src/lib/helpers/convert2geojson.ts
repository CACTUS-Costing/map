import type { CactusStudyData } from '$lib/interfaces';
import type { GeoJSONFeature } from 'maplibre-gl';

export const convert2geojson = async (data: CactusStudyData[]) => {
	const features: GeoJSONFeature[] = [];

	data.forEach((study) => {
		const master = study.master;

		const feature = {
			id: master.datapoint_id,
			type: 'Feature',
			geometry: { type: 'Point', coordinates: [Number(master.lon), Number(master.lat)] },
			properties: master
		};
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		features.push(feature);
	});
	return {
		type: 'FeatureCollection',
		features: features
	};
};

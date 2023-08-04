<script lang="ts">
	import { onMount } from 'svelte';
	import { Map, NavigationControl, ScaleControl, AttributionControl } from 'maplibre-gl';
	import { cactusStudyData, map } from '$lib/stores';
	import Popup from './Popup.svelte';
	import '@watergis/maplibre-gl-export/dist/maplibre-gl-export.css';
	import { convert2geojson, getCactusStudyData } from '$lib/helpers';
	import { config } from '../../config';

	let mapContainer: HTMLDivElement;

	onMount(async () => {
		if (!$cactusStudyData) {
			const data = await getCactusStudyData();
			cactusStudyData.update(() => data);
		}

		const _map = new Map({
			container: mapContainer,
			style: `https://tiles.basemaps.cartocdn.com/gl/voyager-gl-style/style.json`,
			center: [37.138, 0.414],
			zoom: 6,
			hash: true,
			attributionControl: false
		});
		_map.addControl(new NavigationControl({}), 'top-right');

		const { MaplibreExportControl, Size, PageOrientation, Format, DPI } = await import(
			'@watergis/maplibre-gl-export'
		);
		const exportControl = new MaplibreExportControl({
			PageSize: Size.A4,
			PageOrientation: PageOrientation.Landscape,
			Format: Format.PNG,
			DPI: DPI[96],
			Crosshair: true,
			PrintableArea: true
		});
		_map.addControl(exportControl, 'top-right');

		_map.addControl(new ScaleControl({ maxWidth: 80, unit: 'metric' }), 'bottom-left');
		_map.addControl(new AttributionControl({ compact: true }), 'bottom-right');

		const geojson = await convert2geojson($cactusStudyData);

		_map.addSource('cactus-data', {
				type: 'geojson',
				data: geojson,
				attribution: config.attribution
			});

			_map.addLayer({
				id: 'cactus-data',
				type: 'circle',
				source: 'cactus-data',
				paint: {
					'circle-color': '#11b4da',
					'circle-radius': 8,
					'circle-stroke-width': 1,
					'circle-stroke-color': '#fff'
				}
			});

		map.update(() => _map);
	});
</script>

<div class="map" id="map" bind:this={mapContainer} />
<Popup />

<style>
	@import 'maplibre-gl/dist/maplibre-gl.css';

	.map {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 100%;
		z-index: 1;
	}
</style>

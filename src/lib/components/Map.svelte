<script lang="ts">
	import { onMount } from 'svelte';
	import { Map, NavigationControl, ScaleControl, AttributionControl } from 'maplibre-gl';
	import { map } from '$lib/stores';
	import Popup from './Popup.svelte';

	let mapContainer: HTMLDivElement;

	onMount(async () => {
		const _map = new Map({
			container: mapContainer,
			style: `https://undp-data.github.io/style/style.json`,
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

		map.update(() => _map);
	});
</script>

<div class="map" id="map" bind:this={mapContainer} />
<Popup />

<style>
	@import 'maplibre-gl/dist/maplibre-gl.css';
	@import '@watergis/maplibre-gl-export/css/styles.css';

	.map {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 100%;
		z-index: 1;
	}
</style>

<script lang="ts">
	import maplibreglPkg from 'maplibre-gl';
	const { Popup } = maplibreglPkg;
	import type { GeoJSONFeature, MapMouseEvent } from 'maplibre-gl';
	import { map } from '$lib/stores';

	let popupContainer: HTMLDivElement;
	let clickedFeatures: GeoJSONFeature[] = [];
	let selectedFeature: GeoJSONFeature | undefined;

	$: if ($map) {
		$map.on('load', async function () {
			$map.on('click', 'cactus-data', function (e: MapMouseEvent) {
				const features = $map.queryRenderedFeatures(e.point, {
					layers: ['cactus-data']
				});
				clickedFeatures = features;
				selectedFeature = undefined;

				if (features.length === 0) return;
				selectedFeature = clickedFeatures[0];
				new Popup()
					.setLngLat(e.lngLat)
					.setDOMContent(popupContainer)
					.setMaxWidth('300px')
					.addTo($map);
			});
		});
	}
</script>

<div bind:this={popupContainer}>
	{#if clickedFeatures && clickedFeatures.length > 0}
		<div class="select is-small is-success">
			<select bind:value={selectedFeature}>
				{#each clickedFeatures as feature}
					<option value={feature}
						>{feature.properties.datapoint_id}: {feature.properties.component}</option
					>
				{/each}
			</select>
		</div>
		{#if selectedFeature}
			<div class="popup-table">
				<table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
					<tr><th>System</th><td>{selectedFeature.properties.system}</td></tr>
					<tr><th>Element</th><td>{selectedFeature.properties.element}</td></tr>
					<tr><th>Component</th><td>{selectedFeature.properties.component}</td></tr>
					<tr><th>Data collector</th><td>{selectedFeature.properties.data_collector}</td></tr>
					<tr><th>TACH (Int$2020)</th><td>{selectedFeature.properties.tach.toFixed()}</td></tr>
					<tr><th>TACC (Int$2020)</th><td>{selectedFeature.properties.tacc.toFixed()}</td></tr>
					<tr><th>Description</th><td>{selectedFeature.properties.case_description}</td></tr>
					<tr>
						<th>Number of households served</th>
						<td>{selectedFeature.properties.num_hh_served}</td>
					</tr>
					<tr>
						<th>Number of people served</th>
						<td>{selectedFeature.properties.num_people_served}</td>
					</tr>
					<tr>
						<th>Coordinates</th>
						<td>{selectedFeature.properties.lon}, {selectedFeature.properties.lat}</td>
					</tr>
					<tr><th>City</th><td>{selectedFeature.properties.city}</td></tr>
					<tr><th>Country</th><td>{selectedFeature.properties.country}</td></tr>
					<tr><th>Region</th><td>{selectedFeature.properties.region}</td></tr>
					<tr><th>Date</th><td>{selectedFeature.properties.date}</td></tr>
				</table>
			</div>
		{/if}
	{/if}
</div>

<style>
	@import 'bulma/css/bulma.css';

	.popup-table {
		max-height: 300px;
		overflow-y: auto;
	}
</style>

<template>
	<div id="app">
		<transition :name="$store.state.transition" mode="out-in">
			<router-view/>
		</transition>
	</div>
</template>

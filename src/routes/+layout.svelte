<!-- src/routes/+layout.svelte -->
<script lang="ts">
    import '$lib/css/chota.min.css';
    import '$lib/css/style.css';
    import { base } from '$app/paths';
</script>

<main class="container">
    <nav class="nav">
        <div class="nav-left">
            <a class="brand" href="{ base }/">Transliterasi Aksara Sasak</a>
        </div>
        <div class="nav-right">
            <a href="{ base }/latin-jawa">Latin-Sasak</a>
            <a href="{ base }/jawa-latin">Sasak-Latin</a>
            <a href="{ base }/latin-kawi">Latin-Kawi</a>
            <a href="{ base }/jawa-kawi">Sasak-Kawi</a>
        </div>
    </nav>

    <slot />

    <footer class="text-center">
        <h5>©2024 - <a href="https://ft.hamzanwadi.ac.id" class="copyright" style="text-decoration: underline;">Development Team</a></h5>
    </footer>
</main>
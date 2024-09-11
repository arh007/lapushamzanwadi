<script lang="ts">
import { ConverterMethod } from "$lib/scripts/global";
import SvelteSeo from "svelte-seo";
import Converter from "$lib/components/Converter.svelte";
</script>
    
<SvelteSeo
    title="Transliterasi Aksara Sasak | Latin-Sasak"
    description="Alat transliterasi sederhana untuk mengalihkan/mengubah/mengkonversi teks aksara Latin menjadi aksara Sasak."
    canonical="https://arh007.github.io/lapushamzanwadi/latin-jawa"
    keywords="alat, transliterasi, konversi, alih, aksara, jawa, latin"
    openGraph={{
        title: "Transliterasi Aksara Sasak | Latin-Sasak",
        description: "Alat transliterasi sederhana untuk mengalihkan/mengubah/mengkonversi teks aksara Latin menjadi aksara Sasak.",
        url: "https://arh007.github.io/lapushamzanwadi/latin-jawa",
        type: "website",
        images: [{
            url: "https://arh007.github.io/lapushamzanwadi/alih-aksara-screenshot.png",
        },],
        site_name: "Transliterasi Aksara Sasak",
    }}
    twitter={{
        card: "summary_large_image",
        title: "Transliterasi Aksara Sasak | Latin-Sasak",
        description: "Alat transliterasi sederhana untuk mengalihkan/mengubah/mengkonversi teks aksara Latin menjadi aksara Sasak.",
        image: "https://arh007.github.io/lapushamzanwadi/alih-aksara-screenshot.png",
    }}
/>

<Converter method = { ConverterMethod.LatinToJava } />
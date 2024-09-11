<script lang="ts">
import { ConverterMethod } from "$lib/scripts/global";
import SvelteSeo from "svelte-seo";
import Converter from "$lib/components/Converter.svelte";
</script>
    
<SvelteSeo
    title="Transliterasi Sasak | Latin-Jawa"
    description="Alat transliterasi sederhana untuk mengalihkan/mengubah/mengkonversi teks aksara Latin menjadi aksara Jawa."
    canonical="https://arh007.github.io/lapushamzanwadi/latin-jawa"
    keywords="alat, transliterasi, konversi, alih, aksara, jawa, latin"
    openGraph={{
        title: "Transliterasi Sasak | Latin-Jawa",
        description: "Alat transliterasi sederhana untuk mengalihkan/mengubah/mengkonversi teks aksara Latin menjadi aksara Jawa.",
        url: "https://arh007.github.io/lapushamzanwadi/latin-jawa",
        type: "website",
        images: [{
            url: "https://arh007.github.io/lapushamzanwadi/alih-aksara-screenshot.png",
        },],
        site_name: "Transliterasi Sasak",
    }}
    twitter={{
        card: "summary_large_image",
        title: "Transliterasi Sasak | Latin-Jawa",
        description: "Alat transliterasi sederhana untuk mengalihkan/mengubah/mengkonversi teks aksara Latin menjadi aksara Jawa.",
        image: "https://arh007.github.io/lapushamzanwadi/alih-aksara-screenshot.png",
    }}
/>

<Converter method = { ConverterMethod.LatinToJava } />
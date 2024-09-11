<script lang="ts">
import { ConverterMethod } from "$lib/scripts/global";
import SvelteSeo from "svelte-seo";
import Converter from "$lib/components/Converter.svelte";
</script>
    
<SvelteSeo
    title="Transliterasi Aksara Sasak | Latin-Kawi"
    description="Alat transliterasi sederhana untuk mengalihkan/mengubah/mengkonversi teks aksara Latin menjadi aksara Kawi."
    canonical="https://arh007.github.io/lapushamzanwadi/latin-kawi"
    keywords="alat, transliterasi, konversi, alih, aksara, kawi, latin"
    openGraph={{
        title: "Transliterasi Aksara Sasak | Latin-Kawi",
        description: "Alat transliterasi sederhana untuk mengalihkan/mengubah/mengkonversi teks aksara Latin menjadi aksara Kawi.",
        url: "https://arh007.github.io/lapushamzanwadi/latin-kawi",
        type: "website",
        images: [{
            url: "https://arh007.github.io/lapushamzanwadi/alih-aksara-screenshot.png",
          },],
        site_name: "Transliterasi Aksara Sasak",
      }}
      twitter={{
        card: "summary_large_image",
        title: "Transliterasi Aksara Sasak | Latin-Kawi",
        description: "Alat transliterasi sederhana untuk mengalihkan/mengubah/mengkonversi teks aksara Latin menjadi aksara Kawi.",
        image: "https://arh007.github.io/lapushamzanwadi/alih-aksara-screenshot.png",
      }}
/>
    
<Converter method = { ConverterMethod.LatinToKawi } />
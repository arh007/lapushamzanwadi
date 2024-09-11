<script lang="ts">
import '$lib/css/chota.min.css';
import '$lib/css/style.css';
import SvelteSeo from "svelte-seo";
import { base } from '$app/paths';
	import WidgetFeedback from '$lib/components/WidgetFeedback.svelte';
	import WidgetRecomendation from '$lib/components/WidgetRecomendation.svelte';
</script>

<SvelteSeo
  title="Transliterasi Aksara Sasak"
  description="Alat transliterasi sederhana untuk mengalihkan/mengubah/mengkonversi teks aksara Jawa ke bentuk aksara lain ataupun sebaliknya."
  canonical="https://arh007.github.io/lapushamzanwadi"
  keywords="alat, transliterasi, konversi, alih, aksara, jawa, latin, kawi"
  openGraph={{
    title: "Transliterasi Aksara Sasak",
    description: "Alat transliterasi sederhana untuk mengalihkan/mengubah/mengkonversi teks aksara Jawa ke bentuk aksara lain ataupun sebaliknya.",
    url: "https://arh007.github.io/lapushamzanwadi",
    type: "website",
    images: [{
        url: "https://arh007.github.io/lapushamzanwadi/alih-aksara-screenshot.png",
      },],
    site_name: "Transliterasi Aksara Sasak",
  }}
  twitter={{
    card: "summary_large_image",
    title: "Transliterasi Aksara Sasak",
    description: "Alat transliterasi sederhana untuk mengalihkan/mengubah/mengkonversi teks aksara Jawa ke bentuk aksara lain ataupun sebaliknya.",
    image: "https://arh007.github.io/lapushamzanwadi/alih-aksara-screenshot.png",
  }}
/>

<section>
  
  <div class="row hero is-vertical-align">
    <div class="col">
      <p>Alat transliterasi sederhana untuk mengalihkan/mengubah/mengkonversi teks Aksara Sasak ke bentuk Latin ataupun sebaliknya.</p>
      <a href="{ base }/latin-jawa" class="button primary">Coba Sekarang</a>
    </div>
    <div class="col illustration-image">
      <picture>
        <source type="image/webp" media="(min-width:900px)" width="420" srcset="{ base }/illustration.webp">
        <source type="image/webp" width="360" srcset="{ base }/illustration.webp">
        <img src="{ base }/illustration.png"  alt="Illustration">
      </picture>
    </div>
  </div>

  <div class="row">
    <div class="col-8">
      <h4>Sekilas Tentang Transliterasi Aksara Sasak</h4>
      <p>Proyek penelitian dan pengembangan <strong>Transliterasi Aksara Sasak</strong> ini hanyalah sebuah uji coba. Karena masih terdapat beberapa kesalahan font dan pengucapan kata dikerenakan kekurangan sumber informasi aksara sasak dari para tetuah seni bahasa sasak.</p> 
      <p>Oleh karena itu, kami yang masih awam ini dengan tangan terbuka menerima segala umpan balik untuk mengembangkan website ini menjadi lebih baik terutama ahli bahasa sastra, tokoh dan budayawan sasak.</p>
    </div>
    <div class="col">
      <WidgetRecomendation style="margin-bottom: 2em" />
      <WidgetFeedback  />
    </div>
  </div>

</section>
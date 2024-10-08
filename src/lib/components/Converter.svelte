<script lang="ts">
import { ConverterMethod } from "$lib/scripts/global";
import { convert as latinJavaConvert } from "$lib/scripts/latinjava";
import { convert as latinKawiConvert } from "$lib/scripts/latinkawi";
import { convert as javaLatinConvert } from "$lib/scripts/javalatin";
import { convert as javaKawiConvert } from "$lib/scripts/javakawi";
import { javaDefaultKeyboard, javaCapslockKeyboard } from "$lib/scripts/javakeyboard";
	import WidgetFeedback from "./WidgetFeedback.svelte";
	import WidgetRecomendation from "./WidgetRecomendation.svelte";

let input:string = "";
let output:string = "";

let textareaEl:HTMLTextAreaElement;
let isPepetTypeMode:boolean = true;
let isIgnoreSpace:boolean = true;
let isMurda:boolean = false;
let isDiphtong:boolean = false;
let isVirtualKeyboardActive:boolean = false;
let isCapslock:boolean = false;

const specialCharacters = ['Ê', 'ê', 'ā', 'ī', 'ū', 'ḍ', 'ḍh', 'ṣ', 'ś', 'ṭ', 'ṭh', 'ṇ', 'ñ', 'ŋ'];
let javaKeyboard = isCapslock ? javaCapslockKeyboard : javaDefaultKeyboard;
var javaKeyboardDictionary:{ [id: string]: string; } = { };
javaDefaultKeyboard.forEach(x => {
    javaKeyboardDictionary[x[0]] = x[1];
});
javaCapslockKeyboard.forEach(x => {
    javaKeyboardDictionary[x[0]] = x[1];
});


let tooltipEl:HTMLElement;
let tooltipMessage:string = "";

export let method:ConverterMethod = ConverterMethod.None;

function inputTitle():string
{
    switch(method) { 
        case ConverterMethod.LatinToJava:
        case ConverterMethod.LatinToKawi:
            return "Aksara Latin"
        case ConverterMethod.JavaToKawi: 
        case ConverterMethod.JavaToLatin: 
            return "Aksara Sasak"
    } 

    return "Aksara Undefined";
}

function outputTitle():string
{
    switch(method) { 
        case ConverterMethod.LatinToJava: 
            return "Aksara Sasak";
        case ConverterMethod.JavaToLatin: 
            return "Aksara Latin";
        case ConverterMethod.JavaToKawi:
        case ConverterMethod.LatinToKawi:
            return "Aksara Kawi";
    }

    return "Aksara Undefined";
}

function onInputUpdate()
{
    switch(method) { 
        case ConverterMethod.LatinToJava: 
        { 
            output = latinJavaConvert(input, isIgnoreSpace, isMurda, isDiphtong);
            break; 
        }
        case ConverterMethod.LatinToKawi: 
        { 
            output = latinKawiConvert(input, isIgnoreSpace);
            break; 
        }
        case ConverterMethod.JavaToLatin: 
        {
            output = javaLatinConvert(input) 
            break; 
        }
        case ConverterMethod.JavaToKawi: 
        {
            output = javaKawiConvert(input) 
            break; 
        }
    } 
}

function onInputKeyDown(e:KeyboardEvent) {
    if (e.ctrlKey) return;

    if (method == ConverterMethod.LatinToJava || method == ConverterMethod.LatinToKawi) 
    {
        if(isPepetTypeMode == false) return;

        if(e.key === "X") {
            insertToTextarea("Ê");
            onInputUpdate();
            e.preventDefault();
            e.stopPropagation();
            return;
        }

        if(e.key === "x") {
            insertToTextarea("ê");
            onInputUpdate();
            e.preventDefault();
            e.stopPropagation();
        }

        return;
    }

    if (method == ConverterMethod.JavaToLatin || method == ConverterMethod.JavaToKawi) 
    {
        if(isVirtualKeyboardActive == false) return;

        isCapslock = e.getModifierState("CapsLock");
        javaKeyboard = isCapslock ? javaCapslockKeyboard : javaDefaultKeyboard;

        if (javaKeyboardDictionary.hasOwnProperty(e.key))
        {
            insertToTextarea(javaKeyboardDictionary[e.key]);
            onInputUpdate();
            e.preventDefault();
            e.stopPropagation();
        }
        
        return;
    }
}

function onDocumentKeyDown(e:KeyboardEvent) {
    if (e.key == "CapsLock")
    {
        isCapslock = e.getModifierState("CapsLock");
        javaKeyboard = isCapslock ? javaCapslockKeyboard : javaDefaultKeyboard;
    }

    if (e.key == "Shift")
    {
        isCapslock = e.getModifierState("CapsLock") ? !e.getModifierState("Shift") : e.getModifierState("Shift");
        javaKeyboard = isCapslock ? javaCapslockKeyboard : javaDefaultKeyboard;
    }
}

function onDocumentKeyUp(e:KeyboardEvent) {
    if (e.key == "Shift")
    {
        isCapslock = e.getModifierState("CapsLock") ? !e.getModifierState("Shift") : e.getModifierState("Shift");
        javaKeyboard = isCapslock ? javaCapslockKeyboard : javaDefaultKeyboard;
    }
}

function insertToTextarea(str:string) {
    var nextCursorPos = textareaEl.selectionStart + str.length;
    textareaEl.value = textareaEl.value.substring(0, textareaEl.selectionStart) + str + textareaEl.value.substring(textareaEl.selectionEnd, textareaEl.value.length);
    input = textareaEl.value;
    textareaEl.focus();
    textareaEl.setSelectionRange(nextCursorPos, nextCursorPos);
}

function onPressBackspace() {
    if (textareaEl.selectionStart == 0 && textareaEl.selectionEnd == 0) 
    {
        textareaEl.focus();
        textareaEl.setSelectionRange(textareaEl.selectionStart, textareaEl.selectionEnd);
        return;
    }

    var selectionLength = textareaEl.selectionStart - textareaEl.selectionEnd;
    var nextCursorPos = selectionLength == 0 ? textareaEl.selectionStart - 1 : textareaEl.selectionStart;
    textareaEl.value = textareaEl.value.substring(0, nextCursorPos) + textareaEl.value.substring(textareaEl.selectionEnd, textareaEl.value.length);
    input = textareaEl.value;

    textareaEl.focus();
    textareaEl.setSelectionRange(nextCursorPos, nextCursorPos);
}

function toggleCapslock()
{
    isCapslock = !isCapslock;
    javaKeyboard = isCapslock ? javaCapslockKeyboard : javaDefaultKeyboard;
    textareaEl.focus();
    textareaEl.setSelectionRange(textareaEl.selectionStart, textareaEl.selectionEnd);
}

function copyToClipboard(text:string) {
    navigator.clipboard.writeText(text)
        .then(res => {
            tooltipMessage = "Berhasil disalin";
            tooltipEl.classList.add("show");
        }).catch(error => {
            tooltipMessage = "Gagal disalin";
            tooltipEl.classList.add("show");
        });
}

function onClickCopyButton()
{
    copyToClipboard(output);
}

function onPointerLeaveCopyButton()
{
    tooltipEl.classList.remove("show");
}
</script>

<svelte:head>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
</svelte:head>

<svelte:document on:keydown={ onDocumentKeyDown } on:keyup={ onDocumentKeyUp } />

<section class="converter">
    <div class="row">
        <div class="col-12 converter-input">
            <h4>{ inputTitle() }</h4>
            <textarea bind:this={ textareaEl } bind:value={input} on:input={ onInputUpdate } on:keydown={ onInputKeyDown }></textarea>
    
            {#if method == ConverterMethod.LatinToJava || method == ConverterMethod.LatinToKawi }
            <div style="margin-block-start: 1em;">
                <label style="margin-right: .5em;">
                    <input type="checkbox" role="switch" bind:checked={ isPepetTypeMode }>
                    Mode Ketik Pepet
                </label>
    
                <label style="margin-right: .5em;">
                    <input type="checkbox" role="switch" bind:checked={ isIgnoreSpace } on:change={ onInputUpdate }>
                    Abaikan Spasi
                </label>
    
                {#if method == ConverterMethod.LatinToJava }
                <label style="margin-right: .5em;">
                    <input type="checkbox" role="switch" bind:checked={ isMurda } on:change={ onInputUpdate }>
                    Murda
                </label>
    
                <label style="margin-right: .5em;">
                    <input type="checkbox" role="switch" bind:checked={ isDiphtong } on:change={ onInputUpdate }>
                    Diftong
                </label>
                {/if}
            </div>
            
            <h5>Tombol Karakter Spesial</h5>
            <div class="virtual-keyboard">
                {#each specialCharacters as char}
                <button class="button outline icon-only" on:click= { () => { insertToTextarea(char); onInputUpdate(); } }>{char}</button>
                {/each}
            </div>
            {/if}
    
            {#if method == ConverterMethod.JavaToLatin || method == ConverterMethod.JavaToKawi }
            <div style="margin-block-start: 1em;">
                <label style="margin-right: .5em;">
                    <input type="checkbox" role="switch" bind:checked={ isVirtualKeyboardActive }>
                    Aktifkan Keyboard Virtual Aksara Sasak
                </label>
            </div>
                {#if isVirtualKeyboardActive }
                <div class="virtual-keyboard layout">
                    {#each javaKeyboard as key, i}<button class="button outline icon-only" on:click= { () => { insertToTextarea(key[1]); onInputUpdate(); } }>{key[1]}</button>{#if i == 12 || i == 25}<br/>{/if}{#if i == 36}<button class="button outline icon-only material-symbols-outlined" style="width: 12%;font-size: 1.25em;" on:click= { () => { insertToTextarea('\n'); onInputUpdate(); } }>keyboard_return</button><br/><button class="button activatable outline icon-only material-symbols-outlined" class:active={ isCapslock } style="width: 12%;font-size: 1.25em;" on:dblclick={ toggleCapslock } on:click={ toggleCapslock }>keyboard_capslock</button>{/if}{/each}<button class="button outline icon-only material-symbols-outlined" style="width: 12%;font-size: 1.25em;" on:click={ () => { onPressBackspace(); onInputUpdate(); } }>backspace</button><br/><button class="button outline icon-only material-symbols-outlined" style="width: 50%;font-size: 1.25em;" on:click= { () => { insertToTextarea(' '); onInputUpdate(); } }>space_bar</button>
                </div>
                {/if}
            {/if}
        </div>
        <div class="col-12 converter-output">
            <h4>{ outputTitle() }</h4>
                <div class="content">
                <span>{ output }</span>
                <div class="action-button-area">
                    <button bind:this={ tooltipEl } class="button copy icon-only clear tooltip" data-text={ tooltipMessage } on:click={ onClickCopyButton } on:pointerleave={ onPointerLeaveCopyButton }>
                        <span class="material-symbols-outlined">content_copy</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</section>

{#if method == ConverterMethod.LatinToJava || method == ConverterMethod.LatinToKawi}
<section class="row">
    <div class="col">
        <h4>Keterangan Penggunaan</h4>
        <ul class="list-unstyled">
            <li>
                <h5>Mode Ketik Pepet</h5>
                {#if method == ConverterMethod.LatinToJava }
                <p>Saat diaktifkan, tombol x pada keyboard akan digantikan fungsinya untuk mengetikkan huruf ê yang merepresentasikan pepet (ᭂ) dalam aksara Sasak. Huruf ê sendiri menghasilkan bunyi seperti huruf e pada kata "enam".</p>
                {/if}
                {#if method == ConverterMethod.LatinToKawi}
                <p>Saat diaktifkan, tombol x pada keyboard akan digantikan fungsinya untuk mengetikkan huruf ê yang merepresentasikan pepet (𑽀◌) dalam aksara Kawi. Huruf ê sendiri menghasilkan bunyi seperti huruf e pada kata "enam".</p>
                {/if}
            </li>
            <li>
                <h5>Abaikan Spasi</h5>
                <p>Saat diaktifkan, proses konversi akan mengabaikan spasi dari kolom masukan. Sebaliknya jika dinonaktifkan, spasi akan dikonversikan menjadi <i>zero width space</i> alias spasi yang tidak terlihat.</p>                
            </li>
            {#if method == ConverterMethod.LatinToJava }
            <li>
                <h5>Murda</h5>
                <p>Saat diaktifkan, aksara pertama dari aksara-aksara ᬦ, ᬓ, ᬢ, ᬲ, ᬧ, ᬜ, ᬕ, ᬩ akan diubah ke dalam bentuk aksara murda-nya ᬡ, ᬔ, ᬣ, ᬰ, ᬨ, ᬡ, ᬖ, ᬪ.
                Dalam aksara sasak, aksara murda digunakan layaknya huruf kapital dalam bahasa Indonesia dan dipakai khusus untuk penulisan nama, gelar, atau tempat.</p>
            </li>
            <li>
                <h5>Diftong</h5>
                <p>Saat diaktifkan, gugus vokal 'ai', 'au' dan vokal panjang 'aa', 'ii', 'uu' akan diubah menjadi karakter spesial aksara sasak, yakni ᬿ (Taling Repa) untuk 'ai', ᭁ (Taling Repa Tedung) untuk 'au', ᬵ (Tedung) untuk 'aa', ᬷ (Ulu Sari) untuk 'ii', dan ᬹ (Suku Ilut) untuk 'uu'.</p>
            </li>
            <li>
                <h5>Tombol Karakter Spesial</h5>
                <p>Berisikan tombol-tombol untuk mengetikkan karakter-karakter spesial yang digunakan untuk merepresentasikan huruf-huruf aksara sasak yang tidak dapat diwakili oleh alfabet A-Z.</p>
                <p>Berikut karakter-karakter spesial yang digunakan dalam konverter ini beserta hasil konversinya :</p>
                <ul style="margin-block-end: 1em">
                    <li>Ê menghasilkan ᬅᭂ (Swara Ê)</li>  
                    <li>ê menghasilkan  ᬾ (Pepet)</li>
                    <li>ā menghasilkan ᬵ (Tedung)</li>  
                    <li>ī menghasilkan ᬷ (Ulu Sari)</li>  
                    <li>ū menghasilkan ᬹ (Suku Ilut)</li>
                    <li>ḍ menghasilkan ᬟ (Dha)</li>  
                    <li>ḍh menghasilkan ᬠ (Dha Mahaprana)</li> 
                    <li>ṣ menghasilkan ᬱ (Sa Mahaprana)</li>
                    <li>ś menghasilkan ᬰ (Sa Murda)</li>
                    <li>ṭ menghasilkan ᬝ (Ta Murda)</li> 
                    <li>ṭh menghasilkan ᬞ (Tha Mahaprana)</li> 
                    <li>ṇ menghasilkan ᬡ (Na Murda)</li> 
                    <li>ñ menghasilkan ᬜ (Nya)</li>
                    <li>ŋ menghasilkan ᬗ (Nga)</li> 
                </ul>
                <p>Karakter spesial ñ dan ŋ sama dengan ny dan ng dalam bahasa indonesia</p>
            </li>
            {/if}
        </ul>
    </div>
</section>
{/if}

<section class="row" style="flex: 1 1 auto;">
    <WidgetRecomendation class="col-6" />
    <WidgetFeedback class="col-6" />
</section>
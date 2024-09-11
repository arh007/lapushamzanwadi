const wyanjana:{ [id: string]: string; }  = {
    'ᬳ':'h',      // ha 
    'ᬦ':'n',      // na
    'ᬘ':'c',      // ca
    'ᬭ':'r',      // ra
    'ᬓ':'k',      // ka
    'ᬤ':'d',      // da
    'ᬢ':'t',      // ta
    'ᬲ':'s',      // sa
    'ᬯ':'w',      // wa
    'ᬮ':'l',      // la
    'ᬧ':'p',      // pa
    'ᬥ':'dh',      // dha
    'ᬚ':'j',      // ja
    'ᬬ':'y',      // ya
    'ᬜ':'ny',     // nya
    'ᬫ':'m',      // ma
    'ᬕ':'g',      // ga
    'ᬩ':'b',      // ba
    'ᬝ':'t',      // tha
    'ᬗ':'ng',     // nga
    'ᬡ':'n',       // na murda
    'ᬔ':'k',       // ka murda
    'ᬣ':'t',       // ta murda
    'ᬰ':'s',       // sa murda
    'ᬨ':'p',       // pa murda
    'ꦘ':'ny',      // nya murda
    'ᬖ':'g',       // ga murda
    'ᬪ':'b',       // ba murda
    'ᬱ':'s',       // sa mahaprana
    'ᬙ':'ch',      // cha mahaprana
    'ᬟ':'d',        // da mahaprana
    'ᬠ':'dh',      // dha mahaprana
    'ᬞ':'th',      // tha mahaprana
    'ᬛ':'jh',      // ja jera
    'ᭅ':'q',       // ka sasak
}

const rekan:{ [id: string]: string; }  = {
    'ᭆ':'kh',      // kha
    'ᬖ':'gh',      // gha
    'ᭊ':'z',      // za
    'ᭈ':'f',      // fa
    'ᭇ':'ts',      // ts
}

const swara:{ [id: string]: string; }  = {
    'ᬅ':'A',        // a 
    'ᬇ':'I',        // i 
    'ᬉ':'U',        // u 
    'ᬏ':'E',        // e 
    'ᬑ':'O',        // o
}

// diacritics swara
const sandhanganSwara:{ [id: string]: string; }  = {
    'ᬶ':'i',        // i
    'ᬸ':'u',        // u
    'ᭂ':'ê',        // ê
    'ᬾ':'e',        // e
    'ᭀ':'o',        // o
    'ᬿ':'ai',        // e
    'ᭁ':'au',        // e
    'ᬷ':'ī',       // dirga melik, long i
    'ᬹ':'ū',       // dirga mendut, long u
}

// diacritics swara
const sandhanganWyanjana:{ [id: string]: string; }  = {
    '᭄ᬭ':'r',       // guwung
    'ᬺ':'rě',       // guwung maclek
    '᭄ᬬ':'y',       // nania
    '᭄ᬮ':'l',       // gantungan la
    '᭄ᬯ':'w',       // suku kembung
}

const sandhanganPanyigeg:{ [id: string]: string; }  = {
    'ᬃ':'r',        // layar (r)
    'ᬂ':'ng',       // cecak (ng)
    'ᬄ':'h',        // wigyan (h)
    'ᬁ':'ṁ',          // panyangga (ṁ)
    'ᬀ':'ṃ', 
}

// punctuations
const pada:{ [id: string]: string; }  = {
    '​':' ',          // zero width non joiner
    '᭚ ':'||',         // panten
    '᭛':'',         // pemati
    '᭜':'○',        // tirta tumetes
    '᭚':'',        // isen-isen
    '᭞':',',        // carik siki
    '᭟':'.',        // carik kalih
    '᭠':'–',        // pada windu
    '᭑':'1',        // angka 1
    '᭒':'2',        // angka 2
    '᭓':'3',        // angka 3
    '᭔':'4',        // angka 4
    '᭕':'5',        // angka 5
    '᭖':'6',        // angka 6
    '᭗':'7',        // angka 7
    '᭘':'8',        // angka 8
    '᭙':'9',        // angka 9
    '᭐':'0',        // angka 0
}

function convert(str:string):string {
    var length = str.length;
    var output = [];

    for (let i = 0; i < length; i++) {
        var c:string = str[i];

        if(isPangkon(c)) {
            if(output.length - 1 >= 0 && output[output.length - 1] === 'a') {
                output.pop();
                continue;
            }
        }

        if(isCecakTelu(c)) {
            if(i - 1 >= 0 && isRekan(str[i - 1])) {
                if(output.length - 1 >= 0 && output[output.length - 1] === 'a') {
                    output.pop();
                }
                output.pop();
                output.push(rekan[str[i - 1]]);
                output.push('a');
                continue;
            }
        }

        if(isSandhanganWyanjana(c)) {
            if(output.length - 1 >= 0 && output[output.length - 1] === 'a') {
                output.pop();
            }
            output.push(sandhanganWyanjana[c]); 
            if(isCakraKeret(c)) {
                output.push('ê');
            } else {
                output.push('a');
            }
            continue;
        } 
        
        if(isSandhanganSwara(c)) {
            if(i - 1 >= 0) {
                if(isWyanjana(str[i - 1]) || (isSandhanganWyanjana(str[i - 1]) && !isCakraKeret(str[i - 1]))) {
                    if(output.length - 1 >= 0 && output[output.length - 1] === 'a') {
                        output.pop();
                    }

                    output.push(sandhanganSwara[c]);
                    continue;
                }

                if(isCecakTelu(str[i - 1])) {
                    if(i - 2 >= 0) {
                        if(isWyanjana(str[i - 2]) || (isSandhanganWyanjana(str[i - 2]) && !isCakraKeret(str[i - 2]))) {
                            if(output.length - 1 >= 0 && output[output.length - 1] === 'a') {
                                output.pop();
                            }
        
                            output.push(sandhanganSwara[c]);
                            continue;
                        }
                    }
                }
            }
        }

        if(isTarung(c)) {
            if(output.length - 1 >= 0) {
                var lastOutput:string = output[output.length - 1];

                if(lastOutput === 'a') {
                    output.pop();
                    output.push('ā');
                    continue;
                }

                if(lastOutput === 'ê') {
                    output.pop();
                    output.push('êu');
                    continue;
                }

                if(lastOutput === 'e') {
                    output.pop();
                    output.push('o');
                    continue;
                }

                if(lastOutput === 'ai') {
                    output.pop();
                    output.push('au');
                    continue;
                }

                if(lastOutput === 'Ê') {
                    output.push('u');
                    continue;
                }
            }
        }
        
        if(isSandhanganPanyigeg(c)) {
            output.push(sandhanganPanyigeg[c]);
            continue;
        }

        if(isPaCeret(c)) {
            output.push('r');
            output.push('ê');
            continue;
        }

        if(isNgaLelet(c)) {
            output.push('l');
            output.push('ê');
            continue;
        }

        if(isNgaLeletRaswadi(c)) {
            output.push('l');
            output.push('êu');
            continue;
        }

        if(isSwara(c)) {
            output.push(swara[c]);
            continue;
        }
        
        if(isWyanjana(c)) {
            output.push(wyanjana[c]);
            output.push('a');
            continue;
        }
        
        if(isPada(c)) {
            output.push(pada[c]);
            continue;
        }
            
        output.push(c);
        // Debug.Log(output);
    }
    return output.join("");
}

function isWyanjana(key:string):boolean { return Object.prototype.hasOwnProperty.call(wyanjana, key); }

function isRekan(key:string):boolean { return Object.prototype.hasOwnProperty.call(rekan, key); }

function isSwara(key:string):boolean { return Object.prototype.hasOwnProperty.call(swara, key); }

function isSandhanganSwara(key:string):boolean { return Object.prototype.hasOwnProperty.call(sandhanganSwara, key); }

function isSandhanganWyanjana(key:string):boolean { return Object.prototype.hasOwnProperty.call(sandhanganWyanjana, key); }

function isSandhanganPanyigeg(key:string):boolean { return Object.prototype.hasOwnProperty.call(sandhanganPanyigeg, key); }

function isPada(key:string):boolean { return Object.prototype.hasOwnProperty.call(pada, key); }

function isPaCeret(s:string):boolean { return s === "ꦉ"; }

function isNgaLelet(s:string):boolean { return s === "ᬍ"; }

function isNgaLeletRaswadi(s:string):boolean { return s === "ᬎ"; }

function isPangkon(s:string):boolean { return s === "᭄"; }

function isCakraKeret(s:string):boolean { return s === "ᬺ" }

function isTarung(s:string):boolean { return s === "ᬵ"; }

function isCecakTelu(s:string):boolean { return s === "ᬂ"; }

export { convert };
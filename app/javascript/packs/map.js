// ブートストラップ ローダ
(g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})({
  key: process.env.Maps_API_Key
});


// ライブラリの読み込み
let map;

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");
  const {AdvancedMarkerElement} = await google.maps.importLibrary("marker");

  // `data-itinerary-id` を map div から取得
  const itineraryId = document.getElementById('map').getAttribute('data-itinerary-id');
  console.log("itineraryId:", itineraryId);                                        // 取得したIDを確認

  if (!itineraryId) {
    console.error("Error: itineraryId is not defined");
    return;                                                         // itineraryId が取得できなければ終了
  }



  //tryが処理できなかったらerror処理へ
  try {
    const response = await fetch(`/itineraries/${itineraryId}.json`);
    if (!response.ok) throw new Error('Network response was not ok');

    const data = await response.json();
    const  { data: { items, earliest } } = data;

    if (!Array.isArray(items)) throw new Error("Items is not an array");
    if (!earliest) throw new Error("Earliest is not defined");

    // 地図の中心を設定
    const center = { lat: earliest.latitude, lng: earliest.longitude };
    console.log("Map center:", center);                                    // デバッグ用

    // 地図を初期化
    map = new Map(document.getElementById("map"), {
      center: center,
      zoom: 15,
      mapId: "DEMO_MAP_ID",
      mapTypeControl: false
    });

    items.forEach( item => {
      const { latitude, longitude, name } = item;

      console.log("Marker data:", { latitude, longitude, name });                // デバッグ用

      const marker = new google.maps.marker.AdvancedMarkerElement ({
        position: { lat: latitude, lng: longitude },
        map,
        title: name,
        // 他の任意のオプションもここに追加可能
      });
    });
  } catch (error) {
    console.error('Error fetching or processing destinations:', error);
  }
}

document.addEventListener("DOMContentLoaded", initMap);
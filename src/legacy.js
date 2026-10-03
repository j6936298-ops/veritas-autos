export function initializeVeritas() {
const categories = [
 {name:"Engine & Mechanical",desc:"Filters, belts, gaskets, plugs and essential engine components.",key:"engine"},
 {name:"Oil & Lubricants",desc:"Engine oils and lubricants for petrol, diesel and commercial vehicles.",key:"oil"},
 {name:"Braking",desc:"Brake pads, discs and components for dependable stopping.",key:"braking"},
 {name:"Electrical",desc:"Batteries, alternators, lighting and electrical essentials.",key:"electrical"},
 {name:"Suspension & Steering",desc:"Shocks, mounts, joints and suspension components.",key:"suspension"},
 {name:"Body Parts",desc:"Headlamps, exterior parts and replacement body components.",key:"body"},
 {name:"Accessories",desc:"Useful automotive accessories for everyday driving.",key:"accessories"},
 {name:"Tyres & Rims",desc:"Tyres, alloy wheels, steel rims and wheel essentials for cars, SUVs and commercial vehicles.",key:"tyres"},
 {name:"Truck & Commercial Parts",desc:"Heavy duty parts for HOWO, Mack, DAF and other commercial vehicles.",key:"trucks"}
];

const products = {
 engine:[
  ["Premium Oil Filter","Engine servicing","https://demarkarecambios.es/images/articulos_dm/R2050000_DEMARKA_RECAMBIOS.jpg"],
  ["Oil Filter Set","Engine servicing","https://www.alpartsonline.com/idea/rp/50/myassets/blogs/blog-1.png?revision=1766401164"],
  ["Iridium Spark Plugs","Ignition","https://image.made-in-china.com/202f0j00MOBlgViCZpUh/Factory-Cheap-Auto-Spare-Parts-High-Quality-Iridium-Platinum-Spark-Plugs.webp"],
  ["Engine Service Parts","Engine parts","https://www.alpartsonline.com/idea/rp/50/myassets/blogs/blog-1.png?revision=1766401164"],
  ["Drive Belt","Engine drive","https://www.alpartsonline.com/idea/rp/50/myassets/blogs/blog-1.png?revision=1766401164"],
  ["Spark Plug Set","Ignition","https://image.made-in-china.com/202f0j00MOBlgViCZpUh/Factory-Cheap-Auto-Spare-Parts-High-Quality-Iridium-Platinum-Spark-Plugs.webp"],
  ["Oil Filter","Engine servicing","https://demarkarecambios.es/images/articulos_dm/R2050000_DEMARKA_RECAMBIOS.jpg"],
  ["Engine Maintenance Set","Engine parts","https://www.alpartsonline.com/idea/rp/50/myassets/blogs/blog-1.png?revision=1766401164"]
 ],
 braking:[
  ["Genuine Front Brake Pads","Brake system","https://autofactorng.com/images/products/l/4qajow0FepK9rUJbUZuifJh8CqjsBeEYSth6QKMi.jpg"],
  ["Ceramic Brake Pad Set","Brake system","https://autofactorng.com/images/products/l/4qajow0FepK9rUJbUZuifJh8CqjsBeEYSth6QKMi.jpg"],
  ["Ventilated Brake Disc","Brake system","https://cdn.autodoc.de/thumb?id=9354150&lng=en&m=0&n=0&rev=94078007"],
  ["Front Brake Rotor","Brake system","https://image.made-in-china.com/155f0j00rfnYIgzGqOuq/Auto-Spare-Parts-Front-Brake-Disc-Rotor-for-Toyota-ECE-R90.webp"],
  ["Brake Disc Pair","Brake system","https://cdn.autodoc.de/thumb?id=9354150&lng=en&m=0&n=0&rev=94078007"],
  ["Rear Brake Pad Set","Brake system","https://autofactorng.com/images/products/l/4qajow0FepK9rUJbUZuifJh8CqjsBeEYSth6QKMi.jpg"],
  ["Premium Brake Rotors","Brake system","https://cdn.autodoc.de/thumb?id=9354150&lng=en&m=0&n=0&rev=94078007"],
  ["Brake Pad Set","Brake system","https://autofactorng.com/images/products/l/4qajow0FepK9rUJbUZuifJh8CqjsBeEYSth6QKMi.jpg"]
 ],
 electrical:[
  ["100A Alternator","Charging system","https://alliedautoonline.com.au/cdn/shop/files/BAL1178_600x600_crop_center.jpg?v=1761630299"],
  ["Automotive Battery","Starting system","https://www.nairaland.com/attachments/14894317_runallcarbatteryneway1_jpeg7d2ce722a3463eaa9079922b70dc66af"],
  ["Heavy Duty Battery","Starting system","https://www.contactcars.com/_next/image?q=75&url=https%3A%2F%2Fcontactcars.fra1.cdn.digitaloceanspaces.com%2Fcontactcars-production%2FImages%2FSmall%2FNews%2F9cc3012d-716d-4107-8feb-f0f9bcc93fc3_202208240951563883.jpg&w=2048"],
  ["Alternator Assembly","Charging system","https://alliedautoonline.com.au/cdn/shop/files/BAL1178_600x600_crop_center.jpg?v=1761630299"],
  ["Maintenance Free Battery","Starting system","https://www.nairaland.com/attachments/14894317_runallcarbatteryneway1_jpeg7d2ce722a3463eaa9079922b70dc66af"],
  ["Premium Alternator","Charging system","https://alliedautoonline.com.au/cdn/shop/files/BAL1178_600x600_crop_center.jpg?v=1761630299"],
  ["12V Car Battery","Starting system","https://www.contactcars.com/_next/image?q=75&url=https%3A%2F%2Fcontactcars.fra1.cdn.digitaloceanspaces.com%2Fcontactcars-production%2FImages%2FSmall%2FNews%2F9cc3012d-716d-4107-8feb-f0f9bcc93fc3_202208240951563883.jpg&w=2048"],
  ["Charging Alternator","Charging system","https://alliedautoonline.com.au/cdn/shop/files/BAL1178_600x600_crop_center.jpg?v=1761630299"]
 ],
 suspension:[
  ["Front Strut Mount Pair","Suspension","https://autofactorng.com/images/products/l/m54AFp0sPTjornTTujGIktQtbVvLk3Kb9SPWbpPh.jpg"],
  ["Shock Absorber Mount","Suspension","https://autofactorng.com/images/products/l/m54AFp0sPTjornTTujGIktQtbVvLk3Kb9SPWbpPh.jpg"],
  ["Suspension Components","Suspension","https://autofactorng.com/images/products/l/m54AFp0sPTjornTTujGIktQtbVvLk3Kb9SPWbpPh.jpg"],
  ["Front Suspension Mount","Suspension","https://autofactorng.com/images/products/l/m54AFp0sPTjornTTujGIktQtbVvLk3Kb9SPWbpPh.jpg"],
  ["Strut Mount Pair","Suspension","https://autofactorng.com/images/products/l/m54AFp0sPTjornTTujGIktQtbVvLk3Kb9SPWbpPh.jpg"],
  ["Front Shock Mount","Suspension","https://autofactorng.com/images/products/l/m54AFp0sPTjornTTujGIktQtbVvLk3Kb9SPWbpPh.jpg"],
  ["Steering and Suspension Parts","Suspension","https://autofactorng.com/images/products/l/m54AFp0sPTjornTTujGIktQtbVvLk3Kb9SPWbpPh.jpg"],
  ["Suspension Mount","Suspension","https://autofactorng.com/images/products/l/m54AFp0sPTjornTTujGIktQtbVvLk3Kb9SPWbpPh.jpg"]
 ],
 body:[
  ["Mazda CX 5 Headlight","Body and lighting","https://image.made-in-china.com/202f0j00CRlqhLjFfvoz/Auto-Spare-Part-Car-Head-Lamp-Headlight-for-Mazda-Cx-5-2014.webp"],
  ["Front Headlamp Assembly","Body and lighting","https://image.made-in-china.com/202f0j00CRlqhLjFfvoz/Auto-Spare-Part-Car-Head-Lamp-Headlight-for-Mazda-Cx-5-2014.webp"],
  ["LED Headlight","Body and lighting","https://image.made-in-china.com/202f0j00CRlqhLjFfvoz/Auto-Spare-Part-Car-Head-Lamp-Headlight-for-Mazda-Cx-5-2014.webp"],
  ["Front Light Assembly","Body and lighting","https://image.made-in-china.com/202f0j00CRlqhLjFfvoz/Auto-Spare-Part-Car-Head-Lamp-Headlight-for-Mazda-Cx-5-2014.webp"],
  ["Replacement Headlamp","Body and lighting","https://image.made-in-china.com/202f0j00CRlqhLjFfvoz/Auto-Spare-Part-Car-Head-Lamp-Headlight-for-Mazda-Cx-5-2014.webp"],
  ["Exterior Light Unit","Body and lighting","https://image.made-in-china.com/202f0j00CRlqhLjFfvoz/Auto-Spare-Part-Car-Head-Lamp-Headlight-for-Mazda-Cx-5-2014.webp"],
  ["Front Headlamp Pair","Body and lighting","https://image.made-in-china.com/202f0j00CRlqhLjFfvoz/Auto-Spare-Part-Car-Head-Lamp-Headlight-for-Mazda-Cx-5-2014.webp"],
  ["Body Light Assembly","Body and lighting","https://image.made-in-china.com/202f0j00CRlqhLjFfvoz/Auto-Spare-Part-Car-Head-Lamp-Headlight-for-Mazda-Cx-5-2014.webp"]
 ],
 accessories:[
  ["Aromate Organic Air Freshener","Interior accessory","https://autofactorng.com/images/products/l/vawRKfiJ7r9T2MRa8aQtYFhTFGgcUT8s0ScW8eTA.webp"],
  ["All Weather Floor Mats","Interior accessory","https://m.media-amazon.com/images/I/71tAwSrkwfL._AC_SL3840_.jpg"],
  ["Car Air Freshener","Interior accessory","https://autofactorng.com/images/products/l/vawRKfiJ7r9T2MRa8aQtYFhTFGgcUT8s0ScW8eTA.webp"],
  ["Premium Floor Mat Set","Interior accessory","https://m.media-amazon.com/images/I/71tAwSrkwfL._AC_SL3840_.jpg"],
  ["Organic Car Freshener","Interior accessory","https://autofactorng.com/images/products/l/vawRKfiJ7r9T2MRa8aQtYFhTFGgcUT8s0ScW8eTA.webp"],
  ["All Weather Car Mats","Interior accessory","https://m.media-amazon.com/images/I/71tAwSrkwfL._AC_SL3840_.jpg"],
  ["Car Interior Freshener","Interior accessory","https://autofactorng.com/images/products/l/vawRKfiJ7r9T2MRa8aQtYFhTFGgcUT8s0ScW8eTA.webp"],
  ["Universal Floor Mats","Interior accessory","https://m.media-amazon.com/images/I/71tAwSrkwfL._AC_SL3840_.jpg"]
 ],
 tyres:[
  ["Premium Road Tyre","Passenger tyre","https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=900&q=85"],
  ["Alloy Wheel Rim","Alloy rim","https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=900&q=85"],
  ["SUV Tyre","SUV tyre","https://images.unsplash.com/photo-1515923019244-0a7c5c3f9f0b?auto=format&fit=crop&w=900&q=85"],
  ["Sport Alloy Rim","Alloy rim","https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=900&q=85"],
  ["Commercial Tyre","Commercial tyre","https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=900&q=85"],
  ["Steel Wheel Rim","Steel rim","https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=85"],
  ["Tubeless Tyre","Tyre","https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=900&q=85"],
  ["Wheel and Tyre Set","Wheel set","https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=900&q=85"]
 ],
 trucks:[
  ["HOWO Engine Oil Filter","HOWO truck part","https://image.made-in-china.com/202f0j00rvmkonEtricF/Drum-Brake-Assembly-for-Trailer-HOWO-Truck-Spare-Parts-Brake-Shoe-Ht002.webp"],
  ["HOWO Heavy Duty Brake Assembly","HOWO truck part","https://image.made-in-china.com/202f0j00xgqYIuMZlKbr/Drum-Brake-Assembly-for-Trailer-HOWO-Truck-Spare-Parts-Brake-Shoe-Ht002.webp"],
  ["DAF Truck Spare Parts","DAF truck part","https://image.made-in-china.com/202f0j00pBLVdRoHZOqU/Truck-Parts-for-Daf-CF-Xf-Lf-Over-1500-Items-Truck-Spare-Parts.webp"],
  ["Mack Engine Parts","Mack truck part","https://image.made-in-china.com/202f0j00pBLVdRoHZOqU/Truck-Parts-for-Daf-CF-Xf-Lf-Over-1500-Items-Truck-Spare-Parts.webp"],
  ["HOWO Fuel Filter","HOWO truck part","https://image.made-in-china.com/202f0j00rvmkonEtricF/Drum-Brake-Assembly-for-Trailer-HOWO-Truck-Spare-Parts-Brake-Shoe-Ht002.webp"],
  ["DAF Brake Components","DAF truck part","https://image.made-in-china.com/202f0j00pBLVdRoHZOqU/Truck-Parts-for-Daf-CF-Xf-Lf-Over-1500-Items-Truck-Spare-Parts.webp"],
  ["Mack Truck Service Parts","Mack truck part","https://image.made-in-china.com/202f0j00pBLVdRoHZOqU/Truck-Parts-for-Daf-CF-Xf-Lf-Over-1500-Items-Truck-Spare-Parts.webp"],
  ["Heavy Duty Truck Components","Commercial vehicle part","https://image.made-in-china.com/202f0j00pBLVdRoHZOqU/Truck-Parts-for-Daf-CF-Xf-Lf-Over-1500-Items-Truck-Spare-Parts.webp"]
 ],
  oil:[
  ["Shell Helix Ultra 5W-30","Fully synthetic engine oil","https://oleodecambiobrasil.com.br/assets/oil-bottles-BnZ5VJye.png"],
  ["Mobil 1 5W-30","Fully synthetic engine oil","https://static.wixstatic.com/media/e2baec_6b12b3fce65443ca83b799e69e03f849~mv2.png/v1/fill/w_560%2Ch_700%2Cal_c%2Cq_90%2Cusm_0.66_1.00_0.01%2Cenc_avif%2Cquality_auto/e2baec_6b12b3fce65443ca83b799e69e03f849~mv2.png"],
  ["Castrol GTX 20W-50","Synthetic blend engine oil","https://oleodecambiobrasil.com.br/assets/oil-bottles-BnZ5VJye.png"],
  ["Total Quartz 9000 5W-40","Synthetic engine oil","https://galonoleje.pl/121615-large_default/total-quartz-9000-5w40-1l-syntetyczny-olej-silnikowy.jpg"],
  ["Oando Oleum Super SAE 40","Motor oil","https://oleodecambiobrasil.com.br/assets/oil-bottles-BnZ5VJye.png"],
  ["Shell Helix HX7 10W-40","Synthetic technology oil","https://oleodecambiobrasil.com.br/assets/oil-bottles-BnZ5VJye.png"],
  ["Mobil Super 20W-50","Mineral engine oil","https://static.wixstatic.com/media/e2baec_6b12b3fce65443ca83b799e69e03f849~mv2.png/v1/fill/w_560%2Ch_700%2Cal_c%2Cq_90%2Cusm_0.66_1.00_0.01%2Cenc_avif%2Cquality_auto/e2baec_6b12b3fce65443ca83b799e69e03f849~mv2.png"],
  ["Total Quartz 9000 5W-40 5L","Synthetic engine oil","https://galonoleje.pl/121615-large_default/total-quartz-9000-5w40-1l-syntetyczny-olej-silnikowy.jpg"]
 ],

};

const prices = ["₦18,500","₦24,000","₦12,800","₦31,000","₦27,500","₦14,500","₦19,800","₦22,000"];
const box = document.getElementById("categorySections");

categories.forEach(c=>{
  const section=document.createElement("section");
  section.className="category-block";
  section.innerHTML=`<div class="category-title"><div><h3>${c.name}</h3><p>${c.desc}</p></div><a href="#shop" onclick="toast('The full ${c.name} catalogue will open from the marketplace.')">View More →</a></div><div class="product-grid"></div>`;
  const grid=section.querySelector(".product-grid");
  products[c.key].forEach((p,i)=>{
    const [name,type,image]=p;
    const card=document.createElement("article");
    card.className="product";
    card.innerHTML=`<div class="product-img"><img loading="lazy" src="${image}" alt="${name}" onerror="this.classList.add('image-error')"></div><div class="product-info"><small>${type.toUpperCase()}</small><h4>${name}</h4><p>Actual product photography shown for catalogue reference.</p><div class="price-row"><strong>${prices[i]}</strong><button onclick="toast('Product details will connect to the marketplace catalogue.')">View</button></div></div>`;
    grid.appendChild(card);
  });
  box.appendChild(section);
});


const vehicleGroups = {
  "Passenger Vehicles": {
    "Toyota":["4Runner","Avalon","Avensis","Camry","Corolla","Corolla Cross","C-HR","FJ Cruiser","Fortuner","Hiace","Highlander","Hilux","Land Cruiser","Land Cruiser Prado","Matrix","RAV4","Rush","Sequoia","Sienna","Tacoma","Tundra","Venza","Yaris"],
    "Honda":["Accord","BR-V","Civic","City","CR-V","CR-Z","Element","Fit","HR-V","Insight","Jazz","Odyssey","Pilot","Ridgeline","Stream"],
    "Lexus":["CT","ES","GS","GX","IS","LC","LS","LX","NX","RC","RX","SC","UX"],
    "Hyundai":["Accent","Azera","Creta","Elantra","Getz","i10","i20","i30","ix35","Kona","Palisade","Santa Fe","Sonata","Starex","Tucson","Venue","Veracruz"],
    "Kia":["Carens","Carnival","Cerato","Forte","K5","Mohave","Optima","Picanto","Rio","Seltos","Sorento","Soul","Sportage","Stinger"],
    "Nissan":["370Z","Altima","Armada","Frontier","Juke","Kicks","Maxima","Murano","Navara","Note","Pathfinder","Patrol","Qashqai","Rogue","Sentra","Serena","Sunny","Tiida","X-Trail"],
    "Mercedes Benz":["A Class","B Class","C Class","CLA","CLS","E Class","G Class","GLA","GLB","GLC","GLE","GLK","GLS","M Class","S Class","SL","Sprinter","Vito"],
    "BMW":["1 Series","2 Series","3 Series","4 Series","5 Series","6 Series","7 Series","8 Series","X1","X2","X3","X4","X5","X6","X7","Z4"],
    "Volkswagen":["Amarok","Arteon","Atlas","Beetle","Caddy","Golf","Jetta","Passat","Polo","Tiguan","Touareg","Transporter","Vento"],
    "Ford":["Bronco","EcoSport","Edge","Escape","Everest","Expedition","Explorer","F 150","Fiesta","Focus","Fusion","Kuga","Mustang","Ranger","Transit"],
    "Mazda":["2","3","5","6","CX 3","CX 5","CX 7","CX 9","BT 50","MX 5"],
    "Mitsubishi":["ASX","Eclipse","Eclipse Cross","Galant","L200","Lancer","Montero","Outlander","Pajero","Pajero Sport"],
    "Peugeot":["206","207","208","301","307","308","406","407","408","508","2008","3008","5008","Partner"],
    "Subaru":["BRZ","Forester","Impreza","Legacy","Outback","Tribeca","WRX","XV"],
    "Audi":["A1","A3","A4","A5","A6","A7","A8","Q2","Q3","Q5","Q7","Q8","TT"],
    "Chevrolet":["Aveo","Camaro","Captiva","Colorado","Cruze","Equinox","Malibu","Silverado","Spark","Suburban","Tahoe","Trailblazer","Traverse"],
    "Land Rover":["Defender","Discovery","Discovery Sport","Freelander","Range Rover","Range Rover Evoque","Range Rover Sport","Velar"],
    "Volvo":["C30","S40","S60","S80","S90","V40","V60","V70","XC40","XC60","XC70","XC90"],
    "Suzuki":["Alto","Baleno","Celerio","Ertiga","Jimny","Swift","SX4","Vitara"],
    "Acura":["ILX","Integra","MDX","RDX","RL","RLX","RSX","TL","TSX","ZDX"]
  },
  "Trucks": {
    "HOWO":["A7","T5G","T7H","TX","Hohan","MAX","371"],
    "Mack":["Anthem","Pinnacle","Granite","TerraPro","LR","CH","CX"],
    "DAF":["CF","XF","LF","XG","XD","XB"]
  }
};

const typeSelect = document.getElementById("vehicleType");
const makeSelect = document.getElementById("vehicleMake");
const modelSelect = document.getElementById("vehicleModel");
const yearSelect = document.getElementById("vehicleYear");

if(typeSelect && makeSelect && modelSelect && yearSelect){
  Object.keys(vehicleGroups).forEach(type=>{
    const option=document.createElement("option");
    option.value=type;
    option.textContent=type;
    typeSelect.appendChild(option);
  });
  for(let year=new Date().getFullYear(); year>=2000; year--){
    const option=document.createElement("option");
    option.value=year;
    option.textContent=year;
    yearSelect.appendChild(option);
  }
  typeSelect.addEventListener("change", populateVehicleMakes);
  makeSelect.addEventListener("change", populateVehicleModels);
}

function populateVehicleMakes(){
  const type=typeSelect.value;
  makeSelect.innerHTML='<option value="">Select make</option>';
  modelSelect.innerHTML='<option value="">Select make first</option>';
  makeSelect.disabled=!type;
  modelSelect.disabled=true;
  if(!type) return;
  Object.keys(vehicleGroups[type]).sort().forEach(make=>{
    const option=document.createElement("option");
    option.value=make;
    option.textContent=make;
    makeSelect.appendChild(option);
  });
}

function populateVehicleModels(){
  const type=typeSelect.value;
  const make=makeSelect.value;
  modelSelect.innerHTML='<option value="">Select model</option>';
  modelSelect.disabled=!make;
  if(!make) return;
  vehicleGroups[type][make].forEach(model=>{
    const option=document.createElement("option");
    option.value=model;
    option.textContent=model;
    modelSelect.appendChild(option);
  });
}

function findCompatibleParts(){
  const type=typeSelect.value;
  const make=makeSelect.value;
  const model=modelSelect.value;
  const year=yearSelect.value;
  if(!type || !make || !model || !year){
    toast("Select vehicle type, make, model and year to find compatible parts.");
    return;
  }
  toast(`Showing compatible parts for ${year} ${make} ${model}.`);
}

function toggleMenu(){document.getElementById("mobileNav").classList.toggle("open")}
function goSearch(){document.getElementById("search").scrollIntoView({behavior:"smooth",block:"center"});setTimeout(()=>document.getElementById("q").focus(),400)}
function searchNow(){const q=document.getElementById("q").value.trim();toast(q?`Searching the marketplace for ${q}.`:"Enter a part, brand or part number.")}
function toast(msg){const t=document.getElementById("toast");t.textContent=msg;t.classList.add("show");clearTimeout(window.tt);window.tt=setTimeout(()=>t.classList.remove("show"),2600)}

}
window.initializeVeritas = initializeVeritas;
window.toggleMenu = toggleMenu;
window.goSearch = goSearch;
window.searchNow = searchNow;
window.findCompatibleParts = findCompatibleParts;

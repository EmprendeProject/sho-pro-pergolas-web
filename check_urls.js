const ids = ['struxure', 'cabanax', 'azenco', 'progressive', 'renlita', 'liquidview', 'haven', 'infinity', 'suntech', 'hdgolf', 'hurricane'];
const names = ['StruXure', 'Cabana X', 'Azenco Outdoor', 'Progressive Screens', 'Renlita', 'LiquidView', 'Haven & Harmony', 'Infinity Rack', 'Suntech', 'HD Golf', 'Hurricane Fabric'];

async function check() {
  const base = "https://agcxxpjkqckqqefkhazp.supabase.co/storage/v1/object/public/archivos/brands%20(logos)/";
  for (let id of ids) {
    let url = base + id + ".png";
    let res = await fetch(url);
    console.log(url, res.status);
  }
}
check();

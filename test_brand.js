const ids = ['struxure', 'StruXure'];

async function check() {
  const base = "https://agcxxpjkqckqqefkhazp.supabase.co/storage/v1/object/public/archivos/brands%20(logos)/";
  
  for (let id of ids) {
    // try different file names
    const names = [
      `${id}.png`,
      `${id}/logo.png`,
      `${id}/1.jpeg`,
      `${id}/1.jpg`,
      `${id}/${id}.png`,
      `${id}%20logo.png`,
      `StruXure/StruXure%20logo.png`
    ];
    for (name of names) {
      let url = base + name;
      let res = await fetch(url);
      console.log(url, res.status);
    }
  }
}
check();

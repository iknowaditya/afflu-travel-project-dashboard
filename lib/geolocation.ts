// export async function getGeoFromIP(ip: string) {
//   const url = `https://ipapi.co/${ip}/json/`;
//   try {
//     const res = await fetch(url);
//     if (!res.ok) return { city: "", country: "" };
//     const data = await res.json();
//     return { city: data.city || "", country: data.country_name || "" };
//   } catch {
//     return { city: "", country: "" };
//   }
// }

export async function getGeoFromIP(ip: string) {
  const url = `https://ipapi.co/${ip}/json/`;
  try {
    const res = await fetch(url);
    if (!res.ok) return { city: "", country: "" };

    const data = await res.json();

    return {
      city: data.city || "",
      country: data.country_name || "", // This field should be there if IP is valid
    };
  } catch (err) {
    console.error("Geo Lookup Error:", err);
    return { city: "", country: "" };
  }
}

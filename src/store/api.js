const FIREBASE_DOMAIN = "https://blindside-test-default-rtdb.firebaseio.com";

export async function getAllItems() {
  
    const response = await fetch(`${FIREBASE_DOMAIN}/videos.json`);
    if (!response.ok) {
        throw new Error("sth wrong");
    }
    const data = await response.json();
  return data;
}
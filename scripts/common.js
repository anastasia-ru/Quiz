function checkUserData() {
    const url = new URL(location.href);
    const name = url.searchParams.get("name");
    const lastNname = url.searchParams.get("lastName");
    const email = url.searchParams.get("email");

    if(!name || !lastNname || !email) {
        location.href = 'index.html';
    }
}
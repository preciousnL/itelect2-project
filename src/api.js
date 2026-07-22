export async function fetchSampleUsers(){
    try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const user = await res.json();
        return user.map((user) => ({ id: user.id, name: user.name, email: user.email}));
    } catch (err) {
        console.error("Invalid:", err.message);
        return[];
    } finally {
        console.log("Successful loading.")
    }
}

export function fetchSampleUsersPromise(){
    return fetch("https://jsonplaceholder.typicode.com/users")
        .then((res) => {
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return res.json();
        })
        .then((user) => {
            return user.map((user) => ({ id: user.id, name: user.name, email: user.email}));
        })
        .catch((err) => {
            console.error("Invalid:", err.message);
            return[];
        })
}

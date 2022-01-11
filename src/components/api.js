export async function fetchSalads() {
    const req = await fetch('http://test-job.webatom.ru/salads', {
        method: 'GET'
    })
    if (req.ok) {
        return await req.json();
    }
}

export async function fetchMolecules() {
    const req = await fetch('http://test-job.webatom.ru/molecules', {
        method: 'GET'
    })
    if (req.ok) {
        return await req.json();
    }
}
export async function fetchSalad(id) {
    const req = await fetch(`http://test-job.webatom.ru/salad/${id}`, {
        method: 'GET'
    })
    if (req.ok) {
        return await req.json();
    }
}
export async function fetchMolecule(id) {
    const req = await fetch(`http://test-job.webatom.ru/molecule/${id}`, {
        method: 'GET'
    })
    if (req.ok) {
        return await req.json();
    }
}

export async function fetchCreateOrder(data) {
    const req = await fetch('http://test-job.webatom.ru/order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    if (req.ok) {
        return await req.json();
    }
}
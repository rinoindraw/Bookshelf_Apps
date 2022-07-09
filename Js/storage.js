const STORAGE_KEY = "List_Reading";

let list = [];

function isStorageExist() {
    if (typeof(Storage) === undefined) {
        alert("Browser kamu tidak mendukung local storage");
        return false
    }
    return true;
}

function saveData() {
    const parsed = JSON.stringify(list);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event("ondatasaved"));
}

function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(serializedData);
    if (data !== null)
        list = data;
    document.dispatchEvent(new Event("ondataloaded"));
}

function updateDataToStorage() {
    if (isStorageExist())
        saveData();
}

function buatObjekBuku(judul, penulis, tahun, waktu, selesai) {
    return {
        id: +new Date(),
        judul,
        penulis,
        tahun,
        waktu,
        selesai
    };
}

function cariBuku(idBuku) {
    for (book of list) {
        if (book.id === idBuku)
            return book;
    }
    return null;
}

function cariIndeksBuku(idBuku) {
    let index = 0
    for (book of list) {
        if (book.id === idBuku)
            return index;

        index++;
    }

    return -1;
}

function refreshDataFromList() {
    const listBelumSelesai = document.getElementById(List_Belum);
    let listSelesai = document.getElementById(List_Sudah);
    for (book of list) {
        const bukuBaru = buatListBaca(book.judul, book.penulis, book.tahun, book.waktu, book.selesai);
        bukuBaru[Id_Buku] = book.id;
        if (book.selesai) {
            listSelesai.append(bukuBaru);
        } else {
            listBelumSelesai.append(bukuBaru);
        }
    }
}
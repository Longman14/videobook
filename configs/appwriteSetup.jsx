// import { Client, Storage } from "appwrite";

// export const client = new Client()
//     .setEndpoint('https://cloud.appwrite.io/v1')
//     .setProject('679ce8840036ed0499b5');

// const storage = new Storage(client);

// const promise = storage.createFile(
//     '679ce8ff003503638bf0',
//     ID.unique(),
//     document.getElementById('uploader').files[0]
// );

// promise.then(function (response) {
//     console.log(response); // Success
// }, function (error) {
//     console.log(error); // Failure
// });


import { Client, Storage, ID } from "appwrite";

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_URL) // Replace with your endpoint
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID); // Replace with your project ID

const storage = new Storage(client);

export { client, storage };


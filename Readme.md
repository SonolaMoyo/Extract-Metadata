**_Extract and writing metadata from files, folders and zip files_**

The 3 functionalities:

- Read Metadata: specify the file/folder path in the (thePath) "controllers/readMetadata.js" script and run the script using "node controllers/readMetadata.js". The output (without error), is the metadata details of the file or all files in the folder.

- Write Metadata: specify the file/folder path in the (thePath) "controllers/writeMetadata.js" script and run the script using "node controllers/writeMetadata.js". This script removes all writeable metadata of the file or all files in the folder. In addition, you can also write your metadata value by configuring the "ep.writeMetadata" function. The output (without error) gives { data:null, error: "process information"}. Note, the impact is made on the exact same files or folder.

- Write Zip file: This script processes a zip file and remove all writeable metadata of all files in a zip and gives a new zip file. In the script you'll need to specify a inZipPath (the path of the Zip file to be processed), and a outZipPath (a non existing file path of the destination of the new Zip file)

Warning: Use double slashes when specifying a path to aviod unnecessary error

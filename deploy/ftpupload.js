var fs = require('fs');
var FtpClient = require('ftp-deploy');

console.log("Inside ftpUpload.js");
if (process === null) {
    console.log("process is null");
}
else {
    uploadToFTP();
}

function uploadToFTP() {
    var ftp = new FtpClient();
    var ftpConfig = getConfiguration();
    console.log("DIRECTORIO: " + process.cwd());

    console.log("ftp.host =" + ftpConfig.host);
    console.log("ftp.user =" + ftpConfig.user);
    console.log("ftp.password length =" + ftpConfig.password.length);
    console.log("ftp.localRoot =" + ftpConfig.localRoot);
    console.log("ftp.remoteRoot =" + ftpConfig.remoteRoot);
    console.log("ftp.port =" + ftpConfig.port);

    ftp.on("uploading", function(data) {
        data.totalFilesCount; // total file count being transferred
        data.transferredFileCount; // number of files transferred
        data.filename; // partial path with filename being uploaded
        console.log(JSON.stringify(data));
    });
    ftp.on("uploaded", function(data) {
        console.log(data); // same data as uploading event
    });
    ftp.on("log", function(data) {
        console.log(data); // same data as uploading event
    });
    ftp.on("upload-error", function(data) {
        console.log(data.err); // data will also include filename, relativePath, and other goodies
    });
    ftp.deploy(ftpConfig, function(err, res) {
    if (err) console.log(err);
    else console.log("finished:", res);
    });
}
function getConfiguration() {
    return {
        host: "ags.com.ar",
        port: 21,
        user: "doce",
        password: "121212",
        localRoot: "/home/travis/build/SebastianIRodriguez/Metior-Web",
        remoteRoot: "",
        include: ['*/'+'**', '*.*'],
        exclude: ['.*','.*/'+'**','node_modules','node_modules/'+'**'+'/.*','node_modules/'+'**','deploy','deploy/'+'*','**'+'/lib/'+'**'],
        deleteRemote: true,
        forcePasv: false
    };
}
